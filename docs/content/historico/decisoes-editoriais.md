# Decisões editoriais

## 2026-08-19 — Ideias como arquivo público versionado

Motivo:
Registrar propostas e experimentos com contexto e continuidade, sem transformar a experiência pública em um quadro operacional ou apagar versões anteriores.

Substituição:
A área `/ideias` usa registros locais validados por Zod, ID permanente independente do slug e uma fachada assíncrona preparada para outra fonte de dados. `status` descreve a evolução da ideia; `publicationStatus` controla sua exposição pública. Mudanças relevantes entram como novos itens em `updates`, preservados em ordem histórica e exibidos do mais recente para o mais antigo.

Registre somente decisões permanentes do sistema, com motivo e substituição. Não registrar preferências temporárias de uma pauta.

## 2026-08-18 — Listas e fichas de filmes têm diretrizes distintas

Motivo:
Listas guardam seleção, posição e justificativa contextual, enquanto fichas permanentes precisam disciplinar identidade, sinopse, editorial, relações, pôster, fontes, SEO e publicação. Um único guia tornava os dois fluxos ambíguos.

Substituição:
Manter `movie-list.md` para listas e curadorias e usar `movie-profile.md` para `/filmes/[slug]`. Os dois fluxos compartilham o catálogo central e IDs permanentes, mas não duplicam seus dados nem seus critérios editoriais.

## 2026-08-18 — Comentários de livros mediados pelo servidor

Motivo:
Comentários precisam permanecer portáveis por ID da obra, moderáveis e independentes de publicidade ou rastreamento de widgets externos, sem expor privilégios do banco no navegador.

Substituição:
Usar Supabase somente como persistência e `/api/comments` como superfície pública. Envios entram como `pending`; apenas `published` é exibido. A tabela não concede acesso aos papéis cliente, a chave secreta fica no servidor e o sistema só aparece depois da configuração completa. Moderação segue `docs/architecture/reading-comments.md`.

## 2026-08-18 — Fichas permanentes de livros em lotes verificáveis

Motivo:
As páginas de livros publicadas precisam evoluir de fichas bibliográficas muito curtas para referências úteis, sem preencher contagem de palavras artificialmente nem misturar obra, edição, oferta, avaliação editorial e participação de leitores.

Substituição:
Revisar até 20 obras por lote conforme `docs/editorial/templates/reading-work-profile.md`, preservando URLs e o catálogo normalizado. Sinopse factual, avaliação editorial e futuros comentários de leitores permanecem conceitos distintos; capas comerciais pertencem à edição que representam. A diretriz será revista depois dos lotes e da auditoria, antes de seus aprendizados experimentais virarem regras permanentes.

## 2026-08-13 — Acervo central de obras de leitura

Livros, mangás, manhwas, manhuas, webtoons, graphic novels, quadrinhos e light novels usam uma base compartilhada, mas preservam o formato próprio. Obra intelectual, série, volume, edição e oferta são entidades separadas; ISBN, páginas, editora, tradução, capa comercial e disponibilidade pertencem à edição. Listas e MDX referenciam obras por ID. A infraestrutura nasceu vazia e sem rotas públicas para que o primeiro lote real valide o contrato antes de qualquer publicação.

## 2026-07-16 — Índice manual descontinuado

Motivo:
Duplica o índice automático e aumenta manutenção.

Substituição:
Índice automático lateral no desktop e recolhível após `QuickSummary` no mobile.

## 2026-07-16 — HoverNote descontinuado

Motivo:
Não oferece interação previsível em dispositivos de toque.

Substituição:
`Definition`, nota no texto, glossário por toque ou `Reveal`.

## 2026-07-16 — Sistema único de citações

Motivo:
Dois componentes de citação criavam escolha sem função editorial distinta.

Substituição:
`Quote`, com `emphasis` quando houver necessidade real de destaque.

## 2026-07-16 — Sistema único de conteúdo recolhível

Motivo:
`Collapsible` e `Reveal` cumpriam funções semelhantes.

Substituição:
`Reveal`, incluindo a variante `simple`.

## 2026-07-16 — Diagnóstico unificado

Motivo:
`Diagnostic` e `DiagnosticQuestions` representavam variações do mesmo bloco.

Substituição:
`Diagnostic`, aceitando perguntas simples ou pares de rótulo e valor.

## 2026-07-16 — Componentes genéricos não são expostos no MDX

Motivo:
Combinações livres de layout comprometem consistência e dificultam manutenção mobile.

Substituição:
Componentes editoriais com função e limites definidos.

## 2026-07-16 — Gráficos MDX usam APIs simples

Motivo:
Recharts direto no conteúdo é complexo, verboso e fácil de quebrar.

Substituição:
`SimpleBarChart` e `SimpleLineChart`.

## 2026-07-16 — Limite de quatro tipos de bloco

Motivo:
Preservar identidade, ritmo e simplicidade de produção.

Substituição:
Escolher no máximo quatro tipos de bloco editorial por artigo, além de imagens, `QuickSummary`, `NextSection` e `NextSteps`.

## 2026-07-17 — Destaques são uma seleção curta

Motivo:
Quando muitos artigos usam `featured`, o campo deixa de comunicar prioridade e as superfícies editoriais perdem hierarquia.

Substituição:
Usar `featured` principalmente para hubs e entradas estratégicas, preferindo um por coleção de segmento. `featuredHome` é um subconjunto de `featured`, e a seleção deve ser revista quando ultrapassar 25% do acervo.

## 2026-07-29 — Descoberta pública simplificada antes de Books

Motivo:
Séries manuais, trilhas, mapa e categorias de entrada heurísticas criavam caminhos concorrentes, contagens sem relação confiável com o acervo e resultados pouco previsíveis.

Substituição:
A navegação pública prioriza início, blog, artigos e busca. As coleções físicas e as rotas de Temas, trilhas, mapa e categorias de entrada ficam preservadas como infraestrutura interna, mas ocultas da navegação, busca e sitemap para análise ou migração futura, sem definir a arquitetura de Books.

## 2026-07-30 — Biblioteca de SEO como piloto editorial

Motivo:
Criar uma entrada temática capaz de orientar o estudo de SEO sem reduzir a experiência a uma lista cronológica de artigos nem antecipar uma arquitetura geral de Books ainda não implementada.

Substituição:
A rota `/blog/seo` apresenta três livros planejados — Entender a busca, Construir relevância e Medir e desenvolver — além das futuras áreas Guia prático, Carreira em SEO e Mais sobre SEO. Enquanto capítulos e rotas próprias não existirem, os livros permanecem identificados como planejamento e não recebem links fictícios. Este piloto não altera schema, frontmatter, pastas MDX ou a taxonomia permanente do acervo.

## 2026-07-30 — Sumário piloto do Livro 1

Motivo:
Testar a experiência de uma obra progressiva antes de criar um sistema genérico de Books ou alterar os artigos existentes.

Substituição:
A rota `/blog/seo/entender-a-busca` funciona como apresentação e sumário do Livro 1. Seus sete capítulos fundamentais permanecem explicitamente planejados e sem links. Os dois guias existentes de SEO local aparecem somente como leituras complementares, preservando arquivos e URLs. A estrutura do piloto vive em dados locais da Biblioteca de SEO e ainda não define schema, frontmatter ou modelo obrigatório para futuros Books.

## 2026-08-08 — Demonstrações controladas de princípios visuais

Motivo:
Comparações de hierarquia, alinhamento, proximidade e contraste precisam isolar variáveis, adaptar-se ao modo escuro e permanecer legíveis sem imagens externas protegidas.

Substituição:
Usar `VisualPrinciplesDemo` somente nas variantes fechadas documentadas. O componente é estático, utiliza HTML semântico e tokens do site e não deve virar uma API genérica para composições livres dentro do MDX.
