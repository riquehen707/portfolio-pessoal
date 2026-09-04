# Comentários nas fichas de leitura

O sistema de comentários das páginas `/livros/[slug]` usa Supabase como persistência e rotas próprias do Next.js como única superfície pública. Disqus não foi adotado porque adicionaria rastreamento e dependência de um widget externo, dificultaria a portabilidade por ID permanente e ofereceria menos controle sobre moderação e apresentação.

## Estado e arquitetura

- O componente `ReadingComments` só é renderizado quando as três variáveis de ambiente estão configuradas.
- O navegador chama `/api/comments`; ele nunca acessa o Supabase diretamente.
- A rota aceita somente IDs de obras publicadas e grava todo comentário como `pending`.
- A leitura retorna somente comentários `published`.
- O comentário aponta para `work_id`, não para slug ou URL.
- A tabela não concede acesso a `anon` ou `authenticated`. A chave secreta existe somente no servidor e opera como `service_role`.
- RLS permanece habilitada como defesa adicional, embora `service_role` a contorne por definição.
- Um HMAC-SHA256 do IP limita abuso sem armazenar o endereço original. O segredo usado no HMAC não pode ser a chave do Supabase.

## Variáveis de ambiente

Configure localmente e na Vercel, sem versionar valores:

```text
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
COMMENTS_HASH_SECRET=uma-string-aleatoria-longa-e-exclusiva
```

Use uma chave secreta moderna `sb_secret_...`, exclusiva para este backend. Não use prefixo `NEXT_PUBLIC_`, não exponha a chave no navegador e não reutilize `COMMENTS_HASH_SECRET` em outro sistema.

## Ativação

1. crie ou selecione um projeto Supabase;
2. vincule a CLI ao projeto;
3. revise `supabase/migrations/20260819023558_create_reading_comments.sql`;
4. aplique a migração pelo fluxo oficial do projeto;
5. execute os Database Advisors e corrija alertas aplicáveis;
6. configure as três variáveis no ambiente de execução;
7. envie um comentário de teste e confirme que ele fica `pending` e não aparece publicamente;
8. altere o teste para `published`, preenchendo `moderated_at`, e confirme sua exibição;
9. teste rejeição, exclusão lógica e os limites de um minuto e cinco envios em 24 horas.

Não ative o componente apenas com variáveis locais sem aplicar e testar a migração no projeto correspondente.

## Moderação

Enquanto não houver um painel administrativo autenticado, modere pelo Table Editor do Supabase. Nunca exponha uma rota pública de moderação.

- `pending`: aguardando revisão;
- `published`: visível na ficha;
- `rejected`: preservado para auditoria, mas não publicado;
- `deleted`: remoção lógica solicitada ou administrativa.

Ao sair de `pending`, preencha `moderated_at`. Não edite o sentido do comentário silenciosamente; rejeite conteúdo que viole a política. Pedidos de remoção devem mudar o estado para `deleted`, preservando somente o mínimo necessário para auditoria e prevenção de abuso.

## Política editorial e privacidade

São aceitas concordâncias, discordâncias, correções e experiências de leitura. Rejeite ataques pessoais, discriminação, spam, divulgação de dados pessoais, conteúdo ilegal e spoilers relevantes sem aviso claro.

O formulário solicita apenas nome público e comentário. Não solicita conta, e-mail ou telefone. O hash técnico não permite recuperar o IP sem o segredo, mas ainda deve ser tratado como dado operacional: restrinja o acesso, defina retenção e rotacione o segredo se houver suspeita de vazamento.

Comentários não alteram a avaliação editorial, não entram no JSON-LD da obra e não são conteúdo canônico do catálogo.

## Validação obrigatória

- validar TypeScript, build e `git diff --check`;
- confirmar que nenhum segredo aparece no bundle ou HTML;
- testar GET apenas com registros `published`;
- testar POST válido, payload inválido, honeypot, origem externa e obra inexistente;
- testar grants e RLS com papéis `anon`, `authenticated` e `service_role`;
- executar os advisors do Supabase após aplicar a migração;
- revisar acessibilidade, estados de erro, teclado e layout mobile.
