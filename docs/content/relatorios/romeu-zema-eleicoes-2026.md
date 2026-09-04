# Relatório de transformação — Romeu Zema nas eleições de 2026

## Escopo

- Página criada em `src/app/blog/posts/fundamentos/romeu-zema-eleicoes-2026.mdx`.
- Rota real: `/blog/romeu-zema-eleicoes-2026`.
- A rota sugerida `/eleicoes-2026/candidatos/romeu-zema` não foi duplicada porque o sistema editorial atual publica artigos em `/blog/[slug]`.

## Decisões editoriais

- Aplicados os mesmos oito critérios e pesos dos perfis anteriores.
- Convenção, composição da chapa, registro e deferimento foram tratados como etapas distintas.
- Caixa, fluxo da dívida e estoque foram separados.
- Resultados da gestão foram confrontados com inflação, arrecadação, liminares, RRF, Propag e decisões federais.
- Privatização foi dividida em autorização, modelagem, venda e resultado do serviço.
- Controvérsias foram classificadas como penal, democrática ou administrativa sem equivalência indevida.

## Acréscimos e inferências

- Índice de 61,3/100: diagnóstico 7,0; propostas 5,5; evidências 6,5; fiscal 6,0; viabilidade 5,5; execução 7,5; coerência 5,5; transparência 5,0.
- Cobertura de 80% e confiança média são avaliações editoriais baseadas na existência de balanços e execução estadual, contraposta à falta de vice, coligação e programa federal completo.
- A conclusão de que a solução fiscal é compartilhada decorre dos documentos sobre STF, RRF, Propag e União.

## Limitações

- Pedido de registro, vice e deferimento não foram confirmados na data da pesquisa.
- Não foi localizado programa presidencial completo registrado.
- A pesquisa não constitui auditoria integral dos dois mandatos, contratos ou processos.
- Resultados de privatizações e concessões recentes ainda não possuem maturidade temporal.
- Não foram atribuídas notas temáticas a áreas sem documentação suficiente.

## Componentes

- `QuickSummary` e `NextSteps`, excluídos do limite editorial.
- `SimpleBarChart`, `Reveal`, `NumberedContextList` e `DecisionPoints`: quatro tipos de bloco.
- Nenhum componente ou import novo; nenhuma tabela larga.

## Fontes centrais

- TSE e Agência Brasil para etapa eleitoral.
- Balanço Geral de Minas de 2025 e Secretaria da Fazenda para dívida, RRF e Propag.
- TCE-MG para contas, saúde e alerta de pessoal.
- Documentação legislativa e cobertura convergente para Copasa.
- Agência Brasil para a denúncia apresentada pela PGR.

## Validações pendentes no momento da criação

- TypeScript.
- Build de produção.
- Integridade do diff e resposta HTTP da rota.
