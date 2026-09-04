# Auditoria da arquitetura de conteúdo de entretenimento

Data do diagnóstico: 14 de agosto de 2026.

> Nota histórica: este relatório registra o estado encontrado antes da simplificação dos estados editoriais realizada na mesma data. As menções a `review` e `editorialStatus` descrevem o diagnóstico original; a regra vigente está em `docs/architecture/site-architecture.md` e usa somente `status: "draft" | "published"`.

## Escopo e método

Esta auditoria descreve o estado confirmado no código e nos artefatos locais de auditoria. Nenhuma correção de implementação foi realizada. Foram examinados schemas, catálogos, fachadas de dados, curadorias, MDX, cards, rotas, sitemap, componentes de perfil e `scripts/audit-content.mjs`.

As observações visuais abaixo estão separadas em:

- **confirmado no código:** comportamento imposto por JSX, schema ou CSS;
- **hipótese para verificação visual:** consequência provável que ainda precisa ser comparada em navegadores e larguras reais.

O artefato `exports/content/audit.v1.json` registra 250 filmes, 47 séries, 121 obras de leitura, 151 pessoas, 54 organizações, 34 obras animadas, 3 obras audiovisuais editoriais e 2 jogos. Ele não registra IDs duplicados nem relações inválidas em seu escopo atual.

## 1. Estrutura encontrada

### 1.1 Acervos e fontes técnicas

| Domínio | Armazenamento | Schema e validação | Identidade e publicação | Estado confirmado |
| --- | --- | --- | --- | --- |
| Filmes | `src/content/movies/`, agregado por `movies.ts` | `movieSchema.ts`, `MovieBatchSchema` e auditor | ID permanente, slug e aliases; status `draft`, `review` ou `published` | 250 registros: 235 `draft`, 15 `review`, nenhum `published` |
| Séries | `src/content/series/series.ts` | `seriesSchema.ts`, `SeriesBatchSchema` e auditor | ID `ser_*`, slug e aliases; `editorialStatus` separado do estado narrativo | 47 registros, todos em `review`; não há rota individual |
| Livros e light novels | catálogo compartilhado em `src/content/reading/` | `readingSchema.ts`, `ReadingCatalogSchema` e auditor | obra `read_work_*`, série, volume, edição e oferta separados | 68 livros; nenhuma light novel cadastrada pelo valor de `format`; todos em `review` |
| Quadrinhos, mangás, manhwas e manhuas | o mesmo catálogo de leitura | `ReadingWorkSchema`, com `comicTradition`, `comicFormat` e `readingDirection` | não há catálogo paralelo; rota canônica é `/quadrinhos/[slug]` | 49 `comic` e 4 `graphic-novel`; tradições específicas dependem dos campos da obra; todos em `review` |
| Pessoas | `src/content/creators/creators.ts` | `creatorSchema.ts` | ID `person_*`, slug, múltiplas ocupações e status | 151 registros; fachada de personalidades filtra registros publicados com biografia |
| Organizações | `src/content/organizations/organizations.ts` | `OrganizationSchema` local, não exportado | ID `org_*`, slug, tipo, relações institucionais e status | 54 registros; mistura estúdios, empresas, editoras, selos, revistas e plataformas |
| Obras audiovisuais editoriais | `src/content/works/works.ts` | `workSchema.ts` | ID próprio, contribuidores, organizações e obras relacionadas | 3 registros; usado por *Puparia*, documentário relacionado e *Wade* |
| Obras animadas | `src/content/animationWorks/animationWorks.ts` | schema local | vocabulário próprio de relações com organizações | 34 registros; parcialmente paralelo a filmes |
| Jogos | `src/content/games/games.ts` | schema local | IDs de organização e contribuidores | 2 registros; não possui fachada nem biblioteca pública equivalente |

### 1.2 Campos comuns e específicos

Filmes, séries e obras de leitura possuem ID, slug, aliases, títulos, estado editorial, datas, fontes, descrições e relações com pessoas. Filmes e leitura também possuem relações estruturadas com organizações. Imagem e direitos são estruturados em filmes e leitura; séries não possuem campo de imagem.

Campos específicos relevantes:

- filmes: lançamento, duração, direção, roteiro, gêneros, subgêneros, experiência, alertas, pôster e relações de produção/distribuição;
- séries: período, temporadas, episódios, formato televisivo e disponibilidade por intervalo de temporadas;
- leitura: formato, tradição de quadrinhos, demografia, direção de leitura, série, unidade serializada, volume, edição, ISBN, tradução e oferta comercial;
- pessoas: retrato licenciado, biografia, ocupações, ideias, pontos de entrada e relações editoriais;
- organizações: tipo, fundação, local, fundadores, pessoas-chave, organização controladora e perfil público.

### 1.3 Rotas e fontes de SEO

- Artigos usam `/blog/[slug]` e são produzidos por MDX.
- Filmes têm `/filmes` e `/filmes/[slug]`, mas somente registros `published` geram páginas e sitemap.
- Livros e quadrinhos possuem rotas de índice e detalhe preparadas, pausadas na navegação enquanto não houver obras publicadas.
- Séries possuem catálogo, ofertas, curadorias e cards, mas não possuem biblioteca, página individual, sitemap ou JSON-LD próprio.
- Personalidades usam `/personalidades/[slug]`; Shingo Tamagawa também possui a rota estática anterior `/criadores/shingo-tamagawa`.
- Estúdios são rotas estáticas individuais em `/estudios/*` e entram manualmente no sitemap.
- Filmes e leitura usam suas respectivas fachadas em `src/data/` nas rotas. Séries, organizações, jogos e obras animadas ainda usam importação local direta.

## 2. O que já funciona corretamente

1. **Separação entre entidade e apresentação.** Os cards recebem registros centrais; títulos, descrições, créditos e imagens não são declarados como objetos completos dentro do MDX.
2. **Acervo unificado de leitura.** Livro, light novel e tradições de quadrinhos compartilham a entidade intelectual, mas volumes, edições, capas, ISBNs e ofertas permanecem separados.
3. **IDs e aliases validados nos domínios principais.** Os lotes de filmes, séries e leitura rejeitam colisões de identidade em seus próprios catálogos.
4. **Relações editoriais centrais.** Curadorias de filmes, séries e leitura guardam referências às obras. As curadorias de filmes já suportam listas automáticas, editoriais e híbridas.
5. **Relações reversas de pessoas.** `src/data/personalities/index.ts` encontra filmes, séries, leituras e obras editoriais pelas relações guardadas nas obras.
6. **Filmografia automática de organizações.** `OrganizationWorks` consulta `organizationRelationships` dos filmes e filtra por papéis explícitos e relações publicadas.
7. **Dados comerciais separados.** Filmes, séries e leitura mantêm disponibilidade e ofertas fora do registro editorial principal.
8. **Fallbacks de mídia.** Filmes e leitura possuem apresentação sem imagem; o card de leitura pode usar a capa de uma edição brasileira sem copiá-la para a obra universal.
9. **Auditoria relacional ampla.** O auditor verifica relações entre catálogos, duplicações, ofertas, intervalos de temporadas, edições e itens das curadorias centrais.
10. **HTML essencial no servidor.** Os cards são resolvidos por componentes de servidor; título, descrição e comentário editorial não dependem de interação no cliente.

## 3. Inconsistências confirmadas

### E-01 — O artigo não referencia a curadoria central como unidade

- **Prioridade:** crítica
- **Problema:** filmes, séries e leituras têm arquivos de curadoria por ID, mas os artigos repetem cada card e seu comentário manualmente no MDX. Não existe no frontmatter um `curationId` nem um componente que renderize diretamente a seleção central.
- **Evidência:** `src/content/movies/curations.ts`, `src/content/series/curations.ts` e `src/content/reading/curations.ts` armazenam referências; os 10 artigos de filmes contêm 224 chamadas `MovieCard`, os 3 de séries contêm 57 `SeriesCard` e os 6 de leitura contêm 132 `ReadingWorkCard`.
- **Arquivos envolvidos:** curadorias citadas, `src/components/blog/postSchema.ts`, `src/components/mdx.tsx` e os MDX de listas de entretenimento.
- **Impacto:** ordem e comentários podem divergir entre o artigo publicado e a curadoria validada. Alterar o arquivo central não atualiza necessariamente o artigo.
- **Correção sugerida:** tornar a curadoria central a referência publicada da lista e permitir no MDX apenas blocos editoriais fora da seleção. A renderização deve receber o ID da curadoria e resolver os itens por ID.

### E-02 — A auditoria não valida as referências efetivamente escritas no MDX

- **Prioridade:** crítica
- **Problema:** `scripts/audit-content.mjs` valida itens dos arquivos de curadoria, mas `getArticleRecords()` lê somente frontmatter. O corpo MDX não é analisado em busca de `MovieCard`, `SeriesCard` ou `ReadingWorkCard`.
- **Evidência:** o auditor registra zero relações inválidas, enquanto suas verificações não percorrem os componentes do corpo. As 413 chamadas de cards foram encontradas diretamente nos MDX, fora do contrato auditado.
- **Arquivos envolvidos:** `scripts/audit-content.mjs`, `src/components/mdx.tsx` e `src/app/blog/posts/**/*.mdx`.
- **Impacto:** é possível ter uma curadoria válida e um artigo divergente. Uma referência inválida só será percebida durante renderização, e o comportamento varia entre componentes.
- **Correção sugerida:** validar a associação artigo-curadoria e, durante a transição, extrair e verificar referências de componentes do AST MDX antes do build.

### E-03 — Artigos usam slugs para filmes e séries, apesar da regra de IDs permanentes

- **Prioridade:** alta
- **Problema:** `MovieCard` recebe `movie` como slug e `SeriesCard` recebe `series` como slug. Apenas `ReadingWorkCard` recebe `workId`.
- **Evidência:** `src/components/movies/MovieCard.tsx` usa `getMovieBySlug`; `src/components/series/SeriesCard.tsx` usa `seriesBySlug`; foram encontradas 224 referências de filmes e 57 de séries por slug.
- **Arquivos envolvidos:** esses componentes e os 13 artigos correspondentes.
- **Impacto:** uma troca de slug exige migrar MDX mesmo quando o ID permanece estável; aliases mascaram a fragilidade sem removê-la.
- **Correção sugerida:** componentes editoriais devem aceitar `movieId` e `seriesId`. Slugs continuam pertencendo apenas às URLs.

### E-04 — Falhas de referência possuem comportamentos incompatíveis

- **Prioridade:** alta
- **Problema:** filme e leitura lançam erro para referência ausente; série renderiza “Série não encontrada no acervo” e permite que a publicação continue.
- **Evidência:** `MovieCard.tsx`, `ReadingWorkCard.tsx` e `SeriesCard.tsx`.
- **Impacto:** uma lista de séries pode ser publicada com entidade inexistente, violando diretamente a regra central.
- **Correção sugerida:** bloquear a validação editorial antes do build com erro contextualizado por artigo, independentemente do comportamento defensivo do componente.

### E-05 — Nenhuma entidade dos três grandes catálogos está publicada

- **Prioridade:** alta
- **Problema:** os artigos estão publicados e renderizam dados centrais, mas nenhum filme está `published`; todas as séries e leituras estão em `review`.
- **Evidência:** `exports/content/audit.v1.json`, `exports/content/movies.v1.json`, `exports/content/series.v1.json` e `exports/content/reading.v1.json`.
- **Impacto:** não há páginas individuais indexáveis para as 250 obras de cinema nem para as 121 leituras; séries sequer possuem rota. Os cards omitem links para detalhes porque verificam o estado publicado. Artigo, página da obra e sitemap não formam ainda uma navegação completa.
- **Correção sugerida:** definir critérios de promoção por entidade e publicar somente registros completos. Não promover todo o lote automaticamente.

### E-06 — Séries não possuem imagem nem página individual

- **Prioridade:** alta
- **Problema:** `SeriesSchema` não possui imagem, crédito ou direitos; `SeriesCard` usa sempre um bloco abstrato “Série recomendada”. Não existe `/series` ou `/series/[slug]`.
- **Evidência:** `src/content/series/seriesSchema.ts`, `src/components/series/SeriesCard.tsx` e ausência de rotas em `src/app/series`.
- **Impacto:** o acervo é incapaz de representar capas licenciadas, SEO visual, detalhes por obra ou navegação do artigo para a série.
- **Correção sugerida:** decidir se séries terão páginas próprias; independentemente disso, adicionar mídia estruturada e licenciada ao schema antes de ampliar o catálogo visual.

### E-07 — Organizações não possuem validação de lote equivalente

- **Prioridade:** alta
- **Problema:** `OrganizationSchema` é local e não exportado. O auditor verifica IDs duplicados e referências, mas não colisões entre slugs/aliases, nem todas as relações internas, como fundadores, pessoas-chave e organização controladora.
- **Evidência:** `src/content/organizations/organizations.ts` e `scripts/audit-content.mjs`.
- **Impacto:** perfis e links podem conflitar; uma pessoa ou organização institucional inexistente pode permanecer no registro.
- **Correção sugerida:** exportar schema e validação de lote, normalizar slug/alias e auditar todas as relações internas.

### E-08 — Pessoas ainda guardam bibliografia/filmografia manual em `workIds`

- **Prioridade:** média
- **Problema:** `CreatorSchema` mantém `workIds`, embora a página dinâmica já descubra obras pelas relações reversas. Shingo e os criadores de *Wade* ainda usam a lista manual.
- **Evidência:** `src/content/creators/creatorSchema.ts`, `src/content/creators/creators.ts` e `src/data/personalities/index.ts`.
- **Impacto:** existem duas fontes possíveis para obras de uma pessoa; elas podem divergir.
- **Correção sugerida:** reservar `startingPoints` para curadoria e remover `workIds` após migrar consumidores legados para relações reversas.

### E-09 — Organizações também mantêm `workIds` ao lado de relações reversas

- **Prioridade:** média
- **Problema:** `OrganizationSchema` exige `workIds`, mas filmografias de filmes são descobertas em `organizationRelationships`; obras editoriais ainda dependem do lado da organização em alguns registros.
- **Evidência:** `src/content/organizations/organizations.ts`, `src/components/organizations/OrganizationWorks.tsx` e `src/content/works/works.ts`.
- **Impacto:** catálogo e perfil podem discordar sobre quais obras pertencem à organização.
- **Correção sugerida:** eleger relações na obra como fonte; manter apenas seleções editoriais explícitas e nomeadas no perfil.

### E-10 — Há domínios paralelos para filmes, obras animadas e obras audiovisuais

- **Prioridade:** média
- **Problema:** `movies`, `animationWorks` e `works` descrevem obras audiovisuais com schemas e vocabulários diferentes. Isso é justificável para curtas editoriais, mas a fronteira não está formalizada e obras animadas longas podem sobrepor filmes.
- **Evidência:** `src/content/movies/`, `src/content/animationWorks/` e `src/content/works/`.
- **Impacto:** risco de dupla representação, relações incompatíveis e cards diferentes para entidades semelhantes.
- **Correção sugerida:** documentar critérios de pertencimento e criar identificadores cruzados quando a mesma obra precisar participar de mais de um domínio, sem duplicar a identidade intelectual.

### E-11 — Estúdios possuem schema legado paralelo

- **Prioridade:** média
- **Problema:** `src/content/studios/studios.ts` mantém `StudioSchema` e anúncios da LAIKA, enquanto organizações são a entidade institucional principal.
- **Evidência:** `src/content/studios/studios.ts`, `src/content/organizations/organizations.ts` e `docs/architecture/site-architecture.md`.
- **Impacto:** dados institucionais podem divergir e novos perfis podem escolher fontes diferentes.
- **Correção sugerida:** migrar o conteúdo ainda necessário para organizações ou para uma entidade própria de projeto futuro e retirar o schema legado.

### E-12 — A rota antiga de Shingo convive com o modelo dinâmico de personalidades

- **Prioridade:** média
- **Problema:** existe `/criadores/shingo-tamagawa` e também a infraestrutura `/personalidades/[slug]`. O registro de Shingo é `published`, embora a fachada dinâmica exija biografia e possa atualmente excluí-lo dessa segunda rota.
- **Evidência:** `src/app/criadores/shingo-tamagawa/page.tsx`, `src/app/personalidades/[slug]/page.tsx`, `src/content/creators/creators.ts` e `src/data/personalities/index.ts`.
- **Impacto:** a migração futura pode criar duas URLs públicas para a mesma pessoa ou manter personalidades em sistemas visuais diferentes.
- **Correção sugerida:** escolher a rota canônica e planejar redirecionamento, preservando o conteúdo editorial específico de Shingo.

## 4. Riscos no fluxo de publicação

### R-01 — Não há bloqueio único artigo → entidades

- **Prioridade:** crítica
- **Problema:** o comando de auditoria bloqueia curadorias centrais inválidas, mas não prova que o corpo publicado usa a mesma curadoria.
- **Evidência no código:** `scripts/audit-content.mjs` não analisa o corpo MDX; `PostFrontmatterSchema` não relaciona artigo a uma curadoria.
- **Impacto:** a regra central depende de disciplina editorial e do build incidental, não de um contrato de publicação.
- **Correção sugerida:** o ponto correto é a auditoria de conteúdo executada antes de lint/build, validando `articleId/slug → curationId → item IDs → catálogo`.

### R-02 — Build não é uma garantia uniforme

- **Prioridade:** alta
- **Problema:** referências ausentes de filme/leitura podem quebrar a renderização, mas séries degradam para texto e seguem publicáveis.
- **Impacto:** o mesmo erro editorial produz resultados diferentes conforme o domínio.
- **Correção sugerida:** falhar antes da renderização e emitir arquivo, linha, componente e ID ausente.

### R-03 — Estado editorial do artigo não depende do estado da obra

- **Prioridade:** média
- **Problema:** artigos publicados podem recomendar registros em `draft` ou `review`. O modelo de filmes documenta que rascunhos podem alimentar cards, mas isso não está formalizado do mesmo modo para todos os domínios.
- **Impacto:** dados insuficientes podem chegar ao artigo mesmo sem gerar página individual.
- **Correção sugerida:** confirmar a política humana: artigo pode usar `review` validado ou deve exigir `published`? Codificar a decisão por domínio.

### R-04 — Disponibilidade é temporal, mas a validade não bloqueia publicação

- **Prioridade:** alta
- **Problema:** ofertas possuem data e os cards conseguem marcar vencimento em filmes, mas não há política única que impeça afirmar disponibilidade desatualizada no lançamento do artigo.
- **Arquivos envolvidos:** `movieOffers.ts`, `seriesOffers.ts`, componentes de disponibilidade e auditor.
- **Impacto:** páginas “agora” podem ser tecnicamente válidas e editorialmente obsoletas.
- **Correção sugerida:** listas temporais devem declarar data de corte e falhar ou advertir quando uma oferta ultrapassar o limite definido.

### R-05 — Sitemap e busca não derivam integralmente do mesmo registro de publicação

- **Prioridade:** média
- **Problema:** filmes, leituras e personalidades são dinâmicos no sitemap; estúdios, criador legado e obras editoriais são entradas manuais. A busca global também possui itens manuais.
- **Impacto:** uma rota pode existir sem descoberta, ou continuar listada após mudança de estado.
- **Correção sugerida:** derivar as superfícies de descoberta dos registros publicados e manter exceções explícitas auditáveis.

## 5. Problemas visuais e de UX

### U-01 — Dois estilos de card de filme coexistem

- **Prioridade:** média
- **Fato confirmado:** `MovieCard.tsx` apenas delega a `MovieListCard`, mas `MovieCard.module.scss` preserva uma implementação visual antiga e extensa que não é importada por ele.
- **Impacto:** manutenção duplicada e alto risco de alterar o arquivo errado.
- **Correção sugerida:** remover o stylesheet órfão depois de confirmar ausência de importações.

### U-02 — Cards editoriais acumulam duas descrições e disponibilidade

- **Prioridade:** média
- **Fato confirmado:** `MovieListCard` mostra descrição permanente, comentário da lista, organizações, disponibilidade e ação. `ReadingCard` mostra comentário, autores e estado da edição. `SeriesCard` mostra descrição, comentário, ofertas e avisos.
- **Hipótese para verificação visual:** listas longas tendem a ficar densas e repetitivas no celular, sobretudo quando disponibilidade tem mais de uma oferta.
- **Correção sugerida:** definir hierarquia por contexto: comentário editorial como conteúdo principal da lista; descrição e detalhes secundários podem ser compactados ou deslocados para a página da obra.

### U-03 — Proporções e tratamento de imagens são inconsistentes

- **Prioridade:** média
- **Fato confirmado:** filmes usam `object-fit: cover`; leitura usa `object-fit: contain`; séries não possuem imagem. No mobile, pôsteres de filme usam colunas de 7rem, capas editoriais de leitura podem chegar a 34vw e séries usam bloco abstrato de 6,5rem.
- **Hipótese para verificação visual:** a alternância entre recorte, barras de fundo e ausência total de capa reduz continuidade visual entre listas.
- **Correção sugerida:** manter decisões diferentes por mídia, mas compartilhar tokens de largura, raio, espaçamento e estados de fallback.

### U-04 — Card de série não possui ação principal nem link interno

- **Prioridade:** alta
- **Fato confirmado:** título e bloco visual não são links; apenas ofertas externas são clicáveis.
- **Impacto:** o leitor não consegue navegar para contexto permanente da série, pessoa ou catálogo.
- **Correção sugerida:** caso páginas de séries sejam aprovadas, tornar título e ação links internos. Antes disso, oferecer ao menos relações internas realmente existentes sem simular página ausente.

### U-05 — Não existe `PersonCard`

- **Prioridade:** média
- **Fato confirmado:** não foi localizado componente próprio. A página de personalidade usa cards oficiais das obras e compõe pessoas relacionadas sem um núcleo reutilizável dedicado.
- **Impacto:** pessoas podem ser apresentadas com marcação ad hoc e pouca consistência em artigos, relações e índices futuros.
- **Correção sugerida:** criar um card próprio somente quando houver ao menos dois consumidores, priorizando retrato, nome, ocupações, país/período e apresentação curta.

### U-06 — Não existe `StudioCard`

- **Prioridade:** média
- **Fato confirmado:** perfis de estúdio são rotas próprias e `OrganizationWorks` renderiza filmes, mas não existe card institucional compartilhado.
- **Impacto:** índices ou relações de estúdios dependerão de blocos improvisados; organização, pessoa e obra não têm diferenciação sistêmica completa.
- **Correção sugerida:** projetar um card institucional distinto, priorizando identidade, país, atividade, especialidade e obras relacionadas.

### U-07 — Páginas de estúdio repetem composição e CSS por rota

- **Prioridade:** baixa
- **Fato confirmado:** cada estúdio possui `page.tsx` e módulo SCSS próprios; não há um shell de perfil compartilhado.
- **Hipótese para verificação visual:** espaçamentos, breadcrumbs, fontes e tratamentos de filmografia podem divergir conforme novas páginas forem adicionadas.
- **Correção sugerida:** extrair apenas estrutura semântica e tokens recorrentes, preservando direção de arte própria de cada estúdio.

### U-08 — Falta uma navegação transversal completa

- **Prioridade:** alta
- **Fato confirmado:** filmes em `draft/review` e leituras em `review` não recebem links; séries não possuem páginas; organizações sem `profilePath` aparecem sem link; não há índices gerais de pessoas ou estúdios.
- **Impacto:** o artigo funciona como destino final em vez de porta para obra, pessoa e organização.
- **Correção sugerida:** publicar progressivamente entidades completas e definir estados não clicáveis de maneira acessível, sem expor rotas vazias.

## 6. Estruturas ausentes

1. Validador de referências do corpo MDX ou, preferencialmente, vínculo obrigatório entre artigo de lista e curadoria central.
2. Fachada/repositório para séries, organizações, jogos e obras animadas.
3. Schema de lote exportado para organizações e pessoas, com colisão de slug/alias e relações internas.
4. Mídia estruturada para séries.
5. Decisão e, se aprovada, rota de biblioteca e detalhe de séries.
6. `PersonCard` e `StudioCard` próprios; não devem herdar visualmente cards de obra.
7. Índices públicos de personalidades e estúdios, caso o volume publicado justifique.
8. Política automática para expiração de disponibilidade em artigos temporais.
9. Critério documentado para fronteiras entre filme, obra animada e obra audiovisual editorial.
10. Adaptações entre catálogos por IDs são opcionais no schema de leitura e frequentemente textuais; falta um registro transversal obrigatório quando a entidade correspondente já existe.

## 7. Duplicações que podem ser removidas

| Duplicação | Evidência | Recomendação |
| --- | --- | --- |
| Seleção e comentários em curadoria + MDX | `curations.ts` dos três domínios e artigos de lista | renderizar a curadoria central no artigo |
| CSS antigo de filme | `MovieCard.module.scss` versus `MovieListCard.module.scss` | confirmar ausência de consumidor e remover o antigo |
| Obras em `Creator.workIds` + relações reversas | creator schema/data e fachada de personalidades | migrar consumidores e remover lista manual |
| Obras em `Organization.workIds` + relações na obra | organizações, filmes e obras editoriais | eleger a relação na obra como fonte |
| Studio legado + Organization | `content/studios` e `content/organizations` | migrar dados remanescentes e retirar schema legado |
| Rota estática de Shingo + modelo dinâmico | `/criadores/shingo-tamagawa` e `/personalidades/[slug]` | escolher canonical e redirecionar a outra rota |
| Cards de filme parcialmente sobrepostos | wrapper `MovieCard`, `MovieListCard` e stylesheet antigo | manter wrapper de resolução apenas se aceitar ID e eliminar apresentação duplicada |

## 8. Decisões que precisam de confirmação humana

1. **Estado mínimo para aparecer em artigo:** `review` validado é aceitável ou toda entidade citada deve estar `published`?
2. **Séries terão páginas individuais?** Sem essa decisão, não é possível definir ação principal, sitemap e JSON-LD do domínio.
3. **Qual rota canônica para Shingo e futuros criadores?** `/personalidades` é mais abrangente, mas a URL antiga precisa ser preservada por redirecionamento.
4. **Até onde unificar obras audiovisuais?** Curtas contemplativos podem justificar páginas editoriais próprias, mas a identidade não deve ser duplicada entre catálogos.
5. **Cards de lista devem mostrar disponibilidade em cada item ou apenas em índice resumido?** A resposta muda densidade e manutenção temporal.
6. **Capas com `permission-pending` podem permanecer públicas?** O schema registra a pendência, mas não bloqueia renderização.
7. **Organizações sem perfil público devem ser apenas texto ou apontar para um futuro índice?** Hoje o comportamento é apenas texto.
8. **Qual grau de informação deve permanecer no card mobile?** A decisão deve ser tomada após teste visual com ofertas longas, títulos extensos, múltiplas organizações e fallback sem imagem.

## 9. Ordem recomendada das correções

1. **Fechar o contrato artigo → curadoria → entidade.** Adicionar vínculo de curadoria e bloquear referências ausentes antes do build.
2. **Migrar filmes e séries de slug para ID nos componentes editoriais.** Preservar aliases somente para URL.
3. **Unificar o comportamento de erro e validar o AST MDX durante a migração.** Nenhum domínio deve publicar placeholder de entidade ausente.
4. **Definir o estado mínimo permitido em artigos e promover apenas entidades completas.** Isso desbloqueia links, páginas e sitemap de forma controlada.
5. **Decidir a arquitetura pública de séries e acrescentar imagem licenciada ao schema.** Depois criar página, SEO e navegação se aprovados.
6. **Fortalecer schemas e auditoria de pessoas e organizações.** Incluir slugs, aliases, fundadores, pessoas-chave, controladoras e relações reversas.
7. **Eliminar fontes duplicadas de relações.** Remover `workIds` manuais de pessoas/organizações e consolidar o legado de estúdios.
8. **Revisar o núcleo visual dos cards.** Compartilhar tokens, não um layout idêntico; reduzir densidade conforme o contexto.
9. **Criar `PersonCard` e `StudioCard` quando os índices ou relações tiverem consumidores reais.** Manter identidades visuais distintas.
10. **Consolidar descoberta e SEO.** Derivar sitemap, busca e índices dos mesmos estados publicados.

## Conclusão

O projeto já possui catálogos centrais reais e relações estruturadas suficientes para sustentar o princípio editorial desejado. A falha principal não está na ausência de acervo, mas no último elo de publicação: o artigo ainda replica a lista no MDX e não declara qual curadoria central representa. Como o auditor valida a curadoria e não o corpo efetivamente renderizado, a regra “nenhuma obra inexistente pode ser publicada” ainda não é uma garantia arquitetural completa.
