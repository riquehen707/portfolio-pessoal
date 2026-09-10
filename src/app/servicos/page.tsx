import { Column, Schema } from "@once-ui-system/core";
import { ServiceHubView } from "@/components/services/hub/ServiceHubView";
import { getServiceHubContent } from "@/data/service-hub";
import { getPublishedServiceExamples } from "@/data/service-examples";
import { baseURL, person, servicesPage, social } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

export async function generateMetadata() {
  const image = buildOgImage(servicesPage.title);

  return {
    title: servicesPage.title,
    description: servicesPage.description,
    alternates: { canonical: `${baseURL}${servicesPage.path}` },
    openGraph: {
      title: servicesPage.title,
      description: servicesPage.description,
      url: `${baseURL}${servicesPage.path}`,
      images: buildDiscoverImageMetadata(image, servicesPage.title),
    },
  };
}

export default function ServicesPage() {
  const content = getServiceHubContent();
  const examples = getPublishedServiceExamples();
  const whatsapp = social.find((item) => item.name === "WhatsApp")?.link;
  const contactHref = whatsapp
    ? `${whatsapp}?text=${encodeURIComponent("Olá, Henrique. Quero conversar sobre a criação de um site.")}`
    : `mailto:${person.email}?subject=${encodeURIComponent("Criação de site")}`;
  const questionHref = `mailto:${person.email}?subject=${encodeURIComponent("Dúvida sobre criação de site")}`;

  return (
    <Column fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={servicesPage.title}
        description={servicesPage.description}
        path={servicesPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(servicesPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${servicesPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <ServiceHubView {...content} examples={examples} contactHref={contactHref} questionHref={questionHref} />
    </Column>
  );
}
