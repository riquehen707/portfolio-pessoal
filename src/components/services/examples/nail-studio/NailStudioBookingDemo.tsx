"use client";

import { useState } from "react";

import styles from "./NailStudioDemo.module.scss";

export function NailStudioBookingDemo() {
  const [feedback, setFeedback] = useState("");

  return (
    <div className={styles.bookingDemo}>
      <button
        type="button"
        onClick={() =>
          setFeedback(
            "Demonstração: o agendamento do estúdio seria aberto nesta etapa.",
          )
        }
      >
        Pedir um horário
        <span aria-hidden="true">↗</span>
      </button>

      <span aria-live="polite">{feedback}</span>
    </div>
  );
}
