import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Column } from "@once-ui-system/core";
import { ServiceHubView } from "@/components/services/hub/ServiceHubView";
import { getServiceHubGroups } from "@/data/service-hub";
import { person } from "@/resources";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Prévia do card de serviço",
  description: "Estados do card da home de serviços, disponíveis somente em desenvolvimento.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/dev/service-card" },
};

export default function ServiceCardPreview() {
  if (process.env.NODE_ENV !== "development") notFound();
  const groups = getServiceHubGroups();
  const contactHref = `mailto:${person.email}?subject=${encodeURIComponent("Ajuda para escolher um serviço")}`;

  return (
    <Column className={styles.page} maxWidth="l">
      <ServiceHubView groups={groups} contactHref={contactHref} />
    </Column>
  );
}
