import { About, AccountPage, AdminPage, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import { productsPage, services, servicesPage } from "./services";

const person: Person = {
  firstName: "Henrique",
  lastName: "Reis",
  name: `Henrique Reis`,
  role: "Desenvolvedor & Estrategista de Negócios",
  avatar: "/images/avatar-henrique.jpg",
  email: "oi@henriquereis.dev",
  location: "America/Bahia",
  languages: ["Português"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Assine a newsletter de {person.firstName}</>,
  description: <>Notas semanais sobre produtos, dados e estratégia.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/riquehen707",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/riquehen",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.me/5575983675164",
  },
];

const featuredService = services[0];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Início",
  title: `Portfólio de ${person.name}`,
  description: `Projetos, serviços e produtos desenvolvidos por ${person.role}.`,
  headline: <>Henrique Reis | Estúdio</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">
          {featuredService.badge} · {featuredService.hero.highlight}
        </strong>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Serviço em destaque
        </Text>
      </Row>
    ),
    href: `${servicesPage.path}/${featuredService.slug}`,
  },
  subline: (
    <>
      Meu nome é {person.firstName}. Dirijo um estúdio que combina produto, dados e marketing para
      gerar soluções mensuráveis.
      <br />
      Explore os {servicesPage.label.toLowerCase()} e {productsPage.label.toLowerCase()} digitais
      desenhados para atrair leads e conversões.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre",
  title: `Sobre • ${person.name}`,
  description: `Conheça ${person.name}, ${person.role} em ${person.location}.`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/henriquereis",
  },
  intro: {
    display: true,
    title: "Introdução",
    description: (
      <>
        {person.firstName} cria soluções de negócios guiadas por dados, conectando desenvolvimento web,
        análise e estratégia. Foco em sistemas simples capazes de gerar resultados concretos: do cardápio
        digital com WhatsApp ao painel financeiro com previsões e estrutura de custos.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experiência",
    experiences: [
      {
        company: "Estúdio de Desenvolvimento e Marketing",
        timeframe: "2023 – Presente",
        role: "Fundador • Dev & Estratégia",
        achievements: [
          <>
            Sistema financeiro web (Python + Streamlit) com previsões, estrutura de custos, curva ABC e
            relatórios exportáveis.
          </>,
          <>
            Cardápio digital em Next.js com pedidos via WhatsApp, personalização de itens e cálculo
            inteligente de entrega.
          </>,
        ],
        images: [
          {
            src: "/images/projects/financas/cover-01.jpg",
            alt: "Sistema financeiro",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Estudos",
    institutions: [
      {
        name: "Autodidata (produto, dados e estratégia)",
        description: <>Anúncios (Meta), análise de dados, UX/SEO e gestão.</>,
      },
      {
        name: "Pesquisas atuais",
        description: (
          <>
            Arquitetura das redes sociais, vieses cognitivos, curva ABC e modelagem adaptativa de fluxo
            de caixa.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Habilidades técnicas",
    skills: [
      {
        title: "Python & Streamlit",
        description: (
          <>Dashboards financeiros com previsões, relatórios e análises (ABC, sazonalidade, cenários).</>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "Streamlit", icon: "streamlit" },
          { name: "Pandas", icon: "pandas" },
        ],
        images: [
          {
            src: "/images/projects/financas/cover-02.jpg",
            alt: "Dashboard financeiro",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>Apps completos com Next.js + Once UI, integração com WhatsApp e cálculo de entrega.</>
        ),
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Vercel", icon: "vercel" },
        ],
        images: [
          {
            src: "/images/projects/cardapio/cover-01.jpg",
            alt: "Cardápio digital",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Dados & Estratégia",
        description: <>KPIs, projeções, estrutura de custos e decisões guiadas por dados.</>,
        tags: [
          { name: "Analytics", icon: "chart" },
          { name: "SEO", icon: "seo" },
          { name: "Meta Ads", icon: "meta" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Textos sobre produto, dados e negócios",
  description: `Últimos textos de ${person.name}.`,
};

const daily: Blog = {
  path: "/diario",
  label: "Diário",
  title: "Diário de bordo",
  description: "Notas curtas, aprendizados diários e bastidores do estúdio.",
};

const work: Work = {
  path: "/work",
  label: "Projetos",
  title: `Projetos • ${person.name}`,
  description: `Design, desenvolvimento e dados por ${person.name}.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galeria",
  title: `Galeria • ${person.name}`,
  description: `Coleção de fotos e capturas de ${person.name}.`,
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "Imagem", orientation: "horizontal" },
    { src: "/images/gallery/vertical-4.jpg", alt: "Imagem", orientation: "vertical" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "Imagem", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg", alt: "Imagem", orientation: "vertical" },
    { src: "/images/gallery/vertical-2.jpg", alt: "Imagem", orientation: "vertical" },
    { src: "/images/gallery/horizontal-2.jpg", alt: "Imagem", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-4.jpg", alt: "Imagem", orientation: "horizontal" },
    { src: "/images/gallery/vertical-3.jpg", alt: "Imagem", orientation: "vertical" },
  ],
};

const account: AccountPage = {
  path: "/conta",
  label: "Conta",
  title: "Minha Conta",
  description: "Gerencie seu acesso e preferências.",
};

const admin: AdminPage = {
  path: "/admin",
  label: "Admin",
  title: "Plataforma Integrada de CRM e Análise de Dados",
  description:
    "Infraestrutura própria de dados que centraliza CRM, GA4, cal.com e demais fontes para análise rápida e decisões baseadas em dados reais.",
  sections: [
    {
      title: "Visão Geral da Arquitetura",
      description:
        "Um ecossistema centralizado coleta, organiza e analisa dados do CRM, Google Analytics, cal.com e formulários próprios para gerar relatórios transparentes e úteis.",
    },
    {
      title: "Fontes de Dados",
      description: "CRM, GA4, cal.com e formulários do site alimentam o banco único.",
      items: [
        "CRM: contatos, oportunidades, estágios e atividades.",
        "GA4: sessões, canais, eventos de conversão e navegação.",
        "cal.com: agendamentos, reuniões e cancelamentos.",
        "Site/Landing Pages: formulários, UTMs e identificadores.",
      ],
    },
    {
      title: "Ingestão de Dados",
      description: "Dados chegam normalizados ao PostgreSQL através de pipelines confiáveis.",
      items: [
        "Queries em Python extraem eventos do GA4 via Google Analytics Data API.",
        "Webhooks cal.com são recebidos pelas rotas da API do Next.js e persistidos.",
        "Formulários do site alimentam o CRM interno em tempo real.",
      ],
    },
    {
      title: "Modelagem e Organização",
      description:
        "Tabelas como dim_contact, dim_channel, fact_leads e fact_deals traduzem o volume bruto em insights acionáveis.",
      items: [
        "Fatos de tráfego diário e eventos para comparar canais.",
        "Dimensões que simplificam filtros e cruzamentos.",
        "Modelagem preparada para responder perguntas de negócio com clareza.",
      ],
    },
    {
      title: "Visualização e Painéis Internos",
      description:
        "Dashboards em Next.js apresentam CRM, tráfego, funis e análises personalizadas por canal, página, período e serviço.",
      items: [
        "CRM completo com contatos, deals e atividades.",
        "Dashboards de tráfego, leads e vendas com Recharts/Chart.js.",
        "Funis que cruzam dados das vendas com o GA4.",
      ],
    },
    {
      title: "Integrações e Automação",
      description:
        "Rotinas orientadas por eventos alimentam follow-ups, alertas e atualizações para manter o funil vivo.",
      items: [
        "Triggers internos disparam com criação de lead ou mudança de estágio.",
        "Webhooks cal.com atualizam contatos e geram atividades.",
        "Cron jobs via Vercel/Railway/Render enviam lembretes e métricas diárias.",
        "Events próprios são enviados ao GA4 pelo Measurement Protocol.",
      ],
    },
  ],
  technologies: [
    "Next.js (frontend + API)",
    "PostgreSQL centralizado",
    "Prisma (ORM)",
    "Python (ingestão e automações)",
    "Google Analytics Data API (GA4)",
    "cal.com webhooks",
    "Recharts / Chart.js (visualização)",
    "Vercel Cron / Railway / Render (jobs)",
  ],
};

export { person, social, newsletter, home, about, blog, daily, work, gallery, admin, account };
