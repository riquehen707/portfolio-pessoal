# Relatório de transformação — câmeras nas ruas e nos uniformes

## Entrada e resultado

- Entrada: primeiro prompt do conjunto sobre câmeras, planos de segurança e BRICS.
- Saída: artigo comparativo sobre câmeras corporais, CCTV, reconhecimento facial e leitura de placas.
- Arquivo: `src/app/blog/posts/fundamentos/cameras-ruas-uniformes-policiais-contradicao.mdx`.

## Decisões editoriais

- As posições de Ronaldo Caiado e Flávio Bolsonaro foram verificadas e avaliadas separadamente.
- Não foi atribuída a Flávio a oposição de Caiado às câmeras corporais.
- Quatro tecnologias foram separadas por finalidade, sujeito monitorado, decisão e risco.
- Localização de pessoas, produção de prova e redução de crimes não foram tratados como resultados equivalentes.
- A classificação de coerência não usa nota partidária: Caiado foi classificado como parcialmente incoerente; Flávio, como ainda insuficientemente detalhado.
- O artigo específico já existente sobre bodycams foi resumido e recebeu link interno, evitando duplicação integral.

## Fontes e limites

- Plano Brasil sem Medo: proposta da Muralha Brasileira.
- Governo de Goiás: videomonitoramento com IA, reconhecimento facial e leitura de placas.
- Vídeo da CNN: formulação de Caiado contra câmeras corporais.
- MJSP: Portaria 648/2024.
- FGV e Campbell: evidências sobre câmeras corporais.
- Campbell: CCTV e prevenção de crimes.
- NIST: desempenho e diferenças demográficas em reconhecimento facial.

Não foram localizados no programa eleitoral detalhes completos de retenção, auditoria, contestação e custos. As lacunas foram registradas, não inferidas.

## Componentes utilizados

- `QuickSummary`
- `EditorialTable`
- `DecisionPoints`
- `NextSteps`

Total: quatro tipos de bloco editorial, dentro do limite do repositório.

## Links internos verificados

- `/blog/caiado-cameras-corporais-policiais-evidencias`
- `/blog/ronaldo-caiado-eleicoes-2026`
- `/blog/flavio-bolsonaro-eleicoes-2026`

## Validação executada

- `npx tsc --noEmit`: aprovado.
- `npm run lint`: aprovado, sem erros ou avisos do ESLint.
- `npm run build`: aprovado, com 215 páginas estáticas geradas e a nova rota listada.
- O aviso preexistente do Autoprefixer em `src/app/page.module.scss` não foi causado pelo artigo.
