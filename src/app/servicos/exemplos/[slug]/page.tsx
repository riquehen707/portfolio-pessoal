import { notFound } from "next/navigation";
import { ServiceExampleChrome } from "@/components/services/examples/ServiceExampleChrome";
import { getServiceExampleRenderer } from "@/components/services/examples/ServiceExampleRenderers";
import { getAdjacentServiceExamples, getPublishedServiceExample, getServiceExamplePath, getServiceExampleStaticParams } from "@/data/service-examples";
import { baseURL, person, social } from "@/resources";
import { buildDiscoverImageMetadata } from "@/utils/og";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceExampleStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const example = getPublishedServiceExample((await params).slug);
  if (!example) return {};
  const title = `${example.title} | Projeto demonstrativo`;
  const image = example.coverImage?.src;
  const url = `${baseURL}${getServiceExamplePath(example.slug)}`;
  return {
    title,
    description: example.shortDescription,
    alternates: { canonical: url },
    openGraph: { title, description: example.shortDescription, url, images: buildDiscoverImageMetadata(image, example.title) },
    twitter: { card: "summary_large_image", title, description: example.shortDescription, images: [image] },
    robots: { index: example.seo.index, follow: example.seo.index },
  };
}

export default async function ServiceExamplePage({ params }: Props) {
  const example = getPublishedServiceExample((await params).slug);
  if (!example?.rendererKey) notFound();
  const Renderer = getServiceExampleRenderer(example.rendererKey);
  if (!Renderer) throw new Error(`Renderer não encontrado para o exemplo: ${example.id}`);
  const whatsapp = social.find((item) => item.name === "WhatsApp")?.link;
  const contactHref = whatsapp
    ? `${whatsapp}?text=${encodeURIComponent(`Olá, Henrique. Quero um site inspirado no exemplo ${example.title}.`)}`
    : `mailto:${person.email}?subject=${encodeURIComponent(`Site como ${example.title}`)}`;
  const { previous, next } = getAdjacentServiceExamples(example.slug);
  return <ServiceExampleChrome example={example} contactHref={contactHref} previous={previous} next={next}><Renderer example={example} /></ServiceExampleChrome>;
}
