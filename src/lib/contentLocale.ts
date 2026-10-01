export const CONTENT_LOCALES = ["pt-BR", "en"] as const;
export type ContentLocale = (typeof CONTENT_LOCALES)[number];

export const MARKETS = ["BR", "US"] as const;
export type Market = (typeof MARKETS)[number];

const localeMarket: Record<ContentLocale, Market> = {
  "pt-BR": "BR",
  en: "US",
};

export function normalizeContentLocale(value?: string): ContentLocale {
  if (value === "en" || value === "en-US") return "en";
  return "pt-BR";
}

export function defaultMarketForLocale(locale: ContentLocale): Market {
  return localeMarket[locale];
}

export function getArticlePath(slug: string, locale: ContentLocale = "pt-BR") {
  return locale === "en" ? `/en/articles/${slug}` : `/blog/${slug}`;
}

export function openGraphLocale(locale: ContentLocale) {
  return locale === "en" ? "en_US" : "pt_BR";
}

export function formatLocale(locale: ContentLocale) {
  return locale === "en" ? "en" : "pt-BR";
}
