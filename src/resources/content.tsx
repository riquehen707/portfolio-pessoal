import { About, Blog, Home, Newsletter, Person, Social, TechnicalPage, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import { productsPage, services, servicesPage } from "./services";

const person: Person = {
  firstName: "Henrique",
  lastName: "Reis",
  name: "Henrique Reis",
  role: "Desenvolvedor front-end, SEO técnico e automação",
  avatar: "/images/avatar-henrique.jpg",
  email: "oi@henriquereis.dev",
  location: "America/Bahia",
  languages: ["Português"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Assine a newsletter de {person.firstName}</>,
  description: <>Notas semanais sobre sites, SEO, produto e operação digital.</>,
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
  title: "Henrique Reis | Portfólio, serviços e blog",
  description:
    "Portfólio com serviços, projetos e textos sobre presença digital para profissionais que vivem de confiança, atendimento e relacionamento.",
  headline: <>Foque no seu serviço enquanto eu estruturo sua operação digital.</>,
  featured: {
    display: false,
    title: (
      <Row gap="8" vertical="center">
        <Text marginLeft="4" onBackground="brand-medium">
          Destaque
        </Text>
        <Line background="brand-alpha-strong" vert height="20" />
        <strong className="ml-4">{featuredService.title}</strong>
      </Row>
    ),
    href: `${servicesPage.path}/${featuredService.slug}`,
  },
  subline: (
    <>
      Toda a estrutura digital do seu negócio em um só parceiro: software, presença online,
      automação e gestão orientada por dados.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre",
  title: `Sobre | ${person.name}`,
  description: `Sobre ${person.name}, com foco em sites, SEO técnico e automação.`,
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
    description: <>Sites, SEO técnico e automação para negócios que precisam de clareza.</>,
  },
  work: {
    display: true,
    title: "Experiência",
    experiences: [
      {
        company: "Estúdio independente",
        timeframe: "2023 - Presente",
        role: "Fundador | desenvolvimento e estratégia",
        achievements: [
          <>Projetos em Next.js, SEO e front-end para sites, páginas e operações menores.</>,
          <>Trabalho com estrutura, performance e contato.</>,
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
        name: "Formação autodidata",
        description: <>SEO técnico, front-end e produto digital.</>,
      },
      {
        name: "Foco atual",
        description: <>Negócios locais, estrutura de página e operação mais simples.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Habilidades técnicas",
    skills: [
      {
        title: "Next.js e React",
        description: <>Sites e interfaces rápidas.</>,
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "React", icon: "javascript" },
          { name: "Vercel", icon: "vercel" },
        ],
        images: [],
      },
      {
        title: "Vue e interfaces modulares",
        description: <>Painéis, fluxos e componentes isolados.</>,
        tags: [
          { name: "Vue", icon: "vue" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Components", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "SCSS e design de interface",
        description: <>SCSS modular e interface consistente.</>,
        tags: [
          { name: "SCSS", icon: "sass" },
          { name: "Responsive", icon: "grid" },
          { name: "UI systems", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "SEO técnico para lojas e blogs",
        description: <>Base técnica para busca, conteúdo e performance.</>,
        tags: [
          { name: "SEO", icon: "seo" },
          { name: "E-commerce", icon: "shopify" },
          { name: "Content", icon: "book" },
        ],
        images: [],
      },
      {
        title: "Automação e dados",
        description: <>Integrações e dados para reduzir retrabalho.</>,
        tags: [
          { name: "Python", icon: "python" },
          { name: "Analytics", icon: "chart" },
          { name: "Automation", icon: "rocket" },
        ],
        images: [],
      },
    ],
  },
};

const technicalApproach: TechnicalPage = {
  path: "/abordagem-tecnica",
  label: "Abordagem técnica",
  title: `Abordagem técnica | ${person.name}`,
  description:
    "Uma visão prática de como estruturo front-end, SEO, performance e automação sem perder clareza nem pesar a experiência.",
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Ensaios, tecnologia e interesses",
  description:
    "Um espaço editorial para ensaios, filosofia, cultura, tecnologia, SEO e outros temas que atravessam meu trabalho e meus interesses.",
};

const work: Work = {
  path: "/work",
  label: "Projetos",
  title: "Projetos",
  description: "Projetos, casos e aplicações em uso.",
};

export { person, social, newsletter, home, about, technicalApproach, blog, work };
