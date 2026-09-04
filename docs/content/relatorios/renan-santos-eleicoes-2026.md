# Relatório de transformação — Renan Santos nas eleições de 2026

## Escopo

- Página criada em `src/app/blog/posts/fundamentos/renan-santos-eleicoes-2026.mdx`.
- Rota real: `/blog/renan-santos-eleicoes-2026`.
- A rota sugerida `/eleicoes-2026/candidatos/renan-santos` não foi duplicada porque o sistema publica artigos em `/blog/[slug]`.

## Decisões editoriais

- Reutilizados os oito critérios e pesos comuns à série.
- Identidade confirmada como Renan Antônio Ferreira dos Santos; partido e chapa separados de registro deferido.
- Livro Amarelo tratado como formulação coletiva incorporada à campanha, não autoria individual automática.
- Mobilização, comunicação, registro partidário e execução pública foram avaliados separadamente.
- Concretude não foi usada como sinônimo de qualidade ou constitucionalidade.
- Controvérsias distinguem acusação rejeitada, execução tributária e alegação sem documentação suficiente.

## Acréscimos e inferências

- Índice de 51,8/100: diagnóstico 6,5; propostas 7,0; evidências 5,0; fiscal 5,5; viabilidade 3,5; execução 2,5; coerência 5,5; transparência 5,0.
- Cobertura de 75% e confiança média-baixa refletem programa detalhado, contraposto à ausência de experiência pública e de base parlamentar demonstrada.
- A crítica ao uso de instrumentos excepcionais é análise jurídica geral, não declaração de inconstitucionalidade de um texto legal inexistente.

## Limitações

- Pedido de registro e deferimento não foram confirmados na data de corte.
- O texto integral definitivo do programa não estava disponível em URL estável localizada; propostas foram confrontadas com site partidário e cobertura detalhada.
- Não foi realizada auditoria financeira do MBL, do partido ou das empresas relacionadas ao candidato.
- Alegações pessoais sem documento judicial inequívoco foram excluídas da avaliação.
- Temas sem propostas suficientes não receberam nota temática.

## Componentes

- `QuickSummary` e `NextSteps`, excluídos do limite editorial.
- `SimpleBarChart`, `Reveal`, `NumberedContextList` e `DecisionPoints`: quatro tipos de bloco.
- Nenhum componente ou import novo; nenhuma tabela larga.

## Fontes centrais

- TSE: registro do Partido Missão e etapas de candidatura.
- Partido Missão: apresentação institucional e Congresso.
- CNN Brasil: convenção, chapa e descrição detalhada do programa.
- Cobertura processual sobre denúncia de 2020 e execução fiscal.

## Validações pendentes no momento da criação

- TypeScript.
- Build de produção.
- Integridade do diff e resposta HTTP da rota.
