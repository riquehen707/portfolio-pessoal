# Recomendações e fichas de produtos

Este guia define o fluxo entre o acervo de produtos, as ofertas comerciais e os artigos. A fonte técnica é `src/content/products/productSchema.ts`.

As regras deste documento valem para toda recomendação de produto do site, inclusive listas, guias de compra, páginas temáticas e artigos apoiados por acervos especializados, como leituras. Quando houver oferta da Amazon Brasil, este é o documento autoritativo para pesquisa, ASIN, construção do link e transparência de afiliação.

Apresentar um serviço como produto concreto segue o [padrão de serviços](../../architecture/service-landing-pages.md#serviços-apresentados-como-produtos). Isso não transforma a oferta em uma entidade deste acervo: modelos visuais de um site não são `ProductVariant`, e preços de serviços continuam em seus próprios registros. As regras de imagens e identidade abaixo permanecem específicas dos produtos editoriais.

## Entidades

- `Product` representa o modelo editorial estável: nome, fabricante, linha, categoria, descrição, análise, pontos fortes, limitações, público, relações e fontes.
- `ProductVariant` representa uma versão verificável vendida em determinado mercado. RAM, armazenamento, código de modelo, GTIN e especificações pertencem aqui quando podem variar.
- `ProductOffer` representa uma observação comercial: loja, URL, afiliação, disponibilidade, preço observado e data da consulta.

Preço e estoque nunca pertencem a `Product`. Uma URL da Amazon é uma oferta entre outras possíveis, não a identidade do produto.

### Onde registrar cada informação

| Informação editorial | Entidade e campo |
| --- | --- |
| Nome, slug, categoria, marca, imagem e observações permanentes | `Product`; a marca é referenciada por `manufacturerId` e a imagem usa `mainImage`/`gallery` |
| Modelo comercial exato | `ProductVariant.manufacturerModelNumber` e `name` |
| Especificações principais | `ProductVariant.specifications`; use grupos genéricos enquanto não houver schema especializado |
| ASIN e link de afiliado | `ProductOffer.asin` e `ProductOffer.url` |
| Faixa de preço observada | `ProductOffer.observedPrice` com `checkedAt`; faixas editoriais contextuais podem aparecer em `ProductCard.sensiblePriceRange` |
| Observações da recomendação naquele artigo | propriedades contextuais do `ProductCard`, sem alterar a ficha central |

Para curadorias reutilizáveis, `Product` também pode registrar `subcategory`, `audiences` e `giftOccasions`. Esses campos descrevem classificação e adequação, não uma campanha, e permitem que um mesmo produto apareça em mais de uma seleção sem duplicar o cadastro. `suitableFor` continua reservado à explicação editorial curta; preço, disponibilidade e link permanecem na oferta.

Não crie um objeto paralelo contendo todos esses campos. A separação preserva o modelo quando a variante, a loja, o preço ou a disponibilidade mudarem.

Para câmeras, a variante usa o discriminador `camera` e mantém estruturados formato e tecnologia do sensor, resolução, autofocus, estabilização, vídeo, mount, disponibilidade de lentes, bateria, áudio, gravação interna, codecs e conectividade. Corpo e kit não devem virar produtos distintos quando a câmera é a mesma; a oferta deve deixar claro se inclui lente.

### Peças de PC

Processador, placa-mãe, memória RAM, SSD, fonte, gabinete, placa de vídeo, cooler, monitor e periférico são produtos reutilizáveis do mesmo acervo. Registre cada modelo uma vez em `src/content/products/pcComponents.ts` ou no módulo de domínio correspondente. A configuração completa e o teto de orçamento pertencem ao artigo, não a um novo produto composto.

Nas variantes, priorize os atributos que impedem uma compra incompatível: código de modelo, soquete, geração e padrão de memória, capacidade e quantidade de módulos, interface e formato, potência e conectores, dimensões, revisão, voltagem e conteúdo do kit. Use fontes oficiais para especificações e uma oferta datada somente para preço e disponibilidade.

Os artigos de orçamento podem resumir a montagem em tabela, mas os modelos recomendados devem apontar para os mesmos IDs usados pelos `ProductCard`. Não replique ficha técnica, imagem ou URL comercial no MDX. Componentes genéricos sem modelo fechado, como um gabinete definido apenas por dimensões e ventilação, permanecem critérios de compra no artigo até haver uma recomendação verificável.

Quando a configuração completa for a resposta central do artigo, `PcBuild` pode substituir a tabela e o resumo introdutório. O bloco recebe os IDs permanentes dos produtos, resolve os dados do acervo e calcula o total a partir das ofertas observadas. Use nome e preço manuais apenas para itens ainda descritos como critério de compra ou modelo ainda não normalizado; isso deve continuar visível como pendência editorial, não virar uma ficha paralela.

## Identidade e duplicatas

- IDs são permanentes: `prod_*`, `prod_variant_*` e `prod_offer_*`.
- O slug canônico não muda por conveniência editorial. Slugs antigos entram em `aliases`.
- Antes de cadastrar, pesquise nome, slug, aliases, código de modelo, GTIN, ASIN e URLs de ofertas já registradas.
- Cor só vira variante separada quando altera identificação, imagem ou oferta que precise ser distinguida. Memória, armazenamento, conectividade e mercado devem ser variantes quando as especificações divergem.
- Um produto relacionado aponta por ID; um artigo relacionado aponta por slug publicado.

## Pesquisa e imagens

Use fabricante e documentação oficial como fontes principais. Material de imprensa oficial vem em seguida; varejista confiável serve para confirmar oferta, disponibilidade, variante e faixa de preço e, somente quando juridicamente adequado, para mídia.

Antes de recomendar, confirme que o produto ainda é atual ou explique o contexto de uma geração anterior; verifique nome, fabricante, código de modelo, especificações relevantes, variantes, disponibilidade razoável no Brasil e faixa de preço observada. A seleção editorial acontece antes da busca por monetização. A existência de comissão não torna um produto recomendável nem define sua posição na lista.

Imagens ficam em `public/images/products/` com fonte, crédito, direitos, dimensões e, quando necessário, `variantId`. Não gere aparelhos, mockups ou placeholders imitativos. Uma imagem não pode representar outra cor, mercado ou versão sem indicação.

Produto publicado exige imagem real oficial ou licenciada. Produto incompleto permanece `draft`.

## Artigos

Use `ProductCard` por `productId`. Não copie nome, imagem, ficha técnica ou oferta para o MDX. Todo card editorial exige as sete respostas específicas validadas por `src/components/products/ProductCard.tsx`:

```mdx
<ProductCard
  productId="prod_exemplo"
  whyIncluded="Razão verificável para este produto ocupar esta posição."
  bestFor="Perfil de uso para o qual a combinação de características faz sentido."
  mainDifference="Diferença concreta diante das alternativas comparadas."
  tradeOff="Limite relevante ou aspecto em que um concorrente é superior."
  sensiblePriceRange="Faixa editorial aproximada, com contexto temporal, sem transformar preço em especificação."
  avoidWhen="Situação em que a compra não é recomendada e qual alternativa de critério procurar."
  closestCompetitor="Modelo que disputa a mesma decisão e diferença mais importante."
/>
```

O auditor rejeita ID inexistente ou qualquer uma das sete respostas ausente. Expressões como “bom custo-benefício” precisam ser explicadas por comparação concreta.

## Amazon Brasil e links de afiliado

O identificador oficial do site no Programa de Associados Amazon Brasil é `riquehen-20`.

Uma oferta afiliada da Amazon só pode ser publicada depois de confirmar, na Amazon Brasil, a disponibilidade do item e o ASIN da versão exata recomendada. Confira modelo, geração, capacidade, cor, voltagem, tamanho, edição, quantidade e composição do kit sempre que esses atributos distinguirem a compra. Um ASIN correto para outra variante continua sendo um link incorreto.

Para cada nova oferta:

1. pesquise primeiro o produto, a variante e a oferta no acervo e reutilize os IDs existentes;
2. confirme as especificações na fonte oficial e use a Amazon Brasil para verificar a oferta comercial;
3. extraia o ASIN da página exata e confronte título, fabricante, código de modelo e atributos da variante;
4. registre o ASIN no gerador central; não escreva a URL manualmente;
5. registre varejista, programa, identificador, disponibilidade e data da consulta no `ProductOffer` ou na estrutura equivalente do domínio;
6. registre preço somente como observação datada e aproximada, nunca como característica permanente.

```text
https://www.amazon.com.br/dp/{ASIN}?tag=riquehen-20
```

No catálogo geral, use `amazonBrazilOffer` de `src/content/products/amazonBrazil.ts`. O helper normaliza e valida o ASIN, gera a URL com a tag oficial e preenche varejista, região, programa, identificador e aviso de comissão:

```ts
amazonBrazilOffer({
  id: "prod_offer_amazon_exemplo",
  variantId: "prod_variant_exemplo_br",
  asin: "B012345678",
  availability: "available",
  checkedAt: "2026-09-16",
});
```

O código acima demonstra o contrato, não um ASIN real. Nunca o copie para uma oferta. Estruturas especializadas de outros domínios devem chamar o mesmo gerador de URL ou manter uma equivalência validada que não duplique a tag em arquivos editoriais.

Para uma edição de livro, mangá ou quadrinho já confirmada, use `amazonBrazilReadingOffer` de `src/content/reading/amazonBrazil.ts`. Ele aplica o mesmo ASIN, URL canônica, tag, programa e aviso à `ReadingOffer`; a oferta continua apontando somente para uma edição concreta, nunca para a obra intelectual genérica.

Não invente, deduza por semelhança nem associe um ASIN sem confirmação. Se a pesquisa não permitir confirmar o item exato, mantenha a recomendação sem oferta afiliada e registre a pendência; não transfira ao autor a busca rotineira por um link que pode ser verificado pelas fontes disponíveis.

Novos links diretos devem usar o formato canônico acima, sem parâmetros de busca, sessão, campanha ou navegação como `crid`, `keywords`, `qid`, `sr`, `dib`, `ref` e `linkId`. Não use uma URL de resultados da Amazon para representar um produto específico.

O schema exige `asin` para `retailer: "Amazon Brasil"` e confere URL canônica, programa, tag e aviso. Essa automação só valida formato e consistência interna: ela não descobre o ASIN nem prova que a página corresponde à variante. A confrontação do anúncio continua sendo etapa humana obrigatória.

## Ofertas, preços e independência editorial

- Uma recomendação continua válida sem oferta ativa.
- Oferta indisponível não apaga o produto nem o artigo.
- `observedPrice` é opcional, aproximado e sempre acompanhado de `checkedAt`; preço, desconto e estoque podem mudar depois da consulta.
- `affiliateId` exige `affiliateProgram`.
- Para a Amazon Brasil, use `affiliateProgram` com identificação inequívoca do Programa de Associados, `affiliateId: "riquehen-20"` e `commissionDisclosure` clara.
- Links remunerados usam `rel="sponsored nofollow noreferrer"` e declaração de comissão próxima ao link.
- Não mantenha um produto editorialmente inadequado para preservar monetização.
- Não ordene, inclua ou exclua produtos por comissão, disponibilidade de link ou conveniência do varejista.
- Promoções com prazo só podem aparecer enquanto estiverem vigentes; revise ou remova a menção quando o prazo terminar.

## Divulgação do Programa de Associados

Cada link remunerado precisa ser reconhecível como publicidade ou link de afiliado antes ou junto da ação de compra. O componente de oferta já pode exibir `commissionDisclosure`; use texto direto, como “Link de afiliado: posso receber uma comissão sem custo adicional para você.” Não esconda a informação em tooltip, rodapé distante ou página que o leitor precise procurar.

Além da divulgação por oferta, o site deve manter em local claro e facilmente acessível a identificação exigida pelo programa:

> Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas.

Essa declaração global não substitui o aviso próximo ao link. Antes de publicar ou alterar o padrão, confira o [Contrato Operacional](https://associados.amazon.com.br/help/operating/agreement/), as [Políticas do Programa](https://associados.amazon.com.br/help/operating/policies) e a [orientação de divulgação](https://associados.amazon.com.br/help/node/topic/GHQNZAU6669EZS98), pois texto e requisitos podem mudar.

O componente `ProductOffers` aplica os atributos de relação e renderiza a divulgação registrada na oferta. O schema e `amazonBrazilOffer` validam o formato do ASIN e a composição da URL; a correspondência real entre ASIN e variante e a existência da declaração global continuam sendo verificações editoriais de publicação.

## Publicação

1. Pesquise duplicatas e defina o modelo intelectual do produto.
2. Cadastre ou reutilize o fabricante em organizações.
3. Cadastre variantes exatas e fontes das especificações.
4. Baixe somente imagens permitidas e registre metadados.
5. Registre ofertas separadamente, com data e disponibilidade; para Amazon Brasil, confirme variante, ASIN, tag e divulgação.
6. Escreva a análise permanente do produto.
7. Use o ID nos artigos e escreva a justificativa específica de cada lista.
8. Confira a declaração global do Programa de Associados e a divulgação próxima de cada link remunerado.
9. Rode `npm run audit:content`, TypeScript, lint e build conforme o impacto da mudança.

O índice `/produtos` permanece fora da navegação e com `noindex` enquanto não houver ficha publicada. Ao lançar o primeiro lote, habilite a rota global, inclua produtos publicados no sitemap e na busca, e valide os dados estruturados.
