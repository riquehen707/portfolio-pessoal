"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackingPayload = {
  eventName: string;
  label: string;
  plan?: string;
  value?: number;
};

type TrackingLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  payload: TrackingPayload;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function trackTutoringEvent(payload: TrackingPayload) {
  const event = {
    event: payload.eventName,
    event_category: "aulas_particulares",
    event_label: payload.label,
    plan: payload.plan,
    value: payload.value,
    currency: "BRL",
  };

  window.dataLayer?.push(event);
  window.gtag?.("event", payload.eventName, {
    event_category: event.event_category,
    event_label: payload.label,
    plan: payload.plan,
    value: payload.value,
    currency: "BRL",
  });
  window.fbq?.("trackCustom", "TutoringLeadClick", {
    label: payload.label,
    plan: payload.plan,
    value: payload.value,
    currency: "BRL",
  });
}

export function TrackingLink({ href, children, payload, onClick, ...props }: TrackingLinkProps) {
  const isInternal = href.startsWith("/");

  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] = (event) => {
    trackTutoringEvent(payload);
    onClick?.(event);
  };

  if (isInternal) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
