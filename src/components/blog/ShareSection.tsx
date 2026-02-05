// src/components/blog/ShareSection.tsx
"use client";

import { useMemo, useState } from "react";
import { Row, Text, Button, useToast } from "@once-ui-system/core";
import { socialSharing } from "@/resources";

interface ShareSectionProps {
  title: string;
  /** Pode ser relativa ou absoluta. A função garante o absoluto. */
  url: string;
  /** Mostra um botão genérico para Web Share API em dispositivos compatíveis */
  showSystemShareButton?: boolean;
}

type SocialKey =
  | "x"
  | "linkedin"
  | "facebook"
  | "pinterest"
  | "whatsapp"
  | "reddit"
  | "telegram"
  | "email"
  | "copyLink";

interface SocialPlatform {
  name: Exclude<SocialKey, "copyLink">;
  icon: string;
  label: string;
  generateUrl: (title: string, absoluteUrl: string) => string;
}

const ensureAbsoluteUrl = (maybeUrl: string) => {
  try {
    // Se já for absoluta, retorna como está
    // Em client, podemos usar location.origin sem SSR-problems
    return new URL(maybeUrl, window.location.origin).toString();
  } catch {
    return maybeUrl;
  }
};

const withUtm = (absoluteUrl: string, source: string) => {
  try {
    const u = new URL(absoluteUrl);
    // Ajuste as UTMs conforme sua convenção
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", "share");
    u.searchParams.set("utm_campaign", "blog");
    return u.toString();
  } catch {
    return absoluteUrl;
  }
};

const socialPlatforms: Record<Exclude<SocialKey, "copyLink">, SocialPlatform> = {
  x: {
    name: "x",
    icon: "twitter", // mantém ícone do Twitter no DS
    label: "X/Twitter",
    generateUrl: (title, absoluteUrl) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
        withUtm(absoluteUrl, "twitter")
      )}`,
  },
  linkedin: {
    name: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    generateUrl: (_title, absoluteUrl) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        withUtm(absoluteUrl, "linkedin")
      )}`,
  },
  facebook: {
    name: "facebook",
    icon: "facebook",
    label: "Facebook",
    generateUrl: (_title, absoluteUrl) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        withUtm(absoluteUrl, "facebook")
      )}`,
  },
  pinterest: {
    name: "pinterest",
    icon: "pinterest",
    label: "Pinterest",
    generateUrl: (title, absoluteUrl) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        withUtm(absoluteUrl, "pinterest")
      )}&description=${encodeURIComponent(title)}`,
  },
  whatsapp: {
    name: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    // api.whatsapp.com tem compatibilidade mobile/web melhor que wa.me
    generateUrl: (title, absoluteUrl) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${withUtm(absoluteUrl, "whatsapp")}`)}`,
  },
  reddit: {
    name: "reddit",
    icon: "reddit",
    label: "Reddit",
    generateUrl: (title, absoluteUrl) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(
        withUtm(absoluteUrl, "reddit")
      )}&title=${encodeURIComponent(title)}`,
  },
  telegram: {
    name: "telegram",
    icon: "telegram",
    label: "Telegram",
    generateUrl: (title, absoluteUrl) =>
      `https://t.me/share/url?url=${encodeURIComponent(withUtm(absoluteUrl, "telegram"))}&text=${encodeURIComponent(
        title
      )}`,
  },
  email: {
    name: "email",
    icon: "email",
    label: "E-mail",
    generateUrl: (title, absoluteUrl) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Confere este post: ${absoluteUrl}`)}`,
  },
};

export function ShareSection({ title, url, showSystemShareButton = true }: ShareSectionProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const absoluteUrl = useMemo(() => ensureAbsoluteUrl(url), [url]);

  if (!socialSharing?.display) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      addToast({ variant: "success", message: "Link copiado!" });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback simples caso Clipboard API esteja bloqueada
      try {
        const tmp = document.createElement("input");
        tmp.value = absoluteUrl;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        tmp.remove();
        setCopied(true);
        addToast({ variant: "success", message: "Link copiado!" });
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error("Falha ao copiar:", e);
        addToast({ variant: "danger", message: "Falha ao copiar o link" });
      }
    }
  };

  const canUseWebShare = typeof navigator !== "undefined" && "share" in navigator;

  // Plataformas habilitadas (exceto copyLink, tratada separadamente)
  const enabledPlatforms = Object.entries(socialSharing.platforms || {})
    .filter(([key, enabled]) => Boolean(enabled) && key !== "copyLink")
    .map(([key]) => key as Exclude<SocialKey, "copyLink">)
    .filter((key) => socialPlatforms[key]) as Array<Exclude<SocialKey, "copyLink">>;

  return (
    <Row fillWidth center gap="16" marginTop="32" marginBottom="16">
      <Text variant="label-default-m" onBackground="neutral-weak">
        Compartilhar:
      </Text>

      <Row data-border="rounded" gap="16" horizontal="center" wrap>
        {/* Web Share API (mobile/desktop compatível) */}
        {showSystemShareButton && canUseWebShare && (
          <Button
            variant="secondary"
            size="s"
            prefixIcon="share"
            aria-label="Compartilhar pelo menu do sistema"
            onClick={() =>
              (navigator as any).share?.({
                title,
                text: title,
                url: absoluteUrl,
              })
            }
          >
            Compartilhar…
          </Button>
        )}

        {/* Ícones das plataformas habilitadas */}
        {enabledPlatforms.map((key) => {
          const p = socialPlatforms[key];
          const href = p.generateUrl(title, absoluteUrl);
          return (
            <Button
              key={p.name}
              variant="secondary"
              size="s"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              prefixIcon={p.icon}
              aria-label={`Compartilhar no ${p.label}`}
              title={`Compartilhar no ${p.label}`}
            />
          );
        })}

        {/* Copiar link */}
        {socialSharing.platforms?.copyLink && (
          <Button
            variant="secondary"
            size="s"
            onClick={handleCopy}
            prefixIcon={copied ? "check" : "copy"}
            aria-label="Copiar link do post"
            title="Copiar link do post"
          >
            {copied ? "Copiado" : "Copiar"}
          </Button>
        )}
      </Row>
    </Row>
  );
}
