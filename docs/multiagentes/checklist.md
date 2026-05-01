# Checklist de Validacao — Landing Page

Use este checklist em toda tarefa executada por multiagentes.

## 1) Build e lint

- [ ] `npm run build` finaliza sem erro
- [ ] `npm run lint` sem erro novo

## 2) Responsividade

- [ ] Hero sem quebra em 360px
- [ ] Navbar funcional em mobile
- [ ] Cards e grid sem overflow horizontal
- [ ] CTAs visiveis sem rolagem inesperada

## 3) Acessibilidade

- [ ] Contraste minimo aceitavel em textos principais
- [ ] Navegacao por teclado com foco visivel
- [ ] Labels e placeholders coerentes em formularios
- [ ] Semantica basica (`header`, `main`, `section`, `footer`)

## 4) Conversao e clareza

- [ ] Proposta de valor entendida em ate 3 segundos
- [ ] CTA principal acima da dobra
- [ ] CTA secundario claro (quando existir)
- [ ] Prova social ou diferencial sem ambiguidades

## 5) Visual e consistencia

- [ ] Espacamentos consistentes entre secoes
- [ ] Tipografia coerente com o design system
- [ ] Cores e tokens alinhados ao `globals.css`
- [ ] Animacoes suaves, sem excesso de duracao

## 6) Performance (sinais rapidos)

- [ ] Imagens com tamanho adequado
- [ ] Sem animacoes pesadas no first paint
- [ ] Evitar JS desnecessario em componentes estaticos
- [ ] Sem mudancas bruscas de layout (CLS perceptivel)
