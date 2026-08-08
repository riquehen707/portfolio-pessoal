# Relatório de transformação — Database design patterns

Data: 8 de agosto de 2026

## Escopo e abordagem

- Criado guia técnico para desenvolvedores iniciantes a intermediários com SQL básico.
- Mantido `database design patterns` como consulta principal e adotado PostgreSQL 18 explicitamente nos exemplos.
- Separados padrões de esquema, padrões de acesso a dados no código, heurísticas e decisões condicionadas pela carga.
- Evitada equivalência entre bancos relacionais e famílias NoSQL.

## Estrutura acrescentada

- Fundamentos de entidade, cardinalidade, integridade, normalização e índices.
- Dez padrões com problema, estrutura, vantagens, riscos e condições de uso.
- Sete antipadrões com consequências concretas.
- Dois diagramas ER em texto, renderizados pelo `CodeBlock` já existente.
- Tabela comparativa, estudo evolutivo e checklist de revisão.
- Exemplos SQL curtos no dialeto PostgreSQL.

## Fontes consultadas

- Documentação oficial do PostgreSQL para constraints, CTEs recursivas, JSONB, ranges, Row-Level Security, materialized views e `EXPLAIN`.
- AWS Prescriptive Guidance para definição e compromissos do transactional outbox.
- Consulta realizada em 8 de agosto de 2026.

## Decisões e limites

- Soft delete, chave substituta e normalização foram apresentados como decisões contextuais, não mandamentos.
- Outbox foi delimitado ao problema de dual write e não recebeu promessa de entrega exatamente uma vez.
- Multi-tenancy inclui chaves compostas e alerta sobre os limites de RLS.
- Performance foi relacionada a dados, carga, consultas, plano e infraestrutura; nenhum benchmark foi inventado.
- Não foi criado componente de diagrama: o projeto já transforma blocos cercados em um componente de código responsivo e acessível.

## Links internos verificados

- `/blog/desenvolvimento-web`
- `/blog/marketing-orientado-a-dados`
