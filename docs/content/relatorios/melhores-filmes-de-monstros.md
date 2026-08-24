# Relatório editorial — melhores filmes de monstros

## Escopo

- Artigo: `melhores-filmes-de-monstros.mdx`.
- Linha editorial: cultura, cinema e gêneros.
- Estrutura: 16 recomendações; Alien, Godzilla, Predator, Tremors e Um Lugar Silencioso são tratados como franquias ou tradições, sem multiplicar posições.
- Estado: rascunho local; nenhuma publicação, commit ou implantação foi solicitada.

## Acervo

- Reutilizados: universo Alien, *O Enigma de Outro Mundo*, *O Hospedeiro*, *Tubarão*, *Abismo do Medo*, *A Mosca* e *Aniquilação*.
- Criados: 13 registros em `monsterMovies.ts`.
- Cada novo registro possui ID permanente, títulos, slug, ano, duração, países, direção, gêneros, temas, sinopse original, público, experiência, alertas, fonte e estado editorial.
- Foi acrescentado `franchiseId` opcional ao `MovieSchema`. O campo relaciona filmes do mesmo universo por identificador permanente e não atribui o mesmo peso editorial a todos os capítulos.
- Relações registradas: `franchise_alien`, `franchise_godzilla`, `franchise_predator`, `franchise_tremors` e `franchise_a_quiet_place`.
- A mudança de schema foi documentada em `movie-list.md` e `movie-profile.md`; registros antigos continuam compatíveis.

## Imagens

- Treze pôsteres promocionais reais foram sincronizados para `public/images/movies/`.
- Cada entrada registra arquivo local, texto alternativo, página de origem no TMDB, crédito e `rights: permission-pending`.
- O estado `permission-pending` registra origem conhecida, não licença comercial confirmada.
- Nenhuma imagem ou representação de criatura foi criada por IA.

## Decisões editoriais

- A curadoria privilegia a função cinematográfica do monstro: exposição, regra, design, ameaça, mitologia, atmosfera e gênero dominante.
- Godzilla foi tratado como tradição mutável; apenas 1954, *Shin Godzilla* e *Godzilla Minus One* receberam destaque principal.
- Predator foi reduzido ao original e a *O Predador: A Caçada*; as demais entradas foram classificadas como caminhos opcionais.
- Alien reaproveita a seleção já normalizada e diferencia horror, ação e arqueologia biológica.
- Propostas semelhantes foram separadas por função: *Tubarão* trabalha ausência; *Abismo do Medo*, ambiente; *O Ritual*, revelação tardia; *Um Lugar Silencioso*, som.
- As oito categorias finais reutilizam exclusivamente a lista principal.
- Links internos apontam apenas para superfícies públicas existentes; filmes novos continuam como rascunho.

## Limites

- `franchiseId` relaciona os filmes, mas ainda não existe um catálogo público permanente de franquias com nome, descrição ou rota própria.
- Relações organizacionais não foram inferidas sem auditoria específica de créditos de produção e distribuição.
- Títulos, durações, créditos e direitos dos pôsteres devem ser reconferidos antes de publicar fichas individuais.
- A seleção não tenta representar todo monstro clássico ou todo kaiju; diversidade de função teve prioridade sobre cobertura histórica exaustiva.

## Validação

- `npm run audit:content`: aprovado, 0 relações inválidas.
- Verificação de IDs, slugs, arquivos de pôster e `franchiseId`: aprovada, sem duplicatas ou arquivos ausentes.
- `npx tsc --noEmit`: aprovado.
- `npm run lint`: aprovado, sem avisos ou erros do ESLint.
- `git diff --check`: aprovado; apenas avisos de normalização LF/CRLF.
- `npm run build`: aprovado, com compilação e geração estática concluídas.
