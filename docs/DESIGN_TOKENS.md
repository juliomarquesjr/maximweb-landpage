# Design Tokens — MaximWeb Landing Page

Referência completa do sistema visual. Todos os tokens são definidos em `src/app/globals.css @theme` e geram classes Tailwind automaticamente.

---

## Cores

### Primárias

| Token CSS | Classe Tailwind | Hex | Uso |
|---|---|---|---|
| `--color-brand-primary` | `brand-primary` | `#3B82F6` | Botões, bordas ativas, ícones principais |
| `--color-brand-glow` | `brand-glow` | `#60A5FA` | Texto de destaque, ícones secundários, hover states |

**Uso no código:**
```tsx
<div className="bg-brand-primary text-white" />       // fundo azul sólido
<span className="text-brand-glow" />                   // texto azul claro
<div className="border border-brand-primary/30" />     // borda azul 30% opacidade
<div className="hover:bg-brand-primary/10" />          // hover com azul 10%
```

### Backgrounds

| Token CSS | Classe Tailwind | Hex | Uso |
|---|---|---|---|
| `--color-bg-main` | `bg-main` | `#0B0B0F` | Fundo padrão (Hero, Services, Differentials, Contact) |
| `--color-bg-secondary` | `bg-secondary` | `#111118` | Fundo alternado (Products, CTA, Footer) |
| `--color-bg-card` | `bg-card` | `#14142A` | Fundo de cards diretos (Differentials) |

**Alternância de seções:**
```
Hero         → bg-bg-main
Services     → bg-bg-main
Products     → bg-bg-secondary
Differentials → bg-bg-main
CTA          → bg-bg-secondary
Contact      → bg-bg-main
Footer       → bg-bg-secondary
```

### Bordas e texto

| Token CSS | Classe Tailwind | Hex | Uso |
|---|---|---|---|
| `--color-border-subtle` | `border-subtle` | `#272740` | Bordas de cards, separadores |
| `--color-text-muted` | `text-muted` | `#6B7280` | Texto secundário, placeholders, labels |

---

## Gradientes

Os gradientes não têm tokens — são usados como classes utilitárias ou inline styles.

### `.gradient-text`
```css
background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #818CF8 100%);
-webkit-text-fill-color: transparent;
```
Aplicado em palavras-chave dos títulos: "transformam", "Serviços", "Produtos", etc.

```tsx
<span className="gradient-text">transformam</span>
```

### `.btn-gradient`
```css
background: linear-gradient(135deg, #3B82F6, #60A5FA, #818CF8);
background-size: 200% 200%;
animation: gradient-shift 4s ease infinite;
```
Usado em botões `variant="primary"` do componente `Button`.

### Glows de produtos (inline)
Cada produto tem uma cor de glow distinta:

| Produto | Glow Color |
|---|---|
| Loja em Shopping | `rgba(59,130,246,0.35)` — Azul |
| Transporte Escolar | `rgba(16,185,129,0.3)` — Verde |
| Pedidos Lanchonetes | `rgba(245,158,11,0.3)` — Âmbar |
| Agendamento Lavagens | `rgba(139,92,246,0.3)` — Violeta |

---

## Tipografia

### Fonte

| Token CSS | Classe Tailwind | Valor |
|---|---|---|
| `--font-inter` | `font-inter` | `var(--font-inter-var), sans-serif` |

`--font-inter-var` é injetado pelo `next/font/google` em `layout.tsx`.

**Nunca use `font-sans` neste projeto** — use `font-inter` ou deixe herdar do `body`.

### Escala tipográfica (padrões de uso)

| Elemento | Classes | Onde usado |
|---|---|---|
| H1 Hero | `text-5xl sm:text-6xl lg:text-7xl font-extrabold` | `Hero.tsx` |
| H2 Seção | `text-4xl sm:text-5xl font-extrabold` | Todos os `<h2>` de seção |
| H3 Card | `text-xl font-bold` (Services) / `text-lg font-bold` (outros) | Títulos de cards |
| Label seção | `text-sm font-semibold uppercase tracking-widest text-brand-glow` | "O que fazemos", "Portfólio", etc. |
| Body | `text-lg leading-relaxed text-slate-400` | Parágrafos de seção |
| Body card | `text-sm leading-relaxed text-text-muted` | Descrições dentro de cards |
| Caption | `text-xs text-text-muted` | Labels de stats, footer |

---

## Animações

### Tokens de animação

| Token CSS | Classe Tailwind | Definição |
|---|---|---|
| `--animate-glow-pulse` | `animate-glow-pulse` | `glow-pulse 2.5s ease-in-out infinite` |
| `--animate-float` | `animate-float` | `float 4s ease-in-out infinite` |
| `--animate-gradient-shift` | `animate-gradient-shift` | `gradient-shift 4s ease infinite` (usado no `.btn-gradient`) |
| `--animate-fade-in-up` | `animate-fade-in-up` | `fade-in-up 0.6s ease forwards` |

### Keyframes

```
glow-pulse:      box-shadow 0→intenso→0 (botão CTA)
float:           translateY 0→-12px→0 (elementos flutuantes)
gradient-shift:  backgroundPosition 0%→100%→0% (botão primário)
fade-in-up:      opacity+translateY 0→1 (entrada one-shot)
```

### Timing de animações Framer Motion

| Animação | Duration | Ease |
|---|---|---|
| Scroll reveal (itemVariants) | `0.65s` | `[0.25, 0.46, 0.45, 0.94]` |
| Hero items | `0.7s` | `[0.25, 0.46, 0.45, 0.94]` |
| Navbar height | `0.25s` | `easeInOut` |
| GlowCard hover scale | `0.25s` | `easeOut` |
| Stagger delay entre filhos | `0.12s` | — |
| Hero stagger delay inicial | `0.3s` | — |

---

## Classes utilitárias globais

### `.glass`
```css
background: rgba(20, 20, 35, 0.92);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.07);
```
Usada em: Navbar (scrolled), GlowCard, badge do Hero, mobile menu, ContactForm card.

### `.hero-grid`
```css
background-image:
  linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
  linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px);
background-size: 60px 60px;
```
Usada apenas no Hero como textura de fundo.

### `.dark-input`
```css
background: rgba(17, 17, 24, 0.8);
border: 1px solid rgba(30, 30, 46, 0.9);
/* focus: border-color #3B82F6 + box-shadow glow */
```
Usada em todos os inputs e textarea do ContactForm.

### `.section-divider`
```css
height: 1px;
background: linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.4) 50%, transparent 100%);
```
Usada entre todas as seções em `page.tsx`.

---

## Espaçamento

O sistema segue a escala de 8px do Tailwind:

| Token | px | Uso principal |
|---|---|---|
| `p-6` | 24px | Padding interno de cards |
| `px-6` | 24px | Padding horizontal de seções |
| `py-24` | 96px | Padding vertical de seções (`SectionWrapper` default) |
| `gap-6` | 24px | Gap entre cards em grid |
| `gap-4` | 16px | Gap entre botões no Hero |
| `mb-16` | 64px | Margem do header de seção para os cards |
| `mb-6` | 24px | Margem de H3 para descrição |

---

## Breakpoints responsivos

| Nome | Min-width | Uso |
|---|---|---|
| `sm` | 640px | Hero: fonte maior, botões em linha |
| `md` | 768px | Navbar: mostrar links desktop; Services: 3 colunas |
| `lg` | 1024px | Products/Differentials: 4 colunas; Footer: 5 colunas |
| `xl` | 1280px | Contido por `max-w-7xl` |
