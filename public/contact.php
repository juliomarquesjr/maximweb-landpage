<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido'], JSON_UNESCAPED_UNICODE);
    exit;
}

$configPath = __DIR__ . '/contact.config.local.php';
if (!is_readable($configPath)) {
    http_response_code(503);
    echo json_encode(['error' => 'Formulário não configurado no servidor'], JSON_UNESCAPED_UNICODE);
    exit;
}

/** @var array<string, string> $config */
$config = require $configPath;

$apiKey  = trim((string) ($config['resend_api_key'] ?? ''));
$mailFrom = trim((string) ($config['mail_from'] ?? ''));
$mailTo   = trim((string) ($config['mail_to'] ?? ''));

if ($apiKey === '' || $mailFrom === '' || $mailTo === '') {
    http_response_code(503);
    echo json_encode(['error' => 'Configuração incompleta'], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw !== false && $raw !== '' ? $raw : 'null', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido'], JSON_UNESCAPED_UNICODE);
    exit;
}

$nome     = isset($data['nome']) && is_string($data['nome']) ? trim($data['nome']) : '';
$email    = isset($data['email']) && is_string($data['email']) ? trim($data['email']) : '';
$telefone = isset($data['telefone']) && is_string($data['telefone']) ? trim($data['telefone']) : '';
$mensagem = isset($data['mensagem']) && is_string($data['mensagem']) ? trim($data['mensagem']) : '';

$errors = [];
if ($nome === '') {
    $errors[] = 'Nome é obrigatório';
}
if ($email === '' || !preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) {
    $errors[] = 'Email inválido';
}
if ($telefone === '' || !preg_match('/^[\d\s+\-()]{9,}$/', $telefone)) {
    $errors[] = 'Telefone inválido';
}
$msgLen = function_exists('mb_strlen') ? mb_strlen($mensagem) : strlen($mensagem);
if ($mensagem === '' || $msgLen < 20) {
    $errors[] = 'Mensagem deve ter pelo menos 20 caracteres';
}

if ($errors !== []) {
    http_response_code(400);
    echo json_encode(['error' => implode(' ', $errors)], JSON_UNESCAPED_UNICODE);
    exit;
}

$submittedAt = (new DateTimeImmutable('now', new DateTimeZone('UTC')))->format(DateTimeInterface::ATOM);

$subject = '[MaximWeb] Contato do site — ' . $nome;

$textBody = "Nova mensagem do formulário da landing page\n\n"
    . "Nome: {$nome}\n"
    . "Email: {$email}\n"
    . "Telefone: {$telefone}\n"
    . "Enviado em (UTC): {$submittedAt}\n\n"
    . "---\n{$mensagem}\n";

$safeNome = htmlspecialchars($nome, ENT_QUOTES | ENT_HTML5, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_HTML5, 'UTF-8');
$safeTel = htmlspecialchars($telefone, ENT_QUOTES | ENT_HTML5, 'UTF-8');
$safeMsg = nl2br(htmlspecialchars($mensagem, ENT_QUOTES | ENT_HTML5, 'UTF-8'));

$htmlBody = '<p><strong>Nova mensagem</strong> — formulário MaximWeb</p>'
    . '<ul>'
    . '<li><strong>Nome:</strong> ' . $safeNome . '</li>'
    . '<li><strong>Email:</strong> ' . $safeEmail . '</li>'
    . '<li><strong>Telefone:</strong> ' . $safeTel . '</li>'
    . '<li><strong>Enviado em (UTC):</strong> ' . htmlspecialchars($submittedAt, ENT_QUOTES | ENT_HTML5, 'UTF-8') . '</li>'
    . '</ul>'
    . '<p><strong>Mensagem</strong></p><p>' . $safeMsg . '</p>';

$payload = json_encode([
    'from'     => $mailFrom,
    'to'       => [$mailTo],
    'subject'  => $subject,
    'text'     => $textBody,
    'html'     => $htmlBody,
    'reply_to' => $email,
], JSON_UNESCAPED_UNICODE);

if ($payload === false) {
    error_log('[contact.php] json_encode: ' . json_last_error_msg());
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao montar mensagem'], JSON_UNESCAPED_UNICODE);
    exit;
}

$ch = curl_init('https://api.resend.com/emails');
if ($ch === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Não foi possível concluir o envio'], JSON_UNESCAPED_UNICODE);
    exit;
}

curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 20,
]);

$responseBody = curl_exec($ch);
$curlErr      = curl_error($ch);
$httpCode     = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($responseBody === false || $curlErr !== '') {
    error_log('[contact.php] curl: ' . $curlErr);
    http_response_code(502);
    echo json_encode(['error' => 'Não foi possível concluir o envio'], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

error_log('[contact.php] Resend HTTP ' . $httpCode . ' ' . substr((string) $responseBody, 0, 500));
http_response_code(502);
echo json_encode(['error' => 'Não foi possível concluir o envio'], JSON_UNESCAPED_UNICODE);
