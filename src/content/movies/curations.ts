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
  title: "Os melhores filmes de 2025 que ainda valem a pena assistir",
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
}, {
  id:"list_best_movies_2026_so_far",slug:"melhores-filmes-de-2026",title:"23 melhores filmes de 2026 até agora e lançamentos promissores",href:"/blog/melhores-filmes-de-2026",mode:"editorial",
  items:[
    ["mov_2026_toy_story_5",14,"Enfrenta a troca dos brinquedos pelas telas sem fingir que uma franquia de 30 anos continua no mesmo mundo."],
    ["mov_2026_supergirl",13,"Dá ao cinema de super-herói uma protagonista cósmica menos idealizada e mais marcada pela própria experiência de perda."],
    ["mov_2026_atonement",12,"Faz memória familiar e deslocamento político ocuparem o mesmo espaço sem transformar reparação em resposta simples."],
    ["mov_2026_clarissa",11,"Desloca Mrs Dalloway para Lagos e usa a adaptação para discutir memória, classe e heranças coloniais."],
    ["mov_2026_club_kid",10,"Equilibra humor queer ácido e paternidade tardia sem converter amadurecimento em domesticação automática."],
    ["mov_2026_paper_tiger",9,"Recoloca James Gray no drama criminal em que família e classe importam mais que o mecanismo do golpe."],
    ["mov_2026_camp_miasma",8,"Usa o reboot de slasher para investigar desejo, autoria e a maneira como imagens antigas assombram identidades atuais."],
    ["mov_2026_the_beloved",7,"Transforma um filme dentro do filme em tentativa de aproximação familiar — e em nova forma de controle."],
    ["mov_2026_fatherland",6,"Comprime retorno, exílio e culpa numa viagem de 82 minutos pela Alemanha material e afetivamente dividida."],
    ["mov_2026_project_hail_mary",5,"Faz ciência e cooperação sustentarem um espetáculo popular que confia no prazer de resolver problemas."],
    ["mov_2026_minotaur",4,"Parte de uma crise conjugal e constrói um labirinto criminal ligado à dissociação moral diante da guerra."],
    ["mov_2026_odyssey",3,"Usa a escala técnica para devolver peso físico ao mito, sem reduzir a viagem de Odisseu a uma sucessão de cartões-postais."],
    ["mov_2026_all_of_a_sudden",2,"Transforma duração, conversa e mudanças de idioma numa experiência de intimidade que só existe pela acumulação."],
    ["mov_2026_fjord",1,"Converte um caso comunitário em impasse moral sem oferecer ao espectador um lugar confortável fora do conflito."],
    ["mov_2026_dog_stars",undefined,"Ridley Scott volta ao pós-apocalipse com uma história de escala humana, isolamento e paisagem."],
    ["mov_2026_resident_evil",undefined,"Zach Cregger leva uma história original de Resident Evil ao terror de sobrevivência, sem depender de reencenar protagonistas dos jogos."],
    ["mov_2026_clayface",undefined,"A promessa está em tratar uma propriedade de quadrinhos como horror corporal trágico, com James Watkins na direção."],
    ["mov_2026_social_reckoning",undefined,"Revisitar plataformas digitais depois de quinze anos de consequências políticas pode evitar a nostalgia de The Social Network."],
    ["mov_2026_whalefall",undefined,"Um mergulhador preso dentro de um cachalote dá a Brian Duffield uma premissa de sobrevivência física difícil de confundir com outra."],
    ["mov_2026_sunrise_reaping",undefined,"O interesse depende de explorar propaganda e memória política, não apenas de reconstruir outra arena."],
    ["mov_2026_narnia",undefined,"Greta Gerwig diante de C. S. Lewis é um encontro potencialmente produtivo entre autoria, fé, infância e grande produção."],
    ["mov_2026_dune_three",undefined,"A continuação pode transformar vitória em catástrofe e completar a crítica ao messianismo preparada pelos filmes anteriores."],
    ["mov_2026_werwulf",undefined,"Robert Eggers retorna ao horror histórico, território em que pesquisa, linguagem e textura costumam ser parte da dramaturgia."],
  ].map(([movieId,position,context])=>({movieId:String(movieId),...(position?{position:Number(position)}:{}),context:String(context)})),
}, {
  id:"list_best_leonardo_dicaprio_movies",slug:"melhores-filmes-leonardo-dicaprio",title:"15 melhores filmes de Leonardo DiCaprio",href:"/blog/melhores-filmes-leonardo-dicaprio",mode:"editorial",
  items:[
    ["mov_dicaprio_this_boys_life",15,"Ainda adolescente, DiCaprio enfrenta Robert De Niro sem imitar sua intensidade e encontra medo, orgulho e desafio num mesmo gesto."],
    ["mov_dicaprio_django",14,"Num papel coadjuvante, converte polidez, vaidade e crueldade em ameaça — e aceita ser a parte repulsiva de uma máquina maior."],
    ["mov_dicaprio_inception",13,"Dá peso emocional à engenharia narrativa de Christopher Nolan e impede que Cobb seja apenas o guia das regras do sonho."],
    ["mov_dicaprio_shutter_island",12,"Sustenta o excesso gótico porque deixa trauma, agressividade e desorientação contaminarem até a postura do personagem."],
    ["mov_dicaprio_revenant",11,"A entrega física é evidente, mas o trabalho vale pelo modo como reduz a atuação a respiração, olhar e insistência corporal."],
    ["mov_dicaprio_revolutionary_road",10,"Expõe a covardia e a frustração de Frank Wheeler sem pedir que o espectador confunda infelicidade com profundidade moral."],
    ["mov_dicaprio_aviator",9,"Transforma a deterioração de Howard Hughes num processo gradual, preservando ambição e magnetismo mesmo quando o controle desaparece."],
    ["mov_dicaprio_titanic",8,"Jack funciona porque DiCaprio faz espontaneidade parecer ação dramática e oferece ao melodrama monumental uma presença humana leve."],
    ["mov_dicaprio_gilbert_grape",7,"A precisão precoce impressiona, mas o lugar do filme depende também da vulnerabilidade criada com o restante da família Grape."],
    ["mov_dicaprio_catch_me",6,"Seu charme nunca apaga a adolescência de Frank: cada nova identidade parece simultaneamente triunfo e pedido de socorro."],
    ["mov_dicaprio_departed",5,"Billy Costigan vive sob pressão contínua, e DiCaprio faz ansiedade, raiva e exaustão empurrarem o thriller por dentro."],
    ["mov_dicaprio_wolf_wall_street",4,"Explora timing cômico, fala, corpo e cumplicidade com a câmera para tornar Jordan Belfort sedutor sem convertê-lo em modelo."],
    ["mov_dicaprio_once_hollywood",3,"Rick Dalton reúne insegurança, vaidade e habilidade real; a cena de atuação dentro do filme talvez seja a síntese mais completa de seu ofício."],
    ["mov_dicaprio_killers_flower_moon",2,"Recusa o conforto do anti-herói carismático e interpreta Ernest como alguém fraco, cúmplice e capaz de amar sem deixar de destruir."],
    ["mov_2025_one_battle_after_another",1,"Troca o controle habitual por desorientação cômica e desgaste, servindo ao conjunto em vez de organizar o filme ao redor do próprio prestígio."],
  ].map(([movieId,position,context])=>({movieId:String(movieId),position:Number(position),context:String(context)})),
}, {
  id:"list_best_shark_movies",slug:"melhores-filmes-de-tubarao",title:"15 melhores filmes de tubarão",href:"/blog/melhores-filmes-de-tubarao",mode:"editorial",
  items:[
    ["mov_shark_mega_octopus",15,"Entra como trash de efeitos mínimos e ambição máxima: sua proposta é produzir imagens impossíveis, não suspense plausível."],
    ["mov_shark_no_way_up",14,"Mistura filme de acidente aéreo e sobrevivência submarina com física flexível, mas explora bem a bolsa de ar como cenário."],
    ["mov_shark_reef_stalked",13,"Retoma a contenção de The Reef e liga a perseguição aquática ao trauma, mesmo sem repetir a eficiência do original."],
    ["mov_shark_sharknado",12,"O fenômeno televisivo merece um lugar por assumir completamente a piada: tubarões no tornado são ponto de partida, não culminação."],
    ["mov_shark_under_paris",11,"Leva um tubarão ao Sena para combinar eco-horror, irresponsabilidade institucional e uma escalada final deliciosamente excessiva."],
    ["mov_shark_meg",10,"Transforma o megalodonte em atração de parque e Jason Statham em resposta humana à criatura, com diversão acima do medo."],
    ["mov_shark_bait",9,"Tsunami, supermercado alagado e tubarões formam uma ideia de série B executada com geografia melhor do que a premissa sugere."],
    ["mov_shark_47_meters",8,"Usa profundidade, pouca luz e oxigênio contado para tornar a gaiola no fundo do mar um espaço realmente claustrofóbico."],
    ["mov_shark_jaws_2",7,"Não reinventa o original, mas encontra boa ação marítima e trata Brody como alguém cujo trauma parece paranoia para os demais."],
    ["mov_shark_reef",6,"A água aberta e a relativa sobriedade dos ataques criam vulnerabilidade sem depender de uma criatura digital sempre visível."],
    ["mov_shark_deep_blue_sea",5,"É o grande tubarão-slasher de estúdio: cientistas, instalação inundada, makos inteligentes e mortes construídas como espetáculo."],
    ["mov_shark_shallows",4,"Faz uma praia ensolarada virar tabuleiro de sobrevivência, com distâncias e recursos compreensíveis a cada decisão."],
    ["mov_shark_dangerous_animals",3,"Desloca o predador principal para um serial killer que usa tubarões como espetáculo, renovando o subgênero sem abandonar seus ataques."],
    ["mov_shark_open_water",2,"Reduz a situação a duas pessoas, água e espera; a aparência quase documental torna o abandono mais incômodo que qualquer monstro gigante."],
    ["mov_shark_jaws",1,"Continua no topo porque o tubarão organiza suspense, aventura, conflito político e personagens — não apenas uma sequência de ataques."],
  ].map(([movieId,position,context])=>({movieId:String(movieId),position:Number(position),context:String(context)})),
}, {
  id:"list_best_netflix_horror_brazil_now",slug:"melhores-filmes-terror-netflix",title:"23 melhores filmes de terror disponíveis na Netflix Brasil agora",href:"/blog/melhores-filmes-terror-netflix",mode:"editorial",
  items:[
    ["mov_nh_ziam",23,"Combina zumbis e muay thai com a clareza de quem sabe que a graça está no impacto físico, não numa mitologia complicada."],
    ["mov_nh_outside",22,"Troca a corrida constante por um drama familiar filipino em que a casa segura também funciona como prisão."],
    ["mov_nh_alive",21,"Explora isolamento, telas e cooperação com ritmo de videogame sem esquecer a solidão do apartamento."],
    ["mov_nh_cargo",20,"Usa o apocalipse como limite temporal para uma história de paternidade, cuidado e paisagem australiana."],
    ["mov_nh_blood_red_sky",19,"Coloca vampiro e sequestro aéreo na mesma cabine e encontra tensão na tentativa de uma mãe controlar o próprio monstro."],
    ["mov_shark_under_paris",18,"Transforma o Sena em palco de eco-horror e irresponsabilidade pública antes de abraçar uma escalada deliciosamente absurda."],
    ["mov_nh_no_one_gets_out_alive",17,"Faz exploração de imigrantes, casa assombrada e criatura prática participarem da mesma ameaça."],
    ["mov_nh_trip",16,"Converte uma crise conjugal homicida em comédia física brutal, recomendada a quem gosta do humor mais cruel."],
    ["mov_nh_fear_street_1994",15,"Abre a trilogia com slasher pop, romance queer e uma cidade cuja desigualdade organiza até suas maldições."],
    ["mov_nh_fear_street_1666",14,"Reinterpreta a caça às bruxas da série e dá sentido político ao mecanismo que parecia apenas sobrenatural."],
    ["mov_nh_fear_street_1978",13,"É a parte mais eficiente como slasher isolado: acampamento, irmãs e violência que não elimina a melancolia."],
    ["mov_nh_sister_death",12,"Paco Plaza usa arquitetura, silêncio e repressão religiosa com mais precisão que sustos em série."],
    ["mov_nh_apostle",11,"Constrói pacientemente uma comunidade de fé e exploração até liberar a violência corporal de Gareth Evans."],
    ["mov_nh_incantation",10,"Usa o found footage para implicar o olhar do público num ritual, em vez de apenas simular material encontrado."],
    ["mov_nh_call",9,"A ligação entre duas épocas vira duelo de poder, com regras temporais usadas para apertar a crueldade."],
    ["mov_nh_perfection",8,"Assume reviravoltas e body horror como ferramentas de uma vingança excessiva; sutileza não é a proposta."],
    ["mov_nh_1922",7,"Encontra horror no trabalho lento da culpa, na deterioração da terra e numa família destruída pela posse."],
    ["mov_nh_el_conde",6,"Transforma Pinochet em vampiro para falar de impunidade, patrimônio e herdeiros com humor fúnebre."],
    ["mov_netflix_platform",5,"Sua prisão vertical continua sendo uma alegoria brutal, simples de compreender e difícil de descartar."],
    ["mov_nh_geralds_game",4,"Sustenta uma situação quase imóvel pela performance, pelo conflito interno e por imagens físicas nada confortáveis."],
    ["mov_netflix_thinking_ending",3,"É a escolha mais experimental: memória, identidade e tempo se desfazem sem oferecer uma solução única."],
    ["mov_2025_frankenstein",2,"Guillermo del Toro devolve ao monstro escala artesanal, abandono e desejo de pertencimento, sem reduzir o gótico a decoração."],
    ["mov_62d0a9",1,"Faz da casa assombrada uma forma concreta para o trauma do refúgio, a culpa e a violência burocrática."],
  ].map(([movieId,position,context])=>({movieId:String(movieId),position:Number(position),context:String(context)})),
}, {
  id:"list_best_vampire_movies",slug:"melhores-filmes-de-vampiro",title:"Melhores filmes de vampiro e onde assistir",href:"/blog/melhores-filmes-de-vampiro",mode:"editorial",
  items:[
    ["mov_vamp_nosferatu_1922","Fez do vampiro uma presença de arquitetura, sombra e epidemia — uma imagem que o gênero ainda revisita."],
    ["mov_vamp_dracula_1931","Bela Lugosi consolidou o conde aristocrático e sedutor, ainda que o ritmo revele a transição para o cinema sonoro."],
    ["mov_vamp_vampyr_1932","Troca a autoridade do monstro pela instabilidade de um sonho e continua sendo a escolha mais experimental entre os fundadores."],
    ["mov_vamp_horror_dracula_1958","Christopher Lee e a cor da Hammer devolvem velocidade, erotismo e ameaça física ao mito."],
    ["mov_vamp_daughters_darkness","Usa a vampira para expor desejo e violência conjugal dentro de um hotel tão elegante quanto hostil."],
    ["mov_vamp_ganja_hess","Recusa o molde europeu para aproximar sangue, vida negra, religião, dependência e desejo numa forma fragmentada."],
    ["mov_vamp_martin_1977","Romero pergunta o que sobra do vampiro quando dentes e sobrenatural podem ser apenas crença e violência humana."],
    ["mov_vamp_nosferatu_1979","Herzog encontra solidão no monstro e transforma a peste numa paisagem contemplativa de fim do mundo."],
    ["mov_vamp_hunger_1983","Faz a imortalidade colidir com envelhecimento corporal, desejo queer e a crueldade de promessas eternas."],
    ["mov_vamp_fright_night_1985","Equilibra comédia, sensualidade e efeitos práticos sem tratar seu adolescente fã de terror como mera piada."],
    ["mov_vamp_lost_boys","Entende o vampiro como tribo juvenil: perigosa, atraente e capaz de oferecer pertencimento instantâneo."],
    ["mov_vamp_dracula_1992","Abraça o excesso romântico e transforma truques ópticos antigos em uma das adaptações visualmente mais inventivas de Drácula."],
    ["mov_vamp_cronos","Substitui o castelo por um objeto mecânico e encontra família, vício e medo de envelhecer dentro do horror corporal."],
    ["mov_vamp_interview","Leva a sério a duração emocional da imortalidade e a ideia de uma família incapaz de crescer junta."],
    ["mov_vamp_blade","Provou que vampiros também podiam sustentar ação de quadrinhos, artes marciais e uma mitologia urbana industrial."],
    ["mov_vamp_shadow","Transforma a própria filmagem de Nosferatu numa sátira amarga sobre autoria, exploração e obsessão pela imagem."],
    ["mov_vamp_hunter_d","A animação combina futuro, faroeste e gótico num mundo em que o híbrido é caçador e estrangeiro em todos os lados."],
    ["mov_91f72b","Renova o vampiro por meio de solidão, dependência e uma relação infantil impossível de classificar confortavelmente."],
    ["mov_vamp_thirst","Park Chan-wook converte fé, culpa e desejo em transformação corporal com humor sombrio e violência abrupta."],
    ["mov_vamp_only_lovers","Imagina a eternidade menos como poder que como cansaço cultural compartilhado por um casal antigo."],
    ["mov_vamp_what_we_do","Encontra comédia nas regras domésticas da imortalidade sem esvaziar o afeto entre seus monstros ridículos."],
    ["mov_vamp_girl_walks","Inverte a ameaça da mulher sozinha à noite e usa a vampira como figura de autonomia, desejo e punição."],
    ["mov_nh_el_conde","Transforma Pinochet em vampiro para tornar literal uma elite que não morre, não responde e continua transmitindo patrimônio."],
    ["mov_hor_2024_nosferatu","Robert Eggers recupera o peso folclórico da criatura e devolve desejo, doença e repressão ao centro do gótico."],
    ["mov_30cf85","Faz vampirismo, música negra, comunidade e apropriação cultural participarem da mesma disputa histórica."],
  ].map(([movieId,context])=>({movieId:String(movieId),context:String(context)})),
}, {
  id:"list_best_netflix_animation_brazil_now",slug:"melhores-filmes-animacao-netflix",title:"23 melhores filmes de animação disponíveis na Netflix Brasil agora",href:"/blog/melhores-filmes-animacao-netflix",mode:"editorial",
  items:[
    ["mov_na_magicians_elephant",23,"Oferece fantasia clássica e acolhedora para crianças, com desafios claros e uma ideia simples de esperança coletiva."],
    ["mov_na_vivo",22,"Usa música, deslocamento e desenho colorido para falar de despedida sem tornar o luto pesado demais para os menores."],
    ["mov_na_leo",21,"Encontra observações gentis sobre escola e crescimento dentro de uma comédia musical assumidamente falante."],
    ["mov_na_willoughbys",20,"Transforma pais terríveis e abandono em humor de livro ilustrado, preservando a busca das crianças por uma família possível."],
    ["mov_na_over_moon",19,"Combina musical, mitologia chinesa e ficção científica para tratar a dificuldade de aceitar uma nova configuração familiar."],
    ["mov_na_orion_dark",18,"Não reduz ansiedade infantil a uma lição simples e permite que a própria narrativa revele suas camadas de invenção."],
    ["mov_na_sea_beast",17,"Entrega aventura marítima de grande escala enquanto pergunta quem escreve a história oficial dos monstros."],
    ["mov_na_chicken_run_nugget",16,"A Aardman converte uma fábrica automatizada em cenário de assalto e mantém o humor físico do stop-motion."],
    ["mov_na_my_fathers_dragon",15,"A Cartoon Saloon troca grandiosidade por desenho expressivo e uma amizade em que duas crianças carregam responsabilidades excessivas."],
    ["mov_na_ultraman_rising",14,"Usa kaiju e super-herói como moldura para uma história de paternidade, cuidado e legado visualmente elástica."],
    ["mov_na_kpop_demon_hunters",13,"Faz música pop, ação e amizade moverem a narrativa em vez de funcionarem como produtos separados."],
    ["mov_na_wallace_gromit_vengeance",12,"É uma aula compacta de comédia visual, ritmo e atuação em massinha, acessível sem ser descartável."],
    ["mov_netflix_klaus",11,"Demonstra como desenho bidimensional, luz e volume podem renovar uma tradição natalina sem imitar animação 3D."],
    ["mov_netflix_mitchells",10,"Mistura rabiscos, memes e cinema de ação para transformar um conflito familiar numa explosão gráfica coerente."],
    ["mov_na_apollo_10_half",9,"Richard Linklater usa rotoscopia para aproximar memória, cultura pop e fantasia infantil sem transformar a corrida espacial em aula."],
    ["mov_na_wendell_wild",8,"Henry Selick e Jordan Peele constroem uma fantasia punk sobre luto, culpa e cidades exploradas por interesses privados."],
    ["mov_na_the_house",7,"Três equipes de stop-motion fazem da mesma casa uma antologia adulta sobre consumo, obsessão e sobrevivência."],
    ["mov_na_lost_body",6,"A viagem de uma mão decepada por Paris transforma corpo, memória e acaso em romance surreal para adultos."],
    ["mov_ghb_1997_mononoke",5,"Recusa dividir natureza e indústria entre inocentes e vilões, sustentando uma fantasia política de rara ambiguidade."],
    ["mov_ghb_2013_kaguya",4,"O desenho parece nascer diante dos olhos e dá movimento físico à liberdade e ao confinamento de sua protagonista."],
    ["mov_netflix_pinocchio",3,"O stop-motion de Guillermo del Toro devolve peso à madeira e usa a desobediência para confrontar luto e autoritarismo."],
    ["mov_ghb_2001_chihiro",2,"Combina aventura, trabalho, consumo e transformação num mundo fantástico que continua legível em várias idades."],
    ["mov_netflix_nimona",1,"Une aventura queer, humor e mudança de forma sem reduzir identidade a mensagem abstrata nem juventude a público secundário."],
  ].map(([movieId,position,context])=>({movieId:String(movieId),position:Number(position),context:String(context)})),
}];

export function getCurationsForMovie(movieId: string) {
  return movieCurations.flatMap((curation) => {
    const item = curation.items.find((entry) => entry.movieId === movieId);
    return item ? [{ ...curation, item }] : [];
  });
}
