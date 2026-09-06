# Landing pages de serviços

Padrão para ofertas específicas com uma única conversão principal. Clareza e redução de atrito são objetivos de projeto; alta conversão é resultado a medir, não promessa do template.

## Responsabilidades

| Página | Objetivo | Estrutura |
| --- | --- | --- |
| Artigo `/blog/[slug]` | Aquisição orgânica e educação | MDX, explicação, referências e até um CTA contextual |
| Landing `/servicos/[slug]` | Converter procura por uma oferta específica | Oferta, escopo, condições, objeções e uma ação principal |
| Institucional `/servicos` | Apresentar o catálogo geral | Visão geral e navegação entre frentes de serviço |

Não usar o modelo de artigo para a landing. Não transformar o catálogo numa campanha para todos os públicos. Não criar páginas trocando somente a profissão: público, problema, demonstração, escopo e objeções devem justificar cada URL.

## Arquitetura e compatibilidade

- `src/content/service-landings/serviceLandingSchema.ts`: contrato Zod e tipos, independentes do frontmatter e do tipo legado `ServiceLanding` em `src/types`.
- `src/content/service-landings/landings.ts`: registro de ofertas; inclui os portfólios para fotógrafos, tatuadores e designers, o site profissional para corretores e a galeria virtual para artistas.
- `src/data/service-landings/index.ts`: validação, publicação e resolução por ID/slug; impede IDs repetidos e slugs em conflito com serviços antigos ou `produtos`.
- `src/components/services/landing/`: composição, seções, estilos, SEO e pequenas fronteiras cliente para eventos.
- `src/app/servicos/[slug]/page.tsx`: consulta o novo catálogo e mantém o fluxo legado de `src/resources/services.ts`, incluindo beauty e creative.
- `src/app/sitemap.ts`: acrescenta novas landings publicadas e indexáveis.
- `src/components/services/ServiceCTA.tsx`: ponte editorial exposta em `src/components/mdx.tsx`.
- `/dev/service-landing`: prévia fictícia, `noindex`, disponível com `npm run dev`; responde 404 em produção. `example.ts` não faz parte do catálogo.

Os serviços antigos mantêm seus dados, URLs e apresentação; esta entrega não os certifica como aderentes ao padrão. Migração futura deve remover o registro antigo antes de cadastrar o mesmo slug, preservando a URL e revisando as condições comerciais.

O layout reutiliza `standaloneLandingRoot`: o CSS global oculta Header/Footer institucionais e libera largura. A landing oferece cabeçalho mínimo com identidade e rodapé do executor. Tipografia, cores, providers e analytics continuam compartilhados. Isso evita mover todas as rotas; componentes globais ainda pertencem à árvore entregue. Não há isolamento completo de bundle: medir esse custo antes de campanhas de alto volume.

Texto, CTA, preço e FAQ chegam no HTML do servidor. Links funcionam sem JavaScript e o FAQ usa `details/summary`. As ofertas cadastradas são `/servicos/portfolio-para-fotografos`, `/servicos/site-para-corretores`, `/servicos/portfolio-para-tatuadores`, `/servicos/galeria-virtual-para-artistas`, `/servicos/portfolio-para-designers` e `/servicos/site-para-arquitetos`, todas com pedido de orçamento no WhatsApp existente do site. Não há endpoint de coleta, checkout ou experimento ativo; os formulários descritos são recursos dos sites entregues aos clientes, não mecanismos de conversão destas landings. Cadastro disponível na aplicação local não equivale a deploy.

## Contrato da oferta

Cada registro define `id` permanente, `slug`, `status`, `updatedAt`, `seo`, `provider`, `conversion`, `hero`, `sections`, `finalCTA`, `stickyCTA` e, opcionalmente, `experiment` e `legalLinks`.

- `draft`: indisponível na rota pública, no CTA editorial e no sitemap.
- `published`: acessível e incluído nos parâmetros estáticos. `seo.index` controla indexação separadamente.
- `seo.index: false`: campanha pública fora do sitemap; não é controle de acesso.
- `conversion`: destino único, repetido no hero, oferta, final e mobile. Tipos: `whatsapp`, `quote`, `checkout`, `form`.
- WhatsApp aceita `https://wa.me/` com telefone internacional; orçamento/checkout aceitam HTTPS; formulário usa `#contato`.
- `hero.price`: resumo opcional, coerente com o preço detalhado, inclusive recorrência e condições do “a partir de”.
- Mídia exige caminho local `/images/`, dimensões, alt, legenda, origem e crédito. Confirmar autorização comercial; não reutilizar automaticamente pôsteres/capas editoriais em anúncios. `source` registra procedência, e o crédito aparece na legenda.
- Provas exigem `attribution` e `evidence`. Evidência é referência para revisão humana; não é certificação automática. Não colocar documentos privados ou dados de clientes nesse campo. O componente mostra relato e atribuição.

O schema exige textos preenchidos, IDs de seção/título únicos e processo de 3 ou 4 etapas. `inicio`, `service-title`, `contato`, `contato-title`, `acao-final` e `acao-final-title` são reservados. Publicação exige as seções essenciais abaixo. Prova é opcional: omitir sem material real, em vez de inventar. Executor aparece sempre no rodapé.

`structure` aceita `standard` (também quando omitido) ou `compact`. A estrutura padrão mantém seções de solução e público ideal separadas e demonstração opcional. A compacta usa os campos obrigatórios do hero para público/solução e exige sete seções: problema, benefício, demonstração, entregáveis, processo, preço e FAQ. Com hero e CTA final, forma nove partes. A exceção responde a ofertas curtas e não remove informação essencial nem altera os registros anteriores.

## Estrutura e componentes

Hero abre a página e CTA final encerra a oferta. `sections` controla a ordem intermediária.

| Seção | Conteúdo | Componente |
| --- | --- | --- |
| Hero | Oferta específica, público, benefício observável, subtítulo, preço quando definido, CTA e mídia útil | `ServiceHero` |
| Problema | Poucos parágrafos sobre a situação que trouxe o visitante | `ServiceSectionContent` (`problem`) |
| Solução | Como o serviço atende à situação | `ServiceSectionContent` (`solution`) |
| Benefícios | Ganhos concretos, sem prometer faturamento ou procura | `ServiceBenefits` |
| Entregáveis | Quantidades, limites, formatos, revisões e exclusões pertinentes | `ServiceDeliverables` |
| Demonstração | Captura, exemplo real, antes/depois ou caso de uso; fictícios identificados | `ServiceSectionContent` (`demonstration`), `ServiceImage` |
| Público ideal | Situações e pré-requisitos específicos | `ServiceBenefits` (`audience`) |
| Processo | 3 ou 4 etapas compreensíveis | `ServiceProcess` |
| Oferta/preço | Criação, recorrência, manutenção, domínio e hospedagem separados quando aplicáveis | `ServicePricing` |
| Confiança | Depoimentos autorizados, projetos, números contextualizados, clientes, garantias reais ou executor | `ServiceProof` |
| FAQ | Objeções comerciais independentes | `ServiceFAQ` |
| CTA final | Proposta e ação principal repetidas | `ServiceAction` em `ServiceLandingPage` |

Em `pricing.items`, cada linha tem `label`, `amount`, `cadence` e `details`. Recorrências: `once`, `monthly`, `yearly`, `included`, `on-request`. `terms` explica pagamento, cancelamento, custos de terceiros e limites. Sem preço definido, usar “Sob consulta” e explicar o que será decidido na proposta. Nunca esconder custos necessários à operação.

## Composição e formulários

`hero.layout` aceita `text` ou `split`; duas colunas dependem de imagem ou de `heroVisual` (slot React de servidor) e empilham no mobile. `className` permite uma apresentação específica com CSS escopado; `data-section-type` identifica os wrappers para ajustes locais. Seções usam texto, listas e divisores, sem uma grade de cards obrigatória.

`renderSection(section)` permite corpo especializado, retornando `undefined` para o padrão. O wrapper continua responsável pelo ID e h2. A função é de servidor: não colocar JSX/callbacks no catálogo. Uma demonstração pode combinar duas capturas reais com legendas. Manter conteúdo essencial no HTML e a mesma conversão.

Para formulário, passar `form={<FormularioDoServico />}`. A composição falha se `conversion.kind === "form"` não tiver adaptador. Na primeira oferta desse tipo, integrar a composição na ramificação do novo catálogo em `src/app/servicos/[slug]/page.tsx`. Implementar envio real, validação no servidor, erro, prevenção de duplicação e sucesso acessível. A infraestrutura não inclui endpoint de coleta. O exemplo de dev usa somente texto explicativo, sem enviar dados.

## Copy e UX

Escrever para uma pessoa em uma situação específica. Preferir “Portfólio para tatuadores apresentarem trabalhos e receberem pedidos” a “Transforme sua presença digital”. Explicar resultado e escopo antes de tecnologia. Evitar urgência falsa, promessas de agenda cheia, superlativos vazios e números sem origem.

Seções curtas, títulos informativos e um assunto por parágrafo. Dizer o que o cliente envia, o que pode alterar e quem paga domínio/hospedagem. Não prometer resultados dependentes de atendimento, mídia ou concorrência.

Mobile primeiro: CTA cedo, alvos de pelo menos 48px, campos de 16px, foco visível, imagens dimensionadas e listas de uma coluna. Priorizar demonstração real a decoração. CTA fixo é opcional: reserva espaço final, considera safe area e some em viewport baixo ou com campo focado. Conferir 320px, 390px, desktop, zoom 200%, teclado e teclado virtual; desativar `stickyCTA` se prejudicar conteúdo, consentimento ou interação. Não instalar popups, chat ou scripts extras por padrão.

## SEO e campanhas

`serviceLandingMetadata` gera title, descrição, canonical natural `/servicos/[slug]`, Open Graph e Twitter. UTMs não entram no canonical. JSON-LD `Service` representa nome, descrição e executor visíveis. Não gerar notas, avaliações agregadas ou `Offer` a partir de preço textual composto. FAQ não implica promessa de resultado enriquecido.

Publicada e indexável entra automaticamente no sitemap; não duplicar no objeto estático `routes`. Busca interna e catálogo institucional são escolhas separadas: acrescentar links úteis quando a oferta real for criada. Campanhas podem chegar diretamente, sem depender de visita anterior ao blog.

Antes de Google Ads/Meta Ads, alinhar anúncio e oferta, testar o destino real, definir evento importado como conversão e validar configuração/consentimento do provedor. Conferir UTMs de entrada; não repassar query strings inteiras a destinos ou formulários. Esta entrega não instala pixels nem configura contas de anúncios.

## Analytics

Contrato local de eventos; não são automaticamente reconhecidos como conversões nas plataformas.

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

### Referência concreta: portfólio para fotógrafos

- Dados e oferta: `src/content/service-landings/photographerPortfolio.ts`.
- Composição: `src/components/services/photographers/PhotographerLanding.tsx`; preserva SEO e analytics compartilhados.
- Demonstração: `PhotographyDemo.tsx`, com filtros nativos por botões, estado selecionado e anúncio de resultado; todas as três fotos estão no HTML inicial. A apresentação é ilustrativa, sem resultados ou clientes inventados.
- Mídia: três WebP locais, cerca de 204 KiB no total; fontes, autores e licença em `photographerDemoMedia.ts`. A licença foi verificada nas páginas das fotografias; créditos acessíveis na própria landing.
- Conversão: `Quero meu portfólio` abre o WhatsApp cadastrado com mensagem sobre este serviço e preço. Cliques emitem `service_cta_click` e `service_whatsapp_click`; não disparam conversão confirmada.
- Preço: R$397 de implantação + R$89/mês, sem esconder recorrência. Como hospedagem, domínio, alterações, cancelamento e prazo não foram fornecidos no briefing, ficam explicitamente sujeitos à proposta, sem condições inventadas.
- Descoberta: canonical natural, inclusão automática no sitemap e link no catálogo institucional de serviços. Nenhum artigo ou CTA editorial foi alterado nesta etapa.

### Referência concreta: site para corretores

- Dados e oferta: `src/content/service-landings/realEstateWebsite.ts`; mantém separadas implantação de R$497 e mensalidade de R$119.
- Composição: `src/components/services/real-estate/RealEstateLanding.tsx`; usa os mesmos metadados, JSON-LD, CTAs e eventos do padrão.
- Estrutura: hero e dez seções intermediárias cobrem problema, como o site ajuda, demonstração, imóveis, perfil, canais de contato, entregáveis, processo, preço e FAQ. O CTA final completa as doze partes do briefing.
- Demonstração: `RealEstateDemo.tsx` apresenta um imóvel principal, vitrine, perfil e formulário ilustrativos. Identidade, dados e imóveis são explicitamente fictícios; não há cliente, anúncio, avaliação ou resultado inventado.
- Mídia: três WebP locais com créditos e licença registrados em `realEstateDemoMedia.ts`. As fotografias são exemplos de fachada, interior e condomínio, não imóveis disponíveis.
- Conversão: `Quero meu site` abre o WhatsApp cadastrado com mensagem específica e preço. O formulário mostrado é parte da demonstração do produto; a landing não simula envio nem conta clique como lead confirmado.
- Condições: quantidade de imóveis, atualizações, domínio, hospedagem, manutenção, prazo, tratamento dos dados do formulário e cancelamento ficam explicitamente sujeitos à proposta porque não foram definidos no briefing.
- Descoberta: publicação no registro torna a rota estática, indexável, incluída automaticamente no sitemap e listada no catálogo institucional de serviços.

### Referência concreta: portfólio para tatuadores

- Dados e oferta: `src/content/service-landings/tattooPortfolio.ts`; separa a implantação de R$297 da mensalidade de R$79 e mantém condições não fornecidas sujeitas à proposta.
- Composição: `src/components/services/tattoo-artists/TattooLanding.tsx`; aplica identidade visual própria sem alterar SEO, JSON-LD, CTAs ou eventos compartilhados.
- Estrutura: hero e oito seções intermediárias cobrem problema, solução, benefícios, entregáveis, demonstração, processo em três etapas, preço e FAQ. O CTA final completa as dez partes do briefing.
- Demonstração: `TattooPortfolioDemo.tsx` mostra organização por estilos, galeria, perfil e contato. Identidade, textos de perfil e fotografias são explicitamente ilustrativos, sem trabalho, cliente ou resultado atribuído ao executor.
- Mídia: três WebP locais com dimensões, créditos, páginas de origem e licença registrados em `tattooDemoMedia.ts`. As fotos servem apenas para demonstrar a interface.
- Conversão: `Quero meu portfólio` abre o WhatsApp cadastrado com mensagem específica e preço. Os eventos `service_cta_click` e `service_whatsapp_click` registram a intenção de contato, sem contar clique como lead confirmado.
- Descoberta: publicação no registro torna a rota estática, indexável, incluída automaticamente no sitemap e listada no catálogo institucional de serviços.

### Referência concreta: galeria virtual para artistas

- Dados e oferta: `src/content/service-landings/artistGallery.ts`; separa implantação de R$397 e mensalidade de R$89 e deixa quantidade de obras, coleções e atualizações para a proposta.
- Composição: `src/components/services/artists/ArtistGalleryLanding.tsx`; aplica uma apresentação editorial própria sem alterar SEO, JSON-LD, CTAs e eventos compartilhados.
- Estrutura: hero e dez seções intermediárias cobrem problema, galeria demonstrativa, benefícios, organização, página sobre o artista, contato, entregáveis, processo em três etapas, preço e FAQ. O CTA final completa as doze partes do briefing.
- Demonstração: `ArtistGalleryDemo.tsx` mostra coleções, fichas genéricas, apresentação do artista e contato. Fotografias, identidade e informações são explicitamente ilustrativas, sem autoria artística, disponibilidade, cliente ou resultado inventado.
- Mídia: três WebP locais com dimensões, autores das fotografias, páginas de origem e licença em `artistGalleryDemoMedia.ts`. Pintura, ilustração e escultura aparecem apenas como exemplos de composição.
- Conversão: `Quero minha galeria` abre o WhatsApp cadastrado com mensagem específica e preço. Cliques emitem `service_cta_click` e `service_whatsapp_click`, sem confirmação automática de lead.
- Artigo relacionado: `/blog/como-criar-uma-galeria-virtual-para-divulgar-suas-obras` mantém abordagem editorial e um único `ServiceCTA` ligado ao ID publicado `galeria-virtual-artistas`.
- Descoberta: a landing entra automaticamente no sitemap e no catálogo institucional; o artigo cria o vínculo contextual sem duplicar a oferta.

### Referência concreta: portfólio para designers

- Dados e oferta: `src/content/service-landings/designerPortfolio.ts`; separa implantação de R$297 e mensalidade de R$79 e deixa quantidade e profundidade dos cases para a proposta.
- Composição: `src/components/services/designers/DesignerLanding.tsx`; demonstra projetos e cases por formas criadas em HTML/CSS e mantém SEO, JSON-LD, CTAs e eventos compartilhados.
- Estrutura: hero e oito seções intermediárias cobrem problema, demonstração, benefícios, estrutura do portfólio, entregáveis, processo em três etapas, preço e FAQ. O CTA final completa as dez partes do briefing.
- Demonstração: `DesignPortfolioDemo.tsx` usa três projetos inteiramente fictícios, identificados como exemplos, para representar identidade visual, UI/UX e web design. Não há cliente, pesquisa, processo ou resultado inventado.
- Conversão: `Quero meu portfólio` abre o WhatsApp cadastrado com mensagem específica e preço. Cliques registram intenção em `service_cta_click` e `service_whatsapp_click`, sem confirmação automática de lead.
- Artigo relacionado: `/blog/como-criar-um-portfolio-de-design-para-conseguir-clientes` diferencia projeto e case, orienta seleção e explica decisões sem transformar o texto na oferta. Seu único `ServiceCTA` usa o ID publicado `portfolio-designers`.
- Descoberta: a landing entra automaticamente no sitemap e no catálogo institucional; o artigo cria o vínculo contextual para propostas e candidaturas.

### Referência concreta: site e portfólio para arquitetos

- Dados e oferta: `src/content/service-landings/architectWebsite.ts`; separa implantação de R$497 e mensalidade de R$99 e deixa quantidade de projetos e páginas, revisões, atualizações, domínio, hospedagem, manutenção, prazo e cancelamento para a proposta.
- Composição: `src/components/services/architects/ArchitectLanding.tsx`; aplica uma direção visual arquitetônica sem alterar SEO, JSON-LD, CTAs e eventos compartilhados.
- Estrutura: hero e sete seções intermediárias cobrem problema, projetos demonstrativos, benefícios, entregáveis, processo em três etapas, preço e FAQ. O CTA final completa as nove partes do briefing.
- Demonstração: `ArchitectPortfolioDemo.tsx` mostra categorias, imagens grandes e uma ficha de projeto. As fotografias de banco têm fonte, crédito, licença e dimensões registradas em `architectDemoMedia.ts`; não representam autoria arquitetônica, cliente, localização ou resultado do executor.
- Conversão: `Quero meu portfólio` abre o WhatsApp cadastrado com mensagem específica e preço. Cliques emitem `service_cta_click` e `service_whatsapp_click` como intenção de contato, sem confirmar um lead.
- Artigo relacionado: `/blog/como-montar-um-portfolio-de-arquitetura-profissional` orienta seleção, imagens, plantas, renders, descrição, serviços e formatos; seu único `ServiceCTA` usa o ID publicado `site-arquitetos`.
- Descoberta: a landing entra automaticamente no sitemap e no catálogo institucional; o artigo cria o vínculo contextual sem repetir toda a oferta.

### Passos

1. Consultar arquitetura, este guia e serviços legados. Definir público, problema, escopo, condições e conversão reais.
2. Criar arquivo em `src/content/service-landings/`, tipado pelo novo `ServiceLanding`, começando em `draft`. `example.ts` é referência de estrutura; reescrever o conteúdo fictício.
3. Importar em `landings.ts`. Usar ID permanente e slug curto distinto. A fachada valida também os rascunhos.
4. Preencher hero, seções, executor e SEO. Registrar evidência/autorização e conferir preço do hero contra a oferta completa.
5. Usar temporariamente o registro na prévia de desenvolvimento. Se necessário, fornecer `form`/`renderSection` e integrar a mesma composição à rota pública.
6. Definir `seo.index` e descoberta institucional/editorial. `ServiceCTA` aceita somente IDs publicados.
7. Executar o checklist. Mudar para `published` com oferta aprovada; commit, publicação e deploy exigem solicitação com essa intenção.

## Checklist antes da publicação

- [ ] Serviço, público e benefício claros no hero; CTA aparece cedo.
- [ ] Conteúdo específico, sem clones, experiência inventada ou promessa sem evidência.
- [ ] Entregáveis, limites, esforço do cliente, prazo e condições conferidos.
- [ ] Implantação, recorrência, manutenção, domínio e hospedagem explícitos quando aplicáveis.
- [ ] Demonstrações autorizadas, exemplos fictícios rotulados, provas verificadas ou omitidas.
- [ ] Mesmo destino no hero, oferta, final e mobile; telefone/URL real testado.
- [ ] Formulário integrado, com validação, erros e sucesso confirmado; sem falso envio.
- [ ] Sem overflow em 320/390px ou foco oculto; testar teclado virtual e zoom.
- [ ] Conteúdo e links úteis sem JS; imagens leves e dimensionadas.
- [ ] Title, descrição, canonical, OG, h1 único e hierarquia h2/h3; schema fiel.
- [ ] Draft 404, sitemap/indexação coerentes, exemplo de dev 404 em produção.
- [ ] Eventos vistos no navegador e provedor; falhas/cliques não contam como lead; sem payload pessoal.
- [ ] Hipótese/IDs definidos se houver teste, sem variação aleatória não controlada.
- [ ] `npm run test:service-landings`, `npm run audit:content`, `npx tsc --noEmit`, `npm run lint`, `npm run build` e `git diff --check`.
- [ ] Revisão humana da oferta e solicitação explícita para publicação.

## Validação inicial — 2026-09-06

Infraestrutura validada localmente com nove testes de contrato, renderização e eventos, TypeScript, lint, auditoria de conteúdo, `git diff --check` e build de 570 páginas. Os arquivos de exportação gerados pela auditoria foram preservados no estado anterior à execução.

HTTP em desenvolvimento: prévia 200, um h1, 12 seções, três perguntas em `details`, `noindex` e destino principal único. HTTP com `next start`: prévia e exemplo público 404; `/servicos`, `/servicos/produtos` e `/servicos/websites-profissionais` 200; sitemap 200 sem prévia/exemplo.

A automação de navegador falhou no ambiente com `missing field sandboxPolicy`. Não houve inspeção visual em viewport mobile, medição de performance da primeira oferta real ou verificação no provedor de analytics. Os testes de eventos verificam as funções e payloads localmente. Esses pontos continuam no checklist de cada oferta. Nenhum commit, deploy ou publicação foi realizado nesta etapa.

## Validação do catálogo — 2026-09-06

Com as seis ofertas registradas, 15 testes de contrato, renderização e eventos passaram, assim como TypeScript, lint, auditoria de conteúdo, `git diff --check` e o build de 581 páginas. Em `next start`, a landing para arquitetos respondeu 200 com canonical natural, `index, follow`, um h1, nove partes, quatro CTAs com um único destino de WhatsApp e JSON-LD `Service`; apareceu no sitemap e uma vez no catálogo institucional. O artigo relacionado também respondeu 200 com canonical natural, um h1 e um único `ServiceCTA` para a oferta. As três imagens locais responderam 200. Os arquivos de exportação gerados pela auditoria foram restaurados ao estado anterior à execução.

A conexão de automação visual continuou indisponível no ambiente, portanto não houve inspeção efetiva em 320px, 390px, desktop ou zoom de 200%. As fotografias das demonstrações, inclusive as três usadas pelo site para arquitetos, foram inspecionadas diretamente; responsividade e ausência de overflow ainda precisam da revisão visual prevista no checklist. O provedor de analytics não foi acessado, e cliques no WhatsApp permanecem eventos de intenção, não leads confirmados.

## Referências técnicas

- [Next.js: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — geração de caminhos; conferir versão instalada antes de adotar APIs novas.
- [Schema.org: Service](https://schema.org/Service) — serviço e executor.
- [Google Analytics: configuração de eventos](https://developers.google.com/analytics/devguides/collection/ga4/events) — eventos e verificação no provedor.
