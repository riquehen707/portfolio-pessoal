import { serviceExamples } from "@/content/service-examples/serviceExamples";
import { serviceExampleSchema, type ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { serviceFeatures } from "@/data/service-hub";

function getValidatedExamples() {
  const examples = serviceExamples.map((example) => serviceExampleSchema.parse(example));
  const ids = examples.map((example) => example.id);
  const slugs = examples.map((example) => example.slug);
  if (new Set(ids).size !== ids.length) throw new Error("Exemplos demonstrativos com ID duplicado.");
  if (new Set(slugs).size !== slugs.length) throw new Error("Exemplos demonstrativos com slug duplicado.");

  const featureIds = new Set(serviceFeatures.map((feature) => feature.id));
  for (const example of examples) {
    for (const id of example.featureIds) {
      if (!featureIds.has(id)) throw new Error(`Recurso não encontrado no exemplo ${example.id}: ${id}`);
    }
  }
  return examples;
}

export function getPublishedServiceExamples(): ServiceExample[] {
  return getValidatedExamples().filter((example) => example.status === "published");
}

export function getPublishedServiceExample(slug: string) {
  return getPublishedServiceExamples().find((example) => example.slug === slug);
}

export function getServiceExamplePath(slug: string) {
  return `/servicos/exemplos/${slug}`;
}

export function getServiceExampleStaticParams() {
  return getPublishedServiceExamples().map((example) => ({ slug: example.slug }));
}

export function getIndexableServiceExamples() {
  return getPublishedServiceExamples().filter((example) => example.seo.index);
}
