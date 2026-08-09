# Relatório de transformação — Lula nas eleições de 2026

## Contrato editorial

- Entrada: pauta detalhada anexada pelo usuário.
- Linha editorial: fundamentos e repertório.
- Formato: estudo de caso eleitoral datado.
- Data de corte: 8 de agosto de 2026, 16h30 BRT.
- Objetivo: avaliar continuidade, resultados, propostas e capacidade de execução sem recomendação de voto.

## Decisões de arquitetura

- A rota solicitada `/eleicoes-2026/candidatos/lula` não foi criada porque o sistema atual publica MDX somente em `/blog/[slug]` e ainda não existem índice, metodologia ou perfis irmãos da série.
- A página foi integrada como `/blog/lula-eleicoes-2026`, preservando descoberta, sitemap, busca e schema existentes.
- Não foi definido `canonical` alternativo para uma URL inexistente.
- Breadcrumb e navegação da série aparecem textualmente, sem links quebrados.
- Não foi criada fotografia nem retrato artificial. A capa usa o gerador editorial existente apenas com tipografia.

## Pesquisa e limites

- Confirmados: escolha partidária, indicação de Geraldo Alckmin, regras de registro do TSE, diretrizes partidárias e principais séries oficiais.
- O protocolo da candidatura foi noticiado em 8 de agosto, mas não foi localizada decisão do TSE deferindo o registro na data de corte.
- A composição completa da coligação e o programa final registrado não estavam suficientemente acessíveis para afirmação definitiva.
- Ausência documental reduziu cobertura e confiança; não foi convertida em nota zero.

## Diagnóstico numérico

- Diagnóstico: 7,5 × 15%.
- Concretude: 5,5 × 15%.
- Evidências: 6,5 × 15%.
- Viabilidade fiscal e econômica: 4,5 × 15%.
- Viabilidade jurídica e política: 6,0 × 15%.
- Execução: 7,0 × 10%.
- Coerência: 6,0 × 10%.
- Transparência: 4,5 × 5%.
- Resultado: 60,25, arredondado para 60,3/100.
- Cobertura documental: 78%.
- Confiança: média.

## Componentes utilizados

- `QuickSummary`: conclusão inicial.
- `SimpleBarChart`: notas dos oito eixos, com valores também descritos em texto.
- `Reveal`: justificativa metodológica extensa, fechada por padrão.
- `DecisionPoints`: avaliação temática vertical.
- `NumberedContextList`: perguntas ainda sem resposta.
- `NextSteps`: continuidade, excluído do limite editorial segundo as regras.

Não foram criados componentes nem usadas tabelas largas.

## Alterações e inferências

- Título SEO, slug compatível, metadados, taxonomia, FAQ, nota e cobertura foram inferidos da pauta e da pesquisa.
- Resultados nacionais foram descritos com fatores concorrentes; não foram atribuídos exclusivamente à Presidência.
- Promessas foram classificadas com ressalvas sobre execução e dependência do Congresso.
- As críticas incluem defesa do governo e limite da defesa.

## Links internos verificados

- `/blog/decisoes-monocraticas-eleicao-2026`
- `/blog/hannah-arendt`

## Próxima atualização necessária

Confirmar no DivulgaCandContas número do processo, coligação, status do registro e programa final. Recalcular apenas eixos materialmente afetados e registrar nota anterior, nota nova e justificativa.
