# Auditoria de imagens do acervo — 24 de agosto de 2026

## Escopo

Foram auditadas 590 entidades dos catálogos exportados: 356 filmes, 47 séries e 187 obras de leitura. O resultado reproduzível está em `exports/content/media-audit.v1.json` e pode ser atualizado com `npm run audit:media`.

## Resultado consolidado

| Situação | Total |
| --- | ---: |
| Entidades auditadas | 590 |
| Com imagem efetiva | 582 |
| Sem imagem adequada | 8 |
| Imagens estruturalmente verificadas | 571 |
| Imagens de baixa resolução em revisão | 6 |
| Fontes que exigem revisão | 5 |
| Referências locais quebradas | 0 |
| Arquivos duplicados atribuídos a obras diferentes | 0 |

| Tipo | Total | Com imagem | Sem imagem |
| --- | ---: | ---: | ---: |
| Filmes | 356 | 355 | 1 |
| Séries | 47 | 47 | 0 |
| Obras de leitura | 187 | 180 | 7 |

## Correções realizadas

- Os pôsteres locais de filmes receberam dimensões reais no catálogo, preservadas pelo sincronizador.
- Foram adicionados 57 pôsteres de filmes e 47 de séries, armazenados localmente e ligados à origem registrada.
- Foram adicionadas 37 capas de leitura após conferência de título, edição e editora; homônimos, volumes errados, mockups e placeholders foram descartados.
- O importador de filmes passou a ler o catálogo exportado; séries e leituras ganharam fluxos equivalentes e manifestos centrais.
- Os fallbacks foram reduzidos a superfícies neutras, sem arte que possa ser confundida com material oficial.
- Nenhuma capa, pôster ou representação de obra foi criada ou reconstruída por IA.

## Pendências

Permanecem sem imagem adequada:

- filme: *Narnia* (2026), sem pôster oficial confirmado;
- leituras: *Baltimore*, *Carniça e a Blindagem Mística*, *Lua Negra*, *A Própria Carne: Escrito com Sangue*, *Três Buracos*, *Insomniacs After School* e *Nodame Cantabile*.

Essas obras permanecem com fallback neutro porque as fontes consultadas não entregaram uma capa plana, acessível e inequivocamente ligada à edição correta. Um placeholder 1 × 1 encontrado para *Baltimore* e o mockup de *A Própria Carne* foram explicitamente rejeitados.

Seis capas reais continuam abaixo do limite conservador de resolução: *The Vampyre*, *The Gilda Stories*, *Boy's Life*, *Something Wicked This Way Comes*, *Imaginary Friend* e *The Tomb of Dracula*. Elas foram mantidas por terem fonte identificada e não haver substituição segura para a mesma edição neste ciclo.

## Critérios e limites

A verificação estrutural exige arquivo local legível, formato raster, dimensões coerentes, origem e crédito registrados e ausência de duplicação entre obras. Ela confirma integridade técnica e procedência registrada, mas não substitui revisão visual humana de todas as imagens.

A inspeção visual automatizada dos cards foi impedida pela política de sandbox desta sessão. A consistência foi verificada no código, nos arquivos e no build; ainda é recomendável conferir manualmente `/filmes`, `/series`, `/livros` e `/quadrinhos` em mobile e desktop.
