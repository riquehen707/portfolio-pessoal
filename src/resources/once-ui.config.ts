import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

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

import { brandIdentity, brandMessaging } from "./brand";
import { home } from "./content";

const baseURL: string = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://henrique.dog";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/abordagem-tecnica": true,
  "/work": true,
  "/blog": true,
  "/contact": true,
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
  weight: ["400", "500", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
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
  theme: "dark",
  neutral: "custom",
  brand: "custom",
  accent: "custom",
  solid: "contrast",
  solidStyle: "flat",
  border: "rounded",
  surface: "translucent",
  transition: "all",
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 10,
    radius: 72,
  },
  gradient: {
    display: false,
    opacity: 0,
    x: 50,
    y: 0,
    width: 84,
    height: 44,
    tilt: -6,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
  },
  dots: {
    display: false,
    opacity: 0,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 0,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 0,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: false,
      x: 50,
      y: 0,
      radius: 72,
    },
    gradient: {
      display: false,
      opacity: 0,
      x: 50,
      y: 0,
      width: 52,
      height: 52,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: false,
      opacity: 0,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 0,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 0,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

const schema: SchemaConfig = {
  logo: "/trademarks/henrique-reis-mark.svg",
  type: "Person",
  name: brandIdentity.name,
  description: brandMessaging.siteDescription,
  email: "oi@henriquereis.dev",
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
