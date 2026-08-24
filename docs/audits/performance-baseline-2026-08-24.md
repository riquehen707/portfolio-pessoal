# Linha de base de desempenho — 24 de agosto de 2026

Esta medição registra o estado anterior às otimizações de arquitetura. Ela não altera conteúdo, renderização, indexação ou comportamento público.

## Ambiente e método

- Next.js 15.5.9, build de produção local no Windows;
- comando: `npm run build`;
- duração medida externamente com `System.Diagnostics.Stopwatch`;
- tamanhos de JavaScript por rota informados pelo próprio resumo do Next.js;
- tamanhos de HTML, chunks e diretórios medidos nos artefatos em `.next`;
- os valores em disco são brutos e não representam transferência comprimida;
- Lighthouse e dados reais de campo ainda não foram coletados nesta linha de base local.

## Resultado principal

| Indicador | Valor |
| --- | ---: |
| Build total | 188,5 s |
| Compilação | 36,1 s |
| Páginas estáticas geradas pelo resumo do Next | 555 |
| First Load JS compartilhado | 111 kB |
| First Load JS típico de rotas comuns | 390–391 kB |
| First Load JS de `/blog/[slug]` | 531 kB |
| First Load JS de `/livros` e `/quadrinhos` | 489 kB |
| First Load JS de `/livros/[slug]` | 491 kB |
| First Load JS de `/filmes` | 417 kB |
| First Load JS de `/series` | 422 kB |
| Maior chunk JavaScript bruto | 924,1 kB |
| Maior HTML gerado (`/filmes`) | 984,3 kB |
| `.next/static` | 6,84 MB |
| `.next/server` | 369,23 MB |
| `.next/cache` | 2.054,07 MB |

O cache local não equivale ao peso do deploy ou ao download do visitante. Os indicadores prioritários para as próximas etapas são duração do build, páginas pré-renderizadas, First Load JS e HTML inicial.

## Volume das fontes

| Grupo | Arquivos | Tamanho bruto |
| --- | ---: | ---: |
| Artigos em `src/app/blog/posts` | 218 | 3,80 MB |
| Conteúdo estruturado em `src/content` | 52 | 0,93 MB |
| Fachadas em `src/data` | 19 | 0,02 MB |
| Imagens em `public/images` | 615 | 30,28 MB |

## Rotas de referência

As próximas medições devem sempre comparar ao menos:

1. `/`, como entrada e layout global;
2. `/blog/landing-page-o-que-e-como-criar`, como artigo editorial extenso;
3. `/filmes`, como biblioteca com HTML volumoso;
4. `/livros`, como catálogo cliente;
5. `/livros/kushiels-dart`, como ficha de leitura.

## Critérios que não podem regredir

- conteúdo principal presente no HTML do servidor;
- títulos, descrições, canonicals, robots e JSON-LD preservados;
- URLs publicadas e sitemap preservados;
- busca acessível por teclado e em dispositivos móveis;
- nenhum índice ou ficha dependente de JavaScript para ser descoberto;
- consultas sem resultado e cliques na busca mensuráveis antes de trocar seu mecanismo.

## Como repetir

```bash
npm run build
npm run audit:performance
```

O segundo comando grava `exports/performance/baseline.v1.json`. O JSON contém inventário dos artefatos, maiores HTMLs, maiores chunks e bytes brutos associados a cada rota do manifesto. A duração do build deve ser cronometrada separadamente, pois o Next.js não a grava em seus manifestos.

## Limite desta etapa

Não há ainda uma medição confiável de experiência real de usuários. Lighthouse local e Core Web Vitals de campo devem ser adicionados antes de definir orçamentos finais; números locais servem para comparação de regressões, não como substitutos de dados reais.
