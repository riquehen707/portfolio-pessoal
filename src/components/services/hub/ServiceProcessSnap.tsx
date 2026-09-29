import { Reveal } from "@/components/motion/Reveal";
import type { serviceProcess } from "@/data/service-hub";

import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

type ServiceProcessSnapProps = {
  process: typeof serviceProcess;
  contactHref: string;
};

export function ServiceProcessSnap({
  process,
  contactHref,
}: ServiceProcessSnapProps) {
  return (
    <section
      className={styles.processSection}
      id="processo"
      aria-labelledby="process-title"
    >
      <Reveal
        className={styles.processIntro}
        distance={14}
        trigger="mount"
      >
        <p className={styles.kicker}>Como funciona</p>

        <h2 id="process-title">
          Do primeiro contato ao site publicado.
        </h2>

        <p>
          Um processo direto, com decisões organizadas e sem
          transformar a criação do site em mais uma tarefa para
          você administrar.
        </p>

        <a
          className={styles.processAction}
          href={contactHref}
          data-analytics-event="service_contact"
          data-analytics-location="services_process"
        >
          Conversar sobre meu site
          <span aria-hidden="true">→</span>
        </a>

        <small className={styles.processSupport}>
          Você acompanha cada etapa antes da publicação.
        </small>
      </Reveal>

      <Reveal
        className={styles.processSteps}
        distance={18}
        trigger="mount"
      >
        <ol>
          {process.map((step, index) => (
            <li key={step.id}>
              <div
                className={styles.processMarker}
                aria-hidden="true"
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={styles.processStepContent}>
                <span className={styles.processStepLabel}>
                  Etapa {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.processEnd}>
          <span aria-hidden="true">✓</span>

          <div>
            <strong>Site publicado</strong>
            <small>
              A manutenção continua depois do lançamento.
            </small>
          </div>
        </div>
      </Reveal>

      <div className={styles.processProgress}>
        <StoryProgress
          chapter={4}
          label="Da ideia à publicação"
        />
      </div>
    </section>
  );
}
