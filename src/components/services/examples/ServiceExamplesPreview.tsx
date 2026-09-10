import Image from "next/image";
import Link from "next/link";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { getServiceExamplePath } from "@/data/service-examples";
import styles from "./ServiceExamplesPreview.module.scss";

export function ServiceExamplesPreview({ examples }: { examples: ServiceExample[] }) {
  return (
    <section className={styles.section} id="exemplos" aria-labelledby="examples-preview-title">
      <div className={styles.heading}>
        <div><p>Exemplos demonstrativos</p><h2 id="examples-preview-title">Três sites, três direções visuais.</h2></div>
        <Link href="/servicos/exemplos">Ver todos os exemplos <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.grid}>
        {examples.slice(0, 3).map((example) => example.preview ? (
          <article key={example.id}>
            <Link className={styles.preview} href={getServiceExamplePath(example.slug)} aria-label={`Abrir site demonstrativo ${example.name}`}>
              <Image src={example.preview.src} alt={example.preview.alt} fill sizes="(max-width: 760px) 84vw, 27rem" />
              <span>Projeto demonstrativo</span>
            </Link>
            <div><p>{example.category} · {example.solutionType === "local-business" ? "Negócio local" : example.solutionType === "portfolio" ? "Portfólio" : "Institucional"}</p><h3>{example.name}</h3><Link href={getServiceExamplePath(example.slug)}>Ver site <span aria-hidden="true">→</span></Link></div>
          </article>
        ) : null)}
      </div>
    </section>
  );
}
