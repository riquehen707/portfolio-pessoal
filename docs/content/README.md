# Sistema editorial

Esta pasta explica como transformar texto bruto em artigo publicado sem descaracterizar a voz do autor nem criar variações arbitrárias de estrutura.

## Autoridade das fontes

Em caso de divergência, siga esta ordem:

1. [`postSchema.ts`](../../src/components/blog/postSchema.ts): campos aceitos no frontmatter.
2. [`mdx.tsx`](../../src/components/mdx.tsx): componentes disponíveis dentro dos artigos.
3. Documentação desta pasta: critérios editoriais para usar essas possibilidades.
4. Exemplos e artigos antigos: referência, nunca regra definitiva.

Não documente como disponível algo que o schema ou o mapeamento MDX não aceitem.

## Leitura por tarefa

- Escrever ou adaptar texto: [`voz-e-estilo.md`](01-fundamentos/voz-e-estilo.md).
- Escolher abordagem: [`linhas-editoriais.md`](02-arquitetura/linhas-editoriais.md).
- Preencher frontmatter: [`taxonomia.md`](02-arquitetura/taxonomia.md).
- Receber um texto bruto: [`entrada-artigo-matriz.md`](03-producao/entrada-artigo-matriz.md).
- Executar a transformação: [`fluxo-de-criacao.md`](03-producao/fluxo-de-criacao.md).
- Pesquisar e citar: [`pesquisa-e-referencias.md`](03-producao/pesquisa-e-referencias.md).
- Estruturar e formatar: [`estrutura-dos-artigos.md`](04-formatacao/estrutura-dos-artigos.md) e [`componentes-mdx.md`](04-formatacao/componentes-mdx.md).
- Aprovar conteúdo: [`checklist-editorial.md`](06-validacao/checklist-editorial.md).

## Regra de manutenção

Decisões permanentes devem ser registradas em [`decisoes-editoriais.md`](historico/decisoes-editoriais.md). Instruções temporárias, pautas e preferências de um artigo específico não pertencem ao histórico.

Os documentos ainda não criados na arquitetura planejada serão adicionados conforme houver decisões reais a registrar.
