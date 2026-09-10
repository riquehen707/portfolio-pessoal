import { notFound } from "next/navigation";
import { ArchitectureProjectPage } from "@/components/services/examples/architecture/ArchitectureProjectPage";
import { architectureDemoProjects, getArchitectureDemoProject } from "@/components/services/examples/architecture/architectureDemoData";
import { ServiceExampleChrome } from "@/components/services/examples/ServiceExampleChrome";
import { getAdjacentServiceExamples, getPublishedServiceExample } from "@/data/service-examples";
import { baseURL, person, social } from "@/resources";
import { buildDiscoverImageMetadata } from "@/utils/og";

type Props = { params: Promise<{ project: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return architectureDemoProjects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = getArchitectureDemoProject((await params).project);
  if (!project) return {};
  const title = `${project.title} | Estudo demonstrativo de arquitetura`;
  const description = `${project.summary} Conteúdo fictício para demonstração de interface.`;
  const url = `${baseURL}/servicos/exemplos/arquitetura/projetos/${project.slug}`;
  const image = project.gallery[0].src;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: buildDiscoverImageMetadata(image, project.title) },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: { index: false, follow: false },
  };
}

export default async function ArchitectureDemoProjectRoute({ params }: Props) {
  const project = getArchitectureDemoProject((await params).project);
  const example = getPublishedServiceExample("arquitetura");
  if (!project || !example) notFound();
  const whatsapp = social.find((item) => item.name === "WhatsApp")?.link;
  const contactHref = whatsapp ? `${whatsapp}?text=${encodeURIComponent(`Olá, Henrique. Quero um site inspirado no exemplo ${example.title}.`)}` : `mailto:${person.email}?subject=${encodeURIComponent(`Site como ${example.title}`)}`;
  const { previous, next } = getAdjacentServiceExamples(example.slug);
  return <ServiceExampleChrome example={example} contactHref={contactHref} previous={previous} next={next}><ArchitectureProjectPage project={project} /></ServiceExampleChrome>;
}
