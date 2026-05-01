# Arquitetura — MaximWeb Landing Page

Este documento explica as decisões de design do sistema, padrões de composição e fluxo de dados. Leia antes de modificar a estrutura de componentes.

---

## Visão geral

A página é uma **single-page application estática** (Next.js SSG). Não há roteamento, API routes (por enquanto) ou estado global. Toda a interatividade é local a cada componente.

```
Browser
  └── RootLayout (Server)
        ├── Navbar (Client)          ← scroll listener
        └── main
              ├── Hero (Client)      ← Framer Motion entrance
              ├── Services (Client)  ← scroll reveal
              ├── Products (Client)  ← scroll reveal
              ├── Differentials (Client) ← scroll reveal
              ├── CTA (Client)       ← whileInView
              └── ContactForm (Client) ← form state
        └── Footer (Server)
```

---

## Fronteira Client / Server

### Server Components (sem `'use client'`)
| Componente | Por quê server |
|---|---|
| `layout.tsx` | Apenas metadata e fonte — sem interação |
| `Footer.tsx` | HTML estático — links e texto |
| `page.tsx` | Composição pura — sem lógica |

### Client Components (com `'use client'`)
Todos os outros — necessitam de Framer Motion (que acessa o DOM) ou React hooks.

**Regra**: se um componente usa `motion.*`, `useEffect`, `useState`, `useRef` ou event handlers (`onClick`, `onSubmit`), ele é client.

---

## Sistema de animações

### Camada 1: Entrada de seção (scroll reveal)

`SectionWrapper` é o único lugar onde `useInView` é configurado. Todos os filhos recebem animações via `variants`.

```
SectionWrapper
  useRef → <section ref={ref}>
  useInView(ref, { once: true, margin: '-80px' })
  motion.div (containerVariants: staggerChildren 0.12s)
    └── children com variants={itemVariants}
            opacity: 0→1, y: 40→0, duration: 0.65s
```

**Regra**: sempre importe `itemVariants` de `SectionWrapper`, não redefina.

```tsx
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'

// Filho recebe a animação automaticamente
<motion.div variants={itemVariants}>...</motion.div>
```

### Camada 2: Hero (animação de entrada na carga)

O Hero não usa `SectionWrapper` porque dispara na carga da página (`animate="visible"` direto), não no scroll. Tem `containerVariants` e `itemVariants` próprios com `delayChildren: 0.3` para dar tempo ao navegador de renderizar.

### Camada 3: Hover interações

| Componente | Efeito | Implementação |
|---|---|---|
| `GlowCard` | `scale(1.03)` + glow overlay | `whileHover={{ scale: 1.03 }}` + `opacity-0 group-hover:opacity-100` |
| Differentials card | `y: -6px` | `whileHover={{ y: -6 }}` |
| CTA button | `scale(1.05)` + `scale(0.97)` tap | `whileHover` + `whileTap` |

### Camada 4: CSS animations (contínuas)

Não usam Framer Motion — são CSS puras via `@keyframes`:
- `.btn-gradient` → `gradient-shift` (animação de fundo do botão)
- `.animate-glow-pulse` → `glow-pulse` (box-shadow no CTA)
- `.animate-float` → disponível para elementos flutuantes

---

## Sistema de design (CSS Architecture)

### Decisão: Tailwind v4 sem config file

O projeto usa Tailwind v4, que move a configuração para CSS via `@theme`. Isso foi escolhido porque:
1. É o padrão canônico da v4
2. Evita um arquivo de configuração extra para LLMs processarem
3. Os tokens ficam no mesmo arquivo que as classes utilitárias, dando contexto

Todos os tokens em `globals.css @theme` geram classes Tailwind automaticamente:
- `--color-brand-primary` → `bg-brand-primary`, `text-brand-primary`, `border-brand-primary`, etc.
- `--animate-glow-pulse` → `animate-glow-pulse`
- `--font-inter` → `font-inter`

### Classes utilitárias vs. componentes Tailwind

Classes utilitárias globais (`.glass`, `.hero-grid`, etc.) são definidas em `globals.css` porque:
- São usadas em múltiplos componentes
- Combinam múltiplas propriedades CSS que não têm equivalente em uma única classe Tailwind
- Precisam de `backdrop-filter` e `-webkit-backdrop-filter` juntos

---

## Componentes reutilizáveis

### `Button`

```tsx
<Button variant="primary" size="lg" loading={false}>texto</Button>
```

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho (padding + font-size) |
| `loading` | `boolean` | `false` | Mostra spinner, desabilita |

`primary` usa `.btn-gradient` (gradiente animado).
`secondary` usa `.glass` com bordas azuis.
`ghost` é texto puro com hover de fundo.

### `GlowCard`

```tsx
<GlowCard glowColor="rgba(59,130,246,0.35)">conteúdo</GlowCard>
```

- Já inclui `variants={itemVariants}` — funciona dentro de `SectionWrapper` automaticamente
- `glowColor` define a cor do `box-shadow` no hover (padrão: azul)
- O overlay de glow usa `group-hover:opacity-100` — o card precisa ter `group` no pai ou no próprio elemento (o `GlowCard` já adiciona `group`)

### `SectionWrapper`

```tsx
<SectionWrapper id="secao" className="bg-bg-secondary">
  <motion.div variants={itemVariants}>...</motion.div>
</SectionWrapper>
```

- Gera `<section id={id} className="py-24 px-6 {className}">`
- Controla o stagger de todos os filhos diretos que tenham `variants`

---

## Formulário de contato

### Estado atual (stub)
```
handleSubmit → validate() → setTimeout(1800ms) → setStatus('success')
```

### Integração real (quando backend estiver pronto)
```
handleSubmit → validate() → fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
```

A rota de API deve ser criada em `src/app/api/contact/route.ts` seguindo o padrão de Route Handlers do Next.js App Router.

---

## Convenções de nomenclatura

| Tipo | Padrão | Exemplo |
|---|---|---|
| Componentes | PascalCase | `GlowCard.tsx` |
| Hooks | camelCase com `use` | `useScrolled.ts` (se criado) |
| Utilitários | camelCase | `utils.ts` |
| CSS classes | kebab-case | `.hero-grid`, `.btn-gradient` |
| CSS variables | kebab-case | `--color-brand-primary` |
| Constantes | UPPER_SNAKE_CASE | `NAV_LINKS`, `SERVICES` |

---

## Fluxo de scroll na Navbar

```
window 'scroll' event (passive)
  → window.scrollY > 24px?
      Sim → className += 'glass border-b shadow-lg'
      Não → className = 'bg-transparent'
```

Intencionalmente implementado com `addEventListener` (não Framer Motion `useScroll`) para ter zero dependência do sistema de animações e mínimo overhead de performance.
