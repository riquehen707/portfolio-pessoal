# Decisão de migração para Supabase

## Resultado do passo 6

Não migrar o conteúdo editorial para Supabase nesta etapa.

Depois das otimizações dos passos anteriores, o build gera 372 páginas no progresso do Next.js, contra 556 no diagnóstico inicial. O manifesto registra 370 rotas pré-renderizadas. Os arquivos estruturados em `src/content/` ocupam menos de 1 MB; já os 218 arquivos de artigos MDX somam aproximadamente 3,8 MB. Mover somente os catálogos estruturados acrescentaria consultas remotas, cache e uma nova superfície operacional, mas retiraria pouco trabalho do compilador. Mover os MDX teria impacto maior, porém sacrificaria o fluxo atual de Git, validação e componentes editoriais antes de existir uma necessidade operacional que compense esse custo.

O Supabase permanece adequado para dados mutáveis e operacionais, como comentários, moderação e uma futura publicação por painel. Não é um substituto automático para otimização do bundle ou do HTML.

## Evidência atual

| Medida | Resultado atual | Leitura arquitetural |
| --- | ---: | --- |
| Páginas processadas no build | 372 | redução de 184 páginas em relação às 556 iniciais |
| Rotas pré-renderizadas no manifesto | 370 | baseline reproduzível por `npm run audit:performance` |
| Artigos MDX | 218 arquivos / ~3,8 MB | maior fonte editorial, mas depende do compilador MDX |
| Catálogos em `src/content/` | 52 arquivos / ~0,93 MB | pequenos demais para justificar migração apenas por peso |
| Imagens públicas | 615 arquivos / ~30,3 MB | devem continuar em CDN/ativos estáveis; banco não reduz seu peso |
| Maior HTML gerado | `/filmes`, ~0,71 MB bruto | otimizar paginação/renderização antes de trocar a origem dos dados |

Os valores são tamanhos brutos locais, não transferência comprimida. O arquivo canônico da medição é `exports/performance/baseline.v1.json`.

## O que continua local

- corpos MDX, frontmatter e componentes editoriais;
- catálogos públicos versionados enquanto permanecerem pequenos e revisáveis;
- assets estáveis servidos pelo repositório/CDN;
- contratos de SEO, canonicals, aliases e histórico editorial.

Isso mantém HTML completo no servidor, sitemap determinístico e busca interna independente da disponibilidade de um banco externo.

## O que pode ir para Supabase

- comentários e filas de moderação;
- dados privados ou administrativos que não podem ser versionados publicamente;
- conteúdo estruturado que precise ser publicado sem deploy;
- um catálogo que demonstre custo relevante de build ou manutenção duplicada.

Qualquer catálogo migrado deve continuar acessado por sua interface em `src/data/`. Páginas, cards, busca, sitemap e JSON-LD não podem conhecer o fornecedor.

## Gate para iniciar um piloto

Iniciar um piloto somente quando houver evidência de pelo menos um destes problemas:

1. builds voltarem a crescer de forma consistente e o perfil apontar um catálogo estruturado como causa;
2. edição sem deploy se tornar um requisito real;
3. o mesmo registro exigir correções frequentes em fontes diferentes;
4. consultas, filtros ou relações deixarem de ser bem atendidos pelos arquivos locais;
5. houver necessidade de dados privados, autenticação ou moderação.

O primeiro piloto deve usar apenas um catálogo estruturado, preferencialmente filmes, porque já possui `MovieRepository` assíncrono. A troca precisa preservar IDs, slugs, aliases, URLs, metadata, JSON-LD, resultados da busca e sitemap, com fallback local temporário.

## Segurança do piloto

- leitura exclusivamente no servidor;
- segredo nunca exposto como variável `NEXT_PUBLIC_*`;
- tabelas editoriais em schema não exposto, salvo necessidade comprovada da Data API;
- grants explícitos e RLS em qualquer objeto exposto;
- cache e revalidação por entidade, sem consulta remota a cada interação de busca;
- comparação automatizada do contrato SEO e do HTML antes da troca.

Em agosto de 2026, novas tabelas podem não ser expostas automaticamente à Data API. Grants e RLS são controles separados e ambos devem ser revisados quando houver exposição. A implementação deve consultar novamente o changelog e a documentação vigente no momento do piloto.

## Próxima medição

Guardar duração de build por commit ou deploy e executar `npm run audit:performance` e `npm run audit:performance:budget` após mudanças arquiteturais. A migração será reavaliada por tendência e causa medida, não por uma quantidade arbitrária de páginas.
