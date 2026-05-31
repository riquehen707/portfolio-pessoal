const brandPalette = {
  goldSignature: "#E6C94A",
  accentMuted: "#B89D37",
  darkBase: "#0E0E11",
  darkBaseSecondary: "#151519",
  darkSurface: "#1C1C22",
  darkSurfaceElevated: "#26262D",
  darkBorder: "#3A3A42",
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
      backgroundPrimary: "#0E0E11",
      backgroundSecondary: "#151519",
      surface: "#1C1C22",
      surfaceElevated: "#26262D",
      border: "#3A3A42",
      textPrimary: "#F4F1E8",
      textSecondary: "#AAA8A1",
      accentGold: "#E6C94A",
      accentMuted: "#B89D37",
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
    primary: "Archivo Black",
    alternatives: ["Anton", "Oswald"],
    purpose: "Títulos fortes, modernos e limpos.",
  },
  body: {
    primary: "Source Sans 3",
    alternatives: ["Atkinson Hyperlegible", "IBM Plex Sans"],
    purpose: "Leitura perfeita para texto informativo e claro.",
  },
  technical: {
    primary: "Michroma",
    purpose: "Detalhes técnicos curtos, usados com moderação.",
  },
  accent: {
    primary: "Fugaz One",
    purpose: "Acentos curtos para assinatura visual.",
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
  outcome: "Escuro, editorial e preciso.",
} as const;

const brandMessaging = {
  signatureDescriptor: "Oferta, página e sistemas para operações digitais",
  role: "Leitura comercial, design e tecnologia para corrigir gargalos digitais",
  siteDescription:
    "Henrique Reis organiza oferta, página, conteúdo e rotina antes de aumentar tráfego.",
  homeHeadline: "Antes de aumentar volume, organize a base.",
  homeSubline:
    "Mais conteúdo, tráfego ou automação não resolvem quando a oferta, a página e o atendimento ainda confundem.",
  supportingStatement: "Oferta clara. Página útil. Processo acompanhável.",
  aboutHeadline: "Eu organizo o que acontece antes da venda.",
  aboutLead: "Olho para procura, página, conversa e proposta para descobrir onde a decisão trava.",
  ogFooter: "Clareza reduz atrito.",
  contactStatement: "Escalar sem base costuma só aumentar o vazamento.",
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
    "Leitura do gargalo",
    "Estética com função",
    "Tecnologia com critério",
    "Execução confiável",
    "Base antes de volume",
  ],
  avoids: [
    "Hype vazio",
    "Exagero visual",
    "Promessas genéricas",
    "Estética de template",
    "Complexidade desnecessária",
  ],
  positioning:
    "Henrique Reis trabalha entre oferta, página, conteúdo e rotina para corrigir o que trava a decisão do cliente.",
  commercialTranslation: [
    "Não apenas sites.",
    "Não apenas anúncios.",
    "Não apenas código.",
    "Primeiro a base. Depois o volume.",
  ],
  personality: {
    primary: [
      "Inteligente",
      "Preciso",
      "Sofisticado",
      "Confiável",
      "Criterioso",
      "Moderno",
      "Calmo",
      "Seguro",
    ],
    secondary: ["Criativo", "Ousado com controle", "Técnico", "Refinado"],
  },
  voice: {
    traits: ["Direto", "Claro", "Criterioso", "Sóbrio", "Específico", "Editorial"],
    description:
      "A voz aponta onde a decisão quebra, mostra o critério e evita prometer o que depende da operação.",
    approvedExamples: [
      "Mais tráfego não corrige uma oferta ruim.",
      "Se a página não explica, o atendimento precisa compensar.",
      "Conteúdo sem direção vira volume.",
      "Antes de investir, entenda onde a operação perde resposta.",
      "Nem todo problema de marketing é problema de marketing.",
    ],
    avoid: [
      "Revolucionário",
      "Disruptivo",
      "Inovador em tudo",
      "Solução 360 mágica",
      "Resultado garantido",
      "Texto que promete sem explicar o mecanismo",
    ],
    signatureUse:
      "Use 'Clareza reduz atrito.' apenas como assinatura curta, nunca como argumento principal de seções, cards ou chamadas editoriais.",
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
    "Quando a base está confusa, aumentar volume só espalha o problema.",
    "Uma página boa reduz explicação repetida.",
    "Um processo claro protege tempo, verba e atendimento.",
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
