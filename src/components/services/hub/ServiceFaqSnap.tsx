"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState } from "react";

import type { ServiceFaqItem } from "@/data/service-hub";

import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

type ServiceFaqSnapProps = {
  faq: ServiceFaqItem[];
};

export function ServiceFaqSnap({ faq }: ServiceFaqSnapProps) {
  const [openId, setOpenId] = useState<string | null>(
    faq[0]?.id ?? null,
  );

  const reducedMotion = useReducedMotion();

  return (
    <section
      className={styles.faqSection}
      id="duvidas"
      aria-labelledby="faq-title"
    >
      <header className={styles.faqIntro}>
        <p className={styles.kicker}>Dúvidas frequentes</p>

        <h2 id="faq-title">
          Antes de começar.
        </h2>

        <p>
          Respostas diretas sobre contratação, manutenção e
          funcionamento do serviço.
        </p>

        <div className={styles.faqAside}>
          <span>Não encontrou sua dúvida?</span>

          <a href="#contato">
            Falar sobre meu projeto
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <div className={styles.faqList}>
        {faq.map((item, index) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          const buttonId = `faq-button-${item.id}`;

          return (
            <article
              className={styles.faqItem}
              data-open={isOpen}
              key={item.id}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenId((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                >
                  <span className={styles.faqQuestion}>
                    <small>
                      {String(index + 1).padStart(2, "0")}
                    </small>

                    <span>{item.question}</span>
                  </span>

                  <i
                    data-open={isOpen}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <m.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={styles.faqAnswer}
                    initial={
                      reducedMotion
                        ? { opacity: 1 }
                        : {
                            height: 0,
                            opacity: 0,
                          }
                    }
                    animate={
                      reducedMotion
                        ? { opacity: 1 }
                        : {
                            height: "auto",
                            opacity: 1,
                          }
                    }
                    exit={
                      reducedMotion
                        ? { opacity: 0 }
                        : {
                            height: 0,
                            opacity: 0,
                          }
                    }
                    transition={{
                      duration: reducedMotion ? 0.01 : 0.24,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div>
                      <p>{item.answer}</p>
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>

      <div className={styles.faqProgress}>
        <StoryProgress
          chapter={6}
          label="Tire suas dúvidas"
        />
      </div>
    </section>
  );
}