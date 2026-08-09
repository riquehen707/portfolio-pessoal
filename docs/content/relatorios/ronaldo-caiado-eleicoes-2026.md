# Relatório de transformação — Ronaldo Caiado nas eleições de 2026

## Escopo

- Página criada em `src/app/blog/posts/fundamentos/ronaldo-caiado-eleicoes-2026.mdx`.
- Rota real: `/blog/ronaldo-caiado-eleicoes-2026`.
- A rota sugerida `/eleicoes-2026/candidatos/ronaldo-caiado` não foi duplicada porque a arquitetura atual publica artigos em `/blog/[slug]`.

## Decisões editoriais

- Reutilizados metodologia e pesos dos perfis de Lula e Flávio Bolsonaro.
- Status separado em convenção, pedido de registro e deferimento.
- Resultados de Goiás descritos como contribuição provável da gestão, nunca causalidade exclusiva.
- Méritos e limites foram confrontados: segurança, Ideb e contas favoráveis versus tendências anteriores, dívida líquida maior em 2025 e lacunas de avaliação.
- Experiência executiva recebeu peso apenas no eixo próprio; não foi transformada em promessa automática de resultado federal.
- Controvérsia eleitoral de 2024 foi atualizada com a reversão da inelegibilidade pelo TRE-GO e a manutenção de multa por conduta vedada.

## Acréscimos e inferências

- Índice de 66,5/100: diagnóstico 7,0; propostas 5,0; evidências 7,5; fiscal 7,0; viabilidade 6,0; execução 8,0; coerência 6,5; transparência 5,0.
- Cobertura de 82% e confiança média são avaliações editoriais baseadas na disponibilidade de contas, indicadores e plano estadual, contraposta à ausência de programa presidencial completo.
- A avaliação de transferibilidade do “modelo Goiás” é inferência explícita fundamentada na divisão federativa de competências.

## Limitações

- Pedido de registro e deferimento não foram confirmados no TSE durante a pesquisa.
- Não foi localizado programa presidencial completo e registrado.
- Saúde, assistência, ambiente e desenvolvimento regional têm menos indicadores independentes consolidados que segurança, educação e fiscal.
- A pesquisa não é auditoria exaustiva de contratos, ações judiciais ou de cada política dos dois mandatos.

## Componentes

- `QuickSummary` e `NextSteps`, excluídos do limite editorial.
- `SimpleBarChart`, `Reveal`, `NumberedContextList` e `DecisionPoints`: quatro tipos de bloco editorial.
- Nenhum componente ou import novo; nenhuma tabela larga.

## Fontes centrais

- TSE e cobertura da convenção do PSD.
- PSD sobre elaboração do programa.
- TCE-GO, Balanço Cidadão e relatório técnico das contas de 2025.
- Atlas da Violência, reproduzido com escopo explícito pela Agência Brasil Central.
- Relatório de gestão da Seduc-GO e Ideb 2023.
- Decisões e cobertura convergente sobre o processo eleitoral de 2024.

## Validações pendentes no momento da criação

- TypeScript.
- Build de produção.
- Integridade do diff e resposta HTTP da rota.
