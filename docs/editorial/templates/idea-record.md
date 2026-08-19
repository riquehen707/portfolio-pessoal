# Registro público de ideia

Use este guia para cadastrar ou atualizar páginas em `/ideias`. A área funciona como caderno editorial público: deve tornar raciocínio, decisões e aprendizados compreensíveis, não reproduzir um gerenciador de tarefas.

## Cadastrar uma ideia

1. Adicione um objeto em `src/content/ideas/ideas.ts`.
2. Crie um `id` estável no formato `idea_*`; ele não muda se o slug mudar.
3. Preencha `slug`, título, descrição, datas, estado, categorias, tags e as seções editoriais.
4. Use `publicationStatus: "draft"` enquanto o registro não estiver pronto para indexação; publique com `published`.
5. Valide TypeScript e build. A fachada em `src/data/ideas/` é o único acesso recomendado para páginas, busca e sitemap.

Os estados aceitos são `rascunho`, `explorando`, `em-desenvolvimento`, `pausada`, `concluida` e `abandonada`. O campo `progress` é opcional: só o use quando existir uma medida real e explicável.

## Registrar uma atualização

Acrescente um item em `updates` sem apagar os anteriores. Cada item exige data e conteúdo; pode receber título, links e imagem com dimensões conhecidas. A interface ordena as atualizações da mais recente para a mais antiga, portanto a ordem física do array não define a apresentação.

Atualize `updatedAt` para a data da mudança. Se o slug mudar, preserve o `id`, inclua o slug anterior em `aliases` e implemente o redirecionamento permanente antes de publicar.

## Relações e limites

- Use `relatedIdeaIds` para vínculos explícitos entre ideias.
- Use slugs existentes em `relatedArticleSlugs` e `relatedProjectSlugs`; não crie links para conteúdo apenas planejado.
- Categorias organizam áreas amplas; tags descrevem temas específicos e ajudam a descobrir relações.
- Não invente porcentagem, resultado, aprendizado ou próxima etapa. Ausência de informação é melhor que progresso fictício.
