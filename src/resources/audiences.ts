export type AudiencePage = {
  slug: string;
  label: string;
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  fit: string[];
  problems: {
    title: string;
    description: string;
  }[];
  stages: {
    title: string;
    description: string;
  }[];
  contentTips: string[];
  pageStructure: {
    title: string;
    description: string;
  }[];
  acquisitionPaths: {
    title: string;
    description: string;
  }[];
  metrics: string[];
  ctaTitle: string;
  ctaDescription: string;
};

export const audiencePages = [
  {
    slug: "agencias",
    label: "Agências",
    path: "/publicos/agencias",
    eyebrow: "Para agências",
    title: "Apoio digital para agências que precisam entregar com mais critério.",
    description:
      "Entro como parceiro de execução para transformar estratégia, briefing e direção criativa em páginas, interfaces e estruturas digitais prontas para apresentar, publicar e evoluir.",
    fit: [
      "Quando o time está com demanda acima da capacidade interna.",
      "Quando o projeto precisa de front-end, landing page ou ajuste técnico com acabamento.",
      "Quando a agência quer manter a direção estratégica e delegar a produção com confiança.",
    ],
    problems: [
      {
        title: "Entrega apertada vira improviso.",
        description:
          "Prazo curto, briefing incompleto e várias aprovações podem transformar uma boa ideia em uma página genérica.",
      },
      {
        title: "Design e implementação se separam.",
        description:
          "A peça fica bonita no layout, mas perde ritmo, responsividade, performance ou clareza quando chega ao navegador.",
      },
      {
        title: "O cliente aprova visual, mas não entende função.",
        description:
          "Sem narrativa, hierarquia e caminho de ação, a entrega parece tela isolada em vez de ferramenta comercial.",
      },
    ],
    stages: [
      {
        title: "Alinhar contexto e responsabilidade",
        description:
          "Entendo objetivo, restrições, tom da marca, prazo, materiais disponíveis e qual parte fica comigo.",
      },
      {
        title: "Organizar a mensagem da página",
        description:
          "Transformo briefing em estrutura: promessa, blocos, provas, objeções e chamadas de ação.",
      },
      {
        title: "Construir interface pronta para aprovação",
        description:
          "Crio ou adapto layout com hierarquia clara, responsividade e consistência com a direção da agência.",
      },
      {
        title: "Implementar com base técnica limpa",
        description:
          "Entrego página performática, componentizada quando necessário e preparada para publicação ou handoff.",
      },
    ],
    contentTips: [
      "Mostre bastidores de estratégia, não só peças finais.",
      "Publique estudos curtos explicando o problema antes da solução.",
      "Transforme aprendizados de projeto em posts educativos para clientes futuros.",
      "Use comparativos: antes do briefing, depois da organização e depois da página.",
      "Crie conteúdo que prove método, não apenas portfólio.",
    ],
    pageStructure: [
      {
        title: "Recorte de atuação",
        description:
          "Explique para quais tipos de projeto a agência chama apoio externo e o que fica sob sua direção.",
      },
      {
        title: "Processo de parceria",
        description:
          "Mostre como briefing, revisão, aprovação e publicação funcionam sem gerar ruído para o cliente final.",
      },
      {
        title: "Provas de execução",
        description:
          "Traga telas, critérios técnicos, performance, responsividade e detalhes de acabamento.",
      },
      {
        title: "Entrada comercial simples",
        description:
          "Uma chamada para avaliar escopo, prazo e capacidade antes de prometer entrega.",
      },
    ],
    acquisitionPaths: [
      {
        title: "Parcerias recorrentes",
        description:
          "Relacionamento com agências que precisam de apoio de produção em ciclos de campanha, site ou landing page.",
      },
      {
        title: "Conteúdo de bastidor",
        description:
          "Posts e artigos mostrando como uma boa ideia vira página clara, rápida e vendável.",
      },
      {
        title: "Prospecção consultiva",
        description:
          "Contato direto com agências que já vendem estratégia, mas precisam fortalecer execução digital.",
      },
    ],
    metrics: ["Prazo de entrega", "Aprovações por rodada", "Performance da página", "Clareza do CTA"],
    ctaTitle: "Vamos avaliar se eu entro como parceiro de execução?",
    ctaDescription:
      "Uma conversa curta basta para entender escopo, prazo, materiais e nível de autonomia necessário.",
  },
  {
    slug: "profissionais",
    label: "Profissionais",
    path: "/publicos/profissionais",
    eyebrow: "Para profissionais",
    title: "Presença digital para profissionais que vendem confiança antes da conversa.",
    description:
      "Ajudo especialistas, prestadores de serviço e profissionais autônomos a explicar valor, organizar oferta e transformar interesse em contato qualificado.",
    fit: [
      "Quando sua indicação é boa, mas sua presença digital não sustenta a percepção de valor.",
      "Quando o Instagram existe, mas não explica claramente como contratar.",
      "Quando você precisa parecer mais específico sem se tornar artificial.",
    ],
    problems: [
      {
        title: "A expertise fica abstrata.",
        description:
          "Quem visita seu perfil entende que você trabalha bem, mas não entende exatamente para quem, como e por onde começar.",
      },
      {
        title: "A oferta depende demais da conversa.",
        description:
          "Você precisa explicar tudo manualmente porque a página não antecipa dúvidas, critérios e próximos passos.",
      },
      {
        title: "Conteúdo gera atenção, mas não decisão.",
        description:
          "Posts soltos podem educar, mas sem uma estrutura clara eles não conduzem o visitante para contato.",
      },
    ],
    stages: [
      {
        title: "Definir posicionamento prático",
        description:
          "Organizo quem você atende, qual problema resolve e como sua abordagem se diferencia.",
      },
      {
        title: "Transformar serviço em oferta entendível",
        description:
          "Nome, promessa, escopo, limites, sinais de confiança e próximos passos ficam claros.",
      },
      {
        title: "Construir uma página de decisão",
        description:
          "A página apresenta contexto, método, benefícios, provas e chamada para conversa sem exagero.",
      },
      {
        title: "Preparar conteúdo de sustentação",
        description:
          "Ideias de posts, artigos ou materiais curtos passam a responder dúvidas reais do público.",
      },
    ],
    contentTips: [
      "Explique erros comuns que seu cliente comete antes de contratar.",
      "Mostre como você pensa, diagnostica e prioriza.",
      "Crie posts respondendo dúvidas de primeira conversa.",
      "Use casos anônimos ou cenários fictícios para mostrar critério.",
      "Evite prometer resultado isolado; explique processo e tomada de decisão.",
    ],
    pageStructure: [
      {
        title: "Headline específica",
        description:
          "A primeira dobra precisa dizer o que você resolve, para quem e com qual abordagem.",
      },
      {
        title: "Problemas que o cliente reconhece",
        description:
          "Liste sintomas reais para o visitante se localizar sem precisar adivinhar se serve para ele.",
      },
      {
        title: "Método e critérios",
        description:
          "Mostre como você conduz o trabalho e quais decisões toma antes da entrega.",
      },
      {
        title: "Contato sem fricção",
        description:
          "Botão para WhatsApp, agenda ou formulário com expectativa clara sobre o que acontece depois.",
      },
    ],
    acquisitionPaths: [
      {
        title: "Busca orgânica",
        description:
          "Artigos e páginas para perguntas que seu cliente pesquisa antes de pedir indicação.",
      },
      {
        title: "Conteúdo de autoridade",
        description:
          "Posts e materiais curtos que mostram raciocínio, não apenas disponibilidade.",
      },
      {
        title: "Tráfego leve para oferta clara",
        description:
          "Campanhas pequenas podem funcionar melhor quando a página já explica valor e próximo passo.",
      },
    ],
    metrics: ["Cliques no contato", "Qualidade das conversas", "Dúvidas repetidas", "Origem dos leads"],
    ctaTitle: "Sua presença explica bem por que escolher você?",
    ctaDescription:
      "Vamos revisar mensagem, página e caminho de contato para encontrar o ajuste mais importante.",
  },
  {
    slug: "negocios-locais",
    label: "Negócios locais",
    path: "/publicos/negocios-locais",
    eyebrow: "Para negócios locais",
    title: "Páginas e presença digital para negócios locais serem entendidos mais rápido.",
    description:
      "Organizo mensagem, página e canais de contato para clínicas, escolas, salões, imobiliárias, escritórios e operações locais que precisam transformar procura em atendimento.",
    fit: [
      "Quando o cliente encontra você, mas não entende diferença, preço, processo ou próximo passo.",
      "Quando o WhatsApp recebe perguntas repetidas que a página poderia antecipar.",
      "Quando redes sociais, Google e site existem, mas não trabalham juntos.",
    ],
    problems: [
      {
        title: "A procura não vira conversa boa.",
        description:
          "Muita gente chega perguntando o básico porque a presença digital não organiza informações essenciais.",
      },
      {
        title: "O negócio parece igual aos concorrentes.",
        description:
          "Sem recorte, prova e mensagem clara, preço e localização viram os únicos critérios visíveis.",
      },
      {
        title: "O atendimento perde tempo explicando tudo.",
        description:
          "Serviços, horários, diferenciais, dúvidas e formas de agendamento ficam espalhados.",
      },
    ],
    stages: [
      {
        title: "Mapear jornada local",
        description:
          "Identifico como a pessoa chega: indicação, busca, Instagram, anúncio, mapa ou WhatsApp.",
      },
      {
        title: "Organizar oferta e informações",
        description:
          "Serviços, diferenciais, dúvidas, prova social e orientações de contato entram em ordem.",
      },
      {
        title: "Criar página leve e objetiva",
        description:
          "A página mostra o essencial, carrega rápido e conduz para contato sem parecer catálogo confuso.",
      },
      {
        title: "Conectar canais de aquisição",
        description:
          "Google, redes, anúncios e links passam a apontar para um caminho mais claro de decisão.",
      },
    ],
    contentTips: [
      "Explique como escolher o serviço certo antes de pedir orçamento.",
      "Mostre perguntas frequentes que reduzem insegurança.",
      "Publique bastidores de cuidado, processo e atendimento.",
      "Crie conteúdo local: bairro, rotina, horários, preparo e diferenciais da região.",
      "Use provas simples: depoimentos, antes/depois quando permitido, números operacionais e casos comuns.",
    ],
    pageStructure: [
      {
        title: "Serviço principal e região",
        description:
          "A primeira dobra precisa deixar claro o que o negócio faz, onde atende e qual ação tomar.",
      },
      {
        title: "Blocos por intenção",
        description:
          "Quem quer conhecer, comparar, tirar dúvida ou agendar precisa encontrar seu caminho.",
      },
      {
        title: "Provas de confiança",
        description:
          "Depoimentos, fotos reais, equipe, estrutura, processo e garantias possíveis sustentam a decisão.",
      },
      {
        title: "WhatsApp orientado",
        description:
          "O botão de contato deve iniciar uma conversa mais objetiva, não só abrir o aplicativo.",
      },
    ],
    acquisitionPaths: [
      {
        title: "Google e busca local",
        description:
          "Páginas e conteúdo para termos que conectam serviço, localização e intenção de contato.",
      },
      {
        title: "Instagram com rota para decisão",
        description:
          "Posts educam, mas a página organiza detalhes e reduz fricção antes do WhatsApp.",
      },
      {
        title: "Anúncios com página específica",
        description:
          "Campanhas locais funcionam melhor quando cada clique encontra oferta e CTA coerentes.",
      },
    ],
    metrics: ["Cliques no WhatsApp", "Perguntas repetidas", "Origem do contato", "Agendamentos"],
    ctaTitle: "Vamos deixar seu negócio mais fácil de entender e chamar?",
    ctaDescription:
      "A primeira conversa localiza se o gargalo está na página, na mensagem, na busca ou no atendimento.",
  },
  {
    slug: "infoprodutores",
    label: "Infoprodutores",
    path: "/publicos/infoprodutores",
    eyebrow: "Para infoprodutores",
    title: "Estrutura digital para infoprodutores venderem com mais clareza e menos ruído.",
    description:
      "Ajudo criadores, educadores e especialistas a organizar oferta, página, conteúdo e caminho de aquisição sem depender de promessa inflada.",
    fit: [
      "Quando a audiência existe, mas a oferta ainda não fica fácil de entender.",
      "Quando a página de vendas está longa, confusa ou parecida com todas as outras.",
      "Quando conteúdo, captura e venda não formam uma sequência clara.",
    ],
    problems: [
      {
        title: "A promessa parece genérica.",
        description:
          "Sem recorte, transformação e critérios, o produto disputa atenção com centenas de ofertas parecidas.",
      },
      {
        title: "A página explica demais e orienta de menos.",
        description:
          "Muito texto não resolve se a hierarquia não conduz a pessoa pelas dúvidas certas.",
      },
      {
        title: "O conteúdo não prepara a compra.",
        description:
          "Posts e aulas podem gerar interesse, mas precisam se conectar a uma oferta compreensível.",
      },
    ],
    stages: [
      {
        title: "Clarificar público e transformação",
        description:
          "Defino para quem é, o que muda, quais limites existem e por que agora faz sentido.",
      },
      {
        title: "Organizar mecanismo da oferta",
        description:
          "Método, módulos, bônus, provas, objeções e garantia entram em uma narrativa coerente.",
      },
      {
        title: "Construir página de venda ou captura",
        description:
          "A página prioriza leitura rápida, prova, clareza de valor e ação sem prometer o que não controla.",
      },
      {
        title: "Conectar conteúdo e aquisição",
        description:
          "Conteúdo, lista, tráfego e remarketing apontam para a mesma tese comercial.",
      },
    ],
    contentTips: [
      "Crie conteúdo sobre sintomas que indicam que a pessoa precisa do método.",
      "Mostre decisões de bastidor: por que uma etapa existe e o que evita.",
      "Transforme objeções em posts, aulas curtas ou e-mails.",
      "Explique para quem o produto não serve para aumentar confiança.",
      "Use estudos de caso com contexto, processo e aprendizado, não só resultado final.",
    ],
    pageStructure: [
      {
        title: "Promessa com recorte",
        description:
          "A headline precisa ser específica, crível e conectada ao estágio de consciência da audiência.",
      },
      {
        title: "Mecanismo e método",
        description:
          "A pessoa precisa entender por que sua solução faz sentido e como ela organiza o caminho.",
      },
      {
        title: "Prova e objeções",
        description:
          "Depoimentos, amostras, bastidores e respostas a dúvidas reduzem risco percebido.",
      },
      {
        title: "Oferta e checkout sem atrito",
        description:
          "Preço, condições, garantia, bônus e próximos passos devem estar claros antes do clique.",
      },
    ],
    acquisitionPaths: [
      {
        title: "Conteúdo de pré-venda",
        description:
          "Sequência de posts, aulas ou e-mails que prepara a pessoa para a tese da oferta.",
      },
      {
        title: "Captura e nutrição",
        description:
          "Material gratuito ou lista de espera que separa curiosidade de intenção real.",
      },
      {
        title: "Tráfego para página específica",
        description:
          "Campanhas funcionam melhor quando cada anúncio conversa com uma página objetiva.",
      },
    ],
    metrics: ["Taxa de clique", "Inscrições", "Dúvidas pré-compra", "Conversão da página"],
    ctaTitle: "Vamos organizar sua oferta antes de aumentar o tráfego?",
    ctaDescription:
      "Ajustar mensagem, estrutura e página costuma vir antes de colocar mais pessoas no funil.",
  },
] as const satisfies readonly AudiencePage[];

export function getAudiencePage(slug: string) {
  return audiencePages.find((page) => page.slug === slug);
}
