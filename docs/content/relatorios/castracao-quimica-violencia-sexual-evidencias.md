# Relatório de transformação — castração química e violência sexual

## Entrada e resultado

- Entrada: primeiro prompt do conjunto sobre castração química, expansão prisional e reconhecimento facial.
- Saída: artigo médico, jurídico e criminológico com a proposta de Flávio Bolsonaro como estudo de caso.
- Arquivo: `src/app/blog/posts/fundamentos/castracao-quimica-violencia-sexual-evidencias.mdx`.

## Decisões editoriais

- “Castração química” foi definida como expressão popular para tratamentos farmacológicos, não cirurgia.
- Plano eleitoral e PL 3.127/2019 foram separados; detalhes do projeto voluntário não foram atribuídos automaticamente à campanha.
- Efeito hormonal, efeito clínico, reincidência registrada e violência populacional foram analisados como perguntas distintas.
- A afirmação de queda de 90% para 3% ou 4% foi atribuída à fala legislativa e confrontada com as limitações da revisão Cochrane.
- Não foram incluídas doses ou orientação clínica.
- A análise constitucional é educacional e registra tensões, sem antecipar decisão judicial.

## Fontes e limitações

- Câmara e Senado: texto, tramitação e debate do PL 3.127/2019.
- Constituição: penas cruéis e integridade física e moral.
- Cochrane: revisão dos ensaios farmacológicos.
- WFSBP: diretriz de tratamento de transtornos parafílicos.
- Revista Bioética/CFM: discussão brasileira sobre consentimento e ética.
- Cobertura do lançamento: reconstrução do plano Brasil sem Medo.

O documento eleitoral público recuperado não especifica voluntariedade, elegibilidade ou protocolo. Essa ausência foi mantida como lacuna.

## Componentes utilizados

- `QuickSummary`
- `EditorialTable`
- `NumberedContextList`
- `NextSteps`

Total: quatro tipos de bloco editorial, conforme o limite do repositório.

## Link interno verificado

- `/blog/flavio-bolsonaro-eleicoes-2026`

## Validação executada

- `npx tsc --noEmit`: aprovado.
- `npm run lint`: aprovado, sem erros ou avisos do ESLint.
- `npm run build`: aprovado, com 214 páginas estáticas geradas.
- O aviso preexistente do Autoprefixer em `src/app/page.module.scss` não foi causado pelo artigo.
