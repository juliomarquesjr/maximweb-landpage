# ADR 007 — ContactForm: wizard conversacional em passos

**Data:** 2026-05-01
**Status:** Aceito

---

## Contexto

O `ContactForm` original exibia todos os campos simultaneamente (Nome, Email, Telefone, Mensagem) num layout de dois painéis: texto de apoio à esquerda e o formulário completo à direita. A experiência era funcional mas genérica — sem diferenciação visual nem animações além da entrada de seção via `SectionWrapper`.

A agência MaximWeb vende direção criativa e tecnologia focada em conversão. Um formulário de contato sem personalidade contradiz esse posicionamento. As alternativas avaliadas foram:

1. **Manter o layout atual** com melhorias cosméticas (mais glow, inputs maiores) — muda aparência, não percepção
2. **Floating labels** (labels que sobem ao focar o campo) — melhora o estilo, mas mantém todos os campos visíveis de uma vez
3. **Wizard conversacional em passos** — uma pergunta por vez, transições animadas, feedback visual acumulado

---

## Decisão

Adotar o **wizard conversacional** com as seguintes características:

- **4 passos sequenciais**: Nome → Email → Telefone → Mensagem
- **`AnimatePresence mode="wait"`** com `slideVariants` direction-aware: ao avançar, o campo entra da direita; ao voltar, da esquerda. A direção é controlada por `dir: 1 | -1` em `useState`
- **`ReceiptPanel`** (coluna esquerda, desktop): acumula respostas já confirmadas em cards animados; campos futuros aparecem desbotados — cria sensação de progresso e reduz ansiedade do usuário
- **Barra de progresso** com `animate={{ width }}` spring + step dots com `animate-glow-pulse` no passo atual
- **`SuccessState`** com burst radial de 18 partículas (`motion.div`) + check icon com spring rotation + anel expansivo
- **Autofocus** automático por passo (delay 340ms para não colidir com a animação de entrada)
- **Atalhos de teclado**: Enter avança nos campos de texto; ⌘/Ctrl+Enter envia no textarea

O backend permanece inalterado (`POST /contact.php` → PHP + Resend, documentado no ADR 005).

---

## Consequências

**Positivas:**

- Reduz carga cognitiva: o usuário vê e pensa em uma coisa por vez
- Transições animadas reforçam a identidade criativa da agência no ponto de conversão mais importante da página
- `ReceiptPanel` cria senso de progresso e comprometimento — padrão Zeigarnik aplicado a UX
- Atalhos de teclado tornam o fluxo fluido para usuários avançados
- Animação de sucesso é um micro-momento de celebração que reforça a confiança pós-envio

**Negativas / Cuidados:**

- Estado mais complexo: `step`, `dir`, `fieldError`, `status` e dois `useRef` separados (input/textarea) em vez de um `FieldError` por campo
- Em dispositivos com `prefers-reduced-motion`, as transições de slide+blur ainda ocorrem — considerar respeitar a media query nas `slideVariants` em iterações futuras
- `ReceiptPanel` é `hidden lg:flex`: usuários mobile não veem o acúmulo de respostas — aceitável dado o ganho de foco no mobile
- O botão Continuar/Enviar usa `motion.button` diretamente (não `<Button magnetic>`) para ter controle total das animações de hover/tap sem conflito de tipos

---

## Referências

- `src/components/sections/ContactForm.tsx`
- ADR 005 — backend do formulário (PHP + Resend, sem alteração)
- `AGENTS.md` — seção *Animation Conventions* (padrão ContactForm wizard)
