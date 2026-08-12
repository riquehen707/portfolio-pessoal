# Arquitetura instrutiva do site

Este documento é a fonte principal para entender **quais páginas existem, como são publicadas e quais contratos técnicos as sustentam**. Ele descreve somente o estado confirmado no código.

Para regras especializadas, consulte também:

- [sistema editorial](../content/README.md), para artigos MDX;
- [fontes de conteúdo](content-data-sources.md), para persistência local, exportação e migração futura;
- [`AGENTS.md`](../../AGENTS.md), para regras de trabalho no repositório.

Em caso de divergência, schemas, componentes e rotas executáveis prevalecem sobre a documentação.

## Hierarquia publicada e implementada

```text
/
├─ /blog
│  ├─ /blog/[slug]                    artigos MDX
│  ├─ /blog/cultura                   índice editorial
│  ├─ /blog/seo                       biblioteca de SEO
│  │  └─ /blog/seo/entender-a-busca  livro/piloto editorial
│  ├─ /blog/categorias/[slug]         índice dinâmico pausado
│  └─ /blog/temas[/[slug]]            índices pausados
├─ /filmes
│  └─ /filmes/[slug]                  somente filmes publicados
├─ /estudios/{laika,team-cherry,cartoon-saloon}
├─ /criadores/shingo-tamagawa
├─ /obras/{puparia,wade}
├─ /about
├─ /rss.xml
└─ rotas pausadas → redirecionam temporariamente para /blog
   ├─ /work, /servicos, /modelos, /publicos e /trilhas
   ├─ /contact, /mapa, /simulacao e /saiba-mais
   └─ /abordagem-tecnica e /aulas-particulares
```

O inventário de arquivos não equivale ao sitemap público. A inclusão de rotas estáticas é controlada por `routes` em `src/resources/once-ui.config.ts`; artigos e filmes publicados são acrescentados por `src/app/sitemap.ts`. `src/middleware.ts` controla acesso às rotas pausadas, enquanto `src/app/robots.ts` controla rastreamento. Essas três listas ainda são manuais e podem divergir.

**Pendência:** não existem índices públicos `/estudios`, `/criadores` ou `/obras`, embora breadcrumbs apontem conceitualmente para esses níveis.

## Tipos de página

### Página inicial

- **Finalidade e rota:** entrada editorial do site em `/`.
- **Dados:** `src/resources/content.tsx`, recursos de marca e artigos selecionados pela camada de artigos.
- **Estrutura confirmada:** hero, áreas de descoberta e conteúdo editorial; composição em `src/app/page.tsx`.
- **Componentes:** componentes globais e módulos de `src/components/home/`.
- **SEO:** metadata própria, canonical, Open Graph e breadcrumb; incluída no sitemap.
- **Variações:** seções são configuráveis pelos recursos importados, mas não há schema de página inicial.

### Índices editoriais

- **Rotas:** `/blog`, `/blog/cultura`, `/blog/seo`, `/blog/seo/entender-a-busca`, `/filmes` e, quando reativados, temas, categorias e trilhas.
- **Finalidade:** organizar coleções, áreas ou sequências de estudo.
- **Dados:** fachadas em `src/data/articles/` e `src/data/movies/`, mais arquivos específicos próximos das rotas.
- **Estrutura confirmada:** título/apresentação, navegação ou feed, relações e breadcrumbs conforme cada implementação.
- **Componentes:** `EditorialFeed`, `Posts`, `MovieLibrary`, cards e `BreadcrumbJsonLd`.
- **SEO:** metadata por rota; `/filmes` usa `MovieLibraryJsonLd`. Páginas pausadas não devem ser tratadas como publicadas apenas porque possuem arquivo.
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

### Biblioteca e página de filme

- **Rotas:** `/filmes` e `/filmes/[slug]`.
- **Dados:** `MovieSchema`, registros em `src/content/movies/` e fachada assíncrona `src/data/movies/`.
- **Seções da ficha:** cabeçalho/ficha, conteúdo editorial quando publicado, fontes e relações implementadas na rota.
- **Componentes:** `MovieLibrary`, `MoviePoster`, `MovieJsonLd`, `MovieLibraryJsonLd` e cards relacionados.
- **Relações:** `organizationRelationships` é a fonte para produção, coprodução, animação, distribuição, licenciamento, colaboração e serviços. Distribuição não implica produção.
- **SEO:** somente registros com `status: published` geram páginas estáticas indexáveis e entram no sitemap; ausentes ou incompletos recebem `noindex`/404 conforme a rota.
- **Variações:** capa é opcional; o componente deve manter fallback. Estados de produção não substituem o estado editorial.

### Perfil de organização ou estúdio

- **Rotas atuais:** `/estudios/laika`, `/estudios/team-cherry` e `/estudios/cartoon-saloon`.
- **Finalidade:** perfil editorial permanente, não artigo nem ficha comercial.
- **Dados:** organizações em `src/content/organizations/`; filmes, jogos ou obras animadas em seus catálogos centrais. `src/content/studios/` ainda contém dados legados da LAIKA.
- **Seções recorrentes confirmadas:** hero, apresentação/história, processo ou linguagem, obras, orientação editorial, relações e fontes.
- **Componentes:** layout global, `BreadcrumbJsonLd` e, para filmes relacionados, `OrganizationWorks`.
- **Relações:** IDs permanentes entre organização e obra; o papel da organização deve ser explícito quando o schema permitir.
- **SEO:** metadata própria, canonical, Open Graph `profile`, breadcrumb e JSON-LD `Organization`; inclusão manual no sitemap atual.
- **Variações:** cor de destaque e composição visual limitada. Não existe ainda um `ProfileHero` ou schema de tema compartilhado.

### Perfil de pessoa

- **Rota atual:** `/criadores/shingo-tamagawa`.
- **Dados:** `CreatorSchema` e `src/content/creators/creators.ts`.
- **Seções confirmadas:** introdução, trajetória verificável, processo/ideias, trabalhos relacionados e fontes.
- **Componentes e relações:** layout próprio, `BreadcrumbJsonLd`, IDs de obras em `workIds` e créditos nas obras.
- **SEO:** metadata, canonical, Open Graph `profile` e JSON-LD `Person`; inclusão manual no sitemap.
- **Variações:** conteúdo deve acompanhar a disponibilidade de fatos; não há template compartilhado de perfil.

### Obra audiovisual editorial

- **Rotas atuais:** `/obras/puparia` e `/obras/wade`.
- **Dados:** `WorkSchema` e `src/content/works/works.ts`; contribuições, organizações, obras relacionadas, vídeo oficial e direitos.
- **Seções confirmadas:** hero, ficha, contexto/processo, análise, relações, vídeo e fontes, conforme a obra.
- **Componentes:** `ConsentVideo`, breadcrumbs e composição específica da rota.
- **SEO:** metadata, canonical, Open Graph `video.movie` e JSON-LD audiovisual; inclusão manual no sitemap.
- **Variações:** imagem pode estar ausente; o vídeo oficial usa carregamento mediante interação. Não existe rota dinâmica `/obras/[slug]`.

### Páginas institucionais, comerciais, demonstrações e projetos

- **Rotas:** `/about`; arquivos implementados sob `/work`, `/servicos`, `/modelos`, `/publicos`, `/contact`, `/simulacao` e rotas auxiliares.
- **Estado:** somente `/about` está habilitada em `routes`; as demais famílias são pausadas pelo middleware ou pela configuração atual.
- **Dados e componentes:** recursos em `src/resources/`, `src/data/segments/`, `src/components/services/`, `src/components/work/` e arquivos próximos às rotas.
- **SEO:** varia por rota; demonstrações podem declarar `noindex`. Não inferir publicação pela existência do componente.
- **Pendência:** não há um schema único nem template canônico para esse grupo; documentar cada família quando ela voltar ao escopo público.

## Regras globais compartilhadas

- `src/app/layout.tsx` fornece idioma, metadata-base, identidade tipográfica, fundo, `Header`, `Footer`, busca global e estrutura de largura.
- `src/styles/globals.scss` e Once UI fornecem tokens, container e comportamento responsivo. Páginas temáticas não devem substituir esse sistema.
- `BreadcrumbJsonLd` é o componente compartilhado para breadcrumbs estruturados; breadcrumbs visuais continuam implementados por página.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/middleware.ts`, `routes` e `src/lib/globalSearch.ts` são controles distintos. Uma nova rota pública pode exigir atualização em mais de um deles.
- Conteúdo essencial deve existir no HTML do servidor; interação não pode ser requisito para indexação ou compreensão.
- Imagens precisam de texto alternativo, origem e crédito quando o modelo os aceitar. Ausência de imagem deve ter fallback estável.
- Capas editoriais locais em `/images/movies/` já são WebP leves e são servidas diretamente por `MoviePoster`; elas não dependem do endpoint de otimização da Vercel. Imagens de outras origens continuam seguindo a configuração global do Next.js.
- Status editorial controla publicação. Status de lançamento ou produção descreve a obra, não sua indexabilidade.
- Relações usam IDs permanentes; slugs servem a URLs e aliases preservam caminhos anteriores quando suportados.

## Modelos de dados confirmados

| Domínio | Fonte técnica | Acesso recomendado | Observação |
| --- | --- | --- | --- |
| Artigos | `components/blog/postSchema.ts` | `data/articles/` | corpo permanece em MDX |
| Filmes | `content/movies/movieSchema.ts` | `data/movies/` | cadastro único; inclui identidade, formato, créditos, relações, imagem/direitos, fontes e estado editorial |
| Pessoas | `content/creators/creatorSchema.ts` | importação local direta | fachada ainda não existe |
| Obras editoriais | `content/works/workSchema.ts` | importação local direta | curtas e documentários |
| Organizações | `content/organizations/organizations.ts` | importação local direta | schema não é exportado |
| Jogos | `content/games/games.ts` | importação local direta | schema local ao arquivo |
| Obras animadas | `content/animationWorks/animationWorks.ts` | importação local direta | schema local e vocabulário próprio |
| Estúdios legados | `content/studios/studios.ts` | importação local direta | sobreposição parcial com organizações |

Filmes não armazenam listas de estúdio nem disponibilidade comercial permanente. Ofertas opcionais ficam em `content/movies/movieOffers.ts`, relacionadas por `movieId`, com provedor, tipo, URL, região, afiliado/aviso e data de verificação. A ausência de oferta não altera cards ou fichas.

Listas de filmes usam `MovieList` em `content/movies/curations.ts` e guardam somente IDs:

- `automatic`: aplica regras de organização, gênero, país, direção e intervalo de anos;
- `editorial`: preserva a ordem de IDs e pode acrescentar posição e comentário;
- `hybrid`: combina regras com destaques ordenados e exclusões por ID.

Metadados visuais e editoriais sempre vêm do catálogo central. `MovieLibrary`, `MovieCard`, `MovieFilmography` e `OrganizationWorks` reutilizam esses registros; `MovieOrganizations` apresenta organizações e cria link somente quando `profilePath` existe. A filmografia do Studio Ghibli é gerada por `org_studio_ghibli`; *Nausicaä* permanece fora dessa relação produtiva porque a fonte oficial credita a produção à Topcraft.

**Lacuna arquitetural:** jogos e obras animadas ainda não possuem fachadas em `src/data/` nem o mesmo vocabulário relacional dos filmes. `content/studios/studios.ts` conserva apenas dados institucionais/anúncios da LAIKA; sua futura absorção completa por organizações exige migração.

## SEO, descoberta e publicação

Uma página pública deve ser conferida em cinco superfícies independentes:

1. rota acessível, sem redirecionamento em `middleware.ts`;
2. metadata e canonical coerentes;
3. robots compatível com a intenção de indexação;
4. inclusão no sitemap quando indexável;
5. inclusão na busca global ou navegação quando a descoberta interna for necessária.

JSON-LD deve refletir somente conteúdo visível e confirmado. Os tipos já usados incluem `Organization`, `Person`, `Movie`, coleção de filmes, obra audiovisual e breadcrumbs.

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

- Consolidar os modelos paralelos de organização/obra somente com plano de migração e auditoria de consumidores.
- Tornar sitemap, robots, middleware, configuração de rotas e busca menos sujeitos a divergência manual.
- Criar índices `/estudios`, `/criadores` e `/obras` antes de tratá-los como níveis navegáveis reais.
- Definir componentes compartilhados para hero de perfil, fontes e relações apenas após comparar mais páginas; hoje a recorrência existe, mas as APIs ainda não estão estabilizadas.
- Ampliar `audit:content` para validar metadata, sitemap e relações de todos os domínios, não apenas o contrato completo de filmes e referências básicas dos demais.
- Documentar famílias comerciais e demonstrações quando forem reativadas; o código existente não representa necessariamente a arquitetura pública futura.
