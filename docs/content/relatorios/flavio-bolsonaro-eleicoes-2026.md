# Relatório de transformação — Flávio Bolsonaro nas eleições de 2026

## Escopo

- Página criada em `src/app/blog/posts/fundamentos/flavio-bolsonaro-eleicoes-2026.mdx`.
- Rota real do projeto: `/blog/flavio-bolsonaro-eleicoes-2026`.
- A rota sugerida `/eleicoes-2026/candidatos/flavio-bolsonaro` não foi criada porque a arquitetura atual publica artigos somente em `/blog/[slug]`; duplicar a página criaria duas URLs para o mesmo conteúdo.

## Decisões editoriais

- Mantida a metodologia e os pesos do perfil de Lula para permitir comparação.
- Status descrito por etapas: escolha em convenção e vice anunciado; pedido de registro e deferimento não confirmados na data de corte.
- Propostas separadas por origem: fala direta, plano da candidatura, produção de assessor, proposição legislativa e posição compartilhada com o grupo.
- Ausência de experiência executiva tratada como menor evidência, não como zero nem como falha automática.
- Controvérsia da rachadinha descrita com denúncia, anulação de provas, rejeição/arquivamento e negativa do senador; nenhuma acusação foi apresentada como fato provado.

## Acréscimos e inferências

- O índice de 47,0/100 é cálculo editorial com oito critérios: diagnóstico 5,5; propostas 4,5; evidências 4,5; fiscal 4,0; viabilidade 5,0; execução 4,5; coerência 5,5; transparência 3,5.
- A cobertura de 72% e a confiança baixa são avaliações editoriais decorrentes da ausência de programa nacional completo, custos e equipe formal.
- A análise de autonomia é inferência apoiada no contraste entre o plano setorial de segurança, material econômico de assessores e referências públicas ao legado de Jair Bolsonaro.

## Limitações

- Não foi localizado no resultado público consultado pedido de registro ou decisão de deferimento no TSE.
- Não foi localizado programa nacional completo registrado para 2027–2030.
- A pesquisa não reconstruiu exaustivamente todas as proposições, votações, relatorias e emendas dos mandatos na Alerj e no Senado.
- Algumas propostas de campanha foram verificadas por cobertura jornalística porque o evento não oferecia documento primário estável e completo nos resultados acessíveis.

## Fontes principais

- TSE: processo e etapas do registro de candidaturas.
- Senado Federal: perfil, trajetória, pronunciamentos e proposições.
- Agência Brasil e Associated Press: convenção e composição da chapa.
- Poder360 e cobertura convergente: plano Brasil Sem Medo.
- Folha de S.Paulo: formulação econômica e estado processual do caso da rachadinha.

## Componentes usados

- `QuickSummary` e `NextSteps`, fora do limite editorial conforme a documentação.
- `SimpleBarChart`, `Reveal`, `NumberedContextList` e `DecisionPoints`: quatro tipos de bloco editorial.
- Não foram criados componentes, imports ou tabelas largas.

## Validação pendente no momento da criação

- TypeScript.
- Build de produção.
- Integridade do diff e inspeção da rota renderizada.
