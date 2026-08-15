# Padrão editorial para listas de séries

Este é o padrão obrigatório para curadorias, recomendações e rankings de séries. Use-o com o [sistema editorial](../../content/README.md) e a [arquitetura](../../architecture/site-architecture.md). As regras gerais do modelo de filmes aplicam-se por analogia, mas séries exigem disponibilidade por temporada.

## Fluxo obrigatório

1. Defina as séries que aparecerão.
2. Procure cada série por ID, slug, títulos e aliases no acervo central.
3. Reutilize ou complete registros existentes e cadastre somente as ausentes.
4. Confirme país, criação, período, temporadas e proposta em fontes oficiais ou institucionais.
5. Valide os registros e registre ofertas fora da entidade, com região, plataforma, intervalo de temporadas, URL e data de verificação.
6. Renderize no MDX com `SeriesCard`, usando `seriesId` e, quando necessário, apenas `comment` como texto editorial daquela lista. Mantenha dados permanentes no acervo. `context` e a resolução por slug continuam aceitos somente para compatibilidade com artigos existentes.

Uma curadoria estruturada em `src/content/series/curations.ts` é opcional e serve à reutilização da seleção. Ela não é requisito para que o artigo permaneça no fluxo editorial padrão. A propriedade antiga `series` por slug continua aceita somente para compatibilidade com MDX existentes.

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
