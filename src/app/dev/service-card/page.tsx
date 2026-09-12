import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Column } from "@once-ui-system/core";
import { ServiceHubView } from "@/components/services/hub/ServiceHubView";
import { serviceInspirations } from "@/data/service-inspirations";
import { person } from "@/resources";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Prévia da página de serviços",
  description: "Estrutura da página de serviços, disponível somente em desenvolvimento.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/dev/service-card" },
};

export default function ServiceCardPreview() {
  if (process.env.NODE_ENV !== "development") notFound();
  const contactHref = `mailto:${person.email}?subject=${encodeURIComponent("Ajuda para escolher um serviço")}`;

  return (
    <Column className={styles.page} maxWidth="l">
      <ServiceHubView inspirations={serviceInspirations} contactHref={contactHref} />
    </Column>
  );
}
