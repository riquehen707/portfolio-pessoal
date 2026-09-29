"use client";

import { useId, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import type { serviceFaq } from "@/data/service-hub";

import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

type ServiceFaqItem = (typeof serviceFaq)[number];

export function ServiceFaqSnap({ faq }: { faq: readonly ServiceFaqItem[] }) {
  const prefix = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className={styles.faqSection} id="duvidas" aria-labelledby="faq-title">
      <header className={styles.faqIntro}>
        <p className={styles.kicker}>Dúvidas frequentes</p>
        <h2 id="faq-title">Antes de começar, vale esclarecer algumas coisas.</h2>
      </header>

      <Reveal className={styles.faqList} distance={16}>
        {faq.map((item) => {
          const isOpen = openId === item.id;
          const contentId = `${prefix}-${item.id}`;
          return (
            <div className={styles.faqItem} key={item.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <i aria-hidden="true" data-open={isOpen ? "true" : "false"} />
                </button>
              </h3>
              <div id={contentId} hidden={!isOpen} role="region" aria-label={item.question}>
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </Reveal>

      <StoryProgress chapter={6} label="Continue explorando" />
    </section>
  );
}
