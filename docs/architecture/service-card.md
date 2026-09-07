# Card reutilizável da home de serviços

**Status:** componente e composição em carrosséis usados pela página pública `/servicos`.

O `ServiceCard` apresenta uma oferta no índice geral e leva para sua landing. Ele não substitui o card interno, a demonstração ou o CTA de `/servicos/[slug]`.

## Arquivos

- componente: `src/components/services/hub/ServiceCard.tsx`;
- estilos: `src/components/services/hub/ServiceCard.module.scss`;
- contrato: `src/content/service-hub/serviceHubCardSchema.ts`;
- adaptador dos catálogos: `src/data/service-hub/index.ts`;
- composição: `ServiceHubCatalog`, `ServiceIntentNav` e `ServiceGroupCarousel` em `src/components/services/hub/`;
- estados de desenvolvimento: `/dev/service-card`, disponível apenas com `npm run dev`.

## Hierarquia fixa

1. preview visual;
2. nome do serviço;
3. público ou contexto;
4. benefício principal limitado a duas linhas;
5. preço;
6. CTA `Ver serviço`.

O card inteiro é um único link com nome acessível `Ver serviço: [título]`. O CTA visível deixa o destino claro e evita links aninhados.

## Campos do modelo

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `id` | string | sim | ID estável em kebab-case; usado em analytics e adaptação do catálogo |
| `slug` | string | sim | slug existente; o componente gera `/servicos/[slug]` |
| `intent` | enum | sim | `present-work`, `capture-clients`, `sell-operate` ou `validate-idea` |
| `title` | string | sim | até 56 caracteres; nome curto em linguagem do cliente |
| `context` | string | sim | até 80 caracteres; público ou situação, sem lista de segmentos |
| `benefit` | string | sim | até 120 caracteres e duas linhas visuais; uma frase curta com consequência concreta |
| `price.label` | string | sim | até 28 caracteres; por exemplo `A partir de` ou `Implantação + mensalidade` |
| `price.value` | string | sim | até 80 caracteres; preserva recorrência e condições essenciais |
| `badge` | objeto | não | rótulo de até 28 caracteres e tipo `highlight` ou `popular` |
| `badge.evidence` | string | condicional | obrigatório para `popular`; referência verificável, não exibida no card |
| `preview` | união | sim | imagem real ou fallback gráfico editorial |

### Preview com imagem

`preview.kind: image` exige `src` local iniciado por `/images/`, `alt`, dimensões reais e posição `center` ou `top`. A imagem deve representar o tipo de página ou trabalho vendido, com autorização e procedência mantidas no catálogo proprietário.

### Preview sem imagem

`preview.kind: fallback` exige `label` curto e um tom entre `gold`, `forest`, `clay` e `slate`. O componente desenha uma pequena página com CSS. O fallback não inventa projeto, cliente ou resultado.

## Badge

O badge é opcional e não reserva espaço quando ausente. `highlight` indica curadoria da página. `popular` admite textos como `Mais procurado`, mas o schema exige `evidence`; analytics, contratos ou outro registro verificável precisam sustentar a afirmação antes da publicação.

Não usar badges para simular urgência, desconto ou disponibilidade.

## Estados

| Estado | Comportamento |
| --- | --- |
| Imagem | ocupa proporção 16:10, usa `object-fit: cover` e alt descritivo |
| Fallback | mantém a mesma proporção e hierarquia sem depender de mídia |
| Com badge | posiciona um rótulo discreto sobre o preview |
| Sem badge | não deixa lacuna no layout |
| Hover | reforça borda e desloca a seta apenas em dispositivos com ponteiro preciso |
| Foco | exibe o focus ring compartilhado pelo projeto |
| Movimento reduzido | remove transições do card, da imagem e da seta |

Não existe estado desabilitado: ofertas indisponíveis devem ficar fora do hub. Preço desconhecido usa uma condição real como `Sob escopo`; não se oculta a área de preço.

Visualmente, o card usa superfície branca, borda neutra de `1 px`, raio de `12 px` e nenhuma sombra. O preview e a informação são duas áreas claras da mesma peça. Amarelo aparece somente na seta do CTA e no sinal de um badge `popular` comprovado.

## Responsividade

O componente não define sua largura no catálogo. Ele ocupa toda a célula recebida e mantém altura uniforme; o `ServiceGroupCarousel` define quantos cards aparecem e preserva parte do próximo item como indicação de continuidade.

- acima de 1120 px: o trilho mostra pouco mais de três cards;
- entre 720 e 1119 px: o trilho mostra pouco mais de dois cards;
- até 719 px: cada card usa até 78% da largura da viewport;
- até 420 px: preço e CTA passam a linhas separadas;
- título, contexto e benefício usam clamp de duas linhas;
- o CTA mantém alvo mínimo de 44 px;
- nenhum conteúdo é removido por `nth-child`.

## Analytics

O link expõe atributos para o `AnalyticsProvider` existente:

- evento `services_card_click`;
- `service_id`;
- `intent`;
- localização `services_hub_card`;
- `href` coletado pelo provider.

O evento registra navegação para a landing. Ele não representa lead ou contratação.

## Integração no catálogo

O adaptador valida cada item com `serviceHubCardSchema` e compõe os campos a partir dos dois catálogos atuais. Preço, slug e identidade da oferta continuam pertencendo ao registro original; o adaptador acrescenta somente intenção, nome curto, contexto, benefício e escolha do preview.

`/servicos` usa o adaptador e os componentes conforme a organização descrita em [services-hub.md](services-hub.md).
