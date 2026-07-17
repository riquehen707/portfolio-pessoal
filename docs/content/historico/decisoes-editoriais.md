# Decisões editoriais

Registre somente decisões permanentes do sistema, com motivo e substituição. Não registrar preferências temporárias de uma pauta.

## 2026-07-16 — Índice manual descontinuado

Motivo:
Duplica o índice automático e aumenta manutenção.

Substituição:
Índice automático lateral no desktop e recolhível após `QuickSummary` no mobile.

## 2026-07-16 — HoverNote descontinuado

Motivo:
Não oferece interação previsível em dispositivos de toque.

Substituição:
`Definition`, nota no texto, glossário por toque ou `Reveal`.

## 2026-07-16 — Sistema único de citações

Motivo:
Dois componentes de citação criavam escolha sem função editorial distinta.

Substituição:
`Quote`, com `emphasis` quando houver necessidade real de destaque.

## 2026-07-16 — Sistema único de conteúdo recolhível

Motivo:
`Collapsible` e `Reveal` cumpriam funções semelhantes.

Substituição:
`Reveal`, incluindo a variante `simple`.

## 2026-07-16 — Diagnóstico unificado

Motivo:
`Diagnostic` e `DiagnosticQuestions` representavam variações do mesmo bloco.

Substituição:
`Diagnostic`, aceitando perguntas simples ou pares de rótulo e valor.

## 2026-07-16 — Componentes genéricos não são expostos no MDX

Motivo:
Combinações livres de layout comprometem consistência e dificultam manutenção mobile.

Substituição:
Componentes editoriais com função e limites definidos.

## 2026-07-16 — Gráficos MDX usam APIs simples

Motivo:
Recharts direto no conteúdo é complexo, verboso e fácil de quebrar.

Substituição:
`SimpleBarChart` e `SimpleLineChart`.

## 2026-07-16 — Limite de quatro tipos de bloco

Motivo:
Preservar identidade, ritmo e simplicidade de produção.

Substituição:
Escolher no máximo quatro tipos de bloco editorial por artigo, além de imagens, `QuickSummary`, `NextSection` e `NextSteps`.

## 2026-07-17 — Destaques são uma seleção curta

Motivo:
Quando muitos artigos usam `featured`, o campo deixa de comunicar prioridade e as superfícies editoriais perdem hierarquia.

Substituição:
Usar `featured` principalmente para hubs e entradas estratégicas, preferindo um por coleção de segmento. `featuredHome` é um subconjunto de `featured`, e a seleção deve ser revista quando ultrapassar 25% do acervo.
