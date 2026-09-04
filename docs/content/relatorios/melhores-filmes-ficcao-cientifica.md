# Relatório editorial — melhores filmes de ficção científica

## Escopo

- Artigo: `melhores-filmes-ficcao-cientifica.mdx`.
- Linha editorial: cultura, cinema e gêneros.
- Intenção: orientar descoberta por vertentes, com atenção especial a exploração espacial, criaturas, isolamento e horror.
- Estrutura: 16 recomendações editoriais; Alien e Blade Runner são tratados como universos, não como posições repetidas.
- Estado: rascunho local; nenhuma publicação, commit ou deploy foi solicitado.

## Acervo

- Reutilizado: `mov_1a74cf` (*Sob a Pele*).
- Criados: 20 filmes em `scienceFictionMovies.ts`, todos com ID permanente e `status: draft` derivado pelo agregador central.
- Campos preenchidos: títulos, slug, aliases quando úteis, ano, duração, países, direção, roteiro, gêneros, subgêneros, temas, sinopse curta original, público, experiência, alertas e fontes.
- Franquias: o `MovieSchema` ainda não possui campo próprio de franquia ou universo. A relação foi registrada por temas compatíveis e descrita no artigo, sem introduzir campo não aceito nem duplicar objetos no MDX.
- Organizações: não foram criadas relações organizacionais sem uma auditoria específica de cada crédito de produção e distribuição.

## Imagens

- Foram sincronizados 20 pôsteres promocionais reais por meio do fluxo versionado já usado pelo acervo.
- Cada entrada registra arquivo local, texto alternativo, página de origem no TMDB, crédito e `rights: permission-pending`.
- `permission-pending` identifica origem conhecida, não licença confirmada para uso comercial.
- Nenhum pôster ou imagem de filme foi gerado por IA.

## Decisões editoriais

- A lista não é um ranking; a ordem alterna portas de entrada, horror, ideias acessíveis e obras contemplativas.
- O universo Alien reúne cinco filmes, diferencia horror, ação e arqueologia espacial e registra obras opcionais sem ocupar novas posições.
- Blade Runner reúne os dois longas e orienta o uso do *Final Cut* como entrada.
- As oito seleções finais reutilizam exclusivamente obras da lista principal.
- O texto evita primeira pessoa, consenso inventado e elogios genéricos; cada entrada explicita premissa, vertente, diferencial, atmosfera e público.
- Links internos foram limitados a páginas públicas existentes. Os novos filmes permanecem em rascunho e, por isso, não foram apresentados como fichas individuais publicadas.

## Fontes e limites

- Foram priorizadas páginas de estúdios e instituições cinematográficas, com BFI como fonte editorial para clássicos e páginas oficiais para títulos contemporâneos quando disponíveis.
- Sinopses do catálogo e comentários do artigo são textos originais, não cópias das fontes.
- Datas, durações, títulos brasileiros e créditos devem receber nova conferência antes de transformar as fichas de filme em páginas `published`.
- O recorte não tenta representar toda a história do gênero; comédia sci-fi, space opera heroica e super-heróis ficaram fora para preservar a tese da curadoria.

## Validação

- `npm run audit:content`: aprovado, sem relações inválidas.
- `npx tsc --noEmit`: aprovado.
- `npm run lint`: aprovado, sem avisos ou erros do ESLint.
- `git diff --check`: aprovado; apenas avisos de normalização LF/CRLF.
- `npm run build`: compilação e geração estática concluídas. Durante a primeira execução, o build identificou `knowledgeStatus: rascunho`; o valor foi corrigido para a opção válida `planejado`.
