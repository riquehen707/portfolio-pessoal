# ETAPA 14 — Performance Final + SEO Técnico + Analytics + Lançamento Profissional

> **Registro histórico.** Esta etapa não orienta novas implementações nem comprova o estado atual. Consulte as [fontes vigentes](../architecture/site-architecture.md#autoridade-e-manutenção-da-documentação).

## O que entrou

- `@vercel/analytics` e `@vercel/speed-insights` na base para pageviews, eventos e Core Web Vitals reais.
- `AnalyticsProvider` global com:
  - page view por rota
  - scroll depth
  - page engagement
  - captura de cliques por `data-analytics-*`
  - suporte opcional a `Google Tag Manager`, `Google Analytics` e `Microsoft Clarity`
- JSON-LD adicional para `WebSite`, `Person` e `BreadcrumbList`.
- metadata global refinada com `openGraph`, `twitter`, `robots`, `authors`, `creator` e `publisher`.
- sitemap enriquecido com `priority`, `changeFrequency` e `lastModified` mais consistente.
- `robots.txt` com `host` e `sitemap`.
- `next.config.mjs` com `poweredByHeader: false`, `reactStrictMode`, `AVIF/WebP` e cache melhor para imagens.

## Eventos rastreados

- `page_view`
- `scroll_depth`
- `page_engagement`
- `nav_click`
- `cta_click`
- `project_click`
- `outbound_project_click`
- `article_click`
- `lead_submit`
- `schedule_call_click`
- `search_open`
- `search_index_loaded`
- `search_index_error`
- `search_results`
- `search_suggestion_click`
- `search_result_click`

O contrato e os limites de privacidade da busca estão documentados em [`../audits/search-and-web-vitals-measurement.md`](../audits/search-and-web-vitals-measurement.md). O texto pesquisado não integra os payloads.

## Variáveis de ambiente

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_CLARITY_ID`

## Checklist de lançamento coberto

Os itens abaixo registram a etapa original, sem comprovar uma nova publicação. Para catálogo e landings, executar o [checklist obrigatório de serviços](../architecture/service-landing-pages.md#checklist-de-catálogo-e-landing-antes-da-publicação).

- Canonical, OG e Twitter cards
- Sitemap e robots
- Schema base do site
- Breadcrumbs nas páginas principais e de detalhe
- Medição real de cliques e profundidade
- Web vitals em produção
- Base pronta para QA final e leitura de conversão pós-lançamento
