"use client";

import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import { trackServiceEvent, type ServiceTrackingContext } from "./analytics";
import styles from "./ServiceLanding.module.scss";

export function ServiceAction({
  conversion,
  context,
  location,
  sticky = false,
}: {
  conversion: ServiceLanding["conversion"];
  context: ServiceTrackingContext;
  location: string;
  sticky?: boolean;
}) {
  return (
    <a
      className={sticky ? `${styles.action} ${styles.sticky}` : styles.action}
      href={conversion.href}
      onClick={() => {
        trackServiceEvent("service_cta_click", context, location);
        if (conversion.kind === "whatsapp")
          trackServiceEvent("service_whatsapp_click", context, location);
      }}
    >
      {conversion.label}
    </a>
  );
}
