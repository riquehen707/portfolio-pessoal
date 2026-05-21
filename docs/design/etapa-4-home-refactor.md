# Etapa 4 - Refatoração estrutural global e nova base da Home

Objetivo desta etapa: remover a base genérica herdada e reconstruir a Home com hierarquia forte, ritmo premium e estrutura pronta para evoluir.

## Auditoria da Home anterior

### Remover

- `HeroProofCarousel` na Home
- `MarketStrategyRail` na Home
- `FeaturedWorksShowcase` na Home
- `Posts` na Home
- `Mailchimp` na Home
- wrappers redundantes de hero, teaser e CTA final
- excesso de panels para blocos que podiam respirar em seções abertas
- navegação com itens extras e ruído informacional
- footer em formato de card pesado

### Manter

- estratégia editorial da Etapa 2
- dados de `work` e `blog`
- identidade visual e tokens da Etapa 3
- `BrandSignature`, `ThemeToggle` e metadata base

### Reconstruir

- Home inteira na ordem oficial
- Header com base fixa, transparente no topo e sólida ao scroll
- Footer com links úteis, contato e frase curta
- cards de `Work`, `Article` e `Market`
- `SectionHeader`, `CTAButton` e `MarqueeRow`
- componentes de hero (`HeroTitle`, `HeroSubtitle`, `HeroActions`)

## Ordem oficial aplicada

1. Hero
2. Prova rápida
3. Banner de competências
4. Mercados / estratégia
5. Works destaque
6. Blog destaque
7. About teaser
8. CTA final

## Decisoes estruturais

- A Home agora trabalha com menos caixas e mais seções abertas.
- Containers foram reservados para hero, destaque de works e CTA final.
- O ritmo vertical foi reorganizado com espacamento amplo entre seções.
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
- O fluxo de seções agora faz sentido sem blocos sobrando.
- Header e footer deixaram de parecer componentes genéricos.
- A base aceita novos cases, artigos e refinamentos visuais sem retrabalho estrutural.
