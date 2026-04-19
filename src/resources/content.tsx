import {
  About,
  BasePageConfig,
  Blog,
  Home,
  Newsletter,
  Person,
  Social,
  TechnicalPage,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

import { brandIdentity, brandMessaging } from "./brand";
import { contentStrategy } from "./content-strategy";
import { services, servicesPage } from "./services";

const person: Person = {
  firstName: "Henrique",
  lastName: "Reis",
  name: "Henrique Reis",
  role: brandMessaging.role,
  avatar: "/images/avatar-henrique.jpg",
  email: "oi@henriquereis.dev",
  location: "America/Bahia",
  languages: ["Português"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Assine a newsletter de {person.firstName}</>,
  description: <>Notas sobre clareza digital, posicionamento, sistemas e execução.</>,
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
const homeStrategy = contentStrategy.pages.home;
const aboutStrategy = contentStrategy.pages.about;
const blogStrategy = contentStrategy.pages.blog;
const workStrategy = contentStrategy.pages.work;
const contactStrategy = contentStrategy.pages.contact;

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Início",
  title: `${brandIdentity.name} | ${homeStrategy.seo.focus}`,
  description: homeStrategy.hero.subheadline,
  headline: <>{homeStrategy.hero.headline}</>,
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
  subline: <>{homeStrategy.hero.subheadline}</>,
};

const about: About = {
  path: "/about",
  label: "Sobre",
  title: `Sobre | ${person.name}`,
  description: aboutStrategy.hero.subheadline,
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
    description: <>Estratégia antes da execução. Crescimento exige estrutura.</>,
  },
  work: {
    display: true,
    title: "Experiência",
    experiences: [
      {
        company: "Estúdio independente",
        timeframe: "2023 - Presente",
        role: "Fundador | estratégia, design e desenvolvimento",
        achievements: [
          <>Projetos para estruturar presença digital, operação e percepção de valor.</>,
          <>Entrega conectando estética, lógica de negócio e execução técnica no mesmo sistema.</>,
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
        description: <>Estratégia digital, front-end, SEO técnico, produto e direção visual.</>,
      },
      {
        name: "Foco atual",
        description: (
          <>Negócios locais, sistemas enxutos e marcas que precisam crescer com precisão.</>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Habilidades técnicas",
    skills: [
      {
        title: "Next.js e React",
        description: <>Sites, interfaces e produtos com acabamento técnico forte.</>,
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "React", icon: "javascript" },
          { name: "Vercel", icon: "vercel" },
        ],
        images: [],
      },
      {
        title: "Vue e interfaces modulares",
        description: <>Painéis, fluxos e sistemas com estrutura clara.</>,
        tags: [
          { name: "Vue", icon: "vue" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Components", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Design systems e interface",
        description: <>SCSS modular, hierarquia forte e direção visual consistente.</>,
        tags: [
          { name: "SCSS", icon: "sass" },
          { name: "Responsive", icon: "grid" },
          { name: "UI systems", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "SEO técnico e arquitetura de presença",
        description: <>Base técnica para busca, conteúdo, indexação e conversão.</>,
        tags: [
          { name: "SEO", icon: "seo" },
          { name: "E-commerce", icon: "shopify" },
          { name: "Content", icon: "book" },
        ],
        images: [],
      },
      {
        title: "Automação e dados",
        description: <>Integrações, processos e sinais para reduzir ruído operacional.</>,
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
    "Uma visão prática de como estruturo design, tecnologia e operações com clareza, precisão e função.",
};

const blog: Blog = {
  path: "/blog",
  label: "Insights",
  title: `Insights | ${person.name}`,
  description: blogStrategy.hero.subheadline,
};

const work: Work = {
  path: "/work",
  label: "Projetos",
  title: `Projetos | ${person.name}`,
  description: workStrategy.hero.subheadline,
};

const contact: BasePageConfig = {
  path: "/contact",
  label: "Contato",
  title: `Contato | ${person.name}`,
  description: contactStrategy.hero.subheadline,
};

export { person, social, newsletter, home, about, technicalApproach, blog, work, contact };
