# Etapa 6 - Prova rápida, marquee infinita e banner de competências

> **Registro histórico.** Esta etapa não orienta novas implementações nem comprova o estado atual. Consulte as [fontes vigentes](../architecture/site-architecture.md#autoridade-e-manutenção-da-documentação).

Objetivo desta etapa: reforcar confiança logo depois do hero e manter o ritmo da Home com movimento útil, leve e controlado.

## Estrutura aplicada

O bloco pos-hero agora segue está ordem:

1. faixa de prova rápida com marquee infinita
2. banner de competências e plataformas
3. transição direta para a seção de mercados

## Prova rápida

A marquee foi desenhada nesta etapa para comunicar capacidade sem virar texto longo. Na apresentação atual de serviços, as mensagens abaixo não constituem evidência por si só; aplicar o padrão de [confiança verificável](../architecture/service-landing-pages.md#confiança-verificável).

Mensagens usadas:

- `Especializado em negócios e serviços locais`
- `Decisoes guiadas por dados reais`
- `Ecossistema digital completo`
- `Soluções personalizadas para sua operação`
- `Estrutura digital pensada para crescer`
- `Tecnologia aplicada com objetivo real`

## Banner de competências

O segundo bloco amplia a percepção de repertorio combinando tecnologia, aquisição e operação.

Itens usados:

- `React`
- `Next.js`
- `Google Ads`
- `Meta Ads`
- `Analytics`
- `CRM`
- `Automação`
- `SEO`
- `UI/UX`
- `Performance`

## Comportamento e UX

O scroller infinito foi implementado com:

- loop contínuo e velocidade baixa
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

## Critério de aprovacao

- o bloco aumenta confiança sem competir com o hero
- a Home ganha continuidade visual logo apos a dobra
- o movimento parece premium e funcional, não chamativo
- mobile continua limpo e fácil de percorrer
