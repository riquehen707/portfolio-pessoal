# Entrada do artigo-matriz

O artigo-matriz é a entrada para transformar texto bruto em artigo editorial. Apenas `linhaEditorial` e o texto são obrigatórios. Os demais campos podem ser inferidos, mas toda inferência relevante deve aparecer no relatório de transformação.

## Modelo

```text
linhaEditorial: fundamentos-e-repertorio
tituloProvisorio:
objetivo:
publico:
ideiaCentral:
cta:
restricoes:

--- texto bruto ---

Cole aqui o texto original, sem tentar formatá-lo como artigo final.
```

## Campos

### `linhaEditorial` — obrigatório

Uma das linhas definidas em [`linhas-editoriais.md`](../02-arquitetura/linhas-editoriais.md). Determina função, profundidade provável, recursos e CTA habitual.

### `tituloProvisorio`

Direção inicial, não compromisso. Pode ser revisado para precisão, leitura ou busca sem mudar a tese.

### `objetivo`

O que o leitor deve compreender, decidir ou conseguir fazer ao terminar.

### `publico`

Quem possui o problema e qual conhecimento já pode ser pressuposto.

### `ideiaCentral`

Afirmação que o artigo sustenta. Deve caber em uma ou duas frases.

### `cta`

Próxima ação principal. Pode ser leitura, aplicação, contato ou nenhum CTA comercial.

### `restricoes`

Trechos que não podem ser removidos, assuntos proibidos, limite de reescrita, necessidade de anonimização, fontes obrigatórias ou qualquer condição particular.

## O que pode ser inferido

Quando ausentes, podem ser inferidos:

- título final;
- objetivo;
- público;
- ideia central;
- estrutura de seções;
- taxonomia;
- componentes MDX;
- links internos;
- necessidade de pesquisa;
- CTA coerente com a linha.

Inferir não significa inventar. Se o texto não sustentar uma decisão, registre a dúvida em vez de preencher com segurança artificial.

## Preservação do original

Mantenha o texto bruto disponível durante toda a transformação. Não substitua a única cópia pela versão editada. O relatório deve permitir comparar intenção, estrutura e acréscimos.
