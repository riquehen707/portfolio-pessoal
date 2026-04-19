# Etapa 11 - CTA final, conversao e captacao de leads

Objetivo desta etapa: fazer a Home terminar com clareza operacional e abrir o contato sem friccao desnecessaria.

## Estrutura aplicada

O fechamento da Home agora combina:

1. headline final forte
2. subheadline objetiva
3. CTA principal para agenda
4. CTA secundario para WhatsApp
5. briefing curto dentro da propria secao

## O que mudou

- o bloco final deixou de ser apenas dois botoes e texto de apoio
- o formulario agora usa `Contato` em vez de exigir e-mail
- cada envio carrega `contextLabel` para identificar a origem do lead
- a Home termina com agenda, WhatsApp e briefing no mesmo lugar

## Conversao real

O fluxo final agora cobre tres entradas:

- agenda online
- WhatsApp
- formulario curto

Isso reduz atrito e deixa obvio como comecar.

## Tagging basico de leads

O `ContactBriefForm` passou a enviar a origem no corpo do mailto e na mensagem de WhatsApp.

Exemplo:

- `CTA final da Home`
- `Pagina de contato`

## Arquivos centrais

- `src/components/home/FinalCTA.tsx`
- `src/components/home/FinalCTA.module.scss`
- `src/components/contact/ContactBriefForm.tsx`
- `src/app/page.tsx`
- `src/resources/content-strategy.ts`

## Criterio de aprovacao

- fica obvio como contratar ou falar
- a Home encerra com mais forca que antes
- o proximo passo nao depende de navegar para outra pagina
- o lead chega com contexto minimo suficiente para triagem
