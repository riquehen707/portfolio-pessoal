import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

export function ServiceFinalSnap({
  contactHref,
  visual,
}: {
  contactHref: string;
  visual?: ServiceInspiration;
}) {
  return (
    <section className={styles.closingSection} id="contato" aria-labelledby="contact-title">
      <Reveal className={styles.closingCopy} distance={20}>
        <p className={styles.kicker}>Vamos conversar?</p>
        <h2 id="contact-title">Seu site pode começar a trabalhar pelo seu negócio.</h2>
        <p>Me conte brevemente o que você precisa e eu vejo qual estrutura faz mais sentido para o seu projeto.</p>
        <a
          className={styles.closingAction}
          href={contactHref}
          data-analytics-event="services_help_click"
          data-analytics-location="services_hub_closing"
        >
          Falar pelo WhatsApp <span aria-hidden="true">→</span>
        </a>
        <small>Contato direto e sem compromisso.</small>
      </Reveal>
      {visual ? (
        <Reveal className={styles.closingVisual} distance={28}>
          <Image src={visual.image} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" />
          <span className={styles.closingDevice} aria-hidden="true">
            <Image src={visual.image} alt="" fill sizes="(max-width: 760px) 28vw, 10rem" />
          </span>
        </Reveal>
      ) : null}
      <StoryProgress chapter={7} label="Fim da página" />
    </section>
  );
}
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import type { ServiceInspiration } from "@/data/service-inspirations";
