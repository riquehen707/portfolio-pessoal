# Etapa 10 - About teaser, humanização e conexão de marca

> **Registro histórico.** Esta etapa não orienta novas implementações nem comprova o estado atual. Consulte as [fontes vigentes](../architecture/site-architecture.md#autoridade-e-manutenção-da-documentação).

Objetivo desta etapa: adicionar presença humana na Home sem alongar a leitura nem quebrar a atmosfera premium.

## Estrutura aplicada

O teaser de About agora funciona como um split section:

1. texto curto e objetivo no lado esquerdo
2. CTA direto para a página About
3. painel editorial no lado direito com símbolo ampliado e assinatura da marca

## O que mudou

- a Home deixou de usar o bloco antigo com pilares empilhados
- a copy principal da seção ficou mais humana e menos institucional
- o lado visual agora reforca que existe uma pessoa real por tras da execução
- o CTA continua discreto para manter o papel de teaser, não de biografia

## Direção visual

Foi adotada a linha recomendada para está etapa:

- logo ampliada
- tipografia editorial curta
- atmosfera calma
- dourado minimo

Sem retrato e sem excesso de informação.

## O que a seção comunica

Para páginas de serviços, a identificação do executor segue [confiança verificável](../architecture/service-landing-pages.md#confiança-verificável). A composição visual registrada nesta etapa não substitui autoria, participação e escopo explícitos.

- existe critério humano por tras do trabalho
- a execução não é automática nem genérica
- vale conhecer a página About completa

## Arquivos centrais

- `src/components/home/AboutTeaser.tsx`
- `src/components/home/AboutTeaser.module.scss`
- `src/app/page.tsx`
- `src/app/home.module.scss`
- `src/resources/content-strategy.ts`

## Critério de aprovacao

- humaniza sem perder sofisticacao
- desperta curiosidade sobre quem está por tras da marca
- melhora a confiança antes do CTA final
