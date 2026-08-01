# Relatório de transformação — Fundamentos do design visual

## Contrato editorial

- Linha editorial: fundamentos e repertório, com relação secundária a design e produto digital.
- Público: iniciantes e profissionais que desejam revisar critérios de composição visual.
- Ideia central: fundamentos não são fórmulas de beleza; são critérios relacionados que ajudam a organizar informações conforme público, objetivo e contexto.
- Próximo passo: aprofundar conceito de design e aplicar a base em estudos e projetos.

## Estrutura e decisões

- O briefing foi desenvolvido como guia completo; não havia relato pessoal ou texto autoral contínuo a preservar, remover ou fundir.
- A abertura parte de uma peça que parece estranha sem apresentar um erro isolado, conforme solicitado.
- `ArticleIndex` não foi usado porque a documentação o marca como indisponível e o índice da publicação é automático.
- A visão geral reutiliza `EditorialTable` com duas colunas e `mobileMode="cards"`, garantindo tabela semântica no desktop e blocos verticais no mobile.
- O exemplo do prato do dia é hipotético e contínuo; não representa cliente, teste ou resultado real.
- Não foram criados componentes, estilos ou imagens. Os recursos existentes atendem à função didática sem alterar a arquitetura do site.
- A capa reutiliza o gerador editorial existente. `canonical` foi omitido porque a rota natural é canônica.

## Acréscimos e sínteses didáticas

- Cada fundamento recebeu significado, problema tratado, manifestação possível, erro comum e pergunta de avaliação.
- Os princípios foram apresentados como conjunto editorial útil, não como lista universal ou teoria completa do design.
- A relação entre princípios foi explicitada por exemplos de mudanças em tamanho, posição, espaço, tipografia e cor.
- O exercício e o checklist foram acrescentados para transformar observação em análise executável.
- Os critérios de contraste textual da WCAG 2.2 foram incluídos para separar contraste compositivo de requisito de acessibilidade.

## Fontes consultadas

- Interaction Design Foundation, “What are the Gestalt Principles?”: agrupamento perceptivo, proximidade e similaridade. Fonte especializada de caráter introdutório; usada sem transformar a Gestalt em teoria total do design.
- W3C Web Accessibility Initiative, “Understanding Success Criterion 1.4.1: Use of Color”: informação não deve depender apenas de cor.
- W3C Web Accessibility Initiative, “Understanding Success Criterion 1.4.3: Contrast (Minimum)”: finalidade e razões mínimas de contraste para texto e imagens de texto na WCAG 2.2.
- Consulta realizada em 31 de julho de 2026.

## Componentes escolhidos

- `QuickSummary`: síntese inicial em quatro pontos.
- `Definition`: definição didática única.
- `EditorialTable`: comparação principal responsiva.
- `PracticalExample`: revisão contínua e argumentada da publicação.
- `EditorialChecklist`: verificação final executável.

`QuickSummary` não conta no limite editorial. Os quatro tipos de bloco editorial respeitam o máximo definido pelo projeto.

## Links internos

- `/blog/o-que-e-design`: base conceitual sobre design, forma, função e contexto.
- `/blog/como-comecar-a-trabalhar-com-design`: continuidade prática para estudo e projetos.

## Limitações e dúvidas

- Os dez fundamentos são uma seleção didática solicitada pelo briefing. Nomenclaturas e agrupamentos variam entre autores, escolas e áreas.
- Os testes sugeridos no exemplo são métodos de avaliação, não evidências de um teste realizado.
- Critérios de acessibilidade citados concentram-se em cor e contraste; a conformidade de uma interface exige avaliar o conjunto aplicável da WCAG e não pode ser inferida pela aparência.
- Nenhuma dúvida editorial impede a publicação.
