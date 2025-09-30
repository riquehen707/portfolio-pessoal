// src/components/about/ScheduleCall.tsx
"use client";

import { useMemo, useState } from "react";
import { Row, Button, Icon, IconButton, Text } from "@once-ui-system/core";

type Props = {
  link: string;            // ex.: https://cal.com/riquehen/30min ou https://calendly.com/xxx
  label?: string;          // ex.: "Agendar uma call"
  variant?: "primary" | "secondary";
};

function canEmbed(url: URL) {
  // Cal.com permite embed por iframe com query ?embed=1
  return url.hostname.endsWith("cal.com");
}

export default function ScheduleCall({ link, label = "Agendar uma call", variant = "primary" }: Props) {
  const [open, setOpen] = useState(false);

  const { href, embedHref, embeddable } = useMemo(() => {
    try {
      const u = new URL(link);
      const isEmbeddable = canEmbed(u);
      if (isEmbeddable) {
        // Cal.com: adiciona ?embed=1
        if (!u.searchParams.has("embed")) u.searchParams.set("embed", "1");
        return { href: u.toString(), embedHref: u.toString(), embeddable: true };
      }
      return { href: u.toString(), embedHref: undefined, embeddable: false };
    } catch {
      return { href: link, embedHref: undefined, embeddable: false };
    }
  }, [link]);

  return (
    <Row gap="8" vertical="center" wrap>
      <Button
        variant={variant}
        prefixIcon="calendar"
        aria-expanded={open}
        onClick={() => (embeddable ? setOpen((v) => !v) : window.open(href, "_blank", "noopener,noreferrer"))}
      >
        {label}
      </Button>

      {/* Botão extra: abrir nova aba sempre */}
      <IconButton
        icon="external"
        aria-label="Abrir em nova aba"
        onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
        variant={variant === "primary" ? "secondary" : "tertiary"}
      />

      {/* Área embutida (Cal.com) */}
      {embeddable && open && embedHref && (
        <Row
          fillWidth
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid var(--border-neutral-alpha-medium)",
          }}
          marginTop="8"
        >
          <iframe
            src={embedHref}
            title="Agendar call"
            style={{ width: "100%", minHeight: 720, border: "0" }}
            loading="lazy"
          />
        </Row>
      )}
      {!embeddable && open && (
        <Text onBackground="neutral-weak" variant="body-default-s">
          O provedor atual não permite embed. Abrimos em nova aba.
        </Text>
      )}
    </Row>
  );
}
