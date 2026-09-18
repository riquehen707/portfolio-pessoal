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
  publication?: "real-estate-editorial" | "photography-editorial" | "architecture-editorial" | "wellness-editorial" | "local-business-editorial" | "designer-editorial";
  journey?: {
    label: string;
    title: string;
    description: string;
  }[];
};

export const serviceInspirations: ServiceInspiration[] = [
  {
    slug: "portfolio-minimalista",
    title: "Portfólio para designers",
    category: "Design",
    image: "/images/services/inspirations/portfolio-minimalista.webp",
    alt: "Referência visual de um portfólio profissional claro, com tipografia ampla e projetos organizados em grade.",
    description:
      "Uma publicação demonstrativa para posicionar uma designer, selecionar projetos, explicar decisões em um case e facilitar o primeiro contato.",
    tags: ["Design", "Cases", "Portfólio"],
    featured: true,
    width: 1536,
    height: 1024,
    updatedAt: "2026-09-18",
    publication: "designer-editorial",
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
    journey: [
      { label: "01", title: "Curadoria", description: "Uma abertura curta apresenta a artista e define o recorte da obra." },
      { label: "02", title: "Exploração", description: "Séries e trabalhos aparecem em ritmos diferentes, sem uma grade rígida." },
      { label: "03", title: "Obra", description: "A página individual reúne imagem, técnica, contexto e disponibilidade." },
      { label: "04", title: "Contato", description: "Interesse em exposição, aquisição ou parceria encontra um caminho direto." },
    ],
  },
  {
    slug: "portfolio-fotografico",
    title: "Portfólio fotográfico",
    category: "Fotografia",
    image: "/images/services/inspirations/portfolio-fotografico.webp",
    alt: "Referência visual de um portfólio de fotografia com imagens grandes e navegação discreta.",
    description:
      "Uma publicação demonstrativa que mostra como apresentar repertório, organizar especialidades, aprofundar um ensaio e abrir caminho para o orçamento.",
    tags: ["Fotografia", "Portfólio", "Contato"],
    featured: true,
    width: 1536,
    height: 1024,
    updatedAt: "2026-09-17",
    publication: "photography-editorial",
  },
  {
    slug: "arquitetura-editorial",
    title: "Arquitetura editorial",
    category: "Arquitetura",
    image: "/images/services/inspirations/arquitetura-editorial.webp",
    alt: "Referência visual em formato vertical de um portfólio de arquitetura com contraste alto e tipografia expressiva.",
    description:
      "Uma publicação demonstrativa que mostra como posicionar um escritório, explorar projetos, explicar decisões e iniciar um briefing.",
    tags: ["Arquitetura", "Projetos", "Briefing"],
    featured: true,
    width: 1024,
    height: 1536,
    updatedAt: "2026-09-17",
    publication: "architecture-editorial",
  },
  {
    slug: "imoveis-em-destaque",
    title: "Imóveis em destaque",
    category: "Mercado imobiliário",
    image: "/images/services/inspirations/imoveis-em-destaque.webp",
    alt: "Referência visual de um site imobiliário com fotografia ampla, informações essenciais e chamada para contato.",
    description:
      "Uma publicação demonstrativa que percorre a descoberta, a comparação e o contato em um site imobiliário de linguagem editorial.",
    tags: ["Imóveis", "Jornada", "Contato"],
    featured: true,
    width: 1448,
    height: 1086,
    updatedAt: "2026-09-13",
    publication: "real-estate-editorial",
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
    journey: [
      { label: "01", title: "Identidade", description: "A primeira tela deixa linguagem, especialidade e autoria reconhecíveis." },
      { label: "02", title: "Séries", description: "Trabalhos podem ser agrupados por técnica, tema ou período." },
      { label: "03", title: "Processo", description: "Materiais e decisões ajudam a compreender como cada trabalho foi construído." },
      { label: "04", title: "Encomenda", description: "O contato explica disponibilidade e o que precisa ser combinado." },
    ],
  },
  {
    slug: "bem-estar-acolhedor",
    title: "Bem-estar acolhedor",
    category: "Saúde e bem-estar",
    image: "/images/services/inspirations/bem-estar-acolhedor.webp",
    alt: "Referência visual de um site de bem-estar com tons naturais, margens amplas e chamada discreta para contato.",
    description:
      "Uma publicação demonstrativa que explica o atendimento, apresenta a profissional, acolhe dúvidas e conduz ao primeiro contato.",
    tags: ["Acolhimento", "Confiança", "Contato"],
    width: 1448,
    height: 1086,
    updatedAt: "2026-09-17",
    publication: "wellness-editorial",
  },
  {
    slug: "negocio-local-vibrante",
    title: "Negócio local vibrante",
    category: "Negócio local",
    image: "/images/services/inspirations/negocio-local-vibrante.webp",
    alt: "Referência visual de um site para negócio local com cores intensas, fotografia e acesso rápido ao agendamento.",
    description:
      "Uma publicação demonstrativa que apresenta atmosfera, serviços e preços, simula o agendamento e facilita a visita.",
    tags: ["Negócio local", "Serviços", "Agendamento"],
    width: 1536,
    height: 1024,
    updatedAt: "2026-09-17",
    publication: "local-business-editorial",
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
    journey: [
      { label: "01", title: "Atmosfera", description: "Fotografia e texto apresentam a proposta antes do cardápio." },
      { label: "02", title: "Escolha", description: "Pratos, ingredientes e restrições aparecem com leitura simples." },
      { label: "03", title: "Origem", description: "Equipe, produtores e modo de preparo dão contexto à experiência." },
      { label: "04", title: "Reserva", description: "Horários, endereço e contato reduzem dúvidas antes da visita." },
    ],
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
    journey: [
      { label: "01", title: "Problema", description: "A abertura ajuda o visitante a reconhecer quando a consultoria faz sentido." },
      { label: "02", title: "Método", description: "Etapas e limites tornam a forma de trabalho compreensível." },
      { label: "03", title: "Aplicação", description: "Cenários demonstrativos mostram o tipo de decisão que pode ser apoiada." },
      { label: "04", title: "Conversa", description: "O contato recolhe contexto suficiente para avaliar o próximo passo." },
    ],
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
    journey: [
      { label: "01", title: "Conceito", description: "A coleção começa por uma ideia visual clara, não por uma grade de produtos." },
      { label: "02", title: "Lookbook", description: "Silhuetas e combinações aparecem em uma sequência editorial." },
      { label: "03", title: "Detalhe", description: "Materiais, acabamento e medidas aproximam a peça de quem avalia." },
      { label: "04", title: "Contato", description: "Lojas, imprensa e clientes encontram canais adequados à intenção." },
    ],
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
    journey: [
      { label: "01", title: "Contexto", description: "A primeira tela explica para quem o produto existe e qual tarefa resolve." },
      { label: "02", title: "Funcionamento", description: "Uma demonstração curta torna o fluxo menos abstrato." },
      { label: "03", title: "Confiança", description: "Limites, segurança e suporte aparecem antes da decisão." },
      { label: "04", title: "Próximo passo", description: "Teste, conversa ou contratação recebem ações diferentes e explícitas." },
    ],
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
