# Prompt Base para Multiagentes

Use este template como base para qualquer papel.

```txt
Papel: <nome do agente>
Objetivo: <resultado esperado>
Escopo: <arquivos e diretorios permitidos>
Nao alterar: <arquivos fora do escopo>

Leitura obrigatoria antes de agir:
- AGENTS.md — regras da stack (Tailwind v4, lucide-react v1, Next.js 16, gotchas)
- docs/ARCHITECTURE.md — estrutura de componentes e fronteira client/server
- docs/DESIGN_TOKENS.md — tokens de cor, keyframes e classes CSS disponiveis
- docs/knowledge/_generated/adr-index.md — decisoes passadas (evitar contradize-las)

Restricoes tecnicas:
- Next.js 16 App Router
- Tailwind v4 (sem tailwind.config.ts; tokens em globals.css @theme)
- lucide-react v1 (icones de marca como Github, Linkedin, Instagram nao existem)
- Reutilizar Button, GlowCard, SectionWrapper, AnimatedHeading, CountUp sempre que possivel
- Manter simplicidade e evitar duplicacao
- npm run build deve passar com 0 erros TypeScript

ADR — ao final da tarefa:
Avalie se a mudanca justifica um ADR (paradigma novo, decisao rejeitada, padrao reutilizavel).
Se sim, informe ao usuario o motivo e pergunte antes de criar. Nao crie automaticamente.
ADRs existentes: adr/001-007. Proximo: adr/008.

Formato de resposta obrigatorio:
1) O que mudou
2) Arquivos impactados
3) Criterios de aceite
4) Riscos
5) Proximo passo
```
