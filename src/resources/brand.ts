const brandPalette = {
  goldSignature: "#FFD700",
  accentMuted: "#C9A600",
  darkBase: "#0B0B0D",
  darkBaseSecondary: "#141418",
  darkSurface: "#1B1B20",
  darkSurfaceElevated: "#24242A",
  darkBorder: "#2F2F36",
  lightBase: "#F7F7F4",
  lightBaseSecondary: "#FFFFFF",
  lightSurface: "#ECECE7",
  lightBorder: "#D8D8CF",
  textDarkMode: "#F4F4F0",
  textDarkModeSecondary: "#A8A8B3",
  textLightMode: "#111111",
  textLightModeSecondary: "#555555",
  technicalBlue: "#1482B8",
  themes: {
    dark: {
      backgroundPrimary: "#0B0B0D",
      backgroundSecondary: "#141418",
      surface: "#1B1B20",
      surfaceElevated: "#24242A",
      border: "#2F2F36",
      textPrimary: "#F4F4F0",
      textSecondary: "#A8A8B3",
      accentGold: "#FFD700",
      accentMuted: "#C9A600",
    },
    light: {
      backgroundPrimary: "#F7F7F4",
      backgroundSecondary: "#FFFFFF",
      surface: "#ECECE7",
      border: "#D8D8CF",
      textPrimary: "#111111",
      textSecondary: "#555555",
      accentGold: "#B89212",
    },
  },
} as const;

const brandTypography = {
  heading: {
    primary: "Space Grotesk",
    alternatives: ["Satoshi", "Clash Display"],
    purpose: "Títulos fortes, modernos e limpos.",
  },
  body: {
    primary: "Inter",
    alternatives: ["Manrope"],
    purpose: "Leitura perfeita para texto informativo e claro.",
  },
} as const;

const brandLogoSystem = {
  symbol: "Quadrado puro",
  color: brandPalette.goldSignature,
  rationale: ["Base sólida", "Estabilidade", "Estrutura", "Precisão", "Construção", "Confiança"],
  rules: [
    "Sem efeitos.",
    "Sem recortes complexos.",
    "Sem distorções.",
    "O símbolo deve permanecer matematicamente limpo em qualquer escala.",
  ],
  variants: {
    primary: "Quadrado dourado em fundo escuro.",
    light: "Quadrado dourado em fundo claro.",
    monochrome: "Quadrado branco ou preto quando necessário.",
  },
  applications: [
    "navbar",
    "favicon",
    "footer",
    "loading screen",
    "assinatura discreta",
    "estados ativos",
  ],
} as const;

const brandMoodboard = {
  title: "Precision Editorial Noir",
  references: [
    "Clareza editorial",
    "Estrutura suíça",
    "Sofisticação dark",
    "Atmosfera cinematográfica leve",
    "Tecnologia refinada",
  ],
  outcome: "Premium, inteligente, memorável.",
} as const;

const brandMessaging = {
  signatureDescriptor: "Estratégia, design e sistemas com clareza estrutural",
  role: "Parceiro estratégico em design, tecnologia e visão comercial para operações digitais",
  siteDescription:
    "Henrique Reis combina design, tecnologia e visão comercial para estruturar operações digitais com clareza, valor percebido e execução confiável.",
  homeHeadline: "Estratégia, design e sistemas para negócios que precisam crescer com clareza.",
  homeSubline:
    "Não apenas sites, anúncios ou código. Soluções digitais completas e integradas para negócios reais.",
  supportingStatement: "Controle, valor percebido e execução confiável.",
  footerStatement: "Estrutura digital com critério, clareza estratégica e execução confiável.",
  aboutHeadline:
    "Design, tecnologia e visão comercial para estruturar presença, operação e crescimento.",
  aboutLead:
    "Não entrego partes soltas. Conecto estratégia, estética e execução para criar sistemas digitais claros, sofisticados e funcionais.",
  ogFooter: "Clareza gera resultado.",
  contactStatement: "Crescimento exige estrutura.",
} as const;

const brandIdentity = {
  name: "Henrique Reis",
  summary: [
    {
      label: "Especialidade",
      value: "Negócios locais, prestadores de serviço e e-commerce.",
    },
    {
      label: "Entrega",
      value: "Captação de clientes, presença digital e estrutura operacional.",
    },
    {
      label: "Atuação",
      value: "Marketing, sistemas e posicionamento digital.",
    },
  ],
  represents: [
    "Inteligência aplicada",
    "Organização do caos",
    "Estética com função",
    "Tecnologia com critério",
    "Execução confiável",
    "Crescimento estruturado",
  ],
  avoids: [
    "Hype vazio",
    "Exagero visual",
    "Promessas genéricas",
    "Estética de template",
    "Complexidade desnecessária",
  ],
  positioning:
    "Henrique Reis é um parceiro estratégico que combina design, tecnologia e visão comercial para estruturar operações digitais de negócios reais.",
  commercialTranslation: [
    "Não apenas sites.",
    "Não apenas anúncios.",
    "Não apenas código.",
    "Soluções completas e integradas.",
  ],
  personality: {
    primary: [
      "Inteligente",
      "Preciso",
      "Sofisticado",
      "Confiável",
      "Estratégico",
      "Moderno",
      "Calmo",
      "Seguro",
    ],
    secondary: ["Criativo", "Ousado com controle", "Técnico", "Refinado"],
  },
  voice: {
    traits: ["Direto", "Claro", "Sem exagero", "Seguro", "Maduro", "Objetivo"],
    approvedExamples: [
      "Estratégia antes da execução.",
      "Sistemas digitais que funcionam.",
      "Clareza gera resultado.",
      "Crescimento exige estrutura.",
    ],
    avoid: ["Revolucionário", "Disruptivo", "Inovador em tudo", "Solução 360 mágica"],
  },
  visualDirection: brandMoodboard,
  typography: brandTypography,
  logo: brandLogoSystem,
  palette: brandPalette,
  principles: [
    "Menos, melhor.",
    "Clareza acima de efeito.",
    "Um elemento forte vale mais que cinco médios.",
    "Espaço vazio comunica confiança.",
    "Movimento deve servir função.",
    "Simplicidade exige rigor.",
  ],
  antiRules: [
    "Neon genérico",
    "Glow excessivo",
    "Glassmorphism gratuito",
    "Gradientes clichês de IA",
    "Excesso de cards",
    "Bordas demais",
    "Texto demais",
    "Animação por vaidade",
  ],
  manifesto: [
    "Em um mercado cheio de excesso, clareza virou diferencial.",
    "Soluções fortes não precisam gritar.",
    "Precisam funcionar.",
  ],
  approval: "Isso parece meu - e não parece template.",
} as const;

export {
  brandIdentity,
  brandLogoSystem,
  brandMessaging,
  brandMoodboard,
  brandPalette,
  brandTypography,
};
