# Relatório de transformação — Marketing de aquisição

## Contrato editorial

- Linha editorial: presença e aquisição.
- Público: responsáveis por pequenos negócios e profissionais que associam aquisição a anúncios ou a um canal isolado.
- Ideia central: aquisição conecta público, oferta, mensagem, percurso e canais até uma primeira conversão relevante, preservando viabilidade econômica e capacidade de entrega.
- Próximo passo: conceito de lead, vocabulário de métricas e revisão de retorno.

## Estrutura e decisões

- O briefing foi transformado em artigo completo; não havia texto autoral bruto a preservar, remover ou fundir.
- A definição de aquisição foi apresentada como síntese operacional, pois o evento considerado varia entre usuários, cadastros, compras e contratações.
- As estratégias foram organizadas pelo mecanismo predominante, com funcionamento, adequação, vantagem e limitação em texto editorial.
- `ArticleIndex` não foi usado porque o projeto possui índice automático e documenta o componente como indisponível.
- O mapa de estratégias usa `EditorialComparison`, sem criar um novo componente nem tratar categorias como absolutas.
- O artigo reutiliza `EditorialTable` em três funções; o limite editorial conta tipos, não ocorrências.
- A capa usa o gerador editorial existente. `canonical` foi omitido porque a rota natural já é a canônica.

## Conceitos fundamentados

- O Google Analytics diferencia aquisição de novos usuários da origem de novas sessões, demonstrando a necessidade de declarar escopo.
- O OpenStax relaciona CAC, valor do cliente, retenção e custos de servir na avaliação econômica.
- A Stripe define período de retorno do CAC como o tempo para recuperar o investimento de aquisição por meio do resultado gerado pelo cliente.
- OpenStax diferencia aquisição de novos clientes e retenção dentro da gestão de relacionamento.

## Sínteses didáticas

- Marketing de aquisição foi definido como conjunto de estratégias que conduz novas pessoas da descoberta à primeira conversão relevante.
- Aquisição, leads, vendas, retenção e branding foram separados por objetivo principal, reconhecendo sobreposição organizacional.
- As estratégias foram agrupadas como orgânicas, relacionais, pagas, diretas e intermediadas apenas para orientar escolha.
- A jornada em seis etapas é um modelo de diagnóstico, não um caminho linear obrigatório.

## Interpretações e limitações

- A empresa de organização financeira para clínicas é um exemplo hipotético.
- Não foram oferecidos benchmarks universais para CAC, LTV, conversão ou payback; valores aceitáveis dependem de margem, ciclo e modelo.
- Qualidade do cliente foi tratada como combinação de compatibilidade, resultado econômico, permanência e custo de atendimento.
- Os canais listados podem participar de mais de um mecanismo, e nenhuma estratégia foi apresentada como universalmente superior.

## Componentes escolhidos

- `QuickSummary`: orientação inicial.
- `Definition`: síntese operacional única.
- `EditorialTable`: comparação conceitual, situações e métricas em formato mobile responsivo.
- `EditorialComparison`: mapa não absoluto de mecanismos.
- `PracticalExample`: aplicação contínua em um prestador de serviços.
