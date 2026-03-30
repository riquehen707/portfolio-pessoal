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
  headline: <>Sites e páginas para prestadores de serviço que precisam passar confiança antes mesmo do primeiro contato.</>,
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
      Sou {person.firstName}. Crio páginas, SEO técnico e automações para profissionais que querem
      parar de improvisar no digital e começar a ser entendidos com mais clareza.
      <br />
      Aqui você encontra projetos, serviços e textos que mostram meu jeito de pensar presença
      digital com clareza, critério e uma boa dose de humanidade.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre",
  title: `Sobre | ${person.name}`,
  description: `Como ${person.name} organiza páginas, SEO técnico e atendimento para ajudar prestadores de serviço a transmitir confiança e gerar contato com mais naturalidade.`,
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
        Desenvolvo experiências digitais para quem precisa ser entendido com rapidez, confiança e
        clareza. Trabalho principalmente com Next.js, Vue e SCSS, somando SEO técnico e automação
        quando isso realmente melhora a experiência e o resultado.
      </>
    ),
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
          <>
            Projetos em Next.js com foco em clareza, performance e uma navegação que não atrapalha a conversa.
          </>,
          <>
            Estudos de caso para blogs, e-commerce e páginas de captação, sempre pensando em como a mensagem chega e como a pessoa reage a ela.
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
        name: "Formação autodidata",
        description: <>SEO técnico, front-end, UX, conteúdo, dados e estratégia digital.</>,
      },
      {
        name: "Foco atual",
        description: (
          <>
            SEO para lojas e blogs, arquitetura de informação, performance, design modular e formas
            simples de organizar atendimento e operação.
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
        title: "Next.js e React",
        description: (
          <>Uso para criar sites e interfaces rápidas, fáceis de manter e boas de navegar.</>
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
          <>Entra bem quando o projeto pede fluxos mais vivos, painéis internos e componentes mais isolados.</>
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
        description: <>Organizo estilos em módulos para manter o visual consistente, limpo e fácil de evoluir.</>,
        tags: [
          { name: "SCSS", icon: "sass" },
          { name: "Responsive", icon: "grid" },
          { name: "UI systems", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "SEO técnico para lojas e blogs",
        description: <>Cuido da base técnica para o conteúdo e as páginas terem fôlego para crescer com consistência.</>,
        tags: [
          { name: "SEO", icon: "seo" },
          { name: "E-commerce", icon: "shopify" },
          { name: "Content", icon: "book" },
        ],
        images: [],
      },
      {
        title: "Automação e dados",
        description: <>Uso integrações e leitura de dados para reduzir improviso e dar mais previsibilidade à rotina.</>,
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
  title: "Projetos e estudos de caso",
  description:
    "Projetos e estudos de caso que mostram como penso clareza, performance e presença digital na prática.",
};

export { person, social, newsletter, home, about, technicalApproach, blog, work };
