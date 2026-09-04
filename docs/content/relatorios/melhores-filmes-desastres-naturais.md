# Relatório editorial — melhores filmes de desastres naturais

## Escopo

- Artigo: `melhores-filmes-desastres-naturais.mdx`.
- Linha editorial: cultura, cinema e gêneros.
- Estrutura: 17 recomendações e 19 filmes, organizados por experiência, sem ranking técnico de catástrofes.
- Estado: rascunho local; nenhuma publicação, commit ou implantação foi solicitada.

## Acervo

- Reutilizados: `mov_prime_thirteen_lives` (*Treze Vidas*) e `mov_netflix_society_snow` (*A Sociedade da Neve*).
- Criados: 17 registros em `naturalDisasterMovies.ts`.
- Campos preenchidos: identidade, títulos, aliases, ano, duração, países, direção, roteiro quando confirmado, gêneros, temas, sinopse original, público, experiência, alertas, fontes e estado editorial.
- Relações de franquia: `franchise_twister` para *Twister* e *Twisters*; `franchise_norwegian_disaster` para *A Onda* e *Terremoto*.
- Não foram encontradas relações permanentes de diretores já cadastradas que pudessem ser reutilizadas sem criar perfis novos fora do escopo.
- Filmes independentes com o mesmo tipo de catástrofe permaneceram separados.

## Imagens

- Foram sincronizados 17 pôsteres promocionais reais no fluxo versionado do acervo.
- Cada registro visual possui arquivo local, texto alternativo, origem no TMDB, crédito e `rights: permission-pending`.
- `permission-pending` registra origem conhecida, não licença comercial confirmada.
- Nenhuma imagem foi gerada por IA.

## Decisões editoriais

- Espetáculo, sobrevivência, drama, thriller, ficção científica e documentário são avaliados por critérios diferentes.
- Realismo científico não foi usado como medida única: legibilidade espacial, tensão, efeitos, personagens e função emocional também foram considerados.
- Obras baseadas em fatos reais distinguem acontecimento confirmado e dramatização: tsunami de 2004, Yarnell Hill, Everest 1996, Andrea Gail, Tham Luang, voo 571 e trajetória dos Krafft.
- *Mar em Fúria* registra explicitamente que os últimos acontecimentos a bordo não tiveram testemunhas.
- *O Dia Depois de Amanhã*, *A Erupção*, *San Andreas* e *Japão Submerso* são apresentados como ficção ou exagero, não previsão.
- Os seis caminhos rápidos reutilizam somente filmes da seleção principal.

## Limites

- Fichas novas permanecem em `draft`; links individuais não são apresentados como páginas públicas.
- Relações organizacionais não foram inferidas sem auditoria específica de créditos.
- Pôsteres permanecem com autorização comercial pendente.
- A curadoria não pretende cobrir todo filme-catástrofe: acidentes industriais, epidemias, naufrágios sem causa natural e impactos cósmicos ficaram fora do recorte principal.

## Validação

- `npm run audit:content`: aprovado, 356 filmes e 0 relações inválidas.
- `npx tsc --noEmit`: aprovado.
- `npm run lint`: aprovado, sem avisos ou erros do ESLint.
- `git diff --check`: aprovado; apenas avisos de normalização LF/CRLF.
- `npm run build`: aprovado, com compilação e geração estática concluídas.
