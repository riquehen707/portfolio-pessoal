import type { ServiceLanding } from "./serviceLandingSchema";
import { architectWebsite } from "./architectWebsite";
import { artistGallery } from "./artistGallery";
import { designerPortfolio } from "./designerPortfolio";
import { photographerPortfolio } from "./photographerPortfolio";
import { realEstateWebsite } from "./realEstateWebsite";
import { tattooPortfolio } from "./tattooPortfolio";

// Somente ofertas reais aprovadas. O exemplo de desenvolvimento não entra aqui.
export const serviceLandings: ServiceLanding[] = [
  architectWebsite,
  artistGallery,
  designerPortfolio,
  photographerPortfolio,
  realEstateWebsite,
  tattooPortfolio,
];
