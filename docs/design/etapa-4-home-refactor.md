# Etapa 4 - Refatoracao estrutural global e nova base da Home

Objetivo desta etapa: remover a base generica herdada e reconstruir a Home com hierarquia forte, ritmo premium e estrutura pronta para evoluir.

## Auditoria da Home anterior

### Remover

- `HeroProofCarousel` na Home
- `MarketStrategyRail` na Home
- `FeaturedWorksShowcase` na Home
- `Posts` na Home
- `Mailchimp` na Home
- wrappers redundantes de hero, teaser e CTA final
- excesso de panels para blocos que podiam respirar em secoes abertas
- navegacao com itens extras e ruido informacional
- footer em formato de card pesado

### Manter

- estrategia editorial da Etapa 2
- dados de `work` e `blog`
- identidade visual e tokens da Etapa 3
- `BrandSignature`, `ThemeToggle` e metadata base

### Reconstruir

- Home inteira na ordem oficial
- Header com base fixa, transparente no topo e solida ao scroll
- Footer com links uteis, contato e frase curta
- cards de `Work`, `Article` e `Market`
- `SectionHeader`, `CTAButton` e `MarqueeRow`
- componentes de hero (`HeroTitle`, `HeroSubtitle`, `HeroActions`)

## Ordem oficial aplicada

1. Hero
2. Prova rapida
3. Banner de competencias
4. Mercados / estrategia
5. Works destaque
6. Blog destaque
7. About teaser
8. CTA final

## Decisoes estruturais

- A Home agora trabalha com menos caixas e mais secoes abertas.
- Containers foram reservados para hero, destaque de works e CTA final.
- O ritmo vertical foi reorganizado com espacamento amplo entre secoes.
- A hierarquia agora prioriza headline, prova, repertorio, autoridade e conversa final.

## Componentes-base adicionados

- `src/components/CTAButton.tsx`
- `src/components/SectionHeader.tsx`
- `src/components/MarqueeRow.tsx`
- `src/components/cards/WorkCard.tsx`
- `src/components/cards/ArticleCard.tsx`
- `src/components/cards/MarketCard.tsx`
- `src/components/home/HeroTitle.tsx`
- `src/components/home/HeroSubtitle.tsx`
- `src/components/home/HeroActions.tsx`

## Arquivos centrais revisados

- `src/app/page.tsx`
- `src/app/home.module.scss`
- `src/app/layout.tsx`
- `src/components/Header.tsx`
- `src/components/Header.module.scss`
- `src/components/Footer.tsx`
- `src/components/Footer.module.scss`
- `src/styles/globals.scss`

## Checklist de aprovacao

- A Home respira melhor mesmo sem motion avancado.
- O fluxo de secoes agora faz sentido sem blocos sobrando.
- Header e footer deixaram de parecer componentes genericos.
- A base aceita novos cases, artigos e refinamentos visuais sem retrabalho estrutural.
