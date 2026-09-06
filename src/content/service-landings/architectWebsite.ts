import { serviceLandingSchema } from "./serviceLandingSchema";

export const architectWebsite = serviceLandingSchema.parse({
  id: "site-arquitetos",
  slug: "site-para-arquitetos",
  status: "published",
  structure: "compact",
  updatedAt: "2026-09-06",
  seo: {
    title: "Site e portfólio para arquitetos | R$497 + R$99/mês",
    description:
      "Apresente projetos, serviços e perfil profissional em um site para arquitetos, com imagens grandes e contato pelo WhatsApp. R$497 + R$99/mês.",
    index: true,
  },
  provider: {
    name: "Henrique Reis",
    description: "Criação e implementação do seu site e portfólio profissional.",
  },
  conversion: {
    kind: "whatsapp",
    label: "Quero meu portfólio",
    href: "https://wa.me/5575983675164?text=Ol%C3%A1%2C%20Henrique!%20Quero%20um%20or%C3%A7amento%20para%20o%20site%20e%20portf%C3%B3lio%20profissional%20para%20arquitetos%20(R%24497%20de%20implanta%C3%A7%C3%A3o%20%2B%20R%2499%2Fm%C3%AAs).",
  },
  hero: {
    eyebrow: "Site e portfólio para arquitetos",
    title: "Apresente seus projetos antes da primeira conversa.",
    description:
      "Reúna projetos, serviços e perfil profissional em um endereço próprio e facilite pedidos de orçamento vindos de indicações, buscas ou redes sociais.",
    benefit: "Um link para mostrar o que você projeta e como atende.",
    audience: "Para arquitetos autônomos e pequenos escritórios de arquitetura.",
    price: "R$497 de implantação + R$99/mês",
    layout: "split",
  },
  sections: [
    {
      type: "problem",
      id: "problema",
      title: "Uma indicação perde força quando os projetos estão espalhados.",
      paragraphs: [
        "Quem recebe seu nome costuma procurar exemplos antes de entrar em contato. Se cada projeto está em um post, PDF ou pasta diferente, a pessoa precisa descobrir sozinha que tipo de trabalho você realiza.",
        "Sem descrições, serviços e informações de atendimento no mesmo lugar, imagens isoladas mostram estética, mas não explicam escopo, participação ou caminho para pedir orçamento.",
      ],
    },
    {
      type: "demonstration",
      id: "projetos",
      title: "Projetos demonstrativos com imagens e informações essenciais.",
      illustrative: true,
      description:
        "A demonstração usa fotografias de banco e dados genéricos para mostrar a composição. Seu portfólio será montado somente com projetos, imagens e informações autorizados por você.",
    },
    {
      type: "benefits",
      id: "beneficios",
      title: "Cada visita encontra uma apresentação pronta para consulta.",
      items: [
        {
          title: "Projetos organizados",
          description:
            "Residencial, interiores, comercial e outras áreas podem ser separadas conforme sua atuação real.",
        },
        {
          title: "Imagens em escala adequada",
          description:
            "Fotografias, renders, plantas e detalhes ganham espaço para serem vistos também no celular.",
        },
        {
          title: "Descrição de cada projeto",
          description:
            "Contexto, programa, solução, materiais, etapa e sua participação acompanham as imagens quando houver informação disponível.",
        },
        {
          title: "Serviços e perfil profissional",
          description:
            "O visitante entende o que você oferece, onde atende e quem está por trás dos projetos.",
        },
        {
          title: "Contato próximo dos projetos",
          description:
            "Chamadas para o WhatsApp ajudam a iniciar um pedido de orçamento com o trabalho ainda em contexto.",
        },
      ],
    },
    {
      type: "deliverables",
      id: "incluido",
      title: "O que está incluído.",
      items: [
        {
          title: "Página inicial profissional",
          description: "Apresentação direta do escritório ou profissional, serviços e projetos em destaque.",
        },
        {
          title: "Galeria de projetos",
          description: "Projetos organizados por categorias definidas conforme seu acervo.",
        },
        {
          title: "Página para cada projeto",
          description:
            "Espaço para imagens grandes, ficha técnica, descrição e participação, dentro do escopo contratado.",
        },
        {
          title: "Serviços oferecidos",
          description: "Descrição clara das frentes de atuação e do tipo de demanda atendida.",
        },
        {
          title: "Perfil e contato",
          description: "Apresentação profissional, região de atendimento e acesso ao WhatsApp.",
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
      title: "Do acervo ao site em três etapas.",
      items: [
        {
          title: "1. Definimos foco e escopo",
          description:
            "Você apresenta seus serviços, tipos de projeto, público e objetivo. A proposta registra o que será organizado.",
        },
        {
          title: "2. Você envia o material",
          description:
            "Recebo imagens autorizadas, descrições, ficha técnica, perfil profissional e informações de contato.",
        },
        {
          title: "3. Você revisa e divulga",
          description:
            "Eu monto o site, você confere conteúdo e sequência, e a versão aprovada ganha um endereço para compartilhar.",
        },
      ],
    },
    {
      type: "pricing",
      id: "investimento",
      title: "Investimento inicial e mensalidade.",
      description: "Oferta inicial para o site e portfólio profissional para arquitetos.",
      items: [
        {
          label: "Implantação",
          amount: "R$497",
          cadence: "once",
          details: "Criação e configuração inicial do site conforme o escopo combinado.",
        },
        {
          label: "Mensalidade",
          amount: "R$99/mês",
          cadence: "monthly",
          details: "Cobrança recorrente, além do valor de implantação.",
        },
      ],
      terms:
        "A proposta registra quantidade de projetos e páginas, revisões, atualizações, prazo e responsabilidades por domínio, hospedagem e manutenção. Condições da mensalidade e do cancelamento também ficam explícitas. Nenhum pagamento é feito nesta página.",
    },
    {
      type: "faq",
      id: "duvidas",
      title: "Dúvidas antes do orçamento.",
      items: [
        {
          question: "Quantos projetos entram no site?",
          answer:
            "A quantidade inicial e a profundidade de cada página são definidas na proposta depois de avaliar seu acervo e objetivo.",
        },
        {
          question: "Posso usar renders e plantas?",
          answer:
            "Sim, desde que você tenha autorização para publicar. Cada material deve ser identificado corretamente para não confundir render, desenho e fotografia da obra construída.",
        },
        {
          question: "Preciso ter todos os projetos fotografados?",
          answer:
            "Não. Podemos avaliar quais projetos têm material suficiente e combinar fotografias, desenhos e renders sem esconder a natureza de cada imagem.",
        },
        {
          question: "Posso atualizar os projetos depois?",
          answer:
            "Sim. Frequência, quantidade e processo das atualizações ficam definidos na proposta antes da contratação.",
        },
        {
          question: "O que os R$99 mensais cobrem?",
          answer:
            "Hospedagem, manutenção, atualizações e condições de cancelamento serão detalhadas na proposta. A mensalidade é separada da implantação de R$497.",
        },
      ],
    },
  ],
  finalCTA: {
    title: "Quer apresentar seus projetos em um endereço profissional?",
    description:
      "Conte que tipo de arquitetura você desenvolve e peça um orçamento pelo WhatsApp. R$497 de implantação + R$99/mês.",
  },
  stickyCTA: true,
});
