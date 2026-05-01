# MaximWeb Knowledge Vault

Este vault e a memoria tecnica navegavel para agentes de IA trabalhando na landing page MaximWeb.

## Comece Aqui

- [[_generated/project-map|Project Map]]
- [[_generated/agent-rules|Agent Rules]]
- [[_generated/adr-index|ADR Index]]
- [[patterns/agent-memory-policy|Agent Memory Policy]]
- [[patterns/documentation-update-flow|Documentation Update Flow]]

## Politica

- O codigo, `AGENTS.md`, `README.md`, `docs/` e `adr/` continuam sendo fonte de verdade.
- Arquivos em `_generated/` sao recriados por `npm run knowledge:sync`; nao edite manualmente.
- Decisoes duradouras devem virar ADR em `adr/`.
- Gotchas e padroes tecnicos podem comecar em `patterns/` e depois virar documentacao canonica.

## Rotina

1. Leia `AGENTS.md`.
2. Abra este indice no Obsidian para navegar pela memoria tecnica.
3. Depois de mudancas estruturais, decisoes tecnicas ou novos padroes, rode `npm run knowledge:sync`.
4. Antes de PRs com impacto documental, rode `npm run knowledge:check`.
