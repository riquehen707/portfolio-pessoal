import { About, Blog, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import { productsPage, services, servicesPage } from "./services";

const person: Person = {
  firstName: "Henrique",
  lastName: "Reis",
  name: "Henrique Reis",
  role: "Desenvolvedor & Estrategista de Negocios",
  avatar: "/images/avatar-henrique.jpg",
  email: "oi@henriquereis.dev",
  location: "America/Bahia",
  languages: ["Portugues"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Assine a newsletter de {person.firstName}</>,
  description: <>Notas semanais sobre produtos, dados e estrategia.</>,
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
  label: "Inicio",
  title: "Henrique Reis | Portfolio e Blog",
  description:
    "Portfolio de produto e dados com projetos, servicos e artigos praticos para crescer com clareza.",
  headline: <>Produto, dados e conteudo para negocios que querem crescer.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">
          {featuredService.badge} · {featuredService.hero.highlight}
        </strong>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Servico em destaque
        </Text>
      </Row>
    ),
    href: `${servicesPage.path}/${featuredService.slug}`,
  },
  subline: (
    <>
      Sou {person.firstName}, diretor de um estudio focado em produto, dados e crescimento. Este e
      meu portfolio e tambem meu blog de conteudo, com analises, frameworks e sistemas que ja estao
      em operacao.
      <br />
      Explore {servicesPage.label.toLowerCase()} e {productsPage.label.toLowerCase()} pensados para
      gerar visibilidade, conversao e resultado.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre",
  title: `Sobre • ${person.name}`,
  description: `Conheca ${person.name}, ${person.role}, com foco em produto, dados e conteudo estrategico.`,
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
    title: "Introducao",
    description: (
      <>
        {person.firstName} cria solucoes de negocios guiadas por dados, conectando desenvolvimento
        web, analise e estrategia. Foco em sistemas simples capazes de gerar resultados concretos:
        do cardapio digital com WhatsApp ao painel financeiro com previsoes e estrutura de custos.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experiencia",
    experiences: [
      {
        company: "Estudio de Desenvolvimento e Marketing",
        timeframe: "2023 – Presente",
        role: "Fundador • Dev & Estrategia",
        achievements: [
          <>
            Sistema financeiro web (Python + Streamlit) com previsoes, estrutura de custos, curva
            ABC e relatorios exportaveis.
          </>,
          <>
            Cardapio digital em Next.js com pedidos via WhatsApp, personalizacao de itens e calculo
            inteligente de entrega.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Estudos",
    institutions: [
      {
        name: "Autodidata (produto, dados e estrategia)",
        description: <>Anuncios (Meta), analise de dados, UX/SEO e gestao.</>,
      },
      {
        name: "Pesquisas atuais",
        description: (
          <>
            Arquitetura das redes sociais, vieses cognitivos, curva ABC e modelagem adaptativa de
            fluxo de caixa.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Habilidades tecnicas",
    skills: [
      {
        title: "Python & Streamlit",
        description: (
          <>Dashboards financeiros com previsoes, relatorios e analises (ABC, sazonalidade, cenarios).</>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "Streamlit", icon: "streamlit" },
          { name: "Pandas", icon: "pandas" },
        ],
        images: [],
      },
      {
        title: "Next.js",
        description: (
          <>Apps completos com Next.js + Once UI, integracao com WhatsApp e calculo de entrega.</>
        ),
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Vercel", icon: "vercel" },
        ],
        images: [],
      },
      {
        title: "Dados & Estrategia",
        description: <>KPIs, projecoes, estrutura de custos e decisoes guiadas por dados.</>,
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
  title: "Blog de Produto, Dados e Estrategia",
  description:
    "Artigos longos, frameworks e analises sobre produto, dados, SEO e crescimento sustentavel.",
};

const work: Work = {
  path: "/work",
  label: "Projetos",
  title: `Projetos • ${person.name}`,
  description:
    "Portfolio com projetos pessoais, estudos de caso e futuros cases de clientes em produto, SEO tecnico, interfaces e automacao.",
};

export { person, social, newsletter, home, about, blog, work };
