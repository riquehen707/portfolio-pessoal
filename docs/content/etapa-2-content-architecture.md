# Etapa 2 — Arquitetura de Conteúdo & Copy Strategy

> **Registro histórico.** Esta etapa não orienta novas implementações nem comprova o estado atual. Consulte as [fontes vigentes](../architecture/site-architecture.md#autoridade-e-manutenção-da-documentação).

Base editorial da marca `Henrique Reis` aplicada ao produto.

## Princípio central

A comunicação não vende apenas estética. Ela precisa comunicar:

- clareza estratégica
- execução confiável
- tecnologia útil
- crescimento estruturado
- soluções reais para negócios reais

## Linguagem atual

As listas de tom e copy desta etapa foram absorvidas pela [diretriz global de linguagem](01-fundamentos/voz-e-estilo.md). Usar essa fonte e sua auditoria para textos novos; o posicionamento e os tons por página registrados abaixo permanecem como histórico, não como instrução para aumentar persuasão.

## Arquitetura principal

Páginas base:

- Home
- Works
- About
- Blog / Insights
- Contact

## Tom emocional por página

- Home: confiança + impacto
- Works: competência + prova
- About: humanidade + visão
- Blog / Insights: inteligência + utilidade
- Contact: facilidade + oportunidade

## SEO base inicial

- Home: `operação digital para negócios locais`
- Works: `portfólio desenvolvimento web estratégico`
- Blog / Insights: `marketing para negócios locais`, `presença digital`, `automação`
- Contact: `consultoria digital`, `criar site`, `gestão digital`

## Implementação no código

- Estratégia editorial central: [content-strategy.ts](../../src/resources/content-strategy.ts)
- Base de páginas: [content.tsx](../../src/resources/content.tsx)
- Home: [page.tsx](../../src/app/page.tsx)
- Works: [work/page.tsx](../../src/app/work/page.tsx)
- About: [about/page.tsx](../../src/app/about/page.tsx)
- Blog / Insights: [blog/page.tsx](../../src/app/blog/page.tsx)
- Contact: [contact/page.tsx](../../src/app/contact/page.tsx)

## Entregáveis desta etapa

- estrutura textual das páginas principais
- headlines principais
- CTAs definidos
- ordem de seções por página
- tom da marca por página
- base inicial de SEO

## Critério de aprovação

A etapa fecha quando:

- cada página tem objetivo claro
- nenhum bloco existe só para preencher
- os textos parecem seus
- o design já pode nascer naturalmente
