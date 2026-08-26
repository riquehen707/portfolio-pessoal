# Arquitetura instrutiva do site

Este documento é a fonte principal para entender **quais páginas existem, como são publicadas e quais contratos técnicos as sustentam**. Ele descreve somente o estado confirmado no código.

Para regras especializadas, consulte também:

- [sistema editorial](../content/README.md), para artigos MDX;
- [listas de filmes](../editorial/templates/movie-list.md), para o fluxo obrigatório entre catálogo, curadoria e artigo;
- [fichas permanentes de filmes](../editorial/templates/movie-profile.md), para pesquisa, conteúdo editorial, pôsteres e publicação em `/filmes/[slug]`;
- [listas de séries](../editorial/templates/series-list.md), para catálogo, curadoria e disponibilidade por temporada;
- [listas de leitura](../editorial/templates/reading-list.md), para o fluxo entre acervo central, edições, ofertas e artigos;
- [fichas permanentes de livros](../editorial/templates/reading-work-profile.md), para pesquisa, normalização, capas, sinopses e avaliações em `/livros/[slug]`;
- [comentários nas fichas de leitura](reading-comments.md), para persistência, moderação, privacidade, segurança e ativação do Supabase;
- [decisão de migração para Supabase](supabase-migration-decision.md), para evidências, gate de adoção e preservação do contrato SEO;
- [perfis de estúdios de animação](../editorial/templates/animation-studio-profile.md), para cadastro, filmografia, composição editorial e validação desse tipo de página;
- [fontes de conteúdo](content-data-sources.md), para persistência local, exportação e migração futura;
- [registros públicos de ideias](../editorial/templates/idea-record.md), para cadastro, atualização e preservação do histórico;
- [`AGENTS.md`](../../AGENTS.md), para regras de trabalho no repositório.

Em caso de divergência, schemas, componentes e rotas executáveis prevalecem sobre a documentação.

## Hierarquia publicada e implementada

```text
/
├─ /acervo                              entrada pública dos catálogos e curadorias
├─ /blog
│  ├─ /blog/[slug]                    artigos MDX
│  ├─ /blog/cultura                   índice editorial
│  ├─ /blog/seo                       biblioteca de SEO
│  │  └─ /blog/seo/entender-a-busca  livro/piloto editorial
│  ├─ /blog/categorias/[slug]         índice dinâmico pausado
│  └─ /blog/temas[/[slug]]            índices pausados
├─ /ideias                              caderno público de ideias
│  └─ /ideias/[slug]                    registro e histórico de uma ideia publicada
├─ /filmes
│  └─ /filmes/[slug]                  somente filmes publicados
├─ /jogos
│  └─ /jogos/[slug]                   somente jogos publicados
├─ /series
│  └─ /series/[slug]                  somente séries publicadas
├─ /livros                             biblioteca pública de livros e light novels
│  └─ /livros/[slug]                  somente obras de leitura publicadas
├─ /quadrinhos                         biblioteca pública de obras gráficas
│  └─ /quadrinhos/[slug]              única rota canônica de obras gráficas publicadas
├─ /personalidades                      índice público de pessoas
│  └─ /personalidades/[slug]            perfis publicados; rotas históricas preservadas
├─ /estudios                            índice público de estúdios
│  └─ /estudios/[slug]                  perfis publicados, especializados ou genéricos
├─ /criadores/shingo-tamagawa
├─ /obras/{puparia,wade}
├─ /about
├─ /work                                portfólio público
├─ /servicos                            apresentação pública de serviços
│  └─ /servicos/produtos                ferramentas e recursos publicados
├─ /rss.xml
└─ rotas pausadas → redirecionam temporariamente para /blog
   ├─ /modelos, /publicos e /trilhas
   ├─ /contact, /mapa, /simulacao e /saiba-mais
   └─ /abordagem-tecnica e /aulas-particulares
```

O inventário de arquivos não equivale ao sitemap público. A inclusão de rotas estáticas é controlada por `routes` em `src/resources/once-ui.config.ts`; artigos, filmes e séries publicados são acrescentados por `src/app/sitemap.ts`. `src/config/routePolicy.ts` é a fonte central das famílias pausadas e alimenta middleware, robots e a exclusão defensiva do sitemap. Como o Next.js exige matchers literais no middleware, `npm run audit:route-policy` verifica essa única duplicação inevitável. Layouts dinâmicos nas famílias pausadas evitam gerar suas páginas durante o build.

**Pendência:** não existem índices públicos `/criadores` ou `/obras`. O perfil histórico de Shingo Tamagawa permanece em `/criadores/shingo-tamagawa` e é descoberto pelo índice de personalidades sem criar URL duplicada.

## Tipos de página

### Página inicial

- **Finalidade e rota:** entrada editorial do site em `/`.
- **Dados:** `src/resources/content.tsx`, recursos de marca e artigos selecionados pela camada de artigos.
- **Estrutura confirmada:** hero, áreas de descoberta e conteúdo editorial; composição em `src/app/page.tsx`.
- **Componentes:** componentes globais e módulos de `src/components/home/`.
- **SEO:** metadata própria, canonical, Open Graph e breadcrumb; incluída no sitemap.
- **Variações:** seções são configuráveis pelos recursos importados, mas não há schema de página inicial.

### Índices editoriais

- **Rotas:** `/blog`, `/blog/cultura`, `/blog/seo`, `/blog/seo/entender-a-busca`, `/ideias`, `/acervo`, `/jogos`, `/filmes`, `/series`, `/livros`, `/quadrinhos`, `/personalidades`, `/estudios` e, quando reativados, temas, categorias e trilhas.
- **Finalidade:** organizar coleções, áreas ou sequências de estudo.
- **Dados:** fachadas em `src/data/articles/`, `src/data/movies/`, `src/data/series/`, `src/data/reading/`, `src/data/personalities/` e `src/data/organizations/`, mais arquivos específicos próximos das rotas.
- **Estrutura confirmada:** título/apresentação, navegação ou feed, relações e breadcrumbs conforme cada implementação. `/acervo` funciona como entrada transversal: aponta para bibliotecas quando seus registros estão publicados e, enquanto um domínio permanece em revisão, oferece suas curadorias públicas sem abrir índices vazios.
- **Componentes:** `EditorialFeed`, `Posts`, `MovieLibrary`, `SeriesLibrary`, `PersonLibrary`, `StudioLibrary`, controles compartilhados de catálogo, cards e `BreadcrumbJsonLd`.
- **SEO:** metadata por rota; `/filmes` usa `MovieLibraryJsonLd` e `/series` usa `SeriesLibraryJsonLd`. Páginas pausadas não devem ser tratadas como publicadas apenas porque possuem arquivo.
- **Variações:** índices especializados podem ter composição própria, preservando container, navegação e tokens globais.

### Artigo MDX

- **Rota:** `/blog/[slug]`; fonte em `src/app/blog/posts/**/*.mdx`.
- **Finalidade:** artigo, guia, estudo, referência ou outra função pedagógica aceita.
- **Dados:** frontmatter validado por `src/components/blog/postSchema.ts`; corpo renderizado pelo mapeamento de `src/components/mdx.tsx`; leitura central em `src/data/articles/`.
- **Seções:** não há molde obrigatório. A página gera cabeçalho, índice a partir de `##`, corpo, compartilhamento e relações conforme dados disponíveis.
- **Componentes:** somente os expostos por `mdx.tsx`; regras de uso em `docs/content/04-formatacao/`.
- **Relações:** taxonomia, pré-requisitos, desbloqueios, relacionados e curadorias de filmes quando preenchidos.
- **SEO:** metadata, canonical natural ou explícito, Open Graph, breadcrumbs e dados estruturados produzidos pela rota. Artigos entram no sitemap pela fachada de dados.
- **Variações:** controladas pelo frontmatter e pelas linhas editoriais. O schema aceita campos legados; isso não os torna recomendados.

### Caderno e registro de ideia

- **Rotas:** `/ideias` e `/ideias/[slug]`.
- **Finalidade:** documentar propostas, experimentos, decisões e aprendizados em público, sem simular um quadro de tarefas.
- **Dados:** `IdeaSchema`, registros versionados em `src/content/ideas/` e fachada assíncrona em `src/data/ideas/`.
- **Estrutura:** o índice destaca ideias recentes e organiza o arquivo em desenvolvimento, exploração, papel e outros caminhos, com filtros por estado, categoria e tipo; a ficha apresenta um núcleo comum, seções editoriais flexíveis, próximos passos, relações e histórico em ordem cronológica inversa.
- **Relações:** IDs permanentes para outras ideias e slugs para artigos ou projetos já publicados. Tags e categorias ajudam a sugerir relações sem substituir referências explícitas.
- **SEO e publicação:** `publicationStatus` controla indexação e sitemap; `status` descreve a evolução da ideia. Cada página possui canonical, Open Graph e JSON-LD com conteúdo essencial renderizado no servidor.

### Biblioteca e página de filme

- **Rotas:** `/filmes` e `/filmes/[slug]`.
- **Dados:** `MovieSchema`, registros em `src/content/movies/` e fachada assíncrona `src/data/movies/`.
- **Seções da ficha:** cabeçalho/ficha, conteúdo editorial quando publicado, fontes e relações implementadas na rota.
- **Componentes:** `MovieLibrary`, `MoviePoster`, `MovieJsonLd`, `MovieLibraryJsonLd` e cards relacionados.
- **Relações:** `organizationRelationships` é a fonte para produção, coprodução, animação, distribuição, licenciamento, colaboração e serviços. Distribuição não implica produção.
- **SEO:** somente registros com `status: published` geram páginas estáticas indexáveis e entram no sitemap; ausentes ou incompletos recebem `noindex`/404 conforme a rota.
- **Variações:** capa é opcional; o componente deve manter fallback. Estados de produção não substituem o estado editorial.

### Biblioteca e página de série

- **Rotas:** `/series` e `/series/[slug]`.
- **Dados:** `SeriesSchema`, registros em `src/content/series/`, ofertas temporais em `seriesOffers.ts` e fachada assíncrona `src/data/series/`.
- **Biblioteca:** busca por título brasileiro e original; filtros por gênero, país, década, formato e disponibilidade; ordenação por título, lançamento e cadastro; contador, estado vazio e carregamento progressivo de doze cards.
- **Seções da ficha:** imagem ou fallback, títulos, período, formato, gêneros, países, criação, temporadas, episódios, descrição, disponibilidade por temporada, relações estruturadas, artigos relacionados e fontes.
- **Componentes:** `SeriesLibrary`, `SeriesCard`, controles compartilhados de catálogo, `SeriesJsonLd`, `SeriesLibraryJsonLd` e breadcrumbs.
- **Relações:** pessoas usam `personRelationships`; organizações usam `organizationRelationships` com papéis explícitos. Disponibilidade permanece fora do registro principal e aponta para intervalos de temporadas.
- **SEO:** somente registros com `status: published` geram parâmetros estáticos, páginas indexáveis e entradas no sitemap. A biblioteca possui metadata, canonical e JSON-LD `CollectionPage`; cada ficha usa `TVSeries`.
- **Variações:** imagem e relações são opcionais e não geram seções vazias; o fallback visual não inventa capa. `seriesStatus` descreve a situação narrativa e não controla publicação.

### Biblioteca e perfil de organização ou estúdio

Para estúdios de animação, aplique o [modelo editorial especializado](../editorial/templates/animation-studio-profile.md).

- **Rotas:** `/estudios` e `/estudios/[slug]`. Os sete perfis atuais preservam composições especializadas na mesma família de rota.
- **Finalidade:** perfil editorial permanente, não artigo nem ficha comercial.
- **Dados:** organizações em `src/content/organizations/`; filmes, jogos ou obras animadas em seus catálogos centrais. `src/content/studios/` ainda contém dados legados da LAIKA.
- **Seções recorrentes confirmadas:** hero, apresentação/história, processo ou linguagem, obras, orientação editorial, relações e fontes.
- **Biblioteca:** busca por nome; filtros por país, especialidade, tipo e década de início; ordem alfabética, contador, estado vazio e carregamento progressivo. Usa `StudioCard`, com fallback institucional quando não há imagem licenciada.
- **Componentes:** `StudioLibrary`, `StudioCard`, layout global, `BreadcrumbJsonLd`, `OrganizationRelatedWorks` e componentes especializados já existentes.
- **Relações:** IDs permanentes entre organização e obra; o papel da organização deve ser explícito quando o schema permitir.
- **SEO:** o índice usa metadata, canonical e JSON-LD `CollectionPage`; perfis usam metadata própria, canonical, Open Graph `profile`, breadcrumb e JSON-LD `Organization`. Rotas publicadas são derivadas dos registros no sitemap.
- **Variações:** cor de destaque e composição visual limitada. Não existe ainda um `ProfileHero` ou schema de tema compartilhado.

### Biblioteca e perfil de pessoa

- **Rotas:** `/personalidades` e `/personalidades/[slug]`; `/criadores/shingo-tamagawa` é uma rota histórica canônica preservada e apontada pelo registro.
- **Dados:** `CreatorSchema` e `src/content/creators/creators.ts`.
- **Seções confirmadas:** introdução, trajetória verificável, processo/ideias, trabalhos relacionados e fontes.
- **Biblioteca:** busca por nome; filtros por ocupação, país/região e século de nascimento; ordem alfabética, contador, estado vazio e carregamento progressivo. Usa `PersonCard`, com fallback biográfico quando não há retrato licenciado.
- **Componentes e relações:** `PersonLibrary`, `PersonCard`, layout próprio, `BreadcrumbJsonLd` e relações derivadas dos créditos presentes em filmes, séries, leituras e obras editoriais.
- **SEO:** o índice usa metadata, canonical e JSON-LD `CollectionPage`; perfis usam metadata, canonical, Open Graph `profile` e JSON-LD `Person`. Somente registros publicados e com conteúdo suficiente entram no sitemap.
- **Variações:** conteúdo deve acompanhar a disponibilidade de fatos; não há template compartilhado de perfil.

### Obra audiovisual editorial

- **Rotas atuais:** `/obras/puparia` e `/obras/wade`.
- **Dados:** `WorkSchema` e `src/content/works/works.ts`; contribuições, organizações, obras relacionadas, vídeo oficial e direitos.
- **Seções confirmadas:** hero, ficha, contexto/processo, análise, relações, vídeo e fontes, conforme a obra.
- **Componentes:** `ConsentVideo`, breadcrumbs e composição específica da rota.
- **SEO:** metadata, canonical, Open Graph `video.movie` e JSON-LD audiovisual; inclusão manual no sitemap.
- **Variações:** imagem pode estar ausente; o vídeo oficial usa carregamento mediante interação. Não existe rota dinâmica `/obras/[slug]`.

### Bibliotecas e páginas de leitura

- **Rotas:** `/livros`, `/livros/[slug]`, `/quadrinhos` e `/quadrinhos/[slug]`.
- **Finalidade:** publicar livros, mangás, manhwas, manhuas, webtoons, graphic novels, quadrinhos e light novels sem duplicar dados entre bibliotecas ou artigos.
- **Dados:** schemas e registros em `src/content/reading/`; fachada assíncrona em `src/data/reading/`.
- **Entidades:** obra intelectual, série, volume, edição concreta e oferta comercial. A obra pode receber uma avaliação editorial opcional, com autoria, texto, veredito, critérios, data, spoilers, edição lida e nota opcional. Pessoas continuam em `content/creators/` e organizações em `content/organizations/`.
- **Bibliotecas e componentes:** ambas reutilizam `ReadingCatalogLibrary` e os controles dos demais acervos. `/livros` apresenta totais derivados do catálogo, caminhos para `/acervo` e `/quadrinhos`, busca por título, autoria, tema, país, gênero e sinopse, além de filtros por gênero, autoria, país, formato, ano e disponibilidade. Quadrinhos filtram gênero, autoria, tradição, demografia, situação da publicação, país e disponibilidade. `BookCard` apresenta livros e light novels com sinopse e estado da edição na variante de biblioteca; `MangaCard` apresenta mangás, manhwas, manhuas, HQs e graphic novels. `ReadingWorkCard` permanece como adaptador temporário para artigos existentes.
- **Relações:** listas armazenam referências; ISBN, páginas, editora, tradução, capa comercial e disponibilidade pertencem à edição. Ofertas apontam exclusivamente para uma edição.
- **SEO e publicação:** apenas obras `published` possuem páginas públicas e entram no sitemap. O build pré-renderiza um lote determinístico das 24 fichas mais recentemente atualizadas de cada biblioteca; as demais são renderizadas no primeiro acesso e armazenadas por 24 horas. Índices e fichas possuem metadata, canonical, breadcrumbs e JSON-LD `CollectionPage`/`Book`; registros `draft` permanecem fora das rotas públicas.
- **Variações:** cards compactos ou editoriais, com fallback quando faltarem capa, edição brasileira ou oferta.

### Páginas institucionais, comerciais, demonstrações e projetos

- **Rotas:** `/about`, `/work`, `/servicos` e `/servicos/produtos`; arquivos também existem sob `/modelos`, `/publicos`, `/contact`, `/simulacao` e rotas auxiliares.
- **Estado:** `/about`, `/work`, `/servicos` e `/servicos/produtos` estão habilitadas em `routes`; as demais famílias permanecem pausadas pelo middleware ou pela configuração atual.
- **Dados e componentes:** recursos em `src/resources/`, `src/data/segments/`, `src/components/services/`, `src/components/work/` e arquivos próximos às rotas.
- **SEO:** varia por rota; demonstrações podem declarar `noindex`. Não inferir publicação pela existência do componente.
- **Pendência:** não há um schema único nem template canônico para esse grupo; documentar cada família quando ela voltar ao escopo público.

## Regras globais compartilhadas

- `src/app/layout.tsx` fornece idioma, metadata-base, identidade tipográfica, fundo, `Header`, `Footer`, busca global e estrutura de largura.
- `src/styles/globals.scss` e Once UI fornecem tokens, container e comportamento responsivo. Páginas temáticas não devem substituir esse sistema.
- `BreadcrumbJsonLd` é o componente compartilhado para breadcrumbs estruturados; breadcrumbs visuais continuam implementados por página.
- `PersonCard` e `StudioCard` resolvem pessoas e estúdios por IDs permanentes. O primeiro usa o acervo de criadores e enfatiza contexto biográfico; o segundo usa organizações e enfatiza identidade institucional. Imagens só aparecem quando origem e licença estão registradas, e links dependem de `profilePath` público. A rota `/dev/entity-cards` oferece exemplos somente em desenvolvimento, com `noindex`, e responde como não encontrada em produção.
- `src/config/routePolicy.ts` centraliza rotas pausadas para middleware, robots e sitemap. `routes` e a busca interna continuam controles explícitos porque representam, respectivamente, publicação e descoberta; uma nova rota pública pode exigir atualização neles.
- Conteúdo essencial deve existir no HTML do servidor; interação não pode ser requisito para indexação ou compreensão.
- Imagens precisam de texto alternativo, origem e crédito quando o modelo os aceitar. Ausência de imagem deve ter fallback estável.
- Capas de leitura pertencem à edição ou ao volume que efetivamente representam. `ReadingCard` pode usar a capa da edição brasileira confirmada como apresentação visual quando a obra universal não possui imagem, sem copiar essa capa para `ReadingWork`.
- Pôsteres promocionais existentes são mantidos localmente em `/images/movies/`, convertidos para WebP leve e servidos diretamente por `MoviePoster`; origem, crédito e situação de direitos ficam no registro central. Ativos sem licença comercial confirmada usam `permission-pending` e exigem revisão antes de reutilização comercial.
- Imagens do acervo de leitura registram origem, crédito e situação de direitos no próprio registro. Reproduções comprovadamente em domínio público usam `public-domain`; o card deve distingui-las de capas de edições brasileiras comerciais quando forem folhas de rosto, manuscritos ou capas históricas.
- Status editorial controla publicação. Status de lançamento ou produção descreve a obra, não sua indexabilidade.
- Relações usam IDs permanentes; slugs servem a URLs e aliases preservam caminhos anteriores quando suportados.

### Fluxo obrigatório para conteúdo de entretenimento

Antes de publicar qualquer artigo sobre filmes, séries, livros, light novels, quadrinhos, mangás, manhwas, manhuas, pessoas ou estúdios:

1. defina as obras, pessoas ou estúdios que aparecerão;
2. procure cada entidade no acervo correspondente por ID, slug, títulos e aliases;
3. cadastre somente as entidades ausentes;
4. valide os registros e suas relações;
5. utilize no MDX os cards correspondentes, referenciando cada entidade por ID.

Os artigos continuam sendo MDX e participando normalmente do blog, da página inicial e de “todos os artigos”. Uma curadoria central estruturada pode existir quando for útil, mas não é requisito para publicar um artigo e não substitui os cards escritos no MDX.

Cards recebem apenas o ID e informações próprias do contexto editorial, como posição ou justificativa. Capas, títulos, datas, autoria, gêneros, países, organizações, sinopses e outros dados permanentes são resolvidos no acervo. As propriedades antigas por slug permanecem temporariamente aceitas apenas para compatibilidade com artigos existentes e não devem ser usadas em conteúdo novo.

Todos os acervos usam somente `status: "draft" | "published"` como estado editorial. `draft` inclui preparação e revisão; `published` indica registro pronto para uso público. Situações narrativas ou institucionais permanecem em campos próprios, como `productionStatus`, `seriesStatus` e `publicationStatus`.

## Modelos de dados confirmados

| Domínio | Fonte técnica | Acesso recomendado | Observação |
| --- | --- | --- | --- |
| Artigos | `components/blog/postSchema.ts` | `data/articles/` | corpo permanece em MDX |
| Ideias | `content/ideas/ideaSchema.ts` | `data/ideas/` | ID permanente independente do slug; `type` organiza ideias, projetos, experimentos, negócios e pesquisas; histórico em `updates`; estado separado da publicação editorial |
| Filmes | `content/movies/movieSchema.ts` | `data/movies/` | cadastro único; inclui identidade, formato, créditos, relações, imagem/direitos, fontes e estado editorial |
| Séries | `content/series/seriesSchema.ts` | `data/series/` | catálogo público em `/series`; ofertas temporais são separadas por plataforma, região e intervalo de temporadas |
| Pessoas | `content/creators/creatorSchema.ts` | importação local direta | fachada ainda não existe |
| Obras editoriais | `content/works/workSchema.ts` | importação local direta | curtas e documentários |
| Organizações | `content/organizations/organizations.ts` | importação local direta | schema não é exportado |
| Jogos | `content/games/games.ts` | `data/games` | `content/games/gameSchema.ts` |
| Obras animadas | `content/animationWorks/animationWorks.ts` | importação local direta | schema local e vocabulário próprio |
| Livros, quadrinhos e obras de leitura | `content/reading/readingSchema.ts` | `data/reading/` | catálogo único; livros/light novels usam `/livros`, obras com `comicTradition` e `comicFormat` usam `/quadrinhos`; série, unidade serializada opcional, volume, edição e oferta permanecem compartilhados |
| Personalidades | `content/creators/creatorSchema.ts` | `data/personalities/` | entidade única para ocupações diversas; obras são descobertas por relações reversas nos acervos, sem filmografias ou bibliografias copiadas para o perfil |
| Estúdios legados | `content/studios/studios.ts` | importação local direta | sobreposição parcial com organizações |

Filmes não armazenam listas de estúdio nem disponibilidade comercial permanente. Ofertas opcionais ficam em `content/movies/movieOffers.ts`, relacionadas por `movieId`, com provedor, tipo (`stream`, `free-with-ads`, `rent`, `buy` ou `physical`), URL, região, afiliado/aviso e data de verificação. `MovieAvailability` mostra essas ofertas somente na variação editorial do card e explicita a ausência de disponibilidade confirmada; `MovieAvailabilityIndex` agrupa uma seleção por provedor e gera âncoras para os cards. Verificações com mais de 45 dias são marcadas como vencidas.

Listas de filmes usam `MovieList` em `content/movies/curations.ts` e guardam somente IDs:

- `automatic`: aplica regras de organização, gênero, país, direção e intervalo de anos;
- `editorial`: preserva a ordem de IDs e pode acrescentar posição e comentário;
- `hybrid`: combina regras com destaques ordenados e exclusões por ID.

Metadados visuais e editoriais sempre vêm do catálogo central. `MovieLibrary`, `MovieCard`, `MovieFilmography` e `OrganizationWorks` reutilizam esses registros; `MovieOrganizations` apresenta organizações e cria link somente quando `profilePath` existe. A filmografia do Studio Ghibli é gerada por `org_studio_ghibli`; *Nausicaä* permanece fora dessa relação produtiva porque a fonte oficial credita a produção à Topcraft.

**Lacuna arquitetural:** obras animadas ainda não possuem fachada em `src/data/` nem o mesmo vocabulário relacional dos filmes e jogos. Jogos usam relações normalizadas com `content/organizations`, mídia com origem e direitos registrados e publicação condicionada a uma ficha editorial completa. `content/studios/studios.ts` conserva apenas dados institucionais/anúncios da LAIKA; sua futura absorção completa por organizações exige migração.

## SEO, descoberta e publicação

Uma página pública deve ser conferida em cinco superfícies independentes:

1. rota acessível, sem redirecionamento em `middleware.ts`;
2. metadata e canonical coerentes;
3. robots compatível com a intenção de indexação;
4. inclusão no sitemap quando indexável;
5. inclusão na busca global ou navegação quando a descoberta interna for necessária.

JSON-LD deve refletir somente conteúdo visível e confirmado. Os tipos já usados incluem `Organization`, `Person`, `Movie`, `TVSeries`, coleções de filmes e séries, obra audiovisual e breadcrumbs.

Perfis de personalidades usam `/personalidades/[slug]`, metadata própria, canonical, breadcrumbs e JSON-LD `Person`. Somente registros publicados com biografia suficiente entram nos parâmetros estáticos e no sitemap; o padrão editorial permanente está em `docs/content/personality-pages.md`.

## Como adicionar ou revisar um tipo de página

1. Inventarie rotas e componentes equivalentes; não comece por um novo template.
2. Defina a entidade e reutilize um schema existente. Se não servir, registre a divergência antes de criar outro modelo.
3. Separe estado editorial de estado do objeto representado.
4. Relacione entidades por IDs permanentes e valide referências.
5. Reutilize layout, container, tipografia, cards, mídia, breadcrumbs e SEO globais.
6. Defina as seções pelo conteúdo necessário; documente obrigatoriedade apenas quando o código a impuser.
7. Configure metadata, canonical, robots, sitemap e descoberta interna de forma explícita.
8. Garanta HTML útil sem JavaScript, fallback sem imagem, teclado, contraste e responsividade.
9. Atualize este documento e o guia especializado afetado.
10. Execute, conforme o impacto: `npm run audit:content`, `npx tsc --noEmit`, `npm run lint`, verificações de MDX, `npm run build` e `git diff --check`.

## Pendências registradas

- Validar o domínio de leitura com o primeiro lote real, especialmente obras serializadas que mudam de publicação, edições omnibus, adaptações entre catálogos e organizações que acumulam papéis.
- Criar índices filtrados de mangás, manhwas, manhuas ou graphic novels somente após o acervo publicado sustentar páginas úteis; não criar rotas vazias ou catálogos derivados.
- Consolidar os modelos paralelos de organização/obra somente com plano de migração e auditoria de consumidores.
- Integrar gradualmente `routes` e a busca interna a um registro público único; a política de rotas pausadas já está centralizada em `src/config/routePolicy.ts`.
- Criar índices `/criadores` e `/obras` somente se houver uma função distinta de `/personalidades` e conteúdo público suficiente.
- Definir componentes compartilhados para hero de perfil, fontes e relações apenas após comparar mais páginas; hoje a recorrência existe, mas as APIs ainda não estão estabilizadas.
- Ampliar `audit:content` para validar metadata, sitemap e relações de todos os domínios, não apenas o contrato completo de filmes e referências básicas dos demais.
- Documentar famílias comerciais e demonstrações quando forem reativadas; o código existente não representa necessariamente a arquitetura pública futura.
