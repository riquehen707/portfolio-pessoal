# Relatório de transformação — Renan Santos e “desfavelização”

## Entrada e abordagem

- Entrada: prompt editorial com pauta investigativa para a série Eleições 2026.
- Saída: artigo MDX em `src/app/blog/posts/fundamentos/renan-santos-desfavelizar-brasil.mdx`.
- Linha editorial: estudo crítico de proposta pública, com conclusão antes dos detalhes.

## Decisões editoriais

- O verbo “desfavelizar” foi mantido entre aspas e decomposto em urbanização, regularização, melhoria habitacional, remanejamento e reassentamento.
- A análise não equipara favela a crime organizado nem trata moradores como grupo homogêneo.
- A meta de dez anos foi classificada como promessa documentada; custos, carteira territorial e regras executivas ausentes não foram inferidos.
- O cálculo com três valores por domicílio é explicitamente ilustrativo e não representa estimativa do programa.
- Argumentos favoráveis e contrários foram apresentados com mecanismo, objeção e grau de confiança, sem falsa equivalência.

## Acréscimos e inferências

- Foi calculada a ordem de grandeza de R$ 164 bilhões, R$ 656 bilhões e R$ 1,64 trilhão pela multiplicação de 6.556.968 domicílios por valores hipotéticos de R$ 25 mil, R$ 100 mil e R$ 250 mil. A limitação aparece junto ao cálculo.
- A conclusão de “viabilidade não demonstrada” decorre da ausência pública de diagnóstico territorial, modalidades quantificadas, orçamento, fontes, cronograma e governança; não afirma inviabilidade definitiva.
- A comparação entre Periferia Viva e Favela do Moinho serve apenas para demonstrar heterogeneidade de escopo e custo.

## Fontes principais e limites

- IBGE: dimensão e definição de favelas e comunidades urbanas, segunda edição corrigida do Censo 2022.
- Programa e declarações: cobertura do plano eleitoral pela CNN Brasil e entrevista integralmente atribuída por A Tribuna.
- Ministério das Cidades: desenho de urbanização integrada, regularização e reassentamento excepcional.
- Caixa: parâmetros públicos do acordo da Favela do Moinho.
- ONU-Habitat: participação, melhoria no local e proteção contra remoções forçadas.

O arquivo integral do programa no sistema eleitoral não foi recuperado em URL pública estável nesta execução. A formulação de dez anos foi confirmada em cobertura direta do lançamento; divergências entre declarações e resumo eleitoral foram preservadas.

## Componentes utilizados

- `QuickSummary`: conclusão e limites em leitura rápida.
- `EditorialTable`: comparação responsiva das modalidades de intervenção.
- `DecisionPoints`: critérios verificáveis para avaliar o plano definitivo.
- `NextSteps`: continuidade da série e link interno existente.

Total: quatro tipos de bloco editorial, dentro do limite do repositório.

## Links internos verificados

- `/blog/renan-santos-eleicoes-2026`
- `/blog/renan-santos-bolsa-familia-frentes-trabalho`

## Validação executada

- `npx tsc --noEmit`: aprovado.
- `npm run lint`: aprovado, sem avisos ou erros do ESLint.
- `npm run build`: aprovado, com 212 páginas estáticas geradas.
- O aviso preexistente do Autoprefixer em `src/app/page.module.scss` não foi causado por este artigo.
