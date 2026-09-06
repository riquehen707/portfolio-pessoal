# Decisões editoriais

## 2026-09-06 — Portfólio para arquitetos separa projeto demonstrativo e autoria real

`/servicos/site-para-arquitetos` apresenta projetos, serviços, perfil profissional e contato como uma base para pedidos de orçamento. A demonstração usa três fotografias licenciadas apenas para representar a interface; fonte, crédito e licença ficam acessíveis, sem atribuir autoria arquitetônica, clientes, localização ou resultados ao executor. A oferta é R$497 de implantação + R$99/mês, enquanto quantidade de projetos e páginas, revisões, atualizações, domínio, hospedagem, manutenção, prazo e cancelamento ficam para a proposta. O artigo `/blog/como-montar-um-portfolio-de-arquitetura-profissional` mantém orientação prática sobre curadoria e documentação, e seu único CTA aponta para `site-arquitetos`.

## 2026-09-06 — Portfólio para designers apresenta processo sem inventar cases

`/servicos/portfolio-para-designers` vende uma apresentação profissional de projetos, currículo e contato, em vez de resumir a oferta a criação de site. A demonstração representa identidade visual, UI/UX e web design com composições fictícias em HTML/CSS, rotuladas como exemplos; não atribui clientes, pesquisa ou resultados inexistentes. A oferta é R$297 de implantação + R$79/mês, enquanto quantidade e profundidade dos cases, revisões, atualizações, domínio, hospedagem, manutenção, prazo e cancelamento ficam para a proposta. O artigo `/blog/como-criar-um-portfolio-de-design-para-conseguir-clientes` diferencia projeto de case e orienta decisões com grau de certeza explícito; seu único CTA aponta para `portfolio-designers`.

## 2026-09-06 — Galeria para artistas separa curadoria editorial e oferta comercial

`/servicos/galeria-virtual-para-artistas` apresenta uma galeria própria para artistas visuais com doze partes: hero, dez seções intermediárias e CTA final. A demonstração usa pintura, ilustração e escultura fotografadas por terceiros apenas como exemplos licenciados de interface; não atribui autoria artística, disponibilidade ou resultados ao executor. A oferta é R$397 de implantação + R$89/mês, enquanto quantidade de obras, coleções, atualizações, domínio, hospedagem, manutenção, prazo e cancelamento ficam para a proposta. O artigo `/blog/como-criar-uma-galeria-virtual-para-divulgar-suas-obras` ensina seleção, organização, documentação visual e contato sem repetir a página comercial; seu único CTA aponta para o ID publicado `galeria-virtual-artistas`.

## 2026-09-06 — Portfólio para tatuadores mantém dez partes sem alongar a oferta

`/servicos/portfolio-para-tatuadores` usa a estrutura compacta com problema, solução, benefícios, entregáveis, demonstração, processo em três etapas, preço e FAQ entre o hero e o CTA final. A copy trata da busca manual no feed e da organização por estilos, sem prometer mais contatos ou atribuir fotografias de banco ao executor. A oferta é R$297 de implantação + R$79/mês; quantidade de trabalhos, revisões, atualizações, domínio, hospedagem, manutenção, prazo e cancelamento ficam registrados na proposta. A landing mede cliques para o WhatsApp como intenção de contato, não como lead confirmado.

## 2026-09-06 — Segunda landing reutiliza o contrato com composição imobiliária própria

`/servicos/site-para-corretores` usa a estrutura compacta com seções adicionais para corresponder às doze partes do briefing. O site é apresentado como um endereço profissional para organizar perfil, imóveis e contato, sem promessa de leads. A demonstração usa fotografias licenciadas e identidade, imóveis e dados explicitamente ilustrativos. A conversão da landing permanece no WhatsApp; o formulário é um recurso do produto demonstrado. Quantidade de imóveis, rotina de atualização, domínio, hospedagem, manutenção, prazo, tratamento dos contatos e cancelamento ficam para a proposta, pois não foram fornecidos.

## 2026-09-06 — Estrutura curta para a primeira landing de fotógrafos

O briefing solicita nove partes. `structure: "compact"` reúne público e solução nos campos obrigatórios do hero e exige problema, benefício, demonstração, recursos, processo, preço e FAQ, além do CTA final. O comportamento padrão permanece compatível. `heroVisual` e CSS escopado permitem demonstrar um portfólio real em HTML sem copiar o modelo visual de artigo. Fotografias de banco são identificadas e creditadas; cliques de orçamento no WhatsApp continuam separados de conversões confirmadas. A oferta é R$397 + R$89/mês; condições não fornecidas são detalhadas na proposta, sem inventar escopo recorrente ou prazo.

## 2026-09-06 — Landing pages têm contrato comercial próprio

Motivo:
Artigos educam e atraem; landings apresentam uma oferta específica e conduzem a uma conversão; `/servicos` mantém a visão institucional.

Decisão:
Novas landings usam `content/service-landings`, componentes próprios e a rota existente com compatibilidade para serviços legados. Publicação e indexação são estados separados. Provas precisam de evidência, recorrência deve ser explícita e cliques não equivalem a conversão. `ServiceCTA` liga artigos a IDs publicados e compartilha o limite de um CTA principal com `ArticleCTA`. O guia permanente é `docs/architecture/service-landing-pages.md`; a prévia fictícia permanece restrita ao desenvolvimento, e a primeira oferta publicada é o portfólio para fotógrafos.

## 2026-08-19 — Ideias como arquivo público versionado

Motivo:
Registrar propostas e experimentos com contexto e continuidade, sem transformar a experiência pública em um quadro operacional ou apagar versões anteriores.

Substituição:
A área `/ideias` usa registros locais validados por Zod, ID permanente independente do slug e uma fachada assíncrona preparada para outra fonte de dados. `status` descreve a evolução da ideia; `publicationStatus` controla sua exposição pública. Mudanças relevantes entram como novos itens em `updates`, preservados em ordem histórica e exibidos do mais recente para o mais antigo.

## 2026-08-20 — Visibilidade não substitui armazenamento privado

Motivo:
Permitir que o domínio reconheça ideias privadas sem expor vantagem competitiva em um repositório versionado, no bundle ou em superfícies públicas.

Substituição:
`visibility` passa a distinguir registros `public` e `private`, mas o catálogo local aceita como prática editorial somente conteúdo público. Ideias privadas só serão cadastradas em uma fonte segura futura, consultada no servidor. Rota, busca, sitemap e JSON-LD usam exclusivamente registros que sejam ao mesmo tempo públicos e publicados.

## 2026-08-20 — Tipos e estágios organizam sem virar dashboard

Motivo:
O arquivo passou a reunir pensamentos, projetos implementados, experimentos, negócios e pesquisas em estágios diferentes.

Substituição:
`type` usa o vocabulário `idea`, `project`, `experiment`, `business` e `research`; relações continuam normalizadas por IDs permanentes em `relatedIdeaIds`. O índice agrupa registros por estágio editorial — em desenvolvimento, explorando, no papel e outros caminhos — dentro dos filtros existentes, sem métricas operacionais, kanban ou narrativa obrigatória de sucesso.

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

## 2026-09-02 — Produtos, variantes e ofertas são entidades separadas

Motivo:
Um produto precisa ser reutilizado em várias recomendações sem transformar preço, estoque, link afiliado ou especificações de outra variante em características permanentes do modelo.

Substituição:
O acervo usa `Product` para a entidade editorial, `ProductVariant` para versões e especificações verificadas e `ProductOffer` para observações comerciais datadas. Artigos referenciam o ID permanente por `ProductCard` e mantêm somente a justificativa contextual. A Amazon é um varejista possível, não a identidade do catálogo.
