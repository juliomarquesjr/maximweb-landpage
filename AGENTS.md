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
src/
  app/
    layout.tsx          — Inter font, suppressHydrationWarning on <html>, metadata pt-BR
    page.tsx            — assembles all sections in order
    globals.css         — @theme tokens + keyframes + utility classes (.glass, .hero-grid, etc.)
  lib/
    utils.ts            — cn() helper (clsx + tailwind-merge)
  components/
    ui/
      Button.tsx        — variants: primary | secondary | ghost; prop: loading (shows spinner)
      SectionWrapper.tsx — scroll-reveal via useInView; exports itemVariants for child stagger
      GlowCard.tsx      — glassmorphism card with configurable hover glow color
    layout/
      Navbar.tsx        — transparent → glass on scroll >24px; AnimatePresence mobile menu
      Footer.tsx        — server component (no 'use client')
    sections/
      Hero.tsx          — full-viewport, hero-grid bg, radial glow, stagger animation
      Services.tsx      — 3 GlowCards (Dev, Automação, Soluções)
      Products.tsx      — 4 GlowCards with per-card glow colors
      Differentials.tsx — 4 cards with bg-bg-card + border-border-subtle, hover y:-6
      CTA.tsx           — pulsing gradient button (animate-glow-pulse)
      ContactForm.tsx   — client-side validation; setTimeout stub → replace with real endpoint
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
| `.hero-grid` | CSS grid lines overlay (60px, blue tint) |
| `.gradient-text` | Blue→indigo gradient on text using `background-clip: text` |
| `.btn-gradient` | Animated gradient background (gradient-shift keyframe) |
| `.dark-input` | Dark form inputs with blue glow on `:focus` |
| `.section-divider` | 1px horizontal line with blue gradient center |
| `.focus-ring` | Blue outline on `:focus-visible` |

### Animation Conventions
- Section entry: `SectionWrapper` with `useInView`. Children use `variants={itemVariants}` imported from `SectionWrapper.tsx`.
- Hover cards: `whileHover={{ scale: 1.03 }}` in `GlowCard`, `whileHover={{ y: -6 }}` in Differentials.
- Hero: standalone `containerVariants` + `itemVariants` defined locally (not from SectionWrapper).
- CSS animations: `animate-glow-pulse` on CTA button; `btn-gradient` uses `gradient-shift` keyframe.

---

## Development

```bash
npm run dev     # starts at http://localhost:3000
npm run build   # must pass with 0 TypeScript errors before any PR
```

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

## Known Issues / TODOs
- `ContactForm.tsx`: `handleSubmit` uses `setTimeout` to simulate a POST. Replace with `fetch('/api/contact', ...)` when a backend route is added.
- `Footer.tsx`: Social icon `href` values are `#` placeholders. Replace with real URLs.
- `suppressHydrationWarning` on `<html>` is intentional — suppresses mismatches caused by browser extensions (e.g., LanguageTool) that inject attributes on the client.

---

## Rules for Agents

1. **Run `npm run build` after any change** — Turbopack is strict about TypeScript; catch errors before reporting work done.
2. **No new `tailwind.config.ts`** — all tokens go in `globals.css @theme`.
3. **Framer Motion components require `'use client'`** — add the directive to any file using `motion`, `useInView`, `AnimatePresence`, etc.
4. **Server Components stay server** — `Footer.tsx` and `layout.tsx` are intentionally server components. Don't add `'use client'` to them without a reason.
5. **Use `cn()` from `@/lib/utils`** for conditional class merging — never string concatenation.
6. **Check lucide-react availability** — if adding a new icon, verify it exists in v1 before using it.
