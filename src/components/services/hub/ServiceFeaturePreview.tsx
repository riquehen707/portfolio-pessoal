"use client";

import { useState } from "react";

import styles from "./ServiceFeaturePreview.module.scss";

export function ServiceFeaturePreview() {
  const [feedback, setFeedback] = useState(
    "Demonstração local: nenhum aplicativo será aberto.",
  );

  return (
    <div className={styles.preview}>
      <p>Contato contextual</p>
      <h3>Quer conversar sobre seu projeto?</h3>
      <span>
        A mensagem pode chegar ao WhatsApp já ligada ao serviço ou à inspiração
        que a pessoa estava vendo.
      </span>
      <button
        type="button"
        onClick={() =>
          setFeedback("Interação demonstrada. Nenhuma mensagem foi enviada.")
        }
      >
        Falar pelo WhatsApp
      </button>
      <small aria-live="polite">{feedback}</small>
    </div>
  );
}
