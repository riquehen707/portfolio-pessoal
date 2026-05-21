# Etapa 11 - CTA final, conversão e captação de leads

Objetivo desta etapa: fazer a Home terminar com clareza operacional e abrir o contato sem fricção desnecessária.

## Estrutura aplicada

O fechamento da Home agora combina:

1. headline final forte
2. subheadline objetiva
3. CTA principal para agenda
4. CTA secundário para WhatsApp
5. briefing curto dentro da própria seção

## O que mudou

- o bloco final deixou de ser apenas dois botoes e texto de apoio
- o formulário agora usa `Contato` em vez de exigir e-mail
- cada envio carrega `contextLabel` para identificar a origem do lead
- a Home termina com agenda, WhatsApp e briefing no mesmo lugar

## Conversão real

O fluxo final agora cobre três entradas:

- agenda online
- WhatsApp
- formulário curto

Isso reduz atrito e deixa óbvio como começar.

## Tagging basico de leads

O `ContactBriefForm` passou a enviar a origem no corpo do mailto e na mensagem de WhatsApp.

Exemplo:

- `CTA final da Home`
- `Página de contato`

## Arquivos centrais

- `src/components/home/FinalCTA.tsx`
- `src/components/home/FinalCTA.module.scss`
- `src/components/contact/ContactBriefForm.tsx`
- `src/app/page.tsx`
- `src/resources/content-strategy.ts`

## Critério de aprovacao

- fica óbvio como contratar ou falar
- a Home encerra com mais força que antes
- o próximo passo não depende de navegar para outra página
- o lead chega com contexto minimo suficiente para triagem
