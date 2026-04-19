# Etapa 3 — Sistema Global de Design

Base visual oficial da marca Henrique Reis para garantir consistência, escala e velocidade de execução em novas páginas.

## Princípio central

Simplicidade bem executada.

Menos elementos. Mais intenção.

## Direção oficial

- Conceito: Precision Editorial Noir
- Sensação: premium, claro, silenciosamente confiante
- Regra: o dourado é assinatura, não preenchimento

## Temas oficiais

- Tema padrão: `dark`
- Tema secundário: `light`

Tokens semânticos implementados em:

- `src/resources/design-system.ts`
- `src/styles/globals.scss`
- `src/styles/_tokens.scss`
- `src/styles/_themes.scss`

## Paleta oficial

### Dark

- Background Primary: `#0B0B0D`
- Background Secondary: `#141418`
- Surface: `#1B1B20`
- Surface Elevated: `#24242A`
- Border: `#2F2F36`
- Text Primary: `#F4F4F0`
- Text Secondary: `#A8A8B3`
- Accent Gold: `#FFD700`
- Accent Muted: `#C9A600`

### Light

- Background Primary: `#F7F7F4`
- Background Secondary: `#FFFFFF`
- Surface: `#ECECE7`
- Border: `#D8D8CF`
- Text Primary: `#111111`
- Text Secondary: `#555555`
- Accent Gold: `#B89212`

## Tipografia oficial

- Headings: `Space Grotesk`
- Body: `Inter`
- Code: `IBM Plex Mono`

Escala base:

- H1: `clamp(2.5rem, 6vw, 4.5rem)`
- H2: `clamp(1.875rem, 4vw, 3.25rem)`
- H3: `clamp(1.75rem, 3vw, 2.25rem)`
- Body Large: `1.25rem`
- Body: `clamp(1rem, 1vw, 1.125rem)`
- Caption: `0.875rem`

Configuração aplicada em:

- `src/resources/once-ui.config.ts`

## Layout system

- Grid: `12 / 8 / 4`
- Max width oficial: `1280px`
- Wide width opcional: `1440px`
- Gutter responsivo com token
- Spacing: `8 / 16 / 24 / 32 / 48 / 64 / 96 / 128`

Helpers globais:

- `.hr-page-shell`
- `.hr-grid`
- `.hr-span-*`

## Radius, depth e motion

- Radius small: `8px`
- Radius medium: `16px`
- Radius large: `24px`
- Radius panel: `1.75rem`
- Shadows: suaves, profundas e sem glow gratuito
- Motion: `200ms / 280ms / 450ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## Componentes-base

Primitivos globais preparados:

- `.hr-navbar-shell`
- `.hr-panel`
- `.hr-card`
- `.hr-tag`
- `.hr-section-title`
- `.hr-input`
- `.hr-tooltip`
- `.hr-modal-shell`

Componentes existentes alinhados ao sistema:

- Header
- Footer
- Theme toggle
- Project card
- Featured works
- Home hero e panels
- About hero e cards
- Contact hero, cards e form
- Work hero e panels
- Blog hero e panels

## Anti-genérico

Evitar:

- gradiente clichê de IA
- brilho gratuito
- cards sem hierarquia
- curvas excessivas
- container em tudo
- elementos sem função

## Critério de aprovação

A etapa termina quando:

- novas páginas nascem a partir dos tokens, não de improviso
- dark e light mantêm a mesma identidade
- header, footer, cards e painéis parecem parte do mesmo sistema
- o visual transmite premium sem esforço
