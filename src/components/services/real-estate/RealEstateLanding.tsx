import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import {
  realEstateDemoLicense,
  realEstateDemoMedia,
} from "@/content/service-landings/realEstateDemoMedia";
import { ServiceLandingPage } from "../landing/ServiceLandingPage";
import { RealEstateDemo } from "./RealEstateDemo";
import styles from "./RealEstateLanding.module.scss";

export function RealEstateLanding({ landing }: { landing: ServiceLanding }) {
  return (
    <ServiceLandingPage
      landing={landing}
      className={styles.realEstate}
      heroVisual={<RealEstateDemo compact />}
      renderSection={(section) =>
        section.type === "demonstration" ? (
          <>
            <p>{section.description}</p>
            <RealEstateDemo />
            <details className={styles.credits}>
              <summary>Créditos das fotografias de exemplo</summary>
              <p>Demonstração ilustrativa, sem imóveis anunciados, clientes ou resultados reais.</p>
              <ul>
                {realEstateDemoMedia.map((photo) => (
                  <li key={photo.src}>
                    {photo.kind}:{" "}
                    <a href={photo.source} target="_blank" rel="noopener noreferrer">
                      {photo.credit} / Unsplash
                    </a>
                  </li>
                ))}
              </ul>
              <a href={realEstateDemoLicense.url} target="_blank" rel="noopener noreferrer">
                {realEstateDemoLicense.name}
              </a>
            </details>
          </>
        ) : undefined
      }
    />
  );
}
