# ADR 002 — Framer Motion para scroll reveal via SectionWrapper

**Data:** 2026-05-01
**Status:** Aceito

---

## Contexto

A página precisa de animações de entrada nas seções conforme o usuário rola a tela. As alternativas consideradas foram:
1. CSS `@keyframes` com `IntersectionObserver` manual
2. Biblioteca dedicada (AOS, ScrollReveal)
3. Framer Motion `useInView` — já dependência do projeto para as animações do Hero e CTA

---

## Decisão

Usar Framer Motion com o padrão `SectionWrapper` + `itemVariants` exportados. Um único componente centraliza toda a lógica de `useInView`, e os filhos recebem animações via o sistema de `variants` do Framer Motion (stagger automático).

---

## Consequências

**Positivas:**
- Zero duplicação: uma implementação de `useInView`, usada em todos os componentes
- Stagger automático via `staggerChildren` — não é necessário definir delays manualmente
- Animações consistentes em todo o projeto (mesmo timing, mesmo easing)
- `once: true` garante que a animação não repete ao rolar para cima

**Negativas / Cuidados:**
- Todos os componentes de seção precisam de `'use client'` (Framer Motion acessa o DOM)
- O `Hero` tem animações diferentes (disparam na carga, não no scroll) — usa `containerVariants` local, não `SectionWrapper`
- `margin: '-80px'` no `useInView` faz a animação disparar antes do elemento entrar completamente na viewport
