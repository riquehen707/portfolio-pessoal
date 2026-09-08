import { serviceLandingSchema } from "./serviceLandingSchema";

export const tattooPortfolio = serviceLandingSchema.parse({
  id: "portfolio-tatuadores",
  slug: "portfolio-para-tatuadores",
  status: "published",
  structure: "compact",
  updatedAt: "2026-09-06",
  seo: {
      title: "Portfólio para tatuadores | R$297 + R$79/mês",
    description:
      "Organize seus melhores trabalhos por estilo em um portfólio próprio, feito para celular e ligado ao WhatsApp. R$297 de implantação + R$79/mês.",
    index: true,
  },
  provider: {
    name: "Henrique Reis",
    description: "Criação e implementação do seu portfólio profissional.",
  },
  conversion: {
    kind: "whatsapp",
    label: "Quero meu portfólio",
    href: "https://wa.me/5575983675164?text=Ol%C3%A1%2C%20Henrique!%20Quero%20um%20or%C3%A7amento%20para%20o%20portf%C3%B3lio%20profissional%20para%20tatuadores%20(R%24297%20de%20implanta%C3%A7%C3%A3o%20%2B%20R%2479%2Fm%C3%AAs).",
  },
  hero: {
    eyebrow: "Portfólio para tatuadores",
    title: "Seu trabalho organizado em um portfólio profissional.",
    description:
      "Mostre seus melhores projetos por estilo e leve quem se interessou direto ao WhatsApp, sem depender de a pessoa procurar no feed.",
    benefit: "Um link para apresentar seu traço e receber pedidos de orçamento.",
    audience:
      "Para tatuadores autônomos que usam principalmente o Instagram para mostrar seus trabalhos.",
    price: "R$297 de implantação + R$79/mês",
    layout: "split",
  },
  sections: [
    {
      type: "problem",
      id: "problema",
      title: "Seus melhores trabalhos não deveriam desaparecer no feed.",
      paragraphs: [
        "No Instagram, um projeto novo empurra os anteriores para baixo. Quem chega por indicação precisa abrir posts, destaques e marcações para entender seu traço.",
        "Quando o perfil mistura estilos, agenda, bastidores e conteúdo pessoal, a pessoa pode sair antes de encontrar o trabalho que faria pedir um orçamento.",
      ],
    },
    {
      type: "solution",
      id: "solucao",
      title: "Um portfólio próprio separa o trabalho do movimento do feed.",
      paragraphs: [
        "Você reúne uma seleção enxuta, organiza por estilos e apresenta cada trabalho em uma página que continua fácil de consultar. O mesmo link pode ficar na bio, ser enviado pelo WhatsApp ou acompanhar uma resposta de orçamento.",
      ],
    },
    {
      type: "benefits",
      id: "beneficios",
      title: "O visitante entende seu trabalho sem procurar demais.",
      items: [
        {
          title: "Estilos separados",
          description:
            "Fine line, blackwork, colorido e outras linhas de trabalho ficam em grupos claros, conforme sua atuação.",
        },
        {
          title: "Seleção sob seu controle",
          description:
            "Você decide quais projetos representam melhor o tipo de tatuagem que quer receber.",
        },
        {
          title: "Um link estável",
          description:
            "Compartilhe a mesma página na bio, em conversas e em materiais de divulgação.",
        },
        {
          title: "Contato perto do trabalho",
          description:
            "O botão do WhatsApp aparece nos pontos em que a pessoa já viu fotos e pode querer conversar.",
        },
      ],
    },
    {
      type: "deliverables",
      id: "incluido",
      title: "O que está incluído.",
      items: [
        {
          title: "Abertura com sua apresentação",
          description: "Seu nome, seus estilos e a informação essencial sobre onde você atende.",
        },
        {
          title: "Galeria organizada por estilos",
          description:
            "Seus trabalhos separados em categorias que ajudam o visitante a encontrar referências próximas do que procura.",
        },
        {
          title: "Espaço para explicar projetos",
          description:
            "Quando fizer sentido, cada trabalho pode receber uma legenda curta com contexto e técnica.",
        },
        {
          title: "WhatsApp para orçamento",
          description: "Chamadas diretas para iniciar a conversa sobre ideia, região do corpo e agenda.",
        },
        {
          title: "Layout para celular",
          description: "Fotos, textos e botões dimensionados para quem abre o link pelo telefone.",
        },
        {
          title: "Configuração técnica inicial",
          description:
            "Publicação, metadados de SEO e eventos de clique configurados no lançamento.",
        },
      ],
    },
    {
      type: "demonstration",
      id: "exemplo",
      title: "Veja como os trabalhos podem ser apresentados.",
      illustrative: true,
      description:
        "A demonstração abaixo usa fotografias de banco para mostrar a estrutura. O seu portfólio será montado com imagens próprias e autorizadas por você.",
    },
    {
      type: "process",
      id: "processo",
      title: "Do material ao link em três etapas.",
      items: [
        {
          title: "1. Alinhamos seus estilos",
          description:
            "Você conta o que tatua, onde atende e que tipo de trabalho quer destacar. Com isso, definimos o escopo da proposta.",
        },
        {
          title: "2. Você envia o material",
          description:
            "Recebo as fotos autorizadas, sua apresentação e seus contatos. Depois, selecionamos a melhor forma de agrupar os trabalhos.",
        },
        {
          title: "3. Você revisa e compartilha",
          description:
            "Eu monto a página, você confere textos e imagens, e o portfólio aprovado ganha um link para divulgação.",
        },
      ],
    },
    {
      type: "pricing",
      id: "investimento",
      title: "Quanto custa começar.",
      description: "Oferta inicial para o portfólio profissional para tatuadores.",
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
          details: "Inclui hospedagem, manutenção técnica, suporte e pequenas atualizações de trabalhos dentro do limite definido na proposta.",
        },
      ],
      terms:
        "Antes de contratar, você recebe uma proposta com prazo, quantidade de trabalhos, revisões, atualizações e responsabilidades por domínio, hospedagem e manutenção. As condições da mensalidade, da fidelidade e do cancelamento também ficam registradas. Nenhum pagamento é feito nesta página.",
    },
    {
      type: "faq",
      id: "duvidas",
      title: "Dúvidas antes do orçamento.",
      items: [
        {
          question: "Preciso parar de usar o Instagram?",
          answer:
            "Não. O portfólio complementa o Instagram: você continua publicando e usa um link organizado para apresentar os trabalhos a quem quer conhecer melhor seu traço.",
        },
        {
          question: "O que preciso enviar?",
          answer:
            "Fotos suas e autorizadas para divulgação, os estilos que deseja separar, uma breve apresentação, cidade ou região de atendimento e o contato do WhatsApp.",
        },
        {
          question: "Posso atualizar os trabalhos depois?",
          answer:
            "Sim. A frequência, a quantidade e a forma de envio das atualizações ficam definidas na proposta antes da contratação.",
        },
        {
          question: "O que os R$79 mensais cobrem?",
          answer:
            "Inclui hospedagem, manutenção técnica, suporte e pequenas atualizações de trabalhos dentro do limite definido na proposta. A mensalidade é separada da implantação de R$297; cancelamento e fidelidade ficam registrados antes da contratação.",
        },
        {
          question: "Em quanto tempo fica pronto?",
          answer:
            "O prazo depende do escopo e do envio das fotos e informações. A data de entrega é combinada no orçamento, e você revisa tudo antes da publicação.",
        },
      ],
    },
  ],
  finalCTA: {
    title: "Quer reunir seus melhores trabalhos em um só link?",
    description:
      "Conte quais estilos você tatua e peça seu orçamento pelo WhatsApp. R$297 de implantação + R$79/mês.",
  },
  stickyCTA: true,
});
