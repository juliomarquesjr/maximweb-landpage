@AGENTS.md

# MaximWeb — Contexto para LLMs

Este é o repositório da landing page da agência **MaximWeb**. Leia os documentos abaixo antes de qualquer tarefa.

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [README.md](README.md) | Visão geral, stack, estrutura, design system, scripts |
| [AGENTS.md](AGENTS.md) | Guia técnico completo — gotchas, tokens, convenções, regras |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Padrões de código, commits, branch naming, PR checklist |
| [docs/knowledge/00-index.md](docs/knowledge/00-index.md) | Vault Obsidian com memoria tecnica navegavel para agentes |
| [adr/005-formulario-contato-php-resend.md](adr/005-formulario-contato-php-resend.md) | Decisão: contato via `public/contact.php` + Resend (cPanel) |

## Antes de qualquer tarefa

1. **Leia AGENTS.md** — contém as armadilhas desta stack (Tailwind v4, lucide-react v1, Next.js 16)
2. **Verifique o build** após qualquer mudança: `npm run build` deve terminar com 0 erros
3. **Não crie `tailwind.config.ts`** — configuração fica em `src/app/globals.css @theme`
4. **Use `cn()` de `@/lib/utils`** para classes condicionais
5. Se adicionando ícones do lucide-react, confirme que existem na v1 antes de importar

## Quando consultar o vault (`docs/knowledge/`)

O vault não substitui o `AGENTS.md` — ele complementa com contexto que o `AGENTS.md` não carrega. Consulte os arquivos abaixo nos cenários indicados:

| Quando... | Leia |
|---|---|
| Antes de modificar estrutura de componentes, fronteira client/server ou fluxo de dados | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) |
| Antes de usar ou criar qualquer token de cor, fonte, keyframe ou classe utilitária | [`docs/DESIGN_TOKENS.md`](docs/DESIGN_TOKENS.md) |
| Antes de criar qualquer documentação ou decidir se algo vira ADR | [`docs/knowledge/patterns/documentation-update-flow.md`](docs/knowledge/patterns/documentation-update-flow.md) |
| Para navegar todos os ADRs e entender decisões passadas | [`docs/knowledge/_generated/adr-index.md`](docs/knowledge/_generated/adr-index.md) |
| Para ver o mapa de arquivos, dependências e versões do projeto | [`docs/knowledge/_generated/project-map.md`](docs/knowledge/_generated/project-map.md) |
| Em caso de dúvida sobre o papel do vault vs. documentação canônica | [`docs/knowledge/patterns/agent-memory-policy.md`](docs/knowledge/patterns/agent-memory-policy.md) |

> Regra de ouro: se a dúvida é "o que existe aqui?", leia `project-map.md`. Se é "por que foi decidido assim?", leia `adr-index.md`. Se é "como devo estruturar ou documentar?", leia `documentation-update-flow.md`.

## ADR — Architecture Decision Records

Após concluir qualquer tarefa, avalie se a mudança justifica um novo ADR. **Nunca crie o ADR sem antes perguntar ao usuário**, informando o motivo.

**Critérios para propor um ADR** (se qualquer um for verdadeiro):
- Mudança de paradigma de interação (ex: formulário plano → wizard, layout estático → animado por passo)
- Nova convenção de animação ou padrão de componente que será reutilizado
- Escolha de biblioteca ou estratégia com alternativas explicitamente rejeitadas
- Decisão de fronteira server/client com impacto em múltiplos componentes
- Mudança de arquitetura de deploy ou integração backend
- Qualquer decisão que um agente futuro possa "corrigir" sem entender o contexto

**Não propor ADR para:**
- Correções de bug, ajustes visuais ou refatorações locais
- Adição de props em componentes existentes
- Mudanças de copy ou conteúdo
- Atualizações de documentação

**Como propor:** ao final da resposta, diga ao usuário algo como:
> "Esta mudança [descreva em 1 linha] envolve [motivo: decisão duradoura / alternativas rejeitadas / padrão novo]. Deseja que eu crie um ADR documentando a decisão?"

Se o usuário confirmar, crie o arquivo em `adr/NNN-titulo-kebab-case.md` seguindo o padrão dos ADRs existentes (Contexto → Decisão → Consequências → Referências) e rode `npm run knowledge:sync` ao final.

ADRs existentes: `adr/001` a `adr/007`. O próximo seria `adr/008`.

---

## Após qualquer tarefa estrutural

Se a tarefa adicionou, removeu ou alterou qualquer um dos itens abaixo, **atualize todos os arquivos de documentação listados** antes de encerrar:

**Gatilhos de atualização:**
- Novo ou alterado endpoint de contato (`public/contact.php`, config PHP) ou fluxo Resend
- Novo componente em `src/components/`
- Nova prop relevante em componente existente (ex: variante, comportamento, flag)
- Nova classe utilitária ou keyframe em `globals.css`
- Nova convenção de animação ou padrão arquitetural
- Novo gotcha ou regra de compatibilidade descoberta (ex: conflito de tipos, limitação de biblioteca)
- Alteração na ordem das seções em `page.tsx`

**Arquivos a atualizar (todos, sem exceção):**

| Arquivo | Agente que consome | O que manter atualizado |
|---|---|---|
| `AGENTS.md` | OpenAI Codex CLI + qualquer LLM | Arquitetura, gotchas, convenções completas |
| `README.md` | Todos (referência humana e LLM) | Estrutura do projeto, design system, seções |
| `.cursorrules` | Cursor | Props de componentes, gotchas, estrutura |
| `.windsurfrules` | Windsurf | Tokens, convenções, gotchas críticos |
| `docs/knowledge/` | Obsidian + agentes | Memoria tecnica, indices gerados e padroes navegaveis |

> A documentação desatualizada é mais prejudicial do que nenhuma documentação — ela induz agentes futuros a erro.

Depois de qualquer mudanca estrutural, decisao tecnica duradoura ou novo padrao reutilizavel, rode `npm run knowledge:sync` para atualizar `docs/knowledge/_generated/`.

## Servidor de desenvolvimento

```bash
npm run dev   # http://localhost:3000
```

O Playwright MCP está configurado em `.claude/settings.json` para testes visuais. Está disponível quando o Claude Code é iniciado nesta pasta.
