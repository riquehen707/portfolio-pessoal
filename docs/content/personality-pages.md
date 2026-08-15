# Páginas de personalidades

Este é o modelo permanente para autores, escritores, filósofos, mangakás, quadrinistas, diretores, roteiristas e outras pessoas relacionadas às obras do acervo. Todas usam a mesma entidade `Creator`; ocupações múltiplas descrevem a atuação sem criar tipos paralelos de pessoa.

## Fontes técnicas

- Schema: `src/content/creators/creatorSchema.ts`.
- Registros: `src/content/creators/creators.ts`.
- Consulta e relações reversas: `src/data/personalities/index.ts`.
- Rota: `/personalidades/[slug]`.
- Obras: os schemas centrais de filmes, séries, leituras e obras editoriais.

## Dados

Cada registro mantém ID permanente, slug, nome, nome completo ou original quando necessário, estado editorial, datas e local de nascimento e falecimento, país ou região, ocupações, apresentação, biografia breve, temas, ideias principais opcionais, pontos de entrada, personalidades e links relacionados, fontes e datas de manutenção.

Imagem é opcional. Quando existir, deve registrar caminho local, texto alternativo, crédito, URL da página de origem, licença e URL da licença. Use somente fontes verificáveis, preferencialmente Wikimedia Commons. Não copie imagens de busca, redes sociais ou material promocional sem permissão clara. A página deve conservar hierarquia e legibilidade sem retrato.

## Relações com obras

Não mantenha uma bibliografia ou filmografia manual na página. Leituras usam `credits`; filmes e séries usam `personRelationships`; obras editoriais usam `contributors`. Cada relação guarda `personId` e uma ou mais funções. A consulta reversa encontra automaticamente as obras publicadas e a página as renderiza com o card oficial do acervo correspondente.

`workIds` permanece no schema por compatibilidade com registros anteriores, mas não é a fonte da seção “Obras no acervo”. Dados como título, capa, ano e sinopse pertencem exclusivamente à obra.

## Seções

1. Apresentação: retrato opcional, nome, ocupações, origem, período de vida e resumo.
2. Sobre: dois ou poucos parágrafos verificáveis e temas relevantes.
3. Ideias principais: bloco opcional de conceitos curtos e explicados em linguagem acessível; não repetir a biografia nem criar uma seção vazia.
4. Obras no acervo: relações reversas, agrupadas por tipo.
5. Por onde começar: pequena trilha de referências por ID, cada uma com justificativa editorial curta; a ordem deve ser apresentada como sugestão, não hierarquia absoluta.
6. Conteúdos e personalidades relacionados: links internos confirmados e pessoas referenciadas por ID. Perfis ainda em rascunho aparecem apenas como contexto, sem link para rota pública inexistente.
7. Fontes e créditos: referências biográficas e licença da imagem visíveis.

## SEO e publicação

Perfis públicos precisam de `status: "published"`, biografia suficiente e ao menos uma fonte confiável. A rota gera título, descrição, canonical, Open Graph, breadcrumbs e JSON-LD `Person` apenas com dados visíveis. Perfis incompletos continuam como rascunho, fora dos parâmetros estáticos e do sitemap. Bibliografias usam somente obras publicadas. Uma filmografia factual pode projetar registros centrais ainda em revisão quando o vínculo profissional estiver confirmado e o card permanecer sem link para página individual; a apresentação deve separar funções como direção e roteiro. Registros sem crédito confirmado não aparecem.

Antes de publicar, confirme nomes e datas, papéis nas obras, direitos da imagem, links internos e ausência de seções vazias. Execute auditoria de conteúdo, TypeScript, lint, build e `git diff --check`.
