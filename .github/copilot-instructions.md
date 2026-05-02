# GitHub Copilot Instructions — MaximWeb Landing Page

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5
- Tailwind CSS **v4** — sem `tailwind.config.ts`, tokens em `src/app/globals.css @theme`
- Framer Motion 12 — animações e scroll reveal
- lucide-react **v1** — ícones de marca (Github, Instagram, Linkedin) **não existem nesta versão**

## Regras críticas

1. **Nunca crie `tailwind.config.ts`** — toda customização vai em `globals.css @theme`
2. **Todo componente com hook React ou Framer Motion precisa de `'use client'`**
3. **Use `cn()` de `@/lib/utils`** para classes condicionais (nunca template strings)
4. **Antes de usar um ícone**, verifique se existe em lucide-react v1
5. **`npm run build` deve passar** sem erros antes de qualquer entrega

## Estrutura de componentes

```
public/
  contact.php                    → POST JSON → validação → API Resend (cURL); config: contact.config.local.php
  contact.config.example.php     → modelo (sem segredos)
src/components/
  ui/          → Button, GlowCard, SectionWrapper (reutilizáveis)
  layout/      → Navbar, Footer
  sections/    → Hero, Services, Products, Differentials, CTA, ContactForm (POST /contact.php)
src/lib/
  utils.ts     → cn() helper
src/app/
  globals.css  → @theme tokens + keyframes + .glass .hero-grid etc.
```

**Formulário:** em produção no cPanel, o envio não passa por Route Handlers Next; segredos ficam no PHP (gitignored). Em `npm run dev`, `/contact.php` não é servido pelo Next.

## Padrão de animação

- Seções usam `SectionWrapper` + `variants={itemVariants}` (importado de `SectionWrapper.tsx`)
- Hero tem animações locais próprias — não importar `itemVariants` nele
- Hover de cards: `whileHover={{ scale: 1.03 }}` (GlowCard) ou `whileHover={{ y: -6 }}` (cards diretos)

## Design tokens disponíveis (via Tailwind)

`bg-brand-primary` `text-brand-glow` `bg-bg-main` `bg-bg-secondary` `bg-bg-card`
`border-border-subtle` `text-text-muted` `font-inter`
`animate-glow-pulse` `animate-float` `animate-gradient-shift` `animate-fade-in-up`

## Quando consultar o vault

| Quando... | Leia |
|---|---|
| Antes de modificar estrutura de componentes ou fronteira client/server | `docs/ARCHITECTURE.md` |
| Antes de usar ou criar qualquer token, keyframe ou classe CSS | `docs/DESIGN_TOKENS.md` |
| Para entender por que uma decisão foi tomada | `docs/knowledge/_generated/adr-index.md` |
| Para ver mapa de arquivos e dependências | `docs/knowledge/_generated/project-map.md` |
| Antes de criar documentação ou avaliar se algo vira ADR | `docs/knowledge/patterns/documentation-update-flow.md` |

## ADR — quando propor

Após qualquer tarefa estrutural, avalie se cabe um ADR. **Nunca crie sem perguntar ao usuário**, explicando o motivo.

Propor quando: mudança de paradigma de interação · nova convenção de animação · escolha de biblioteca com alternativas rejeitadas · decisão de fronteira client/server · arquitetura de deploy · decisão que um agente futuro poderia silenciosamente desfazer.

Não propor para: bug fix, ajuste visual, adição de prop, mudança de copy.

ADRs existentes: `adr/001–007`. Próximo: `adr/008`. Após criar, rodar `npm run knowledge:sync`.

## Arquivos de referência

- Leia `AGENTS.md` para guia técnico completo
- Leia `docs/ARCHITECTURE.md` para padrões de composição
- Leia `docs/DESIGN_TOKENS.md` para referência visual completa
