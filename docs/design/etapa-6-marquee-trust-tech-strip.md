# Etapa 6 - Prova rapida, marquee infinita e banner de competencias

Objetivo desta etapa: reforcar confianca logo depois do hero e manter o ritmo da Home com movimento util, leve e controlado.

## Estrutura aplicada

O bloco pos-hero agora segue esta ordem:

1. faixa de prova rapida com marquee infinita
2. banner de competencias e plataformas
3. transicao direta para a secao de mercados

## Prova rapida

A marquee foi desenhada para confirmar capacidade sem virar texto longo.

Mensagens usadas:

- `Especializado em negocios e servicos locais`
- `Decisoes guiadas por dados reais`
- `Ecossistema digital completo`
- `Solucoes personalizadas para sua operacao`
- `Estrutura digital pensada para crescer`
- `Tecnologia aplicada com objetivo real`

## Banner de competencias

O segundo bloco amplia a percepcao de repertorio combinando tecnologia, aquisicao e operacao.

Itens usados:

- `React`
- `Next.js`
- `Google Ads`
- `Meta Ads`
- `Analytics`
- `CRM`
- `Automacao`
- `SEO`
- `UI/UX`
- `Performance`

## Comportamento e UX

O scroller infinito foi implementado com:

- loop continuo e velocidade baixa
- pausa ao hover no desktop
- arraste manual em touch e pointer
- retomada suave ao soltar
- fade discreto nas extremidades
- respeito a `prefers-reduced-motion`

## Arquivos centrais

- `src/app/page.tsx`
- `src/app/home.module.scss`
- `src/components/InfiniteScroller.tsx`
- `src/components/InfiniteScroller.module.scss`
- `src/components/BadgePill.tsx`
- `src/components/BadgePill.module.scss`
- `src/components/home/MarqueeTrust.tsx`
- `src/components/home/TechStrip.tsx`

## Criterio de aprovacao

- o bloco aumenta confianca sem competir com o hero
- a Home ganha continuidade visual logo apos a dobra
- o movimento parece premium e funcional, nao chamativo
- mobile continua limpo e facil de percorrer
