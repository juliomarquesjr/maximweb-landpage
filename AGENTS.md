# MaximWeb Landing Page — Agent Guide

## ⚠️ Stack Notes (Read Before Writing Code)

### Next.js 16 + Turbopack
This project runs **Next.js 16** with the App Router and Turbopack. APIs and conventions differ from Next.js 13/14 training data. Check `node_modules/next/dist/docs/` before using any Next.js API you're unsure about.

### Tailwind CSS v4
**There is no `tailwind.config.ts`.** All theme customization lives in `src/app/globals.css` inside a `@theme {}` block.

```css
/* ✅ Correct — Tailwind v4 */
@theme {
  --color-brand-primary: #3B82F6;
  --animate-glow-pulse: glow-pulse 2.5s ease-in-out infinite;
}
```

Class names are derived from CSS variable names:
- `--color-brand-primary` → `bg-brand-primary`, `text-brand-primary`, `border-brand-primary`
- `--font-inter` → `font-inter`
- `--animate-glow-pulse` → `animate-glow-pulse`

Gradient utility changed in v4: use `bg-linear-to-b` (NOT `bg-gradient-to-b`). When in doubt, use `style={}` inline for gradients.

### lucide-react v1
Brand/social icons were **removed** in v1. These do NOT exist:
- ❌ `Github`, `Linkedin`, `Instagram`, `Twitter`, `Facebook`

Use generic substitutes: `GitBranch`, `Link`, `Camera`, etc.

---

## Project Architecture

```
public/
  brand/
    maximweb-logo.png          — logo transparente otimizado para o header escuro (next/image)
  contact.php                  — POST JSON (nome, email, telefone, mensagem); valida; cURL → Resend;
                                 secrets em contact.config.local.php (gitignored; ver contact.config.example.php)
  contact.config.example.php   — template de config para cPanel
scripts/
  deploy-cpanel.mjs            — deploy local via FTP/FTPS (upload de `out/` para cPanel; ignora `contact.config.local.php`)
  sync-obsidian.mjs            — sincroniza arquivos gerados do vault `docs/knowledge/_generated`
src/
  app/
    layout.tsx          — Inter font, suppressHydrationWarning on <html>, metadata pt-BR
    page.tsx            — Navbar → Hero → TechMarquee → Services → Products →
                          Differentials → CTA → ContactForm → Footer
    globals.css         — @theme tokens + keyframes + utility classes
  lib/
    utils.ts            — cn() helper (clsx + tailwind-merge)
  components/
    ui/
      Button.tsx        — variants: primary|secondary|ghost; props: loading, magnetic
                          Uses motion.button internally; magnetic prop adds spring attraction to cursor
      SectionWrapper.tsx — scroll-reveal via useInView; exports itemVariants for child stagger
      GlowCard.tsx      — glassmorphism card; 3D tilt on mousemove (useMotionValue+useSpring);
                          configurable glowColor; whileHover scale:1.02
      AnimatedHeading.tsx — word-by-word blur+fade-in animation; props: text, highlightWords,
                            className, as (h1|h2|h3); fires once via useInView
      CountUp.tsx        — animates a number from 0→N on viewport entry; props: to, suffix,
                           prefix, duration; uses useMotionValue + animate (MotionValue overload)
      TechMarquee.tsx    — infinite CSS marquee of tech stack badges; SERVER component (no 'use client')
    layout/
      Navbar.tsx        — transparent → glass on scroll >24px; scroll progress bar at top
                          (useScroll → scaleX on motion.div); optimized brand logo via
                          next/image; AnimatePresence mobile menu
      Footer.tsx        — server component (no 'use client')
    sections/
      Hero.tsx          — full-viewport responsive text + DigitalBuildScene visual;
                          hero-grid bg with parallax (useScroll+useTransform on
                          backgroundPositionY); floating ambient orbs (animate-float);
                          radial glow; stagger animation; CountUp stats (50+, 99%);
                          magnetic CTA
      Services.tsx      — AnimatedHeading title; 3 enriched GlowCards with
                          service-specific mini scenes, badges, feature lists,
                          and per-card glow colors
      Products.tsx      — 4 GlowCards with per-card glow colors; AnimatedHeading title
      Differentials.tsx — 4 cards (bg-bg-card + gradient-border-card top-accent hover);
                          whileHover y:-6; AnimatedHeading title
      CTA.tsx           — AnimatedHeading; magnetic primary Button; animate-glow-pulse
      ContactForm.tsx   — client-side validation; POST para `/contact.php`; estado `unavailable` se 503;
                          AnimatedHeading title
```

---

## Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `brand-primary` | `#3B82F6` | Buttons, accents, borders |
| `brand-glow` | `#60A5FA` | Icon colors, text highlights |
| `bg-main` | `#0B0B0F` | Page background (dark sections) |
| `bg-secondary` | `#111118` | Alternate section background |
| `bg-card` | `#14142A` | Card backgrounds (Differentials) |
| `border-subtle` | `#272740` | Card borders (Differentials) |
| `text-muted` | `#6B7280` | Secondary text |

### Global CSS Utilities
| Class | Purpose |
|---|---|
| `.glass` | `rgba(20,20,35,0.92)` bg + `backdrop-filter: blur(12px)` + `rgba(255,255,255,0.07)` border |
| `.hero-grid` | CSS grid lines overlay (60px, blue tint) — also used for parallax via `backgroundPositionY` |
| `.gradient-text` | Blue→indigo gradient on text using `background-clip: text` |
| `.btn-gradient` | Animated gradient background (gradient-shift keyframe) |
| `.dark-input` | Dark form inputs with blue glow on `:focus` |
| `.section-divider` | 1px horizontal line with blue gradient center |
| `.focus-ring` | Blue outline on `:focus-visible` |
| `.gradient-border-card` | Top-edge accent line that appears + expands on hover (blue→indigo gradient) |
| `body::after` | Static film grain texture overlay (SVG turbulence, `opacity: 0.022`) — no animation |

### CSS Keyframes
| Token / Name | Definition |
|---|---|
| `--animate-glow-pulse` | `glow-pulse 2.5s ease-in-out infinite` — box-shadow pulse |
| `--animate-float` | `float 4s ease-in-out infinite` — translateY 0↔-12px |
| `--animate-gradient-shift` | `gradient-shift 4s ease infinite` — background-position shift |
| `--animate-fade-in-up` | `fade-in-up 0.6s ease forwards` — opacity+translateY entrance |
| `--animate-marquee` | `marquee 30s linear infinite` — translateX(-50%) continuous scroll |

### Animation Conventions
- **Section entry**: `SectionWrapper` with `useInView`. Children use `variants={itemVariants}` imported from `SectionWrapper.tsx`.
- **Hover cards (GlowCard)**: `whileHover={{ scale: 1.02 }}` + 3D tilt via `useMotionValue`/`useSpring`/`useTransform`. Reset on `onMouseLeave`.
- **Hover cards (Differentials)**: `whileHover={{ y: -6 }}` + `.gradient-border-card` top accent.
- **Hero**: standalone `containerVariants` + `itemVariants` defined locally (not from SectionWrapper). Parallax on `motion.section` via `useScroll`+`useTransform`. `DigitalBuildScene` stays inside `Hero.tsx` and uses Framer Motion keyframes for the crane, build blocks, conveyor, terminal pulse, and cursor motion.
- **Services**: use `SectionWrapper` for entry and service-specific mini scenes inside each `GlowCard`. The current scenes are system UI assembly, automation flow, and custom module composition.
- **Floating orbs**: `animate-float` with different `animationDelay` per orb for offset rhythm.
- **Section headings**: `AnimatedHeading` component — word-by-word blur+fade, fires once on viewport entry. Use `highlightWords` prop to apply `gradient-text` to specific words.
- **Animated stats**: `CountUp` component — animates 0→N using `useMotionValue`+`animate`. Non-numeric values (e.g. "24/7") must be rendered as static strings.
- **Magnetic buttons**: `<Button magnetic>` — primary CTAs in Hero and CTA section only. Do NOT add `magnetic` to form submit buttons or Navbar CTAs.
- **Scroll progress bar**: In `Navbar.tsx` — `useScroll()` → `scrollYProgress` → `motion.div scaleX`.
- **CSS animations**: `animate-glow-pulse` on CTA; `btn-gradient` uses `gradient-shift`; `animate-marquee` on TechMarquee track.

---

## Development

```bash
npm run dev     # starts at http://localhost:3000
npm run build   # must pass with 0 TypeScript errors before any PR
npm run build:static  # static export build to out/
npm run deploy:cpanel  # local static build + FTP/FTPS upload to cPanel
npm run deploy:cpanel:dry-run  # preview files without uploading
npm run knowledge:sync   # regenerates docs/knowledge/_generated
npm run knowledge:check  # verifies generated knowledge is current
```

## Obsidian Knowledge Vault

- The project knowledge vault lives in `docs/knowledge/`.
- For large tasks, read `docs/knowledge/00-index.md` after `AGENTS.md`.
- Generated files under `docs/knowledge/_generated/` are maintained by `npm run knowledge:sync`; do not edit them manually.
- Durable decisions stay in `adr/`. The Obsidian vault indexes and connects them, but does not replace ADRs.
- After structural documentation changes, durable technical decisions, or new reusable patterns, run `npm run knowledge:sync`.

### Playwright MCP (Visual Testing)
The project has Playwright MCP configured in `.claude/settings.json`. It is available when Claude Code is started from this directory. Use it to take screenshots and verify visual changes before marking work as done.

```json
// .claude/settings.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

---

- **Contato (produção cPanel / PHP):** copie `public/contact.config.example.php` → `contact.config.local.php` na mesma pasta pública do site; preencha `resend_api_key`, `mail_from` (domínio verificado no Resend), `mail_to`. Sem isso, `contact.php` responde 503. Em `npm run dev`, `/contact.php` não é servido pelo Next — testar envio no servidor ou stack Apache+PHP.
- `Footer.tsx`: Social icon `href` values are `#` placeholders. Replace with real URLs.
- `suppressHydrationWarning` on `<html>` is intentional — suppresses mismatches caused by browser extensions (e.g., LanguageTool) that inject attributes on the client.

---

## Rules for Agents

1. **Run `npm run build` after any change** — Turbopack is strict about TypeScript; catch errors before reporting work done.
2. **No new `tailwind.config.ts`** — all tokens go in `globals.css @theme`.
3. **Framer Motion components require `'use client'`** — add the directive to any file using `motion`, `useInView`, `AnimatePresence`, `useScroll`, `useMotionValue`, etc.
4. **Server Components stay server** — `Footer.tsx`, `layout.tsx`, and `TechMarquee.tsx` are intentionally server components. Don't add `'use client'` to them without a reason.
5. **Use `cn()` from `@/lib/utils`** for conditional class merging — never string concatenation.
6. **Check lucide-react availability** — if adding a new icon, verify it exists in v1 before using it.
7. **Button + Framer Motion type conflict** — `ButtonProps` uses `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'|'onDragEnd'|'onDragStart'|'onDragEnter'|'onDragLeave'|'onDragOver'|'onDrop'|'onAnimationStart'|'onAnimationEnd'|'onAnimationIteration'>` to avoid type conflicts with `motion.button`. Keep this Omit if adding new props to Button.
8. **CountUp `animate` overload** — use `animate(motionValue, target, options)` (MotionValue first argument), not `animate(fromNumber, toNumber, options)`. The latter has TypeScript overload issues in Framer Motion v12.
9. **`AnimatedHeading` fires independently** — it uses its own `useInView`, not the parent `SectionWrapper` stagger. Place it inside a `motion.div variants={itemVariants}` wrapper only if you want the surrounding block (label + subtitle) to stagger together. The heading itself always animates word-by-word on its own.
10. **`gradient-border-card` is CSS-only** — it uses a `::before` pseudo-element (top accent line). It does NOT use `isolation: isolate` or negative z-index. Safe to combine with any Framer Motion `motion.div`.
11. **Brand logo performance** — keep the header logo in `public/brand/maximweb-logo.png`, optimized for the dark header. Render it with `next/image`, explicit intrinsic `width`/`height`, and a fixed `sizes` value to avoid layout shift.
12. **Keep the Obsidian vault current** — run `npm run knowledge:sync` after updating structural docs, ADRs, agent rules, or technical patterns.
13. **Contato em produção (cPanel)** — `ContactForm` chama `/contact.php`; segredos só em `contact.config.local.php` (não versionar). Não reintroduzir `src/app/api/contact` para o deploy estático descrito no README.
14. **Deploy local para cPanel** — o script `scripts/deploy-cpanel.mjs` depende de `CPANEL_FTP_*` no ambiente; ele envia `out/` via FTP/FTPS e ignora `contact.config.local.php` para não sobrescrever segredos em produção.
15. **Concorrência de upload no cPanel** — `CPANEL_FTP_CONCURRENCY` controla uploads simultâneos no script local, com limite máximo de `2` para compatibilidade com hospedagem compartilhada.
16. **UX do terminal no deploy local** — em terminal interativo, o script mostra status de conexão, barra de progresso colorida e só inicia uploads após todos os workers conectarem; em ambiente não interativo, faz fallback para logs lineares.

---

## Documentation Sync Protocol

This project serves multiple AI agents. Every agent has its own rules file. **When making structural changes, all files must be updated together** — a stale rules file causes future agents to work from wrong assumptions.

### Files and their consumers

| File | Consumed by | Scope |
|---|---|---|
| `AGENTS.md` | OpenAI Codex CLI (auto-loaded) + any LLM given project context | Full technical reference: architecture, gotchas, conventions |
| `README.md` | All agents + humans | Project overview, design system, section list |
| `.cursorrules` | Cursor | Component props, gotchas, structure, conventions |
| `.windsurfrules` | Windsurf | Tokens, conventions, critical gotchas |
| `CLAUDE.md` | Claude Code (auto-loaded) | Update triggers, multi-agent sync reminder |
| `.claude/settings.json` | Claude Code | Stop hook: reminder fires automatically at session end |
| `docs/knowledge/` | Obsidian + agents | Navigable technical memory, generated indexes, patterns |
| `docs/ARCHITECTURE.md` | Humanos + agentes | Composição, fluxos, fronteiras client/server |
| `adr/` | Decisões duradouras | ADRs versionadas; decisões de contato/deploy em ADR 005 |
| `.github/copilot-instructions.md` | GitHub Copilot | Stack, estrutura, regras rápidas |

### What to update in each file

**AGENTS.md** — the source of truth. Update:
- Project Architecture section (new/removed components, new props)
- Global CSS Utilities table (new classes, keyframes)
- Animation Conventions section (new patterns)
- Rules for Agents section (new gotchas)

**README.md** — update:
- Project structure tree (new files)
- Design System tables (new tokens, utilities)
- Seções table (new or reordered sections)
- Deploy / formulário (PHP, Resend, `contact.config.local.php`) quando o fluxo mudar

**docs/ARCHITECTURE.md** — update:
- Visão geral e diagramas se fronteiras ou fluxos mudarem (ex.: contato)

**adr/** — criar ou atualizar ADR quando a decisão for duradoura (ex.: ADR 005 — contato)

**.github/copilot-instructions.md** — manter estrutura `public/` e nota do formulário alinhadas ao código

**.cursorrules** — update:
- "Componentes UI" section (new component, new props, new gotchas)
- "Classes CSS globais" table (new utilities)
- "Estrutura de componentes" block
- "Convenções de animação" section

**.windsurfrules** — update:
- "Tokens do design system" table
- "Classes utilitárias globais" table
- "Componentes — props e gotchas críticos" section
- "Estrutura" block

### Trigger checklist

Update all four files when any of the following occurs:

- [ ] New component created in `src/components/`
- [ ] New prop added to an existing component (variant, behavior flag, visual option)
- [ ] New CSS utility class or keyframe added to `globals.css`
- [ ] New animation pattern or architectural convention established
- [ ] New gotcha or compatibility rule discovered (type conflict, library limitation)
- [ ] Section order changed in `page.tsx`
- [ ] Dependency added or upgraded with behavioral impact
- [ ] Durable decision, technical pattern, or agent rule changed (`npm run knowledge:sync`)

---

## Known Issues / Pending Work
