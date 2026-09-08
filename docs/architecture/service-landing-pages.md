# Serviços: catálogo e páginas de conversão

Fonte das regras de descoberta, cards, navegação comercial e landing pages do projeto. A divisão de responsabilidades e a manutenção da documentação seguem a [arquitetura do site](site-architecture.md#autoridade-e-manutenção-da-documentação); artigos seguem o [sistema editorial](../content/README.md).

Para escrever títulos, descrições, cards e textos de interface, aplicar a [diretriz global de linguagem](../content/01-fundamentos/voz-e-estilo.md). Este guia mantém a arquitetura comercial e os contratos, sem criar outro padrão de copy.

O objetivo é reduzir fricção entre **descoberta → avaliação → conversão**, preservando caminhos de retorno. As regras de experiência abaixo são o padrão a adotar; a seção de [adoção e pendências](#adoção-e-pendências) separa esse padrão do que está implementado. Alta conversão é resultado a medir, não promessa do template.

Leitura por tarefa: [experiência e conteúdo](#responsabilidades), [serviço como produto, modelos e condições](#serviços-apresentados-como-produtos), [catálogo e cards no código](#contrato-técnico-do-catálogo-e-dos-cards), [contrato da landing](#contrato-da-oferta), [CTA no artigo](#artigo-para-landing-servicecta), [validação](#checklist-de-catálogo-e-landing-antes-da-publicação).

## Responsabilidades

| Página | Objetivo | Estrutura |
| --- | --- | --- |
| Artigo `/blog/[slug]` | Aquisição orgânica e educação | MDX, explicação, referências e até um CTA contextual |
| Home/catálogo `/servicos` | Permitir entendimento rápido, descoberta e escolha | Intenções do cliente, cards e acesso às páginas individuais |
| Landing `/servicos/[slug]` | Avaliar e contratar uma oferta específica | Decisão, avaliação e detalhes, com uma ação principal e navegação de retorno |

Não usar o modelo de artigo para a landing. Não transformar o catálogo numa campanha para todos os públicos. Não criar páginas trocando somente a profissão: público, problema, demonstração, escopo e objeções devem justificar cada URL.

### Catálogo por intenção

`/servicos` funciona como uma home de serviços. Não deve explicar profundamente cada oferta nem exigir que a pessoa entenda a organização técnica do trabalho antes de escolher.

Organizar preferencialmente pela pergunta **o que você quer resolver?** Exemplos de rótulos:

- Mostrar meu trabalho;
- Captar clientes;
- Vender;
- Melhorar meu site;
- Validar uma ideia.

São exemplos de intenção, não cinco grupos obrigatórios. Exibir somente grupos com ofertas disponíveis; não inventar um serviço para preencher uma categoria. Evitar `UX`, `Desenvolvimento`, `Web design` e `Soluções digitais` como categorias quando exigirem conhecimento técnico do visitante. Os termos podem aparecer na avaliação ou nos detalhes da oferta, com explicação.

Usar um hero curto, seguido da navegação por intenção e do catálogo. Cada grupo tem título e uma frase de contexto fora da área rolável. Cada serviço aparece uma vez e leva diretamente à sua página individual. Ajuda para escolher e contato geral podem encerrar a página de forma compacta; um processo comum, se necessário, cabe em três etapas breves. FAQ, processos específicos, listas extensas, escopo completo e grandes demonstrações ficam nas landings.

O hero pode usar `Ver serviços` para o catálogo; cada card usa `Ver serviço`, com nome acessível que identifica a oferta. `Falar comigo` é suporte para quem precisa de orientação. Não substituir a descoberta por um pedido de orçamento dominante ou por um CTA persistente de contratação no catálogo. Links para ferramentas, blog e portfólio devem ter função clara, sem repetição em vários blocos. Nunca encaminhar a escolha para uma rota pausada ou com redirecionamento inesperado.

### Cards como pontos de decisão

Hierarquia recomendada, nesta ordem:

1. Preview visual que represente a oferta.
2. Nome do serviço, curto e compreensível.
3. Público ou contexto, em uma linha breve.
4. Benefício principal, em uma frase curta.
5. Mensalidade e implantação legíveis juntas; quando a mensalidade ainda não tiver valor público, usar `Sob consulta — cobrança mensal`.
6. CTA para a página individual.

Não incluir processo completo, FAQ, listas extensas, detalhes técnicos ou parágrafos longos. Reescrever o resumo quando não couber; não cortar preço, recorrência ou informação necessária à escolha para manter uma altura artificial.

Usar preview real autorizado ou fallback gráfico honesto, sem inventar projeto ou cliente. Badge é opcional; popularidade exige evidência e não deve simular urgência. O card pode ser um único link HTML com nome acessível claro, como no componente atual; não aninhar links ou controles interativos.

Aplicar o padrão de [previews](#previews-legíveis-e-consistentes). O card do catálogo apresenta o serviço; a comparação de seus modelos acontece na landing, sem multiplicar a mesma oferta em vários cards de `/servicos`.

### Carrosséis e navegação horizontal

No mobile, usar scroll horizontal nativo para grupos com múltiplos serviços, com `overflow-x: auto` e scroll snap. Deixar uma pequena parte do próximo card visível como indicação de continuidade; com um único serviço, não criar rolagem artificial.

- Preservar cards amplos e legíveis, ajustando a largura ao espaço útil; não reduzir o card apenas para caber mais itens.
- Não usar autoplay, avanço automático ao entrar na viewport ou reposicionamento que tire o controle do visitante.
- Permitir toque, mouse e teclado. Setas são opcionais e nunca o único meio de navegação.
- Manter ordem do DOM coerente com a ordem visual, foco visível e item focado acessível no trilho.
- Não esconder cards ou grupos por posição com `nth-child`; todas as ofertas devem continuar alcançáveis.
- Conter a rolagem na área intencional: o documento inteiro não pode ganhar overflow horizontal.

Filtros ou links de intenção também podem formar um trilho horizontal. Para o catálogo atual, preferir âncoras HTML com `Todos` e grupos não vazios, mantendo voltar/avançar e uso sem JavaScript. Se a quantidade de ofertas justificar filtros, usar seleção única, estado na URL, contagem e mensagem de resultado vazio com opção de limpar. Não impor um número arbitrário de ofertas como gatilho nem filtrar por tecnologia. `Ver todos` só deve aparecer quando tiver um destino real e útil.

### Landing individual e primeira dobra

Conversão não transforma a landing em beco sem saída. Manter header compacto com logo/identidade ligada à home `/` e acesso claro a `/servicos`. Acrescentar breadcrumb visual ou `Voltar para serviços` quando ajudar a situar a oferta. Esses links devem funcionar mesmo para quem chegou diretamente de um anúncio ou buscador; não depender do histórico do navegador. Breadcrumb em JSON-LD não substitui navegação visível.

A primeira dobra deve apresentar, sempre que possível, nome do serviço, promessa principal concreta, preço ou modelo comercial, resumo do que está incluído, CTA primário e CTA secundário para demonstração quando existir. Em telas menores ou com zoom, preservar essa prioridade perto do início sem comprimir tudo numa altura fixa. Não reduzir fonte nem esconder informação para simular uma dobra completa.

### Hierarquia da informação

| Nível | Conteúdo | Tratamento |
| --- | --- | --- |
| 1 — decisão | Produto/serviço, preço, CTA e demonstração | Resumo no início; ação e acesso à demonstração fáceis de encontrar |
| 2 — avaliação | Modelos, benefícios, entregáveis e processo | Seções curtas para comparar, reconhecer adequação e entender a entrega |
| 3 — detalhes | Escopo, condições, limitações, FAQ e questões técnicas | Seções secundárias ou conteúdo recolhível acessível, sem dominar a página |

O nível descreve prioridade, não três telas rígidas. A demonstração pode ter acesso no nível 1 e conteúdo ampliado no nível 2. Entregáveis começam por um resumo; quantidades, exclusões e responsabilidades ficam nos detalhes. Custos recorrentes, limitações decisivas e condições que mudam a compra precisam de resumo junto ao preço/CTA, mesmo quando explicados depois. Hierarquia não autoriza esconder condições comerciais.

### CTA primário, secundário e suporte

Cada landing tem **uma única ação primária**, claramente dominante. Ela pode ser repetida no hero, preço, fechamento e rodapé persistente, mantendo destino, intenção e rótulo. Uma ação não significa um único botão na página.

| Papel | Exemplos | Destaque |
| --- | --- | --- |
| Primário | `Quero esse site`, `Solicitar projeto`, `Contratar auditoria`, `Pedir orçamento` | Um rótulo escolhido para a oferta e maior destaque visual |
| Secundário | `Ver demonstração`, `Ver modelos` | Menor destaque, com destino existente e coerente |
| Suporte | `Tirar uma dúvida`, `Falar comigo` | Link discreto de ajuda, sem competir com a contratação |

Não alternar rótulos para a mesma ação nem apresentar contato, formulário e contratação como três ações dominantes. Se a contratação ocorre pelo WhatsApp, ele já é o destino primário; um link de suporte só se justifica por uma função distinta. Demonstração é opcional quando não existe material útil, mas seu acesso deve ser claro quando houver.

### Mobile como experiência principal

Projetar primeiro para leitura confortável e uso com uma mão. Usar texto legível, entrelinha confortável, contraste e áreas de toque de pelo menos 48 px nos controles de navegação e CTA; campos de formulário devem manter fonte de pelo menos 16 px. Esses valores são critérios do projeto, não uma declaração de conformidade automática.

Garantir CTA acessível cedo, imagens dimensionadas, empilhamento natural e ausência de overflow acidental. Nenhuma ação pode depender de hover, e movimentos devem respeitar a preferência de redução de movimento.

CTA persistente no rodapé é opcional nas landings quando facilitar a ação. Repetir a mesma conversão, reservar espaço no conteúdo e considerar a safe area. Ocultar ou desativar se cobrir texto, foco, consentimento, formulário ou teclado virtual, especialmente em viewport baixa. Validar telas de 320 e 390 px, desktop, zoom de 200%, teclado e uso com teclado virtual; uma barra fixa não deve dificultar leitura ou retorno ao catálogo.

## Serviços apresentados como produtos

Apresentar uma entrega que o visitante consiga ver, comparar e entender, com preço e condições identificáveis. Este é um padrão de conteúdo reutilizável dentro das landings, não um novo catálogo de dados: serviços continuam nos contratos de serviços, sem migração para `Product`, `ProductVariant` ou `ProductOffer` do acervo editorial.

### Modelo comercial mensal obrigatório

Toda proposta de serviço comercial publicada deve possuir **uma mensalidade vinculada a trabalho recorrente real**. A mensalidade aparece cedo no catálogo e na landing e informa, de forma curta, o que sustenta a continuidade: por exemplo, hospedagem, manutenção, suporte, monitoramento, atualizações ou pequenas alterações, somente quando esses itens fizerem parte da entrega.

- Com valor definido, usar `R$ X/mês` ou `A partir de R$ X/mês`.
- Sem valor definido, usar exatamente `Sob consulta — cobrança mensal`; não substituir por `Sob orçamento` isolado.
- Quando houver trabalho inicial relevante, separar `R$ X de implantação + R$ Y/mês` ou declarar `R$ Y/mês com implantação incluída`.
- Um preço de implantação nunca aparece como oferta completa sem a mensalidade associada.
- Auditoria, consultoria, SEO e automação precisam incluir acompanhamento, monitoramento, manutenção ou outra entrega recorrente compatível. Não renomear uma entrega pontual como mensal sem trabalho continuado.
- Fidelidade e cancelamento devem aparecer quando definidos. Se dependerem da proposta, declarar essa dependência antes da contratação; não presumir cancelamento livre.

O schema das landings novas exige uma única seção de preço e uma única linha `cadence: "monthly"` em toda oferta publicada. O catálogo legado exige `commercialModel.setup`, `commercialModel.monthly` e `commercialModel.terms`. Os dois contratos impedem que a mensalidade exista apenas na copy.

### Resumo da oferta

Quando aplicável, distribuir estas informações pelos três níveis de decisão já definidos:

| Informação | Apresentação |
| --- | --- |
| Nome, preço e modelo de cobrança | Identificação imediata; mostrar a mensalidade e separar a implantação quando existir, sem esconder custo obrigatório |
| Preview e modelos disponíveis | Mostrar o que será entregue e dar acesso às variações existentes |
| Entregáveis e prazo | Resumir o que o cliente recebe; informar prazo e o marco que inicia a contagem, quando definidos |
| Suporte, hospedagem e manutenção | Dizer o que está incluído, o que é separado, quem executa e quais limites se aplicam |
| Personalização | Explicar o que pode mudar no modelo e o que exige escopo ou preço adicional |
| CTA | Uma ação primária e acesso secundário a modelos/demonstração quando disponíveis |

Modelo estrutural **fictício**, sem alterar os preços ou as inclusões das ofertas cadastradas:

```text
Site para corretores
R$249/mês
Site + hospedagem + suporte
[Ver modelos] — ação secundária
[Quero esse site] — ação primária
```

O exemplo é apenas o resumo da oferta. Antes de usá-lo numa página real, confirmar implantação, prazo, limites de suporte, manutenção e demais condições pertinentes; a mensalidade do exemplo não comprova que esses itens estejam incluídos. Se uma informação não estiver definida, registrar o que depende da proposta. Não inventar condições para completar a apresentação.

### Modelos e demonstrações

Para serviços visuais em que a escolha de estilo ajude a decidir, oferecer idealmente **3 a 5 modelos distintos**, com previews comparáveis. É uma recomendação de seleção, não uma cota: exibir somente modelos reais disponíveis, mesmo que sejam menos. Três capturas do mesmo site são três vistas de um modelo, não três estilos.

Minimalista, Editorial, Clássico, Comercial e Premium são exemplos de rótulos. Cada um deve explicar uma diferença visível de composição, tipografia, organização ou uso. `Premium` não prova qualidade superior, mais recursos ou preço diferente por si só. Não criar variações mudando apenas o nome.

Cada modelo apresenta nome/estilo, diferença principal, preview e acesso ao material disponível. Deixar claro que é um **ponto de partida personalizável**, indicando quais mudanças estão incluídas — por exemplo, cores, textos, imagens ou organização, se confirmadas — e quais dependem de nova avaliação. Não prometer personalização ilimitada.

| Material | O que permite avaliar | Identificação e ação |
| --- | --- | --- |
| Screenshot/captura estática | Aparência de uma tela ou recorte | Identificar a vista, como `Captura da página de contato`; usar `Ampliar imagem` se houver ampliação |
| Protótipo ou exemplo ilustrativo | Composição e interações limitadas | Explicitar o que funciona e o que está apenas representado; não apresentar como projeto entregue |
| Demo funcional | Navegação e recursos demonstrados em funcionamento | Permitir abrir com `Ver demonstração`; testar o destino e informar limitações, como formulário sem envio |
| Projeto real publicado | Entrega realizada em contexto verificável | Identificar autoria, participação e escopo; link para o projeto quando disponível e autorizado |

O visitante não deve depender da imaginação para entender o produto. Sempre que houver uma demo funcional, permitir abri-la; se só existir uma captura, chamá-la de captura. Um preview não vira demo por estar dentro de uma moldura de navegador. Não chamar de funcional um protótipo cujas ações centrais são apenas desenho.

Demos devem manter caminho de volta à oferta, funcionar em mobile e teclado e permitir verificar os recursos anunciados. Usar exemplos fictícios identificados; uma simulação não deve aparentar ter enviado formulário, reservado imóvel ou concluído compra. Abrir uma demo não significa contratar nem confirma conversão. Não usar uma rota pausada, um destino de desenvolvimento ou um link inexistente como demonstração pública.

### Previews legíveis e consistentes

Evitar screenshots verticais completos reduzidos a miniaturas ilegíveis. Mostrar as partes que ajudam a avaliar a entrega: Home, página interna, contato, galeria, formulário, versão mobile ou detalhe de produto/imóvel. Escolher vistas que correspondam ao serviço, sem preencher todas por obrigação.

Na página geral, manter a mesma proporção de preview entre os cards; o componente atual usa 16:10. Na comparação de modelos, usar escala e enquadramento equivalentes para a mesma vista. Um recorte mobile pode ocupar uma moldura própria, identificado como mobile, sem esticar a imagem para parecer desktop.

Preservar tamanho suficiente para ler e reconhecer a interface, com legenda que identifique a tela ou o recorte. Oferecer ampliação ou acesso à demo quando disponíveis. Captura completa pode ser complementar, em tamanho útil. Não esconder limitações do produto pelo recorte nem sugerir que recursos apenas ilustrados estejam incluídos. Origem, licença, créditos e dimensões seguem o contrato de mídia existente.

### Antes de contratar

Usar **Antes de contratar** como bloco reutilizável de condições e redução de risco, com respostas curtas apenas às dúvidas relevantes. Pode ser uma lista de condições ou perguntas recolhíveis, próxima à avaliação da oferta. Não criar uma segunda FAQ com as mesmas respostas.

| Tema pertinente | O que a resposta precisa esclarecer |
| --- | --- |
| Cobrança | Mensalidade obrigatória, implantação e custos de terceiros separados quando existirem |
| Fidelidade | Se existe compromisso mínimo e sua duração |
| Cancelamento | Como solicitar, quando termina a cobrança e o que acontece com o site e os dados |
| Domínio | Quem registra, de quem é a titularidade e quem paga a renovação |
| Hospedagem | Se está incluída, quem mantém e quais limites se aplicam |
| Suporte | Canal, cobertura e prazo de resposta, quando acordados |
| Revisões | Quantas rodadas estão incluídas e o que conta como revisão |
| Prazo | Estimativa de entrega, início da contagem e dependências do material do cliente |
| Alterações futuras | O que pode mudar após a entrega, se entra em manutenção ou gera nova cobrança |

Reutilizar o formato, não copiar condições de outra oferta. Mostrar somente linhas aplicáveis e confirmadas; quando uma condição relevante estiver pendente, explicar o que será definido na proposta. Não deduzir ausência de fidelidade, cancelamento livre ou manutenção ilimitada a partir de um preço mensal. Informações decisivas continuam resumidas junto ao preço e à ação, com aprofundamento neste bloco.

No contrato atual, uma seção `type: "faq"` com título `Antes de contratar` pode cumprir esse papel usando `ServiceFAQ`, sem novo componente e sem outra FAQ obrigatória. `pricing.items` e `pricing.terms` continuam responsáveis pelo preço e suas condições; organizar textos para que as perguntas acrescentem esclarecimento em vez de repetir parágrafos. Uma futura apresentação em lista deve respeitar o schema ou migrá-lo explicitamente. O padrão não exige um número mínimo de perguntas além do contrato técnico.

### Confiança verificável

Priorizar projetos reais, demos, exemplos publicados, autoria clara, escopo explícito, processo transparente, regras de revisão e condições bem definidas. Distribuir essas evidências onde respondem à dúvida do visitante; não é obrigatório criar um bloco separado para cada uma.

Identificar quem criou, qual foi sua participação e se o material é trabalho entregue, projeto próprio ou demonstração. Demos comprovam apenas os aspectos que permitem observar; não comprovam clientes, vendas ou resultados de uma contratação. Informações do executor e condições reais ajudam a avaliar a oferta mesmo sem depoimentos.

Depoimentos são complementares, específicos e autorizados, com atribuição e evidência. Não depender de elogios genéricos, logos sem contexto, slogans de competência ou números sem origem. Omitir prova indisponível; não substituí-la por uma promessa de resultado ou garantia não definida.

### Serviços relacionados

Uma landing pode mostrar **2–3 alternativas relacionadas, no máximo três**, em um bloco discreto como `Talvez você esteja procurando…`. Se houver somente uma alternativa útil, mostrar uma; se não houver, omitir. Selecionar por intenção próxima e diferença real de escopo, não para preencher a página.

Usar nome, uma frase que explique para qual necessidade a alternativa serve e link para a oferta publicada, sem duplicatas nem link para a própria página. Manter após o conteúdo de avaliação, sem disputar o hero ou o CTA primário. Não acrescentar filtros, vários grupos ou um catálogo completo; o acesso a `/servicos` continua sendo o caminho para explorar todas as ofertas. Modelos visuais da mesma oferta pertencem à seleção de modelos, não a este bloco.

## Contrato técnico do catálogo e dos cards

Esta seção descreve o código consultado em 2026-09-08, sem certificar produção ou aderência visual.

| Responsabilidade | Fonte |
| --- | --- |
| Página e metadata | `src/app/servicos/page.tsx` e `servicesPage` nos recursos |
| Ofertas novas | `getPublishedServiceLandings()` em `src/data/service-landings/` |
| Ofertas legadas | `src/resources/services.ts` |
| Intenção, ordem e apresentação | `src/data/service-hub/index.ts` |
| Contrato do card | `src/content/service-hub/serviceHubCardSchema.ts` |
| Composição e estilos | `src/components/services/hub/`: `ServiceHubView`, `ServiceHubCatalog`, `ServiceIntentNav`, `ServiceGroupCarousel` e `ServiceCard` |
| Prévia de estados | `/dev/service-card`, somente em desenvolvimento; 404 em produção |

O adaptador resolve preço, slug e identidade nos catálogos proprietários e acrescenta nome curto, contexto, benefício, intenção e preview. Valida cada card e rejeita slug duplicado ou serviço publicado sem apresentação. Não copiar preços ou criar um terceiro catálogo de ofertas. Rascunhos e rotas indisponíveis ficam fora da descoberta. Uma futura curadoria que omita ofertas publicadas exige ajustar explicitamente a cobertura do adaptador.

| Campo do card | Contrato atual |
| --- | --- |
| `id`, `slug` | Obrigatórios, em kebab-case; slug gera `/servicos/[slug]` |
| `intent` | `present-work`, `capture-clients`, `sell-operate` ou `validate-idea` |
| `title`, `context`, `benefit` | Obrigatórios; máximos de 56, 80 e 120 caracteres |
| `price.label`, `price.value` | Obrigatórios; máximos de 28 e 80 caracteres |
| `price.detail` | Opcional; complemento de até 100 caracteres, usado para implantação sem esconder custo obrigatório |
| `price.included` | Obrigatório; resumo de até 140 caracteres do trabalho coberto pela mensalidade |
| `preview` | Imagem ou fallback; obrigatório |
| `badge` | Opcional; rótulo de até 28 caracteres, tipo `highlight` ou `popular`; este último exige `evidence` de até 240 caracteres |

`preview.kind: image` exige caminho local `/images/`, alt de até 180 caracteres, dimensões positivas e posição `center` ou `top`. Procedência e autorização ficam no catálogo proprietário. `fallback` exige rótulo de até 32 caracteres e tom `gold`, `forest`, `clay` ou `slate`; desenha uma página com CSS, sem fingir um projeto real.

`ServiceCard.module.scss` e `ServiceGroupCarousel.module.scss` são as fontes dos valores visuais e breakpoints. O card ocupa a célula recebida e segue o [padrão de previews](#previews-legíveis-e-consistentes); badge ausente não deixa lacuna e não há estado desabilitado. Título, público e benefício não usam truncamento de linhas. No mobile, trilhos manuais preservam o próximo card visível; no desktop, a grade mostra os serviços sem exigir rolagem lateral.

`getServiceHubPrice` deriva mensalidade, implantação e escopo recorrente dos catálogos proprietários. Nas ofertas legadas, o valor inicial foi preservado como implantação e a mensalidade ainda sem preço público aparece como `Sob consulta — cobrança mensal`; o escopo recorrente está em `commercialModel.monthly.includes`. As seis ofertas visuais usam capturas dos componentes especializados em `public/images/work/`, identificadas como exemplos de interface. Os demais cards usam representação tipográfica do serviço.

## Adoção e pendências

Estado técnico consultado em 2026-09-08. As diferenças abaixo são pendências de implementação, não exceções às regras de experiência. Validações datadas ficam no [histórico](../content/historico/decisoes-editoriais.md#2026-09-06--validações-locais-da-infraestrutura-de-serviços) e não certificam uma revisão ou publicação posterior.

| Ponto | Estado consultado e próximo ajuste |
| --- | --- |
| Catálogo | `/servicos` já compõe grupos e cards a partir dos dois catálogos, com links de âncora e trilhos manuais |
| Intenções | O catálogo apresenta `Mostrar meu trabalho`, `Captar clientes` e `Melhorar site e atendimento`. Não mostra intenções sem ofertas; os identificadores internos existentes foram preservados |
| Compatibilidade da intenção | Os cinco exemplos públicos não são cinco valores já aceitos pelo enum. Novas intenções exigem procurar consumidores, atualizar schema/adaptador e migrar registros sem mudar IDs, slugs ou canonicals |
| Header da landing | `ServiceLandingPage.tsx` tem identidade ligada a `/` e `Voltar para serviços`, inclusive no mobile |
| Primeira dobra | `ServiceHero` mostra oferta, benefício, público, modelo comercial, resumo do escopo mensal e ação principal. Serviços legados mostram mensalidade e implantação no hero e repetem as condições no bloco comercial reutilizável |
| Modelos e demos | `demonstration` aceita descrição, imagem opcional e `illustrative`; não possui lista de modelos ou URL de demo. As composições especializadas contêm exemplos visuais, mas não constituem um seletor compartilhado de 3–5 estilos |
| Catálogo antigo de demos | `src/features/demos/data/demo-registry.ts` registra estilos, rotas e maturidade, mas `/modelos` e seus descendentes estão pausados por `routePolicy.ts`. Auditar o que realmente funciona antes de reutilizar; o status do registro não comprova acesso público |
| Antes de contratar | Landings novas usam `pricing.terms` e FAQ. Serviços legados usam `commercialModel.terms`; fidelidade e cancelamento ainda dependentes da proposta são identificados como tal |
| Alternativas relacionadas | O schema e `ServiceLandingPage` não têm campo ou bloco próprio de serviços relacionados. Implementação futura deve resolver somente ofertas publicadas por identidade existente e preservar URLs, sem inventar campos no catálogo atual |
| Legados e mobile | Serviços antigos têm composições próprias. Revisar cada uma, áreas de toque, clamp, overflow e CTA persistente antes de afirmar conformidade |

Preservar URLs, canonicals, IDs e condições reais das ofertas. A adequação futura deve corrigir o componente compartilhado quando a lacuna for comum, sem replicar soluções em seis páginas. Mudanças de schema exigem busca de usos, compatibilidade ou migração e validação proporcional, conforme `AGENTS.md`.

## Arquitetura e compatibilidade

- `src/content/service-landings/serviceLandingSchema.ts`: contrato Zod e tipos, independentes do frontmatter e do tipo legado `ServiceLanding` em `src/types`.
- `src/content/service-landings/landings.ts`: registro de ofertas; inclui os portfólios para fotógrafos, tatuadores e designers, o site profissional para corretores, a galeria virtual para artistas e o site e portfólio para arquitetos.
- `src/data/service-landings/index.ts`: validação, publicação e resolução por ID/slug; impede IDs repetidos e slugs em conflito com serviços antigos ou `produtos`.
- `src/components/services/landing/`: composição, seções, estilos, SEO e pequenas fronteiras cliente para eventos.
- `src/app/servicos/[slug]/page.tsx`: consulta o novo catálogo e mantém o fluxo legado de `src/resources/services.ts`, incluindo beauty e creative.
- `src/app/sitemap.ts`: acrescenta novas landings publicadas e indexáveis.
- `src/components/services/ServiceCTA.tsx`: ponte editorial exposta em `src/components/mdx.tsx`.
- `/dev/service-landing`: prévia fictícia, `noindex`, disponível com `npm run dev`; responde 404 em produção. `example.ts` não faz parte do catálogo.

Os serviços antigos mantêm seus dados, URLs e apresentação; esta entrega não os certifica como aderentes ao padrão. Migração futura deve remover o registro antigo antes de cadastrar o mesmo slug, preservando a URL e revisando as condições comerciais.

O layout reutiliza `standaloneLandingRoot`: o CSS global oculta Header/Footer institucionais e libera largura. A landing oferece cabeçalho mínimo com identidade e rodapé do executor. Tipografia, cores, providers e analytics continuam compartilhados. Isso evita mover todas as rotas; componentes globais ainda pertencem à árvore entregue. Não há isolamento completo de bundle: medir esse custo antes de campanhas de alto volume.

Texto, CTA, preço e FAQ chegam no HTML do servidor. Links funcionam sem JavaScript e o FAQ usa `details/summary`. As seis ofertas do registro usam pedido de orçamento no WhatsApp existente do site; suas fontes estão nas [referências de implementação](#referências-de-implementação). Não há endpoint de coleta, checkout ou experimento ativo; os formulários descritos são recursos dos sites entregues aos clientes, não mecanismos de conversão destas landings. Cadastro disponível na aplicação local não equivale a deploy.

## Contrato da oferta

Cada registro define `id` permanente, `slug`, `status`, `updatedAt`, `seo`, `provider`, `conversion`, `hero`, `sections`, `finalCTA`, `stickyCTA` e, opcionalmente, `experiment` e `legalLinks`.

- `draft`: indisponível na rota pública, no CTA editorial e no sitemap.
- `published`: acessível e incluído nos parâmetros estáticos. `seo.index` controla indexação separadamente.
- `seo.index: false`: campanha pública fora do sitemap; não é controle de acesso.
- `conversion`: destino único, repetido no hero, oferta, final e mobile. Tipos: `whatsapp`, `quote`, `checkout`, `form`.
- WhatsApp aceita `https://wa.me/` com telefone internacional; orçamento/checkout aceitam HTTPS; formulário usa `#contato`.
- `hero.price`: resumo obrigatório para uma oferta publicada, coerente com a mensalidade e a implantação detalhadas.
- Mídia exige caminho local `/images/`, dimensões, alt, legenda, origem e crédito. Confirmar autorização comercial; não reutilizar automaticamente pôsteres/capas editoriais em anúncios. `source` registra procedência, e o crédito aparece na legenda.
- Provas exigem `attribution` e `evidence`. Evidência é referência para revisão humana; não é certificação automática. Não colocar documentos privados ou dados de clientes nesse campo. O componente mostra relato e atribuição.

O schema exige textos preenchidos, IDs de seção/título únicos e processo de 3 ou 4 etapas. `inicio`, `service-title`, `contato`, `contato-title`, `acao-final` e `acao-final-title` são reservados. Publicação exige as seções essenciais abaixo. Prova é opcional: omitir sem material real, em vez de inventar. Executor aparece sempre no rodapé.

`structure` aceita `standard` (também quando omitido) ou `compact`. A estrutura padrão mantém seções de solução e público ideal separadas e demonstração opcional. A compacta usa os campos obrigatórios do hero para público/solução e exige ao menos os tipos problema, benefício, demonstração, entregáveis, processo, preço e FAQ. Uma seção de cada tipo, com hero e CTA final, forma nove partes; seções adicionais são aceitas. Esse contrato de presença não impõe destaque visual igual nem uma ordem narrativa: aplicar os três níveis de informação sem remover seções exigidas pelo schema.

## Estrutura e componentes

Hero abre a página e CTA final encerra a oferta. `sections` controla a ordem intermediária.

| Seção | Conteúdo | Componente |
| --- | --- | --- |
| Hero | Oferta específica, público, benefício observável, subtítulo, preço quando definido, CTA e mídia útil | `ServiceHero` |
| Problema | Poucos parágrafos sobre a situação que trouxe o visitante | `ServiceSectionContent` (`problem`) |
| Solução | Como o serviço atende à situação | `ServiceSectionContent` (`solution`) |
| Benefícios | Ganhos concretos, sem prometer faturamento ou procura | `ServiceBenefits` |
| Entregáveis | Resumo da entrega; quantidades, limites, revisões e exclusões com hierarquia secundária | `ServiceDeliverables` |
| Demonstração | Material identificado conforme o [padrão de modelos e demos](#modelos-e-demonstrações); captura não implica demo funcional | `ServiceSectionContent` (`demonstration`), `ServiceImage`; interações específicas podem usar composição própria |
| Público ideal | Situações e pré-requisitos específicos | `ServiceBenefits` (`audience`) |
| Processo | 3 ou 4 etapas compreensíveis | `ServiceProcess` |
| Oferta/preço | Criação, recorrência, manutenção, domínio e hospedagem separados quando aplicáveis | `ServicePricing` |
| Confiança | Evidências conforme [confiança verificável](#confiança-verificável); depoimentos são complementares | `ServiceProof` para relatos e atribuições; projetos e demos podem exigir composição própria |
| FAQ / Antes de contratar | Dúvidas pertinentes e condições, sem repetição ou perguntas de preenchimento | `ServiceFAQ` |
| CTA final | Proposta e ação principal repetidas | `ServiceAction` em `ServiceLandingPage` |

Em `pricing.items`, cada linha tem `label`, `amount`, `cadence` e `details`. Cadências aceitas: `once`, `monthly`, `yearly`, `included`, `on-request`. Toda publicação tem exatamente uma linha `monthly`, cujo `amount` contém `/mês` ou `cobrança mensal` e cujo `details` resume a entrega recorrente. `terms` explica pagamento, cancelamento, fidelidade, custos de terceiros e limites. Sem valor mensal definido, usar `Sob consulta — cobrança mensal`. Nunca esconder custos necessários à operação.

## Composição e formulários

`hero.layout` aceita `text` ou `split`; duas colunas dependem de imagem ou de `heroVisual` (slot React de servidor) e empilham no mobile. `className` permite uma apresentação específica com CSS escopado; `data-section-type` identifica os wrappers para ajustes locais. Seções usam texto, listas e divisores, sem uma grade de cards obrigatória.

`renderSection(section)` permite corpo especializado, retornando `undefined` para o padrão. O wrapper continua responsável pelo ID e h2. A função é de servidor: não colocar JSX/callbacks no catálogo. Uma demonstração pode combinar duas capturas reais com legendas. Manter conteúdo essencial no HTML e a mesma conversão.

Para formulário, passar `form={<FormularioDoServico />}`. A composição falha se `conversion.kind === "form"` não tiver adaptador. Na primeira oferta desse tipo, integrar a composição na ramificação do novo catálogo em `src/app/servicos/[slug]/page.tsx`. Implementar envio real, validação no servidor, erro, prevenção de duplicação e sucesso acessível. A infraestrutura não inclui endpoint de coleta. O exemplo de dev usa somente texto explicativo, sem enviar dados.

## Copy e UX

Usar as regras de [concretude](../content/01-fundamentos/voz-e-estilo.md#concretude), [função de cada seção](../content/01-fundamentos/voz-e-estilo.md#uma-função-por-seção) e [copy de decisão](../content/01-fundamentos/voz-e-estilo.md#copy-de-decisão). Preço, prazo, inclusões e alterações possíveis devem ser resolvidos nos dados da oferta, não preenchidos por inferência promocional.

Após escrever o catálogo ou a landing, concluir a [auditoria obrigatória de linguagem](../content/01-fundamentos/voz-e-estilo.md#auditoria-obrigatória-de-linguagem), incluindo os cards e a leitura conjunta de hero, seções e CTA. As seções exigidas pelo schema continuam necessárias, com funções distintas; a auditoria não autoriza sua remoção silenciosa.

Aplicar a [hierarquia da informação](#hierarquia-da-informação) e os critérios de [mobile](#mobile-como-experiência-principal). Não instalar popups, chat ou scripts extras por padrão.

## SEO e campanhas

`serviceLandingMetadata` gera title, descrição, canonical natural `/servicos/[slug]`, Open Graph e Twitter. UTMs não entram no canonical. JSON-LD `Service` representa nome, descrição, executor e o modelo comercial visível por meio de `Offer` e `PriceSpecification`; valores textuais sob consulta permanecem como descrição, sem número inventado. Não gerar notas ou avaliações agregadas. FAQ não implica promessa de resultado enriquecido.

Publicada e indexável entra automaticamente no sitemap; não duplicar no objeto estático `routes`. Busca interna e descoberta no catálogo são configurações separadas; o adaptador atual do hub exige apresentação para cada oferta publicada. Campanhas podem chegar diretamente, sem depender de visita anterior ao blog. No hub, preservar um H1, H2 para intenções, H3 para cards, links renderizados no servidor e canonical próprio. `ItemList` ou `CollectionPage`, quando usados, devem refletir somente serviços exibidos.

Antes de Google Ads/Meta Ads, alinhar anúncio e oferta, testar o destino real, definir evento importado como conversão e validar configuração/consentimento do provedor. Conferir UTMs de entrada; não repassar query strings inteiras a destinos ou formulários. Esta entrega não instala pixels nem configura contas de anúncios.

## Analytics

Contrato local de eventos; não são automaticamente reconhecidos como conversões nas plataformas.

No catálogo, o `AnalyticsProvider` lê `services_intent_select`, `services_card_click` e `services_help_click`. O card expõe ID, intenção, localização `services_hub_card` e `href` pelo provider. São eventos de descoberta e contato, não leads. Manter payloads sem texto livre ou dados pessoais; a allowlist abaixo é específica das landings e não substitui o contrato do provider global.

| Evento | Disparo |
| --- | --- |
| `service_landing_view` | Montagem, com proteção contra repetição do efeito em Strict Mode |
| `service_cta_click` | Clique principal; posição `hero`, ID da oferta, `final` ou `mobile-sticky` |
| `service_whatsapp_click` | Além do clique principal, somente para destino WhatsApp |
| `service_form_start` | Primeiro uso do formulário, chamado pelo adaptador |
| `service_form_submit` | Sucesso confirmado pelo servidor, chamado pelo adaptador |
| `service_conversion` | Lead aceito pelo servidor; checkout/WhatsApp exigem integração que confirme resultado |

Payload permitido: `service_id`, `landing_slug`, `conversion_kind`, `experiment_id`, `variant_id`, `location`. Não enviar telefone, nome, e-mail, mensagem, campos, recibo ou URL de destino. Reutiliza `trackEvent`: dataLayer, gtag quando existente e Vercel. O `page_view` global continua separado.

```tsx
const tracking = useServiceFormTracking(context);
// No primeiro onChange de um campo: tracking.start();
// Somente após resposta validada de sucesso do servidor:
tracking.confirmedSubmit(result.receiptId);
```

Recibo fica apenas na memória para deduplicar confirmações durante a montagem. Falha, tentativa de submit, abertura de WhatsApp e clique não chamam `confirmedSubmit`. Deduplicação entre recargas/dispositivos/CRM requer integração futura de servidor. WhatsApp e checkout externos não têm confirmação implementada.

Verificar payloads no dataLayer e DebugView/diagnóstico do provedor. Evitar que GTM/GA4 coletem o mesmo evento por duas trilhas. Não somar clique, WhatsApp, envio e conversão como quatro leads: definir uma única fonte de conversão importada. A camada global existente pode incluir URL/query string em eventos gerais; esta allowlist se aplica somente a `service_*`.

### Preparação para A/B

Hero, rótulo de CTA, preço, oferta, provas e ordem podem variar nos dados. `experiment: { id, variant }` identifica a versão nos eventos. Selecionar variante no servidor, usando o mesmo objeto na metadata e no corpo; manter identidade, slug e canonical.

Não há sorteio, cookie de alocação, painel ou experimento ativo. Ao implementar, definir persistência, divisão de tráfego, cache e indexação. Evitar sorteio no cliente, flicker e URLs indexáveis quase idênticas. Testar uma hipótese por vez e avaliar conversões confirmadas com volume suficiente.

## Artigo para landing: ServiceCTA

Disponível no MDX sem importação:

```mdx
<ServiceCTA
  serviceId="galeria-virtual-artistas"
  title="Quer sua própria galeria virtual?"
  description="Conheça a proposta para organizar obras e apresentar o artista."
  label="Quero minha galeria"
/>
```

O exemplo acima usa uma oferta publicada. Para outro serviço, não colocar o CTA no artigo antes de registrar e publicar seu ID real. O componente resolve URL pelo catálogo e rejeita IDs ausentes ou rascunhos. Manter artigo informacional e no máximo um CTA principal somando `ArticleCTA` e `ServiceCTA`; o verificador conta ambos. Não repetir toda a oferta no artigo nem acrescentar contato concorrente.

## Criar uma nova landing

### Referências de implementação

Os seis exemplos abaixo já constam no registro local. Preços, mensagens, condições e quantidade de seções pertencem aos dados de cada oferta; não copiá-los para novos serviços. As decisões dos briefings ficam no [histórico editorial](../content/historico/decisoes-editoriais.md), com data, sem transformar nove, dez ou doze partes em regra universal.

| Oferta | Dados em `src/content/service-landings/` | Composição e demonstração em `src/components/services/` |
| --- | --- | --- |
| Fotógrafos | `photographerPortfolio.ts`, `photographerDemoMedia.ts` | `photographers/PhotographerLanding.tsx`, `PhotographyDemo.tsx` |
| Corretores | `realEstateWebsite.ts`, `realEstateDemoMedia.ts` | `real-estate/RealEstateLanding.tsx`, `RealEstateDemo.tsx` |
| Tatuadores | `tattooPortfolio.ts`, `tattooDemoMedia.ts` | `tattoo-artists/TattooLanding.tsx`, `TattooPortfolioDemo.tsx` |
| Artistas | `artistGallery.ts`, `artistGalleryDemoMedia.ts` | `artists/ArtistGalleryLanding.tsx`, `ArtistGalleryDemo.tsx` |
| Designers | `designerPortfolio.ts` | `designers/DesignerLanding.tsx`, `DesignPortfolioDemo.tsx` |
| Arquitetos | `architectWebsite.ts`, `architectDemoMedia.ts` | `architects/ArchitectLanding.tsx`, `ArchitectPortfolioDemo.tsx` |

As fotografias das demonstrações são exemplos licenciados de interface, com procedência e créditos nos registros de mídia. Não representam trabalhos, imóveis disponíveis ou autoria do executor. Designers usa composições fictícias em HTML/CSS. Formulários ilustrativos não simulam envio. A conversão dessas ofertas abre o WhatsApp e mede intenção de contato, sem confirmação de lead; todas preservam SEO e analytics compartilhados.

### Passos

1. Consultar arquitetura, este guia e serviços legados. Definir público, problema, escopo, condições e conversão reais.
2. Criar arquivo em `src/content/service-landings/`, tipado pelo novo `ServiceLanding`, começando em `draft`. `example.ts` é referência de estrutura; reescrever o conteúdo fictício.
3. Importar em `landings.ts`. Usar ID permanente e slug curto distinto. A fachada valida também os rascunhos.
4. Preencher hero, seções, executor e SEO com a diretriz global de linguagem e o padrão de serviço como produto. Selecionar modelos e vistas reais quando pertinentes, identificar captura/demo, conferir condições e evidências e concluir a auditoria de linguagem da página.
5. Usar temporariamente o registro na prévia de desenvolvimento. Se necessário, fornecer `form`/`renderSection` e integrar a mesma composição à rota pública.
6. Definir `seo.index` e descoberta institucional/editorial. `ServiceCTA` aceita somente IDs publicados.
7. Executar o checklist. Mudar para `published` com oferta aprovada; commit, publicação e deploy exigem solicitação com essa intenção.

## Prioridade de correção

Ao encontrar problemas, corrigir nesta ordem:

1. Compreensão da oferta.
2. Navegação.
3. Produto e demonstração.
4. Preço e CTA.
5. Redução de risco.
6. Copy.
7. Hierarquia visual.
8. Refinamentos decorativos.

A ordem orienta o trabalho, não dispensa os itens do checklist. Refinamento visual não compensa uma oferta incompreensível ou um destino quebrado. Aplicar o [critério global de função](site-architecture.md#critério-de-função) antes de acrescentar qualquer bloco.

## Checklist de catálogo e landing antes da publicação

Checklist único da experiência comercial. Registrar rota/versão, evidência e resultado de cada categoria: aprovado, pendente ou não aplicável com motivo. Não marcar como aprovado algo que não foi verificado. Ausência de dados, ferramenta ou acesso deve ficar explícita. O catálogo resume a escolha; itens de oferta completa se verificam na landing correspondente, sem copiá-los para os cards.

### Navegação

- [ ] O visitante consegue voltar para `/servicos` a partir da landing e da demo, inclusive após entrada direta por busca ou anúncio.
- [ ] O logo/identidade é um link funcional para `/`; nenhum fluxo termina sem saída útil.
- [ ] Cards, modelos e alternativas levam a destinos disponíveis; o catálogo mantém descoberta por intenção e relacionados respeitam o limite definido neste guia.

### Compreensão

- [ ] Em poucos segundos, nome, contexto e entrega permitem identificar o serviço sem depender de um slogan.
- [ ] Mensalidade, implantação quando houver e resumo do trabalho recorrente estão claros e coerentes entre hero, card, preço, FAQ e dados estruturados.
- [ ] A próxima ação e o que acontece depois dela são compreensíveis.

### Copy

- [ ] A [auditoria global de linguagem](../content/01-fundamentos/voz-e-estilo.md#auditoria-obrigatória-de-linguagem) foi concluída e registrada: sem frases genéricas ou slogans sem informação concreta imediata.
- [ ] Redundâncias entre headline, parágrafos, seções e CTA foram removidas; nenhuma seção existe apenas para preencher a página.
- [ ] Não há parágrafos longos desnecessários; cada seção e cada card cumprem uma função, sem omitir informações decisivas para encurtar o texto.

### Produto

- [ ] Previews mostram a entrega em tamanho legível; capturas, protótipos e demos funcionais estão identificados corretamente.
- [ ] Demos, quando aplicáveis, abrem e permitem testar os recursos anunciados; há modelos suficientes quando a escolha de estilo é relevante, conforme o padrão deste guia.
- [ ] A entrega parece concreta por material verificável, autoria e escopo explícitos. Exemplos fictícios estão identificados e não simulam trabalho entregue ou resultados de clientes.

### Conversão

- [ ] Existe uma única ação primária dominante e ela aparece cedo. Suas repetições mantêm rótulo, intenção e destino; não são ações concorrentes.
- [ ] CTA secundário tem função e destino claros; suporte e alternativas não disputam a contratação.
- [ ] Mobile mantém o CTA acessível; a versão persistente, se usada, não cobre texto, foco, consentimento ou teclado virtual.

### Risco

- [ ] Prazo e dependências do cliente estão claros, assim como mensalidade, implantação e custos necessários.
- [ ] Manutenção, hospedagem, domínio, suporte, personalização e revisões têm inclusões e limites explícitos quando pertinentes; nenhuma condição foi inventada a partir do preço.
- [ ] `Antes de contratar` responde às dúvidas relevantes, incluindo fidelidade, cancelamento e alterações futuras quando aplicáveis, sem criar uma FAQ longa ou repetida. Condições ainda dependentes da proposta estão identificadas.

### Design

- [ ] A hierarquia separa decisão, avaliação e detalhes; nível 3 não domina a página.
- [ ] Cards e preços são legíveis, previews são consistentes e existe espaço em branco suficiente para distinguir grupos, ações e informações.
- [ ] Elementos decorativos sem função foram removidos ou têm justificativa concreta; a fonte não foi reduzida para acomodar excesso de conteúdo.
- [ ] A extensão da página decorre de informação necessária, não da repetição de promessas ou de seções convencionais.

### Técnico

- [ ] Mobile foi revisado em 320 e 390 px, com comparação em desktop, zoom de 200% e teclado virtual quando houver campos.
- [ ] Acessibilidade básica verificada: teclado, foco visível e não encoberto, rótulos, alternativas textuais, contraste e áreas de toque conforme este guia; nenhum conteúdo depende só de hover.
- [ ] Links, âncoras e ações foram testados. Formulário de conversão, quando existir, tem envio real, validação, erros e sucesso acessível; exemplos não simulam envio.
- [ ] Imagens estão otimizadas para o tamanho de exibição, com dimensões/proporção reservadas; conteúdo e links essenciais continuam úteis sem JavaScript.
- [ ] Não há overflow horizontal acidental no documento. Rolagem intencional fica contida nos trilhos, que preservam snap, teclado e indicação de continuidade, sem autoplay nem dependência de setas.
- [ ] CLS foi observado/medido sem deslocamentos relevantes que prejudiquem leitura ou ação; performance foi comparada em condições equivalentes, conforme o [protocolo de experiência](../audits/search-and-web-vitals-measurement.md#verificação-de-páginas-antes-da-publicação). Orçamento de build não substitui essa revisão.
- [ ] SEO e publicação conferidos: metadata, canonical, OG, um H1, hierarquia de títulos, JSON-LD fiel, sitemap e política de rotas; rascunhos e exemplos de desenvolvimento não aparecem como ofertas públicas.
- [ ] Analytics verificado conforme o contrato deste guia: cliques/falhas não são leads, payloads não contêm dados pessoais e experimentos, se houver, têm hipótese e alocação controladas.

### Evidências e conclusão

Para alterações de implementação, executar os testes de serviços disponíveis em `package.json`, `npm run audit:content`, TypeScript, lint, build e `git diff --check` em proporção ao alcance. Verificar HTTP dos destinos e sitemap; revisão de aparência exige navegador, não apenas leitura de HTML ou build bem-sucedido.

Para revisão somente documental, conferir referências, âncoras, fontes técnicas e `git diff --check`. Isso valida a documentação; os itens de interface, CLS, performance e produção continuam sem certificação por essa revisão.

Registrar problemas pela prioridade acima, correções feitas e verificações pendentes. A oferta precisa de revisão humana das condições; commit, publicação e deploy seguem a intenção já autorizada na solicitação, conforme `AGENTS.md`. Resultados anteriores ficam no [histórico de validações](../content/historico/decisoes-editoriais.md#2026-09-06--validações-locais-da-infraestrutura-de-serviços).

## Referências técnicas

- [Next.js: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — geração de caminhos; conferir versão instalada antes de adotar APIs novas.
- [Schema.org: Service](https://schema.org/Service) — serviço e executor.
- [Google Analytics: configuração de eventos](https://developers.google.com/analytics/devguides/collection/ga4/events) — eventos e verificação no provedor.
