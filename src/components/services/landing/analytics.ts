"use client";

import { trackEvent } from "@/components/analytics/analytics";

export type ServiceEvent =
  | "service_landing_view"
  | "service_cta_click"
  | "service_whatsapp_click"
  | "service_form_start"
  | "service_form_submit"
  | "service_conversion";
export type ServiceTrackingContext = {
  service_id: string;
  landing_slug: string;
  conversion_kind: string;
  experiment_id?: string;
  variant_id?: string;
};

// Allowlist explícita: não enviar telefone, mensagem, campos do formulário ou URL.
export function trackServiceEvent(
  event: ServiceEvent,
  context: ServiceTrackingContext,
  location?: string,
) {
  trackEvent(event, {
    service_id: context.service_id,
    landing_slug: context.landing_slug,
    conversion_kind: context.conversion_kind,
    experiment_id: context.experiment_id,
    variant_id: context.variant_id,
    location,
  });
}
