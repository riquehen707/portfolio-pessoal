# Relatório de transformação — Marketing de afiliados realmente funciona?

## Contrato editorial

- Linha editorial: presença e aquisição.
- Público: iniciantes avaliando marketing de afiliados sem audiência, tráfego ou experiência.
- Problema: distinguir a legitimidade do modelo da expectativa irreal de renda automática.
- Tese: afiliados podem gerar renda quando distribuição, confiança, intenção, adequação e mensuração se conectam; não há garantia individual.
- Próximo passo: executar um teste de 90 dias com escopo e perda controlados.

## Estrutura e acréscimos

- O briefing foi transformado em um guia progressivo: mecanismo, adequação, canais, conteúdo, transparência, métricas, riscos e plano.
- Foi acrescentado um exemplo matemático inteiramente hipotético, identificado como demonstração de fórmula e não como média.
- A comparação de estratégias usa avaliações relativas e declara que custos e maturação variam.
- O FAQ concentra dúvidas independentes que não repetem as seções principais.
- Não foram inventados ganhos médios, experiência pessoal ou garantia de prazo.

## Pesquisa e referências

Fontes consultadas em 8 de agosto de 2026:

- CONAR, Código Brasileiro de Autorregulamentação Publicitária: identificação ostensiva da natureza comercial.
- Secretaria de Comunicação Social da Presidência da República, identificação de conteúdo publicitário: visibilidade imediata e compatibilidade com celular; usada como orientação prática, com seu contexto governamental explicitado.
- Amazon Brasil, contrato e políticas do Programa de Associados: links rastreados, compras qualificadas, ausência de garantia de ganhos, declaração do associado e restrições promocionais.
- Hotmart, regras de atribuição e cookies: modelos configuráveis de atribuição e duração determinada pelo produtor.
- Google Search Central, qualificação de links externos: uso de `rel="sponsored"` para links pagos.
- Google Ads, políticas de publicidade: destinos-ponte, deturpação e alegações irreais de ganho financeiro.

Políticas são instáveis. O artigo evita transformar uma regra de um programa em regra de todo o mercado e orienta nova consulta antes de investir.

## Links internos verificados

- `/blog/como-ganhar-dinheiro-na-internet-de-forma-honesta-e-comprovada`
- `/blog/marketing-de-aquisicao`
- `/blog/guia-pratico-como-trabalhar-com-seo`
- `/blog/guia-pratico-como-trabalhar-como-gestor-de-trafego-pago`

## Componentes

- `QuickSummary`: orientação inicial.
- `EditorialComparison`: quadro funciona/tende a falhar, fornecido como conteúdo filho para sobreviver à pré-renderização atual.
- `EditorialTable`: comparação multidimensional em Markdown; `mobileMode="scroll"` preserva seis colunas e evita propriedades estruturadas descartadas pelo pipeline atual.
- `Callout`: alerta de transparência próximo da orientação aplicável.
- `EditorialChecklist`: avaliação executável do programa.
- `NextSteps`: sequência final.

Foram usados quatro tipos de bloco editorial contabilizados (`EditorialComparison`, `EditorialTable`, `Callout` e `EditorialChecklist`), além das exceções documentadas `QuickSummary` e `NextSteps`.

## Limitações e decisões

- Não foi criado componente novo.
- A inspeção do artefato estático mostrou que arrays passados como propriedades a blocos MDX são descartados na pré-renderização atual. Comparação e tabela foram convertidas para conteúdo filho compatível; o problema sistêmico em artigos antigos ficou fora do escopo.
- Não há link de afiliado no artigo.
- O artigo não oferece aconselhamento contábil ou jurídico individual; requisitos fiscais dependem do caso e do programa.
- A data de publicação também funciona como referência temporal para políticas consultadas, sem preencher `reviewedAt` em um conteúdo novo.
