import type { ReactNode } from "react";
import Link from "next/link";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import styles from "./ServiceExampleChrome.module.scss";

export function ServiceExampleChrome({ example, contactHref, children }: { example: ServiceExample; contactHref: string; children: ReactNode }) {
  return (
    <div className={`${styles.root} demoCanvasRoot`} data-example-theme={example.visualIdentity.themeKey}>
      {children}
      <aside className={styles.attribution} aria-label="Informações sobre este projeto demonstrativo">
        <div><span>Projeto demonstrativo</span><strong>Criado por Henrique Reis</strong></div>
        <div className={styles.actions}><Link href="/servicos">Voltar para Serviços</Link><a href={contactHref}>Quero um site como este</a></div>
      </aside>
    </div>
  );
}
