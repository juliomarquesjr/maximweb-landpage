# MaximWeb Knowledge Vault

Este vault é a memória técnica navegável para agentes de IA e humanos trabalhando na landing page MaximWeb.

## Entrada Rápida para Agentes

> Não abra o Obsidian — leia os arquivos diretamente pelas paths abaixo.

| Se você está prestes a... | Leia primeiro |
|---|---|
| Modificar estrutura de componentes ou fronteira client/server | [`docs/ARCHITECTURE.md`](../../ARCHITECTURE.md) |
| Usar ou criar tokens de cor, fonte, keyframe ou classe CSS | [`docs/DESIGN_TOKENS.md`](../../DESIGN_TOKENS.md) |
| Criar documentação ou avaliar se algo vira ADR | [`patterns/documentation-update-flow`](patterns/documentation-update-flow.md) |
| Entender por que uma decisão foi tomada | [`_generated/adr-index`](_generated/adr-index.md) |
| Ver quais arquivos e dependências existem no projeto | [`_generated/project-map`](_generated/project-map.md) |
| Entender o que o vault deve e não deve conter | [`patterns/agent-memory-policy`](patterns/agent-memory-policy.md) |

## Todos os Documentos

- [_generated/project-map](_generated/project-map.md) — mapa de arquivos, scripts e dependências (gerado)
- [_generated/agent-rules](_generated/agent-rules.md) — índice de regras por fonte (gerado)
- [_generated/adr-index](_generated/adr-index.md) — índice de todos os ADRs (gerado)
- [patterns/agent-memory-policy](patterns/agent-memory-policy.md) — o que o vault deve e não deve conter
- [patterns/documentation-update-flow](patterns/documentation-update-flow.md) — quando e como atualizar docs e ADRs

## Política

- O código, `AGENTS.md`, `README.md`, `docs/` e `adr/` continuam sendo fonte de verdade.
- Arquivos em `_generated/` são recriados por `npm run knowledge:sync`; não edite manualmente.
- Se uma nota do vault contradizer `AGENTS.md` ou um ADR aceito, a fonte canônica vence.
- Decisões duradouras devem virar ADR em `adr/`. Gotchas pequenos podem começar em `patterns/`.

## Rotina para Agentes

1. Leia `AGENTS.md`.
2. Consulte os arquivos desta tabela conforme o cenário da tarefa (não é necessário ler tudo sempre).
3. Após mudanças estruturais, decisões técnicas ou novos padrões, rode `npm run knowledge:sync`.
4. Antes de PRs com impacto documental, rode `npm run knowledge:check`.
