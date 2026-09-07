# Arquitetura da home de serviços

**Status:** implementada em `/servicos` em 2026-09-07.

`/servicos` deve funcionar como um índice de decisão. Sua função é ajudar a pessoa a reconhecer o que precisa, comparar poucas opções próximas e seguir para uma página individual. Oferta completa, demonstração, processo detalhado, objeções e conversão pertencem a `/servicos/[slug]`.

Esta proposta é subordinada a [site-architecture.md](site-architecture.md) e complementa [service-landing-pages.md](service-landing-pages.md). Ela preserva as rotas e os dois catálogos atuais.

## Diagnóstico do estado atual

Em 2026-09-07, a página publicada em `https://henrique.dog/servicos`:

- responde `200`, possui canonical próprio e está indexável;
- apresenta três modelos de escolha antes do catálogo: público, gargalo e forma de começar;
- reúne seis landings do catálogo novo e seis serviços legados em uma lista única com 12 itens;
- usa cinco seções depois do hero e cerca de 5.700 caracteres de texto no conteúdo principal;
- repete CTAs genéricos como `Ver oferta` e `Entender escopo`;
- prioriza `Fazer a simulação`, mas `/simulacao` responde `307` para `/blog` porque a rota está pausada;
- esconde no mobile terceiros itens, descrições e tags com seletores `nth-child`, reduzindo informação pela posição do item.

O conteúdo atual é cuidadoso ao evitar promessas, mas exige que a pessoa entenda a lógica de consultoria antes de encontrar uma oferta concreta. Público, gargalo e caminho de entrada também descrevem conceitos próximos, criando escolhas redundantes.

## Decisão de arquitetura

A página geral terá uma pergunta principal: **o que você quer resolver agora?** A resposta organiza os serviços por intenção do cliente. Termos técnicos podem aparecer dentro das páginas individuais, depois que a pessoa escolheu um caminho.

Princípios:

- mostrar o catálogo logo depois do hero;
- oferecer uma única taxonomia pública por intenção;
- fazer cada serviço aparecer uma vez na navegação principal;
- manter todos os destinos em links HTML renderizados no servidor;
- usar cards curtos e visualmente distinguíveis;
- revelar preço inicial quando ele ajuda a comparar, sempre mostrando a recorrência;
- não usar depoimentos, números ou provas sem evidência;
- não transformar a home de serviços em uma landing longa;
- não usar como CTA principal uma rota pausada ou que redireciona.

## Ordem proposta

### 1. Hero curto

O primeiro bloco deve conter:

- kicker `Serviços`;
- H1 `Serviços para mostrar seu trabalho e facilitar contatos`;
- uma frase curta explicando que há portfólios, páginas de captação e ajuda para sites e atendimento;
- CTA principal `Ver serviços`, apontando para `#servicos-por-objetivo`;
- CTA secundário `Falar comigo`, apontando para o contato no fim da página.

Não incluir no hero explicação sobre gargalos, três etapas de decisão, ressalva extensa ou detalhes de consultoria. O visitante deve alcançar os cards na primeira rolagem.

### 2. Navegação por intenção

Exibir `Todos` e links de âncora para as intenções que possuem ao menos um serviço publicado:

1. `Todos`
2. `Portfólios`
3. `Captar clientes`
4. `Quero vender`
5. `Validar ideia`, somente quando existir uma oferta publicada nesse grupo

Na primeira versão, esses controles levam à seção correspondente. `Todos` aponta para o início do catálogo. Isso mantém a página utilizável sem JavaScript, evita estado vazio e não esconde ofertas. No mobile, a navegação forma um trilho horizontal com rolagem nativa, alvo de toque de 44 px e foco visível.

### 3. Serviços agrupados em cards

Esta é a seção principal. Cada grupo usa H2, uma frase curta e um trilho horizontal manual de cards. O título fica fora da área rolável e permanece visível enquanto a pessoa percorre o trilho. Cada card contém somente:

- sinal visual consistente;
- nome curto do serviço;
- resultado ou situação atendida em uma frase de até duas linhas;
- indicação breve de público apenas quando necessária para distinguir opções próximas;
- preço inicial, incluindo mensalidade quando houver;
- link contextual `Ver serviço`.

Imagens de demonstração existentes podem ser usadas como miniaturas quando representarem o serviço. Ofertas sem mídia usam um motivo gráfico criado com os tokens do projeto. Fotografias decorativas aleatórias não devem ser adicionadas apenas para preencher a grade.

O componente, seus estados e os campos do modelo estão documentados em [service-card.md](service-card.md). O trilho não usa reprodução automática, paginação ou setas obrigatórias.

### 4. Ajuda para escolher

Depois dos grupos, inserir um bloco compacto para quem ainda não encontrou a opção. Ele deve fazer no máximo três perguntas:

- você precisa apresentar um trabalho ou captar uma demanda?
- já existe um site ou a estrutura começa do zero?
- você quer uma entrega pronta ou primeiro entender o problema?

O bloco termina no CTA `Falar comigo`. Ele não deve tentar reproduzir um diagnóstico completo na página.

### 5. Como funciona

Manter somente um processo comum de três etapas:

1. escolher uma frente ou explicar o caso;
2. alinhar material, escopo e condições;
3. receber uma proposta antes do início.

Prazos, revisões, entregáveis e processos próprios ficam nas páginas individuais.

### 6. CTA final e caminhos de menor compromisso

Usar `Falar comigo` como CTA final. `/servicos/produtos` continua acessível pela navegação global, sem competir com o contato nesse bloco. `/simulacao` só deve voltar a aparecer depois de responder diretamente e ter função confirmada.

Não usar CTA fixo no mobile nesta página. O objetivo do hub é escolha; CTAs persistentes permanecem nas landings de conversão.

## Distribuição inicial das ofertas

| Intenção | Pergunta respondida | Cards principais | Observação |
| --- | --- | --- | --- |
| Apresentar meu trabalho | `Preciso organizar e compartilhar o que faço` | Portfólio para arquitetos; galeria para artistas; portfólio para designers; portfólio para fotógrafos; portfólio para tatuadores | Cinco ofertas específicas do catálogo novo |
| Captar clientes | `Preciso transformar visitas e indicações em contato` | Site para corretores; landing para psicólogas; landing para estética; landing para freelancers; site ou landing sob medida | Cinco ofertas; a opção sob medida vem depois das ofertas específicas |
| Melhorar vendas e operação | `Já tenho presença, mas busca ou atendimento estão travando` | SEO técnico; integrações e automações | A frase do grupo deve evitar prometer aumento de vendas |
| Validar uma ideia | `Ainda não sei se preciso de um projeto completo` | Nenhum serviço publicado atualmente | Não renderizar grupo ou link vazio; `/simulacao` está pausada e `/servicos/produtos` é apoio, não oferta |

A associação é editorial e serve à descoberta. Ela não muda o ID, o slug, o canonical ou a taxonomia interna de cada oferta.

### Sobreposições e categorias a corrigir na comunicação

- `Portfólio para designers` e `Página para vender seu serviço` compartilham parte do público. O primeiro fala de projetos, cases e candidaturas; o segundo, de oferta e captação. Se essa diferença não ficar evidente no card e na landing, as duas ofertas devem ser consolidadas.
- `Site ou landing page sob medida` é uma oferta ampla que se sobrepõe às páginas segmentadas. Ela permanece no fim de `Captar clientes` como saída para casos não atendidos pelos serviços específicos.
- Corretores, psicólogas e estética são variações válidas somente enquanto suas páginas preservarem contexto, objeções e condições próprias. Trocar apenas o nome do público criaria duplicação editorial.
- `SEO técnico` e `Integrações e automações` não garantem vendas. Por isso, o título da seção é `Para melhorar vendas e operação`, mesmo que o rótulo curto da navegação seja `Quero vender`.
- `Validar ideia` ainda não é uma categoria exibível. Uma ferramenta de apoio ou artigo não deve ser promovido a serviço apenas para preencher o grupo.

## O que permanece na página geral

| Informação | Regra na home de serviços |
| --- | --- |
| Nome do serviço | Curto e compreensível sem vocabulário técnico |
| Benefício | Uma frase concreta, sem promessa de resultado |
| Público | Uma linha apenas quando diferencia cards semelhantes |
| Preço | Mostrar valor inicial e recorrência; usar `Sob escopo` quando for a condição real |
| Destino | Link direto para a página individual publicada |
| Processo | Somente as três etapas comuns |
| Ajuda | Um CTA geral para quem não sabe escolher |
| SEO | H1, headings dos grupos, links rastreáveis, metadata e canonical |

## O que sai da página geral

Levar para as páginas individuais:

- descrição extensa do problema;
- lista completa de benefícios e recursos;
- demonstrações grandes e galerias;
- escopo, entregáveis, limites e responsabilidades;
- prazo e quantidade de revisões;
- processo específico de cada serviço;
- FAQ e tratamento de objeções;
- condições de domínio, hospedagem, manutenção e cancelamento;
- prova, cases e depoimentos, quando existirem e forem verificáveis;
- CTA insistente de WhatsApp.

Remover da navegação principal da home:

- os blocos atuais `Para quem`, `Onde entro` e `Caminhos`;
- tags técnicas usadas apenas como decoração;
- a lista linear que mistura ofertas específicas e serviços amplos;
- links repetidos para blog, portfólio e ferramentas em várias seções;
- qualquer caminho indisponível ou que redirecione para outra intenção.

Remover da home significa deixar de exibir ali, não apagar rotas, dados ou conteúdo existente.

## Filtros e comportamento

### Primeira versão

Usar links de âncora para os grupos não vazios, precedidos por `Todos`. É a opção recomendada para o volume atual porque:

- todos os serviços continuam visíveis;
- o navegador preserva compartilhamento e voltar/avançar;
- não existe estado vazio;
- JavaScript não é necessário;
- leitores de tela recebem a mesma lista que os demais visitantes.

### Evolução possível

Se o catálogo ultrapassar aproximadamente 16 ofertas, adotar filtro de seleção única com `Todos` e as quatro intenções. O estado deve ser representado por `?objetivo=apresentar`, continuar renderizando links reais e oferecer contagem de resultados. Não usar seleção múltipla, menus aninhados ou filtro por tecnologia.

No mobile, os chips permitem rolagem horizontal com snap de proximidade. Nenhum card, grupo ou dado necessário à escolha pode ser ocultado com `nth-child`.

### Trilhos horizontais

- usar `overflow-x: auto` e scroll snap nativo;
- exibir aproximadamente 78% da largura disponível por card no mobile, deixando parte do próximo item visível;
- mostrar pouco mais de dois cards a partir de 720 px e pouco mais de três a partir de 1120 px;
- manter todos os cards na ordem do DOM e permitir foco no próprio trilho;
- preservar scrollbar discreta como indicação adicional e compatibilidade com mouse e teclado;
- não mover conteúdo automaticamente nem depender de controles por seta;
- mostrar `Ver todos` apenas quando o grupo tiver pelo menos seis serviços e um destino próprio configurado.

## CTAs

| Papel | Texto recomendado | Destino |
| --- | --- | --- |
| Principal do hero | `Ver serviços` | `#servicos-por-objetivo` |
| Card | `Ver serviço` | `/servicos/[slug]` |
| Ajuda secundária | `Falar comigo` | `#ajuda-escolher` |
| Final | `Falar comigo` | contato geral com assunto contextual |

Evitar `Solicitar orçamento` na home como ação dominante. O pedido específico acontece na landing escolhida; o contato geral serve para orientação. Também evitar `Fazer a simulação` enquanto a rota continuar pausada.

## Compatibilidade com os dados atuais

A implementação deve continuar lendo:

- `getPublishedServiceLandings()` para as ofertas novas;
- `services` de `src/resources/services.ts` para as ofertas legadas;
- `servicesPage` para metadata e canonical;
- `/servicos/[slug]` como destino único de cada serviço.

A camada `src/data/service-hub/index.ts` contém intenção, ordem, nome curto, contexto, benefício e escolha do preview por ID ou slug. Preço, slug e identidade da oferta continuam vindo dos catálogos proprietários. O adaptador falha quando encontra um serviço publicado sem grupo ou um slug repetido, evitando duplicar e esquecer ofertas dentro de `page.tsx`.

A estrutura de renderização é composta por:

- `ServiceHubCatalog`, que reúne navegação e grupos;
- `ServiceIntentNav`, que gera links de âncora para grupos não vazios;
- `ServiceGroupCarousel`, que mantém título e descrição fora do trilho rolável;
- `ServiceCard`, que renderiza cada oferta conforme o contrato documentado.

Os componentes são usados por `/servicos` e também estão disponíveis em `/dev/service-card` apenas no ambiente de desenvolvimento. A prévia continua `noindex` e responde como não encontrada em produção.

Não alterar os dois schemas nesta primeira reorganização. Se a taxonomia por intenção também for necessária em outras superfícies, procurar todos os usos, migrar os registros e então promover `intent` a campo dos contratos.

Uma rota publicada deve aparecer uma única vez no hub. Rascunhos, ofertas em conflito e páginas pausadas ficam fora. Ofertas legadas sobrepostas podem continuar acessíveis por URL enquanto apenas a opção mais clara aparece na navegação principal.

## SEO, analytics e acessibilidade

- manter canonical, Open Graph e um único H1;
- renderizar grupos e cards no servidor;
- usar H2 para intenções e H3 para serviços;
- adicionar `ItemList` ou `CollectionPage` somente com os serviços realmente exibidos;
- manter texto suficiente para explicar a escolha, sem criar blocos para preencher palavras;
- preservar foco visível, alvo de toque adequado e ordem do DOM igual à ordem visual;
- não aninhar link dentro de outro link nem tornar o card inteiro um controle opaco;
- o `page_view` global registra a visita; eventos específicos são `services_intent_select`, `services_card_click` e `services_help_click`;
- payload mínimo: intenção, ID do serviço, posição e origem do clique, sem texto livre ou dado pessoal;
- clique continua sendo intenção de navegação ou contato, não lead confirmado.

## Sistema visual do hub

O sistema usa os tokens globais do site e os restringe localmente em `ServiceHubView`. Ele não cria um segundo tema nem altera outras páginas.

| Elemento | Regra visual |
| --- | --- |
| Superfície | Fundo claro global; cards em branco; nenhuma sombra ou gradiente decorativo |
| Largura | Conteúdo limitado a `78rem`, respeitando o gutter global da página |
| Espaçamento | Intervalos de `12`, `16`, `24`, `48` e `72–120 px`; o espaço entre grupos cresce mais que o espaço interno dos cards |
| Raios | `8 px` para controles e badges; `12 px` para cards; sem painéis excessivamente arredondados |
| Bordas | Linhas neutras de baixo contraste no repouso e contraste maior em hover |
| Tipografia | H1 de `44–92 px`; H2 de `30–48 px`; títulos de card de `23–30 px`; texto corrente de `15–20 px` conforme o papel |
| Amarelo | Restrito à linha do kicker, CTA principal, setas e estado popular comprovado |
| Foco | Contorno de `2 px`, deslocado do componente e visível sobre fundo claro ou amarelo |

### Aplicação por componente

- **Hero:** uma coluna, largura de leitura curta, um H1 forte, uma frase e duas ações. Não recebe imagem decorativa, cards laterais ou prova sem evidência.
- **Filtros:** controles retangulares compactos, com `Todos` em alto contraste e rolagem horizontal no mobile. O alvo mínimo é `48 px`.
- **Títulos de seção:** ficam fora do trilho, usam peso forte e descrição limitada a uma linha curta de contexto.
- **Cards:** superfície branca, borda de `1 px`, raio de `12 px`, preview 16:10 e nenhuma sombra. O hover move o card apenas `2 px` e reforça a borda.
- **Badges:** pequenos retângulos de raio `8 px`; `popular` recebe uma linha amarela somente quando houver evidência no modelo.
- **Preços:** condição em caixa alta discreta e valor com peso forte; implantação e mensalidade permanecem legíveis juntas.
- **CTAs:** ação principal amarela com texto escuro; ações secundárias são links de texto. No mobile, ocupam a largura disponível para uso com uma mão.
- **Carrosséis:** rolagem nativa, scrollbar fina, snap e parte do próximo card visível. Não há sombras nas laterais, setas flutuantes ou movimento automático.
- **Contato final:** bloco delimitado apenas por linhas horizontais, com uma pergunta, uma frase e uma ação. Não repete argumentos das landings.

Em telas até `520 px`, as ações passam a uma coluna, os alvos chegam a `52 px`, os cards ocupam aproximadamente `82vw` e a hierarquia continua completa. Movimento reduzido desativa transições; nenhum hover é necessário para descobrir conteúdo ou ação.

## Critérios de aceite

- o visitante encontra os primeiros cards logo depois do hero;
- existem no máximo duas ações no hero;
- cada serviço publicado e selecionado para descoberta aparece uma vez;
- não há CTA para uma rota que responda com redirecionamento inesperado;
- todos os cards e grupos permanecem disponíveis sem JavaScript;
- preço recorrente nunca aparece como se fosse pagamento único;
- a página não repete FAQ, processo ou escopo das landings;
- nenhum item essencial é escondido no mobile;
- eventos não registram dados pessoais nem contam clique como conversão confirmada;
- canonical, sitemap, headings e links internos permanecem válidos;
- a mudança passa por teste em 320, 390 e 1440 px, teclado, zoom de 200%, TypeScript, lint, build e verificação HTTP.
