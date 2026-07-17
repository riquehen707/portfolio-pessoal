# Componentes MDX

O catálogo técnico definitivo é [`mdx.tsx`](../../../src/components/mdx.tsx). Componentes removidos do mapeamento não podem ser reintroduzidos por documentação ou exemplo antigo.

## Princípio de escolha

Comece com Markdown. Use um componente somente quando ele comunicar uma função editorial distinta. Cada artigo pode usar no máximo quatro tipos de bloco editorial, além de imagens, resumo e próximos passos.

## Orientação

### `QuickSummary`

Resumo manual das ideias úteis para decidir se e como ler. Use no início; não repetir o `summary` do frontmatter.

```mdx
<QuickSummary title="O que você precisa saber">
- Primeiro ponto.
- Segundo ponto.
</QuickSummary>
```

### `KeyTakeaway`

Condensa a ideia central em uma frase, com menos destaque que CTA. Preferencialmente uma vez.

```mdx
<KeyTakeaway>A oferta precisa ser compreendida antes de ser promovida.</KeyTakeaway>
```

### `NextSection`

Navegação manual entre grandes partes de artigo extenso.

```mdx
<NextSection href="#como-aplicar" title="como aplicar" />
```

## Explicação e decisão

- `Definition`: define termo indispensável.
- `Insight`: explicita consequência ou leitura não óbvia.
- `Diagnostic`: apresenta perguntas ou pares de sinal e interpretação.
- `DecisionPoints`: organiza critérios de escolha.
- `PracticalExample`: separa aplicação concreta da explicação geral.
- `NumberedContextList`: sequência em que a ordem importa.

Não usar dois componentes para dizer a mesma coisa.

## Risco, contraste e ação

- `Callout`: aviso contextual; variantes `info`, `warning`, `success`, `danger` e `neutral`.
- `CommonMistake` ou `CommonMistakes`: erro recorrente e sua consequência.
- `EditorialChecklist`: verificação executável.
- `EditorialComparison`: contraste textual entre duas opções.
- `EditorialTable`: dados estruturados; no mobile, até três colunas viram cards e tabelas maiores rolam horizontalmente.

## Citação e conteúdo complementar

### `Quote`

Único sistema de citação. Aceita `author`, `source`, `sourceHref`, `authorNote`, `quoteMarks` e `emphasis`.

`emphasis` deve ser raro e não transforma a citação em CTA.

### `Reveal`

Único componente recolhível para conteúdo complementar. Fica fechado por padrão. Use `simple` quando apenas título e conteúdo forem necessários.

### `EditorialFAQ`

Perguntas fechadas por padrão. Use somente quando as perguntas representarem dúvidas reais e independentes; não use como repetição das seções.

## Imagens e dados

### `Figure`

Imagem individual com proporção definida. Aceita `caption`, `source`, `accessedAt` e `sourceHref`.

### `Gallery`

Conjunto de imagens. Cada item aceita seus próprios créditos. Não usar quando a relação for antes/depois.

### `BeforeAfter`

Comparador visual por arraste, toque e teclado, com textos alternativos independentes. Preferir para revisão de interface, design, site ou conteúdo visual.

### `SimpleBarChart` e `SimpleLineChart`

Recebem dados no formato `{ label, value }`. Não escrever Recharts diretamente no MDX.

```mdx
<SimpleBarChart
  title="Contatos por canal"
  valueLabel="Contatos"
  data={[
    { label: "Google", value: 40 },
    { label: "Instagram", value: 25 },
  ]}
  source="Relatório interno"
  accessedAt="16 de julho de 2026"
/>
```

### `MindMap`

Reservado a casos didáticos em que relações espaciais forem essenciais. Evitar em artigos comuns e sempre verificar leitura em tela pequena.

## Continuidade e conversão

- `RelatedArticles`: seleção editorial explícita; o sistema também calcula leituras relacionadas automaticamente.
- `NextSteps`: sequência final e, opcionalmente, ação principal e secundária.
- `ArticleCTA`: CTA comercial contextual e inline; no máximo um por artigo.
- `PillarBadge` e `CategoryBadge`: shortcodes de taxonomia; usar somente quando o texto realmente precisar de navegação contextual.

## Componentes indisponíveis

Não usar ou reintroduzir:

- `ArticleIndex`;
- `HoverNote`;
- `FeaturedQuote`;
- `Collapsible`;
- `DiagnosticQuestions`;
- componentes genéricos Once UI dentro do MDX;
- API bruta do Recharts.

As substituições são, respectivamente: índice automático, nota textual/`Definition`/`Reveal`, `Quote`, `Reveal`, `Diagnostic`, blocos editoriais e gráficos simples.
