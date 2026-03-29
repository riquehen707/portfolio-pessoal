import { About, Blog, Home, Newsletter, Person, Social, TechnicalPage, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import { productsPage, services, servicesPage } from "./services";

const person: Person = {
  firstName: "Henrique",
  lastName: "Reis",
  name: "Henrique Reis",
  role: "Desenvolvedor front-end, SEO tecnico e automacao",
  avatar: "/images/avatar-henrique.jpg",
  email: "oi@henriquereis.dev",
  location: "America/Bahia",
  languages: ["Portugues"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Assine a newsletter de {person.firstName}</>,
  description: <>Notas semanais sobre sites, SEO, produto e operacao digital.</>,
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
    "Portfólio com projetos, serviços e artigos sobre sites, SEO técnico, automação e presença digital para prestadores de serviço.",
  headline: <>Sites e páginas para prestadores de serviço que querem transformar presença digital em clientes.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">
          {featuredService.badge} | {featuredService.hero.highlight}
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
      Sou {person.firstName}. Estruturo páginas, SEO técnico e automações para profissionais que
      precisam sair do improviso, transmitir mais confiança e criar um caminho mais claro até o
      contato.
      <br />
      Aqui você encontra projetos, artigos e formatos de serviço pensados para gerar mais
      previsibilidade, profissionalismo e consistência na presença digital.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre",
  title: `Sobre | ${person.name}`,
  description: `Como ${person.name} organiza páginas, SEO técnico e atendimento para ajudar prestadores de serviço a gerar contato com mais clareza e profissionalismo.`,
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
        Desenvolvo experiencias digitais com foco em navegacao simples, performance e resultado.
        Trabalho principalmente com Next.js, Vue e SCSS, somando SEO tecnico e automacao para dar
        mais consistencia a sites, blogs e operacoes digitais.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experiencia",
    experiences: [
      {
        company: "Estudio independente",
        timeframe: "2023 - Presente",
        role: "Fundador | desenvolvimento e estrategia",
        achievements: [
          <>
            Projetos em Next.js com foco em performance, responsividade e estrutura preparada para SEO.
          </>,
          <>
            Estudos de caso para blogs, e-commerce e paginas de captacao, com foco em clareza,
            conteudo e conversao.
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
        name: "Formacao autodidata",
        description: <>SEO tecnico, front-end, UX, conteudo, dados e estrategia digital.</>,
      },
      {
        name: "Foco atual",
        description: (
          <>
            SEO para lojas e blogs, arquitetura de informacao, performance, design modular e fluxos
            de automacao.
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
        title: "Next.js e React",
        description: (
          <>Sites, blogs e interfaces com foco em performance, SEO tecnico e manutencao simples.</>
        ),
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "React", icon: "javascript" },
          { name: "Vercel", icon: "vercel" },
        ],
        images: [],
      },
      {
        title: "Vue e interfaces modulares",
        description: (
          <>Uso Vue quando o projeto pede componentes isolados, painis internos e fluxos mais dinamicos.</>
        ),
        tags: [
          { name: "Vue", icon: "vue" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Components", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "SCSS e design de interface",
        description: <>Estruturo estilos em modulos escalaveis, responsivos e pensados para clareza visual.</>,
        tags: [
          { name: "SCSS", icon: "sass" },
          { name: "Responsive", icon: "grid" },
          { name: "UI systems", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "SEO tecnico para lojas e blogs",
        description: <>Especialidade em indexacao, estrutura, performance e crescimento organico sustentavel.</>,
        tags: [
          { name: "SEO", icon: "seo" },
          { name: "E-commerce", icon: "shopify" },
          { name: "Content", icon: "book" },
        ],
        images: [],
      },
      {
        title: "Automacao e dados",
        description: <>Organizo fluxos, integracoes e leituras tecnicas para tirar operacoes do improviso.</>,
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
  label: "Abordagem tecnica",
  title: `Abordagem tecnica | ${person.name}`,
  description:
    "Visao tecnica sobre como estruturo front-end, SEO tecnico, performance, automacao e componentes reutilizaveis sem poluir a experiencia.",
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
  title: "Projetos e estudos de caso",
  description:
    "Portfolio com projetos pessoais e estudos de caso em front-end, SEO tecnico, interfaces e automacao.",
};

export { person, social, newsletter, home, about, technicalApproach, blog, work };
