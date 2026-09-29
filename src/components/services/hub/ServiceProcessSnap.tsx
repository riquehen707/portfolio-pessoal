import type { serviceProcess } from "@/data/service-hub";
import { Reveal } from "@/components/motion/Reveal";

import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

type ServiceProcessStep = (typeof serviceProcess)[number];

export function ServiceProcessSnap({
  process,
  contactHref,
}: {
  process: readonly ServiceProcessStep[];
  contactHref: string;
}) {
  return (
    <section className={styles.processSection} id="processo" aria-labelledby="process-title">
      <header className={styles.processIntro}>
        <p className={styles.kicker}>Como funciona</p>
        <h2 id="process-title">Do primeiro contato ao site publicado.</h2>
        <p>Um processo simples, com poucas etapas e sem complicação técnica para você.</p>
      </header>

      <Reveal className={styles.processSteps} distance={18}>
        <ol>
          {process.map((step, index) => (
            <li key={step.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <footer className={styles.processFooter}>
        <div>
          <a className={styles.processAction} href={contactHref} data-analytics-event="services_help_click" data-analytics-location="services_hub_process">
            Quero começar <span aria-hidden="true">→</span>
          </a>
          <p>Você explica o que precisa. Eu cuido da parte técnica.</p>
        </div>
        <StoryProgress chapter={4} label="Continue explorando" />
      </footer>
    </section>
  );
}
