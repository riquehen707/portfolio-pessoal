# Componentes MDX

O catálogo técnico definitivo é [`mdx.tsx`](../../../src/components/mdx.tsx). Componentes removidos do mapeamento não podem ser reintroduzidos por documentação ou exemplo antigo.

## Carregamento técnico

Componentes interativos raros, como gráficos, mapas mentais, galerias, comparadores, conteúdo recolhível e checklists, são divididos em módulos próprios. Os nomes usados no MDX não mudam e a renderização no servidor permanece ativa: o conteúdo essencial continua no HTML, enquanto cada artigo hidrata somente os recursos que realmente utiliza.

Essa divisão é uma decisão de entrega, não uma autorização para esconder conteúdo indispensável em componentes interativos. Texto, contexto, fontes e conclusões devem continuar compreensíveis sem interação.

## Princípio de escolha

Comece com Markdown. Use um componente somente quando ele comunicar uma função editorial distinta. Cada artigo pode usar no máximo quatro tipos de bloco editorial, além de imagens, resumo e próximos passos.

## Orientação

### `ReadingWorkCard`

Apresenta uma obra do acervo central por `workId`. Aceita `variant="compact"` ou `variant="editorial"` e um comentário opcional. Não passe título, autoria, capa, edição ou oferta manualmente no MDX; um ID inexistente interrompe a validação.

```mdx
<ReadingWorkCard workId="read_work_exemplo" variant="editorial" comment="Por que esta obra pertence à seleção." />
```

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
- `CompatibilityChecklist`: checklist interativo agrupado para conferir compatibilidade ou montagem; os rótulos permanecem legíveis sem interação e cada item pode ser marcado por teclado. No MDX, passe os grupos pelo atributo textual `data` em JSON, pois propriedades estruturadas não sobrevivem à pré-renderização atual.
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

### `VisualPrinciplesDemo`

Demonstração estática em HTML e CSS para isolar variáveis de composição sem depender de imagens externas. Aceita `kind="hierarchy"`, `kind="alignment-proximity"` ou `kind="contrast"`, além de `title` e `caption`. Use somente para explicar um princípio visual; não funciona como construtor genérico de layout.

### `AccessibleFormDemo`

Exemplo estático e reutilizável de formulário semântico, construído com os tokens visuais do site. Demonstra rótulos persistentes, instrução associada, preenchimento automático, ordem de foco nativa e ação específica. Use para explicar fundamentos de formulários e acessibilidade; o botão não envia dados e o bloco não representa uma auditoria completa de conformidade.

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

Reservado a casos didáticos em que relações espaciais forem essenciais. Aceita `title` e `description` para nome e alternativa textual. No MDX, passe nós e arestas pelo atributo textual `data` em JSON, no formato `{"nodes": [...], "edges": [...]}`. Em telas pequenas, preserva o tamanho dos rótulos e oferece rolagem horizontal com foco visível; ainda assim, o texto do artigo deve explicar a relação principal sem depender exclusivamente do diagrama.

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
