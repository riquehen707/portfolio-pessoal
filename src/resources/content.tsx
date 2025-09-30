import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Henrique",
  lastName: "Reis",
  name: `Henrique Reis`,
  role: "Desenvolvedor & Estrategista de Negócios",
  avatar: "/images/avatar-henrique.jpg", // ajuste o caminho da sua foto
  email: "oi@henriquereis.dev",
  location: "America/Bahia", // IANA timezone (Salvador/BA)
  languages: ["Português"],
};

const newsletter: Newsletter = {
  display: false, // mantenha desativado por enquanto
  title: <>Assine a newsletter de {person.firstName}</>,
  description: <>Notas semanais sobre produtos, dados e estratégia.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/riquehen707", // ajuste se necessário
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/riquehen", // opcional
  },
  {
    name: "WhatsApp",
    icon: "whatsapp", // garanta que exista em /once-ui/icons.ts
    link: "https://wa.me/5575983675164",
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Início",
  title: `Portfólio de ${person.name}`,
  description: `Projetos e estudos de ${person.role}.`,
  headline: <>Henrique Reis | Estúdio</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">E-commerce | Loja Kitsu</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Projeto em destaque
        </Text>
      </Row>
    ),
    href: "/work/loja-kitsune",
  },
  subline: (
    <>
      Meu nome é {person.firstName}, sou um estudante autônomo e desenvolvo soluções web práticas,
      unindo produto, dados e marketing para criar negócios sustentáveis.
      <br /> No tempo livre, transformo ideias em projetos mensuráveis.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre",
  title: `Sobre – ${person.name}`,
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
        {person.firstName} cria soluções de negócios baseadas em dados,
        unindo desenvolvimento web, análise e estratégia. Foco em sistemas
        simples que geram resultado: do cardápio digital com WhatsApp
        ao painel financeiro com previsões e estrutura de custos.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experiência",
    experiences: [
      {
        company: "Estúdio de Desenvolvimento e Marketing",
        timeframe: "2023 — Presente",
        role: "Fundador • Dev & Estratégia",
        achievements: [
          <>
            Sistema financeiro web (Python + Streamlit) com previsões,
            estrutura de custos, curva ABC e relatórios exportáveis.
          </>,
          <>
            Cardápio digital em Next.js com pedidos via WhatsApp,
            personalização de itens e cálculo inteligente de entrega.
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
        description: <>
          Arquitetura das redes sociais, vieses cognitivos, curva ABC e
          modelagem adaptativa de fluxo de caixa.
        </>,
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
        description: (
          <>KPIs, projeções, estrutura de custos e decisões orientadas por dados.</>
        ),
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
  // crie novos posts adicionando .mdx em app/blog/posts
};

const work: Work = {
  path: "/work",
  label: "Projetos",
  title: `Projetos – ${person.name}`,
  description: `Design, desenvolvimento e dados por ${person.name}.`,
  // crie novos projetos adicionando .mdx em app/work/posts
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galeria",
  title: `Galeria – ${person.name}`,
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

export { person, social, newsletter, home, about, blog, work, gallery };
