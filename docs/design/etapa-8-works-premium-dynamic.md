# Etapa 8 - Works principal, colagem premium e sistema dinamico

> **Registro histórico.** Esta etapa não orienta novas implementações nem comprova o estado atual. Consulte as [fontes vigentes](../architecture/site-architecture.md#autoridade-e-manutenção-da-documentação).

Objetivo desta etapa: transformar interesse em prova concreta com uma vitrine de projetos que pareca curada, forte e confiável mesmo com poucos casos.

## Estrutura aplicada

A seção de `Works` da Home deixou o grid genérico e passou a usar:

1. card principal em destaque
2. dois cards secundarios empilhados
3. CTA para página completa
4. CTA secundário para conversa

## Sistema dinamico de projetos

Os projetos agora aceitam metadados próprios para seleção da Home:

- `category`
- `objective`
- `featured`
- `featuredHome`
- `score`

A seleção da Home considera:

- score explicito
- destaque para Home
- tipo do projeto
- presença visual
- diversidade entre categoria, tag e stack

## Projetos publicados na vitrine

Esta seleção é um registro da etapa. Para reutilizar materiais como prova de um serviço, conferir autoria, participação e disponibilidade conforme [confiança verificável](../architecture/service-landing-pages.md#confiança-verificável); a classificação histórica não certifica uma demo funcional ou um projeto entregue hoje.

- `Tereza Cristina` como execução real
- `Atlas Imóveis` como estudo estrategico
- `Painel de Operação Local` como sistema autoral

## O que a seção comunica

- existe entrega real, não só discurso
- design e critério aparecem juntos
- poucos projetos ainda podem parecer fortes quando a curadoria e boa
- a Home passa de interesse para confiança concreta

## Arquivos centrais

- `src/app/work/projectData.ts`
- `src/components/work/FeaturedWorksShowcase.tsx`
- `src/components/work/FeaturedWorksShowcase.module.scss`
- `src/app/page.tsx`
- `src/resources/content-strategy.ts`
- `src/app/work/projects/*.mdx`

## Critério de aprovacao

- a seção parece profissional de alto nivel
- da vontade de abrir os projetos
- a Home não depende de grid comum
- o sistema consegue se atualizar com novos cases sem refazer o layout
