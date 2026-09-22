# Organização de `src/app/blog/posts/`

Esta pasta mantém os arquivos MDX que alimentam `/blog/[slug]`. A rota pública é definida pelo `slug` do frontmatter, não pelo diretório físico: mover um artigo entre categorias não pode alterar slug, URL, canonical, metadados ou conteúdo.

## Categorias principais atuais

- `entretenimento`: filmes, séries, livros, mangás, quadrinhos, jogos e cultura pop;
- `filosofia`: conceitos, filósofos e guias;
- `tecnologia`: desenvolvimento, fundamentos técnicos e jogos;
- `produtos`: casa, cozinha, eletrodomésticos, eletrônicos e computadores;
- `design`: fundamentos, carreira, ferramentas e UX;
- `negocios`: marketing, e-commerce, vendas e verticais de serviços;
- `sociedade`: política, economia, segurança pública, psicologia e trabalho;
- `educacao`: aprendizagem e marketing educacional;
- `carreira`: profissões e renda digital.

Os subdiretórios existem apenas quando há mais de um artigo que compartilha um recorte claro. Verticais como clínicas, imobiliário e jurídico ficam abaixo de `negocios/marketing`, pois reúnem aplicação de marketing para aquele contexto, não uma coleção genérica independente.

## Como escolher o destino

Classifique pelo assunto e pela intenção editorial predominantes, não pelo formato do texto nem por uma palavra-chave isolada. Use o diretório principal para o domínio e, quando houver um subdiretório existente adequado, use-o para o recorte. Crie uma nova divisão apenas quando ela representar um grupo recorrente e útil para o acervo.

`fundamentos` não é uma categoria global. Um artigo de base deve ficar nos fundamentos da própria área, como `design/fundamentos` ou `tecnologia/fundamentos`; conceitos filosóficos pertencem a `filosofia/conceitos`.

Antes de mover um arquivo, confirme que a descoberta recursiva de posts continua encontrando-o e que nenhum consumidor depende do caminho. Preserve nome do arquivo e frontmatter; em especial, não renomeie o `slug` nem altere a URL pública `/blog/[slug]`.
