export type ServiceInspiration = {
  slug: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
  tags?: string[];
  featured?: boolean;
  width: number;
  height: number;
  updatedAt: string;
};

export const serviceInspirations: ServiceInspiration[] = [
  {
    slug: "portfolio-minimalista",
    title: "Portfólio minimalista",
    category: "Profissional",
    image: "/images/services/inspirations/portfolio-minimalista.webp",
    alt: "Referência visual de um portfólio profissional claro, com tipografia ampla e projetos organizados em grade.",
    description:
      "Uma direção limpa e objetiva, com bastante espaço em branco, títulos fortes e projetos apresentados com contexto.",
    tags: ["Minimalista", "Portfólio", "Claro"],
    featured: true,
    width: 1536,
    height: 1024,
    updatedAt: "2026-09-12",
  },
  {
    slug: "galeria-autoral",
    title: "Galeria autoral",
    category: "Arte e cultura",
    image: "/images/services/inspirations/galeria-autoral.webp",
    alt: "Referência visual de uma galeria virtual com obras coloridas em destaque sobre uma interface clara.",
    description:
      "Uma possibilidade para reunir trabalhos visuais com poucos elementos ao redor e deixar cor, textura e autoria conduzirem a página.",
    tags: ["Galeria", "Editorial", "Cores"],
    featured: true,
    width: 1024,
    height: 1536,
    updatedAt: "2026-09-12",
  },
  {
    slug: "portfolio-fotografico",
    title: "Portfólio fotográfico",
    category: "Fotografia",
    image: "/images/services/inspirations/portfolio-fotografico.webp",
    alt: "Referência visual de um portfólio de fotografia com imagens grandes e navegação discreta.",
    description:
      "Uma composição sóbria em que as fotografias ocupam o primeiro plano e a navegação ajuda a explorar diferentes tipos de trabalho.",
    tags: ["Fotografia", "Imagens grandes", "Sóbrio"],
    featured: true,
    width: 1536,
    height: 1024,
    updatedAt: "2026-09-12",
  },
  {
    slug: "arquitetura-editorial",
    title: "Arquitetura editorial",
    category: "Arquitetura",
    image: "/images/services/inspirations/arquitetura-editorial.webp",
    alt: "Referência visual em formato vertical de um portfólio de arquitetura com contraste alto e tipografia expressiva.",
    description:
      "Uma direção de alto contraste, com tipografia marcante e imagens de projeto tratadas como parte central da identidade.",
    tags: ["Editorial", "Alto contraste", "Mobile"],
    featured: true,
    width: 1024,
    height: 1536,
    updatedAt: "2026-09-12",
  },
  {
    slug: "imoveis-em-destaque",
    title: "Imóveis em destaque",
    category: "Mercado imobiliário",
    image: "/images/services/inspirations/imoveis-em-destaque.webp",
    alt: "Referência visual de um site imobiliário com fotografia ampla, informações essenciais e chamada para contato.",
    description:
      "Uma possibilidade para apresentar poucos imóveis com destaque, combinar imagem e informação e facilitar uma conversa sobre cada oportunidade.",
    tags: ["Imóveis", "Contato", "Fotografia"],
    featured: true,
    width: 1448,
    height: 1086,
    updatedAt: "2026-09-12",
  },
  {
    slug: "trabalho-autoral",
    title: "Trabalho autoral",
    category: "Portfólio",
    image: "/images/services/inspirations/trabalho-autoral.webp",
    alt: "Referência visual de um portfólio autoral com título expressivo, filtros e imagens de trabalhos.",
    description:
      "Uma direção direta para organizar trabalhos por estilo, manter a personalidade visual e deixar o pedido de orçamento fácil de encontrar.",
    tags: ["Autoral", "Portfólio", "Tipografia"],
    featured: true,
    width: 1122,
    height: 1402,
    updatedAt: "2026-09-12",
  },
  {
    slug: "bem-estar-acolhedor",
    title: "Bem-estar acolhedor",
    category: "Saúde e bem-estar",
    image: "/images/services/inspirations/bem-estar-acolhedor.webp",
    alt: "Referência visual de um site de bem-estar com tons naturais, margens amplas e chamada discreta para contato.",
    description:
      "Uma direção serena, com tons naturais, leitura espaçada e uma hierarquia que apresenta o atendimento antes de convidar ao contato.",
    tags: ["Acolhedor", "Natural", "Editorial"],
    width: 1448,
    height: 1086,
    updatedAt: "2026-09-12",
  },
  {
    slug: "negocio-local-vibrante",
    title: "Negócio local vibrante",
    category: "Negócio local",
    image: "/images/services/inspirations/negocio-local-vibrante.webp",
    alt: "Referência visual de um site para negócio local com cores intensas, fotografia e acesso rápido ao agendamento.",
    description:
      "Uma possibilidade mais intensa, com cor, fotografia e ações objetivas para apresentar serviços e levar ao agendamento.",
    tags: ["Vibrante", "Negócio local", "Agendamento"],
    width: 1536,
    height: 1024,
    updatedAt: "2026-09-12",
  },
  {
    slug: "gastronomia-contemporanea",
    title: "Gastronomia contemporânea",
    category: "Alimentação",
    image: "/images/services/inspirations/gastronomia-contemporanea.webp",
    alt: "Referência visual para gastronomia com fotografia de ingredientes, cores profundas e composição editorial.",
    description:
      "Uma direção quente e tátil, com fotografias que valorizam ingredientes, preparo e atmosfera sem transformar a página em um cardápio genérico.",
    tags: ["Gastronomia", "Fotografia", "Editorial"],
    width: 1024,
    height: 1536,
    updatedAt: "2026-09-12",
  },
  {
    slug: "consultoria-editorial",
    title: "Consultoria editorial",
    category: "Serviços profissionais",
    image: "/images/services/inspirations/consultoria-editorial.webp",
    alt: "Referência visual para consultoria com tons azul-marinho, diagramas abstratos e amplo espaço em branco.",
    description:
      "Uma possibilidade sóbria para organizar método, áreas de atuação e conteúdo com clareza, sem recorrer à aparência corporativa genérica.",
    tags: ["Consultoria", "Sóbrio", "Conteúdo"],
    width: 1536,
    height: 1024,
    updatedAt: "2026-09-12",
  },
  {
    slug: "moda-independente",
    title: "Moda independente",
    category: "Moda e criação",
    image: "/images/services/inspirations/moda-independente.webp",
    alt: "Referência visual de um lookbook independente com formas escultóricas, tecidos e cores intensas.",
    description:
      "Uma direção expressiva para apresentar coleção, processo e identidade por meio de imagens amplas e ritmo de revista.",
    tags: ["Lookbook", "Autoral", "Contraste"],
    width: 1122,
    height: 1402,
    updatedAt: "2026-09-12",
  },
  {
    slug: "tecnologia-humana",
    title: "Tecnologia humana",
    category: "Tecnologia",
    image: "/images/services/inspirations/tecnologia-humana.webp",
    alt: "Referência visual para tecnologia com formas translúcidas, cores vivas e organização amigável.",
    description:
      "Uma possibilidade clara e próxima para explicar um produto digital ou serviço técnico sem cair na estética fria de dashboards.",
    tags: ["Tecnologia", "Acessível", "Colorido"],
    width: 1448,
    height: 1086,
    updatedAt: "2026-09-12",
  },
];

const slugs = serviceInspirations.map((inspiration) => inspiration.slug);

if (new Set(slugs).size !== slugs.length) {
  throw new Error("Inspirações de serviço com slug duplicado.");
}

export function getServiceInspiration(slug: string) {
  return serviceInspirations.find((inspiration) => inspiration.slug === slug);
}

export function getServiceInspirationPath(slug: string) {
  return `/servicos/inspiracoes/${slug}`;
}

export function getServiceInspirationStaticParams() {
  return serviceInspirations.map((inspiration) => ({ slug: inspiration.slug }));
}

export function getFeaturedServiceInspirations(limit = 6) {
  return serviceInspirations
    .filter((inspiration) => inspiration.featured)
    .slice(0, Math.max(0, limit));
}
