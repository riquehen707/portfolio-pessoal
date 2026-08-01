# Relatório de transformação — Como montar um PC

## Contrato editorial

- Entrada: pauta detalhada fornecida em 1º de agosto de 2026.
- Linha editorial: Tecnologia útil e processo.
- Público: iniciantes montando computador para estudo, trabalho, criação ou jogos.
- Tese preservada: necessidade, equilíbrio e compatibilidade importam mais que preço ou rótulo.

## Estrutura e decisões

- O conteúdo evergreen foi separado da seção temporal de configurações e preços.
- As 13 etapas foram condensadas em 10 etapas preservando todas as ações e alertas.
- `ArticleIndex` não foi usado porque o índice é automático.
- Não foram usadas fotografias sem fonte e licença verificáveis; instruções críticas possuem alternativa textual completa.
- Não foi criado planejador de orçamento: o projeto não possui dados de catálogo confiáveis para recomendação automática. O artigo orienta uma planilha manual auditável.
- Foram incluídas três configurações, não todas as categorias solicitadas, porque elas cobrem os usos sustentados pela pesquisa atual sem inventar combinações.

## Componente novo

- `CompatibilityChecklist`: checklist agrupado, operável por mouse e teclado, com rótulos associados, contador anunciado e layout responsivo.
- O conteúdo permanece no HTML e compreensível sem interação; marcações não persistem.
- O componente foi registrado em `mdx.tsx`, `index.ts`, limites editoriais e documentação.

## Pesquisa temporal

- Data: 1º de agosto de 2026.
- Ryzen 5 5600GT, 16 GB e SSD 1 TB: referência comercial observada perto de R$ 3.230 à vista.
- RX 9060 XT 16 GB: modelos observados aproximadamente entre R$ 2.900 e R$ 3.600.
- Preços excluem frete, monitor, periféricos, licença e montagem.
- Faixas são aproximações editoriais e precisam de nova pesquisa antes da compra.

## Fontes e escopo

- AMD: soquetes, memória, gráficos integrados e especificações de referência da GPU.
- Microsoft: criação oficial de mídia do Windows.
- Terabyte e KaBuM: observação de preço e disponibilidade; não usadas como prova comparativa de desempenho.
- Manuais do modelo exato continuam sendo a fonte definitiva de encaixe, BIOS e compartilhamento de pistas.

## Componentes MDX

- `QuickSummary` para orientação inicial.
- `EditorialTable` para componentes, configurações e formas de compra.
- `CompatibilityChecklist` para compra e pré-boot.
- Markdown para respostas diretas de FAQ, evitando propriedades estruturadas que não sobrevivem à pré-renderização atual.

Foram usados dois tipos de bloco editorial além de `QuickSummary`. Não houve CTA comercial nem link afiliado.

## Limitações

- Nenhuma montagem física foi executada; dimensões e BIOS precisam ser reconferidas nos SKUs comprados.
- Não foram publicados benchmarks próprios nem temperaturas universais.
- Configurações não incluem recomendação fechada de fonte, placa-mãe, SSD ou gabinete sem revalidar preço e disponibilidade.
- Os guias específicos de CPU, GPU, RAM, fonte, armazenamento e manutenção ainda não existem; não foram criados links quebrados.
