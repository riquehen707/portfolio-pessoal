# Auditoria de imagens do acervo — 24 de agosto de 2026

## Escopo

Foram auditadas 590 entidades publicadas ou cadastradas nos catálogos exportados:

- 356 filmes;
- 47 séries;
- 187 obras de leitura, incluindo livros, mangás, manhwas, manhuas e quadrinhos.

A auditoria considera a imagem efetivamente resolvida pelo card. Para obras de leitura, isso inclui a capa da edição ou do volume selecionado pelo catálogo, sem copiar a imagem para a obra intelectual.

O resultado completo e reproduzível está em `exports/content/media-audit.v1.json`. A rotina pode ser executada com `npm run audit:media`; a variante `npm run audit:media:remote` também verifica os endereços de origem e separa respostas conclusivas de bloqueios ou timeouts.

## Resultado consolidado

| Situação | Total |
| --- | ---: |
| Entidades auditadas | 590 |
| Com imagem efetiva | 441 |
| Sem imagem adequada | 149 |
| Imagens com estrutura, arquivo, fonte e dimensões verificadas | 435 |
| Imagens de baixa resolução ainda em revisão | 6 |
| Referências locais quebradas | 0 |
| Arquivos duplicados atribuídos a obras diferentes | 0 |
| SVGs usados como capas ou pôsteres | 0 |
| URLs de origem confirmadas como 404 ou 410 | 0 |

### Cobertura por tipo

| Tipo | Total | Com imagem | Sem imagem |
| --- | ---: | ---: | ---: |
| Filmes | 356 | 298 | 58 |
| Séries | 47 | 0 | 47 |
| Obras de leitura | 187 | 143 | 44 |

## Correções realizadas

- Os 298 pôsteres locais de filmes receberam largura e altura reais no catálogo. O sincronizador agora preserva essas dimensões em futuras importações.
- Os fallbacks de filmes, séries, livros e quadrinhos foram reduzidos a superfícies neutras com borda discreta. Gradientes, losangos e padrões que poderiam parecer uma arte editorial foram removidos.
- Quatro miniaturas quadradas ou inadequadamente reduzidas foram substituídas por capas verticais de fonte oficial ou bibliográfica: *Nossa Parte de Noite*, *O Homem de Giz*, *O Que Aconteceu com Annie* e *Infiel*.
- A imagem de *A Própria Carne: Escrito com Sangue* foi desvinculada e removida porque o arquivo disponível era um mockup promocional, não uma capa plana confiável. A obra usa agora o fallback neutro.
- Textos alternativos das quatro capas substituídas foram simplificados e os metadados de dimensões, crédito e origem foram corrigidos.
- Nenhuma imagem foi criada, redesenhada, reconstruída ou gerada por IA.

## Imagens mantidas

Foram mantidas 435 imagens que passaram pelos critérios estruturais automatizados:

- arquivo local existente e legível;
- formato raster, não SVG;
- dimensões declaradas compatíveis com o arquivo;
- origem e crédito registrados;
- fonte pertencente à lista de editoras, estúdios, plataformas oficiais ou bases bibliográficas aceitas;
- ausência de hash duplicado entre obras diferentes.

Esse resultado confirma integridade técnica e procedência registrada. Ele não substitui uma conferência humana, capa a capa, de identidade visual de todas as 435 imagens.

## Pendências

### Sem imagem adequada

Permanecem 149 entidades sem imagem: 58 filmes, todas as 47 séries e 44 obras de leitura. Elas continuam com fallback funcional e neutro. A lista nominal completa está no campo `issues` de `exports/content/media-audit.v1.json`.

Preencher essas lacunas exige nova pesquisa individual por obra. Nenhuma imagem genérica, fanart, frame, thumbnail ou composição tipográfica foi introduzida para elevar artificialmente a cobertura.

### Baixa resolução

Seis capas permanecem abaixo do limite conservador de 200 × 300 pixels ou muito próximas dele:

- *The Vampyre*;
- *The Gilda Stories*;
- *Boy's Life*;
- *Something Wicked This Way Comes*;
- *Imaginary Friend*;
- *The Tomb of Dracula*.

As seis são capas reais com fonte registrada. Foram mantidas temporariamente porque a auditoria não encontrou, neste ciclo, uma reprodução maior que pudesse ser vinculada com segurança à mesma edição. Devem ser priorizadas em revisão manual futura.

### Verificação remota

Dos 441 endereços de origem verificados, 222 responderam normalmente. Nenhum respondeu com 404 ou 410. Os demais retornaram principalmente `429` do TMDB, `403` de editoras ou timeout do Open Library; esses casos foram classificados como bloqueados ou inconclusivos, não como links quebrados.

Os arquivos servidos pelo site são locais e todos existem. Portanto, bloqueios nas páginas de atribuição não interrompem a exibição das capas e pôsteres atuais.

## Fontes encontradas

As imagens auditadas usam principalmente:

- TMDB e páginas da Wikipedia para pôsteres promocionais de filmes;
- editoras e distribuidoras oficiais;
- Google Books e Open Library para edições identificadas por ISBN;
- plataformas oficiais de quadrinhos digitais, como WEBTOON, Tapas, INKR e Tappytoon;
- catálogos de editoras brasileiras, incluindo Intrínseca, Companhia das Letras, DarkSide, JBC, Panini e Pipoca & Nanquim;
- reproduções históricas em domínio público no Wikimedia Commons.

## Limites da auditoria

A tentativa de inspeção visual automatizada dos cards no navegador foi impedida pela política de sandbox da sessão. A consistência foi verificada no código, nas dimensões reais dos arquivos e no build, mas ainda é recomendável conferir manualmente `/filmes`, `/series`, `/livros` e `/quadrinhos` em larguras mobile e desktop antes de uma publicação em produção.
