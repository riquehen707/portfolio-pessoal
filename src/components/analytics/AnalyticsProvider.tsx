"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { getDatasetPayload, trackEvent, trackPageView } from "./analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim();
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();
const scrollDepthBreakpoints = [25, 50, 75, 100] as const;

export function AnalyticsProvider() {
  const pathname = usePathname() ?? "/";
  const [pagePath, setPagePath] = useState(pathname);

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    setPagePath(search ? `${pathname}${search}` : pathname);
  }, [pathname]);

  useEffect(() => {
    trackPageView({
      pagePath,
      pageTitle: document.title,
      pageLocation: window.location.href,
    });
  }, [pagePath]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const trackedElement = target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = trackedElement?.dataset.analyticsEvent;

      if (!trackedElement || !eventName) {
        return;
      }

      trackEvent(eventName, {
        page_path: pagePath,
        ...getDatasetPayload(trackedElement),
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pagePath]);

  useEffect(() => {
    const seen = new Set<number>();

    const reportProgress = () => {
      const root = document.documentElement;
      const maxScrollable = root.scrollHeight - root.clientHeight;

      if (maxScrollable <= 0) {
        return;
      }

      const progress = Math.round((window.scrollY / maxScrollable) * 100);

      scrollDepthBreakpoints.forEach((breakpoint) => {
        if (progress >= breakpoint && !seen.has(breakpoint)) {
          seen.add(breakpoint);
          trackEvent("scroll_depth", {
            page_path: pagePath,
            scroll_depth: breakpoint,
          });
        }
      });
    };

    reportProgress();
    window.addEventListener("scroll", reportProgress, { passive: true });

    return () => window.removeEventListener("scroll", reportProgress);
  }, [pagePath]);

  useEffect(() => {
    const startedAt = performance.now();
    let reported = false;

    const reportEngagement = () => {
      if (reported) {
        return;
      }

      reported = true;
      const durationSeconds = Math.max(1, Math.round((performance.now() - startedAt) / 1000));

      trackEvent("page_engagement", {
        page_path: pagePath,
        duration_seconds: durationSeconds,
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        reportEngagement();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", reportEngagement);

    return () => {
      reportEngagement();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", reportEngagement);
    };
  }, [pagePath]);

  return (
    <>
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {GA_ID && !GTM_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js', new Date());gtag('config', '${GA_ID}', { send_page_view: false });`}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', '${CLARITY_ID}');`}
        </Script>
      )}

      <Analytics />
      <SpeedInsights />
    </>
  );
}
