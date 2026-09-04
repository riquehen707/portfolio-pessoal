import Image from "next/image";
import Link from "next/link";
import { organizationsById } from "@/content/organizations/organizations";
import styles from "./StudioCard.module.scss";

export function StudioCard({ organizationId }: { organizationId: string }) {
  const studio = organizationsById.get(organizationId);
  if (!studio) throw new Error(`StudioCard recebeu um ID inexistente: ${organizationId}`);
  if (studio.kind !== "studio") throw new Error(`StudioCard recebeu uma organização que não é estúdio: ${organizationId}`);
  const title = studio.status === "published" && studio.profilePath
    ? <Link href={studio.profilePath}>{studio.name}</Link>
    : studio.name;
  const period = studio.founded ? `${studio.founded}–${studio.activeUntil ?? "presente"}` : undefined;
  const monogram = studio.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("");

  return <article className={styles.card}>
    <div className={styles.identity} data-placeholder={!studio.image || undefined}>
      {studio.image
        ? <Image src={studio.image.src} alt={studio.image.alt} fill sizes="(max-width: 520px) 112px, 176px" />
        : <span aria-label={`Imagem institucional não cadastrada para ${studio.name}`}>{monogram}</span>}
    </div>
    <div className={styles.content}>
      <span className={styles.eyebrow}>Estúdio</span>
      <h3>{title}</h3>
      <div className={styles.meta}>{studio.location?.country ? <span>{studio.location.country}</span> : null}{period ? <span>{period}</span> : null}</div>
      {studio.specialties.length ? <p className={styles.specialty}>{studio.specialties.slice(0, 2).join(" · ")}</p> : null}
      <p className={styles.summary}>{studio.summary}</p>
    </div>
  </article>;
}
