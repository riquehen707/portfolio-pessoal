import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import {
  architectDemoLicense,
  architectDemoMedia,
} from "@/content/service-landings/architectDemoMedia";
import { ServiceLandingPage } from "../landing/ServiceLandingPage";
import { ArchitectPortfolioDemo } from "./ArchitectPortfolioDemo";
import styles from "./ArchitectLanding.module.scss";

export function ArchitectLanding({ landing }: { landing: ServiceLanding }) {
  return (
    <ServiceLandingPage
      landing={landing}
      className={styles.architects}
      heroVisual={<ArchitectPortfolioDemo compact />}
      renderSection={(section) =>
        section.type === "demonstration" ? (
          <>
            <p>{section.description}</p>
            <ArchitectPortfolioDemo />
            <details className={styles.credits}>
              <summary>Créditos das fotografias de exemplo</summary>
              <p>
                Demonstração ilustrativa, sem autoria arquitetônica, clientes, localização ou
                resultados atribuídos ao executor.
              </p>
              <ul>
                {architectDemoMedia.map((project) => (
                  <li key={project.src}>
                    {project.category}:{" "}
                    <a href={project.source} target="_blank" rel="noopener noreferrer">
                      fotografia de {project.credit} / Unsplash
                    </a>
                  </li>
                ))}
              </ul>
              <a href={architectDemoLicense.url} target="_blank" rel="noopener noreferrer">
                {architectDemoLicense.name}
              </a>
            </details>
          </>
        ) : undefined
      }
    />
  );
}
