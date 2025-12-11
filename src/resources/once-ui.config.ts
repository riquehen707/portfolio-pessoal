// src/resources/once-ui.config.ts
import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

// =====================================================
// BASE URL
// Lê do env (Vercel -> Project Settings -> Environment Variables)
// e cai em https://henrique.dog como padrão.
// =====================================================
const baseURL: string =
  (process.env.NEXT_PUBLIC_SITE_URL?.trim() as string) ||
  "https://henrique.dog";

// =====================================================
// ROTAS LIBERADAS (raízes). Subrotas passam
// se o RouteGuard usar checagem por prefixo.
// =====================================================
const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
  "/admin": true,
  "/servicos": true,
};

// Mostra localização/hora/troca de tema no Header (Once UI)
const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

// =====================================================
// ROTAS PROTEGIDAS POR SENHA (opcional)
// Use prefixo: se marcar "/work/segredo": true,
// todas as subrotas de /work/segredo/** ficarão protegidas.
// =====================================================
const protectedRoutes: ProtectedRoutesConfig = {
  // "/work/automate-design-handovers-with-a-figma-to-code-pipeline": true,
};

// =====================================================
// FONTES (Google)
// =====================================================
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { TRUE } from "sass";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});
const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});
const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});
const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading,
  body,
  label,
  code,
};

// =====================================================
// ESTILO GLOBAL (Once UI)
// =====================================================
const style: StyleConfig = {
  theme: "system", // dark | light | system
  neutral: "sand", // sand | gray | slate | custom
  brand: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "magenta", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: "contrast", // color | contrast
  solidStyle: "plastic", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24,
  axis: { stroke: "var(--neutral-alpha-weak)" },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: true,
  },
};

const effects: EffectsConfig = {
  mask: { cursor: false, x: 50, y: 0, radius: 100 },
  gradient: {
    display: true,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: { display: true, opacity: 40, size: "2", color: "brand-background-strong" },
  grid: {
    display: true,
    opacity: 90,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: true,
    opacity: 80,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

// =====================================================
// MAILCHIMP (opcional) — não interfere se você não usar
// =====================================================
const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: { cursor: true, x: 50, y: 0, radius: 100 },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: { display: true, opacity: 20, size: "2", color: "brand-on-background-weak" },
    grid: {
      display: true,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: true,
      opacity: 100,
      size: "16",
      thickness: 1,
      angle: 90,
      color: "neutral-alpha-medium",
    },
  },
};

// =====================================================
// SCHEMA / SOCIAL
// =====================================================
const schema: SchemaConfig = {
  logo: "",
  type: "Organization",
  name: "Henrique Studio",
  description: home.description,
  email: "contato@henrique.dog", // ajuste se tiver outro e-mail
};

const sameAs: SameAsConfig = {
  // Preencha quando quiser
  threads: "",
  linkedin: "",
  discord: "",
};

const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: true,
    pinterest: true,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: false,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
