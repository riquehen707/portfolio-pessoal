// src/app/layout.tsx

import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  Background,
  Column,
  Flex,
  Meta,
  opacity,
  RevealFx,
  SpacingToken,
} from "@once-ui-system/core";

import { Footer, Header, Providers } from "@/components";
import {
  baseURL as baseFromConfig,
  effects,
  fonts,
  style,
  dataStyle,
  home,
} from "@/resources";

// =======================================================
// Helpers robustos para URL e caminhos/base
// =======================================================
function resolveBaseURL(): URL {
  // prioridade: env → config → fallback dev
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? baseFromConfig ?? "").trim();
  const fallbackDev = "http://localhost:3000";
  try {
    const normalized = raw || fallbackDev;
    return new URL(normalized);
  } catch {
    throw new Error(
      `baseURL inválida: "${raw}". Defina NEXT_PUBLIC_SITE_URL (ex: https://seu-dominio.com) ` +
        `ou exporte um baseURL absoluto em '@/resources/once-ui.config'.`
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
    return new URL(maybePath, base).toString(); // trata absoluta/relativa
  } catch {
    return ensureLeadingSlash(maybePath);
  }
}

// =======================================================
// Google Search Console token
// =======================================================
const GOOGLE_SITE_VERIFICATION =
  "LQzYGuvWyFJ-oWweMatvNPeFAQwOIMT2q8Q1pbX27Zw";

// =======================================================
// generateMetadata: integra Once UI + Next Metadata
// =======================================================
export async function generateMetadata() {
  const metadataBase = resolveBaseURL();

  // Caso você já utilize o objeto "home" do Once UI, podemos mesclar,
  // mas vamos forçar título/descrição aqui conforme pedido.
  const siteTitle = "Henrique Studio";
  const siteDescription = "Descrição e tudo";

  const path = ensureLeadingSlash(home?.path ?? "/");
  const image = toAbsoluteOrPath(metadataBase, home?.image ?? "/og.png");

  // Meta.generate retorna um objeto compatível com Metadata;
  // em seguida mesclamos verificações e ajustes do Next.
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
    // Força um template de título útil para páginas internas
    title: {
      default: siteTitle,
      template: `%s · ${siteTitle}`,
    },
    description: siteDescription,
    metadataBase,
    alternates: {
      canonical: new URL(path || "/", metadataBase).toString(),
    },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
    // Opcional: ícones, themeColor etc. podem ser adicionados aqui
  };
}

// =======================================================
// RootLayout
// =======================================================
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        fonts.code.variable
      )}
    >
      <head>
        {/* Redundância intencional: além do metadata.verification acima,
            também deixamos a meta explícita aqui.
            Isso ajuda em caches/variações e facilita inspeção manual */}
        <meta
          name="google-site-verification"
          content={GOOGLE_SITE_VERIFICATION}
        />

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
                    root.setAttribute('data-' + key, value);
                  });

                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };

                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);

                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) root.setAttribute('data-' + key, value);
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>

      <Providers>
        <Column
          as="body"
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

          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />

          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              {children}
            </Flex>
          </Flex>

          <Footer />
        </Column>
      </Providers>
    </Flex>
  );
}
