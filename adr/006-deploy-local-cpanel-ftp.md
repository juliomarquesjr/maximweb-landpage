# ADR 006 — Deploy local para cPanel via FTP/FTPS

**Data:** 2026-05-01  
**Status:** Aceito

---

## Contexto

O projeto e publicado em hospedagem cPanel com front estatico e endpoint PHP para contato. O fluxo inicial de CI/CD via GitHub Actions foi descartado neste contexto por bloqueio operacional da conta (billing), e o time precisava de um caminho de deploy repetivel, simples e independente de servicos externos.

Tambem era necessario preservar seguranca operacional no servidor (sem sobrescrever segredos), reduzir erro manual no upload e manter feedback claro no terminal durante publicacoes.

---

## Decisao

1. O deploy oficial para cPanel passa a ser local via `npm run deploy:cpanel`.
2. O script `scripts/deploy-cpanel.mjs` executa build estatico e publica `out/` por FTP/FTPS usando variaveis `CPANEL_FTP_*` (`.env`/`.env.local` ou ambiente).
3. O script limita concorrencia a no maximo `2` conexoes (`CPANEL_FTP_CONCURRENCY`) por compatibilidade com hospedagem compartilhada.
4. O upload so inicia quando todos os workers configurados conectam com sucesso.
5. O arquivo `contact.config.local.php` e explicitamente ignorado no deploy para manter segredos somente no servidor.
6. Em terminal interativo, o script exibe status de conexao, progresso visual e eventos coloridos; em ambiente nao interativo, faz fallback para logs lineares.

---

## Consequencias

**Positivas:**

- Deploy independente de GitHub Actions e executavel em qualquer maquina autorizada.
- Menor risco de erro operacional com fluxo padronizado em comando unico.
- Melhor observabilidade local (conexao, progresso e status final).
- Protecao explicita para nao sobrescrever configuracao sensivel de producao.

**Negativas / Cuidados:**

- Exige acesso FTP/FTPS valido no ambiente local.
- Publicacao depende de maquina/operador (nao ha pipeline remoto automatico).
- Variacoes de rede local podem impactar tempo e estabilidade do upload.

---

## Referencias

- `scripts/deploy-cpanel.mjs`
- `README.md` (secao Deploy local via script)
- `docs/ARCHITECTURE.md` (secao Deploy para cPanel)
- `.env.example` (variaveis `CPANEL_FTP_*`)
