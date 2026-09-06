import { serviceLandingSchema } from "./serviceLandingSchema";

export const realEstateWebsite = serviceLandingSchema.parse({
  id: "site-corretores",
  slug: "site-para-corretores",
  status: "published",
  structure: "compact",
  updatedAt: "2026-09-06",
  seo: {
    title: "Site profissional para corretores de imóveis | R$497",
    description:
      "Apresente seu perfil e imóveis em uma página profissional, com formulário, WhatsApp e ótima experiência no celular. R$497 + R$119/mês.",
    index: true,
  },
  provider: {
    name: "Henrique Reis",
    description: "Criação e implementação do seu site profissional para captação de contatos.",
  },
  conversion: {
    kind: "whatsapp",
    label: "Quero meu site",
    href: "https://wa.me/5575983675164?text=Ol%C3%A1%2C%20Henrique!%20Quero%20um%20or%C3%A7amento%20para%20o%20site%20profissional%20para%20corretores%20de%20im%C3%B3veis%20(R%24497%20de%20implanta%C3%A7%C3%A3o%20%2B%20R%24119%2Fm%C3%AAs).",
  },
  hero: {
    eyebrow: "Site para corretores de imóveis",
    title: "Site profissional para corretores de imóveis que facilita novos contatos.",
    description:
      "Tenha uma página profissional para apresentar você, destacar imóveis e levar potenciais clientes ao WhatsApp sem depender de posts antigos ou links espalhados.",
    benefit: "Seu nome, seus imóveis e o contato no mesmo endereço.",
    audience:
      "Para corretores autônomos que divulgam principalmente por Instagram, WhatsApp e portais imobiliários.",
    price: "R$497 de implantação + R$119/mês",
    layout: "split",
  },
  sections: [
    {
      type: "problem",
      id: "problema",
      title: "O cliente viu um imóvel. Agora precisa encontrar você.",
      paragraphs: [
        "No Instagram, publicações antigas somem no feed. No WhatsApp, fotos e informações ficam espalhadas na conversa. Nos portais, o corretor aparece ao lado de muitos anúncios e tem pouco espaço para apresentar seu trabalho.",
        "Quando alguém recebe uma indicação, precisa entender rápido quem você é, que imóveis trabalha e como iniciar o contato. Cada etapa extra aumenta a chance de a conversa nem começar.",
      ],
    },
    {
      type: "solution",
      id: "como-ajuda",
      title: "Uma página que organiza a apresentação e encurta o caminho até o contato.",
      paragraphs: [
        "O site reúne sua apresentação, sua região de atuação, imóveis selecionados e botões de contato em um endereço próprio. Você pode compartilhar o mesmo link na bio, no WhatsApp, em anúncios e junto de cada indicação.",
        "A página não substitui seu atendimento nem garante leads. Ela oferece um caminho mais claro para o visitante conhecer seu trabalho e chamar você quando houver interesse.",
      ],
    },
    {
      type: "demonstration",
      id: "exemplo",
      title: "Veja como seu site pode apresentar uma oportunidade.",
      illustrative: true,
      description:
        "O exemplo abaixo mostra a estrutura possível: imóvel em evidência, informações objetivas, perfil do corretor e contato visível. Fotografias, nomes e conteúdos são ilustrativos.",
    },
    {
      type: "benefits",
      id: "imoveis",
      title: "Imóveis em destaque, sem fazer o cliente procurar no feed.",
      items: [
        {
          title: "Seleção que orienta",
          description:
            "Apresente os imóveis prioritários com foto, tipo, localização e informações essenciais para despertar uma conversa.",
        },
        {
          title: "Contexto antes do WhatsApp",
          description:
            "O interessado chega ao atendimento sabendo qual imóvel chamou sua atenção, o que reduz perguntas básicas e organiza o início da conversa.",
        },
      ],
    },
    {
      type: "benefits",
      id: "perfil",
      title: "Seu perfil profissional também faz parte da decisão.",
      items: [
        {
          title: "Apresentação com identidade",
          description:
            "Explique quem você é, onde atua, quais tipos de imóvel atende e como conduz o atendimento.",
        },
        {
          title: "Confiança com informações verificáveis",
          description:
            "Exiba nome profissional, CRECI informado por você, região de atendimento e canais oficiais sem inventar avaliações ou resultados.",
        },
      ],
    },
    {
      type: "benefits",
      id: "canais",
      title: "WhatsApp para agir. Formulário para explicar o interesse.",
      items: [
        {
          title: "Botões de WhatsApp nos pontos certos",
          description:
            "O visitante encontra o contato junto da apresentação e dos imóveis, inclusive no celular.",
        },
        {
          title: "Formulário objetivo",
          description:
            "Nome, contato e imóvel ou necessidade de interesse ajudam você a receber uma solicitação mais organizada.",
        },
      ],
    },
    {
      type: "deliverables",
      id: "incluido",
      title: "O que está incluído no site.",
      items: [
        {
          title: "Hero focado em captação",
          description: "Sua proposta de atendimento, região e principal ação visíveis logo no início.",
        },
        {
          title: "Perfil do corretor",
          description: "Espaço para foto, apresentação, especialidades, CRECI e área de atuação.",
        },
        {
          title: "Imóveis em destaque",
          description:
            "Vitrine com fotografias e informações dos imóveis selecionados dentro do limite combinado.",
        },
        {
          title: "WhatsApp e formulário",
          description: "Canais de contato claros, configurados com os dados profissionais informados por você.",
        },
        {
          title: "Experiência para celular",
          description: "Layout responsivo, imagens dimensionadas e botões fáceis de usar em telas pequenas.",
        },
        {
          title: "Configuração inicial",
          description:
            "Título, descrição, compartilhamento e estrutura técnica básica para a página ser entendida pelos buscadores.",
        },
      ],
    },
    {
      type: "process",
      id: "processo",
      title: "Do material ao site pronto para compartilhar.",
      items: [
        {
          title: "Alinhamento pelo WhatsApp",
          description:
            "Você explica sua atuação, a forma de atendimento e os imóveis que deseja priorizar.",
        },
        {
          title: "Envio do conteúdo",
          description:
            "Você fornece apresentação, foto, CRECI, contatos e imagens e dados autorizados dos imóveis.",
        },
        {
          title: "Montagem e revisão",
          description:
            "Eu organizo a página e você confere as informações antes de ela ser publicada e compartilhada.",
        },
      ],
    },
    {
      type: "pricing",
      id: "investimento",
      title: "Um endereço profissional com investimento claro.",
      description: "Oferta inicial para o site profissional para corretores de imóveis.",
      items: [
        {
          label: "Implantação",
          amount: "R$497",
          cadence: "once",
          details: "Criação e configuração inicial da página conforme o escopo combinado.",
        },
        {
          label: "Mensalidade",
          amount: "R$119/mês",
          cadence: "monthly",
          details: "Cobrança recorrente, além do valor de implantação.",
        },
      ],
      terms:
        "Antes de contratar, você recebe a proposta com prazo, quantidade de imóveis, forma de atualização, condições da mensalidade e responsabilidades por domínio, hospedagem, manutenção e tratamento dos contatos do formulário. Nenhum pagamento é feito nesta página.",
    },
    {
      type: "faq",
      id: "duvidas",
      title: "Perguntas antes de pedir seu orçamento.",
      items: [
        {
          question: "O site substitui Instagram, WhatsApp ou portais?",
          answer:
            "Não. Ele funciona como seu endereço profissional e complementa esses canais. Você continua divulgando onde seu público já está e usa o site para organizar a apresentação e o contato.",
        },
        {
          question: "Quantos imóveis posso colocar?",
          answer:
            "A quantidade inicial, o formato das informações e a rotina de atualização ficam definidos na proposta. Assim você sabe o limite antes de contratar.",
        },
        {
          question: "Preciso já ter domínio?",
          answer:
            "Não. O endereço, o registro e a responsabilidade pelo pagamento do domínio são combinados na proposta.",
        },
        {
          question: "O formulário envia os contatos para onde?",
          answer:
            "O destino das solicitações, os campos coletados e a forma de tratamento desses dados são definidos antes da publicação. O formulário só entra no ar depois de um teste real de envio.",
        },
        {
          question: "O que está incluído nos R$119 por mês?",
          answer:
            "Os R$119 são uma cobrança mensal separada da implantação de R$497. Hospedagem, manutenção, alterações, atualização de imóveis e cancelamento serão detalhados na proposta antes da contratação.",
        },
        {
          question: "Em quanto tempo o site fica pronto?",
          answer:
            "O prazo depende do escopo e do envio dos textos, fotos e dados dos imóveis. A data é informada no orçamento e você revisa a página antes da publicação.",
        },
      ],
    },
  ],
  finalCTA: {
    title: "Tenha um endereço profissional para apresentar e atender.",
    description:
      "Conte como você trabalha e peça seu orçamento pelo WhatsApp. R$497 de implantação + R$119/mês.",
  },
  stickyCTA: true,
});
