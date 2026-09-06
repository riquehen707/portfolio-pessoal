import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();
const require = createRequire(import.meta.url);

// Carrega os módulos reais sem Next/font ou bundler; mocks ficam restritos às fronteiras de I/O.
function loader(mocks = {}) {
  const cache = new Map();
  function load(file) {
    const filename = [file, `${file}.ts`, `${file}.tsx`, path.join(file, "index.ts")].find(
      existsSync,
    );
    if (!filename) throw new Error(`Módulo ausente: ${file}`);
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const code = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
      fileName: filename,
    }).outputText;
    const localRequire = (id) => {
      if (Object.hasOwn(mocks, id)) return mocks[id];
      if (id.endsWith(".scss"))
        return new Proxy({}, { get: (_, key) => (key === "__esModule" ? false : String(key)) });
      if (id.startsWith("@/")) return load(path.join(root, "src", id.slice(2)));
      if (id.startsWith(".")) return load(path.resolve(path.dirname(filename), id));
      return require(id);
    };
    new Function("require", "module", "exports", code)(localRequire, module, module.exports);
    return module.exports;
  }
  return (file) => load(path.join(root, file));
}

const load = loader();
const { serviceLandingSchema } = load("src/content/service-landings/serviceLandingSchema.ts");
const { exampleServiceLanding } = load("src/content/service-landings/example.ts");
const { architectWebsite } = load("src/content/service-landings/architectWebsite.ts");
const { artistGallery } = load("src/content/service-landings/artistGallery.ts");
const { designerPortfolio } = load("src/content/service-landings/designerPortfolio.ts");
const { photographerPortfolio } = load("src/content/service-landings/photographerPortfolio.ts");
const { realEstateWebsite } = load("src/content/service-landings/realEstateWebsite.ts");
const { tattooPortfolio } = load("src/content/service-landings/tattooPortfolio.ts");
const published = {
  ...exampleServiceLanding,
  status: "published",
  conversion: { kind: "whatsapp", label: "Pedir orçamento", href: "https://wa.me/5511999999999" },
};

test("publicação exige conteúdo essencial e impede âncoras duplicadas/reservadas", () => {
  assert.equal(serviceLandingSchema.safeParse(published).success, true);
  assert.equal(
    serviceLandingSchema.safeParse({
      ...published,
      sections: published.sections.filter((s) => s.type !== "pricing"),
    }).success,
    false,
  );
  assert.equal(
    serviceLandingSchema.safeParse({
      ...published,
      sections: [...published.sections, published.sections[0]],
    }).success,
    false,
  );
  assert.equal(
    serviceLandingSchema.safeParse({
      ...published,
      sections: [{ ...published.sections[0], id: "contato" }, ...published.sections.slice(1)],
    }).success,
    false,
  );
});

test("estrutura compacta publica a oferta de fotógrafos sem seções redundantes", () => {
  assert.equal(serviceLandingSchema.safeParse(photographerPortfolio).success, true);
  assert.equal(
    photographerPortfolio.sections.some((section) => section.type === "solution"),
    false,
  );
  assert.equal(
    photographerPortfolio.sections.some((section) => section.type === "audience"),
    false,
  );
  assert.equal(photographerPortfolio.conversion.label, "Quero meu portfólio");
  assert.equal(photographerPortfolio.hero.price, "R$397 de implantação + R$89/mês");
  assert.equal(
    photographerPortfolio.conversion.href.startsWith("https://wa.me/5575983675164?"),
    true,
  );
  assert.equal(
    serviceLandingSchema.safeParse({
      ...photographerPortfolio,
      sections: photographerPortfolio.sections.filter(
        (section) => section.type !== "demonstration",
      ),
    }).success,
    false,
  );
});

test("site para corretores mantém captação no WhatsApp e todas as partes do briefing", () => {
  assert.equal(serviceLandingSchema.safeParse(realEstateWebsite).success, true);
  assert.equal(realEstateWebsite.structure, "compact");
  assert.equal(realEstateWebsite.conversion.label, "Quero meu site");
  assert.equal(realEstateWebsite.hero.price, "R$497 de implantação + R$119/mês");
  assert.equal(realEstateWebsite.conversion.kind, "whatsapp");
  assert.equal(realEstateWebsite.conversion.href.startsWith("https://wa.me/5575983675164?"), true);
  assert.deepEqual(
    realEstateWebsite.sections.map((section) => section.id),
    [
      "problema",
      "como-ajuda",
      "exemplo",
      "imoveis",
      "perfil",
      "canais",
      "incluido",
      "processo",
      "investimento",
      "duvidas",
    ],
  );
});

test("portfólio para tatuadores preserva a oferta e as dez partes do briefing", () => {
  assert.equal(serviceLandingSchema.safeParse(tattooPortfolio).success, true);
  assert.equal(tattooPortfolio.structure, "compact");
  assert.equal(tattooPortfolio.conversion.label, "Quero meu portfólio");
  assert.equal(tattooPortfolio.hero.price, "R$297 de implantação + R$79/mês");
  assert.equal(tattooPortfolio.conversion.kind, "whatsapp");
  assert.equal(tattooPortfolio.conversion.href.startsWith("https://wa.me/5575983675164?"), true);
  assert.equal(
    tattooPortfolio.sections.find((section) => section.type === "process")?.items.length,
    3,
  );
  assert.deepEqual(
    tattooPortfolio.sections.map((section) => section.id),
    [
      "problema",
      "solucao",
      "beneficios",
      "incluido",
      "exemplo",
      "processo",
      "investimento",
      "duvidas",
    ],
  );
});

test("galeria para artistas mantém a oferta e as doze partes do briefing", () => {
  assert.equal(serviceLandingSchema.safeParse(artistGallery).success, true);
  assert.equal(artistGallery.structure, "compact");
  assert.equal(artistGallery.conversion.label, "Quero minha galeria");
  assert.equal(artistGallery.hero.price, "R$397 de implantação + R$89/mês");
  assert.equal(artistGallery.conversion.kind, "whatsapp");
  assert.equal(artistGallery.conversion.href.startsWith("https://wa.me/5575983675164?"), true);
  assert.equal(
    artistGallery.sections.find((section) => section.type === "process")?.items.length,
    3,
  );
  assert.deepEqual(
    artistGallery.sections.map((section) => section.id),
    [
      "problema",
      "galeria",
      "beneficios",
      "organizacao",
      "sobre-artista",
      "whatsapp",
      "incluido",
      "processo",
      "investimento",
      "duvidas",
    ],
  );
});

test("portfólio para designers mantém a oferta e as dez partes do briefing", () => {
  assert.equal(serviceLandingSchema.safeParse(designerPortfolio).success, true);
  assert.equal(designerPortfolio.structure, "compact");
  assert.equal(designerPortfolio.conversion.label, "Quero meu portfólio");
  assert.equal(designerPortfolio.hero.price, "R$297 de implantação + R$79/mês");
  assert.equal(designerPortfolio.conversion.kind, "whatsapp");
  assert.equal(
    designerPortfolio.conversion.href.startsWith("https://wa.me/5575983675164?"),
    true,
  );
  assert.equal(
    designerPortfolio.sections.find((section) => section.type === "process")?.items.length,
    3,
  );
  assert.deepEqual(
    designerPortfolio.sections.map((section) => section.id),
    [
      "problema",
      "demonstracao",
      "beneficios",
      "estrutura",
      "incluido",
      "processo",
      "investimento",
      "duvidas",
    ],
  );
});

test("site para arquitetos mantém a oferta e as nove partes do briefing", () => {
  assert.equal(serviceLandingSchema.safeParse(architectWebsite).success, true);
  assert.equal(architectWebsite.structure, "compact");
  assert.equal(architectWebsite.conversion.label, "Quero meu portfólio");
  assert.equal(architectWebsite.hero.price, "R$497 de implantação + R$99/mês");
  assert.equal(architectWebsite.conversion.kind, "whatsapp");
  assert.equal(architectWebsite.conversion.href.startsWith("https://wa.me/5575983675164?"), true);
  assert.equal(
    architectWebsite.sections.find((section) => section.type === "process")?.items.length,
    3,
  );
  assert.deepEqual(
    architectWebsite.sections.map((section) => section.id),
    [
      "problema",
      "projetos",
      "beneficios",
      "incluido",
      "processo",
      "investimento",
      "duvidas",
    ],
  );
});

test("destinos são seguros e WhatsApp exige telefone internacional", () => {
  for (const conversion of [
    { kind: "quote", href: "javascript:alert(1)", label: "Contato" },
    { kind: "whatsapp", href: "https://example.com/5511999999999", label: "Contato" },
    { kind: "whatsapp", href: "https://wa.me/telefone", label: "Contato" },
    { kind: "form", href: "#ausente", label: "Contato" },
  ])
    assert.equal(serviceLandingSchema.safeParse({ ...published, conversion }).success, false);
});

test("provas não aceitam relato sem evidência e atribuição", () => {
  assert.equal(
    serviceLandingSchema.safeParse({
      ...published,
      sections: [
        ...published.sections,
        {
          type: "proof",
          id: "prova",
          title: "Clientes",
          items: [{ kind: "testimonial", title: "Relato", description: "Texto" }],
        },
      ],
    }).success,
    false,
  );
});

function catalog(entries) {
  return loader({
    "@/content/service-landings/landings": { serviceLandings: entries },
    "@/resources/services": { services: [{ slug: "servico-legado" }] },
  })("src/data/service-landings/index.ts");
}

test("rascunhos não são encontrados e colisões com rotas existentes falham", () => {
  assert.equal(
    catalog([exampleServiceLanding]).getServiceLanding(exampleServiceLanding.slug),
    undefined,
  );
  assert.equal(catalog([published]).getServiceLandingById(published.id).slug, published.slug);
  for (const slug of ["produtos", "servico-legado"])
    assert.throws(() => catalog([{ ...published, slug }]), /conflito/);
  assert.throws(() => catalog([published, { ...published, slug: "outro-slug" }]), /duplicada/);
});

test("CTA de WhatsApp emite dois eventos de clique e nenhuma conversão ou dado pessoal", () => {
  const events = [];
  const client = loader({
    "@/components/analytics/analytics": { trackEvent: (...args) => events.push(args) },
  });
  const { ServiceAction } = client("src/components/services/landing/ServiceAction.tsx");
  const context = {
    service_id: published.id,
    landing_slug: published.slug,
    conversion_kind: "whatsapp",
    email: "private@example.com",
  };
  const element = ServiceAction({ conversion: published.conversion, context, location: "hero" });
  assert.equal(element.props.href, published.conversion.href);
  element.props.onClick();
  assert.deepEqual(
    events.map(([event]) => event),
    ["service_cta_click", "service_whatsapp_click"],
  );
  assert.equal(JSON.stringify(events).includes("private@example.com"), false);
  assert.equal(JSON.stringify(events).includes("5511999999999"), false);
});

test("formulário deduplica início e recibo confirmado, sem converter início", () => {
  const events = [];
  const client = loader({
    react: { useRef: (current) => ({ current }) },
    "@/components/analytics/analytics": { trackEvent: (...args) => events.push(args) },
  });
  const { useServiceFormTracking } = client("src/components/services/landing/ServiceTracking.tsx");
  const tracking = useServiceFormTracking({
    service_id: "form",
    landing_slug: "form",
    conversion_kind: "form",
  });
  tracking.start();
  tracking.start();
  tracking.confirmedSubmit("");
  assert.deepEqual(
    events.map(([event]) => event),
    ["service_form_start"],
  );
  tracking.confirmedSubmit("receipt-private");
  tracking.confirmedSubmit("receipt-private");
  assert.deepEqual(
    events.map(([event]) => event),
    ["service_form_start", "service_form_submit", "service_conversion"],
  );
  assert.equal(JSON.stringify(events).includes("receipt-private"), false);
});

test("ServiceCTA bloqueia links para ofertas não publicadas", () => {
  const { ServiceCTA } = loader({
    "@/data/service-landings": { getServiceLandingById: () => undefined },
  })("src/components/services/ServiceCTA.tsx");
  assert.throws(
    () => ServiceCTA({ serviceId: "draft", title: "Oferta", description: "Texto" }),
    /não publicado/,
  );
});

test("HTML mantém oferta sem JS, um h1, FAQ nativo e a mesma ação", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { load: html } = require("cheerio");
  const componentLoad = loader({ "@/components/analytics/analytics": { trackEvent() {} } });
  const { ServiceLandingPage } = componentLoad(
    "src/components/services/landing/ServiceLandingPage.tsx",
  );
  const $ = html(
    renderToStaticMarkup(React.createElement(ServiceLandingPage, { landing: published })),
  );
  assert.equal($("h1").length, 1);
  assert.equal($("details").length, 3);
  assert.ok($("body").text().includes(published.hero.title));
  const ids = $("[id]")
    .map((_, element) => $(element).attr("id"))
    .get();
  assert.equal(new Set(ids).size, ids.length);
  const targets = $("a")
    .map((_, element) => $(element).attr("href"))
    .get()
    .filter((href) => !href.startsWith("#"));
  assert.equal(targets.length, 4);
  assert.deepEqual([...new Set(targets)], [published.conversion.href]);
  assert.throws(
    () => ServiceLandingPage({ landing: exampleServiceLanding }),
    /exige um formulário/,
  );
});

test("SEO distingue publicação de indexação e serializa JSON-LD com segurança", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { load: html } = require("cheerio");
  const { serviceLandingMetadata, ServiceJsonLd } = loader({
    "@/resources": { baseURL: "https://henrique.dog" },
  })("src/components/services/landing/seo.tsx");
  const metadata = serviceLandingMetadata({ ...published, seo: { ...published.seo, index: true } });
  assert.equal(metadata.robots.index, true);
  assert.equal(serviceLandingMetadata(exampleServiceLanding).robots.index, false);
  assert.equal(serviceLandingMetadata(published).robots.index, false);
  assert.equal(metadata.alternates.canonical, `https://henrique.dog/servicos/${published.slug}`);
  assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
  const $ = html(
    renderToStaticMarkup(
      React.createElement(ServiceJsonLd, {
        landing: {
          ...published,
          hero: { ...published.hero, title: "Oferta </script><script>alert(1)</script>" },
        },
      }),
    ),
  );
  assert.equal($("script").length, 1);
  assert.equal(JSON.parse($("script").html())["@type"], "Service");
});
