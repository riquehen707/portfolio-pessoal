import Image from "next/image";
import Link from "next/link";

import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { getServiceExamplePath } from "@/data/service-examples";

import styles from "./ServiceHubView.module.scss";

export function ServiceExamplesSnap({ examples }: { examples: ServiceExample[] }) {
  const cards = examples.filter((example) => example.coverImage);
  const primary = cards.find((example) => example.slug === "estudio-unhas") ?? cards[0];
  const secondary = cards.filter((example) => example.slug !== primary?.slug);

  return (
    <section className={styles.examplesSection} id="exemplos" aria-labelledby="examples-title">
      <header className={styles.examplesIntro}>
        <p className={styles.kicker}>Demonstrações</p>
        <h2 id="examples-title">Veja a interface em uso.</h2>
        <p>Abra os projetos demonstrativos para explorar as páginas e a navegação. O conteúdo é ilustrativo.</p>
      </header>

      {primary?.coverImage ? (
        <div className={styles.examplesShowcase}>
          <article className={styles.showcasePrimary}>
            <Link className={styles.showcasePrimaryImage} href={getServiceExamplePath(primary.slug)} aria-label={`Explorar demonstração ${primary.title}`}>
              <Image src={primary.coverImage.src} alt={primary.coverImage.alt} fill sizes="(max-width: 900px) 100vw, 64vw" />
            </Link>
            <div className={styles.showcasePrimaryCopy}>
              <p>{primary.segment} · Projeto demonstrativo</p>
              <h3>{primary.title}</h3>
              <Link className={styles.exampleLink} href={getServiceExamplePath(primary.slug)}>Explorar demonstração <span aria-hidden="true">↗</span></Link>
            </div>
          </article>

          {secondary.length ? <div className={styles.showcaseSecondaryList}>
            {secondary.map((example) => example.coverImage && <article className={styles.showcaseSecondary} key={example.slug}>
              <Link className={styles.showcaseSecondaryImage} href={getServiceExamplePath(example.slug)} aria-label={`Explorar demonstração ${example.title}`}>
                <Image src={example.coverImage.src} alt={example.coverImage.alt} fill sizes="(max-width: 620px) 8rem, (max-width: 900px) 40vw, 14rem" />
              </Link>
              <div className={styles.showcaseSecondaryCopy}>
                <p>{example.segment}</p>
                <h3>{example.title}</h3>
                <Link className={styles.exampleLink} href={getServiceExamplePath(example.slug)}>Ver demonstração <span aria-hidden="true">→</span></Link>
              </div>
            </article>)}
          </div> : null}
        </div>
      ) : <p className={styles.exampleEmpty}>As demonstrações serão exibidas quando estiverem publicadas.</p>}

      <footer className={styles.examplesFooter}>
        <Link className={styles.textLink} href="/servicos/inspiracoes">Explorar direções visuais <span aria-hidden="true">→</span></Link>
      </footer>
    </section>
  );
}
