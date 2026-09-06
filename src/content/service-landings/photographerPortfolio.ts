import { serviceLandingSchema } from "./serviceLandingSchema";

export const photographerPortfolio = serviceLandingSchema.parse({
  id: "portfolio-fotografos",
  slug: "portfolio-para-fotografos",
  status: "published",
  structure: "compact",
  updatedAt: "2026-09-06",
  seo: {
    title: "Portfólio profissional para fotógrafos | R$397 + R$89/mês",
    description:
      "Apresente suas melhores fotos por categoria em um portfólio profissional, com formulário, WhatsApp e layout para celular. R$397 de implantação + R$89/mês. Peça um orçamento.",
    index: true,
  },
  provider: {
    name: "Henrique Reis",
    description: "Criação e implementação do seu portfólio profissional.",
  },
  conversion: {
    kind: "whatsapp",
    label: "Quero meu portfólio",
    href: "https://wa.me/5575983675164?text=Ol%C3%A1%2C%20Henrique!%20Quero%20um%20or%C3%A7amento%20para%20o%20portf%C3%B3lio%20profissional%20para%20fot%C3%B3grafos%20(R%24397%20de%20implanta%C3%A7%C3%A3o%20%2B%20R%2489%2Fm%C3%AAs).",
  },
  hero: {
    eyebrow: "Portfólio para fotógrafos",
    title: "Portfólio profissional para fotógrafos",
    description:
      "Apresente suas melhores fotos em um site organizado, fácil de compartilhar e pronto para receber pedidos de orçamento.",
    benefit: "Suas imagens em destaque. O próximo contato a um toque.",
    audience:
      "Para fotógrafos autônomos de ensaios, eventos, casamentos, produtos e trabalhos comerciais.",
    price: "R$397 de implantação + R$89/mês",
    layout: "split",
  },
  sections: [
    {
      type: "problem",
      id: "problema",
      title: "Não deixe suas melhores fotos se perderem no feed.",
      paragraphs: [
        "Quem recebe uma indicação precisa entender seu estilo, encontrar o tipo de trabalho que procura e saber como pedir um orçamento. Fotos espalhadas entre posts, destaques e pastas tornam esse caminho mais difícil.",
      ],
    },
    {
      type: "benefits",
      id: "beneficio",
      title: "Um link que apresenta seu trabalho por você.",
      items: [
        {
          title: "Da primeira impressão ao pedido de orçamento",
          description:
            "Uma seleção bem apresentada valoriza seu olhar. As categorias ajudam o visitante a encontrar o que interessa, e os contatos ficam acessíveis quando ele quiser conversar. Compartilhe na bio, no WhatsApp ou junto de uma proposta.",
        },
      ],
    },
    {
      type: "demonstration",
      id: "demonstracao",
      title: "Imagine suas fotos aqui.",
      illustrative: true,
      description:
        "Uma amostra da organização: suas imagens em primeiro plano, categorias claras e um caminho simples para o contato. Experimente filtrar os trabalhos abaixo.",
    },
    {
      type: "deliverables",
      id: "recursos",
      title: "O essencial para mostrar e ser encontrado.",
      items: [
        {
          title: "Galeria dos melhores trabalhos",
          description:
            "Destaque as fotos que representam seu estilo, com espaço para cada imagem respirar.",
        },
        {
          title: "Organização por categoria",
          description:
            "Separe ensaios, eventos, casamentos, produtos e trabalhos comerciais conforme sua atuação.",
        },
        {
          title: "Sua apresentação profissional",
          description: "Reúna quem você é, o que fotografa e onde atende em uma página própria.",
        },
        {
          title: "Formulário e WhatsApp",
          description:
            "Ofereça caminhos claros para receber informações do trabalho e pedidos de orçamento.",
        },
        {
          title: "Feito para o celular",
          description: "Fotos que se ajustam à tela, navegação simples e contatos fáceis de tocar.",
        },
        {
          title: "Um link para compartilhar",
          description:
            "Envie seu portfólio a quem pede referências e use o mesmo endereço nos seus canais.",
        },
      ],
    },
    {
      type: "process",
      id: "processo",
      title: "Você traz as fotos. Eu preparo o portfólio.",
      items: [
        {
          title: "Conte o que você fotografa",
          description: "Pelo WhatsApp, alinhamos suas necessidades e o escopo do orçamento.",
        },
        {
          title: "Envie suas melhores imagens",
          description:
            "Você reúne a seleção de fotos, sua apresentação e os dados de contato. Eu organizo a página.",
        },
        {
          title: "Revise e comece a compartilhar",
          description:
            "Você confere a apresentação antes da publicação. Depois, é só usar o link do seu portfólio.",
        },
      ],
    },
    {
      type: "pricing",
      id: "investimento",
      title: "Seu portfólio, com o investimento às claras.",
      description: "Oferta inicial para o portfólio profissional para fotógrafos.",
      items: [
        {
          label: "Implantação",
          amount: "R$397",
          cadence: "once",
          details: "Criação e configuração inicial do portfólio conforme o escopo combinado.",
        },
        {
          label: "Mensalidade",
          amount: "R$89/mês",
          cadence: "monthly",
          details: "Cobrança recorrente, além do valor de implantação.",
        },
      ],
      terms:
        "Antes de contratar, você recebe a proposta com o escopo, prazo, condições da mensalidade e responsabilidades por domínio, hospedagem e alterações. Nenhum pagamento é feito nesta página.",
    },
    {
      type: "faq",
      id: "duvidas",
      title: "Antes de dar o próximo passo.",
      items: [
        {
          question: "Preciso ter domínio?",
          answer:
            "Não precisa ter um domínio para pedir o orçamento. Na proposta, combinamos o endereço, o registro e quem fica responsável pelo pagamento.",
        },
        {
          question: "O que preciso enviar?",
          answer:
            "Uma seleção de fotos suas e autorizadas para divulgação, as categorias que deseja mostrar, uma breve apresentação, sua região de atendimento e seus contatos.",
        },
        {
          question: "Meus clientes conseguem acessar pelo celular?",
          answer:
            "Sim. O portfólio é pensado para telas pequenas, com fotos responsivas, leitura confortável e formulário e WhatsApp fáceis de acessar.",
        },
        {
          question: "Posso atualizar as fotos depois?",
          answer:
            "As possibilidades de atualização, a quantidade de alterações e quem realiza cada mudança ficam definidas na proposta, antes da contratação.",
        },
        {
          question: "O que está incluído nos R$89/mês?",
          answer:
            "Os R$89 são uma cobrança mensal, separada da implantação de R$397. O escopo recorrente, a hospedagem, a manutenção e as condições de cancelamento serão detalhados na proposta antes de você contratar.",
        },
        {
          question: "Em quanto tempo fica pronto?",
          answer:
            "O prazo é combinado no orçamento, considerando o escopo e o envio das fotos e informações. Você revisa a apresentação antes de ela ser publicada.",
        },
      ],
    },
  ],
  finalCTA: {
    title: "Pronto para apresentar seu melhor trabalho?",
    description:
      "Conte o que você fotografa e peça seu orçamento pelo WhatsApp. R$397 de implantação + R$89/mês.",
  },
  stickyCTA: true,
});
