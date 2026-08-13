# Padrão editorial para listas de filmes

Este é o padrão obrigatório para listas, rankings, favoritos, recomendações e seleções de filmes por estúdio, direção, gênero, país, período, público ou ocasião. Ele também orienta listas comparativas, automáticas e híbridas.

Use-o com as regras gerais do [sistema editorial](../../content/README.md) e com a [arquitetura do site](../../architecture/site-architecture.md). O `global-standards.md` citado no planejamento editorial ainda não existe no repositório; até sua implementação, esses dois documentos exercem essa função. Não replique aqui regras gerais de voz, pesquisa, frontmatter, MDX ou aprovação.

Quando a seleção for guiada principalmente por uma tese, atmosfera ou percurso autoral, aplique também o futuro template de curadoria. **Pendência:** esse template ainda não está implementado.

## Fluxo obrigatório

Crie a lista em três etapas, nesta ordem:

1. defina e pesquise a seleção editorial;
2. audite e complete o catálogo central;
3. monte a lista com referências aos filmes cadastrados.

Não escreva os itens antes de concluir a curadoria e verificar o acervo. O usuário não precisa fornecer manualmente todos os títulos que entrarão na lista.

## 1. Interpretar o pedido

Registre tema ou intenção, público, recorte, quantidade, critério de inclusão, ordenação, presença de ranking, necessidade de comentários pessoais e oportunidades naturais de links internos ou monetização.

Pergunte somente quando a ambiguidade mudar materialmente a seleção. “Filmes da Disney”, por exemplo, pode indicar Walt Disney Animation Studios, Pixar, empresas distintas do grupo, obras apenas distribuídas pela Disney ou uma seleção editorial associada à marca. Não misture esses sentidos silenciosamente.

Em pedidos de “meus favoritos”, seleção e opiniões em primeira pessoa precisam vir do autor ou ser confirmadas por ele. Não invente preferências pessoais.

### Quando o pedido não fornece os filmes

Um pedido pode informar apenas a pauta, o recorte ou a intenção da lista — por exemplo, “filmes de terror contemporâneo para quem não gosta de jumpscare” ou “animações para conhecer o stop-motion”. Nesse caso, a ausência de títulos não bloqueia a criação nem transfere a curadoria para o usuário.

O Codex deve, nesta ordem:

1. pesquisar e construir uma seleção editorial coerente com a pauta, o público e os critérios confirmados;
2. definir quais filmes realmente entrarão no artigo, sem inflar a quantidade para preencher uma meta arbitrária;
3. procurar cada filme no acervo por ID, slug, título original, título brasileiro e aliases;
4. reutilizar e completar os registros existentes;
5. cadastrar no acervo central todas as obras ausentes;
6. somente depois montar a lista usando referências por ID.

A pesquisa editorial decide quais obras merecem entrar; a auditoria do catálogo decide se cada entidade será reutilizada, completada ou criada. Não confunda as duas etapas e não limite a seleção ao que já estiver cadastrado.

Quando uma obra não puder ser confirmada adequadamente, exclua-a da seleção ou registre-a como pendência fora da lista publicada. Não complete título, data, crédito, relação, imagem ou outro dado por inferência não sustentada.

## 2. Auditar o catálogo

Para cada obra:

1. procure por ID, slug, aliases, título brasileiro e título original;
2. reutilize o registro existente;
3. corrija ou complete somente dados confirmados;
4. crie um registro apenas quando a obra não existir;
5. valide o lote para detectar IDs, slugs e aliases conflitantes.

A fonte técnica é `src/content/movies/movieSchema.ts`; os registros são agregados por `src/content/movies/movies.ts` e acessados externamente pela fachada `src/data/movies/`. Um filme pode alimentar listas, cards e filmografias ainda como rascunho, sem receber uma página individual indexável.

Não crie catálogos paralelos por lista, marca ou estúdio. Os arquivos de sementes existentes de Ghibli e LAIKA são uma organização interna legada do catálogo agregado, não autorização para novas filmografias duplicadas.

## 3. Cadastrar ou revisar filmes

Preencha os campos úteis aceitos pelo schema e sustentados por fontes:

- ID permanente, slug e aliases;
- títulos brasileiro, original e internacional, quando aplicável;
- ano, data, formato, estado de produção, tipo de lançamento e duração;
- gêneros, subgêneros, temas e países;
- direção, roteiro e créditos relevantes;
- descrição curta original, perfil de público, experiência e avisos sensíveis;
- relações com organizações;
- pôster com origem, crédito, texto alternativo e situação de direitos;
- fontes e estado editorial.

Não copie sinopses de distribuidores. Prefira fontes oficiais de filmes, estúdios, distribuidoras e instituições cinematográficas; use fontes secundárias confiáveis apenas para complementar o que as primárias não cobrem.

**Lacunas atuais:** idioma, classificação indicativa, franquia, obra de origem e financiamento não existem no `MovieSchema`. Não improvise campos. Registre a necessidade para uma futura evolução de schema, com migração e documentação próprias.

## 4. Relacionar organizações

Use `organizationRelationships` com ID permanente e um ou mais papéis aceitos atualmente:

- `production`;
- `co-production`;
- `animation`;
- `distribution`;
- `licensing`;
- `collaboration`;
- `services`.

Não trate distribuição como produção, não atribua automaticamente a obra à controladora e não use `collaboration` como substituto genérico de um crédito desconhecido. O papel `financing` ainda não é suportado.

Preserve entidades distintas dentro de grupos empresariais. Uma lista pode reuni-las editorialmente, mas o catálogo deve registrar a organização que exerceu cada papel. Relações compatíveis alimentam automaticamente `OrganizationWorks`; páginas de estúdio não mantêm filmografia manual.

## 5. Modelar a lista

O contrato implementado está em `src/content/movies/curations.ts`:

```ts
const list: MovieList = {
  id: "list_exemplo",
  slug: "exemplo",
  title: "Seleção de exemplo",
  href: "/blog/exemplo",
  mode: "editorial",
  items: [
    {
      movieId: "mov_7c1f3a",
      position: 1,
      context: "Justificativa exclusiva desta seleção."
    }
  ]
};
```

A lista armazena apenas referências e informações próprias: `movieId`, posição e contexto. Títulos, ano, duração, gêneros, países, créditos, organizações, imagem, descrição e links vêm do catálogo central.

Nenhum artigo pode criar objetos completos de filmes dentro do MDX. Somente posição, justificativa, comentário editorial e relação específica com a pauta pertencem ao artigo ou ao item da curadoria. Todo dado permanente da obra deve vir do acervo central, mesmo quando o cadastro tiver sido criado durante a produção daquela lista.

Modos disponíveis:

- `automatic`: aplica regras por organização, gênero, país, direção e intervalo de anos; a resolução atual ordena por ano e depois por ID;
- `editorial`: preserva a ordem de `items`;
- `hybrid`: coloca primeiro os `items`, completa com as regras automáticas e respeita `excludeMovieIds`.

O modelo atual não possui campos separados `highlight` ou `commentary`; use `context`. Evolua o contrato compartilhado somente quando uma necessidade recorrente justificar a migração.

## 6. Escrever o artigo

Toda lista precisa de título alinhado à busca, resposta curta no início, recorte compreensível, ordenação justificável, comentário específico por filme, conclusão útil e links internos naturais.

Ranking é opcional. Uma lista pode ser ordenada por ano, estúdio, gênero, intensidade, acessibilidade ou percurso. Não aumente a quantidade para atingir um número atraente quando o critério não sustentar os itens extras.

O comentário de cada filme deve explicar por que ele pertence à seleção, o que oferece e o que o diferencia naquele recorte. Não reescreva a descrição básica do catálogo.

## 7. Renderizar com componentes compartilhados

Em MDX, use `MovieCard`, que resolve o filme pelo **slug** e exige `context`:

```mdx
<MovieCard
  movie="corra"
  position={2}
  context="Faz a sátira racial operar como mecanismo do suspense."
/>
```

Use `compact` apenas quando a densidade exigir e `showAction={false}` quando outra navegação equivalente já estiver presente. O componente compartilhado suporta pôster ausente, múltiplas organizações, desktop e mobile. Não crie um novo card para mudar apenas cor ou detalhe visual.

Para rankings visíveis, mantenha a mesma ordem no JSON-LD:

```mdx
<MovieRankingJsonLd
  path="/blog/exemplo"
  slugs="primeiro-filme,segundo-filme"
/>
```

Aqui há uma distinção intencional: `curations.ts` referencia IDs permanentes; `MovieCard` e `MovieRankingJsonLd` recebem slugs por serem APIs de autoria em MDX.

## 8. SEO e monetização

SEO deve resultar da utilidade: título e descrição coerentes, resposta rápida, critérios claros, aliases quando ajudam o leitor, comentários originais, links relacionados e dados estruturados compatíveis com o conteúdo visível. Evite repetição mecânica de palavra-chave, introduções longas, FAQs artificiais e listas infladas.

Ofertas ficam em `src/content/movies/movieOffers.ts`, relacionadas por `movieId`; nunca no registro editorial nem no item da lista. Só apresente oferta com provedor, tipo, URL, região e data de verificação válidos. Identifique afiliação e comissão. A ausência de oferta não altera o card.

## 9. Validar e relatar

Antes de concluir:

- confirme inexistência de duplicatas e valide IDs, slugs e aliases;
- confira títulos, datas, créditos e fontes;
- valide organizações e papéis;
- confirme que a lista guarda apenas referências e contexto próprio;
- compare ordem visível, `curations.ts` e JSON-LD quando houver ranking;
- teste card com e sem imagem, com nenhuma, uma e várias organizações;
- teste desktop e mobile e confira links internos;
- revise repetição entre comentários;
- execute `npm run audit:content`, `npx tsc --noEmit`, `npm run lint`, validação de MDX pelo build quando aplicável, `npm run build` e `git diff --check` em proporção à mudança.

No relatório final, informe filmes reutilizados, atualizados e criados; duplicações evitadas; relações organizacionais; componentes e estrutura da lista; fontes; imagens e pendências de direitos; validações e riscos restantes.

## Princípio para futuros acervos

O mesmo fluxo deve orientar listas de livros, mangás, séries e jogos quando seus respectivos domínios centrais existirem: um pedido editorial pode ampliar automaticamente o catálogo compartilhado ao exigir novas entidades. O usuário não precisa entregar previamente uma relação completa de obras.

A sequência permanece: pesquisar e selecionar, procurar por identificadores e aliases, reutilizar ou completar registros, cadastrar ausentes confirmados e só então compor o conteúdo por referências permanentes. O artigo guarda apenas informação própria da curadoria; dados duradouros pertencem ao acervo correspondente.

Esse princípio não autoriza schemas improvisados nem objetos completos provisórios no MDX. O acervo de leitura já possui arquitetura central própria, documentada em [`reading-list.md`](reading-list.md); outros domínios devem criar ou validar sua arquitetura antes da primeira lista. Entidades sem confirmação suficiente permanecem como pendência e não recebem preenchimento inventado.
