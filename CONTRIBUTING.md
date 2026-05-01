# Guia de Contribuição — MaximWeb Landing Page

Obrigado por contribuir com este projeto. Este guia define os padrões que devem ser seguidos por humanos e agentes de IA ao trabalhar neste repositório.

---

## Pré-requisitos

- Node.js 18+
- npm 9+
- Familiaridade com Next.js App Router, Tailwind CSS v4 e Framer Motion

---

## Fluxo de trabalho

### 1. Criar uma branch

```bash
# Padrão de nomenclatura
git checkout -b feat/nome-da-feature
git checkout -b fix/descricao-do-bug
git checkout -b chore/descricao-da-tarefa
git checkout -b docs/descricao-da-documentacao
```

| Prefixo | Quando usar |
|---|---|
| `feat/` | Nova funcionalidade ou componente |
| `fix/` | Correção de bug |
| `chore/` | Tarefas técnicas (deps, config, scripts) |
| `docs/` | Somente documentação |
| `refactor/` | Refatoração sem mudança de comportamento |

### 2. Desenvolver

- Execute `npm run dev` para hot reload
- Mantenha o `npm run build` passando sem erros antes de qualquer commit
- Teste visualmente no browser em `localhost:3000`

### 3. Commit

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<tipo>(<escopo>): <descrição curta em português>

[corpo opcional — o porquê, não o quê]
```

**Tipos válidos:**

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `style` | Alterações visuais/CSS sem lógica |
| `refactor` | Refatoração sem mudança de comportamento |
| `chore` | Deps, config, scripts |
| `docs` | Documentação |
| `test` | Testes |

**Exemplos:**

```bash
git commit -m "feat(hero): adiciona parallax no scroll do indicator"
git commit -m "fix(navbar): corrige overflow do botão Fale Conosco em mobile"
git commit -m "style(globals): aumenta contraste dos cards glassmorphism"
git commit -m "chore(deps): atualiza framer-motion para v12.38"
```

### 4. Pull Request

- Título segue o mesmo padrão de commit: `feat(seção): descrição`
- Descreva o que mudou e por quê, não como
- Inclua screenshots se for mudança visual
- O build (`npm run build`) deve passar sem erros

---

## Padrões de código

### TypeScript

- Sempre tipado — sem `any` explícito
- Props de componentes como `interface`, não `type` inline
- Prefira `const` para funções de componente

```tsx
// ✅ Correto
interface CardProps {
  title: string
  description: string
  glowColor?: string
}

export default function Card({ title, description, glowColor }: CardProps) { ... }

// ❌ Evitar
export default function Card({ title, description, glowColor }: any) { ... }
```

### Componentes

- **Client Components**: obrigatório quando usa `useState`, `useEffect`, `useRef`, Framer Motion, event handlers
- **Server Components**: preferível para componentes puramente estáticos (Footer, seções sem interação)
- Um componente por arquivo
- Nomeação em PascalCase

```tsx
// ✅ Necessita 'use client'
'use client'
import { useState } from 'react'

// ✅ Server Component — sem diretiva
import { Zap } from 'lucide-react'
export default function Footer() { ... }
```

### Tailwind CSS v4

- **Não crie `tailwind.config.ts`** — tokens vão em `globals.css @theme`
- Use `cn()` de `@/lib/utils` para classes condicionais — nunca concatenação manual
- Tokens de cor e animação existentes antes de criar novos

```tsx
// ✅ Correto
import { cn } from '@/lib/utils'
<div className={cn('glass rounded-2xl p-6', isActive && 'border-brand-primary')} />

// ❌ Evitar
<div className={`glass rounded-2xl p-6 ${isActive ? 'border-brand-primary' : ''}`} />
```

### Animações (Framer Motion)

- **Entrada de seções**: use `SectionWrapper` com `variants={itemVariants}` nos filhos
- **Hover de cards**: `whileHover={{ scale: 1.03 }}` em `GlowCard`; `whileHover={{ y: -6 }}` em cards diretos
- **Hero**: animações locais com `containerVariants` / `itemVariants` próprios (não importar do SectionWrapper)
- Evite `duration` acima de `0.8s` para interações de hover

```tsx
// ✅ Scroll reveal correto
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'

<SectionWrapper id="servicos">
  <motion.div variants={itemVariants}>...</motion.div>
  <motion.div variants={itemVariants}>...</motion.div>
</SectionWrapper>
```

### Ícones (Lucide React v1)

Ícones de marca (`Github`, `Instagram`, `Linkedin`, `Twitter`) foram **removidos no v1**. Antes de adicionar um ícone, verifique se ele existe:

```bash
node -e "const l = require('lucide-react'); console.log(l.IconName ? 'existe' : 'não existe')"
```

---

## Design System

Não altere os tokens de cor ou as classes utilitárias globais sem discutir antes. Mudanças em `.glass`, `gradient-text` ou `btn-gradient` afetam toda a aplicação.

Para novos componentes visuais, siga:
- Fundo escuro com leve opacidade (`rgba(20, 20, 35, 0.92)`)
- Borda com transparência (`rgba(255, 255, 255, 0.07)` ou tint azul)
- Hover com `scale(1.03)` ou `y: -6` (não ambos)
- Glow azul (`rgba(59,130,246,0.35)`) como cor padrão de destaque

---

## Formulário de Contato

O `ContactForm` usa um `setTimeout` para simular o envio. Para implementar o envio real:

1. Crie `src/app/api/contact/route.ts`
2. Substitua o stub no `handleSubmit`:

```ts
// Substituir em ContactForm.tsx
const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
if (!res.ok) throw new Error('send failed')
```

---

## Verificação antes de abrir PR

```bash
# 1. Build limpo obrigatório
npm run build

# 2. Lint sem erros
npm run lint

# 3. Teste visual no browser
npm run dev
# Acesse localhost:3000 e navegue pelas seções
```

---

## Notas para agentes de IA

Consulte [AGENTS.md](AGENTS.md) para o guia técnico completo sobre stack, gotchas e regras específicas para automação.
