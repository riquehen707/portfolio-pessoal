import { serviceLandingSchema } from "./serviceLandingSchema";

export const artistGallery = serviceLandingSchema.parse({
  id: "galeria-virtual-artistas",
  slug: "galeria-virtual-para-artistas",
  status: "published",
  structure: "compact",
  updatedAt: "2026-09-06",
  seo: {
    title: "Galeria virtual para artistas | R$397 + R$89/mês",
    description:
      "Organize suas obras em uma galeria virtual própria, apresente seu percurso e facilite contatos ou encomendas. R$397 de implantação + R$89/mês.",
    index: true,
  },
  provider: {
    name: "Henrique Reis",
    description: "Criação e implementação da sua galeria virtual.",
  },
  conversion: {
    kind: "whatsapp",
    label: "Quero minha galeria",
    href: "https://wa.me/5575983675164?text=Ol%C3%A1%2C%20Henrique!%20Quero%20um%20or%C3%A7amento%20para%20a%20galeria%20virtual%20para%20artistas%20(R%24397%20de%20implanta%C3%A7%C3%A3o%20%2B%20R%2489%2Fm%C3%AAs).",
  },
  hero: {
    eyebrow: "Galeria virtual para artistas",
    title: "Suas obras em uma galeria própria.",
    description:
      "Organize coleções, apresente seu percurso e facilite contatos por encomendas ou oportunidades profissionais em um endereço fora do feed.",
    benefit: "Um link para mostrar o conjunto da sua produção com contexto.",
    audience:
      "Para artistas visuais, ilustradores, pintores e escultores que querem apresentar suas obras profissionalmente fora das redes sociais.",
    price: "R$397 de implantação + R$89/mês",
    layout: "split",
  },
  sections: [
    {
      type: "problem",
      id: "problema",
      title: "O feed mostra o que é recente, não o conjunto da sua obra.",
      paragraphs: [
        "No Instagram, trabalhos de séries diferentes aparecem misturados com processos, avisos e publicações pessoais. Quem chega depois precisa percorrer o perfil para entender o que você produz.",
        "A rede continua útil para divulgar novidades, mas oferece pouco controle sobre a ordem, o contexto e as informações que acompanham cada obra.",
      ],
    },
    {
      type: "demonstration",
      id: "galeria",
      title: "Uma galeria que deixa as obras conduzirem a visita.",
      illustrative: true,
      description:
        "Esta demonstração usa fotografias de banco e informações genéricas para mostrar a estrutura. A sua galeria será montada com obras e dados enviados e autorizados por você.",
    },
    {
      type: "benefits",
      id: "beneficios",
      title: "O visitante encontra o trabalho e o contexto no mesmo lugar.",
      items: [
        {
          title: "Seleção com sequência",
          description:
            "Você define quais obras abrem cada coleção e em que ordem elas devem ser vistas.",
        },
        {
          title: "Informações junto da imagem",
          description:
            "Título, ano, técnica, materiais, dimensões e disponibilidade podem acompanhar cada obra.",
        },
        {
          title: "Endereço fácil de compartilhar",
          description:
            "Use o mesmo link na bio, em inscrições, propostas, conversas e apresentações profissionais.",
        },
        {
          title: "Contato no momento certo",
          description:
            "Depois de conhecer uma coleção, a pessoa encontra um caminho direto para conversar.",
        },
      ],
    },
    {
      type: "solution",
      id: "organizacao",
      title: "As obras podem ser organizadas pela lógica da sua produção.",
      paragraphs: [
        "Coleções podem separar séries, técnicas, períodos ou tipos de trabalho. A estrutura é definida conforme seu acervo, sem criar categorias vazias apenas para preencher o menu.",
        "Cada conjunto ganha uma abertura curta e uma seleção suficiente para mostrar continuidade, variação e relação entre as obras.",
      ],
    },
    {
      type: "audience",
      id: "sobre-artista",
      title: "Uma página para apresentar quem produz as obras.",
      items: [
        {
          title: "Percurso, pesquisa e formas de atuação",
          description:
            "Reúna uma biografia curta, texto sobre sua pesquisa, técnicas, exposições ou publicações relevantes e cidade de atuação. Entram apenas informações reais fornecidas por você.",
        },
      ],
    },
    {
      type: "benefits",
      id: "whatsapp",
      title: "Quem se interessar sabe como iniciar uma conversa.",
      items: [
        {
          title: "WhatsApp em pontos claros",
          description:
            "O botão de contato acompanha a apresentação para facilitar pedidos sobre encomendas, disponibilidade ou oportunidades profissionais.",
        },
        {
          title: "Conversa com mais contexto",
          description:
            "A pessoa pode indicar a coleção ou obra de interesse antes de perguntar sobre prazo, formato ou aquisição.",
        },
      ],
    },
    {
      type: "deliverables",
      id: "incluido",
      title: "O que está incluído.",
      items: [
        {
          title: "Abertura da galeria",
          description: "Nome artístico, apresentação breve e acesso às coleções principais.",
        },
        {
          title: "Galeria de obras",
          description: "Imagens organizadas em coleções conforme o escopo definido na proposta.",
        },
        {
          title: "Ficha de cada obra",
          description: "Campos para título, ano, técnica, materiais, dimensões e disponibilidade.",
        },
        {
          title: "Página sobre o artista",
          description: "Biografia, pesquisa, atuação e informações profissionais selecionadas.",
        },
        {
          title: "Contato pelo WhatsApp",
          description: "Chamadas diretas para encomendas, disponibilidade e outras oportunidades.",
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
      title: "Da seleção ao link em três etapas.",
      items: [
        {
          title: "1. Definimos a estrutura",
          description:
            "Você apresenta seu acervo, suas coleções e o objetivo da galeria. Eu organizo o escopo e as informações necessárias.",
        },
        {
          title: "2. Você envia obras e textos",
          description:
            "Recebo imagens autorizadas, fichas das obras, biografia e contatos no formato combinado.",
        },
        {
          title: "3. Você revisa a galeria",
          description:
            "Eu monto a página, você confere sequência, dados e imagens, e a versão aprovada ganha um endereço para compartilhar.",
        },
      ],
    },
    {
      type: "pricing",
      id: "investimento",
      title: "Investimento inicial e mensalidade.",
      description: "Oferta inicial para a galeria virtual para artistas.",
      items: [
        {
          label: "Implantação",
          amount: "R$397",
          cadence: "once",
          details: "Criação e configuração inicial da galeria conforme o escopo combinado.",
        },
        {
          label: "Mensalidade",
          amount: "R$89/mês",
          cadence: "monthly",
          details: "Cobrança recorrente, além do valor de implantação.",
        },
      ],
      terms:
        "Antes da contratação, a proposta registra quantidade de obras e coleções, revisões, atualizações, prazo e responsabilidades por domínio, hospedagem e manutenção. Condições da mensalidade e do cancelamento também ficam explícitas. Nenhum pagamento é feito nesta página.",
    },
    {
      type: "faq",
      id: "duvidas",
      title: "Dúvidas antes do orçamento.",
      items: [
        {
          question: "Preciso abandonar o Instagram?",
          answer:
            "Não. Você pode continuar usando a rede para divulgação e direcionar quem quiser conhecer melhor o trabalho para a galeria organizada.",
        },
        {
          question: "Quantas obras posso publicar?",
          answer:
            "A quantidade inicial e a divisão por coleções são definidas na proposta, depois de conhecer seu acervo e o nível de detalhe necessário.",
        },
        {
          question: "Posso informar preço ou disponibilidade?",
          answer:
            "Sim. Esses campos podem aparecer quando fizerem sentido para sua forma de trabalhar, sempre com os dados fornecidos por você.",
        },
        {
          question: "Posso atualizar a galeria depois?",
          answer:
            "Sim. Frequência, quantidade e processo das atualizações ficam definidos na proposta antes da contratação.",
        },
        {
          question: "O que os R$89 mensais cobrem?",
          answer:
            "Hospedagem, manutenção, atualizações e condições de cancelamento serão detalhadas na proposta. A mensalidade é separada da implantação de R$397.",
        },
      ],
    },
  ],
  finalCTA: {
    title: "Quer apresentar suas obras em uma galeria própria?",
    description:
      "Conte como seu acervo está organizado e peça um orçamento pelo WhatsApp. R$397 de implantação + R$89/mês.",
  },
  stickyCTA: true,
});
