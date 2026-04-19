import { track as trackVercelEvent } from "@vercel/analytics";

type AnalyticsPrimitive = string | number | boolean;
export type AnalyticsPayload = Record<string, AnalyticsPrimitive | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments>;
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function normalizePropertyKey(key: string) {
  const normalized = key.charAt(0).toLowerCase() + key.slice(1);
  return normalized.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
}

function parseValue(value: string): AnalyticsPrimitive {
  if (value === "true") return true;
  if (value === "false") return false;

  const numeric = Number(value);
  if (!Number.isNaN(numeric) && value.trim() !== "") {
    return numeric;
  }

  return value;
}

export function sanitizePayload(payload: AnalyticsPayload = {}) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  ) as Record<string, AnalyticsPrimitive>;
}

export function getDatasetPayload(element: HTMLElement) {
  const payload: AnalyticsPayload = {};

  Object.entries(element.dataset).forEach(([key, value]) => {
    if (!key.startsWith("analytics") || key === "analyticsEvent" || !value) {
      return;
    }

    payload[normalizePropertyKey(key.slice("analytics".length))] = parseValue(value);
  });

  const href = element.getAttribute("href");
  if (href) {
    payload.href = href;
  }

  return sanitizePayload(payload);
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined" || !name) {
    return;
  }

  const cleanPayload = sanitizePayload(payload);
  window.dataLayer = window.dataLayer || [];

  if (window.dataLayer) {
    window.dataLayer.push({ event: name, ...cleanPayload });
  }

  if (window.gtag) {
    window.gtag("event", name, cleanPayload);
  }

  trackVercelEvent(name, cleanPayload);
}

export function trackPageView(payload: {
  pagePath: string;
  pageTitle: string;
  pageLocation: string;
}) {
  if (typeof window === "undefined") {
    return;
  }

  const cleanPayload = sanitizePayload({
    page_path: payload.pagePath,
    page_title: payload.pageTitle,
    page_location: payload.pageLocation,
  });
  window.dataLayer = window.dataLayer || [];

  if (window.dataLayer) {
    window.dataLayer.push({ event: "page_view", ...cleanPayload });
  }

  if (window.gtag) {
    window.gtag("event", "page_view", cleanPayload);
  }
}
