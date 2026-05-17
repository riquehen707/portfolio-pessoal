import { Column, Schema } from "@once-ui-system/core";

import { GrowthSimulator } from "@/components/simulation/GrowthSimulator";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, person, servicesPage, simulationPage, social } from "@/resources";

import styles from "./page.module.scss";

const simulationTitle = "Simulacao antes de investir";
const simulationDescription =
  "Uma leitura inicial para entender se a base atual sustenta ajustes internos, investimento e retorno antes de ampliar a operacao.";

export async function generateMetadata() {
  return {
    title: simulationTitle,
    description: simulationDescription,
    alternates: { canonical: `${baseURL}${simulationPage.path}` },
    openGraph: {
      title: simulationTitle,
      description: simulationDescription,
      url: `${baseURL}${simulationPage.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(simulationTitle)}` }],
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
        title={simulationTitle}
        description={simulationDescription}
        path={simulationPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(simulationTitle)}`}
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
