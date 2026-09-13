# Decisões editoriais

## 2026-09-13 — Publicação demonstrativa “Imóveis em destaque”

`/servicos/inspiracoes/imoveis-em-destaque` passa a aprofundar a referência imobiliária como uma publicação editorial própria, preservando o slug, a fonte única `service-inspirations.ts` e o CTA contextual. O campo opcional `publication` seleciona essa composição sem reintroduzir `ServiceExamplesPreview`, `getPublishedServiceExamples` ou o catálogo legado na experiência de `/servicos`.

A sequência reconstrói em componentes reais a jornada `primeira impressão → exploração → decisão → contato`: home e destaques, busca, filtros funcionais, cards com favoritos locais, detalhe com galeria selecionável, preço, características e formulário demonstrativo. As ações internas de agendamento e WhatsApp levam ao contato simulado, que declara não enviar nem armazenar dados; somente o CTA final abre o contato comercial real do Henrique. Imóveis, preços, localização e marca são fictícios e as quatro fotografias foram geradas para esta demonstração, com origem, texto alternativo e dimensões registrados no módulo de dados local.

A composição desktop segue a alternância, as proporções, o espaço negativo e o acabamento da referência anexada. No mobile, cada etapa antecede seu mockup, filtros e cards passam a uma coluna e o documento não possui overflow horizontal. A revisão foi executada localmente, sem commit ou deploy.

## 2026-09-13 — Padrão permanente para demonstrações guiadas por imagem

O guia autoritativo `docs/architecture/service-landing-pages.md` passa a concentrar também o processo de criação de publicações demonstrativas a partir de uma imagem de referência. Não foi criado outro manual: modelos, previews, ficção, confiança, rotas e publicação já pertenciam ao guia de serviços, e a nova seção complementa essas regras sem duplicar a diretriz global de linguagem.

A referência visual orienta composição, proporções, hierarquia, ritmo, tipografia, densidade e tratamento dos componentes. A implementação deve decompor a imagem e reconstruir a interface em HTML, CSS e React, preservando a intenção em desktop e adaptando a mesma hierarquia ao mobile. Artefatos da imagem não são copiados; melhorias só se justificam por legibilidade, acessibilidade, responsividade, consistência ou funcionamento.

Cada demonstração representa uma jornada adequada ao segmento, usa conteúdo plausível e identificado, distingue a publicação de Henrique do negócio fictício e comprova capacidade pelo produto funcionando, sem inventar cliente, resultado ou conclusão de formulário, reserva ou compra. O processo exige análise anterior ao código, comparação visual renderizada e correção por estrutura, espaçamento, escala, tipografia, alinhamento, contraste e acabamento. A frase de ativação para tarefas futuras foi registrada no próprio guia. Revisão somente documental, sem mudança de rota, schema, componente, estado de publicação, commit ou deploy.

## 2026-09-10 — Oferta mensal única e nova direção visual de `/servicos`

`/servicos` passa a vender uma única oferta: site profissional completo por R$147/mês, sem taxa de implementação. Domínio, hospedagem, manutenção, suporte, design, desenvolvimento, publicação, preparação técnica para SEO e pequenos ajustes recorrentes pertencem ao mesmo plano. A condição anterior de criação por R$397, promoção por R$200 e mensalidade de R$89,90 deixa de orientar a home; páginas, sistemas, integrações e alterações maiores continuam dependendo de escopo próprio.

O hero usa o projeto próprio `henrique.dog` como material real em mockups de desktop e mobile, com somente dois callouts. A página alterna áreas abertas, uma faixa escura de percepção, galeria horizontal de exemplos demonstrativos, respiro editorial, quatro pilares técnicos, relato pessoal atribuído a Henrique Reis, processo em três etapas, FAQ fechado por padrão e CTA final escuro. A auditoria de copy removeu a comparação de formatos, a grade de seis recursos e as repetições da lista do plano.

Permanecem dependentes de definição comercial: prazo de fidelidade, aviso prévio, regra de transferência do domínio e dos arquivos no cancelamento, prazo de entrega e limite exato dos pequenos ajustes. A interface não inventa esses números ou condições. Implementação local, sem commit ou deploy.

## 2026-09-09 — Separação entre oferta, exemplos, capacidades e portfólio

A área de Serviços passa a ter três superfícies com responsabilidades distintas. `/servicos` permanece como home comercial: apresenta uma oferta comum, valores inicial e recorrente, escopo mensal, três exemplos, seis recursos resumidos, processo, quatro dúvidas e contato. O explorador de recursos, os seletores técnicos e as explicações extensas foram removidos dessa rota para proteger a decisão de contratação.

`/servicos/exemplos` concentra a galeria dos três projetos demonstrativos existentes e o filtro por tipo de solução. Nenhum cliente, case ou resultado foi acrescentado. Os detalhes continuam em `/servicos/exemplos/[slug]`, identificados como ficção. `/work` segue como URL canônica do portfólio real e editorial; `/portfolio` permanece apenas como redirecionamento permanente, preservando a arquitetura e URLs já publicadas.

`/servicos/capacidades` recebe a demonstração técnica: seis recursos funcionais, seis recursos secundários, quatro módulos com estados e oito wireframes selecionáveis. Os previews são componentes locais, sem iframe ou dependência nova; formulário, WhatsApp, mapa e agendamento não enviam dados nem concluem ações. A linguagem visual usa containers, tabs, listas, estados, moldura de produto e preview mobile sem copiar uma interface de aplicativo específica.

A navegação compartilhada `ServicesAreaNav` explicita Oferta, Exemplos, Capacidades e Portfólio real. A auditoria de copy removeu da home a repetição entre hero, preço completo, formatos e laboratório; a condição comercial permanece no hero e as inclusões ficam em um único bloco. Continuam pendentes definição de domínio, prazo fixo, limite exato de pequenas atualizações e regras de cancelamento/fidelidade. Implementação local, sem commit ou deploy.

## 2026-09-09 — Hub visual e explorador de recursos em `/servicos`

`/servicos` passa a priorizar criação de sites como uma oferta única: o hero reúne mensagem, valores inicial e recorrente, CTAs e recortes das três demos publicadas. A sequência agora é oferta, exemplos, recursos, formatos, preço completo, processo, FAQ e contato. O seletor genérico por necessidade e o preview abstrato do hero foram removidos; SEO e automação não aparecem como ofertas paralelas.

Os exemplos são filtrados por tipo de solução — institucional, portfólio ou negócio local — e combinam capturas desktop e mobile da própria demo. A profissão permanece como metadado. Seis recursos recebem previews locais e interativos: WhatsApp, formulário, portfólio/galeria, serviços/preços, localização/mapa e agendamento. Nenhuma interação abre aplicativo, envia dados ou reserva horário. Cada vínculo entre recurso e demo é declarado em `src/data/service-hub/index.ts`; não há iframe nem carregamento das páginas completas.

Formatos usam um único painel com tabs e não recebem preços próprios. Recursos menos visuais — horários, redes sociais, FAQ, SEO básico, blog/conteúdo e catálogo — ficam em uma lista secundária expansível. No mobile, filtros, exemplos, recursos, formatos e processo adotam trilhos nativos somente onde preservam tamanho de toque e legibilidade. Domínio incluído, prazo, limite exato das pequenas atualizações e regras de cancelamento/fidelidade continuam pendentes de definição. A implementação permanece local, sem commit ou deploy.

## 2026-09-09 — Revisão funcional das três demos de Serviços

As demos publicadas foram auditadas como produtos independentes, removendo blocos que funcionavam como apresentação conceitual ou preenchimento. Psicologia passa a priorizar modalidade, duração e primeiro contato; temas de procura usam seleção contextual, o perfil profissional fica separado da explicação do atendimento e o CTA final duplicado foi removido. Arquitetura remove a galeria genérica de “imagens de referência”, mantém projetos como entrada principal e adiciona navegação anterior/próximo nas páginas internas. Barbearia move o agendamento para depois dos preços e liga a seleção de serviço ao resumo de duração e valor; o bloco manifesto foi removido e contato, equipe e localização foram reduzidos a informações operacionais.

O hub passa a apresentar segmento, descrição curta e três capacidades concretas de cada exemplo, sem resumir o card por quantidade abstrata de recursos. O schema exige de duas a quatro capacidades principais. A barra compartilhada usa “Voltar para Serviços”; direção visual, navegação e componentes funcionais permanecem próprios de cada marca fictícia. Nenhuma nova demo foi criada e todas continuam `noindex`.

## 2026-09-09 — Exemplos demonstrativos de Arquitetura e Barbearia

`/servicos/exemplos/arquitetura` publica “Plano Bruto 17”, estúdio fictício com composição editorial assimétrica, tipografia condensada, preto mineral, branco quente e acento ácido. Três estudos fictícios recebem filtros por categoria e páginas internas reutilizáveis em `/servicos/exemplos/arquitetura/projetos/[project]`. Fotografias já licenciadas do acervo são apresentadas como imagens de banco; nenhuma representa obra, cliente, endereço ou autoria do estúdio demonstrativo.

`/servicos/exemplos/barbearia` publica “Traço 84”, negócio fictício com linguagem urbana em azul elétrico, coral e creme. A estrutura combina serviços e preços em lista selecionável, mosaico fotográfico, equipe ilustrativa, mapa desenhado, endereço e horários demonstrativos, contatos e um fluxo curto de agendamento que não envia dados nem reserva horários. Fotografias licenciadas do Unsplash são creditadas e identificadas como banco de imagens, sem relação com clientes, equipe ou trabalhos da marca.

As direções de arte não compartilham grid, tipografia, paleta, navegação ou padrão de CTA com a demo de Psicologia. Apenas o catálogo, a resolução por renderer, a rota dinâmica e a barra final de autoria são comuns. Seis recursos do hub passam a oferecer “Veja este recurso em funcionamento” apontando para trechos da demo de Barbearia. Como o negócio é fictício, foi usado JSON-LD `WebPage`, não `LocalBusiness`: dados estruturados de endereço e funcionamento só devem ser publicados quando verificáveis. As três demos permanecem `noindex`; esta implementação é local, sem commit ou deploy.

## 2026-09-08 — Primeiro exemplo demonstrativo em Psicologia

`/servicos/exemplos/psicologia` inaugura o catálogo demonstrativo com uma composição institucional própria para Psicologia. “Elisa Veral” é uma identidade fictícia e aparece como tal no header, no registro demonstrativo e no rodapé; não há cliente, depoimento, resultado clínico, agenda, endereço ou política comercial atribuídos como reais. A abordagem cognitivo-comportamental e a duração aproximada aparecem explicitamente como conteúdo ilustrativo a substituir pelos dados da profissional.

A direção visual usa Georgia, Arial, verde profundo, argila e papel claro em tokens restritos ao módulo da demo. A composição editorial, assimétrica e sem clichês gráficos de saúde mental não altera tokens globais nem herda a identidade amarela do catálogo de Serviços. A fotografia ambiental já licenciada de Seongjin Park foi reaproveitada com crédito e contexto de imagem de banco; não retrata uma psicóloga fictícia. O preview do card é uma captura da própria rota, não um mock separado.

O exemplo demonstra navegação responsiva, Sobre, áreas de acompanhamento, modalidades, sequência do primeiro contato, FAQ nativo, formulário, botão de WhatsApp simulado, redes sociais identificadas como exemplos, metadata e JSON-LD `WebPage`. O formulário não envia nem armazena dados e orienta a não incluir informações de saúde. A página permanece `noindex`; a camada comum ao final identifica “Projeto demonstrativo”, oferece retorno a Serviços e mantém o CTA comercial fora da experiência principal.

Auditoria de copy: foram evitadas promessas de cura, resultados, slogans motivacionais e regras clínicas ou comerciais não fornecidas. Repetições de contato foram mantidas apenas como navegação funcional no hero, seção de contato e encerramento. Arquivos principais: `src/components/services/examples/psychology/`, `src/content/service-examples/serviceExamples.ts`, `ServiceExampleRenderers.tsx`, `public/images/services/examples/psicologia-elisa-veral.webp` e `scripts/test-service-landings.mjs`. Implementação e validação locais, sem commit ou deploy.

## 2026-09-08 — Serviços organizados por necessidade e formato

`/servicos` deixa de apresentar cada profissão como produto com preço próprio. A página passa a começar pela oferta comum e pelo objetivo do visitante, relacionando seis necessidades a quatro formatos: site profissional/institucional, portfólio, landing page e projeto personalizado. Os doze recursos mostram estados de incluído, disponível ou adicional; profissões aparecem somente como exemplos de público nos formatos ou em demonstrações explicitamente identificadas.

A oferta comum concentra preço em um único bloco: R$ 397 como valor padrão de criação/configuração, R$ 200 durante setembro e R$ 89,90/mês para hospedagem, manutenção técnica, suporte e pequenas atualizações. Novas páginas, funcionalidades especiais, sistemas, catálogos complexos e integrações são identificados como projetos personalizados, sem preço adicional inventado.

O desenho preserva fundo claro, tipografia do site, amarelo de destaque, bordas simples e previews locais nos cards de formato. O hero ganhou uma composição editorial curta em duas colunas; a condição comercial vem logo depois, formatos usam grade larga e recursos usam lista expansível de alto contraste. O seletor usa `aria-pressed`, detalhes usam `details/summary`, foco e estados selecionados são visíveis e nenhuma informação essencial depende da interação.

Auditoria de copy: títulos genéricos e a instrução para comparar serviços/preços foram substituídos pela entrega concreta. Foram removidos os doze cards de ofertas profissionais e seus preços divergentes. A repetição do CTA foi mantida apenas no hero e no encerramento, com o mesmo rótulo e destino. Domínio, prazo fixo, limite exato das pequenas atualizações e regras de cancelamento/fidelidade continuam pendentes de definição e são assumidos como itens da proposta, sem promessa inventada.

A seção “Veja exemplos de sites que posso criar” recebe um catálogo independente e inicialmente vazio. A rota `/servicos/exemplos/[slug]` só é gerada para um registro publicado com preview, recursos e renderer próprios. Cada demonstração pode ter identidade integralmente diferente e recebe apenas uma camada comum, discreta, com a identificação “Projeto demonstrativo criado por Henrique Reis”, retorno ao serviço e CTA “Quero um site como este”. Os conceitos legados de `/modelos`, atualmente pausados, não foram reaproveitados como projetos prontos.

Arquivos principais: `src/app/servicos/page.tsx`, `src/data/service-hub/index.ts`, `src/components/services/hub/ServiceHubView.tsx`, `ServiceHubExperience.tsx` e seus módulos de estilo. A arquitetura futura fica em `src/content/service-examples/`, `src/data/service-examples/`, `src/components/services/examples/` e `src/app/servicos/exemplos/[slug]/`. O contrato e os testes foram atualizados; o schema e os componentes do catálogo anterior foram removidos por ficarem sem consumidores. A implementação é local e não inclui commit, publicação ou deploy.

## 2026-09-08 — Perfil profissional curto em `/sobre`

`/sobre` torna-se a rota canônica do perfil profissional e `/about` passa a redirecionar permanentemente para ela, sem permanecer no sitemap. A página anterior misturava apresentação profissional, ferramentas, história do blog e uma autobiografia longa. A nova composição apresenta função, áreas de atuação, processo, evidências publicadas, perfil breve e três próximos passos: serviços, portfólio e contato.

Foram removidos idade, moradia, luto, saúde, dívidas e a narrativa extensa de origem do blog porque não ajudam a avaliar ou contratar o trabalho neste contexto. Permanecem o estudo de Física, o trabalho independente desde 2023 e o acervo editorial, já registrados nas fontes do projeto. Nenhum cliente, resultado, formação concluída ou número foi inventado. O avatar disponível é uma ilustração e passou a ser identificado assim.

As provas apontam para o case do próprio site, o portfólio e as ofertas publicadas. O resumo de tecnologias explica onde elas entram, sem transformar ferramenta em benefício automático. A arquitetura centraliza o contrato da página; linguagem e conversão continuam subordinadas às fontes globais existentes.

Arquivos alterados: `src/app/about/page.tsx`, `page.module.scss`, `src/app/sobre/page.tsx`, `next.config.mjs`, `src/resources/content.tsx`, `once-ui.config.ts`, `content-strategy.ts`, `ecosystem.ts`, `src/components/Header.tsx`, `docs/architecture/site-architecture.md` e este histórico. A implementação é local e não inclui publicação.

## 2026-09-07 — Implementação do catálogo e do portfólio

`/servicos` passa a apresentar hero curto, navegação por necessidade, cards com benefícios concretos, mensalidade e implantação separadas quando previstas na oferta. Os preços legados permanecem “a partir de”, sem recorrência inventada. No mobile, trilhos nativos com snap mostram parte do próximo card; no desktop, uma grade permite comparar os serviços. As seis ofertas visuais usam capturas dos componentes implementados, identificadas como exemplos. O header compartilhado das landings agora permite voltar à home e ao catálogo.

O portfólio mantém `/work` como canonical e acrescenta `/portfolio` como redirecionamento permanente. A pasta de cases estava vazia; o feed anterior continha registros genéricos de processo. A página passa a mostrar o próprio site e dois estudos implementados — galeria de artistas e site para corretor — com contexto, solução, imagem real da interface, estado e serviço relacionado. A informação fornecida pelo autor foi que cria sites para profissionais de diferentes áreas; não foram fornecidos clientes, URLs de entregas ou resultados comerciais para novos cases. Os estudos não são apresentados como clientes nem demos funcionais. Três registros não justificam filtros.

O campo opcional `project` no frontmatter preserva a compatibilidade dos artigos existentes. `project.serviceSlug` resolve exclusivamente ofertas publicadas; uma referência inexistente falha. A semântica dos cases fica na arquitetura, com remissão na taxonomia, sem uma nova diretriz paralela de linguagem ou conversão.

Auditoria de copy: cortados o slogan longo do hub, benefícios extensos dos cards, as repetições de tecnologias convertidas automaticamente em supostos resultados e o feed de bastidores. O rótulo redundante “Estudo de interface · Estudo” foi reduzido. Permanecem o CTA de contato com rótulo estável e a identificação de exemplos em card e case, necessária para distinguir ilustração de entrega. Não há métricas, depoimentos ou projetos de clientes inventados.

### Arquivos da implementação

- Catálogo: `src/data/service-hub/index.ts`, `src/content/service-hub/serviceHubCardSchema.ts`, `src/components/services/hub/ServiceHubView.tsx`, `ServiceHubView.module.scss`, `ServiceCard.tsx`, `ServiceCard.module.scss` e `ServiceGroupCarousel.module.scss`.
- Retorno das landings: `src/components/services/landing/ServiceLandingPage.tsx` e `ServiceLanding.module.scss`.
- Portfólio: `src/app/work/page.tsx`, `work.module.scss`, `projectData.ts`, `[slug]/page.tsx`, `[slug]/page.module.scss`, `src/components/ProjectCard.tsx`, `ProjectCard.module.scss` e `src/components/work/Projects.tsx`.
- Cases novos: `src/app/work/projects/henrique-dog.mdx`, `galeria-virtual-estudo.mdx` e `site-corretor-estudo.mdx`.
- Dados, navegação e contrato: `next.config.mjs`, `src/components/blog/postSchema.ts`, `src/utils/utils.ts`, `src/resources/content.tsx`, `content-strategy.ts` e `ecosystem.ts`.
- Capturas novas: sete WebP em `public/images/work/`, do site e das seis interfaces de serviços; previews padronizados sem apresentar fotos de banco isoladas como o produto.
- Validação: `scripts/test-service-landings.mjs` também verifica separação de custos, navegação de retorno e vínculo dos cases com ofertas publicadas.
- Documentação: `docs/architecture/site-architecture.md`, `service-landing-pages.md`, `docs/content/02-arquitetura/taxonomia.md` e este histórico.
- Removidos: `src/app/work/feedData.ts`, `src/components/work/WorkFeed.tsx` e `WorkFeed.module.scss`, sem consumidores após a substituição pelo portfólio.

As regras permanecem consolidadas nas fontes globais. O catálogo e o retorno do header deixam de ser pendências; seleção funcional de modelos e revisão integral das landings legadas continuam identificadas no guia comercial. Esta implementação é local e não inclui commit ou deploy.

## 2026-09-07 — Revisão final e checklist comercial único

A revisão final preserva as consolidações anteriores e distribui a autoridade entre arquitetura global, linguagem, experiência comercial, estrutura MDX e medição. O [checklist de serviços](../../architecture/service-landing-pages.md#checklist-de-catálogo-e-landing-antes-da-publicação) foi reorganizado nas oito categorias de navegação, compreensão, copy, produto, conversão, risco, design e técnico, com evidências e estados explícitos. O mesmo guia registra a ordem de correção solicitada; ela não dispensa validações técnicas.

O critério de função foi centralizado na arquitetura do site e referenciado pelos guias de linguagem e componentes. Não se acrescenta conteúdo para parecer completo. O checklist verifica as regras proprietárias sem criar outra cópia normativa. Deslocamentos de layout e performance passam a ter protocolo de observação, comparação e registro no documento de medição existente.

Redundâncias removidas: `limites-dos-artigos.md`, cujas orientações já constam em estrutura, componentes, pesquisa e taxonomia; avisos extensos repetidos nas etapas históricas; cópia de medidas visuais/breakpoints no guia comercial; lista repetida das seis URLs; lista paralela de aprovação de copy; relatos de validação misturados às regras atuais. O guia antigo divergia ao sugerir resumos/próximos passos como sequência fixa e ao tratar `KeyTakeaway` como uso estritamente único; prevalecem as regras condicionais dos guias ativos. Nenhum contrato ou artigo foi alterado.

A imagem ausente no README foi removida e o moodboard ausente foi identificado como referência histórica indisponível. A etapa 11 passou a descrever caminhos de contato sem chamá-los de conversões confirmadas. As validações de 2026-09-06 foram transferidas do guia comercial para o registro abaixo, preservando suas evidências e limitações.

O fluxo de criação passou a remeter aos limites de estrutura e componentes. Corrigida a contagem contraditória de respostas de `ProductCard` para sete, conforme o componente; o exemplo de gráfico foi identificado como fictício em vez de sugerir um relatório interno real.

Não foram identificados conflitos normativos pendentes no recorte revisado. Permanecem diferenças entre o padrão desejado e a implementação, registradas em `Adoção e pendências` do guia de serviços: retorno no header, ação secundária, seleção de modelos/demos, relacionados e revisão visual/mobile. Elas não foram resolvidas por esta revisão documental, que não inclui commit, deploy ou certificação de produção.

### Arquivos desta revisão final

27 arquivos atualizados, preservando as alterações das revisões anteriores:

- [AGENTS.md](../../../AGENTS.md)
- [README.md](../../../README.md)
- [docs/architecture/service-landing-pages.md](../../architecture/service-landing-pages.md)
- [docs/architecture/site-architecture.md](../../architecture/site-architecture.md)
- [docs/audits/search-and-web-vitals-measurement.md](../../audits/search-and-web-vitals-measurement.md)
- [docs/brand/etapa-1-foundation.md](../../brand/etapa-1-foundation.md)
- [docs/content/01-fundamentos/voz-e-estilo.md](../01-fundamentos/voz-e-estilo.md)
- [docs/content/03-producao/fluxo-de-criacao.md](../03-producao/fluxo-de-criacao.md)
- [docs/content/04-formatacao/componentes-mdx.md](../04-formatacao/componentes-mdx.md)
- [docs/content/04-formatacao/estrutura-dos-artigos.md](../04-formatacao/estrutura-dos-artigos.md)
- [docs/content/06-validacao/checklist-editorial.md](../06-validacao/checklist-editorial.md)
- [docs/content/README.md](../README.md)
- [docs/content/etapa-2-content-architecture.md](../etapa-2-content-architecture.md)
- [docs/content/historico/decisoes-editoriais.md](decisoes-editoriais.md)
- [docs/design/etapa-10-about-teaser-humanization.md](../../design/etapa-10-about-teaser-humanization.md)
- [docs/design/etapa-11-final-cta-lead-capture.md](../../design/etapa-11-final-cta-lead-capture.md)
- [docs/design/etapa-12-motion-system-framer.md](../../design/etapa-12-motion-system-framer.md)
- [docs/design/etapa-13-scss-architecture-polish.md](../../design/etapa-13-scss-architecture-polish.md)
- [docs/design/etapa-3-design-system.md](../../design/etapa-3-design-system.md)
- [docs/design/etapa-4-home-refactor.md](../../design/etapa-4-home-refactor.md)
- [docs/design/etapa-5-hero-premium.md](../../design/etapa-5-hero-premium.md)
- [docs/design/etapa-6-marquee-trust-tech-strip.md](../../design/etapa-6-marquee-trust-tech-strip.md)
- [docs/design/etapa-7-markets-horizontal.md](../../design/etapa-7-markets-horizontal.md)
- [docs/design/etapa-8-works-premium-dynamic.md](../../design/etapa-8-works-premium-dynamic.md)
- [docs/design/etapa-9-blog-authority-seo.md](../../design/etapa-9-blog-authority-seo.md)
- [docs/editorial/templates/product-recommendation.md](../../editorial/templates/product-recommendation.md)
- [docs/launch/etapa-14-performance-seo-analytics-launch.md](../../launch/etapa-14-performance-seo-analytics-launch.md)

Removido por redundância: `docs/content/limites-dos-artigos.md`.

## 2026-09-07 — Serviços visuais apresentados como produtos concretos

O inventário encontrou as regras de preview, demonstração, preço, prova e FAQ no guia de serviços; orientações antigas de confiança e projetos nas etapas 6, 8 e 10 de design; e um contrato separado para produtos editoriais. O padrão foi incorporado ao [guia de serviços](../../architecture/service-landing-pages.md#serviços-apresentados-como-produtos), preservando a fonte global de linguagem e sem criar outro manual ou catálogo.

Foram definidos resumo da oferta, seleção ideal de 3–5 modelos quando pertinente, distinção entre captura/protótipo/demo funcional, previews de vistas relevantes, personalização com limites reais, bloco `Antes de contratar`, confiança verificável e no máximo três alternativas relacionadas. Quantidades e rótulos de estilo são referências de apresentação, não autorização para inventar modelos, qualidade, recursos ou condições. O exemplo de R$249/mês é fictício e não substitui preços cadastrados.

O checklist comercial e os pontos de entrada foram atualizados. A linguagem global remete ao padrão visual, os documentos históricos distinguem aparência de evidência e o guia de produtos esclarece que modelos de serviços não são variantes do acervo editorial.

A consulta ao código confirmou que `demonstration` não tem lista de modelos nem URL de demo, que `/modelos` permanece pausada e que não existe bloco próprio de serviços relacionados no template. `Antes de contratar` pode reutilizar `faq`/`ServiceFAQ` pelo título, sem outro componente. Essas diferenças estão registradas como estado técnico e pendências; a revisão não implementa seletores, demos, campos ou condições comerciais.

Alterações restritas a documentação, preservando as consolidações anteriores, IDs, URLs e ofertas. Não houve commit, deploy ou confirmação de produção nesta revisão.

## 2026-09-07 — Linguagem global com auditoria obrigatória

Inventário: `01-fundamentos/voz-e-estilo.md` e `padrao-editorial-portugues.md` repetiam voz, vocabulário e assinatura; o guia de serviços mantinha copy própria; estrutura, fluxo, checklist e modelo de relatório tratavam a revisão de forma separada. As etapas antigas de marca, copy e Home continham slogans aprovados no contexto original. Templates editoriais foram revisados quanto a regras locais de linguagem, preservando seus contratos de conteúdo e dados.

A [diretriz global de linguagem](../01-fundamentos/voz-e-estilo.md) passa a ser a fonte única para artigos, páginas institucionais, serviços, cards, landing pages e UX writing. `padrao-editorial-portugues.md` foi absorvido e removido; os padrões abstratos daquele arquivo não viraram exemplos recomendados. O caminho de `voz-e-estilo.md` foi preservado para manter as referências existentes.

Foram centralizados concretude, teste de genericidade, headlines identificáveis, função de seção, copy de decisão, densidade e auditoria obrigatória após a escrita. Fluxo de criação, checklists editorial/comercial e relatório passaram a exigir e registrar essa auditoria por referência, sem manter listas paralelas. Estrutura dos artigos remete ao critério de ritmo global, substituindo a contagem orientativa de linhas. A regra de assinatura foi revista: o uso institucional não dispensa concretude.

`AGENTS.md`, os índices, o guia de serviços e as etapas históricas apontam para a mesma fonte. Templates de filmes e estúdios deixam de sugerir outro arquivo futuro como necessário às regras gerais. As instruções de preservação da voz autoral, incerteza, evidência, contratos e informações decisivas permanecem; concisão não autoriza cortar condições ou inventar fatos comerciais.

Esta revisão é documental e preserva a consolidação de serviços feita anteriormente. Não reescreve a copy publicada, não altera schemas ou componentes e não implica commit ou deploy.

## 2026-09-07 — Padrão de serviços consolidado em um guia

O inventário anterior à edição encontrou regras comerciais distribuídas em três guias, referências gerais e etapas antigas da Home. Havia repetição de cards, CTA e responsividade, larguras mobile divergentes, categorias técnicas ou ambíguas e um diagnóstico anterior de produção apresentado junto de um status de implementação.

| Documentos identificados | Tratamento |
| --- | --- |
| `docs/architecture/service-landing-pages.md`, `services-hub.md`, `service-card.md` | Regras e contratos reunidos no primeiro; os outros dois removidos e suas referências internas atualizadas |
| `docs/architecture/site-architecture.md`, `README.md`, `AGENTS.md` | Pontos de entrada para o guia único; arquitetura geral continua responsável por rotas e fontes técnicas |
| `docs/content/README.md`, `02-arquitetura/linhas-editoriais.md`, `02-arquitetura/taxonomia.md`, `04-formatacao/estrutura-dos-artigos.md`, `04-formatacao/componentes-mdx.md` e fluxos de produção/validação | Revisados como regras de artigos; referências e escopo ajustados onde necessário, sem transferir o molde comercial ao MDX |
| `docs/brand/etapa-1-foundation.md`, `docs/content/etapa-2-content-architecture.md`, `docs/design/etapa-3` a `etapa-13` e `docs/launch/etapa-14` | Etapas identificadas como históricas e subordinadas às fontes atuais; preservado o registro, sem aplicar à experiência comercial os antigos CTAs, categorias, loops ou composições da Home |
| `docs/content/relatorios/*.md`, incluindo os três relatórios `landing-page-para-*`, e `docs/audits/*.md` | Relatos de artigos e medições específicas, não instruções gerais de serviços; mantidos com seu contexto |
| Demais guias de arquitetura e templates editoriais de acervos | Mantêm contratos próprios de entidades, navegação editorial e dados; não recebem as regras de cards comerciais |

O [guia de serviços](../../architecture/service-landing-pages.md) passa a concentrar o padrão e o checklist de descoberta, avaliação e conversão. Os exemplos de intenção não criam categorias vazias nem alteram automaticamente o enum. Os relatos repetidos das seis ofertas foram reduzidos a referências de implementação; condições permanecem nos dados e os briefings datados permanecem neste histórico.

Foram acrescentados os três níveis de informação, o retorno à home e ao catálogo, a prioridade da primeira dobra e os papéis de CTA. Uma ação primária pode ter vários pontos de acesso, com rótulo e destino constantes. A seção de pendências registra as lacunas confirmadas no código, incluindo header sem links e hero sem CTA secundário próprio. Não há inferência de que a interface já atende ao padrão.

Esta decisão atualiza documentação, sem modificar ofertas, schemas, rotas, componentes ou conteúdo dos artigos. Substitui a descrição antiga de `/servicos` como visão apenas institucional; as entradas anteriores continuam sendo registros datados. Não houve commit, deploy ou verificação de produção nesta revisão.

## 2026-09-06 — Validações locais da infraestrutura de serviços

Registro transferido do guia comercial, sem nova execução nem alteração dos resultados.

### Infraestrutura inicial

Infraestrutura validada localmente com nove testes de contrato, renderização e eventos, TypeScript, lint, auditoria de conteúdo, `git diff --check` e build de 570 páginas. Os arquivos de exportação gerados pela auditoria foram preservados no estado anterior à execução.

HTTP em desenvolvimento: prévia 200, um h1, 12 seções, três perguntas em `details`, `noindex` e destino principal único. HTTP com `next start`: prévia e exemplo público 404; `/servicos`, `/servicos/produtos` e `/servicos/websites-profissionais` 200; sitemap 200 sem prévia/exemplo.

A automação de navegador falhou no ambiente com `missing field sandboxPolicy`. Não houve inspeção visual em viewport mobile, medição de performance da primeira oferta real ou verificação no provedor de analytics. Os testes de eventos verificam as funções e payloads localmente. Esses pontos continuam no checklist de cada oferta. Nenhum commit, deploy ou publicação foi realizado nesta etapa.

### Catálogo com seis ofertas

Com as seis ofertas registradas, 15 testes de contrato, renderização e eventos passaram, assim como TypeScript, lint, auditoria de conteúdo, `git diff --check` e o build de 581 páginas. Em `next start`, a landing para arquitetos respondeu 200 com canonical natural, `index, follow`, um h1, nove partes, quatro CTAs com um único destino de WhatsApp e JSON-LD `Service`; apareceu no sitemap e uma vez no catálogo institucional. O artigo relacionado também respondeu 200 com canonical natural, um h1 e um único `ServiceCTA` para a oferta. As três imagens locais responderam 200. Os arquivos de exportação gerados pela auditoria foram restaurados ao estado anterior à execução.

A conexão de automação visual continuou indisponível no ambiente, portanto não houve inspeção efetiva em 320px, 390px, desktop ou zoom de 200%. As fotografias das demonstrações, inclusive as três usadas pelo site para arquitetos, foram inspecionadas diretamente; responsividade e ausência de overflow ainda precisam da revisão visual prevista no checklist. O provedor de analytics não foi acessado, e cliques no WhatsApp permanecem eventos de intenção, não leads confirmados.

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

## 2026-09-08 — Mensalidade obrigatória nas ofertas comerciais

Motivo:
Preços pontuais nos serviços legados conflitavam com o posicionamento de continuidade e faziam o catálogo omitir manutenção, suporte e demais entregas recorrentes.

Substituição:
Toda oferta comercial publicada passa a exigir uma mensalidade sustentada por trabalho recorrente real. As landings novas têm uma única linha mensal obrigatória no schema; as ofertas legadas usam `commercialModel` com implantação, mensalidade, itens incluídos e condições. Valores iniciais conhecidos permanecem como implantação. Quando o valor mensal ainda não está definido, a interface usa `Sob consulta — cobrança mensal`, sem inventar preço, fidelidade ou regra de cancelamento.
