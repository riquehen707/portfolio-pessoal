# Etapa 12 - Motion system, Framer Motion e experiencia premium

Objetivo desta etapa: transformar a interface em uma experiencia mais viva, fluida e premium sem perder controle visual.

## Base aplicada

O motion agora parte de uma infraestrutura unica:

1. `MotionProvider` global com `LazyMotion`
2. respeito automatico a `prefers-reduced-motion`
3. tokens compartilhados para reveal, stagger, hover e tap
4. wrapper reutilizavel para reveals em blocos server-side

## O que entrou

- Hero com entrada em camadas para headline, subheadline, CTAs e visual
- post-hero com reveals leves para marquee e faixa de competencias
- secao de Mercados com entrada progressiva, pills com feedback e cards ativos com transicao mais premium
- vitrine principal de Works com reveal de secao e hover controlado nos cards
- cards reutilizaveis de blog e work com lift sutil e entrada em viewport
- About teaser e CTA final com reveals consistentes e loops discretos nos elementos visuais

## Regras respeitadas

- motion em `transform` e `opacity`
- tempos curtos a moderados
- nada de bounce cartunesco
- loops lentos e discretos
- acessibilidade mantida para usuarios com reducao de movimento

## Arquivos centrais

- `package.json`
- `src/components/Providers.tsx`
- `src/components/motion/MotionProvider.tsx`
- `src/components/motion/motionTokens.ts`
- `src/components/motion/Reveal.tsx`
- `src/components/home/HeroTitle.tsx`
- `src/components/home/HeroSubtitle.tsx`
- `src/components/home/HeroActions.tsx`
- `src/components/home/HeroVisual.tsx`
- `src/components/home/MarketsSection.tsx`
- `src/components/work/FeaturedWorksShowcase.tsx`
- `src/components/work/FeaturedWorksShowcaseClient.tsx`
- `src/components/cards/ArticleCard.tsx`
- `src/components/cards/WorkCard.tsx`
- `src/components/home/AboutTeaser.tsx`
- `src/components/home/FinalCTA.tsx`

## Criterio de aprovacao

- a interface parece mais cara sem parecer barulhenta
- a navegacao ficou mais fluida
- hover e reveal seguem a mesma linguagem
- o site continua responsivo e compativel com reducao de movimento
