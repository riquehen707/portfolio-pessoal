# Relatório de transformação — Estratégias de marketing viral

## Contrato editorial

- Linha editorial: presença e aquisição.
- Público: profissionais, criadores e pequenos negócios.
- Problema: planejar compartilhamento sem transformar viralidade em promessa.
- Tese: mensagem, produto, mecanismo e distribuição podem aumentar probabilidades; contexto, timing, rede e acaso continuam condicionando o resultado.
- Próximo passo: executar um teste instrumentado com valor mesmo em escala modesta.

## Estrutura e decisões

- O guia distingue viralidade, tendência, buzz, boca a boca e alcance pago antes das estratégias.
- Motivações de compartilhamento foram explicadas como ações sociais, não como gatilhos universais.
- A matriz cruza compartilhamento e relevância comercial para evitar otimização por alcance vazio.
- O processo termina em decisão explícita de repetir, ajustar ou encerrar.
- Não foram inventadas médias, taxas ideais ou garantias de viralização.

## Casos e limites de inferência

- Spotify Wrapped: mecanismo de personalização, identidade e compartilhamento. Dados de engajamento são declarações da empresa; não demonstram causalidade sobre assinaturas ou crescimento total.
- ALS Ice Bucket Challenge: participação, nomeação e infraestrutura de causa. Participação e arrecadação vêm da ALS Association; formato, contexto, comunidade e mídia não foram isolados causalmente.
- Dropbox: programa atual confirma benefício bilateral e convite mensurável. O texto não reproduz alegações históricas de crescimento sem fonte primária adequada.

## Pesquisa

Fontes consultadas em 8 de agosto de 2026:

- Berger e Milkman, *What Makes Online Content Viral?*: utilidade, interesse, surpresa, emoção e ativação no contexto pesquisado.
- Watts e Peretti, *Viral Marketing for the Real World*: limite de depender de poucos influentes e de cascata espontânea.
- Spotify Newsroom e resultados do quarto trimestre de 2023: desenho do Wrapped e números declarados de participação.
- ALS Association e avaliação da RTI: participação, arrecadação e uso posterior dos recursos.
- Dropbox: regras atuais do programa de indicação.
- CONAR: transparência de publicidade e conexões comerciais.

## Links internos verificados

- `/blog/marketing-de-aquisicao`
- `/blog/termos-de-publicidade`
- `/blog/guia-pratico-como-trabalhar-como-social-media`
- `/blog/o-que-e-marketing`

## Componentes e renderização

- `QuickSummary`: orientação inicial.
- `EditorialTable`: duas comparações em conteúdo filho, compatíveis com a pré-renderização atual e cards no mobile.
- `PracticalExample`: anatomia da campanha hipotética.
- `Callout`: risco de amplificar erro.
- `EditorialChecklist`: revisão executável antes da publicação.
- `NextSteps`: sequência final.

Foram usados quatro tipos de bloco editorial contabilizados (`EditorialTable`, `PracticalExample`, `Callout` e `EditorialChecklist`), além das exceções documentadas.

## Limitações

- Não foi criado componente novo.
- Métricas de compartilhamento privado e atribuição entre dispositivos permanecem incompletas.
- Orientação sobre promoções comerciais é geral e não substitui análise jurídica do mecanismo escolhido.
- A validação visual depende da disponibilidade do navegador integrado; build e artefato estático devem ser conferidos mesmo quando a automação visual não estiver disponível.
