import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import {
  tattooDemoLicense,
  tattooDemoMedia,
} from "@/content/service-landings/tattooDemoMedia";
import { ServiceLandingPage } from "../landing/ServiceLandingPage";
import { TattooPortfolioDemo } from "./TattooPortfolioDemo";
import styles from "./TattooLanding.module.scss";

export function TattooLanding({ landing }: { landing: ServiceLanding }) {
  return (
    <ServiceLandingPage
      landing={landing}
      className={styles.tattooArtists}
      heroVisual={<TattooPortfolioDemo compact />}
      renderSection={(section) =>
        section.type === "demonstration" ? (
          <>
            <p>{section.description}</p>
            <TattooPortfolioDemo />
            <details className={styles.credits}>
              <summary>Créditos das fotografias de exemplo</summary>
              <p>Demonstração ilustrativa, sem trabalhos, clientes ou resultados reais.</p>
              <ul>
                {tattooDemoMedia.map((photo) => (
                  <li key={photo.src}>
                    {photo.style}:{" "}
                    <a href={photo.source} target="_blank" rel="noopener noreferrer">
                      {photo.credit} / Unsplash
                    </a>
                  </li>
                ))}
              </ul>
              <a href={tattooDemoLicense.url} target="_blank" rel="noopener noreferrer">
                {tattooDemoLicense.name}
              </a>
            </details>
          </>
        ) : undefined
      }
    />
  );
}
