# Fontes de conteúdo e migração gradual

## Decisão atual

O site continua publicando por arquivos locais, MDX, Git e deploy na Vercel. Não há cliente Supabase, projeto remoto, autenticação, painel, tabela, webhook ou credencial. A preparação atual cria contratos portáveis e pontos únicos de acesso sem trocar o fluxo editorial.

O domínio de leitura usa um catálogo central em `src/content/reading/` e uma fachada em `src/data/reading/`. Livros, light novels, quadrinhos, mangás, manhwas, manhuas e webtoons não criam fontes paralelas; a camada de domínio decide a rota canônica `/livros/[slug]` ou `/quadrinhos/[slug]` a partir da classificação estruturada.

## Arquitetura encontrada

- Artigos: frontmatter validado por Zod e corpo em MDX dentro de `src/app/blog/posts/`.
- Filmes: registros estruturados validados por Zod em `src/content/movies/`, separados das relações de curadoria.
- Rotas, metadata, JSON-LD e sitemap são produzidos no servidor pelo Next.js.
- O acoplamento principal estava nas importações diretas de arrays e caminhos físicos pelos consumidores.

## Fronteiras implementadas

| Conteúdo | Contrato público | Implementação atual | Situação futura |
| --- | --- | --- | --- |
| Filmes | `src/data/movies/` | adaptador local assíncrono | outro adaptador poderá consultar o Supabase |
| Obras de leitura | `src/data/reading/` | adaptador local assíncrono sobre `src/content/reading/` | preserva a separação entre obra, série, volume, edição e oferta |
| Artigos | `src/data/articles/` | fachada local síncrona para MDX | continua local até o custo do build justificar nova estratégia |

Rotas, cards, sitemap e componentes SEO não devem importar `movies.ts`, `curations.ts` ou conhecer um fornecedor. O contrato de filmes já retorna `Promise`, mesmo usando memória local, para que uma fonte remota não obrigue consumidores a mudar de assinatura.

Não foi criado um repositório universal. Cada novo catálogo deverá ter schema e interface próprios quando existir uma necessidade real.

## Identidade e portabilidade

Filmes possuem ID permanente independente do slug, `contentType`, `schemaVersion`, slug atual, aliases, status, datas, SEO, imagem desacoplada e relações exportáveis. Alterar um slug exige preservar o ID e adicionar o caminho anterior em `aliases`. Antes de publicar um alias, deve-se configurar redirecionamento permanente e verificar canonical e status HTTP.

O schema de artigos passou a aceitar gradualmente `contentId`, `contentType`, `schemaVersion`, `aliases` e `createdAt`, mas esses campos não foram impostos retroativamente aos MDX. O auditor registra os artigos ainda sem identidade portável; preencher 161 arquivos agora teria custo alto e nenhuma utilidade imediata.

Imagens guardam caminho ou URL, alt, crédito e origem. O componente visual não conhece Vercel, Supabase Storage ou outro fornecedor. Uma troca futura deve preservar a URL pública da imagem quando possível.

## Exportação e contrato de SEO

Execute:

```bash
npm run audit:content
```

O comando valida os dados locais, referências de curadoria e a existência do artigo relacionado. Ele testa explicitamente um lote válido, um ID duplicado e um registro inválido. Em seguida gera:

- `exports/content/movies.v1.json`: registros e relações portáveis;
- `exports/content/articles-index.v1.json`: índice de frontmatter e prontidão dos MDX;
- `exports/content/audit.v1.json`: contagens, duplicações, relações inválidas e pendências;
- `exports/content/seo-contract.v1.json`: rota, canonical, title, description, imagem e indexabilidade esperados.
- `exports/content/reading.v1.json`: catálogo de leitura e curadorias por referência; pode estar vazio até o primeiro lote validado.

O auditor também verifica IDs, slugs e aliases duplicados no acervo de leitura e a integridade entre obras, séries, volumes, edições, pessoas, organizações, ofertas e itens de lista. Antes de cadastrar em lote, monte candidatos por ID, slug, título original, título brasileiro, romanização e aliases; edições com ISBN diferente continuam ligadas à mesma obra ou volume e não viram uma nova obra por conveniência.

O contrato SEO deverá ser comparado antes e depois de qualquer troca de origem. A comparação precisa cobrir também HTML renderizado, `h1`, breadcrumbs, links internos, JSON-LD, robots, sitemap e códigos HTTP de uma amostra publicada, um rascunho e um alias.

## Caminho futuro para Supabase

Somente quando os indicadores abaixo justificarem:

1. modelar primeiro catálogos estruturados, preservando IDs, slugs, aliases, datas e relações;
2. criar o schema a partir dos modelos validados e importar uma entidade por vez;
3. conferir contagens, duplicações, integridade referencial e amostras exportadas;
4. implementar `SupabaseMovieRepository` com a mesma interface do adaptador local;
5. buscar dados apenas no servidor, com cache compatível com a versão corrente do Next.js;
6. comparar o contrato SEO e o HTML entre as duas fontes;
7. trocar a origem por tipo de conteúdo e manter arquivos locais como rollback temporário;
8. revalidar somente a página alterada e relações quando a publicação remota existir;
9. migrar corpos MDX apenas se sua participação no tempo de build justificar segurança de renderização, versionamento, componentes permitidos e exportação.

Mudanças de código continuarão exigindo deploy. Uma futura alteração de conteúdo no banco poderá usar cache e revalidação direcionada, sem reconstruir todo o catálogo. Webhooks, Edge Functions e revalidação remota não pertencem à etapa atual.

## Segurança futura

Gravações administrativas deverão permanecer no servidor. Chaves secretas e `service_role` nunca podem chegar ao navegador. A configuração futura deve ser refeita conforme a documentação vigente; em agosto de 2026, o Supabase está mudando tabelas novas para exposição opt-in na Data API. Grants definem quais objetos um papel alcança e RLS define quais linhas ele acessa. Toda tabela em schema exposto deve ter RLS e políticas compatíveis com o acesso real.

Não há razão atual para expor gravações editoriais à Data API. Um schema privado e leituras servidor-servidor devem ser avaliados antes de criar políticas públicas.

## Quando reavaliar

Reavaliar a migração quando houver tendência mensurável, não por uma quantidade arbitrária de páginas:

- builds ou deploys se aproximando de um limite operacional;
- crescimento consistente do tempo ou custo de build;
- correções frequentes do mesmo registro em múltiplos lugares;
- necessidade real de publicar sem deploy ou editar por painel;
- catálogo estruturado difícil de revisar no Git;
- busca, filtros ou relações que os arquivos locais não atendam bem.

Registrar duração e custo dos builds ao longo do tempo é mais útil que definir agora um número mágico de páginas.
