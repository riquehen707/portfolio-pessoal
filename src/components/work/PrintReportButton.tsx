"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@once-ui-system/core";

export function PrintReportButton() {
  const [isPrinting, setIsPrinting] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => {
      setIsPrinting(false);

      if (resetTimerRef.current != null) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);

      if (resetTimerRef.current != null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handlePrint = () => {
    if (typeof window === "undefined" || typeof window.print !== "function") {
      return;
    }

    setIsPrinting(true);
    window.print();

    if (resetTimerRef.current != null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setIsPrinting(false);
      resetTimerRef.current = null;
    }, 2000);
  };

  return (
    <Button
      type="button"
      variant="primary"
      size="s"
      onClick={handlePrint}
      disabled={isPrinting}
      aria-busy={isPrinting}
    >
      {isPrinting ? "Abrindo impressao..." : "Gerar PDF"}
    </Button>
  );
}
