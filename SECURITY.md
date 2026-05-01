# Política de Segurança

## Versões suportadas

| Versão | Suportada |
|--------|-----------|
| 0.1.x  | ✅ Sim    |

## Reportando uma vulnerabilidade

**Não abra uma issue pública** para vulnerabilidades de segurança.

Envie um e-mail para **maximweb.com.br@gmail.com** com:

1. Descrição da vulnerabilidade
2. Passos para reprodução
3. Impacto potencial
4. Sugestão de correção (opcional)

Você receberá uma resposta em até **72 horas**. Após confirmação e correção, a vulnerabilidade será divulgada publicamente com crédito ao reportador.

## Escopo

Este projeto é uma landing page estática (front-end apenas). As principais superfícies de ataque são:

| Área | Risco | Status |
|---|---|---|
| Formulário de contato | Envio de spam / dados inválidos | Validação client-side implementada; backend pendente |
| Dependências npm | Vulnerabilidades em pacotes | Monitore com `npm audit` |
| Headers HTTP | XSS, clickjacking | Configurar em `next.config.ts` no deploy |

## Headers de segurança recomendados para produção

Adicione em `next.config.ts`:

```ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',  value: 'on' },
  { key: 'X-Frame-Options',         value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data:",
    ].join('; '),
  },
]
```
