# Relatório de transformação — O que é design?

## Contrato editorial

- Linha editorial: fundamentos e repertório, com relação direta a design e produto digital.
- Público: leitores que associam design principalmente a beleza, criatividade ou uso de ferramentas.
- Ideia central: design organiza forma, função, informação e experiência por meio de decisões adequadas a pessoas, objetivos, contextos e restrições.
- Próximo passo: guia de entrada na profissão e vocabulário de design.

## Estrutura e decisões

- O briefing foi transformado em artigo conceitual completo; não havia texto autoral bruto a preservar, remover ou fundir.
- O conteúdo evita repetir o panorama de carreira do guia anterior e concentra-se em conceito, processo e avaliação.
- `ArticleIndex` não foi usado porque o índice do projeto é automático e o componente está documentado como indisponível.
- A comparação conceitual reutiliza `EditorialTable`, que já possui modo mobile em cards.
- O processo reutiliza `NumberedContextList`; não foi criado um diagrama ou funil decorativo.
- O cardápio é um exemplo hipotético contínuo e não um estudo de caso real.
- A capa usa o gerador editorial existente. `canonical` foi omitido porque a rota natural já é canônica.

## Conceitos fundamentados

- Design Council: pesquisa, definição, desenvolvimento, entrega, divergência, convergência e iteração.
- IDSA: integração entre aparência, funcionalidade, fabricação e experiência no design industrial.
- W3C: contraste, uso não exclusivo de cor, foco visível, identificação de elementos, adaptação a telas e contexto de uso.
- W3C: acessibilidade, usabilidade e inclusão são relacionadas, mas não equivalentes.

## Sínteses didáticas

- A definição destacada integra processo, forma, função, informação, experiência, público, objetivo e restrições; não é uma citação literal nem definição universal.
- Design, arte, estética e decoração foram comparados por foco predominante, sem fronteiras absolutas.
- O percurso de dez movimentos organiza uma leitura introdutória e não representa processo linear obrigatório.
- Os critérios finais traduzem adequação em perguntas verificáveis para diferentes áreas.

## Interpretações e limitações

- A análise do cardápio digital é hipotética e ilustra relações de causa e efeito.
- O artigo não afirma que todo problema pode ser resolvido por design ou que adequação elimina consequências negativas.
- Gosto e estética não foram removidos da avaliação; foram posicionados ao lado de objetivos, evidências e contexto.
- Requisitos específicos variam conforme área, risco, legislação, tecnologia e pessoas afetadas.

## Componentes escolhidos

- `QuickSummary`: orientação inicial.
- `Definition`: síntese conceitual única.
- `EditorialTable`: comparação responsiva.
- `NumberedContextList`: processo introdutório.
- `PracticalExample`: redesenho contextualizado do cardápio.
