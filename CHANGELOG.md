# Changelog

Todas as mudanças notáveis neste projeto são documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned
- Endpoint real para o formulário de contato (`/api/contact`)
- OG image dinâmica (`opengraph-image.tsx`)
- Página de política de privacidade

---

## [0.1.0] — 2026-05-01

### Added
- Setup inicial com Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12
- Configuração do Playwright MCP em `.claude/settings.json` para testes visuais com Claude Code
- **Navbar**: transparente → glassmorphism no scroll; menu mobile com `AnimatePresence`
- **Hero**: grid futurista, radial glow, stagger animation, stats row, scroll indicator
- **Services**: 3 cards (`GlowCard`) — Desenvolvimento, Automação, Soluções Personalizadas
- **Products**: 4 cards com glows coloridos distintos — Loja, Transporte Escolar, Lanchonetes, Lavagem
- **Differentials**: 4 cards com hover `y:-6` e número fantasma decorativo
- **CTA**: botão com `animate-glow-pulse` e `btn-gradient`
- **ContactForm**: validação client-side, loading state, estado de sucesso animado
- **Footer**: server component com 3 colunas de links e ícones sociais
- UI primitives: `Button` (primary/secondary/ghost + loading), `SectionWrapper` (scroll reveal), `GlowCard` (glassmorphism + hover glow)
- Design system completo em `globals.css @theme`: paleta, keyframes, utilitários (`.glass`, `.hero-grid`, `.gradient-text`, `.btn-gradient`, `.dark-input`, `.section-divider`)
- Documentação: `README.md`, `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`

### Fixed
- `suppressHydrationWarning` no `<html>` para evitar conflito com extensões de browser
- Contraste de cards: `.glass` com `rgba(20,20,35,0.92)` + borda `rgba(255,255,255,0.07)`
- Scroll indicator do Hero substituído de `bg-linear-to-b` para `style` inline (Tailwind v4)
- Ícones de marca removidos do lucide-react v1 substituídos por equivalentes disponíveis

---

[Unreleased]: https://github.com/maximweb/landpage/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/maximweb/landpage/releases/tag/v0.1.0
