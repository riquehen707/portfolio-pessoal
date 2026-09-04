# Relatório de transformação — Principal Component Analysis

## Origem e contrato editorial

- Entrada: pauta técnica detalhada fornecida em 1º de agosto de 2026.
- Linha editorial inferida: Tecnologia útil e processo, com função complementar de fundamentos e repertório.
- Objetivo: explicar a formulação, o uso e a interpretação de PCA sem confundir variância com informação geral ou redução com benefício automático.
- Público inferido: leitores com noções iniciais de estatística e programação, sem pressupor domínio de álgebra linear avançada.
- Tese preservada: PCA constrói componentes lineares não correlacionadas, ordenadas pela variância; sua utilidade depende da pergunta, da escala, dos dados e da validação.

## Transformações estruturais

- A pauta foi reorganizada em quatro movimentos: vocabulário e geometria; formulação e interpretação; implementação e riscos; critérios de decisão.
- Repetições sobre variância, perda, escala, predição e interpretação foram fundidas sem remover as ressalvas solicitadas.
- As equações foram apresentadas em blocos textuais com Unicode porque o projeto não possui KaTeX, MathJax ou plugin MDX para matemática. Não foi alterada a arquitetura para introduzir uma dependência permanente por causa de um artigo.
- Não foi criado componente interativo: a pauta o define como condicional, e implementar uma visualização PCA acessível exigiria comportamento, teclado, alternativa textual e testes próprios. A explicação geométrica e o gráfico simples sustentam a tese sem depender de interação.
- `ArticleIndex` não foi usado porque é indisponível; o índice é automático por `toc: true`.

## Pesquisa e verificação

- Pearson (1901): referência histórica para subespaços de melhor ajuste.
- Jolliffe e Cadima (2016): revisão acadêmica para definição, usos, limitações e extensões.
- NIST/SEMATECH: suporte para autovalores, variância, correlação e convenções interpretativas.
- Documentação oficial do scikit-learn: confirmou que `PCA` centraliza, não escala automaticamente, utiliza SVD, expõe `components_` como `(n_components, n_features)`, calcula `explained_variance_` com `n_samples - 1` e oferece `inverse_transform`.
- Documentações de `StandardScaler` e `Pipeline`: sustentam o exemplo de pré-processamento e reutilização dos parâmetros aprendidos.
- Não foram apresentadas métricas de desempenho ou resultados empíricos universais.

## Dados e exemplos editoriais

- O gráfico 61%, 24%, 10% e 5% é explicitamente hipotético e soma 100%; as duas primeiras componentes acumulam 85%.
- As fórmulas de PC1 e PC2 são hipotéticas e servem apenas à interpretação de sinais e magnitudes.
- O exemplo das métricas de páginas não afirma resultados observados nem inventa um conjunto de dados.
- O código reproduz a orientação e a sequência documentadas pelo scikit-learn.

## Componentes escolhidos

- `QuickSummary`: quatro limites fundamentais.
- `Definition`: definição única solicitada.
- `EditorialTable`: comparações semânticas, convertidas em cartões no mobile.
- `SimpleBarChart`: exemplo de variância explicada com legenda textual completa.
- `PracticalExample`: análise contextualizada de métricas de páginas.

Foram usados quatro tipos de bloco editorial além de `QuickSummary`, dentro do limite do projeto.

## Referências adicionadas

- `https://doi.org/10.1080/14786440109462720`
- `https://pmc.ncbi.nlm.nih.gov/articles/PMC4792409/`
- `https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc551.htm`
- `https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html`
- `https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html`
- `https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html`

## Limitações e dúvidas

- Blocos de código preservam legibilidade e cópia das equações, mas não oferecem semântica MathML.
- O gráfico depende de Recharts já existente; a legenda textual contém todos os valores para não tornar a cor ou o tooltip indispensáveis.
- Não há artigos internos sobre álgebra linear, estatística ou machine learning que constituam pré-requisito real.
- Nenhuma dúvida editorial impede a publicação.
