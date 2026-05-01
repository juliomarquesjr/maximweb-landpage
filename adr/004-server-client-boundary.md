# ADR 004 — Estratégia Client/Server Component boundary

**Data:** 2026-05-01
**Status:** Aceito

---

## Contexto

Next.js App Router distingue Server Components (padrão) de Client Components (`'use client'`). Componentes que usam Framer Motion, hooks React ou event handlers precisam ser client. A questão é: qual é a fronteira correta para este projeto?

---

## Decisão

**Server Components** (sem `'use client'`):
- `layout.tsx` — metadata e fonte apenas
- `page.tsx` — composição pura de componentes
- `Footer.tsx` — HTML estático, sem interação

**Client Components** (com `'use client'`):
- Todos os componentes de seção — usam Framer Motion
- `Navbar.tsx` — usa `useState` e `useEffect` para scroll
- `Button.tsx`, `GlowCard.tsx`, `SectionWrapper.tsx` — Framer Motion

A fronteira é o mais alto possível na árvore que ainda faz sentido ser servidor.

---

## Consequências

**Positivas:**
- `Footer` e `layout` reduzem o bundle JavaScript do cliente
- `page.tsx` como Server Component permite que o Next.js otimize a árvore de componentes

**Negativas / Cuidados:**
- `Footer.tsx` usa `new Date().getFullYear()` — foi substituído por `const COPYRIGHT_YEAR = 2026` para evitar hidratação divergente entre servidor e cliente em viradas de ano
- Ao adicionar novos componentes: verificar se Framer Motion é necessário antes de adicionar `'use client'`
- Server Components não podem receber callbacks (`onClick`) — se Footer precisar de interatividade futura, mover para client
