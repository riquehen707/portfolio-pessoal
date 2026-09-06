import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import {
  photographerDemoMedia,
  photographerDemoLicense,
} from "@/content/service-landings/photographerDemoMedia";
import { ServiceLandingPage } from "../landing/ServiceLandingPage";
import { PhotographyDemo } from "./PhotographyDemo";
import styles from "./PhotographerLanding.module.scss";

export function PhotographerLanding({ landing }: { landing: ServiceLanding }) {
  return (
    <ServiceLandingPage
      landing={landing}
      className={styles.photographers}
      heroVisual={<PhotographyDemo compact />}
      renderSection={(section) =>
        section.type === "demonstration" ? (
          <>
            <p>{section.description}</p>
            <PhotographyDemo />
            <details className={styles.credits}>
              <summary>Créditos das fotos de exemplo</summary>
              <p>Demonstração de interface, sem trabalhos ou resultados de clientes.</p>
              <ul>
                {photographerDemoMedia.map((photo) => (
                  <li key={photo.src}>
                    {photo.category}:{" "}
                    <a href={photo.source} target="_blank" rel="noopener noreferrer">
                      {photo.credit} / Unsplash
                    </a>
                  </li>
                ))}
              </ul>
              <a href={photographerDemoLicense.url} target="_blank" rel="noopener noreferrer">
                {photographerDemoLicense.name}
              </a>
            </details>
          </>
        ) : undefined
      }
    />
  );
}
