# Relatório de transformação — reconhecimento facial na segurança pública

## Escopo

- Artigo analítico da série Eleições 2026.
- Gancho confirmado no plano Brasil Sem Medo: Muralha Brasileira com mais de um milhão de novas câmeras, integração a bancos criminais e uso em portos, aeroportos e áreas públicas.
- O conteúdo aprofunda biometria sem repetir a comparação já publicada entre câmeras urbanas e corporais.

## Pesquisa e decisões

- O sistema foi analisado como cadeia: captura, base, algoritmo, limiar, alerta, revisão, abordagem, confirmação, correção e auditoria.
- Foram separados verificação 1:1 e identificação 1:N.
- O segundo relatório do Smart Sampa foi lido integralmente nas seções de abordagens, prisões e liberações.
- Resultados do Smart Sampa foram apresentados como autorrelato operacional, sem inferir causalidade sobre criminalidade.
- NIST foi usado para variabilidade técnica e demográfica; ANPD, LGPD e relatório da PF para finalidade, necessidade, riscos e governança.

## Dados reproduzidos

- Período do relatório municipal: 22/05/2025 a 22/11/2025.
- 1.334 abordagens: 1.198 prisões confirmadas, sete liberações no local e 129 liberações após condução.
- Das 129 liberações: 88 por falta de baixa do mandado, cinco por inconsistência cadastral e 36 por inconsistência facial.
- Galeria informada: aumento de aproximadamente 80 mil para 172 mil faces; limiar superior a 92%.

## Inferências e limites

- “92% de similaridade” não foi convertido em probabilidade de identidade.
- O exemplo de valor preditivo positivo é explicitamente hipotético e serve apenas para demonstrar efeito de escala.
- O relatório não permite calcular taxa total de falsos positivos por comparação porque não publica o universo completo de passagens e alertas descartados.
- Nenhum número foi usado como benchmark universal para a proposta nacional.

## Componentes usados

- `QuickSummary`
- `NumberedContextList`
- `PracticalExample`
- `EditorialTable` em modo de cartões no mobile
- `DecisionPoints`
- `NextSteps`
