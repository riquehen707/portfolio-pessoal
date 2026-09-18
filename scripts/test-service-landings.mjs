import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
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
      (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
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
const { services } = load("src/resources/services.ts");
const { getServiceHubContent } = load("src/data/service-hub/index.ts");
const { serviceExampleSchema } = load("src/content/service-examples/serviceExampleSchema.ts");
const { getAdjacentServiceExamples, getIndexableServiceExamples, getPublishedServiceExamples, getServiceExamplePath } = load("src/data/service-examples/index.ts");
const { getFeaturedServiceInspirations, getServiceInspiration, getServiceInspirationPath, getServiceInspirationStaticParams, serviceInspirations } = load("src/data/service-inspirations.ts");
const { realEstateDemoProperties, realEstateGeneratedMedia } = load("src/components/services/inspirations/real-estate/realEstateInspirationData.ts");
const { photographyPortfolioItems, photographyGeneratedMedia } = load("src/components/services/inspirations/photography/photographyInspirationData.ts");
const { architectureInspirationProjects } = load("src/components/services/inspirations/architecture/architectureInspirationData.ts");
const { wellnessInspirationMedia, wellnessGeneratedMedia, wellnessConcerns } = load("src/components/services/inspirations/wellness/wellnessInspirationData.ts");
const { localBusinessMedia, localBusinessServices } = load("src/components/services/inspirations/local-business/localBusinessInspirationData.ts");
const { designerProjects, designerCaseSteps } = load("src/components/services/inspirations/designer/designerInspirationData.ts");
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
  hero: { ...exampleServiceLanding.hero, price: "Sob consulta — cobrança mensal" },
  conversion: { kind: "whatsapp", label: "Pedir orçamento", href: "https://wa.me/5511999999999" },
  sections: exampleServiceLanding.sections.map((section) =>
    section.type === "pricing"
      ? {
          ...section,
          items: [
            ...section.items,
            {
              label: "Mensalidade",
              amount: "Sob consulta — cobrança mensal",
              cadence: "monthly",
              details: "Inclui manutenção técnica e suporte conforme a proposta.",
            },
          ],
        }
      : section,
  ),
};

test("publicação exige conteúdo essencial e impede âncoras duplicadas/reservadas", () => {
  assert.equal(serviceLandingSchema.safeParse(published).success, true);
  assert.equal(
    serviceLandingSchema.safeParse({
      ...published,
      sections: published.sections.map((section) =>
        section.type === "pricing"
          ? { ...section, items: section.items.filter((item) => item.cadence !== "monthly") }
          : section,
      ),
    }).success,
    false,
  );
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

test("hub organiza formatos e recursos demonstráveis sem duplicar produtos", () => {
  const content = getServiceHubContent();
  assert.deepEqual(content.formats.map((item) => item.title), [
    "Site profissional",
    "Portfólio",
    "Landing page",
    "Projeto personalizado",
  ]);
  assert.equal(content.features.length, 12);
  assert.equal(content.features.filter((feature) => feature.previewKind).length, 6);
  assert.equal(content.formats.some((format) => "price" in format), false);
  for (const collection of Object.values(content)) {
    assert.equal(new Set(collection.map((item) => item.id)).size, collection.length);
  }
});

test("exemplos demonstrativos só publicam uma rota quando estão completos", () => {
  const draft = {
    id: "exemplo-em-preparo",
    slug: "exemplo-em-preparo",
    status: "draft",
    order: 99,
    featured: false,
    updatedAt: "2026-09-08",
    title: "Exemplo em preparo",
    segment: "Site profissional",
    solutionType: "institutional",
    shortDescription: "Estrutura ainda em revisão.",
    tags: ["Apresentação", "Contato"],
    decisions: [
      { title: "Decisão um", description: "Explicação objetiva da primeira decisão." },
      { title: "Decisão dois", description: "Explicação objetiva da segunda decisão." },
    ],
    visualStyle: { label: "Identidade editorial", themeKey: "editorial" },
    featureIds: [],
    images: [{ src: "/images/work/exemplo.webp", alt: "Imagem do exemplo em preparo." }],
    seo: { index: false },
  };
  assert.equal(serviceExampleSchema.safeParse(draft).success, true);
  assert.equal(serviceExampleSchema.safeParse({ ...draft, status: "published" }).success, false);
  assert.equal(
    serviceExampleSchema.safeParse({
      ...draft,
      status: "published",
      rendererKey: "psychology-studio",
      featureIds: ["about", "form"],
      tags: ["Apresentação", "Contato"],
      coverImage: { src: "/images/work/exemplo.webp", alt: "Prévia do exemplo demonstrativo." },
    }).success,
    true,
  );
  const examples = getPublishedServiceExamples();
  assert.equal(examples.length, 3);
  assert.deepEqual(examples.map((example) => example.slug), ["psicologia", "arquitetura", "barbearia"]);
  assert.deepEqual(examples.map((example) => example.order), [1, 2, 3]);
  assert.equal(examples.every((example) => example.featured), true);
  for (const example of examples) {
    assert.equal(example.seo.index, false);
    assert.ok(example.rendererKey);
    assert.ok(existsSync(path.join(root, "public", example.coverImage.src)));
    assert.equal(example.images.every((image) => existsSync(path.join(root, "public", image.src))), true);
  }
  assert.deepEqual(getIndexableServiceExamples(), []);
  assert.equal(getServiceExamplePath("psicologia"), "/servicos/exemplos/psicologia");
  assert.equal(getAdjacentServiceExamples("psicologia").previous.slug, "barbearia");
  assert.equal(getAdjacentServiceExamples("psicologia").next.slug, "arquitetura");
});

test("inspirações compartilham dados válidos entre galeria e páginas individuais", () => {
  assert.equal(serviceInspirations.length, 12);
  assert.equal(getFeaturedServiceInspirations().length, 6);
  assert.ok(getFeaturedServiceInspirations().every((inspiration) => inspiration.featured));
  assert.deepEqual(
    getFeaturedServiceInspirations(),
    serviceInspirations.filter((inspiration) => inspiration.featured).slice(0, 6),
  );
  assert.equal(
    new Set(serviceInspirations.map((inspiration) => inspiration.slug)).size,
    serviceInspirations.length,
  );
  assert.deepEqual(
    getServiceInspirationStaticParams(),
    serviceInspirations.map((inspiration) => ({ slug: inspiration.slug })),
  );

  for (const inspiration of serviceInspirations) {
    assert.equal(getServiceInspiration(inspiration.slug), inspiration);
    assert.equal(
      getServiceInspirationPath(inspiration.slug),
      `/servicos/inspiracoes/${inspiration.slug}`,
    );
    assert.ok(existsSync(path.join(root, "public", inspiration.image)));
    assert.match(
      inspiration.image,
      /^\/images\/services\/inspirations\/[^/]+\.webp$/,
    );
    assert.ok(inspiration.width > 0);
    assert.ok(inspiration.height > 0);
  }

  const realEstatePublication = getServiceInspiration("imoveis-em-destaque");
  assert.equal(realEstatePublication.publication, "real-estate-editorial");
  assert.equal(realEstateDemoProperties.length, 4);
  assert.equal(realEstateGeneratedMedia.length, 4);
  assert.equal(new Set(realEstateDemoProperties.map((property) => property.id)).size, 4);
  for (const media of realEstateGeneratedMedia) {
    assert.match(
      media.src,
      /^\/images\/services\/inspirations\/imoveis-em-destaque\/[^/]+\.webp$/,
    );
    assert.ok(existsSync(path.join(root, "public", media.src)));
    assert.ok(media.width > 0);
    assert.ok(media.height > 0);
  }

  const photographyPublication = getServiceInspiration("portfolio-fotografico");
  assert.equal(photographyPublication.publication, "photography-editorial");
  assert.equal(photographyPortfolioItems.length, 6);
  assert.equal(photographyGeneratedMedia.length, 3);
  assert.equal(new Set(photographyPortfolioItems.map((item) => item.id)).size, 6);
  for (const media of photographyPortfolioItems) {
    assert.ok(existsSync(path.join(root, "public", media.image)));
    assert.ok(media.width > 0);
    assert.ok(media.height > 0);
  }

  const architecturePublication = getServiceInspiration("arquitetura-editorial");
  assert.equal(architecturePublication.publication, "architecture-editorial");
  assert.equal(architectureInspirationProjects.length, 3);
  assert.equal(new Set(architectureInspirationProjects.map((project) => project.id)).size, 3);
  for (const project of architectureInspirationProjects) {
    assert.ok(existsSync(path.join(root, "public", project.image)));
    assert.ok(project.width > 0);
    assert.ok(project.height > 0);
  }

  const wellnessPublication = getServiceInspiration("bem-estar-acolhedor");
  assert.equal(wellnessPublication.publication, "wellness-editorial");
  assert.equal(wellnessInspirationMedia.length, 3);
  assert.equal(wellnessGeneratedMedia.length, 2);
  assert.equal(wellnessConcerns.length, 4);
  assert.equal(new Set(wellnessInspirationMedia.map((item) => item.id)).size, 3);
  for (const media of wellnessInspirationMedia) {
    assert.ok(existsSync(path.join(root, "public", media.image)));
    assert.ok(media.width > 0);
    assert.ok(media.height > 0);
  }

  const localBusinessPublication = getServiceInspiration("negocio-local-vibrante");
  assert.equal(localBusinessPublication.publication, "local-business-editorial");
  assert.equal(localBusinessMedia.length, 4);
  assert.equal(localBusinessServices.length, 4);
  assert.equal(new Set(localBusinessServices.map((service) => service.id)).size, 4);
  for (const media of localBusinessMedia) {
    assert.ok(existsSync(path.join(root, "public", media.image)));
    assert.ok(media.width > 0);
    assert.ok(media.height > 0);
  }

  const designerPublication = getServiceInspiration("portfolio-minimalista");
  assert.equal(designerPublication.title, "Portfólio para designers");
  assert.equal(designerPublication.publication, "designer-editorial");
  assert.equal(designerProjects.length, 3);
  assert.equal(designerCaseSteps.length, 3);
  assert.equal(new Set(designerProjects.map((project) => project.id)).size, 3);

  const standardInspirations = serviceInspirations.filter((inspiration) => !inspiration.publication);
  assert.equal(standardInspirations.length, 6);
  for (const inspiration of standardInspirations) {
    assert.equal(inspiration.journey?.length, 4);
    assert.equal(new Set(inspiration.journey.map((step) => step.label)).size, 4);
  }
});

test("demonstração de Psicologia identifica ficção, preserva conteúdo clínico responsável e oferece recursos úteis", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { load: html } = require("cheerio");
  const componentLoad = loader({
    "next/image": ({ fill, priority, sizes, ...props }) => React.createElement("img", props),
  });
  const { PsychologyDemo } = componentLoad("src/components/services/examples/psychology/PsychologyDemo.tsx");
  const example = getPublishedServiceExamples().find((item) => item.slug === "psicologia");
  const $ = html(renderToStaticMarkup(React.createElement(PsychologyDemo, { example })));
  const text = $.root().text();

  assert.equal($("h1").length, 1);
  assert.equal($("#duvidas details").length, 5);
  assert.equal($("#formulario input[required]").length, 2);
  assert.equal($("script[type='application/ld+json']").length, 1);
  assert.match(text, /identidade fictícia/i);
  assert.match(text, /registro fictício/i);
  assert.equal($("#atuacao button[aria-pressed]").length, 4);
  assert.match(text, /nenhum dado é enviado ou armazenado/i);
  assert.doesNotMatch(text, /cure sua ansiedade|resultados garantidos|supere a depressão/i);
});

test("demonstração de Arquitetura usa portfólio filtrável, estudos internos e conteúdo identificado como fictício", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { load: html } = require("cheerio");
  const componentLoad = loader({ "next/image": ({ fill, priority, sizes, ...props }) => React.createElement("img", props) });
  const { ArchitectureDemo } = componentLoad("src/components/services/examples/architecture/ArchitectureDemo.tsx");
  const { architectureDemoProjects } = componentLoad("src/components/services/examples/architecture/architectureDemoData.ts");
  const example = getPublishedServiceExamples().find((item) => item.slug === "arquitetura");
  const $ = html(renderToStaticMarkup(React.createElement(ArchitectureDemo, { example })));
  const text = $.root().text();
  assert.equal($("h1").length, 1);
  assert.equal($("#projetos [role='group'] button").length, 4);
  assert.equal($("#servicos-arquitetura details").length, 5);
  assert.equal(architectureDemoProjects.length, 3);
  assert.equal(architectureDemoProjects.every((project) => project.illustrative), true);
  assert.match(text, /estúdio fictício|identidade fictícia/i);
  assert.doesNotMatch(text, /imagens de referência|arquivo visual/i);
});

test("demonstração de Barbearia prioriza preços, localização e agendamento sem alegar negócio real", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { load: html } = require("cheerio");
  const componentLoad = loader({ "next/image": ({ fill, priority, sizes, ...props }) => React.createElement("img", props) });
  const { BarbershopDemo } = componentLoad("src/components/services/examples/barbershop/BarbershopDemo.tsx");
  const example = getPublishedServiceExamples().find((item) => item.slug === "barbearia");
  const $ = html(renderToStaticMarkup(React.createElement(BarbershopDemo, { example })));
  const text = $.root().text();
  assert.equal($("h1").length, 1);
  assert.equal($("#servicos .serviceRows > button[aria-pressed]").length, 4);
  assert.equal($("#agendamento [role='group']").length, 2);
  assert.equal($("#localizacao").length, 1);
  assert.equal($("script[type='application/ld+json']").length, 1);
  assert.match(text, /endereço fictício/i);
  assert.equal($("#agendamento .bookingSummary").length, 1);
  assert.match(text, /nenhum horário é reservado|não envia dados/i);
  assert.match(text, /fotografia de banco/i);
  assert.doesNotMatch(text, /mais que um corte|tradição encontra modernidade|seu estilo começa aqui/i);
});

test("recursos do hub mantêm previews próprios sem links para demos antigas", () => {
  const content = getServiceHubContent();
  const primary = content.features.filter((feature) => feature.previewKind);
  assert.equal(primary.length, 6);
  assert.equal(
    content.features.some(
      (feature) => "exampleHref" in feature || "exampleSlug" in feature,
    ),
    false,
  );
  assert.deepEqual(new Set(content.features.map((item) => item.status)), new Set(["included", "available", "additional"]));
});

test("todo serviço legado possui mensalidade, implantação e continuidade reais", () => {
  assert.equal(services.length, 6);
  for (const service of services) {
    assert.match(service.commercialModel.monthly.amount, /(mês|mensal)/i);
    assert.ok(service.commercialModel.monthly.includes.length >= 2);
    assert.ok(service.commercialModel.setup.amount);
    assert.match(service.commercialModel.terms, /cancelamento/i);
    assert.match(service.hero.price, /mensal/i);
    for (const scope of service.scopes) assert.match(scope.investment, /mensal/i);
  }
});

test("cases preservam evidência, mídia local e vínculo com oferta publicada", () => {
  const projectLoad = loader({ "@/resources": { baseURL: "https://henrique.dog", work: { path: "/work" } } });
  const { getAllWorkProjects, getWorkProjectService, getFeaturedHomeWorkProjects } = projectLoad("src/app/work/projectData.ts");
  const projects = getAllWorkProjects();
  assert.equal(projects.length, 3);
  assert.equal(getFeaturedHomeWorkProjects(1, projects)[0].slug, "henrique-dog");
  for (const project of projects) {
    assert.ok(project.metadata.project.audience);
    assert.ok(project.metadata.project.state);
    assert.ok(existsSync(path.join(root, "public", project.metadata.image)));
    assert.match(getWorkProjectService(project).href, /^\/servicos\//);
    assert.ok(project.metadata.kind === "personal" || project.metadata.kind === "study");
  }
  const invalid = structuredClone(projects[0]);
  invalid.metadata.project.serviceSlug = "oferta-inexistente";
  assert.throws(() => getWorkProjectService(invalid), /indisponível/);
  delete invalid.metadata.project.serviceSlug;
  assert.equal(getWorkProjectService(invalid), undefined);
});

test("home comercial apresenta oferta, exemplos, escopo e contato sem sobrecarga", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { load: html } = require("cheerio");
  const componentLoad = loader({
    "next/link": ({ children, href, ...props }) =>
      React.createElement("a", { ...props, href }, children),
    "next/image": ({ fill, priority, sizes, ...props }) => React.createElement("img", props),
  });
  const { ServiceHubView } = componentLoad("src/components/services/hub/ServiceHubView.tsx");
  const $ = html(
    renderToStaticMarkup(
      React.createElement(ServiceHubView, {
        ...getServiceHubContent(),
        inspirations: getFeaturedServiceInspirations(4),
        contactHref: "https://wa.me/5511999999999",
      }),
    ),
  );

  assert.equal($("h1").length, 1);
  assert.equal(
    $("#service-hub-title").text(),
    "Meu site ajuda pessoas a encontrar meu trabalho. O seu pode fazer o mesmo.",
  );
  assert.equal($("section[aria-labelledby='service-hub-title'] a").length, 2);
  assert.equal($("[role='tab']").length, 0);
  assert.equal($("#recursos").length, 0);
  assert.equal($("#formatos").length, 0);
  assert.equal($("#examples-title").text(), "Veja como seu site pode ficar.");
  assert.equal($("#exemplos article").length, 4);
  for (const inspiration of getFeaturedServiceInspirations(4)) {
    assert.equal(
      $(`#exemplos a[href='/servicos/inspiracoes/${inspiration.slug}']`).length,
      2,
    );
  }
  assert.equal($("#recursos-principais").length, 0);
  assert.equal($(".perception").length, 0);
  assert.deepEqual($("#incluso ul h3").map((_, item) => $(item).text()).get(), ["Criação e design", "Domínio e hospedagem", "SEO técnico", "Manutenção e suporte"]);
  assert.equal($("a[href='/servicos/capacidades']").length, 1);
  assert.equal($("a[href='/servicos/inspiracoes']").length, 2);
  assert.equal($("a[href='/work']").length, 1);
  assert.equal($("[data-analytics-event='services_help_click']").length, 2);
  assert.equal($("[data-analytics-event='services_help_click']").filter((_, item) => $(item).text().trim().startsWith("Quero meu site")).length, 1);
  assert.equal($("[data-analytics-event='services_help_click']").filter((_, item) => $(item).text().trim().startsWith("Falar no WhatsApp")).length, 1);
  assert.equal($("#exemplos a[href='/servicos/inspiracoes']").text().trim().startsWith("Ver todos os exemplos"), true);
  assert.doesNotMatch($("#exemplos").text(), /projeto realizado|template pronto/i);
  assert.equal($("a[href^='/servicos/exemplos']").length, 0);
  assert.equal($("main").text().includes("R$147/mês"), true);
  assert.equal($("main").text().includes("R$ 200"), false);
  assert.equal($("main").text().includes("R$ 89,90"), false);
  assert.equal($("section[aria-labelledby='faq-title']").length, 0);
  assert.equal($("section[aria-labelledby='process-title']").length, 0);
});

test("página de capacidades explica recursos com uma única demonstração", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { load: html } = require("cheerio");
  const componentLoad = loader({
    "next/link": ({ children, href, ...props }) => React.createElement("a", { ...props, href }, children),
    "next/image": ({ fill, priority, sizes, ...props }) => React.createElement("img", props),
  });
  const { ServiceCapabilitiesView } = componentLoad("src/components/services/hub/ServiceCapabilitiesView.tsx");
  const $ = html(renderToStaticMarkup(React.createElement(ServiceCapabilitiesView, { features: getServiceHubContent().features })));
  assert.equal($("h1").text(), "Interfaces além da página estática.");
  assert.equal($("#recursos > ol > li").length, getServiceHubContent().features.length);
  assert.equal($("main [role='tab']").length, 0);
  assert.equal($("main [role='tabpanel']").length, 0);
  assert.equal($("main details").length, 0);
  assert.equal($("#demonstracao button").length, 1);
  assert.equal($("#modulos article").length, 2);
  assert.equal($("#modulos button").length, 0);
  assert.equal($("#estrutura ol > li").length, 3);
  assert.match($("main").text(), /Formulários.*Agendamento.*Galerias.*Filtros.*Integrações/);
  assert.equal($("a[href='/servicos/exemplos']").length, 0);
  assert.equal($("a[href='/servicos/inspiracoes']").length, 2);
  assert.equal($("a[href='/servicos']").length, 2);
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
    .filter((href) => href === published.conversion.href);
  assert.equal(targets.length, 4);
  assert.deepEqual([...new Set(targets)], [published.conversion.href]);
  assert.equal($("header a[href='/']").length, 1);
  assert.equal($("header a[href='/servicos']").length, 1);
  assert.throws(
    () => ServiceLandingPage({ landing: exampleServiceLanding }),
    /exige um formulário/,
  );
});

test("SEO distingue publicação de indexação e serializa JSON-LD com segurança", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { load: html } = require("cheerio");
  const { serviceLandingMetadata, ServiceJsonLd, LegacyServiceJsonLd } = loader({
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
  const serviceData = JSON.parse($("script").html());
  assert.equal(serviceData["@type"], "Service");
  assert.equal(
    serviceData.offers.priceSpecification.some(
      (item) => item["@type"] === "UnitPriceSpecification" && item.billingDuration === "P1M",
    ),
    true,
  );
  const legacyMarkup = html(
    renderToStaticMarkup(React.createElement(LegacyServiceJsonLd, { service: services[0] })),
  );
  const legacyData = JSON.parse(legacyMarkup("script").html());
  assert.equal(legacyData.offers.priceSpecification[0].price, "1500");
  assert.equal("price" in legacyData.offers.priceSpecification[1], false);
  assert.match(legacyData.offers.priceSpecification[1].description, /cobrança mensal/i);
});
