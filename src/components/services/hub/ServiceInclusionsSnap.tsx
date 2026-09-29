import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import type { serviceInclusions } from "@/data/service-hub";
import type { ServiceInspiration } from "@/data/service-inspirations";

import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

type ServiceInclusionsSnapProps = {
  inclusions: typeof serviceInclusions;
  visual?: ServiceInspiration;
};

export function ServiceInclusionsSnap({
  inclusions,
  visual,
}: ServiceInclusionsSnapProps) {
  return (
    <section
      className={styles.inclusionsSection}
      id="incluso"
      aria-labelledby="inclusions-title"
    >
      <div className={styles.inclusionsContent}>
        <Reveal
          className={styles.inclusionsIntro}
          distance={14}
          trigger="mount"
        >
          <p className={styles.kicker}>O essencial já está incluso</p>

          <h2 id="inclusions-title">
            Você cuida do negócio. Eu cuido do site.
          </h2>

          <p>
            Design, infraestrutura e manutenção fazem parte do
            serviço. Você não precisa montar uma equipe técnica
            para manter o site funcionando.
          </p>

          <ul className={styles.inclusionsGrid}>
            {inclusions.map((inclusion, index) => (
              <li key={inclusion.id}>
                <span className={styles.inclusionNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3>{inclusion.title}</h3>
                  <p>{inclusion.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {visual ? (
          <Reveal
            className={styles.inclusionsVisual}
            distance={18}
            trigger="mount"
          >
            <div
              className={styles.technicalBackdrop}
              aria-hidden="true"
            />

            <div className={styles.technicalBrowser}>
              <div
                className={styles.technicalBrowserBar}
                aria-hidden="true"
              >
                <span>
                  <i />
                  <i />
                  <i />
                </span>

                <div>henrique.dog</div>

                <small>•••</small>
              </div>

              <div className={styles.technicalBrowserImage}>
                <Image
                  src={visual.image}
                  alt={visual.alt}
                  fill
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </div>
            </div>

            <div
              className={styles.domainCard}
              aria-hidden="true"
            >
              <span>Domínio</span>

              <strong>henrique.dog</strong>

              <small>
                <i />
                Conectado
              </small>
            </div>

            <div
              className={styles.seoCard}
              aria-hidden="true"
            >
              <header>
                <span>SEO técnico</span>
                <small>Google</small>
              </header>

              <strong>98</strong>

              <div>
                <i />
                <i />
                <i />
                <i />
              </div>

              <small>Estrutura otimizada</small>
            </div>

            <div
              className={styles.performanceCard}
              aria-hidden="true"
            >
              <span>Performance</span>

              <div>
                <strong>95</strong>
                <small>/100</small>
              </div>

              <i>
                <b />
              </i>
            </div>

            <div
              className={styles.technicalMobile}
              aria-hidden="true"
            >
              <span />

              <div>
                <Image
                  src={visual.image}
                  alt=""
                  fill
                  sizes="10rem"
                />
              </div>
            </div>

            <div
              className={styles.responsiveCard}
              aria-hidden="true"
            >
              <span>
                <i />
                <i />
                <i />
              </span>

              <div>
                <strong>Responsivo</strong>
                <small>Celular, tablet e desktop</small>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>

      <footer className={styles.inclusionsFooter}>
        <StoryProgress
          chapter={3}
          label="O que você recebe"
        />

        <div className={styles.inclusionsFooterActions}>
          <div className={styles.priceReassurance}>
            <strong>A partir de R$300/mês</strong>
            <span>Sem taxa de criação.</span>
          </div>

          <Link
            className={styles.textLink}
            href="/servicos/capacidades"
          >
            Ver capacidades
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </footer>
    </section>
  );
}
