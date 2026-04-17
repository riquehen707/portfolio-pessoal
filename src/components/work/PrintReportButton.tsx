"use client";

import { Button } from "@once-ui-system/core";

export function PrintReportButton() {
  return (
    <Button type="button" variant="primary" size="s" onClick={() => window.print()}>
      Gerar PDF
    </Button>
  );
}
