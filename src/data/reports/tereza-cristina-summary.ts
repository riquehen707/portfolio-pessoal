import type { ProjectExecutiveSummary } from "@/domain/types";

export const terezaCristinaExecutiveSummary: ProjectExecutiveSummary = {
  id: "summary_tereza_cristina",
  clientId: "client_tereza_cristina",
  title: "Resumo executivo de diagnostico",
  summary:
    "Hoje o perfil transmite capricho visual, mas ainda nao maximiza descoberta, confianca e conversao no mercado local.",
  businessSummary: [
    "Boa estetica.",
    "Baixa distribuicao.",
    "Baixa autoridade publica.",
    "Baixa previsibilidade de crescimento.",
  ],
  scorecard: {
    localPresence: 3,
    socialAuthority: 4,
    brandHumanization: 3,
    contentStrategy: 4,
    visualIdentity: 7,
    growthPotential: "Alto",
  },
  sections: [
    {
      id: "rede-local",
      title: "Ausencia de colaboracoes e rede local",
      problem:
        "O perfil parece operar isolado. Falta conexao publica com influenciadores locais, parceiros e clientes reais.",
      impact: [
        "Menor alcance organico",
        "Menos prova social",
        "Crescimento mais lento",
        "Baixa autoridade local",
      ],
      improvement: [
        "Collab posts com influenciadoras locais",
        "Parcerias com nutricionista, dermato, salao, academia, fotografa e lojas femininas",
        "Repost de clientes",
        "Programa indique e ganhe",
        "Conteudo com clientes reais autorizado",
      ],
      diagnosis: "Marca pouco integrada ao ecossistema local.",
    },
    {
      id: "google-local",
      title: "Nao aparece no Google",
      problem:
        "Se alguem buscar estetica em Cruz das Almas, ela pode nao estar visivel ou bem posicionada.",
      impact: [
        "Perda de demanda quente",
        "Menos confianca",
        "Concorrentes capturam buscas prontas para comprar",
      ],
      improvement: [
        "Perfil da Empresa no Google",
        "Avaliacoes reais",
        "Fotos atualizadas",
        "Categoria correta",
        "Horario, telefone e mapa completos",
        "Postagens semanais no Google",
        "SEO local no site",
      ],
      diagnosis: "Baixa presenca em canais de intencao imediata.",
    },
    {
      id: "presenca-humana",
      title: "Videos genericos sem presenca humana e voz artificial",
      problem: "Conteudo frio, pouco memoravel e facilmente ignorado.",
      impact: [
        "Menor retencao",
        "Menor conexao emocional",
        "Baixa diferenciacao",
        "Menos confianca",
      ],
      improvement: [
        "Tereza aparecendo em video",
        "Voz real",
        "Bastidores",
        "Explicando procedimentos",
        "Antes e depois narrado",
        "Cliente falando da experiencia",
      ],
      diagnosis: "A marca aparece menos que os templates.",
    },
    {
      id: "estrategia-conteudo",
      title: "Imagens bonitas com engajamento baixo por falta de estrategia",
      problem: "Estetica visual existe, mas o sistema de conteudo ainda nao.",
      impact: [
        "Feed bonito sem vendas proporcionais",
        "Alcance instavel",
        "Tempo gasto com pouco retorno",
      ],
      improvement: [
        "Calendario editorial",
        "Conteudo por funil",
        "CTA claro",
        "Reels focados em retencao",
        "Prova social recorrente",
        "Temas baseados em dores reais",
        "Teste A/B de formatos",
      ],
      diagnosis: "Boa execucao visual, baixa eficiencia estrategica.",
    },
  ],
  closingNote:
    "Esse tipo de leitura vende servico melhor que critica solta, porque traduz sinais dispersos em argumento de negocio claro.",
};
