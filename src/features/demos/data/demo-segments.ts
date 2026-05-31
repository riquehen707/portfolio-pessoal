export type DemoSegmentSlug =
  | "clinicas"
  | "advocacia"
  | "infoprodutores"
  | "restaurantes"
  | "imobiliarias"
  | "portfolios"
  | "landing-pages"
  | "negocios-locais"
  | "servicos-profissionais";

export type DemoSegment = {
  slug: DemoSegmentSlug;
  name: string;
  title: string;
  description: string;
  audience: string;
  siteTypes: string[];
  visualSignals: string[];
  importantCtas: string[];
  commonMistakes: string[];
  indexable: boolean;
};

export const demoSegments: DemoSegment[] = [
  {
    slug: "clinicas",
    name: "Clínicas",
    title: "Modelos para clínicas",
    description:
      "Páginas para explicar especialidades, reduzir dúvida e facilitar agendamento sem parecer catálogo genérico.",
    audience: "Clínicas, consultórios, profissionais de saúde e operações com agenda local.",
    siteTypes: ["Site institucional", "Landing page de especialidade", "Página de agendamento"],
    visualSignals: ["Confiança", "clareza", "espaço branco", "prova social", "contato rápido"],
    importantCtas: ["Agendar avaliação", "Chamar no WhatsApp", "Ver especialidades"],
    commonMistakes: [
      "Começar pelo visual antes de explicar a especialidade.",
      "Esconder localização, horários e formas de contato.",
      "Usar textos genéricos que não ajudam o paciente a decidir.",
    ],
    indexable: true,
  },
  {
    slug: "advocacia",
    name: "Advocacia",
    title: "Modelos para advocacia",
    description:
      "Estruturas sóbrias para apresentar áreas de atuação, critérios de contato e autoridade sem exagero comercial.",
    audience: "Advogados, escritórios pequenos e profissionais com atuação especializada.",
    siteTypes: ["Página institucional", "Página por área de atuação", "Página de captação qualificada"],
    visualSignals: ["Sobriedade", "hierarquia tipográfica", "autoridade", "discrição", "clareza"],
    importantCtas: ["Entender atendimento", "Enviar caso", "Falar com o escritório"],
    commonMistakes: [
      "Prometer resultado jurídico.",
      "Usar linguagem tão formal que ninguém entende o próximo passo.",
      "Misturar todas as áreas de atuação sem prioridade.",
    ],
    indexable: true,
  },
  {
    slug: "infoprodutores",
    name: "Infoprodutores",
    title: "Modelos para infoprodutores",
    description:
      "Páginas para explicar oferta, prova, transformação e entrega sem depender só de urgência ou promessa forte.",
    audience: "Criadores, educadores, consultores e vendedores de produtos digitais.",
    siteTypes: ["Landing page de produto", "Página de captura", "Página de lançamento"],
    visualSignals: ["Oferta clara", "prova", "ritmo visual", "benefícios concretos", "objeções"],
    importantCtas: ["Entrar na lista", "Ver conteúdo", "Comprar agora"],
    commonMistakes: [
      "Confundir persuasão com exagero.",
      "Falar do produto antes de explicar o problema.",
      "Usar bônus e escassez para compensar oferta fraca.",
    ],
    indexable: true,
  },
  {
    slug: "restaurantes",
    name: "Restaurantes",
    title: "Modelos para restaurantes",
    description:
      "Vitrines visuais para cardápio, localização, reservas e pedidos com menos atrito no mobile.",
    audience: "Restaurantes, cafés, bares e negócios de alimentação local.",
    siteTypes: ["Site vitrine", "Cardápio digital", "Página de reservas"],
    visualSignals: ["Fotos grandes", "ritmo quente", "horários", "mapa", "cardápio escaneável"],
    importantCtas: ["Ver cardápio", "Reservar mesa", "Como chegar"],
    commonMistakes: [
      "Colocar o cardápio em PDF pesado.",
      "Esconder horários e localização.",
      "Usar fotos bonitas que não mostram o que a pessoa vai pedir.",
    ],
    indexable: true,
  },
  {
    slug: "imobiliarias",
    name: "Imobiliárias",
    title: "Modelos para imobiliárias",
    description:
      "Estruturas para destacar imóveis, bairros, captação e contato rápido sem virar uma busca confusa.",
    audience: "Imobiliárias locais, corretores e operações de venda ou locação.",
    siteTypes: ["Vitrine de imóveis", "Página de bairro", "Landing page de captação"],
    visualSignals: ["Busca simples", "fotos amplas", "bairros", "filtros", "contato direto"],
    importantCtas: ["Ver imóveis", "Avaliar meu imóvel", "Falar com corretor"],
    commonMistakes: [
      "Mostrar imóveis sem contexto de bairro.",
      "Exigir muitos filtros antes de dar uma primeira resposta.",
      "Transformar a página em portal grande demais para manter.",
    ],
    indexable: true,
  },
  {
    slug: "portfolios",
    name: "Portfólios",
    title: "Modelos para portfólios",
    description:
      "Páginas para mostrar trabalho, raciocínio e recorte profissional sem depender de uma galeria solta.",
    audience: "Designers, desenvolvedores, consultores, criativos e especialistas independentes.",
    siteTypes: ["Portfólio pessoal", "Case page", "Página de autoridade"],
    visualSignals: ["Autoria", "projetos", "processo", "seleção", "voz própria"],
    importantCtas: ["Ver projetos", "Entrar em contato", "Ler bastidores"],
    commonMistakes: [
      "Mostrar imagem bonita sem explicar decisão.",
      "Listar ferramentas como se fossem posicionamento.",
      "Criar muitos projetos rasos em vez de poucos bons casos.",
    ],
    indexable: true,
  },
  {
    slug: "landing-pages",
    name: "Landing pages",
    title: "Modelos para landing pages",
    description:
      "Estruturas focadas em uma decisão: entender a oferta, confiar no caminho e realizar uma ação.",
    audience: "Produtos, serviços, eventos, lançamentos e campanhas específicas.",
    siteTypes: ["Página de campanha", "Página de oferta", "Página de captura"],
    visualSignals: ["Foco", "prova", "sequência", "CTA claro", "objeções"],
    importantCtas: ["Quero saber mais", "Entrar na lista", "Solicitar proposta"],
    commonMistakes: [
      "Colocar muitos objetivos na mesma página.",
      "Abrir com promessa antes de explicar valor.",
      "Repetir CTA sem remover dúvidas.",
    ],
    indexable: true,
  },
  {
    slug: "negocios-locais",
    name: "Negócios locais",
    title: "Modelos para negócios locais",
    description:
      "Páginas simples para quem precisa ser encontrado, explicar o que faz e receber contatos melhores.",
    audience: "Comércios, serviços de bairro, profissionais locais e operações pequenas.",
    siteTypes: ["Site local", "Página de serviço", "Página de WhatsApp"],
    visualSignals: ["Localização", "confiança", "serviços", "horários", "prova local"],
    importantCtas: ["Chamar no WhatsApp", "Ver serviços", "Como chegar"],
    commonMistakes: [
      "Usar uma página bonita que não responde perguntas básicas.",
      "Depender só do Instagram para explicar tudo.",
      "Não deixar claro preço inicial, região ou disponibilidade.",
    ],
    indexable: true,
  },
  {
    slug: "servicos-profissionais",
    name: "Serviços profissionais",
    title: "Modelos para serviços profissionais",
    description:
      "Páginas para explicar especialidade, processo e critérios de contratação sem parecer agência genérica.",
    audience: "Consultores, prestadores técnicos, escritórios e especialistas B2B.",
    siteTypes: ["Página de serviço", "Página de consultoria", "Página de diagnóstico"],
    visualSignals: ["Critério", "processo", "escopo", "prova", "clareza comercial"],
    importantCtas: ["Entender se faz sentido", "Solicitar diagnóstico", "Ver processo"],
    commonMistakes: [
      "Vender tudo para todo mundo.",
      "Falar de método antes de explicar o problema.",
      "Usar CTAs genéricos que não indicam o próximo passo.",
    ],
    indexable: true,
  },
];
