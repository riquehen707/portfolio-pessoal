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
  title: "31 melhores filmes de terror do século XXI",
  href: "/blog/melhores-filmes-terror-seculo-21",
  mode: "editorial",
  items: [
    ["mov_75b3ac",31,"Transforma a interface de uma chamada de vídeo em espaço assombrado sem depender apenas da curiosidade pandêmica."],
    ["mov_08e6f1",30,"Recupera o slasher rural pela tensão entre desejo, juventude, envelhecimento e a fabricação de imagens."],
    ["mov_4f9b62",29,"Reinventa o cinema de zumbi como comédia afetuosa sobre improviso e trabalho coletivo."],
    ["mov_ca273d",28,"Faz uma criatura clássica nascer de relações brasileiras de classe, trabalho, maternidade e desejo."],
    ["mov_62d0a9",27,"Usa a casa assombrada sem transformar refúgio, culpa e burocracia em metáforas decorativas."],
    ["mov_97a260",26,"Retira a possessão dos trilhos habituais do exorcismo e imagina o mal como crise rural e comunitária."],
    ["mov_b731d8",25,"Atualiza a possessão como ritual social adolescente, com regras legíveis e consequências físicas convincentes."],
    ["mov_46ed93",24,"Coreografa infectados em espaços apertados com clareza e mantém peso emocional dentro da ação."],
    ["mov_e4507c",23,"Constrói terror com geografia, pedra e escuridão antes mesmo de revelar suas criaturas."],
    ["mov_eb8514",22,"Entra pela eficiência do conceito independente e pela influência difícil de contornar no horror comercial dos anos 2000."],
    ["mov_hor_2007_orfanato",21,"Conduz a assombração clássica como melodrama de luto sem trocar atmosfera por explicações excessivas."],
    ["mov_hor_2008_lake_mungo",20,"Usa o falso documentário para fazer imagens domésticas acumularem ausência, segredo e uma inquietação tardia."],
    ["mov_3c085e",19,"Dá motivo concreto para a câmera permanecer ligada e comprime espaço e informação com ritmo exemplar."],
    ["mov_0b84dd",18,"Transforma pessoas distantes e fundos de quadro em fontes permanentes de dúvida."],
    ["mov_f51942",17,"Permite que conflito doméstico e criatura sobrenatural sejam concretos ao mesmo tempo."],
    ["mov_19c6be",16,"Faz arquitetura, cor e memória sustentarem um melodrama gótico cuja forma continua inquietante."],
    ["mov_hor_2010_black_swan",15,"Converte disciplina artística, competição e percepção corporal em espetáculo psicológico de grande precisão sensorial."],
    ["mov_hor_2011_kill_list",14,"Muda de drama doméstico e crime contratado para folk horror sem oferecer passagem confortável entre os gêneros."],
    ["mov_hor_2011_piel",13,"Une melodrama e horror corporal para examinar controle, identidade e violência médica por uma forma singular."],
    ["mov_a38f04",12,"Liga amadurecimento, corpo, desejo e apetite sem reduzir a transformação à ilustração de uma tese."],
    ["mov_hor_2021_titane",11,"Empurra o body horror a um território metálico e imprevisível, mas encontra afeto onde seria fácil buscar apenas choque."],
    ["mov_68be30",10,"Leva a cobrança por juventude e perfeição corporal a uma escala grotesca, cômica e deliberadamente excessiva."],
    ["mov_ae39c4",9,"Mistura investigação, ritual e humor desconfortável para construir e corroer certezas sucessivas."],
    ["mov_1a74cf",8,"Sustenta uma experiência radical por som, montagem e um olhar não humano sobre desejo e corpo."],
    ["mov_b40e92",7,"Transforma a maneira como uma família ocupa a casa e evita o luto em matéria de terror sobrenatural."],
    ["mov_2d815f",6,"Faz pesquisa histórica determinar o que os personagens conseguem imaginar como causa da própria ruína."],
    ["mov_d12a77",5,"Mudou o pulso do apocalipse no cinema sem abrir mão de fragilidade humana e violência política."],
    ["mov_91f72b",4,"Renova o vampiro por meio de solidão, dependência e uma relação que resiste a classificações confortáveis."],
    ["mov_823fa1",3,"Percebeu cedo que conexão técnica e solidão poderiam crescer juntas e permaneceu inquietante além da novidade tecnológica."],
    ["mov_7c1f3a",2,"Faz a sátira racial operar como o próprio mecanismo do suspense, sem interromper o gênero para explicar sua leitura."],
    ["mov_c71a05",1,"Combina monstro, ação, comédia familiar e sátira institucional sem perder movimento, emoção ou estranheza."],
  ].map(([movieId, position, context]) => ({ movieId: String(movieId), position: Number(position), context: String(context) })),
}, {
  id: "list_best_movies_2025",
  slug: "melhores-filmes-de-2025",
  title: "23 melhores filmes de 2025",
  href: "/blog/melhores-filmes-de-2025",
  mode: "editorial",
  items: [
    ["mov_2025_homem_com_h",23,"Transforma a cinebiografia musical em estudo de corpo, voz e presença, mesmo quando percorre etapas conhecidas do formato."],
    ["mov_hor_2025_weapons",22,"Usa uma estrutura coral para fazer o desaparecimento de crianças contaminar professores, famílias e toda uma comunidade."],
    ["mov_2025_superman",21,"Recupera cor, bondade e aventura coletiva para um cinema de super-herói que não trata esperança como ingenuidade."],
    ["mov_2025_28_years_later",20,"Retorna ao apocalipse com imagens digitais agressivas e uma reflexão inesperada sobre morte, infância e rituais de cuidado."],
    ["mov_2025_black_bag",19,"Mostra que espionagem adulta pode caber em 93 minutos quando diálogo, casamento e vigilância trabalham na mesma tensão."],
    ["mov_2025_best_mother",18,"Encontra dignidade e movimento numa fuga materna sem suavizar violência doméstica, trabalho precário ou risco social."],
    ["mov_2025_arco",17,"Combina viagem no tempo, crise climática e desenho luminoso numa animação infantil que não subestima adultos nem crianças."],
    ["mov_2025_sorry_baby",16,"Trata trauma pelo tempo quebrado da experiência e encontra humor sem converter dor em lição edificante."],
    ["mov_2025_frankenstein",15,"Guillermo del Toro assume o melodrama e o artesanato para devolver abandono, paternidade e desejo de afeto ao mito."],
    ["mov_2025_voice_hind_rajab",14,"Constrói uma experiência de escuta ética e extenuante ao redor de uma voz real que não pode ser tratada como suspense."],
    ["mov_2025_resurrection",13,"Percorre épocas e formas do cinema como um sonho físico, excessivo e deliberadamente incapaz de caber numa única narrativa."],
    ["mov_2025_sound_of_falling",12,"Faz gestos, espaços e violências atravessarem gerações de mulheres por associações sensoriais, não por explicação linear."],
    ["mov_2025_mastermind",11,"Esvazia o glamour do filme de assalto para observar privilégio, incompetência e fuga com ironia quase invisível."],
    ["mov_2025_hamnet",10,"Converte luto histórico em experiência de corpo, natureza e criação sem reduzir Shakespeare ao monumento posterior."],
    ["mov_2025_blue_trail",9,"Imagina velhice, desejo e resistência na Amazônia com uma ficção especulativa fluvial, tátil e genuinamente livre."],
    ["mov_2025_sirat",8,"Começa como busca no deserto e muda brutalmente de escala, usando música e paisagem para retirar segurança do espectador."],
    ["mov_2025_no_other_choice",7,"Transforma desemprego e competição em sátira visualmente exuberante sobre a violência naturalizada pelo mercado."],
    ["mov_2025_marty_supreme",6,"Empurra ambição, esporte e autopromoção num movimento incessante sem pedir que o carisma absolva seu protagonista."],
    ["mov_30cf85",5,"Faz música, história negra e vampiros participarem da mesma disputa por comunidade, memória e apropriação."],
    ["mov_2025_it_was_just_an_accident",4,"Transforma reconhecimento incerto e desejo de vingança num impasse moral tenso, político e por vezes absurdamente engraçado."],
    ["mov_2025_sentimental_value",3,"Usa cinema, casa e atuação para investigar o que uma família consegue transformar em arte sem reparar inteiramente o dano."],
    ["mov_2025_one_battle_after_another",2,"Organiza ação, comédia, paranoia e afeto familiar numa máquina política expansiva que nunca perde o impulso."],
    ["mov_2025_secret_agent",1,"Faz memória histórica, suspense, humor e textura urbana coexistirem num Recife em que o passado insiste em não permanecer enterrado."],
  ].map(([movieId, position, context]) => ({ movieId: String(movieId), position: Number(position), context: String(context) })),
}, {
  id: "list_best_netflix_brazil_now",
  slug: "melhores-filmes-netflix",
  title: "23 melhores filmes disponíveis na Netflix Brasil agora",
  href: "/blog/melhores-filmes-netflix",
  mode: "editorial",
  items: [
    ["mov_netflix_platform",23,"Converte uma prisão vertical numa alegoria brutal e imediatamente legível sobre escassez, classe e solidariedade."],
    ["mov_netflix_two_popes",22,"Faz de uma divergência institucional uma conversa acessível sobre culpa, mudança e responsabilidade."],
    ["mov_netflix_edge_democracy",21,"Cruza memória familiar e crise política numa perspectiva autoral importante para discutir o Brasil recente."],
    ["mov_netflix_apocalypse_tropics",20,"Atualiza a investigação de Petra Costa ao observar a presença evangélica na política e no imaginário brasileiro."],
    ["mov_netflix_thinking_ending",19,"Desmonta tempo, identidade e memória numa experiência deliberadamente ambígua e pouco domesticada pelo streaming."],
    ["mov_46ed93",18,"Entrega ação de zumbis legível e veloz sem abandonar personagens, classe ou peso emocional."],
    ["mov_netflix_glass_onion",17,"Oferece mistério popular, elenco afiado e uma sátira em que riqueza e estupidez produzem as melhores pistas."],
    ["mov_netflix_nimona",16,"Combina aventura queer, humor e transformação sem reduzir diferença a uma mensagem genérica de aceitação."],
    ["mov_netflix_klaus",15,"Demonstra como desenho, luz e volume podem renovar um conto natalino sem depender de franquia."],
    ["mov_netflix_rebel_ridge",14,"Constrói ação adulta pela estratégia e pelo funcionamento concreto da corrupção policial."],
    ["mov_netflix_okja",13,"Mistura aventura, afeto e sátira corporativa com mudanças de tom que recusam conforto fácil."],
    ["mov_62d0a9",12,"Usa a casa assombrada para tornar concretas as experiências de refúgio, burocracia e culpa."],
    ["mov_netflix_mitchells",11,"Transforma conflito familiar e apocalipse robótico numa animação de invenção visual quase inesgotável."],
    ["mov_netflix_society_snow",10,"Reconstrói uma sobrevivência conhecida com atenção aos corpos, à comunidade e à memória dos mortos."],
    ["mov_netflix_all_quiet",9,"Faz escala técnica trabalhar a favor de uma visão frontalmente antiguerra, física e sem heroísmo confortável."],
    ["mov_netflix_lost_daughter",8,"Permite que maternidade, desejo e culpa permaneçam ambíguos numa atuação central extraordinária."],
    ["mov_netflix_beasts_no_nation",7,"Recusa transformar criança-soldado em espetáculo e sustenta uma experiência de guerra difícil de esquecer."],
    ["mov_netflix_power_dog",6,"Constrói poder e desejo pelo silêncio, pelo espaço e por gestos cujo sentido muda retrospectivamente."],
    ["mov_netflix_edificio_master",5,"Mostra como escuta e presença transformam entrevistas em um retrato inesgotável da vida urbana brasileira."],
    ["mov_netflix_pinocchio",4,"Une stop-motion de grande materialidade a uma fábula sobre luto, desobediência e autoritarismo."],
    ["mov_netflix_marriage_story",3,"Observa um divórcio sem vilão simples e encontra tensão cinematográfica em atuação, diálogo e procedimento jurídico."],
    ["mov_netflix_irishman",2,"Revisa o filme de máfia pela velhice e pelo vazio deixado depois de décadas de violência e lealdade."],
    ["mov_netflix_roma",1,"Transforma memória pessoal, trabalho doméstico e história social numa experiência visual de precisão rara."],
  ].map(([movieId, position, context]) => ({ movieId: String(movieId), position: Number(position), context: String(context) })),
}, {
  id:"list_best_prime_video_brazil_now",slug:"melhores-filmes-prime-video",title:"23 melhores filmes disponíveis no Prime Video Brasil agora",href:"/blog/melhores-filmes-prime-video",mode:"editorial",
  items:[
    ["mov_prime_brittany",23,"Entrega uma comédia de superação que reconhece recaídas, egoísmo e autoimagem além da linha de chegada."],
    ["mov_prime_catherine_birdy",22,"Revê o amadurecimento medieval com humor anacrônico, energia juvenil e uma protagonista que sabota o destino matrimonial."],
    ["mov_prime_uncle_frank",21,"Oferece um drama queer familiar acessível sem apagar as marcas concretas de rejeição e silêncio."],
    ["mov_prime_burial",20,"Faz do tribunal um palco popular para discutir concentração empresarial, raça e poder econômico."],
    ["mov_prime_air",19,"Transforma negociação empresarial conhecida em cinema de diálogo, ritmo e elenco extremamente eficiente."],
    ["mov_prime_my_old_ass",18,"Usa uma premissa fantástica para tratar juventude, desejo e despedida familiar com leveza sem cinismo."],
    ["mov_prime_tangerine",17,"Coloca mulheres trans no centro de uma Los Angeles filmada com velocidade, humor abrasivo e intimidade de rua."],
    ["mov_prime_blow_man_down",16,"Encontra crime, humor e poder feminino sob a superfície de uma pequena comunidade costeira."],
    ["mov_prime_report",15,"Mostra investigação e burocracia como campo de batalha num thriller político sustentado por documentos."],
    ["mov_prime_honey_boy",14,"Transforma memória autobiográfica e abuso infantil numa forma fragmentada que não promete cura limpa."],
    ["mov_prime_big_sick",13,"Renova a comédia romântica ao dar às duas famílias conflito, humor e vida além do casal."],
    ["mov_prime_thirteen_lives",12,"Cria tensão pelo procedimento concreto de um resgate cujo desfecho o público já conhece."],
    ["mov_hor_2018_suspiria",11,"Reimagina o terror de dança como ritual corporal, memória política e obra deliberadamente excessiva."],
    ["mov_prime_saltburn",10,"Entrega provocação, composição visual e uma sátira de classe mais interessante quando aceita sua própria crueldade."],
    ["mov_prime_one_night_miami",9,"Transforma quatro figuras históricas em amigos capazes de discordar sobre fama, arte e responsabilidade política."],
    ["mov_prime_time",8,"Faz duas décadas de imagens familiares condensarem espera, encarceramento e uma história de amor resistente."],
    ["mov_prime_cold_war",7,"Comprime anos, países e separações num romance musical em preto e branco de precisão extraordinária."],
    ["mov_prime_nickel_boys",6,"Usa a primeira pessoa para devolver corpo, memória e presença a jovens submetidos à violência institucional."],
    ["mov_prime_argentina_1985",5,"Torna um julgamento histórico acessível sem perder o peso dos testemunhos nem a fragilidade institucional."],
    ["mov_prime_a_hero",4,"Faz um gesto de honestidade se transformar num labirinto de reputação, dívida e versões públicas."],
    ["mov_prime_paterson",3,"Encontra criação e poesia na rotina sem fabricar grandes crises para justificar a atenção ao cotidiano."],
    ["mov_prime_handmaiden",2,"Articula desejo, engano e perspectiva numa narrativa sensual cuja forma muda junto com suas alianças."],
    ["mov_prime_manchester",1,"Recusa curar o luto por conveniência dramática e encontra humanidade, humor e afeto dentro dessa recusa."],
  ].map(([movieId,position,context])=>({movieId:String(movieId),position:Number(position),context:String(context)})),
}];

export function getCurationsForMovie(movieId: string) {
  return movieCurations.flatMap((curation) => {
    const item = curation.items.find((entry) => entry.movieId === movieId);
    return item ? [{ ...curation, item }] : [];
  });
}
