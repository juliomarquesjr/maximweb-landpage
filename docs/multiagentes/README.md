# Playbook de Multiagentes — MaximWeb

Este playbook padroniza como usar multiagentes para acelerar desenvolvimento da landing sem perder qualidade visual, performance e consistencia tecnica.

## Objetivo

- Aumentar velocidade de entrega com execucao paralela
- Reduzir retrabalho com contratos claros de saida
- Garantir qualidade minima antes de merge

## Papeis recomendados

1. `Planner`
2. `UI Engineer`
3. `Copy/CRO`
4. `QA/Performance`
5. `Orchestrator` (sintese final)

## Fluxo operacional

### Fase 1 — Planejamento

- Rode o agente `Planner`
- Entregaveis obrigatorios:
  - backlog em ordem de execucao
  - criterios de aceite por secao
  - riscos e dependencias

### Fase 2 — Execucao paralela

Rode em paralelo:

- `UI Engineer`: implementa estrutura e componentes
- `Copy/CRO`: refina proposta de valor, headlines e CTAs
- `QA/Performance`: define plano de validacao (visual, acessibilidade e web vitals)

### Fase 3 — Sintese

- Rode o `Orchestrator` para consolidar as entregas
- Aplique ajustes finais no codigo
- Execute validacoes obrigatorias

## Contrato de saida (todos os agentes)

Todo agente deve responder no formato:

1. O que mudou
2. Arquivos impactados
3. Criterios de aceite
4. Riscos
5. Proximo passo

## Checklist de qualidade (gate)

Execute sempre antes de concluir:

1. `npm run build`
2. Revisao visual em mobile e desktop
3. Contraste e foco de teclado
4. Hierarquia de conteudo clara (hero, prova social, CTA)
5. Sem regressao de layout entre secoes

Checklist detalhado: veja `docs/multiagentes/checklist.md`.

## Como executar no Cursor (pratico)

1. Copie o prompt base em `docs/multiagentes/templates/prompt-base.md`
2. Escolha o papel em `docs/multiagentes/templates/`
3. Inicie os agentes com escopo claro de arquivos
4. Ao final, use o prompt de sintese em `orchestrator.md`

## Escopo recomendado por agente

- `UI Engineer`: `src/components/**`, `src/app/page.tsx`, `src/app/globals.css`
- `Copy/CRO`: textos nas secoes e metadados da pagina
- `QA/Performance`: semantica, acessibilidade, risco de LCP/CLS e consistencia visual

## Politica de simplicidade

- Prefira mudancas pequenas por secao
- Evite criar novos padroes sem necessidade
- Reutilize componentes existentes antes de criar novos
