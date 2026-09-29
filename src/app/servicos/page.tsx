import { Column, Schema } from "@once-ui-system/core";
import { ServiceHubView } from "@/components/services/hub/ServiceHubView";
import { getPublishedServiceExamples } from "@/data/service-examples";
import { getServiceHubContent } from "@/data/service-hub";
import {
  getFeaturedServiceInspirations,
  getServiceInspiration,
} from "@/data/service-inspirations";
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
  const inspirations = getFeaturedServiceInspirations(4);
  const examples = getPublishedServiceExamples();
  const { inclusions, process, plans, faq } = getServiceHubContent();
  const localBusinessInspiration = getServiceInspiration("negocio-local-vibrante");
  const whatsapp = social.find((item) => item.name === "WhatsApp")?.link;
  const contactHref = whatsapp
    ? `${whatsapp}?text=${encodeURIComponent("Olá, Henrique. Quero conversar sobre a criação de um site.")}`
    : `mailto:${person.email}?subject=${encodeURIComponent("Criação de site")}`;

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
      <ServiceHubView
        examples={examples}
        inclusions={inclusions}
        process={process}
        plans={plans}
        faq={faq}
        inspirations={inspirations}
        localBusinessInspiration={localBusinessInspiration}
        contactHref={contactHref}
      />
    </Column>
  );
}
