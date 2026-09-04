# Relatório de transformação — API design principles

## Escopo

- Guia técnico novo para `api design principles`, em português brasileiro.
- Exemplos delimitados a APIs HTTP com JSON, distinguindo recomendações gerais de decisões específicas de REST/HTTP.
- Integração ao módulo `dados-e-backend`, sem alterar artigos ou URLs existentes.

## Pesquisa e decisões

- Semântica de métodos, segurança, idempotência, precondições e códigos baseada no RFC 9110.
- Erros estruturados baseados no RFC 9457, sem apresentar Problem Details como formato obrigatório.
- OpenAPI 3.2.0 registrada como versão vigente na verificação de 8 de agosto de 2026.
- Segurança OAuth atualizada pelo RFC 9700; depreciação e encerramento baseados nos RFCs 9745 e 8594.
- Idempotency keys, paginação e estratégia de versão explicitadas como contratos contextuais, não como regras universais do HTTP.

## Estrutura editorial

- Reutilização de `QuickSummary`, `EditorialTable`, `EditorialComparison`, `EditorialChecklist` e `NextSteps`.
- Exemplos HTTP, JSON e texto usam blocos de código já suportados pelo projeto.
- Estudo evolutivo mantém IDs, campos, estados, moeda e paginação coerentes entre request, response e erro.
- Links internos usam somente slugs verificados no repositório.

## Limitações

- Os exemplos não constituem uma implementação completa de autenticação, autorização ou persistência.
- Nenhum mecanismo de idempotency key foi apresentado como padrão IETF final.
- O diagrama textual explica responsabilidades, mas não representa todas as camadas possíveis de uma arquitetura distribuída.
