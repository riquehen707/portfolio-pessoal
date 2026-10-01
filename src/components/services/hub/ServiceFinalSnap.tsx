import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import type { ServiceInspiration } from "@/data/service-inspirations";

import styles from "./ServiceHubView.module.scss";

export function ServiceFinalSnap({
  contactHref,
  visual,
}: {
  contactHref: string;
  visual?: ServiceInspiration;
}) {
  return (
    <section className={styles.closingSection} id="contato" aria-labelledby="contact-title">
      <div className={styles.closingInner}>
        <Reveal className={styles.closingCopy} distance={20} trigger="mount">
          <p className={styles.kicker}>Vamos conversar?</p>
          <h2 id="contact-title">Vamos definir o que seu site precisa apresentar.</h2>
          <p>Envie o contexto do projeto, as páginas necessárias e a forma de contato que deseja oferecer.</p>
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
          <Reveal className={styles.closingVisual} distance={28} trigger="mount">
            <div className={styles.closingGlow} aria-hidden="true" />
            <div className={styles.closingBrowser}>
              <div className={styles.closingBrowserBar} aria-hidden="true">
                <span><i /><i /><i /></span>
                <small>seunegocio.com.br</small>
              </div>
              <div className={styles.closingBrowserImage}>
                <Image src={visual.image} alt={visual.alt} fill sizes="(max-width: 900px) 90vw, 48vw" />
              </div>
            </div>
            <div className={styles.closingDevice} aria-hidden="true">
              <span />
              <Image src={visual.image} alt="" fill sizes="(max-width: 620px) 30vw, 11rem" />
            </div>
            <div className={styles.closingStatus} aria-hidden="true">
              <i />
              <div><strong>Site publicado</strong><small>Pronto para receber contatos</small></div>
            </div>
          </Reveal>
        ) : null}
      </div>

    </section>
  );
}
