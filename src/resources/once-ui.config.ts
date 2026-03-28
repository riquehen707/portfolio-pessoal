import { Manrope, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";

import { home } from "./index";

const baseURL: string = (process.env.NEXT_PUBLIC_SITE_URL?.trim() as string) || "https://henrique.dog";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/servicos": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Manrope({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const fonts: FontsConfig = {
  heading,
  body,
  label,
  code,
};

const style: StyleConfig = {
  theme: "system",
  neutral: "sand",
  brand: "indigo",
  accent: "magenta",
  solid: "contrast",
  solidStyle: "plastic",
  border: "playful",
  surface: "translucent",
  transition: "all",
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: { stroke: "var(--neutral-alpha-weak)" },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: true,
  },
};

const effects: EffectsConfig = {
  mask: { cursor: false, x: 50, y: 0, radius: 90 },
  gradient: {
    display: true,
    opacity: 64,
    x: 52,
    y: 14,
    width: 120,
    height: 72,
    tilt: -8,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
  },
  dots: { display: false, opacity: 0, size: "2", color: "brand-background-strong" },
  grid: {
    display: true,
    opacity: 22,
    color: "neutral-alpha-medium",
    width: "1rem",
    height: "1rem",
  },
  lines: {
    display: true,
    opacity: 20,
    color: "accent-alpha-medium",
    size: "20",
    thickness: 1,
    angle: 0,
  },
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: { cursor: true, x: 50, y: 0, radius: 90 },
    gradient: {
      display: true,
      opacity: 72,
      x: 50,
      y: 0,
      width: 58,
      height: 56,
      tilt: -4,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: { display: false, opacity: 0, size: "2", color: "brand-on-background-weak" },
    grid: {
      display: true,
      opacity: 24,
      color: "neutral-alpha-medium",
      width: "0.9rem",
      height: "0.9rem",
    },
    lines: {
      display: true,
      opacity: 18,
      size: "18",
      thickness: 1,
      angle: 90,
      color: "neutral-alpha-medium",
    },
  },
};

const schema: SchemaConfig = {
  logo: "",
  type: "Organization",
  name: "Henrique Studio",
  description: home.description,
  email: "contato@henrique.dog",
};

const sameAs: SameAsConfig = {
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
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
