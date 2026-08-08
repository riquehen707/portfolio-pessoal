# Relatório editorial — Data warehouse design

## Escopo e abordagem

- Guia técnico novo, sem texto-base autoral anterior.
- Público: analistas e desenvolvedores com fundamentos de banco, iniciantes em arquitetura analítica.
- Linha editorial principal: tecnologia útil e processo.
- Tese aplicada: perguntas, grão, histórico, qualidade, governança, custo e consumo precedem escolha de plataforma.
- Conceitos duradouros foram separados de mecanismos específicos de BigQuery, Snowflake, Databricks e Microsoft Fabric.

## Fontes e limites

- Kimball Group e *The Data Warehouse Toolkit* sustentam grão, fatos, dimensões, conformidade e SCD.
- Wiley e *Building the Data Warehouse* sustentam o contexto histórico de Inmon. A comparação arquitetural foi escrita com ressalvas e sem tratar os modelos como pacotes incompatíveis.
- Microsoft Learn sustenta ETL versus ELT e a estrutura dimensional em star schema.
- Google Cloud e Snowflake sustentam somente os respectivos comportamentos físicos de particionamento, clustering e micro-partições; não foram generalizados para outros mecanismos.
- Databricks sustenta a descrição de sua arquitetura lakehouse e foi identificada como fonte de fornecedor.
- ANPD sustenta recomendações de segurança e governança de dados pessoais. O texto não oferece aconselhamento jurídico.
- Nenhum benchmark foi incluído.

Data de verificação das fontes on-line: 8 de agosto de 2026.

## Estrutura e componentes

- `QuickSummary`: orientação inicial.
- `MindMap`: fluxo fonte → ingestão → staging → transformação → warehouse → consumo; descrição textual e explicação equivalente no corpo.
- Bloco de código textual: esquema estrela compacto, legível sem imagem.
- `PracticalExample`: erro hipotético de dupla contagem por frete repetido no grão de item.
- `EditorialTable`: decisão, benefício, custo e sinal de uso, com rolagem horizontal no mobile.
- `EditorialChecklist`: perguntas executáveis de descoberta e design.
- `NextSteps`: continuidade editorial sem CTA comercial.

Tipos de bloco editorial contabilizados: `MindMap`, `PracticalExample`, `EditorialTable` e `EditorialChecklist` — quatro. Código Markdown, `QuickSummary` e `NextSteps` não entram no limite documentado.

## Links internos verificados

- `/blog/database-design-patterns`
- `/blog/marketing-orientado-a-dados`

## Inferências editoriais

- O caso da pequena loja e todos os valores de dupla contagem são hipotéticos.
- As recomendações de evolução por evidência são síntese editorial, não prescrição de fornecedor.
- O SQL é didático e deliberadamente neutro; o artigo alerta que constraints e tipos variam entre engines.
- A separação física, lógica e semântica foi introduzida para impedir que decisões de plataforma sejam confundidas com modelo e definição de métricas.
