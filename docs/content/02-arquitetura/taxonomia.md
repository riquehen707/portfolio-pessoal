# Taxonomia

O schema técnico em [`postSchema.ts`](../../../src/components/blog/postSchema.ts) é definitivo. Este documento diferencia campos que parecem redundantes.

## Regra geral

Use o menor conjunto de campos necessário. Não preencha sinônimos apenas porque existem. Alguns campos duplicados permanecem por compatibilidade com conteúdo antigo.

## Apresentação editorial

### `format`

Rótulo editorial exibido ao leitor, como `Artigo`, `Guia` ou `Estudo`. É texto livre no schema. Use uma forma curta e reconhecível.

### `type`

Tipo estrutural usado no mapa de conhecimento: `conceito`, `guia`, `checklist`, `estudo de caso`, `pratica`, `comparacao` ou `referencia`.

`format` comunica apresentação; `type` classifica função pedagógica. Eles podem coincidir semanticamente, mas não são intercambiáveis.

### `kind`

Origem ou contexto do conteúdo:

- `client`: relacionado a trabalho de cliente;
- `personal`: experiência ou reflexão pessoal;
- `study`: estudo e síntese de conhecimento.

Não usar `kind` para assunto ou formato.

## Assunto e descoberta

### `category` e `categories`

- `category`: categoria estratégica principal.
- `categories`: principal seguida de categorias secundárias relevantes.

Enquanto os dois campos coexistirem, mantenha `category` igual ao primeiro item de `categories`. Categorias são amplas e estáveis, como `Marketing`, `Design`, `Operação`, `Tecnologia`, `Growth` e `Negócios locais`.

### `tag` e `tags`

- `tag`: marcador principal legado.
- `tags`: marcadores específicos para descoberta e relação entre artigos.

Prefira `tags`. Quando preencher `tag`, repita-o como primeiro item de `tags`. Tags representam conceitos concretos, canais, problemas ou práticas; não recrie categorias como tags sem necessidade.

### `pillar`

Campo legado para agrupamento temático amplo. Não introduzir em artigos novos até que exista uma lista oficial de pilares e uma interface que dependa deles. Nunca usar como substituto improvisado de linha editorial.

## Coleções

A coleção é inferida pela primeira pasta abaixo de `src/app/blog/posts/`. Não existe campo `collection` no frontmatter.

Exemplo: um arquivo em `posts/beleza-estetica/` pertence à coleção `beleza-estetica`.

Coleção representa contexto de público ou acervo. Categoria representa assunto estratégico.

## Mapa de conhecimento

### `area`

Domínio amplo de conhecimento, por exemplo `marketing`, `design` ou `tecnologia`.

### `module`

Conjunto coerente dentro da área, por exemplo `conversao-metricas`.

### `node`

Conceito ou unidade específica ocupada pelo artigo, por exemplo `otimizacao`.

A relação é hierárquica: `area` → `module` → `node`. Não use esses campos como tags de SEO.

Campos complementares:

- `level`: dificuldade;
- `knowledgeStatus`: estado no mapa;
- `essential`: se é base indispensável;
- `prerequisites`: leituras necessárias;
- `unlocks`: leituras liberadas pelo domínio deste conteúdo;
- `related`: relações não hierárquicas;
- `mapVisibility`: onde o conteúdo aparece.

## Datas

- `publishedAt`: publicação original.
- `updatedAt`: última alteração relevante do conteúdo ou da publicação.
- `reviewedAt`: revisão editorial ou factual deliberada; gera aviso visível.

Não preencher `reviewedAt` para correção de pontuação, formatação ou mudança cosmética.

## SEO

- `summary`: resumo editorial e descrição padrão; obrigatório.
- `primaryKeyword`: consulta central, quando houver estratégia de busca.
- `secondaryKeywords`: consultas complementares.
- `keywords`: lista geral aceita pelo sistema; evitar duplicar sem função.
- `canonical`: somente quando a URL canônica não for a URL natural do artigo.

## Exemplo mínimo

```yaml
title: "Como revisar uma oferta antes de investir mais"
slug: "como-revisar-uma-oferta"
summary: "Um roteiro para identificar problemas de oferta antes de aumentar a aquisição."
publishedAt: "2026-07-16"
format: "Guia"
category: "Marketing"
categories: ["Marketing", "Operação"]
tags: ["Oferta", "Conversão"]
type: "guia"
status: "published"
```
