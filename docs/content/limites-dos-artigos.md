# Limites dos artigos

## Regra principal

Cada artigo usa no máximo quatro tipos de bloco editorial, além de imagens, `QuickSummary` e `NextSteps`.

Escolha os blocos pelo papel que cumprem. Não use dois componentes diferentes para comunicar a mesma ideia.

## Estrutura recomendada

1. Título e resumo da página.
2. `QuickSummary` manual.
3. Índice móvel automático e recolhível.
4. Texto dividido por títulos `##`.
5. No máximo quatro tipos de bloco editorial.
6. `NextSection` somente em artigos extensos.
7. Um CTA principal.
8. `NextSteps` no encerramento.

## Limites visuais

- Não usar mais de dois blocos visuais consecutivos sem um parágrafo normal entre eles.
- Usar `KeyTakeaway` apenas uma vez para a ideia central.
- Reservar `MindMap` para explicações realmente didáticas.
- Usar `BeforeAfter` quando a comparação visual for mais clara que duas imagens separadas.
- Preferir links comuns para ações secundárias.
- Manter FAQ, índice e conteúdo complementar fechados por padrão.
- Tabelas com até três colunas viram cards no mobile; tabelas maiores usam rolagem horizontal.

## Imagens e dados

Imagens, comparadores e gráficos devem informar, quando aplicável:

- `caption`: o que está sendo mostrado;
- `source`: nome da fonte;
- `accessedAt`: data da consulta;
- `sourceHref`: link da referência.

Use uma proporção explícita nas imagens para evitar deslocamento da página durante o carregamento.

## Atualização relevante

Use `reviewedAt` no frontmatter somente quando o conteúdo tiver sido efetivamente revisado:

```yaml
reviewedAt: "2026-07-16"
```

Alterar apenas pontuação, ortografia ou formatação não justifica o aviso de revisão.

## Exemplos

```mdx
<KeyTakeaway>
  O preço precisa cobrir a execução e também o trabalho invisível.
</KeyTakeaway>

<NextSection href="#como-calcular-seu-preco" title="como calcular seu preço" />

<BeforeAfter
  beforeSrc="/images/site-antes.jpg"
  beforeAlt="Página anterior com hierarquia pouco clara"
  afterSrc="/images/site-depois.jpg"
  afterAlt="Página revisada com hierarquia e ação principal visíveis"
  caption="Comparação da página inicial antes e depois da revisão."
  source="Arquivo do projeto"
  accessedAt="16 de julho de 2026"
/>
```
