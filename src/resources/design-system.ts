import { brandMoodboard, brandPalette, brandTypography } from "./brand";

const designSystem = {
  name: "Henrique Reis Design System",
  direction: brandMoodboard.title,
  principle: "Menos elementos. Mais intenção.",
  themes: {
    defaultTheme: "dark",
    secondaryTheme: "light",
    dark: {
      backgroundPrimary: brandPalette.themes.dark.backgroundPrimary,
      backgroundSecondary: brandPalette.themes.dark.backgroundSecondary,
      surface: brandPalette.themes.dark.surface,
      surfaceElevated: brandPalette.themes.dark.surfaceElevated,
      border: brandPalette.themes.dark.border,
      textPrimary: brandPalette.themes.dark.textPrimary,
      textSecondary: brandPalette.themes.dark.textSecondary,
      accentGold: brandPalette.themes.dark.accentGold,
      accentMuted: brandPalette.themes.dark.accentMuted,
    },
    light: {
      backgroundPrimary: brandPalette.themes.light.backgroundPrimary,
      backgroundSecondary: brandPalette.themes.light.backgroundSecondary,
      surface: brandPalette.themes.light.surface,
      border: brandPalette.themes.light.border,
      textPrimary: brandPalette.themes.light.textPrimary,
      textSecondary: brandPalette.themes.light.textSecondary,
      accentGold: brandPalette.themes.light.accentGold,
    },
  },
  accentUsage: {
    principle: "O dourado é assinatura, não preenchimento.",
    applyTo: [
      "logo",
      "item ativo",
      "hover discreto",
      "links especiais",
      "números de destaque",
      "CTA principal pontual",
    ],
    avoid: [
      "fundos grandes dourados",
      "múltiplos elementos competindo",
      "texto corrido dourado",
    ],
  },
  typography: {
    heading: brandTypography.heading.primary,
    body: brandTypography.body.primary,
    scale: {
      h1: "clamp(2.5rem, 6vw, 4.5rem)",
      h2: "clamp(1.875rem, 4vw, 3.25rem)",
      h3: "clamp(1.75rem, 3vw, 2.25rem)",
      bodyLarge: "1.25rem",
      body: "1rem",
      bodyComfort: "1.125rem",
      caption: "0.875rem",
    },
  },
  layout: {
    maxWidth: "1280px",
    columns: {
      desktop: 12,
      tablet: 8,
      mobile: 4,
    },
    spacing: ["8", "16", "24", "32", "48", "64", "96", "128"],
    radius: {
      small: "8px",
      medium: "16px",
      large: "24px",
      pill: "999px",
    },
  },
  surfaces: {
    flat: "Background simples",
    elevated: "Cards e blocos importantes",
    ghost: "Elementos transparentes leves",
  },
  shadows: {
    principle: "Sombras suaves, profundas e sem glow excessivo.",
  },
  motion: {
    duration: {
      fast: "200ms",
      base: "280ms",
      slow: "450ms",
    },
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    feel: "Luxo moderno, preciso e controlado.",
  },
  components: {
    buttons: {
      primary: "escuro com detalhe dourado",
      secondary: "outline limpo",
      hover: "movimento sutil com brilho leve",
    },
    cards: "blocos sólidos com hierarquia clara",
    inputs: "superfícies discretas com foco forte",
    navbar: "casca translúcida controlada",
    sectionTitles: "eyebrow + heading + texto objetivo",
    tags: "pílulas técnicas com baixo ruído visual",
    modals: "camada elevada com fundo escuro estruturado",
    tooltips: "micro-superfícies de contraste alto",
  },
  antiGeneric: [
    "container em tudo",
    "gradiente clichê de IA",
    "cards demais",
    "glass excessivo",
    "brilho gratuito",
    "elementos sem função",
  ],
} as const;

export { designSystem };
