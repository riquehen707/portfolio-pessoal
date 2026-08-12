export type MovieListRule = {
  organizationId?: string;
  genres?: string[];
  countries?: string[];
  director?: string;
  yearFrom?: number;
  yearTo?: number;
};

export type MovieListItem = { movieId: string; position?: number; context?: string };

export type MovieList = {
  id: string;
  slug: string;
  title: string;
  href: string;
  mode: "automatic" | "editorial" | "hybrid";
  rules?: MovieListRule;
  items: MovieListItem[];
  excludeMovieIds?: string[];
};

export type MovieCuration = MovieList;

type ListMovie = {
  id: string; year: number; genres: string[]; countries: string[]; directors: string[];
  organizationRelationships: Array<{ organizationId: string }>;
};

export function resolveMovieList(list: MovieList, catalog: readonly ListMovie[]) {
  const byId = new Map(catalog.map((movie) => [movie.id, movie]));
  const matchesRules = (movie: ListMovie) => {
    const rules = list.rules;
    if (!rules) return true;
    if (rules.organizationId && !movie.organizationRelationships.some((item) => item.organizationId === rules.organizationId)) return false;
    if (rules.genres?.length && !rules.genres.some((genre) => movie.genres.includes(genre))) return false;
    if (rules.countries?.length && !rules.countries.some((country) => movie.countries.includes(country))) return false;
    if (rules.director && !movie.directors.includes(rules.director)) return false;
    if (rules.yearFrom && movie.year < rules.yearFrom) return false;
    if (rules.yearTo && movie.year > rules.yearTo) return false;
    return true;
  };
  const automatic = catalog.filter(matchesRules).sort((a, b) => a.year - b.year || a.id.localeCompare(b.id));
  if (list.mode === "automatic") return automatic;
  const selected = list.items.map((item) => byId.get(item.movieId)).filter((movie): movie is ListMovie => Boolean(movie));
  if (list.mode === "editorial") return selected;
  const excluded = new Set(list.excludeMovieIds ?? []);
  return [...selected, ...automatic.filter((movie) => !selected.some((item) => item.id === movie.id) && !excluded.has(movie.id))];
}

export const movieCurations: MovieList[] = [{
  id: "list_horror_21st_century",
  slug: "melhores-filmes-terror-seculo-21",
  title: "23 melhores filmes de terror do século XXI até agora",
  href: "/blog/melhores-filmes-terror-seculo-21",
  mode: "editorial",
  items: [
    ["mov_75b3ac",23,"Registra a ansiedade do isolamento e transforma limites de uma chamada de vídeo em ferramentas precisas de suspense."],
    ["mov_08e6f1",22,"Revisita o slasher rural pela tensão entre desejo, juventude, envelhecimento e a ideia de quem pode ser olhado."],
    ["mov_ca273d",21,"Faz uma criatura clássica nascer de relações brasileiras de classe, trabalho, maternidade e desejo."],
    ["mov_4f9b62",20,"Reinventa o cinema de zumbi como comédia afetuosa sobre improviso e trabalho coletivo."],
    ["mov_62d0a9",19,"Usa a casa assombrada sem transformar trauma, refúgio e burocracia em metáforas decorativas."],
    ["mov_97a260",18,"Retira a possessão dos trilhos habituais do exorcismo e cria regras comunitárias incompletas."],
    ["mov_a38f04",17,"Liga amadurecimento, corpo, desejo e apetite sem reduzir uma transformação à ilustração de uma tese."],
    ["mov_46ed93",16,"Coreografa infectados em espaços apertados com clareza e mantém peso emocional dentro da ação."],
    ["mov_e4507c",15,"Constrói terror com geografia, pedra e escuridão antes mesmo de revelar suas criaturas."],
    ["mov_eb8514",14,"Entra pela eficiência de seu conceito independente e pela influência difícil de contornar no horror dos anos 2000."],
    ["mov_68be30",13,"Leva a cobrança por juventude e perfeição corporal a uma escala grotesca, cômica e deliberadamente excessiva."],
    ["mov_3c085e",12,"Dá motivo concreto para a câmera permanecer ligada e comprime espaço e informação com ritmo exemplar."],
    ["mov_0b84dd",11,"Transforma pessoas distantes e fundos de quadro em fontes permanentes de dúvida."],
    ["mov_f51942",10,"Permite que conflito doméstico e criatura sobrenatural sejam concretos ao mesmo tempo."],
    ["mov_ae39c4",9,"Mistura investigação, ritual e humor desconfortável para construir e corroer certezas sucessivas."],
    ["mov_1a74cf",8,"Oferece a experiência mais experimental da lista, sustentada por som, montagem e um olhar radical sobre o corpo."],
    ["mov_b40e92",7,"Transforma a maneira como uma família ocupa a casa e evita o luto em matéria de terror sobrenatural."],
    ["mov_2d815f",6,"Faz pesquisa histórica determinar o que os personagens conseguem imaginar como causa da própria ruína."],
    ["mov_d12a77",5,"Mudou o pulso do apocalipse no cinema sem abrir mão de fragilidade humana e violência política."],
    ["mov_91f72b",4,"Renova o vampiro por meio de solidão, dependência e uma relação que resiste a classificações confortáveis."],
    ["mov_823fa1",3,"Percebeu cedo que conexão técnica e solidão poderiam crescer juntas e permaneceu inquietante depois da novidade tecnológica."],
    ["mov_7c1f3a",2,"Faz a sátira racial operar como o próprio mecanismo de suspense, sem interromper o gênero para explicar sua leitura."],
    ["mov_c71a05",1,"Combina monstro, ação, comédia familiar e sátira institucional sem perder movimento, emoção ou estranheza."],
  ].map(([movieId, position, context]) => ({ movieId: String(movieId), position: Number(position), context: String(context) })),
}];

export function getCurationsForMovie(movieId: string) {
  return movieCurations.flatMap((curation) => {
    const item = curation.items.find((entry) => entry.movieId === movieId);
    return item ? [{ ...curation, item }] : [];
  });
}
