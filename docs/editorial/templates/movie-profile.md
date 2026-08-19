# Diretriz para fichas permanentes de filmes

Esta diretriz orienta pesquisa, cadastro, revisão e publicação das páginas em `/filmes/[slug]`. Para listas, rankings e recomendações, use [`movie-list.md`](movie-list.md): a ficha contém dados e conteúdo permanentes; a lista guarda somente posição, justificativa e contexto daquele recorte.

Use este documento com a [arquitetura do site](../../architecture/site-architecture.md), o [sistema editorial](../../content/README.md), a [política de pesquisa](../../content/03-producao/pesquisa-e-referencias.md) e `src/content/movies/movieSchema.ts`. O schema e a rota executável prevalecem em caso de divergência.

## Objetivo

Uma ficha deve ajudar o leitor a identificar o filme, compreender sua proposta, avaliar a experiência oferecida e continuar explorando obras, pessoas, estúdios e curadorias relacionadas. Ela não é uma cópia de distribuidora, um agregador de notas nem uma página criada para repetir palavras-chave.

Contagem de palavras é diagnóstico, não meta. Conteúdo próprio, precisão, relações úteis e clareza valem mais que extensão artificial.

## Lotes e preservação

Quando houver revisão em escala, trabalhe em lotes de até 20 filmes:

1. registre IDs e URLs incluídos;
2. preserve slug, canonical e aliases;
3. procure duplicatas por títulos brasileiro, original e internacional, ano e créditos;
4. registre o estado inicial de conteúdo, pôster, fontes, relações, SEO e palavras visíveis;
5. pesquise e valide o lote antes de iniciar o seguinte.

Filmes incompletos permanecem `draft`. Uma página já publicada não deve desaparecer apenas por precisar de melhoria; preserve a URL e corrija-a de modo compatível.

## Fonte única e separação dos dados

O catálogo em `src/content/movies/` é a fonte permanente:

| Entidade | Responsabilidade |
| --- | --- |
| Filme | identidade, títulos, lançamento, duração, países, créditos, gêneros, temas, sinopse, experiência, alertas, SEO, editorial, pôster e fontes |
| Pessoa | identidade permanente de criadores e profissionais relacionados por ID |
| Organização | produção, coprodução, animação, distribuição, licenciamento, colaboração ou serviços com papel explícito |
| Curadoria | posição e comentário exclusivos de uma lista |
| Oferta | provedor, modalidade, região, link, disponibilidade e data de verificação |
| Comentário de leitor | participação moderada, separada do catálogo e da avaliação editorial |

Não copie objetos de filme para rotas, artigos, estúdios ou listas. Consulte a fachada em `src/data/movies/`. Distribuição não implica produção e controladora não substitui a organização creditada.

## Identidade e português

- `titleBr` deve ser título oficial de lançamento no Brasil, sustentado por fonte.
- Preserve `originalTitle`; use `internationalTitle` somente quando houver uma forma internacional distinta e útil.
- Não traduza títulos ou créditos por conta própria.
- `year` não substitui `releaseDate`; não invente dia ou mês.
- Diferencie situação da produção (`released`, `upcoming`, `in-development`) de estado editorial (`draft`, `published`).
- Traduza rótulos técnicos na apresentação, não os valores normalizados do schema.

## Sinopse e conteúdo editorial

`shortDescription` é uma descrição factual e original, entre 20 e 320 caracteres. Não copie distribuidoras, catálogos, IMDb, TMDB ou Wikipédia. Evite julgamento, spoilers e chamadas promocionais.

O bloco `editorial`, obrigatório para filmes publicados, tem funções distintas:

- `introduction`: apresenta o filme e sua relevância sem repetir a sinopse;
- `styleAndPace`: descreve linguagem, ritmo e experiência;
- `reasonsToWatch`: explica argumentos específicos para assistir;
- `limitations`: ajusta expectativas sem transformar gosto em defeito objetivo.

`audienceProfile`, `experience` e `contentWarnings` ajudam na escolha, mas não substituem análise. Não invente experiência pessoal ou primeira pessoa atribuída ao autor do site.

O schema atual não possui avaliação assinada, data de crítica ou nota. Não esconda nota em `experience`, `reasonsToWatch` ou outro campo. Uma futura avaliação normalizada deve seguir o aprendizado dos livros: autoria, texto, veredito, critérios, data, spoilers e nota opcional com escala pública.

## Pôster e direitos

O pôster é opcional e deve manter fallback estável. Quando existir, registre arquivo, origem, crédito, texto alternativo e situação de direitos. A busca de imagens não é fonte final.

- `original-editorial`: ativo criado para o site;
- `licensed`: uso coberto por licença ou permissão registrada;
- `permission-pending`: origem conhecida, mas autorização comercial ainda não confirmada.

Não trate `permission-pending` como licença. Confirme correspondência entre filme e pôster, converta para WebP leve sem distorção e teste biblioteca, ficha, Open Graph e mobile. O ativo visual não pode carregar fatos ou texto essenciais que faltem no HTML.

## Estrutura mínima

Uma ficha publicada deve tornar encontráveis no HTML do servidor:

1. títulos brasileiro e original;
2. ano, duração e situação relevantes;
3. direção, países, gêneros e créditos essenciais;
4. pôster confirmado ou fallback;
5. sinopse factual;
6. introdução, estilo e ritmo, razões para assistir e limitações quando existirem;
7. público, experiência e alertas sensíveis;
8. organizações com papéis explícitos;
9. curadorias, pessoas e obras relacionadas;
10. fontes e créditos visuais.

Não renderize seções vazias. Conteúdo essencial não depende de JavaScript. A ficha deve funcionar sem pôster, curadoria, oferta ou comentários e permanecer legível com títulos longos, teclado e telas pequenas.

A rota atual já apresenta editorial, ficha essencial, alertas e curadorias. Ainda precisa ser comparada ao padrão acima antes de ser considerada completa, especialmente quanto a pôster visível, fontes e organizações.

## Biblioteca e descoberta

`/filmes` pode reunir registros em preparação sem criar páginas indexáveis para eles. Busca, filtros e contagens devem ser derivados do catálogo, nunca mantidos manualmente. Cards deixam claro quais perfis estão completos e preservam fallback quando falta pôster.

Uma ficha pública precisa ser alcançável pela biblioteca, busca global, sitemap ou relações editoriais coerentes. Existir no filesystem não prova descoberta pública.

## Comentários

O sistema criado para livros não deve ser apontado para filmes apenas trocando `work_id`. Antes de reutilizá-lo, generalize o contrato para um alvo tipado ou crie uma tabela específica, atualize migração, API, moderação e documentação e teste compatibilidade.

Comentários de leitores permanecem separados do editorial e do JSON-LD do filme. Exigem moderação prévia, proteção contra abuso, coleta mínima de dados, remoção e carregamento que não bloqueie a página.

## SEO e auditoria

Confira canonical, metadata, Open Graph, breadcrumb, sitemap, busca interna e JSON-LD `Movie`. Dados estruturados devem refletir somente conteúdo visível e confirmado. Não adicionar `review` ou `aggregateRating` sem contrato, conteúdo correspondente e método transparente.

Por lote, compare palavras úteis, títulos, descriptions, links internos, páginas órfãs, pôsteres, texto alternativo, peso das imagens, conteúdo duplicado, HTML estático e experiência mobile. O passo 5 da iniciativa de livros ainda não ocorreu; não transferir conclusões de uma auditoria inexistente para filmes.

## Aprendizados transferidos das fichas de livros

- Agrupe identidade, imagem, sinopse e fatos essenciais no início.
- Mantenha análise opcional ou incompleta fora da página até ser aprovada; não use texto genérico como preenchimento.
- Traduza rótulos na interface sem corromper valores normalizados.
- Derive contagens e estados do catálogo.
- Use IDs permanentes nas relações e a fachada de dados nas páginas.
- Preserve fallbacks sem imagem, oferta, comentário ou relação.
- Separe avaliação editorial, média de leitores e comentários.
- Valide schema, relações, TypeScript, build e HTML; uma verificação não substitui as demais.

## Checklist

- [ ] IDs, URLs, aliases e títulos conferidos.
- [ ] Título brasileiro é oficial.
- [ ] Sinopse e editorial são originais e cumprem funções distintas.
- [ ] Produção, distribuição e outros papéis não foram confundidos.
- [ ] Pôster possui origem, crédito, alt e direitos.
- [ ] Seções vazias ou texto de preenchimento foram removidos.
- [ ] Página funciona sem imagem, oferta, curadoria e JavaScript.
- [ ] Metadata, canonical, JSON-LD, sitemap e descoberta foram conferidos.
- [ ] Auditoria de conteúdo, TypeScript, build e `git diff --check` passaram conforme o impacto.

## Relatório

Informe filmes encontrados, atualizados e criados; URLs preservadas; títulos e sinopses corrigidos; conteúdo editorial; pessoas e organizações; pôsteres e direitos; ofertas; relações; diferenças de palavras úteis; validações e pendências não confirmadas.
