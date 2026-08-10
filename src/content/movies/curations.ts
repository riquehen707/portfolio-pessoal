export type MovieCurationItem = {
  movie: string;
  position?: number;
  context: string;
};

export type MovieCuration = {
  slug: string;
  title: string;
  href: string;
  items: MovieCurationItem[];
};

export const movieCurations: MovieCuration[] = [
  {
    slug: "melhores-filmes-terror-seculo-21",
    title: "23 melhores filmes de terror do século XXI até agora",
    href: "/blog/melhores-filmes-terror-seculo-21",
    items: [
      { movie: "host-2020", position: 23, context: "Registra a ansiedade do isolamento e transforma limites de uma chamada de vídeo em ferramentas precisas de suspense." },
      { movie: "x-a-marca-da-morte", position: 22, context: "Revisita o slasher rural pela tensão entre desejo, juventude, envelhecimento e a ideia de quem pode ser olhado." },
      { movie: "as-boas-maneiras", position: 21, context: "Faz uma criatura clássica nascer de relações brasileiras de classe, trabalho, maternidade e desejo." },
      { movie: "one-cut-of-the-dead", position: 20, context: "Reinventa o cinema de zumbi como comédia afetuosa sobre improviso e trabalho coletivo." },
      { movie: "o-que-ficou-para-tras", position: 19, context: "Usa a casa assombrada sem transformar trauma, refúgio e burocracia em metáforas decorativas." },
      { movie: "quando-o-mal-espreita", position: 18, context: "Retira a possessão dos trilhos habituais do exorcismo e cria regras comunitárias incompletas." },
      { movie: "grave", position: 17, context: "Liga amadurecimento, corpo, desejo e apetite sem reduzir uma transformação à ilustração de uma tese." },
      { movie: "invasao-zumbi", position: 16, context: "Coreografa infectados em espaços apertados com clareza e mantém peso emocional dentro da ação." },
      { movie: "abismo-do-medo", position: 15, context: "Constrói terror com geografia, pedra e escuridão antes mesmo de revelar suas criaturas." },
      { movie: "jogos-mortais", position: 14, context: "Entra pela eficiência de seu conceito independente e pela influência difícil de contornar no horror dos anos 2000." },
      { movie: "a-substancia", position: 13, context: "Leva a cobrança por juventude e perfeição corporal a uma escala grotesca, cômica e deliberadamente excessiva." },
      { movie: "rec", position: 12, context: "Dá motivo concreto para a câmera permanecer ligada e comprime espaço e informação com ritmo exemplar." },
      { movie: "corrente-do-mal", position: 11, context: "Transforma pessoas distantes e fundos de quadro em fontes permanentes de dúvida." },
      { movie: "o-babadook", position: 10, context: "Permite que conflito doméstico e criatura sobrenatural sejam concretos ao mesmo tempo." },
      { movie: "o-lamento", position: 9, context: "Mistura investigação, ritual e humor desconfortável para construir e corroer certezas sucessivas." },
      { movie: "sob-a-pele", position: 8, context: "Oferece a experiência mais experimental da lista, sustentada por som, montagem e um olhar radical sobre o corpo." },
      { movie: "hereditario", position: 7, context: "Transforma a maneira como uma família ocupa a casa e evita o luto em matéria de terror sobrenatural." },
      { movie: "a-bruxa", position: 6, context: "Faz pesquisa histórica determinar o que os personagens conseguem imaginar como causa da própria ruína." },
      { movie: "exterminio", position: 5, context: "Mudou o pulso do apocalipse no cinema sem abrir mão de fragilidade humana e violência política." },
      { movie: "deixe-ela-entrar", position: 4, context: "Renova o vampiro por meio de solidão, dependência e uma relação que resiste a classificações confortáveis." },
      { movie: "kairo", position: 3, context: "Percebeu cedo que conexão técnica e solidão poderiam crescer juntas e permaneceu inquietante depois da novidade tecnológica." },
      { movie: "corra", position: 2, context: "Faz a sátira racial operar como o próprio mecanismo de suspense, sem interromper o gênero para explicar sua leitura." },
      { movie: "o-hospedeiro", position: 1, context: "Combina monstro, ação, comédia familiar e sátira institucional sem perder movimento, emoção ou estranheza." },
    ],
  },
];

export function getCurationsForMovie(slug: string) {
  return movieCurations.flatMap((curation) => {
    const item = curation.items.find((entry) => entry.movie === slug);
    return item ? [{ ...curation, item }] : [];
  });
}
