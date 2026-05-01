# Documentation Update Flow

Use este fluxo quando uma tarefa alterar estrutura, convencoes ou decisoes tecnicas.

## Quando Atualizar

- Novo componente ou prop relevante.
- Nova classe global, token, keyframe ou padrao visual.
- Mudanca em fronteira client/server.
- Novo gotcha de Next.js, Tailwind, Framer Motion ou lucide-react.
- Decisao duradoura sobre arquitetura, dependencia ou processo.

## Ordem Recomendada

1. Atualize a documentacao canonica apropriada.
2. Crie ou atualize uma ADR se a decisao for duradoura.
3. Rode `npm run knowledge:sync`.
4. Rode `npm run knowledge:check` antes do PR.

## O Que Nao Fazer

- Nao edite `_generated/` manualmente.
- Nao use o vault para esconder decisoes que deveriam estar em ADR.
- Nao deixe uma nota manual contradizer `AGENTS.md`.
