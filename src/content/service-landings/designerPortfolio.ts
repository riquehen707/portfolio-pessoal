import { serviceLandingSchema } from "./serviceLandingSchema";

export const designerPortfolio = serviceLandingSchema.parse({
  id: "portfolio-designers",
  slug: "portfolio-para-designers",
  status: "published",
  structure: "compact",
  updatedAt: "2026-09-06",
  seo: {
    title: "Portfólio profissional para designers | R$297",
    description:
      "Apresente projetos e cases em um portfólio profissional, com currículo, contato rápido e layout para celular. R$297 de implantação + R$79/mês.",
    index: true,
  },
  provider: {
    name: "Henrique Reis",
    description: "Criação e implementação do seu portfólio profissional.",
  },
  conversion: {
    kind: "whatsapp",
    label: "Quero meu portfólio",
    href: "https://wa.me/5575983675164?text=Ol%C3%A1%2C%20Henrique!%20Quero%20um%20or%C3%A7amento%20para%20o%20portf%C3%B3lio%20profissional%20para%20designers%20(R%24297%20de%20implanta%C3%A7%C3%A3o%20%2B%20R%2479%2Fm%C3%AAs).",
  },
  hero: {
    eyebrow: "Portfólio para designers",
    title: "Apresente projetos e cases em um portfólio profissional.",
    description:
      "Reúna seus melhores trabalhos, explique decisões de design e compartilhe um único link com clientes ou processos seletivos.",
    benefit: "Um portfólio para mostrar como você pensa e o que sabe entregar.",
    audience:
      "Para designers gráficos, UI/UX designers, web designers e freelancers que precisam apresentar projetos com clareza.",
    price: "R$297 de implantação + R$79/mês",
    layout: "split",
  },
  sections: [
    {
      type: "problem",
      id: "problema",
      title: "Projetos espalhados dificultam entender seu trabalho.",
      paragraphs: [
        "Quando cada projeto está em um post, PDF, pasta ou plataforma diferente, clientes e recrutadores precisam montar sozinhos uma imagem da sua experiência.",
        "Mostrar apenas telas ou peças finais também esconde informações decisivas: qual era o problema, qual foi sua responsabilidade e por que você escolheu aquela solução.",
      ],
    },
    {
      type: "demonstration",
      id: "demonstracao",
      title: "Um exemplo de portfólio organizado por projetos e cases.",
      illustrative: true,
      description:
        "A demonstração usa projetos inteiramente fictícios para mostrar a composição da página. Seu portfólio será montado com trabalhos, decisões e resultados reais autorizados por você.",
    },
    {
      type: "benefits",
      id: "beneficios",
      title: "Cada projeto ganha uma função na sua apresentação.",
      items: [
        {
          title: "Seleção com foco",
          description:
            "Os trabalhos mais relevantes aparecem primeiro, conforme o tipo de cliente ou vaga que você procura.",
        },
        {
          title: "Cases com raciocínio",
          description:
            "Contexto, papel, restrições e decisões ajudam a explicar o processo por trás da entrega final.",
        },
        {
          title: "Identidade profissional",
          description:
            "Apresentação, currículo e formas de atuação ficam coerentes com o conjunto dos projetos.",
        },
        {
          title: "Um link para diferentes conversas",
          description:
            "Compartilhe o portfólio em propostas, candidaturas, mensagens e perfis profissionais.",
        },
      ],
    },
    {
      type: "solution",
      id: "estrutura",
      title: "A estrutura mostra o projeto e também o processo.",
      paragraphs: [
        "A página inicial apresenta uma seleção curta. Os cases podem detalhar contexto, objetivo, sua função, restrições, alternativas consideradas, decisões, solução e resultados que possam ser comprovados.",
        "Projetos menores continuam úteis como trabalhos visuais. A diferença é deixar claro quando há documentação suficiente para um case e quando a entrega deve ser apresentada de forma mais direta.",
      ],
    },
    {
      type: "deliverables",
      id: "incluido",
      title: "O que está incluído.",
      items: [
        {
          title: "Página inicial de projetos",
          description: "Seleção dos melhores trabalhos com hierarquia e acesso rápido aos detalhes.",
        },
        {
          title: "Apresentação de cases",
          description:
            "Estrutura para explicar problema, papel, processo, decisões e resultado quando houver material real.",
        },
        {
          title: "Perfil e identidade profissional",
          description: "Texto de apresentação, especialidades e forma de atuação reunidos no mesmo endereço.",
        },
        {
          title: "Currículo e informações profissionais",
          description: "Experiências, formação, ferramentas e link para currículo conforme o escopo combinado.",
        },
        {
          title: "Contato rápido",
          description: "WhatsApp e demais contatos definidos para clientes, recrutadores ou parcerias.",
        },
        {
          title: "SEO, analytics e celular",
          description:
            "Metadados, eventos de clique e apresentação responsiva configurados no lançamento.",
        },
      ],
    },
    {
      type: "process",
      id: "processo",
      title: "Do material ao link em três etapas.",
      items: [
        {
          title: "1. Definimos o foco",
          description:
            "Você conta que tipo de projeto quer apresentar e para quais clientes, vagas ou oportunidades o portfólio será usado.",
        },
        {
          title: "2. Você envia os projetos",
          description:
            "Recebo imagens autorizadas, contexto dos cases, currículo, apresentação e informações de contato.",
        },
        {
          title: "3. Você revisa e compartilha",
          description:
            "Eu organizo a página, você confere textos e projetos, e a versão aprovada ganha um endereço para propostas e candidaturas.",
        },
      ],
    },
    {
      type: "pricing",
      id: "investimento",
      title: "Investimento inicial e mensalidade.",
      description: "Oferta inicial para o portfólio profissional para designers.",
      items: [
        {
          label: "Implantação",
          amount: "R$297",
          cadence: "once",
          details: "Criação e configuração inicial do portfólio conforme o escopo combinado.",
        },
        {
          label: "Mensalidade",
          amount: "R$79/mês",
          cadence: "monthly",
          details: "Cobrança recorrente, além do valor de implantação.",
        },
      ],
      terms:
        "A proposta registra quantidade de projetos e cases, profundidade de cada case, revisões, atualizações, prazo e responsabilidades por domínio, hospedagem e manutenção. Condições da mensalidade e do cancelamento também ficam explícitas. Nenhum pagamento é feito nesta página.",
    },
    {
      type: "faq",
      id: "duvidas",
      title: "Dúvidas antes do orçamento.",
      items: [
        {
          question: "Quantos projetos entram no portfólio?",
          answer:
            "A quantidade e a profundidade dos cases são definidas na proposta depois de avaliar seu material e o objetivo da página.",
        },
        {
          question: "Preciso ter cases completos?",
          answer:
            "Não. Projetos podem ser apresentados de forma direta quando não há documentação suficiente. O importante é não inventar processo, responsabilidade ou resultado.",
        },
        {
          question: "Posso incluir projetos confidenciais?",
          answer:
            "Somente trabalhos que você possa divulgar. Materiais sob confidencialidade devem ser omitidos ou adaptados com autorização expressa do responsável.",
        },
        {
          question: "Posso atualizar o portfólio depois?",
          answer:
            "Sim. Frequência, quantidade e processo das atualizações ficam definidos na proposta antes da contratação.",
        },
        {
          question: "O que os R$79 mensais cobrem?",
          answer:
            "Hospedagem, manutenção, atualizações e condições de cancelamento serão detalhadas na proposta. A mensalidade é separada da implantação de R$297.",
        },
      ],
    },
  ],
  finalCTA: {
    title: "Quer apresentar seus projetos com mais contexto?",
    description:
      "Conte que tipo de trabalho você quer destacar e peça um orçamento pelo WhatsApp. R$297 de implantação + R$79/mês.",
  },
  stickyCTA: true,
});
