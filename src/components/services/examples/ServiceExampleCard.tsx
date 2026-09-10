import Image from "next/image";
import Link from "next/link";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { getServiceExamplePath } from "@/data/service-examples";
import styles from "./ServiceExamples.module.scss";

export function ServiceExampleCard({ example }: { example: ServiceExample }) {
  if (!example.coverImage) return null;
  return (
    <article className={styles.card} data-theme={example.visualStyle.themeKey}>
      <Link className={styles.preview} href={getServiceExamplePath(example.slug)} aria-label={`Ver exemplo: ${example.title}`}>
        <span className={styles.desktopPreview}><Image src={example.coverImage.src} alt={example.coverImage.alt} fill sizes="(max-width: 760px) 86vw, 52rem" /></span>
        {example.coverImage.mobileSrc ? <span className={styles.mobilePreview} aria-hidden="true"><Image src={example.coverImage.mobileSrc} alt="" fill sizes="10rem" /></span> : null}
        <span className={styles.demoLabel}>Site demonstrativo</span>
      </Link>
      <div className={styles.cardCopy}>
        <p>{example.segment}</p>
        <h3>{example.title}</h3>
        <p>{example.shortDescription}</p>
        <ul className={styles.highlights} aria-label="Recursos principais">
          {example.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <Link className={styles.siteLink} href={getServiceExamplePath(example.slug)}>Ver site <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
