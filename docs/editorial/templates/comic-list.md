# Padrão editorial para listas de quadrinhos e mangás

Este guia especializa o [padrão de listas de leitura](reading-list.md) para HQs, graphic novels, mangás, manhwas, manhuas, webtoons, tiras e obras independentes. A fonte técnica continua sendo `src/content/reading/readingSchema.ts`: quadrinhos não possuem catálogo paralelo.

## Classificação obrigatória

Separe as dimensões:

- `comicTradition`: tradição editorial ou cultural (`manga`, `manhwa`, `manhua`, `western-comics`, `brazilian-comics` ou `other`);
- `comicFormat`: forma de publicação (`serialized-series`, `graphic-novel`, `one-shot`, `webtoon`, `comic-strip` ou `anthology`);
- `genres`: gêneros narrativos;
- `themes`: temas;
- `demographics`: demografia editorial confirmada;
- `readingDirection`: sentido de leitura.

Mangá, manhwa e manhua não são gêneros. Graphic novel não é selo de qualidade. Não deduza `shonen`, `shojo`, `seinen` ou `josei` pelo conteúdo ou público aparente: use a demografia somente quando a publicação original a sustentar.

## Cadastro e unidades

Pesquise por ID, slug, títulos original e brasileiro, romanização e aliases antes de criar a obra. Uma tradução, edição brasileira, versão impressa de webtoon ou omnibus não cria outra obra intelectual.

Use:

1. obra para a identidade permanente;
2. série para agrupamento narrativo ou editorial real;
3. `installment` para capítulo, edição avulsa, episódio, temporada ou arco somente quando houver uso editorial;
4. volume para o agrupamento original de unidades;
5. edição para uma publicação concreta, inclusive omnibus, deluxe, box ou digital;
6. oferta para disponibilidade comercial vinculada à edição correta.

O cadastro completo de capítulos nunca é obrigatório. One-shots e graphic novels unitárias não devem receber séries artificiais. Quantidade de volumes exige data de verificação.

Coleções e boxes são representados como edições concretas (`box-set` ou `omnibus`) relacionadas à obra ou ao volume adequado; não são novas identidades intelectuais. O primeiro lote deve confirmar se esse vínculo é suficiente para boxes que reúnem várias obras, antes de ampliar o schema.

## Créditos e relações

Registre somente funções confirmadas: autor ou criador original, roteirista, artista, desenhista, arte-finalista, colorista, letrista, tradutor e editor. Preserve equipes ocidentais e não imponha a mesma decomposição a todas as tradições.

Adaptações devem indicar mídia e relação. Anime, estúdio de animação e elenco não integram a autoria do mangá original. Continuação, derivação, releitura e obra inspirada permanecem relações distintas.

## Listas, páginas e monetização

Listas armazenam apenas `workId`, posição, justificativa, público, ponto de entrada e ordem de leitura específica. `ReadingWorkCard` resolve os dados permanentes pelo acervo.

A rota canônica de uma obra gráfica publicada é `/quadrinhos/[slug]`. Índices como `/quadrinhos/mangas` serão filtros do catálogo central e só devem existir quando houver conteúdo suficiente. Não replique a página individual sob outro prefixo.

Ofertas apontam para a edição concreta. Não associe o primeiro volume à série inteira nem apresente edição digital estrangeira como brasileira. O conteúdo editorial deve funcionar sem oferta.

## Validação

Além do checklist de listas de leitura, confirme tradição, formato, direção, créditos, situação, quantidade e data de volumes, relações entre unidades, edições omnibus e ISBNs. Teste cards sem capa, séries extensas, one-shots, múltiplos créditos e ausência de edição brasileira ou oferta. Execute auditoria, TypeScript, lint, build e `git diff --check`.
