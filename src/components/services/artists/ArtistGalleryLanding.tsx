import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import {
  artistGalleryDemoLicense,
  artistGalleryDemoMedia,
} from "@/content/service-landings/artistGalleryDemoMedia";
import { ServiceLandingPage } from "../landing/ServiceLandingPage";
import { ArtistGalleryDemo } from "./ArtistGalleryDemo";
import styles from "./ArtistGalleryLanding.module.scss";

export function ArtistGalleryLanding({ landing }: { landing: ServiceLanding }) {
  return (
    <ServiceLandingPage
      landing={landing}
      className={styles.artistGallery}
      heroVisual={<ArtistGalleryDemo compact />}
      renderSection={(section) =>
        section.type === "demonstration" ? (
          <>
            <p>{section.description}</p>
            <ArtistGalleryDemo />
            <details className={styles.credits}>
              <summary>Créditos das fotografias de exemplo</summary>
              <p>
                Demonstração ilustrativa, sem obras, autoria artística, disponibilidade, clientes ou
                resultados atribuídos ao executor.
              </p>
              <ul>
                {artistGalleryDemoMedia.map((work) => (
                  <li key={work.src}>
                    {work.category}:{" "}
                    <a href={work.source} target="_blank" rel="noopener noreferrer">
                      fotografia de {work.credit} / Unsplash
                    </a>
                  </li>
                ))}
              </ul>
              <a href={artistGalleryDemoLicense.url} target="_blank" rel="noopener noreferrer">
                {artistGalleryDemoLicense.name}
              </a>
            </details>
          </>
        ) : undefined
      }
    />
  );
}
