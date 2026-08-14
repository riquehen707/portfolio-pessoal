# Padrão editorial para listas de séries

Este é o padrão obrigatório para curadorias, recomendações e rankings de séries. Use-o com o [sistema editorial](../../content/README.md) e a [arquitetura](../../architecture/site-architecture.md). As regras gerais do modelo de filmes aplicam-se por analogia, mas séries exigem disponibilidade por temporada.

## Fluxo obrigatório

1. Pesquise e feche a seleção editorial antes de escrever.
2. Procure cada série por ID, slug, títulos e aliases no acervo central.
3. Reutilize ou complete registros existentes; cadastre ausentes sem criar objetos completos no MDX.
4. Confirme país, criação, período, temporadas e proposta em fontes oficiais ou institucionais.
5. Registre ofertas fora da entidade, com região, plataforma, intervalo de temporadas, URL e data de verificação.
6. Monte a curadoria somente com `seriesId` e comentário específico da lista.
7. Renderize no MDX com `SeriesCard`, usando slug, e mantenha dados permanentes no acervo.

Uma plataforma não deve ser anunciada para “a série completa” quando oferece somente parte das temporadas. Temporadas futuras, recém-lançadas ou disponíveis apenas em outro país permanecem explicitamente não confirmadas. Catálogos mudam: toda oferta precisa de `checkedAt` e deve ser revisada na publicação.

Não publique páginas individuais vazias. A existência de uma entidade no acervo não autoriza rota, sitemap ou indexação.

## Validação

- IDs, slugs e aliases únicos;
- curadorias e ofertas apontando para séries existentes;
- intervalos de temporadas dentro do total cadastrado;
- seleção visível igual à curadoria central;
- HTML essencial renderizado no servidor;
- card sem imagem funcional em desktop e mobile;
- auditoria, TypeScript, lint, build e `git diff --check`.
