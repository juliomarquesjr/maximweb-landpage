# ADR 003 — Design sem imagens externas

**Data:** 2026-05-01
**Status:** Aceito

---

## Contexto

Landing pages premium normalmente incluem imagens de produto, mockups, fotos ou ilustrações. Este projeto optou por não usar nenhuma imagem externa ou asset de imagem.

---

## Decisão

Toda a estética visual é implementada com:
- **CSS gradients** (radial-gradient para glows, linear-gradient para grid, texto e botões)
- **SVG inline** via Lucide React (ícones)
- **Glassmorphism** via `backdrop-filter: blur`
- **Tipografia como elemento visual** (tamanhos grandes, gradient-text)

Nenhum `<Image>` do Next.js é usado. Para a **estética** da página, nenhum asset de imagem em `public/` é necessário. **Exceção (não-visual):** o formulário de contato em produção usa `public/contact.php` e config PHP na mesma pasta pública (ver ADR 005).

---

## Consequências

**Positivas:**
- Zero dependência de imagens em `public/` para layout, glows e ícones
- Performance: sem requisições de imagem, sem LCP dependente de download
- Manutenção: nenhum asset para versionar ou atualizar
- Responsividade: gradientes e SVGs escalam perfeitamente

**Negativas / Cuidados:**
- O design pode parecer genérico comparado a páginas com screenshots reais de produto
- Quando screenshots ou mockups reais dos sistemas (Loja, Transporte, etc.) estiverem disponíveis, o componente `Products.tsx` deve ser atualizado para incluir imagens via `next/image`
- OG image para compartilhamento em redes sociais ainda precisa ser criada (`opengraph-image.tsx`)
