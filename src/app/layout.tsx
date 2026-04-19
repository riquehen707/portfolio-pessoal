import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/styles/globals.scss";

import classNames from "classnames";

import {
  Background,
  Column,
  Flex,
  Meta,
  RevealFx,
  SpacingToken,
  opacity,
} from "@once-ui-system/core";

import { Footer, Header, Providers } from "@/components";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import {
  baseURL as baseFromConfig,
  brandIdentity,
  brandMessaging,
  brandPalette,
  dataStyle,
  effects,
  fonts,
  home,
  style,
} from "@/resources";

function resolveBaseURL(): URL {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? baseFromConfig ?? "").trim();
  const fallbackDev = "http://localhost:3000";

  try {
    return new URL(raw || fallbackDev);
  } catch {
    throw new Error(
      `baseURL invalida: "${raw}". Defina NEXT_PUBLIC_SITE_URL ou exporte um baseURL absoluto em '@/resources/once-ui.config'.`,
    );
  }
}

function ensureLeadingSlash(path?: string): string | undefined {
  if (!path) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

function toAbsoluteOrPath(base: URL, maybePath?: string): string | undefined {
  if (!maybePath) return undefined;

  try {
    return new URL(maybePath, base).toString();
  } catch {
    return ensureLeadingSlash(maybePath);
  }
}

const GOOGLE_SITE_VERIFICATION = "LQzYGuvWyFJ-oWweMatvNPeFAQwOIMT2q8Q1pbX27Zw";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: brandPalette.darkBase },
    { media: "(prefers-color-scheme: light)", color: brandPalette.lightBase },
  ],
};

export async function generateMetadata() {
  const metadataBase = resolveBaseURL();
  const siteTitle = brandIdentity.name;
  const siteDescription = brandMessaging.siteDescription;
  const path = ensureLeadingSlash(home?.path ?? "/");
  const image = toAbsoluteOrPath(metadataBase, home?.image ?? "/og.png");
  const canonicalUrl = new URL(path || "/", metadataBase).toString();

  const onceMeta = Meta.generate({
    title: siteTitle,
    description: siteDescription,
    baseURL: metadataBase.toString(),
    path,
    image,
  });

  return {
    ...onceMeta,
    applicationName: siteTitle,
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    authors: [{ name: siteTitle, url: canonicalUrl }],
    creator: siteTitle,
    publisher: siteTitle,
    description: siteDescription,
    metadataBase,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: canonicalUrl,
      siteName: siteTitle,
      title: siteTitle,
      description: siteDescription,
      images: image ? [{ url: image, alt: siteTitle }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: image ? [image] : undefined,
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    robots: {
      index: true,
      follow: true,
    },
    referrer: "origin-when-cross-origin",
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="pt-BR"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
        <SiteStructuredData />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};

                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute("data-" + key, value);
                  });

                  const resolveTheme = (themeValue) => {
                    if (!themeValue) {
                      return "${style.theme}";
                    }

                    if (themeValue === "system") {
                      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                    }

                    return themeValue;
                  };

                  const savedTheme = localStorage.getItem("data-theme");
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute("data-theme", resolvedTheme);

                  Object.keys(config).forEach((key) => {
                    const value = localStorage.getItem("data-" + key);
                    if (value) root.setAttribute("data-" + key, value);
                  });
                } catch (error) {
                  console.error("Failed to initialize theme:", error);
                  document.documentElement.setAttribute("data-theme", "dark");
                }
              })();
            `,
          }}
        />
      </head>

      <Providers>
        <Column
          as="body"
          className="hr-site-body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <RevealFx fill position="absolute">
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </RevealFx>
          <Header />
          <Flex as="main" className="hr-site-main" zIndex={0} fillWidth horizontal="center" flex={1}>
            <Flex className="hr-site-content" horizontal="center" fillWidth minHeight="0">
              {children}
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </Providers>
    </Flex>
  );
}
