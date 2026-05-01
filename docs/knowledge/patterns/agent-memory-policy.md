# Agent Memory Policy

## Objetivo

Manter uma memoria tecnica curta, navegavel e versionada para agentes sem criar uma segunda fonte de verdade.

## Fonte de Verdade

- Codigo e configuracoes do projeto.
- `AGENTS.md` para regras completas de agentes.
- `README.md` para visao geral humana e tecnica.
- `docs/` para arquitetura, design system e playbooks.
- `adr/` para decisoes duradouras.

## Papel do Obsidian

- Conectar documentos existentes.
- Resumir regras operacionais importantes.
- Facilitar descoberta de ADRs, padroes e gotchas.
- Registrar aprendizados tecnicos ainda pequenos demais para uma ADR.

## Regra de Conflito

Se uma nota deste vault contradizer codigo, `AGENTS.md` ou uma ADR aceita, a fonte canonica vence. Atualize a nota ou rode `npm run knowledge:sync`.
