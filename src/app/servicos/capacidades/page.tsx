import { Column, Schema } from "@once-ui-system/core";
import { ServiceCapabilitiesView } from "@/components/services/hub/ServiceCapabilitiesView";
import { getServiceHubContent } from "@/data/service-hub";
import { getPublishedServiceExamples } from "@/data/service-examples";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

const page = { path: "/servicos/capacidades", title: "Capacidades para sites e interfaces", description: "Demonstrações leves de recursos, módulos, estados e wireframes para sites e experiências digitais." };

export function generateMetadata() {
  const image = buildOgImage(page.title);
  return { title: page.title, description: page.description, alternates: { canonical: `${baseURL}${page.path}` }, openGraph: { title: page.title, description: page.description, url: `${baseURL}${page.path}`, images: buildDiscoverImageMetadata(image, page.title) } };
}

export default function ServiceCapabilitiesPage() {
  const { features } = getServiceHubContent();
  return <Column fillWidth><Schema as="webPage" baseURL={baseURL} title={page.title} description={page.description} path={page.path} image={`/api/og/generate?title=${encodeURIComponent(page.title)}`} author={{ name: person.name, url: `${baseURL}/work`, image: `${baseURL}${person.avatar}` }} /><ServiceCapabilitiesView features={features} examples={getPublishedServiceExamples()} /></Column>;
}
