import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import { ServiceLandingPage } from "../landing/ServiceLandingPage";
import { DesignPortfolioDemo } from "./DesignPortfolioDemo";
import styles from "./DesignerLanding.module.scss";

export function DesignerLanding({ landing }: { landing: ServiceLanding }) {
  return (
    <ServiceLandingPage
      landing={landing}
      className={styles.designers}
      heroVisual={<DesignPortfolioDemo compact />}
      renderSection={(section) =>
        section.type === "demonstration" ? (
          <>
            <p>{section.description}</p>
            <DesignPortfolioDemo />
          </>
        ) : undefined
      }
    />
  );
}
