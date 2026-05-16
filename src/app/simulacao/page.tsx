import { Column, Schema } from "@once-ui-system/core";

import { GrowthSimulator } from "@/components/simulation/GrowthSimulator";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, person, servicesPage, simulationPage, social } from "@/resources";

import styles from "./page.module.scss";

export async function generateMetadata() {
  return {
    title: simulationPage.title,
    description: simulationPage.description,
    alternates: { canonical: `${baseURL}${simulationPage.path}` },
    openGraph: {
      title: simulationPage.title,
      description: simulationPage.description,
      url: `${baseURL}${simulationPage.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(simulationPage.title)}` }],
    },
  };
}

export default function SimulationPage() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;

  return (
    <Column className={styles.page} maxWidth="l" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={simulationPage.title}
        description={simulationPage.description}
        path={simulationPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(simulationPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${simulationPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Simulacao", url: `${baseURL}${simulationPage.path}` },
        ]}
      />
      <GrowthSimulator servicesHref={servicesPage.path} contactHref={whatsappLink} />
    </Column>
  );
}
