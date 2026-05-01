# ADR 001 — Tailwind CSS v4 sem tailwind.config.ts

**Data:** 2026-05-01
**Status:** Aceito

---

## Contexto

O projeto foi criado com `create-next-app`, que instalou Tailwind CSS v4 por padrão. A v4 introduz uma mudança fundamental: a configuração migra do arquivo `tailwind.config.ts/js` para o próprio CSS via diretiva `@theme {}`.

---

## Decisão

Adotar o padrão canônico do Tailwind v4: **toda customização de tema em `globals.css @theme`**, sem criar `tailwind.config.ts`.

---

## Consequências

**Positivas:**
- Menos um arquivo de configuração para manter
- Tokens definidos no mesmo contexto das classes utilitárias, dando visibilidade imediata
- Padrão canônico da v4 — nenhum risco de deprecação
- Agentes de IA e novos devs encontram tudo em um lugar

**Negativas / Cuidados:**
- Agentes treinados em Tailwind v3 podem tentar criar `tailwind.config.ts` — AGENTS.md e CLAUDE.md documentam explicitamente para não fazer isso
- A sintaxe de gradiente mudou: `bg-gradient-to-b` → `bg-linear-to-b`
- Plugins do ecossistema v3 podem não ser compatíveis com v4
