# Documentation Update Flow

Use este fluxo quando uma tarefa alterar estrutura, convenções ou decisões técnicas.

## Quando Atualizar

- Novo componente ou prop relevante.
- Nova classe global, token, keyframe ou padrão visual.
- Mudança em fronteira client/server.
- Novo gotcha de Next.js, Tailwind, Framer Motion ou lucide-react.
- Decisão duradoura sobre arquitetura, dependência ou processo.

## Ordem Recomendada

1. Atualize a documentação canônica apropriada (`AGENTS.md`, `README.md`, `.cursorrules`, `.windsurfrules`).
2. Avalie se a mudança justifica um ADR (veja critérios abaixo).
3. Se sim, **pergunte ao usuário antes de criar** — informe o motivo em uma linha.
4. Se o usuário confirmar, crie `adr/NNN-titulo-kebab-case.md` seguindo o padrão Contexto → Decisão → Consequências → Referências.
5. Rode `npm run knowledge:sync`.
6. Rode `npm run knowledge:check` antes do PR.

## Critérios para Propor um ADR

**Propor quando:**
- Mudança de paradigma de interação (ex: formulário plano → wizard, layout estático → animado por passo)
- Nova convenção de animação ou componente adotada como padrão reutilizável
- Escolha de biblioteca ou estratégia com alternativas explicitamente rejeitadas
- Decisão de fronteira client/server com impacto em múltiplos componentes
- Mudança de arquitetura de deploy ou integração backend
- Qualquer decisão que um agente futuro possa silenciosamente desfazer sem entender o contexto

**Não propor para:**
- Correções de bug, ajustes visuais ou refatorações locais
- Adição de props em componentes existentes sem mudança de paradigma
- Mudanças de copy ou conteúdo
- Atualizações de documentação

## ADRs Existentes

`adr/001–007`. Próximo: `adr/008`.

## O Que Não Fazer

- Não edite `_generated/` manualmente.
- Não use o vault para esconder decisões que deveriam estar em ADR.
- Não deixe uma nota manual contradizer `AGENTS.md`.
- Não crie um ADR sem perguntar ao usuário primeiro.
