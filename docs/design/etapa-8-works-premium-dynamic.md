# Etapa 8 - Works principal, colagem premium e sistema dinamico

Objetivo desta etapa: transformar interesse em prova concreta com uma vitrine de projetos que pareca curada, forte e confiavel mesmo com poucos casos.

## Estrutura aplicada

A secao de `Works` da Home deixou o grid generico e passou a usar:

1. card principal em destaque
2. dois cards secundarios empilhados
3. CTA para pagina completa
4. CTA secundario para conversa

## Sistema dinamico de projetos

Os projetos agora aceitam metadados proprios para selecao da Home:

- `category`
- `objective`
- `featured`
- `featuredHome`
- `score`

A selecao da Home considera:

- score explicito
- destaque para Home
- tipo do projeto
- presenca visual
- diversidade entre categoria, tag e stack

## Projetos publicados na vitrine

- `Tereza Cristina` como execucao real
- `Atlas Imoveis` como estudo estrategico
- `Painel de Operacao Local` como sistema autoral

## O que a secao comunica

- existe entrega real, nao so discurso
- design e criterio aparecem juntos
- poucos projetos ainda podem parecer fortes quando a curadoria e boa
- a Home passa de interesse para confianca concreta

## Arquivos centrais

- `src/app/work/projectData.ts`
- `src/components/work/FeaturedWorksShowcase.tsx`
- `src/components/work/FeaturedWorksShowcase.module.scss`
- `src/app/page.tsx`
- `src/resources/content-strategy.ts`
- `src/app/work/projects/*.mdx`

## Criterio de aprovacao

- a secao parece profissional de alto nivel
- da vontade de abrir os projetos
- a Home nao depende de grid comum
- o sistema consegue se atualizar com novos cases sem refazer o layout
