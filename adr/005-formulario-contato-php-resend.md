# ADR 005 — Formulário de contato via PHP (cPanel) + Resend

**Data:** 2026-05-01  
**Status:** Aceito

---

## Contexto

A landing é publicada em **hospedagem cPanel com deploy estático** (HTML/JS do Next sem `next start`). Não há execução de **Route Handlers** do Next em produção. O formulário de contato precisa enviar e-mail de forma **confiável**, com **tier gratuito** aceitável, e **sem expor segredos** no bundle JavaScript.

---

## Decisão

1. O client (`ContactForm.tsx`) envia `POST` com JSON para **`/contact.php`**, servido pelo Apache+PHP no mesmo domínio.
2. **`public/contact.php`** valida o corpo, monta texto/HTML e chama a **API HTTP do Resend** via cURL.
3. Segredos ficam em **`contact.config.local.php`** (lista no `.gitignore`), gerado a partir de **`contact.config.example.php`**.
4. Não há dependência npm do Resend; o endpoint Next `/api/contact` **não** é usado neste fluxo de deploy.

---

## Consequências

**Positivas:**

- Chave API e destinatários permanecem apenas no servidor.
- Funciona com site estático no cPanel; só exige cURL habilitado no PHP.
- Reply-To no e-mail aponta para o visitante.

**Negativas / Cuidados:**

- Em `npm run dev`, o Next não executa PHP — testar envio no servidor ou stack Apache+PHP local.
- É necessário domínio/endereço **verificado** no Resend para o campo `from`.
- Limites e termos do plano gratuito Resend aplicam-se.

---

## Referências

- `public/contact.php`, `public/contact.config.example.php`
- `README.md` (secção deploy cPanel + formulário)
- `docs/ARCHITECTURE.md` (fluxo do formulário)
