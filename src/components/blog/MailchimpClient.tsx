"use client";

import * as React from "react";
import { mailchimp } from "@/resources";

type Props = {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
};

export default function MailChimpClient({
  title = "Assine a newsletter",
  subtitle = "Receba novidades e conteúdos selecionados.",
  placeholder = "Seu e-mail",
  buttonLabel = "Inscrever",
  className,
}: Props) {
  const action = mailchimp?.action?.trim() ?? "";

  // Se não houver action, exibimos um aviso silencioso e não quebramos o build
  if (!action) {
    return (
      <div
        role="region"
        aria-label="Newsletter desabilitada"
        className={className}
        style={{
          padding: "1rem",
          border: "1px dashed var(--neutral-alpha-medium)",
          borderRadius: 12,
        }}
      >
        <strong style={{ display: "block", marginBottom: 4 }}>
          Newsletter indisponível
        </strong>
        <span style={{ opacity: 0.8, fontSize: 14 }}>
          Defina <code>mailchimp.action</code> em <code>@/resources/once-ui.config</code> para habilitar.
        </span>
      </div>
    );
  }

  return (
    <form
      action={action}
      method="post"
      className={className}
      style={{
        display: "grid",
        gap: "0.75rem",
        padding: "1rem",
        border: "1px solid var(--neutral-alpha-weak)",
        borderRadius: 12,
        background: "var(--page-background)",
      }}
      target="_blank"
      noValidate
    >
      <div>
        <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
        {subtitle && (
          <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>{subtitle}</p>
        )}
      </div>

      <input
        type="email"
        name="EMAIL"
        required
        placeholder={placeholder}
        aria-label="E-mail"
        style={{
          padding: "0.75rem",
          borderRadius: 10,
          border: "1px solid var(--neutral-alpha-weak)",
          background: "var(--surface-background)",
          color: "var(--neutral-on-surface-strong)",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "0.75rem 1rem",
          borderRadius: 10,
          border: "1px solid transparent",
          background: "var(--brand-background-strong)",
          color: "var(--brand-on-background-strong)",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {buttonLabel}
      </button>

      <div style={{ position: "absolute", left: -5000 }} aria-hidden="true">
        <input type="text" name="b_fake_mc_field" tabIndex={-1} defaultValue="" />
      </div>
    </form>
  );
}
