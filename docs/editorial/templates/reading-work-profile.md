# Diretriz para fichas permanentes de livros

Esta diretriz orienta a pesquisa, o cadastro, a revisão e a publicação das páginas em `/livros/[slug]`. Ela cobre livros, ensaios, poesia, coletâneas e light novels apresentados como obras permanentes do acervo. Listas e recomendações continuam subordinadas a [`reading-list.md`](reading-list.md); obras gráficas usam a biblioteca e as regras próprias de quadrinhos.

Use este documento com a [arquitetura do site](../../architecture/site-architecture.md), o [sistema editorial](../../content/README.md), a [política de pesquisa](../../content/03-producao/pesquisa-e-referencias.md) e a fonte técnica `src/content/reading/readingSchema.ts`. Se a documentação divergir do schema ou da rota executável, o código prevalece e a divergência deve ser corrigida ou registrada.

## Objetivo da página

Uma ficha de livro deve ajudar o leitor a identificar a obra, entender do que ela trata, avaliar se combina com seu interesse e localizar a edição correta. Ela não é uma página de produto, uma cópia de catálogo editorial nem um texto criado apenas para atingir uma contagem mínima de palavras.

Cada página publicada precisa oferecer conteúdo original e útil além de título e metadados. A quantidade de palavras é um sinal de diagnóstico, não uma meta isolada. Não preencher páginas com paráfrases, listas repetidas ou informações não verificadas para superar alertas de auditoria.

## Unidade de trabalho e lotes

As melhorias serão executadas em lotes de até 20 obras. Antes de iniciar um lote:

1. registre as URLs e os IDs incluídos;
2. preserve slug, canonical e aliases existentes;
3. procure duplicatas por título original, título brasileiro, romanização, ISBN e aliases;
4. fotografe o estado inicial: palavras visíveis, capa, sinopse, avaliação, edição brasileira, fontes e status;
5. conclua pesquisa, normalização, imagens, conteúdo e validação do lote antes de começar o seguinte.

Não publicar parcialmente uma ficha que dependa de dados ainda não confirmados. Uma obra pode permanecer `draft` enquanto a pesquisa é concluída. Uma página já publicada não deve ser retirada do ar apenas por estar incompleta; preserve a URL e melhore-a de forma compatível.

## Modelo normalizado

O catálogo central é a única fonte de dados permanentes. As entidades não devem ser copiadas para a rota, o card ou um artigo:

| Entidade | Armazena | Não armazena |
| --- | --- | --- |
| Obra | identidade intelectual, títulos, autoria, origem, datas, gêneros, temas, sinopse, relações e fontes | ISBN, preço, loja ou capa de uma edição comercial |
| Série | agrupamento narrativo, editorial ou de publicação | dados repetidos de cada obra |
| Volume | parte numerada ou nomeada de uma obra | dados comerciais de todas as edições |
| Edição | país, idioma, editora, formato, ISBN, páginas, tradução, capa e disponibilidade verificada | avaliação da obra ou preço permanente |
| Oferta | edição, loja, região, link, disponibilidade e data de verificação | identidade ou sinopse da obra |
| Avaliação editorial | autoria da avaliação, critérios, texto e data de revisão | fatos bibliográficos ou média de leitores |
| Comentário de leitor | usuário, texto, estado de moderação e datas | conteúdo editorial canônico da ficha |

Os cinco primeiros contratos e a avaliação editorial opcional existem em `readingSchema.ts`. Comentários permanecem fora do catálogo, em `reading_comments`, e apontam para `work_id`. Qualquer evolução deve procurar consumidores, preservar registros existentes e atualizar schema, auditoria, exportação e documentação.

Na obra, `workType` distingue livro, ensaio, tratado, diálogo, coletânea, aula e memória sem transformar formato intelectual em edição comercial. `concepts`, `readingDifficulty`, `relatedArticlePaths` e `relatedPeople` sustentam descoberta e navegação. `featuredEditionId` apenas escolhe uma edição já cadastrada para cards e apresentação visual; não copia ISBN, editora ou capa para a obra.

## Português e identidade bibliográfica

- Use `titleBr` somente para um título efetivamente publicado no Brasil e sustente-o com fonte.
- Preserve `originalTitle`; use `romanizedTitle` quando o sistema de escrita ou a descoberta justificar.
- Não traduza por conta própria títulos, nomes de editoras, séries ou subtítulos e não apresente tradução informal como edição brasileira.
- Registre país e idioma com vocabulário consistente em português quando forem exibidos ao público; códigos técnicos podem existir somente quando o schema os definir.
- Autoria, tradução, ilustração e edição são papéis diferentes. Relacione pessoas por IDs permanentes e não transforme tradutor em autor.
- Datas incompletas permanecem incompletas. Não invente dia ou mês para satisfazer um formato.

## Sinopse

`shortDescription` é a sinopse curta e factual da obra. Ela deve:

- ter redação original em português;
- identificar premissa, conflito ou argumento central sem copiar editora, loja ou Wikipédia;
- evitar julgamento, chamada de venda, spoilers desnecessários e promessas genéricas;
- respeitar o limite técnico atual de 20 a 320 caracteres;
- ser sustentada pelas fontes da obra, ainda que a redação seja própria.

Uma seção editorial mais desenvolvida pode contextualizar temas, estrutura, estilo e público, mas não deve duplicar a sinopse. O atual `audienceProfile` descreve adequação e expectativas de leitura; ele não deve ser usado como depósito de resenha.

## Avaliação editorial

A avaliação representa uma leitura editorial do site, não uma verdade objetiva nem uma média comunitária. O contrato é opcional: não invente nota nem esconda avaliação dentro de `shortDescription`, `audienceProfile`, gêneros ou temas para preencher uma ficha.

O modelo implementado distingue:

- autor ou responsável pela avaliação;
- texto crítico original;
- critérios explicitados, como proposta, execução, linguagem, impacto e adequação ao público;
- veredito curto ou recomendação de leitura;
- data da avaliação e data da última revisão;
- presença de spoilers e, quando aplicável, relação com uma edição lida;
- nota opcional somente se houver escala pública, estável e explicada.

Uma avaliação válida explica evidências e limites. Popularidade, vendas, adaptação, prêmio ou reputação não bastam como juízo de qualidade. Não escrever em primeira pessoa nem atribuir experiência de leitura ao autor do site sem informação fornecida ou aprovada por ele.

Avaliação editorial, avaliação de leitores e comentário são dados diferentes. Médias só podem ser exibidas com quantidade de votos, escala e método visíveis; sem participação suficiente, exiba ausência de avaliações em vez de uma média enganosa.

## Capas e direitos

Capas pertencem à edição ou ao volume que representam. `ReadingWork.image` só deve ser usado para uma imagem atribuível à obra como entidade, como material histórico ou reprodução em domínio público. Uma capa comercial brasileira deve permanecer em `ReadingEdition.cover` e pode ser escolhida pela interface como apresentação visual sem ser copiada para a obra.

Para cada imagem, registre:

- arquivo local estável e dimensões reais;
- texto alternativo que identifique obra e edição, sem começar por “imagem de”;
- URL da fonte;
- crédito;
- situação de direitos aceita pelo schema.

Não use busca de imagens, loja ou rede social como fonte final. Não declare `public-domain` sem fundamento. `permission-pending` permite rastrear a pendência, mas exige revisão antes de reutilização comercial. Preserve fallback útil quando não houver capa segura.

Ao adicionar capas em lotes de 20, confirme que cada arquivo corresponde à edição registrada, otimize o ativo sem distorção e teste card, biblioteca, ficha, Open Graph e mobile.

## Fontes e pesquisa

Priorize, conforme o dado:

1. autor, editora, selo, biblioteca nacional, agência de ISBN ou edição consultada;
2. instituições culturais, catálogos bibliográficos e entrevistas primárias;
3. veículos e referências secundárias confiáveis para contexto crítico.

Lojas podem confirmar uma oferta momentânea, mas não devem ser a única fonte para autoria, história editorial ou avaliação. Uma URL de fonte precisa sustentar o campo ao qual está associada. Registre datas de verificação para quantidade de volumes, situação de publicação, disponibilidade e ofertas.

## Estrutura mínima da ficha

A ficha implementada organiza capa e apresentação no início, conteúdo editorial na coluna principal e dados complementares em uma coluna secundária. Uma página publicada deve tornar encontráveis no HTML do servidor:

1. título em português quando oficial e título original;
2. autoria e identidade básica da obra;
3. capa confirmada ou fallback estável;
4. sinopse curta;
5. informações bibliográficas essenciais;
6. contexto editorial e avaliação, quando pesquisados e aprovados;
7. edição brasileira, tradução, formato e ISBN, quando confirmados;
8. relações, adaptações e artigos relevantes;
9. fontes, créditos e situação dos direitos da imagem;
10. comentários de leitores somente após o sistema ter moderação e privacidade definidas.

Não renderize seções vazias. Conteúdo essencial não pode depender de interação do cliente. A página deve funcionar com teclado, leitores de tela, títulos longos, sem capa, sem edição brasileira, sem oferta e em telas pequenas.

## Comentários

Supabase foi escolhido como persistência para preservar portabilidade por ID, moderação e apresentação própria sem incorporar publicidade de um widget externo. O navegador acessa somente `/api/comments`; a chave secreta permanece no servidor. A integração fica invisível enquanto projeto, migração e variáveis não estiverem configurados. O contrato operacional está em [`../../architecture/reading-comments.md`](../../architecture/reading-comments.md).

Requisitos mínimos:

- política de moderação e estados `pending`, `published`, `rejected` e `deleted`;
- proteção contra spam, abuso e envio repetido;
- coleta mínima de dados e política de privacidade visível;
- opção de remoção e exportação dos comentários;
- carregamento que não bloqueie o conteúdo principal nem prejudique indexação;
- comentários fora do JSON-LD editorial e sem alterar a avaliação do site;
- vínculo por ID permanente da obra, nunca apenas pela URL mutável.

Gravações administrativas permanecem no servidor, chaves `service_role` ou secretas nunca chegam ao cliente e a tabela usa RLS com grants explícitos. A ativação exige consultar a documentação vigente, aplicar a migração, executar os advisors e testar leitura, envio, moderação e limites no projeto remoto.

## Aprendizados validados nos passos 2–4

- Ausência de análise, edição ou capa deve remover a seção ou acionar um fallback útil; texto genérico repetido não substitui conteúdo.
- Rótulos em português pertencem à camada de apresentação. Os valores normalizados do schema não devem ser traduzidos dentro dos registros apenas para corrigir a interface.
- A capa comercial continua pertencendo à edição, embora a interface possa priorizar uma edição brasileira confirmada sem copiar a imagem para a obra.
- A ficha funciona melhor quando identidade, sinopse e dados essenciais aparecem juntos; ofertas, organizações e fontes são informações complementares.
- Avaliação é opcional. Sem leitura aprovada, a página exibe somente fatos e temas confirmados.
- Comentários não podem depender da URL: usam ID permanente, moderação prévia e ativação condicionada à configuração completa.
- Totais da biblioteca devem ser derivados do catálogo. Não manter números manuais nem confundir ausência de edição com indisponibilidade confirmada.
- Páginas e componentes devem consultar a fachada em `src/data/reading/`, preservando a troca futura da persistência.
- Busca pode indexar sinopse, temas e país sem criar campos duplicados; filtros continuam usando dimensões normalizadas.
- TypeScript, auditoria de conteúdo, build e inspeção do HTML estático detectam classes diferentes de problema e não se substituem.

O passo 5 ainda não foi executado. Portanto, esta versão não registra conclusões sobre auditoria SEO ampla, palavras após os lotes, páginas órfãs ou desempenho de busca.

## SEO e auditoria

Cada ficha publicada deve manter canonical natural, metadata coerente, breadcrumb, JSON-LD `Book`, sitemap e descoberta interna. Dados estruturados devem refletir apenas conteúdo visível e confirmado. Não adicionar `aggregateRating`, `review`, ISBN ou imagem ao JSON-LD antes de esses dados existirem na página e no contrato correspondente.

Para cada lote, compare antes e depois:

- palavras úteis visíveis, sem transformar a contagem em meta editorial;
- títulos, description e canonical;
- presença no sitemap, robots e busca interna;
- links internos de entrada e saída;
- dados estruturados e correspondência com o HTML;
- imagens, dimensões, texto alternativo e peso;
- conteúdo duplicado, páginas órfãs e aliases;
- experiência mobile, teclado, contraste e estabilidade de layout.

O alerta fornecido em agosto de 2026 contém 171 URLs com baixa contagem: 68 livros, 53 quadrinhos, 47 séries e três páginas de outros tipos. Portanto, o problema não é exclusivo de livros, embora eles sejam o maior grupo. A auditoria ampla pertence ao passo 5; os lotes de livros devem guardar evidências que possam ser reutilizadas nela.

## Checklist do lote

- [ ] Até 20 obras, IDs e URLs registrados.
- [ ] Slugs, canonicals e aliases preservados.
- [ ] Duplicatas pesquisadas por títulos e ISBN.
- [ ] Títulos em português são oficiais, não traduções inventadas.
- [ ] Sinopses são originais, factuais e sustentadas por fontes.
- [ ] Avaliações são editoriais, atribuídas e separadas dos fatos.
- [ ] Obra, série, volume, edição e oferta permanecem separados.
- [ ] Capas correspondem à edição ou entidade correta e têm origem, crédito e direitos.
- [ ] Campos instáveis têm data de verificação.
- [ ] Página funciona sem capa, oferta, comentários e JavaScript do cliente.
- [ ] Metadata, canonical, JSON-LD, sitemap e links internos foram conferidos.
- [ ] `npm run audit:content`, TypeScript, lint, build e `git diff --check` foram executados conforme o impacto.

## Relatório de conclusão

Ao concluir cada lote, informe: obras revisadas; URLs preservadas; títulos brasileiros corrigidos; sinopses e avaliações adicionadas; pessoas, organizações, edições e ofertas criadas ou corrigidas; capas, fontes e direitos; diferença de palavras úteis; validações executadas; divergências de schema; e pendências que não puderam ser confirmadas.

Esta diretriz deve ser revisada novamente depois do primeiro lote real, da ativação remota dos comentários e da auditoria do passo 5. Resultados ainda não medidos não devem virar regra permanente.
