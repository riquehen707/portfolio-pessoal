# Padrão editorial para listas de leitura

Este padrão orienta listas e recomendações de livros, mangás, manhwas, manhuas, quadrinhos, graphic novels, webtoons, light novels, livros ilustrados e outras obras de leitura.

Para pautas centradas em arte sequencial, aplique também o [padrão de listas de quadrinhos e mangás](comic-list.md).

Use-o com as regras gerais do [sistema editorial](../../content/README.md), com a [arquitetura do site](../../architecture/site-architecture.md) e com os princípios de catálogo e seleção definidos em [`movie-list.md`](movie-list.md). Não repita aqui regras gerais de voz, pesquisa, frontmatter, SEO ou aprovação.

O `global-standards.md` citado no planejamento editorial ainda não existe. Até sua implementação, a arquitetura e o sistema editorial são as referências gerais. O domínio de leitura está implementado em `src/content/reading/`, com acesso por `src/data/reading/`, componentes em `src/components/reading/` e rotas preparadas em `/livros` e `/livros/[slug]`. O índice permanece pausado enquanto não houver um primeiro lote publicado; rascunhos não entram no sitemap nem geram páginas individuais.

## Escopo e interpretação

Antes de produzir, identifique formato, público, recorte, quantidade, critério e ordenação. Listas normalmente podem reunir de 15 a 31 obras, mas o critério editorial prevalece sobre a meta numérica.

Não misture formatos sem explicar por quê. Não chame toda obra asiática de mangá:

- mangá é associado à tradição editorial japonesa;
- manhwa, à coreana;
- manhua, à chinesa;
- webtoon descreve uma forma de publicação e leitura digital vertical, não uma nacionalidade;
- quadrinho, graphic novel, light novel e livro ilustrado possuem contratos formais distintos.

Pergunte somente quando uma ambiguidade alterar materialmente a seleção. Em “meus favoritos”, use apenas escolhas e opiniões fornecidas ou aprovadas pelo autor; não invente experiência em primeira pessoa.

## Fluxo obrigatório

Siga duas etapas, nesta ordem:

1. revisar ou cadastrar as obras no acervo central;
2. montar a lista usando referências a essas obras.

Antes de cadastrar, procure por ID, slug, título original, títulos brasileiros e aliases. Reutilize registros, complete lacunas confirmadas e evite duplicações por tradução, romanização ou edição. Uma obra pode alimentar cards e listas sem possuir imediatamente uma página editorial pública.

O acervo central deve ser ampliado antes da publicação de cada lista. Não armazene obras completas dentro do MDX nem adapte `MovieSchema` ou o schema audiovisual `WorkSchema` para representar publicações.

Em cadastros em lote, normalize uma planilha de candidatos com ID, slug, título original, título brasileiro, romanização e aliases. Pesquise todos esses campos antes de criar IDs; uma tradução, nova capa, ISBN ou edição brasileira não cria outra obra intelectual. Cadastre primeiro pessoas e organizações ausentes, depois obras e séries, volumes, edições e, por último, ofertas. Execute a auditoria entre cada etapa quando o lote for grande.

## Separação das entidades

O modelo mantém entidades distintas:

1. **obra:** identidade intelectual permanente;
2. **série:** agrupamento narrativo, editorial ou de publicação;
3. **volume:** parte numerada ou identificada da obra;
4. **edição:** publicação específica por país, idioma, editora e formato;
5. **oferta comercial:** produto, vendedor, disponibilidade e link verificados;
6. **item da lista:** posição e comentário exclusivos da seleção.

Preço, afiliado, ISBN, editora brasileira, número de volumes de uma edição e capa de um produto não são propriedades universais da obra.

## Contrato da obra

`ReadingWorkSchema` comporta, quando confirmados:

- ID permanente, slug e aliases;
- título original, romanização quando útil e títulos publicados no Brasil;
- formato, país e idioma de origem;
- autoria e créditos separados de roteiro, arte e outras funções;
- editora original, revista, selo ou plataforma;
- período e situação da publicação;
- quantidade verificada de volumes ou capítulos;
- gêneros, temas e público editorial ou demografia;
- sinopse curta, original e factualmente fiel;
- relações com adaptações, derivados e outras obras;
- imagem, origem, crédito, texto alternativo e situação de direitos;
- fontes, estado editorial e datas de criação/revisão.

Gênero, tema, formato, categoria e demografia são dimensões diferentes. `shōnen`, `shōjo`, `seinen` e `josei` não são automaticamente gêneros. Light novels permanecem no mesmo catálogo de livros e usam a categoria `light-novel`; o formato homônimo é preservado para compatibilidade e exige essa categoria. A classificação só deve ser aplicada quando documentada. Quantidades e estados como “em publicação” são dados instáveis: registre a data da verificação e confirme-os novamente ao revisar a lista.

Não copie sinopses de editoras ou lojas. Priorize criadores, editoras, publicações oficiais, ISBN/agências bibliográficas e plataformas responsáveis; complemente com fontes secundárias confiáveis quando necessário.

## Volumes e edições brasileiras

`ReadingVolumeSchema` aponta para a obra por ID. `ReadingEditionSchema` exige exatamente uma referência para obra ou volume e registra, quando aplicável:

- editora e selo;
- título adotado;
- país, idioma e formato;
- volumes abrangidos;
- quantidade de volumes efetivamente publicados nessa edição;
- ISBN por produto editorial;
- situação da publicação no Brasil;
- data da última verificação.

Não presuma equivalência entre edição estrangeira e brasileira. Informe ausência de edição oficial no Brasil somente quando isso estiver confirmado e for útil ao leitor. Não indique fontes ilegais de leitura.

## Pessoas, organizações e adaptações

Relacione por IDs permanentes autores, roteiristas, artistas, editoras, selos, revistas, plataformas, adaptações, séries derivadas e obras relacionadas.

Não atribua a autoria da publicação ao estúdio que produziu uma adaptação. Pessoas e organizações precisam de papéis explícitos. Quando houver perfil público, o componente poderá gerar link interno; sem perfil, deve exibir o crédito sem fabricar uma página vazia.

O domínio reutiliza os IDs atuais de criadores e organizações, mas mantém vocabulário relacional específico de publicações. Ampliar um contrato compartilhado entre audiovisual e leitura continua sendo decisão futura e exige migração compatível.

## Modelo da lista

A lista deve guardar somente referências e informações exclusivas daquele recorte. O contrato implementado aceita:

```ts
items: [
  {
    workId: "read_work_witch_hat_atelier",
    position: 1,
    justification: "Justificativa específica desta seleção.",
    recommendedFor: "Quem procura fantasia centrada no aprendizado.",
    startingPointEditionId: "read_edition_witch_hat_atelier_br_vol_1"
  }
]
```

Devem vir do acervo: títulos, autoria, formato, país, período, gêneros, temas, situação, imagem, sinopse, relações e links.

Podem pertencer à lista: posição, justificativa, público recomendado, adequação ao tema, nível de familiaridade, ponto de entrada, observação contextual e ordem de leitura quando realmente necessária.

Não copie o registro completo para o artigo. O primeiro lote deve testar se os campos atuais cobrem entradas por volume, omnibus e leitura digital sem ampliar o schema por antecipação.

## Qualidade editorial

Toda lista precisa de título alinhado à busca, introdução curta, recorte e critérios claros, organização compreensível, recomendação específica por obra, orientação de início quando necessária e links internos relevantes.

O comentário deve explicar por que a obra pertence à lista, seu diferencial, para quem funciona, quais expectativas ajustar e como começar quando isso não for óbvio. Não reescreva a sinopse.

Popularidade, vendas, prêmio ou adaptação em anime não provam qualidade por si. Não complete a quantidade artificialmente nem trate seleção subjetiva como consenso.

## Componentes e apresentação

Use os componentes em `src/components/reading/`. Em MDX, `ReadingWorkCard` recebe `workId` e resolve o registro central; um ID inexistente interrompe o build em vez de renderizar dados inventados.

Os componentes compartilhados recebem uma entidade tipada ou referência estruturada e devem continuar funcionando:

- com e sem capa;
- com títulos longos;
- com obras concluídas, pausadas ou em andamento;
- com uma ou várias autorias;
- com e sem edição brasileira;
- com e sem oferta comercial;
- em desktop, mobile, teclado e HTML útil sem JavaScript.

Mostre somente o necessário ao contexto: título, autoria, formato, situação, quantidade verificada, gêneros ou temas e comentário da recomendação. Dados secundários pertencem à página detalhada ou a uma expansão acessível, quando implementada.

## SEO

A otimização vem do recorte e dos comentários originais: responda rapidamente à consulta, use títulos e aliases úteis, explicite critérios, diferencie recomendações e conecte autores, adaptações e temas por links rastreáveis.

Não repita “melhores mangás” em todos os itens, não crie FAQs artificiais e evite fórmulas como “obra obrigatória para todos os fãs”. Dados estruturados só devem ser definidos após existir um tipo de página e conteúdo visível compatíveis; não invente JSON-LD genérico para compensar a ausência do modelo.

## Monetização

Ofertas devem ser entidades separadas e apontar para a edição ou volume correto. Quando confirmadas, registre produto/edição, loja, URL, afiliado, região, disponibilidade, preço e moeda quando úteis, data de verificação e aviso de comissão. Preço e disponibilidade são instantâneos, não atributos permanentes da edição.

Links da Amazon ou de outra loja devem identificar a edição correta sempre que possível. Não associe capa, ISBN ou preço de um volume à série inteira. A recomendação editorial deve funcionar integralmente sem produto afiliado.

## Validação e relatório

Antes de concluir uma lista:

- confirme inexistência de duplicatas por tradução ou romanização;
- valide títulos, aliases, formatos e créditos;
- diferencie obra, volume, edição, oferta e item da lista;
- confira situação e quantidades na data registrada;
- valide pessoas, editoras, plataformas e adaptações;
- confirme que cards resolvem dados do acervo;
- teste ausência de capa, edição brasileira e oferta;
- revise comentários repetitivos e links internos/comerciais;
- execute auditoria de conteúdo, TypeScript, lint, validações de MDX, build e `git diff --check` conforme o impacto.

No relatório final, informe obras encontradas, atualizadas e criadas; edições brasileiras; relações; componentes; fontes; imagens e direitos; ofertas; validações e pendências.
