import Image from "next/image";
import Link from "next/link";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { getServiceExamplePath } from "@/data/service-examples";
import styles from "./ServiceExamples.module.scss";

export function ServiceExampleCard({ example }: { example: ServiceExample }) {
  if (!example.preview) return null;
  return (
    <article className={styles.card} data-theme={example.visualIdentity.themeKey}>
      <Link className={styles.preview} href={getServiceExamplePath(example.slug)} aria-label={`Ver exemplo: ${example.name}`}>
        <span className={styles.desktopPreview}><Image src={example.preview.src} alt={example.preview.alt} fill sizes="(max-width: 760px) 86vw, 52rem" /></span>
        {example.preview.mobileSrc ? <span className={styles.mobilePreview} aria-hidden="true"><Image src={example.preview.mobileSrc} alt="" fill sizes="10rem" /></span> : null}
        <span className={styles.demoLabel}>Site demonstrativo</span>
      </Link>
      <div className={styles.cardCopy}>
        <p>{example.category}</p>
        <h3>{example.name}</h3>
        <p>{example.description}</p>
        <ul className={styles.highlights} aria-label="Recursos principais">
          {example.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <Link className={styles.siteLink} href={getServiceExamplePath(example.slug)}>Ver site <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
