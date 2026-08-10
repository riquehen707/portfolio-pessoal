# Biblioteca de filmes

## Onde ficam os dados

- `src/content/movies/movieSchema.ts`: contrato Zod e validação de lotes.
- `src/content/movies/movies.ts`: registros permanentes dos filmes.
- `src/content/movies/curations.ts`: relações e comentários específicos de cada lista.
- `src/content/movies/movieImport.ts`: preparação de lotes futuros, sempre como rascunho.

Um filme deve existir uma única vez em `movies.ts`. Ano, direção, países, duração, gêneros, alertas, fontes, pôster e disponibilidade pertencem ao registro permanente. Posição e justificativa pertencem à curadoria.

## Adicionar um filme

1. Acrescente um objeto em `seeds`, usando slug único e pelo menos uma fonte verificável.
2. Não preencha `poster` sem arquivo autorizado, texto alternativo, URL de origem e crédito. Sem imagem, o sistema mostra um placeholder.
3. Registre disponibilidade somente com região Brasil e `checkedAt` no formato `AAAA-MM-DD`.
4. Mantenha `status: draft` durante pesquisa e escrita. O lote atual aplica esse status automaticamente.
5. Antes de usar `published`, acrescente `editorial` com introdução, experiência, motivos para assistir e limitações relevantes.
6. Rode `npx tsc --noEmit` e `npm run build`. O carregamento de `movies.ts` executa o schema e interrompe o build se houver slug ou id duplicado, campo essencial ausente, URL inválida ou data malformada.

`prepareMovieImport()` aceita um lote estruturado, força todos os itens para `draft` e devolve erros e pendências de revisão. Ele não escreve arquivos nem publica conteúdo automaticamente.

## Usar em uma curadoria MDX

```mdx
<MovieCard
  movie="hereditario"
  position={3}
  context="Uma escolha importante pela forma como transforma conflitos familiares em terror sobrenatural."
/>
```

O `context` é obrigatório porque explica a presença do filme naquela lista. Ele não deve repetir a descrição geral.

Para rankings, registre também a relação em `curations.ts` e inclua o `ItemList`:

```mdx
<MovieRankingJsonLd
  path="/blog/exemplo"
  slugs="filme-em-primeiro,filme-em-segundo"
/>
```

A lista de `movies` no JSON-LD deve estar do primeiro ao último lugar. O componente usa a página individual apenas quando ela está publicada; durante o rascunho, aponta para a âncora do próprio artigo.

## Publicação e indexação

- `draft` e `review`: não geram rota estática individual, não entram no sitemap e não recebem link no card.
- `published`: exige conteúdo editorial, gera `/filmes/[slug]`, canonical, robots indexável e JSON-LD `Movie`.
- `/filmes` pode mostrar registros em preparação, mas sem transformar fichas incompletas em páginas indexáveis.
- Combinações de gênero, país, tema e plataforma não criam rotas automáticas.

## Imagens e streaming

O lote inicial não inclui pôsteres porque não foi confirmada uma licença reutilizável. Para uma integração futura com API, use variável de ambiente no servidor, baixe ou transforme imagens somente conforme os termos da fonte e registre atribuição no objeto `poster`. Nunca adicione chave ao repositório.

Disponibilidade em streaming é instável. Cada serviço precisa de `checkedAt`; não trate o catálogo verificado numa data como disponibilidade permanente.
