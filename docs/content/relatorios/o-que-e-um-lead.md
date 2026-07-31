# Relatório de transformação — O que é um lead?

## Contrato editorial

- Linha editorial: fundamentos e repertório.
- Público: leitores que encontram métricas de leads em marketing e vendas, mas ainda confundem contato, interesse e oportunidade.
- Ideia central: gerar leads significa identificar interesse relevante e desenvolver uma relação proporcional ao perfil e ao momento, não acumular dados de contato.
- Próximo passo: vocabulário de marketing, análise de retorno e aplicação à captação imobiliária.

## Estrutura e decisões

- O briefing foi convertido em artigo completo; não havia texto autoral bruto a preservar, remover ou fundir.
- Foi adotada uma definição operacional explícita, porque fontes e ferramentas não usam `lead` de maneira universal.
- `ArticleIndex` não foi usado: o índice do projeto é automático e o componente está documentado como indisponível.
- A jornada foi mantida como lista ordenada em Markdown. Um componente específico não acrescentaria informação nem acessibilidade.
- `EditorialTable` substitui `ConceptComparison` e já oferece versão em cards no mobile.
- A capa reutiliza o gerador editorial existente; nenhuma imagem genérica foi adicionada.
- `canonical` foi omitido porque a rota natural `/blog/o-que-e-um-lead` já é canônica.

## Definições fundamentadas

- Salesforce descreve lead como pessoa ou empresa identificável dentro do ecossistema comercial, sujeita a qualificação.
- Salesforce relaciona qualificação a perfil, necessidade, interesse e barreiras como orçamento, autoridade e momento.
- Oracle registra que a definição depende do processo da organização e que `fit` e intenção são centrais para separar consultas e leads prontos para vendas.
- Oracle descreve nutrição como desenvolvimento de leads que ainda não estão prontos para comprar.

## Simplificações didáticas

- A definição do artigo combina identificação, interesse relevante e possibilidade de progressão comercial. Ela não é atribuída literalmente a uma fonte.
- Visitante, seguidor, contato, lead, lead qualificado, oportunidade e cliente foram separados pela informação conhecida e pelo próximo passo possível.
- Gerar, qualificar, nutrir e converter foram diferenciados pela função exercida na relação.
- A jornada em sete etapas é um modelo de leitura, não um funil obrigatório ou linear.

## Interpretações e limitações

- Marina e a clínica são um exemplo hipotético, não um caso documentado.
- O artigo não adota pontuações universais de MQL ou SQL; critérios precisam corresponder à oferta e ao processo de cada organização.
- Possuir dados não foi tratado como prova de interesse, intenção ou permissão irrestrita de contato.
- Não foram incluídas médias de conversão, pois variam por mercado, oferta, canal e definição de etapa.

## Componentes escolhidos

- `QuickSummary`: orientação inicial.
- `Definition`: definição operacional única.
- `EditorialTable`: comparação semântica com adaptação mobile.
- `EditorialComparison`: volume versus qualidade.
- `PracticalExample`: jornada contínua de Marina.
