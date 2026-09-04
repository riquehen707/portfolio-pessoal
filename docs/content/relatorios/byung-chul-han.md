# Relatório editorial — Byung-Chul Han

## Estado da página

- Perfil permanente publicado em `/personalidades/byung-chul-han`.
- Biografia, temas e conceitos foram ampliados sem repetir o artigo-pilar `/blog/byung-chul-han`.
- A página relaciona automaticamente as obras pelo crédito `author` e oferece quatro percursos de entrada: *Sociedade do Cansaço*, *Psicopolítica*, *No Enxame* e *Vita Contemplativa*.
- A fotografia já existente foi preservada. Ela retrata o autor, tem origem no Wikimedia Commons, crédito ActuaLitté / MRCLD e licença CC BY-SA 4.0.

## Acervo de leitura

- Total relacionado ao autor: 15 obras.
- Obra anteriormente existente e preservada: *Sociedade do Cansaço*.
- Obras adicionadas neste lote: 14.
- Cada registro separa obra conceitual e edição brasileira, preserva o título original e informa o ano original quando confirmado.
- Editora, tradutor, ISBN, paginação e disponibilidade só foram preenchidos quando havia confirmação suficiente; campos incertos não foram inferidos.

## Capas

- Total com capa real verificável: 15 obras — uma já existente e 14 adicionadas.
- As novas imagens foram convertidas para WebP e têm dimensões intrínsecas registradas no catálogo.
- Fontes usadas: página editorial da Editora Vozes e registro de edição exata no Open Library.
- As quatro pendências iniciais — *Psicopolítica*, *O Aroma do Tempo*, *A Expulsão do Outro* e *A Crise da Narração* — foram resolvidas em 24/08/2026 com fontes ligadas às edições exatas.
- A pesquisa corrigiu a edição brasileira de *Psicopolítica* para a Editora Âyiné e identificou *O Aroma do Tempo* como edição portuguesa da Relógio D’Água, sem atribuí-las incorretamente à Vozes.
- Os scripts `scripts/fetch-byung-chul-han-covers.mjs` e `scripts/fetch-book-covers-batch-01.mjs` documentam e reproduzem a obtenção das 14 novas capas.

## Fontes e critérios

- Perfil institucional da University of the Arts Berlin para trajetória acadêmica.
- Página de autor e conteúdo editorial da Editora Vozes para títulos e edições brasileiras.
- Páginas das editoras alemãs Matthes & Seitz, S. Fischer e Ullstein para títulos e anos originais.
- Stanford University Press para *The Burnout Society*.
- Wikimedia Commons para fotografia, autoria e licença.
- Google Books e Open Library somente quando vinculados a uma edição identificável.

## Limites editoriais

- Os resumos são descrições editoriais originais, não sinopses copiadas.
- Diagnóstico filosófico, metáfora e evidência empírica continuam distinguidos na biografia e no artigo-pilar.
- Não foram inventados ISBN, tradutor, número de páginas, disponibilidade comercial ou imagem.
- Este lote estabelece o padrão para outros autores, mas não altera perfis alheios antes de pesquisa e validação próprias.

## Validação

- `npx tsc --noEmit`
- `npm run audit:content`
- `npm run build` — 372 páginas estáticas geradas; novas rotas de livros incluídas.
- HTTP local da página de personalidade — status 200, com nome do autor e percursos renderizados no HTML.
- Retrato e amostra das capas inspecionados diretamente. A automação do navegador integrado foi bloqueada pela política do ambiente antes de abrir o localhost; desktop e mobile completos permanecem como verificação visual manual.
- Dez novas capas somam cerca de 178 KiB em WebP.
- Sem commit, push ou deploy nesta etapa.
