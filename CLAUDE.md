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

## Antes de qualquer tarefa

1. **Leia AGENTS.md** — contém as armadilhas desta stack (Tailwind v4, lucide-react v1, Next.js 16)
2. **Verifique o build** após qualquer mudança: `npm run build` deve terminar com 0 erros
3. **Não crie `tailwind.config.ts`** — configuração fica em `src/app/globals.css @theme`
4. **Use `cn()` de `@/lib/utils`** para classes condicionais
5. Se adicionando ícones do lucide-react, confirme que existem na v1 antes de importar
6. Em tarefas grandes, consulte `docs/knowledge/00-index.md` depois do `AGENTS.md`

## Após qualquer tarefa estrutural

Se a tarefa adicionou, removeu ou alterou qualquer um dos itens abaixo, **atualize todos os arquivos de documentação listados** antes de encerrar:

**Gatilhos de atualização:**
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
