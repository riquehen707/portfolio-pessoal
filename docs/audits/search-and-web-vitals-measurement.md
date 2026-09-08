# Medição de busca e experiência real

## Objetivo do passo 8

Combinar os limites locais do build com sinais reais de experiência. Vercel Speed Insights continua responsável pelos Core Web Vitals; a busca interna agora emite eventos próprios para diagnosticar disponibilidade, latência, consultas sem resultado e qualidade do ranking.

Esta etapa cria a medição. Ela não registra resultados ainda inexistentes nem afirma melhora de experiência antes de haver tráfego suficiente.

## Privacidade

O texto pesquisado não é enviado ao analytics. A medição registra somente comprimento, quantidade de termos, quantidade de resultados e interação com a posição do resultado. Isso permite observar qualidade agregada sem construir um histórico de consultas potencialmente sensíveis.

Nenhum evento inclui nome, e-mail, IP, conteúdo digitado ou identificador pessoal criado pelo site.

## Eventos da busca

| Evento | Momento | Propriedades principais |
| --- | --- | --- |
| `search_open` | abertura do diálogo | `source` |
| `search_index_loaded` | índice disponível | `duration_ms`, `item_count` |
| `search_index_error` | falha de carregamento | `duration_ms` |
| `search_results` | 600 ms após estabilizar a consulta | `query_length`, `query_token_count`, `result_count`, `has_results`, `time_since_open_ms` |
| `search_suggestion_click` | uso de sugestão rápida | `suggestion_position` |
| `search_result_click` | escolha por clique ou teclado | `source`, `result_type`, `result_position`, `match_reason`, `had_query` |

## Indicadores derivados

- disponibilidade do índice: carregamentos bem-sucedidos sobre tentativas;
- latência do índice: distribuição de `duration_ms`, especialmente p75;
- taxa sem resultado: `search_results` com `has_results: false`;
- taxa de seleção: sessões de busca com `search_result_click` sobre aberturas;
- qualidade da ordenação: distribuição de `result_position` nos cliques;
- acessibilidade operacional: proporção de seleções por teclado.

Não existe meta numérica inicial porque ainda não há série histórica. Após volume suficiente, registrar uma janela de referência e definir alertas por regressão, separando falha técnica de consulta legítima sem correspondência.

## Core Web Vitals

`AnalyticsProvider` já monta `@vercel/speed-insights/next` globalmente. Avaliar LCP, INP e CLS por rota e percentil de campo, priorizando:

1. `/`;
2. `/blog/[slug]`;
3. `/filmes`;
4. `/livros` e `/quadrinhos`;
5. fichas `/livros/[slug]` e `/quadrinhos/[slug]`.

Ao revisar a experiência comercial, incluir `/servicos` e as landings/demos afetadas, sem tratar o desempenho de um artigo ou da Home como evidência dessas rotas.

Dados de laboratório ajudam a reproduzir problemas, mas não substituem os percentis de usuários reais. Uma regressão de busca deve ser investigada junto com INP e latência do índice para não confundir ranking ruim com interface lenta.

## Verificação de páginas antes da publicação

Este protocolo sustenta a categoria Técnica dos checklists, inclusive o [checklist comercial](../architecture/service-landing-pages.md#checklist-de-catálogo-e-landing-antes-da-publicação). Registrar URL/versão, ferramenta, dispositivo/viewport, rede, estado de cache, resultado e limitações. Comparações precisam de condições equivalentes; não comparar um servidor de desenvolvimento com um build de produção como se fossem a mesma medição.

- **Estabilidade:** reservar espaço de imagens, fontes e conteúdo assíncrono. Observar a carga e as interações relevantes — filtros, previews, FAQ, demo e CTA persistente — e registrar CLS e deslocamentos que atrapalhem leitura, foco ou toque. Se houver deslocamento relevante, identificar sua causa e corrigir; sem observação/medição, registrar pendência.
- **Performance:** comparar carregamento e interação com a referência da mesma rota, além dos [orçamentos de artefatos](performance-baseline-2026-08-24.md#passo-7--proteção-contra-regressões), cujos limites vigentes pertencem a `config/performance-budget.v1.json`. Uma rota nova precisa de medição inicial. Não aceitar regressão sem explicação nem atrasos que impeçam ler a oferta, usar o CTA ou avaliar a demonstração; se o orçamento não cobre esse comportamento, registrar a lacuna.
- **Campo e laboratório:** usar diagnóstico de navegador/Lighthouse para revisão antes do release e LCP, INP e CLS de campo quando houver dados suficientes. Separar os resultados; falta de tráfego não autoriza inventar percentis nem declarar conformidade de usuários reais. Orçamento de build ou uma nota isolada não certificam a experiência.

Na conclusão, informar o que foi medido, o que foi corrigido e o que ainda não pôde ser verificado. Revisão somente de documentação verifica a existência e coerência deste procedimento, sem aprovar o comportamento das páginas.

## Validação

Em ambiente com analytics habilitado:

1. abrir a busca pelo botão e por teclado;
2. testar uma consulta com resultado e outra sem resultado;
3. escolher resultados por clique e por Enter;
4. confirmar que nenhum payload contém o texto pesquisado;
5. conferir os eventos no painel da Vercel antes de definir metas.
