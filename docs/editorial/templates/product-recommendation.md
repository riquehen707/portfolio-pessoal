# Recomendações e fichas de produtos

Este guia define o fluxo entre o acervo de produtos, as ofertas comerciais e os artigos. A fonte técnica é `src/content/products/productSchema.ts`.

## Entidades

- `Product` representa o modelo editorial estável: nome, fabricante, linha, categoria, descrição, análise, pontos fortes, limitações, público, relações e fontes.
- `ProductVariant` representa uma versão verificável vendida em determinado mercado. RAM, armazenamento, código de modelo, GTIN e especificações pertencem aqui quando podem variar.
- `ProductOffer` representa uma observação comercial: loja, URL, afiliação, disponibilidade, preço observado e data da consulta.

Preço e estoque nunca pertencem a `Product`. Uma URL da Amazon é uma oferta entre outras possíveis, não a identidade do produto.

## Identidade e duplicatas

- IDs são permanentes: `prod_*`, `prod_variant_*` e `prod_offer_*`.
- O slug canônico não muda por conveniência editorial. Slugs antigos entram em `aliases`.
- Antes de cadastrar, pesquise nome, slug, aliases, código de modelo e GTIN.
- Cor só vira variante separada quando altera identificação, imagem ou oferta que precise ser distinguida. Memória, armazenamento, conectividade e mercado devem ser variantes quando as especificações divergem.
- Um produto relacionado aponta por ID; um artigo relacionado aponta por slug publicado.

## Pesquisa e imagens

Use fabricante e documentação oficial como fontes principais. Material de imprensa oficial vem em seguida; varejista confiável serve para oferta e, somente quando juridicamente adequado, para mídia.

Imagens ficam em `public/images/products/` com fonte, crédito, direitos, dimensões e, quando necessário, `variantId`. Não gere aparelhos, mockups ou placeholders imitativos. Uma imagem não pode representar outra cor, mercado ou versão sem indicação.

Produto publicado exige imagem real oficial ou licenciada. Produto incompleto permanece `draft`.

## Artigos

Use `ProductCard` por `productId`. Não copie nome, imagem, ficha técnica ou oferta para o MDX. Todo card editorial exige seis respostas específicas:

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

## Ofertas e transparência

- Uma recomendação continua válida sem oferta ativa.
- Oferta indisponível não apaga o produto nem o artigo.
- `observedPrice` é opcional e sempre acompanhado de `checkedAt`.
- `affiliateId` exige `affiliateProgram`.
- Links remunerados usam `rel="sponsored nofollow"` e declaração de comissão próxima ao link.
- Não mantenha um produto editorialmente inadequado para preservar monetização.

## Publicação

1. Pesquise duplicatas e defina o modelo intelectual do produto.
2. Cadastre ou reutilize o fabricante em organizações.
3. Cadastre variantes exatas e fontes das especificações.
4. Baixe somente imagens permitidas e registre metadados.
5. Registre ofertas separadamente, com data e disponibilidade.
6. Escreva a análise permanente do produto.
7. Use o ID nos artigos e escreva a justificativa específica de cada lista.
8. Rode `npm run audit:content`, TypeScript, lint e build.

O índice `/produtos` permanece fora da navegação e com `noindex` enquanto não houver ficha publicada. Ao lançar o primeiro lote, habilite a rota global, inclua produtos publicados no sitemap e na busca, e valide os dados estruturados.
