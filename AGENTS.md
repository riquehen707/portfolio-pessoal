# Instruções do repositório

## Escopo editorial

Ao criar, revisar, classificar ou formatar artigos em `src/app/blog/posts/`, consulte primeiro `docs/content/README.md` e siga o roteiro correspondente à tarefa.

Leituras mínimas:

- escrita ou adaptação: `docs/content/01-fundamentos/voz-e-estilo.md`;
- escolha de abordagem: `docs/content/02-arquitetura/linhas-editoriais.md`;
- frontmatter e classificação: `docs/content/02-arquitetura/taxonomia.md`;
- transformação de texto bruto: `docs/content/03-producao/entrada-artigo-matriz.md` e `fluxo-de-criacao.md`;
- pesquisa: `docs/content/03-producao/pesquisa-e-referencias.md`;
- estrutura e MDX: `docs/content/04-formatacao/estrutura-dos-artigos.md` e `componentes-mdx.md`;
- aprovação: `docs/content/06-validacao/checklist-editorial.md`.

## Fontes técnicas definitivas

- `src/components/blog/postSchema.ts` define os campos aceitos.
- `src/components/mdx.tsx` define os componentes disponíveis no MDX.

Se a documentação contradizer o código, não improvise: siga a fonte técnica, corrija a documentação dentro do escopo da tarefa ou registre a divergência.

## Limites de transformação

- Preserve opinião, experiência, informalidade funcional e grau de certeza do autor.
- Não invente experiência pessoal, dado, fonte ou conclusão.
- Registre alterações estruturais, remoções, acréscimos e inferências relevantes.
- Use Markdown antes de componentes.
- Limite cada artigo a quatro tipos de bloco editorial, além de imagens, `QuickSummary`, `NextSection` e `NextSteps`.
- Não empilhe mais de dois blocos visuais sem texto normal.
- Use no máximo um CTA principal.
- Não reintroduza componentes marcados como indisponíveis na documentação.

## Mudanças no sistema editorial

Antes de alterar schema, mapeamento MDX, taxonomia ou regra permanente:

1. procure usos existentes;
2. preserve compatibilidade ou migre os artigos afetados;
3. atualize os documentos diretamente relacionados;
4. registre a decisão permanente no histórico quando ele existir;
5. valide TypeScript e build em proporção ao impacto.

## Trabalho no repositório

Preserve mudanças preexistentes e não relacionadas. Não publique, faça commit ou deploy sem que a solicitação inclua essa intenção.
