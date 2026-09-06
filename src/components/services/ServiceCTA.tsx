import { getServiceLandingById } from "@/data/service-landings";
import styles from "./landing/ServiceLanding.module.scss";

/** CTA editorial: aponta somente para uma landing publicada do novo catálogo. */
export function ServiceCTA({
  serviceId,
  title,
  description,
  label = "Conhecer o serviço",
}: {
  serviceId: string;
  title: string;
  description: string;
  label?: string;
}) {
  const landing = getServiceLandingById(serviceId);
  if (!landing) throw new Error(`ServiceCTA: serviço ausente ou não publicado: ${serviceId}`);
  return (
    <aside className={styles.editorialCTA} aria-label={title}>
      <strong>{title}</strong>
      <p>{description}</p>
      <a href={`/servicos/${landing.slug}`}>{label}</a>
    </aside>
  );
}
