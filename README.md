# MaximWeb — Landing Page

Landing page premium para a agência **MaximWeb**, construída com Next.js 16, Tailwind CSS v4 e Framer Motion. Design dark com glassmorphism, glows azuis e animações de scroll, no padrão visual Dribbble.

---

## Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2 | Framework (App Router + Turbopack) |
| [React](https://react.dev) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilização utilitária |
| [Framer Motion](https://www.framer.com/motion) | 12 | Animações e transições |
| [Lucide React](https://lucide.dev) | 1 | Ícones SVG |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | — | Utilitário de classes condicionais |

---

## Pré-requisitos

- Node.js 18+
- npm 9+

---

## Instalação

```bash
# Clonar o repositório
git clone <url-do-repo>
cd maximweb-landpage

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com Turbopack (hot reload) |
| `npm run build` | Build de produção |
| `npm run start` | Inicia o servidor de produção (após build) |
| `npm run lint` | Executa ESLint |
| `npm run knowledge:sync` | Regenera os indices do vault Obsidian em `docs/knowledge/_generated` |
| `npm run knowledge:check` | Verifica se o vault Obsidian esta atualizado |

---

## Estrutura do projeto

```
maximweb-landpage/
├── .claude/
│   └── settings.json          # Configuração do MCP Playwright (testes visuais)
├── public/                    # Assets estáticos
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind @theme + keyframes + utilitários globais
│   │   ├── layout.tsx         # Root layout (fonte Inter, metadata)
│   │   └── page.tsx           # Página principal (composição das seções)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Navbar fixa + scroll progress bar no topo
│   │   │   └── Footer.tsx     # Rodapé com links e ícones sociais (server component)
│   │   ├── sections/
│   │   │   ├── Hero.tsx       # Hero com parallax, cena de construção digital e stats animados
│   │   │   ├── Services.tsx   # Serviços (3 GlowCards)
│   │   │   ├── Products.tsx   # Produtos (4 GlowCards com glows coloridos)
│   │   │   ├── Differentials.tsx # Diferenciais (4 cards com top-accent hover)
│   │   │   ├── CTA.tsx        # Call to action com botão pulsante e magnético
│   │   │   └── ContactForm.tsx # Formulário de contato com validação client-side
│   │   └── ui/
│   │       ├── Button.tsx     # Botão reutilizável; props: variant, size, loading, magnetic
│   │       ├── GlowCard.tsx   # Card glassmorphism com 3D tilt e hover glow
│   │       ├── SectionWrapper.tsx # Wrapper com scroll-reveal (useInView + stagger)
│   │       ├── AnimatedHeading.tsx # Título com animação palavra por palavra
│   │       ├── CountUp.tsx    # Número animado de 0→N ao entrar no viewport
│   │       └── TechMarquee.tsx # Faixa infinita de tecnologias (server component)
│   └── lib/
│       └── utils.ts           # Função cn() para classes condicionais
├── AGENTS.md                  # Guia técnico para agentes de IA
├── CLAUDE.md                  # Instruções para o Claude Code
├── CONTRIBUTING.md            # Guia de contribuição
└── README.md                  # Este arquivo
```

---

## Design System

### Paleta de cores

| Token Tailwind | Hex | Uso |
|---|---|---|
| `brand-primary` | `#3B82F6` | Botões, bordas, acentos |
| `brand-glow` | `#60A5FA` | Ícones, destaques de texto |
| `bg-main` | `#0B0B0F` | Fundo principal (seções escuras) |
| `bg-secondary` | `#111118` | Fundo alternado |
| `bg-card` | `#14142A` | Fundo de cards (Diferenciais) |
| `border-subtle` | `#272740` | Bordas de cards |
| `text-muted` | `#6B7280` | Texto secundário |

### Classes utilitárias globais

| Classe | Efeito |
|---|---|
| `.glass` | Glassmorphism: fundo semi-opaco + blur + borda sutil |
| `.hero-grid` | Grid futurista de linhas azuis no background |
| `.gradient-text` | Texto com gradiente azul→indigo |
| `.btn-gradient` | Botão com gradiente animado |
| `.dark-input` | Input escuro com glow azul no foco |
| `.section-divider` | Linha divisória com gradiente azul central |
| `.gradient-border-card` | Linha accent no topo do card que aparece e expande no hover |
| `body::after` | Textura estática de film grain (SVG turbulence, decorativa) |

### Tipografia

Fonte principal: **Inter** (via `next/font/google`)

| Nível | Tamanho | Uso |
|---|---|---|
| H1 | `text-5xl` → `text-7xl` | Headline Hero |
| H2 | `text-4xl` → `text-5xl` | Títulos de seção |
| H3 | `text-lg` → `text-xl` | Títulos de card |
| Body | `text-sm` → `text-lg` | Descrições |

---

## Seções da página

| Ordem | Componente | Background | Destaques |
|---|---|---|---|
| — | `Navbar.tsx` | Transparente → glass no scroll | Scroll progress bar |
| 1 | `Hero.tsx` | `bg-main` + hero-grid + radial glow | Parallax, floating orbs, cena de construção digital, CountUp stats, botão magnético |
| 2 | `TechMarquee.tsx` | `bg-secondary/50` | Marquee infinito de tecnologias |
| 3 | `Services.tsx` | `bg-main` | 3 GlowCards com 3D tilt |
| 4 | `Products.tsx` | `bg-secondary` | 4 GlowCards com glow colorido por card |
| 5 | `Differentials.tsx` | `bg-main` | Top-accent hover, hover y:-6 |
| 6 | `CTA.tsx` | `bg-secondary` | Botão magnético pulsante |
| 7 | `ContactForm.tsx` | `bg-main` | Validação client-side |
| — | `Footer.tsx` | `bg-secondary` | Server component |

---

## Configuração de MCP (Playwright)

O projeto inclui o [Playwright MCP](https://github.com/microsoft/playwright-mcp) para testes visuais no Claude Code. Para usar:

1. Abra o Claude Code a partir desta pasta (ele lê `.claude/settings.json` na inicialização)
2. O servidor Playwright estará disponível como ferramenta
3. Use para navegar, tirar screenshots e validar mudanças visuais em tempo real

---

## TODOs conhecidos

- [ ] Conectar `ContactForm` a um endpoint real (substituir o `setTimeout` stub)
- [ ] Adicionar URLs reais nos links de redes sociais do `Footer`
- [ ] Adicionar rota `/api/contact` com envio de e-mail (ex: Resend)
- [ ] Implementar OG image dinâmica (`opengraph-image.tsx`)
- [ ] Adicionar página de política de privacidade

---

## Deploy

O deploy mais simples é via [Vercel](https://vercel.com):

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Ou conecte o repositório diretamente no painel da Vercel para deploy automático em cada push para `main`.

---

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para o guia completo de contribuição.

## Playbook de Multiagentes

Para acelerar tarefas com IA usando papeis paralelos (planner, UI, copy e QA), consulte:

- [docs/multiagentes/README.md](docs/multiagentes/README.md)

## Obsidian Knowledge Vault

O projeto inclui um vault Obsidian versionado em [docs/knowledge/00-index.md](docs/knowledge/00-index.md), focado em memoria tecnica para agentes.

- A fonte de verdade continua sendo o codigo, `AGENTS.md`, `README.md`, `docs/` e `adr/`.
- Arquivos em `docs/knowledge/_generated/` sao recriados por `npm run knowledge:sync`.
- Antes de PRs com mudancas estruturais, decisoes tecnicas ou novos padroes, rode `npm run knowledge:check`.
- Abra `docs/knowledge/` no Obsidian para navegar por regras, arquitetura, ADRs e padroes tecnicos.

---

## Licença

Proprietário — MaximWeb. Todos os direitos reservados.
