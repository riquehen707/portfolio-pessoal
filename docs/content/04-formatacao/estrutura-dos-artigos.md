# Estrutura dos artigos

Não existe um molde visual obrigatório para todo texto. Existe uma sequência de decisão que preserva leitura, identidade e consistência.

Escopo: artigos em `/blog/[slug]`, inclusive os que ensinam sobre landing pages. Para a estrutura comercial de `/servicos` e páginas individuais de conversão, usar o [guia de serviços](../../architecture/service-landing-pages.md); os limites de blocos MDX não definem o template dessas páginas.

## Estrutura padrão

### Frontmatter

Use somente campos válidos no schema e necessários ao artigo. `title`, `slug` e `summary` são essenciais na prática; o schema exige os três após a inferência do slug pelo leitor de arquivos.

### Abertura

A página já apresenta título e resumo. O corpo não deve repeti-los com outras palavras.

Quando houver três ou mais ideias que ajudem a orientar a leitura, use `QuickSummary`. Ele é manual e deve sintetizar o conteúdo real.

### Índice

O índice é gerado automaticamente a partir dos títulos `##`. No mobile, aparece fechado logo depois de `QuickSummary`; quando não existe resumo manual, usa a posição de fallback antes do corpo.

Não criar índice manual.

### Desenvolvimento

- Use `##` para grandes partes.
- Use `###` somente para subdivisões que pertençam claramente à parte anterior.
- Cada seção deve cumprir uma pergunta, decisão ou etapa.
- Comece com texto normal antes de empilhar recursos visuais.
- Em textos longos, use `NextSection` para antecipar a próxima grande parte.

### Encerramento

Recupere a consequência prática da ideia central. Use `NextSteps` quando houver sequência concreta. Um CTA principal é permitido; ações secundárias devem parecer links comuns.

## Tamanho e ritmo

Aplicar [densidade e ritmo](../01-fundamentos/voz-e-estilo.md#densidade-e-ritmo) da diretriz global; este guia mantém os critérios de apresentação do artigo.

- Texto-base mobile entre 17 e 18 px.
- Entrelinha entre 1,6 e 1,75.
- Evite mais de dois blocos visuais consecutivos sem texto normal.

## Componentes

Cada artigo usa no máximo quatro tipos de bloco editorial, além de:

- imagens e comparadores;
- `QuickSummary`;
- `NextSection`;
- `NextSteps`.

O limite conta tipos, não ocorrências. Repetir o mesmo bloco várias vezes ainda deve ser justificado pelo ritmo.

## Estrutura curta

As sequências abaixo são referências de organização, não listas de blocos obrigatórios. Aplicar o [critério global de função](../../architecture/site-architecture.md#critério-de-função) e as condições de uso de cada componente.

1. Problema ou contexto.
2. Explicação central.
3. Aplicação ou consequência.
4. Próximo passo.

Não adicionar resumo, FAQ, diagnóstico e CTA apenas para preencher uma estrutura.

## Estrutura longa

1. `QuickSummary`.
2. Índice automático.
3. Fundamento.
4. Aplicação.
5. Limites ou erros.
6. Exemplo, comparação ou evidência.
7. Próximos passos.

Use `NextSection` apenas entre partes realmente extensas.

## Conteúdo recolhível

FAQ, índice e materiais complementares ficam fechados por padrão. Conteúdo indispensável à tese não deve ser escondido dentro de `Reveal`.
