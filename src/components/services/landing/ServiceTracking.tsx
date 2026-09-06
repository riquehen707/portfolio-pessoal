"use client";

import { useEffect, useRef } from "react";
import { trackServiceEvent, type ServiceTrackingContext } from "./analytics";

export function ServiceTracking({ context }: { context: ServiceTrackingContext }) {
  const lastView = useRef("");
  useEffect(() => {
    const key = JSON.stringify(context);
    if (lastView.current === key) return;
    lastView.current = key;
    trackServiceEvent("service_landing_view", context);
  }, [context]);
  return null;
}

// O adaptador do formulário chama confirmedSubmit somente após sucesso do servidor.
export function useServiceFormTracking(context: ServiceTrackingContext) {
  const started = useRef(false);
  const confirmed = useRef(new Set<string>());
  return {
    start() {
      if (started.current) return;
      started.current = true;
      trackServiceEvent("service_form_start", context, "form");
    },
    confirmedSubmit(receiptId: string) {
      if (!receiptId.trim() || confirmed.current.has(receiptId)) return;
      confirmed.current.add(receiptId);
      trackServiceEvent("service_form_submit", context, "form");
      trackServiceEvent("service_conversion", context, "form");
    },
  };
}
