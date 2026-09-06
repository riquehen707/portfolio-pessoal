import { serviceLandingSchema } from "./serviceLandingSchema";

// Fixture de desenvolvimento. Não importar no catálogo público.
export const exampleServiceLanding = serviceLandingSchema.parse({
  id: "demo-portfolio",
  slug: "exemplo-portfolio",
  status: "draft",
  updatedAt: "2026-09-06",
  seo: {
    title: "Demonstração do padrão de landing",
    description: "Exemplo fictício para revisar a infraestrutura de serviços.",
    index: false,
  },
  provider: {
    name: "Exemplo de executor",
    description: "Identificação fictícia usada somente nesta prévia.",
  },
  conversion: { kind: "form", label: "Revisar exemplo de formulário", href: "#contato" },
  hero: {
    eyebrow: "Prévia de desenvolvimento · oferta fictícia",
    title: "Portfólio para tatuadores apresentarem trabalhos e receberem pedidos",
    audience: "Para tatuadores que já têm fotos próprias e atendem por agendamento.",
    benefit: "Trabalhos, estilos e orientações reunidos em uma página compartilhável.",
    description: "Uma página para mostrar seu traço e explicar como pedir um orçamento.",
    layout: "text",
  },
  sections: [
    {
      type: "problem",
      id: "problema",
      title: "Suas fotos estão espalhadas nas redes?",
      paragraphs: [
        "Quem chega por indicação precisa encontrar seus trabalhos e entender como você atende sem procurar em várias publicações.",
      ],
    },
    {
      type: "solution",
      id: "solucao",
      title: "Um endereço para apresentar seu trabalho",
      paragraphs: [
        "O portfólio reúne uma seleção de tatuagens, os estilos atendidos e as informações necessárias para iniciar um pedido.",
      ],
    },
    {
      type: "benefits",
      id: "beneficios",
      title: "O que a página facilita",
      items: [
        {
          title: "Mostrar seu traço",
          description:
            "Fotos organizadas por estilo ajudam a pessoa a reconhecer o trabalho que procura.",
        },
        {
          title: "Orientar o pedido",
          description:
            "Explique quais referências, medidas e informações são úteis no primeiro contato.",
        },
      ],
    },
    {
      type: "deliverables",
      id: "entrega",
      title: "Um escopo que pode ser conferido",
      items: [
        {
          title: "Galeria selecionada",
          description:
            "Exemplo de escopo: até 12 fotos próprias com legenda e organização por estilo.",
        },
        {
          title: "Orientações de agendamento",
          description:
            "Exemplo de escopo: local de atendimento, etapas do pedido e dúvidas frequentes.",
        },
      ],
    },
    {
      type: "demonstration",
      id: "demonstracao",
      title: "Como um visitante usaria a página",
      illustrative: true,
      description:
        "A pessoa reconhece o estilo na galeria, confere o local de atendimento e prepara as referências antes de solicitar orçamento. Este caso de uso é fictício; não representa pesquisa ou resultado de cliente.",
    },
    {
      type: "audience",
      id: "publico",
      title: "Quando este formato faz sentido",
      items: [
        {
          title: "Você já tem trabalhos para mostrar",
          description:
            "As fotos precisam representar tatuagens que você realizou e ter autorização de uso.",
        },
        {
          title: "O atendimento começa por conversa",
          description:
            "O formato serve para organizar a apresentação antes da avaliação individual do projeto.",
        },
      ],
    },
    {
      type: "process",
      id: "processo",
      title: "Do material à página",
      items: [
        {
          title: "Reunir informações",
          description: "Selecionar fotos, estilos, endereço e orientações de atendimento.",
        },
        {
          title: "Preparar e revisar",
          description: "Conferir a organização e os textos antes da publicação.",
        },
        {
          title: "Publicar",
          description: "Após a aprovação, conectar o endereço e conferir a página no celular.",
        },
      ],
    },
    {
      type: "pricing",
      id: "oferta",
      title: "Condições a definir antes de contratar",
      description: "Esta prévia não apresenta uma oferta comercial disponível.",
      items: [
        {
          label: "Criação",
          amount: "A definir",
          cadence: "on-request",
          details: "Confirmar escopo, revisões e prazo na proposta.",
        },
        {
          label: "Domínio e hospedagem",
          amount: "A definir",
          cadence: "on-request",
          details:
            "Informar fornecedor, responsável pelo pagamento e recorrência antes da publicação real.",
        },
        {
          label: "Manutenção",
          amount: "A definir",
          cadence: "on-request",
          details: "Explicar alterações incluídas e condições de cancelamento.",
        },
      ],
      terms: "Não há cobrança ou contratação nesta demonstração.",
    },
    {
      type: "faq",
      id: "duvidas",
      title: "Antes de pedir um portfólio",
      items: [
        {
          question: "O que preciso enviar?",
          answer:
            "No exemplo, uma seleção de fotos próprias, informações de atendimento e os estilos que você deseja destacar.",
        },
        {
          question: "Posso alterar depois?",
          answer:
            "O acesso para edição e a manutenção devem ser definidos na proposta real. Esta prévia não estabelece condições de contratação.",
        },
        {
          question: "Funciona no celular?",
          answer:
            "A estrutura foi preparada para telas pequenas, com imagens flexíveis e controles grandes. Cada nova composição precisa ser conferida no aparelho.",
        },
      ],
    },
  ],
  finalCTA: {
    title: "Um endereço para quem quer conhecer seu traço",
    description:
      "Na oferta real, esta área repetirá a ação principal de contato. Aqui você pode revisar a demonstração do formulário.",
  },
  stickyCTA: true,
});
