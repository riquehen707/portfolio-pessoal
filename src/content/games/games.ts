import { GameBatchSchema, type Game } from "./gameSchema";

const steamMedia = (slug: string, appId: number, title: string) => ({
  cover: {
    src: `/images/games/${slug}-cover.jpg`,
    alt: `Capa oficial de ${title}`,
    sourceUrl: `https://store.steampowered.com/app/${appId}/`,
    credit: "Material promocional oficial distribuído na Steam",
    rights: "official-promotional" as const,
    width: 1200,
    height: 1800,
  },
  heroImage: {
    src: `/images/games/${slug}-hero.jpg`,
    alt: `Arte promocional oficial de ${title}`,
    sourceUrl: `https://store.steampowered.com/app/${appId}/`,
    credit: "Material promocional oficial distribuído na Steam",
    rights: "official-promotional" as const,
    width: 460,
    height: 215,
  },
  screenshots: [1, 2].map((number) => ({
    src: `/images/games/${slug}-screenshot-${number}.jpg`,
    alt: `Cena de jogabilidade de ${title}`,
    sourceUrl: `https://store.steampowered.com/app/${appId}/`,
    credit: "Captura oficial distribuída na Steam",
    rights: "official-promotional" as const,
    width: 600,
    height: 338,
  })),
  steamUrl: `https://store.steampowered.com/app/${appId}/`,
});

const published = {
  contentType: "game" as const,
  schemaVersion: 1,
  status: "published" as const,
  aliases: [],
  relatedArticleSlugs: [],
  createdAt: "2026-08-26",
  publishedAt: "2026-08-26",
  updatedAt: "2026-08-26",
};

const entries = [
  {
    ...published,
    ...steamMedia("dandara", 612390, "Dandara"),
    id: "game_dandara_2018",
    slug: "dandara",
    title: "Dandara",
    originalTitle: "Dandara",
    releaseDate: "2018-02-06",
    year: 2018,
    organizationRelationships: [{ organizationId: "org_long_hat_house", roles: ["development"] }],
    countries: ["Brasil"],
    brazilianConnection: [
      {
        type: "brazilian-studio",
        description: "Desenvolvido pela Long Hat House, estúdio independente de Belo Horizonte.",
      },
      {
        type: "brazilian-cultural-reference",
        description:
          "A protagonista é inspirada em Dandara dos Palmares; o universo fictício não reconta literalmente sua história.",
      },
    ],
    genres: ["Ação", "Aventura"],
    subgenres: ["Metroidvania", "Plataforma"],
    tags: ["exploração não linear", "movimento", "pixel art"],
    platforms: [
      "PC",
      "macOS",
      "Linux",
      "Nintendo Switch",
      "PlayStation 4",
      "Xbox One",
      "iOS",
      "Android",
    ],
    modes: ["Um jogador"],
    perspective: ["2D lateral"],
    description:
      "Um metroidvania em que Dandara não caminha: ela salta entre superfícies, reorganizando orientação, combate e leitura do mapa.",
    editorialSummary:
      "O deslocamento por saltos não é só um controle diferente. Ele transforma paredes e tetos em rotas equivalentes e obriga cada sala a ensinar onde é possível pousar.",
    whyItMatters:
      "Dandara mostra como uma restrição de movimento pode organizar um jogo inteiro e liga uma protagonista inspirada em figura histórica brasileira a um mundo próprio.",
    gameplay:
      "Dandara mira uma superfície válida e se projeta até ela. Distância, ângulo, carga e posição dos pontos de pouso determinam exploração e combate.",
    artDirection:
      "A pixel art usa orientação instável, arquitetura fragmentada e referências brasileiras dentro do mundo fantástico de Sal, preservando a legibilidade dos pontos de pouso.",
    narrative:
      "A heroína enfrenta forças de opressão no universo de Sal. A Long Hat House esclarece que o nome parte de Dandara dos Palmares, mas o jogo não narra sua história real.",
    soundAndMusic:
      "A trilha alterna contemplação, estranhamento e urgência, acompanhando a exploração sem precisar explicar o espaço construído pela arte.",
    developmentContext:
      "A Long Hat House partiu de uma mecânica para telas de toque e a adaptou a controles. O estúdio abandonou uma representação literal da escravidão por reconhecer que o tema exigiria outra pesquisa.",
    officialWebsite: "https://longhathouse.com/dandara/",
    seo: {
      title: "Dandara: jogo, história e análise | Henrique Reis",
      description:
        "Conheça Dandara, da Long Hat House: movimento, metroidvania, direção artística e inspiração em Dandara dos Palmares.",
    },
    sources: [
      {
        title: "Dandara dos Palmares — Long Hat House",
        url: "https://longhathouse.com/dandara-dos-palmares/",
      },
      {
        title: "Entrevista com a Long Hat House",
        url: "https://www.gameblast.com.br/2016/06/dandara-android-ios-entrevista.html",
      },
    ],
  },
  {
    ...published,
    ...steamMedia("unsighted", 1062110, "UNSIGHTED"),
    id: "game_unsighted_2021",
    slug: "unsighted",
    title: "UNSIGHTED",
    releaseDate: "2021-09-30",
    year: 2021,
    organizationRelationships: [
      { organizationId: "org_studio_pixel_punk", roles: ["development"] },
    ],
    countries: ["Brasil"],
    brazilianConnection: [
      {
        type: "brazilian-studio",
        description:
          "Desenvolvido pelo Studio Pixel Punk, estúdio independente brasileiro formado por Tiani Pixel e Fernanda Dias.",
      },
    ],
    genres: ["Ação", "RPG"],
    subgenres: ["Metroidvania", "Action RPG"],
    tags: ["tempo", "escolhas", "exploração", "pixel art"],
    platforms: ["PC", "Nintendo Switch", "PlayStation 4", "Xbox One"],
    modes: ["Um jogador", "Cooperativo local"],
    perspective: ["Visão superior"],
    description:
      "Action RPG em que o tempo restante das personagens converte deslocamento, atalhos e recursos em escolhas com consequências.",
    editorialSummary:
      "O relógio não ilustra apenas urgência: ele decide quem continuará presente no mundo e como o jogador planeja cada rota.",
    whyItMatters:
      "É um caso fértil de mecânica produzindo significado narrativo. Conhecer o mapa, dominar atalhos e escolher quem recebe Meteor Dust muda a memória daquela campanha.",
    gameplay:
      "Combate, parry, armas e ferramentas convivem com um mapa não linear. Conhecimento adquirido numa partida permite atalhos e rotas mais eficientes na próxima.",
    artDirection:
      "A pixel art combina silhuetas legíveis, animações rápidas e ambientes densos. Cores e retratos dão identidade às personagens ameaçadas pelo tempo.",
    narrative:
      "Alma atravessa Arcadia enquanto autômatos perdem a energia que os mantém conscientes. A escassez transforma vínculos e utilidade mecânica em decisões difíceis.",
    soundAndMusic:
      "A música sustenta melancolia e movimento, enquanto a interface mantém o tempo presente sem ocupar toda a atenção visual.",
    developmentContext:
      "Primeiro jogo do Studio Pixel Punk. As criadoras desenharam não linearidade e tempo para permitir escolhas significativas e rejogadas baseadas no conhecimento do jogador.",
    seo: {
      title: "UNSIGHTED: jogo, mecânicas e análise | Henrique Reis",
      description:
        "Conheça UNSIGHTED, do Studio Pixel Punk: tempo, escolhas, exploração, combate e a união entre mecânica e narrativa.",
    },
    sources: [
      {
        title: "Designing for meaningful consequences in UNSIGHTED",
        url: "https://www.gamedeveloper.com/design/exploring-meaningful-consequences-unsighted",
      },
      {
        title: "UNSIGHTED with Tiani Pixel and Fernanda Dias",
        url: "https://interactive.libsyn.com/unsighted-with-tiani-pixel-fernanda-dias",
      },
    ],
  },
  {
    ...published,
    ...steamMedia("no-place-for-bravery", 1039100, "No Place for Bravery"),
    id: "game_no_place_for_bravery_2022",
    slug: "no-place-for-bravery",
    title: "No Place for Bravery",
    releaseDate: "2022-09-22",
    year: 2022,
    organizationRelationships: [{ organizationId: "org_glitch_factory", roles: ["development"] }],
    countries: ["Brasil"],
    brazilianConnection: [
      {
        type: "brazilian-studio",
        description:
          "Desenvolvido pela Glitch Factory, estúdio independente fundado e sediado em Brasília.",
      },
    ],
    genres: ["Ação", "RPG"],
    subgenres: ["Action RPG", "Soulslike"],
    tags: ["violência", "paternidade", "pixel art", "combate"],
    platforms: ["PC", "Linux", "Nintendo Switch", "Android"],
    modes: ["Um jogador"],
    perspective: ["Visão superior"],
    description:
      "Action RPG sobre Thorn, um pai envelhecido cuja busca pela filha transforma combate brutal em parte de uma história sobre obsessão e violência.",
    editorialSummary:
      "A precisão de esquivas, aparos e execuções não existe isolada da narrativa: insistir em avançar torna o jogador participante da obsessão de Thorn.",
    whyItMatters:
      "Importa menos por reproduzir um vocabulário soulslike e mais por perguntar o que ele significa quando violência, abandono parental e incapacidade de desistir são o centro.",
    gameplay:
      "Combates exigem leitura, posicionamento, esquiva e parry. Inimigos punem repetição descuidada, enquanto finalizações reforçam o peso atribuído à jornada.",
    artDirection:
      "A pixel art trabalha escala monumental, ruína e violência explícita. Cenários e animações apresentam um mundo consumido por conflitos anteriores ao protagonista.",
    narrative:
      "Thorn procura a filha desaparecida enquanto cuida de um filho adotivo. A busca é apresentada menos como heroísmo incontestável e mais como obsessão capaz de reproduzir abandono.",
    soundAndMusic:
      "A trilha e o desenho sonoro dão impacto ao combate e reservam ambiência para momentos em que o desgaste do mundo precisa aparecer sem explicação adicional.",
    developmentContext:
      "A Glitch Factory, fundada em 2012 e baseada em Brasília, descreveu o projeto como um action RPG que usa convenções do gênero para discutir violência e abandono parental.",
    seo: {
      title: "No Place for Bravery: jogo e análise | Henrique Reis",
      description:
        "Conheça No Place for Bravery, da Glitch Factory: combate, pixel art, violência, paternidade e a obsessão que move Thorn.",
    },
    sources: [
      {
        title: "Brazil Games — Glitch Factory",
        url: "https://www.abragames.org/uploads/5/6/8/0/56805537/brazilgames_catalogo_gamescom_digital_20_06_24_r.pdf",
      },
      {
        title: "No Place for Bravery — Google Play",
        url: "https://play.google.com/store/apps/details?id=br.com.theglitchfactory.noplaceforbravery",
      },
    ],
  },
  {
    ...published,
    ...steamMedia("kaze-and-the-wild-masks", 829280, "Kaze and the Wild Masks"),
    id: "game_kaze_wild_masks_2021",
    slug: "kaze-and-the-wild-masks",
    title: "Kaze and the Wild Masks",
    releaseDate: "2021-03-26",
    year: 2021,
    organizationRelationships: [{ organizationId: "org_pixelhive", roles: ["development"] }],
    countries: ["Brasil"],
    brazilianConnection: [
      {
        type: "brazilian-studio",
        description: "Desenvolvido pela PixelHive, estúdio independente de Porto Alegre.",
      },
    ],
    genres: ["Plataforma"],
    subgenres: ["Plataforma 2D"],
    tags: ["nostalgia", "máscaras", "level design", "pixel art"],
    platforms: ["PC", "Nintendo Switch", "PlayStation 4", "Xbox One", "Google Stadia"],
    modes: ["Um jogador"],
    perspective: ["2D lateral"],
    description:
      "Plataforma 2D que retoma a precisão dos anos 1990 e usa máscaras animais para alterar movimento e desenho das fases.",
    editorialSummary:
      "Kaze conhece suas referências, mas não se limita a citá-las: cada máscara muda verbos, ritmo e obstáculos, dando às fases uma gramática própria.",
    whyItMatters:
      "Ajuda a discutir nostalgia como repertório de design. A homenagem fica produtiva quando reconhece regras antigas, seleciona o que funciona e constrói variações novas.",
    gameplay:
      "Kaze corre, salta, plana e ataca em fases de precisão crescente. Máscaras concedem formas animais com movimentos próprios sem abandonar controles básicos consistentes.",
    artDirection:
      "Animação expressiva, cores saturadas e cenários em camadas recuperam a energia dos platformers de 16 bits com acabamento e legibilidade contemporâneos.",
    narrative:
      "A busca para salvar Hogo e restaurar as Crystal Islands oferece uma moldura direta, servindo ao ritmo das fases sem competir com o movimento.",
    soundAndMusic:
      "A música mantém energia de aventura e identidade retrô, acompanhando mudanças de ambiente e velocidade sem depender só de imitação dos anos 1990.",
    developmentContext:
      "A PixelHive documenta influências como Donkey Kong Country 2 e Super Mario World. O projeto começou com escopo móvel menor e cresceu preservando controles e level design.",
    officialWebsite: "https://www.kazegame.com/",
    seo: {
      title: "Kaze and the Wild Masks: jogo e análise | Henrique Reis",
      description:
        "Conheça Kaze and the Wild Masks, da PixelHive: referências dos anos 1990, máscaras, movimento, pixel art e level design.",
    },
    sources: [
      {
        title: "The origin of Kaze and the Wild Masks",
        url: "https://www.soedesco.com/news/the-origin-of-90-s-inspired-platformer-kaze-and-the-wild-masks",
      },
    ],
  },
  {
    ...published,
    ...steamMedia("dodgeball-academia", 1422420, "Dodgeball Academia"),
    id: "game_dodgeball_academia_2021",
    slug: "dodgeball-academia",
    title: "Dodgeball Academia",
    releaseDate: "2021-08-05",
    year: 2021,
    organizationRelationships: [{ organizationId: "org_pocket_trap", roles: ["development"] }],
    countries: ["Brasil"],
    brazilianConnection: [
      {
        type: "brazilian-studio",
        description:
          "Desenvolvido pela Pocket Trap, estúdio de São Paulo, com Ivan Freire; a ambientação não é apresentada como representação do Brasil.",
      },
    ],
    genres: ["RPG", "Esporte"],
    subgenres: ["RPG de ação"],
    tags: ["queimada", "escola", "personagens", "animação"],
    platforms: ["PC", "Nintendo Switch", "PlayStation 4", "Xbox One"],
    modes: ["Um jogador", "Versus local"],
    perspective: ["Visão superior"],
    description:
      "RPG escolar em que partidas de queimada funcionam como combate, com equipes, habilidades, progressão e personagens construídos em oito episódios.",
    editorialSummary:
      "A queimada não aparece como minigame entre diálogos: ela é o sistema de combate e a linguagem social da escola, expressando rivalidade, treino e crescimento.",
    whyItMatters:
      "Mostra como uma regra esportiva familiar sustenta um RPG inteiro. Sua identidade brasileira está na equipe que o criou, não numa ambientação nacional inventada.",
    gameplay:
      "Jogadores arremessam, agarram, desviam e usam habilidades em arenas em tempo real. Equipe, atributos e equipamentos acrescentam progressão sem retirar a leitura física da bola.",
    artDirection:
      "Personagens desenhados à mão, poses exageradas e animações elásticas aproximam o jogo de séries animadas. Silhuetas distinguem habilidades em partidas movimentadas.",
    narrative:
      "Otto entra numa academia dedicada à queimada, forma amizades e rivalidades e atravessa um ano escolar dividido em episódios e torneios.",
    soundAndMusic:
      "Efeitos de impacto, chamadas e temas energéticos fazem as partidas parecerem confrontos de desenho animado sem tornar a informação sonora indistinta.",
    developmentContext:
      "Criado pela Pocket Trap e Ivan Freire. A equipe citou experiência em animação como parte importante da direção visual e estruturou a campanha como um RPG completo.",
    officialWebsite: "https://pocket-trap.com/jogos/dodgeball-academia/",
    seo: {
      title: "Dodgeball Academia: jogo e análise | Henrique Reis",
      description:
        "Conheça Dodgeball Academia, da Pocket Trap: RPG, queimada, combate, direção de animação, escola e construção de personagens.",
    },
    sources: [
      {
        title: "Dodgeball Academia — Pocket Trap",
        url: "https://pocket-trap.com/jogos/dodgeball-academia/",
      },
      {
        title: "Interview with Henrique Alonso",
        url: "https://waytoomany.games/2021/08/18/interview-with-henrique-alonso-of-pocket-trap-creators-of-dodgeball-academia/",
      },
    ],
  },
  {
    ...published,
    ...steamMedia("horizon-chase-turbo", 389140, "Horizon Chase Turbo"),
    id: "game_horizon_chase_turbo_2018",
    slug: "horizon-chase-turbo",
    title: "Horizon Chase Turbo",
    releaseDate: "2018-05-15",
    year: 2018,
    organizationRelationships: [
      { organizationId: "org_aquiris", roles: ["development", "publishing"] },
    ],
    countries: ["Brasil"],
    brazilianConnection: [
      {
        type: "brazilian-studio",
        description:
          "Desenvolvido e publicado originalmente pela Aquiris, estúdio de Porto Alegre, antes da evolução posterior da empresa dentro da Epic Games.",
      },
    ],
    genres: ["Corrida"],
    subgenres: ["Arcade racing"],
    tags: ["velocidade", "arcade", "pistas", "nostalgia"],
    platforms: ["PC", "macOS", "Linux", "Nintendo Switch", "PlayStation 4", "Xbox One"],
    modes: ["Um jogador", "Multijogador local"],
    perspective: ["Terceira pessoa"],
    description:
      "Corrida arcade que recupera pistas curtas, tráfego, combustível e ultrapassagens de clássicos dos anos 1990 em uma apresentação estilizada.",
    editorialSummary:
      "Horizon Chase Turbo privilegia leitura imediata e velocidade: curvas, cores, relevo, adversários e combustível criam decisões simples que se acumulam.",
    whyItMatters:
      "Ampliou a visibilidade internacional do desenvolvimento brasileiro com uma obra que dialoga diretamente com Top Gear sem depender apenas do reconhecimento da referência.",
    gameplay:
      "Aceleração, traçado, ultrapassagem, nitro e combustível formam um arcade acessível e exigente em melhores colocações. A estrutura mundial encadeia pistas e desbloqueios.",
    artDirection:
      "Cenários poligonais de cores planas comprimem paisagens em faixas de leitura rápida. Clima, horário e relevo mudam a sensação das pistas sem perseguir realismo.",
    soundAndMusic:
      "Barry Leitch, compositor associado a Top Gear, assina uma trilha que reforça a ligação histórica e preserva energia própria para os campeonatos.",
    developmentContext:
      "Horizon Chase nasceu na Aquiris, em Porto Alegre, e Turbo expandiu a experiência para consoles e PC. O registro preserva esse momento, sem reescrever a autoria após a aquisição pela Epic.",
    officialWebsite: "https://www.horizonchase.com/",
    seo: {
      title: "Horizon Chase Turbo: jogo e análise | Henrique Reis",
      description:
        "Conheça Horizon Chase Turbo, da Aquiris: corrida arcade, Top Gear, direção de arte, trilha, pistas e importância para os jogos brasileiros.",
    },
    sources: [
      {
        title: "Horizon Chase Turbo — Steam",
        url: "https://store.steampowered.com/app/389140/Horizon_Chase_Turbo/",
      },
      {
        title: "Horizon Chase — especial e entrevistas",
        url: "https://warpzone.me/digital/2018/Revista_WarpZone_Especial_01_Horizon_Chase.pdf",
      },
    ],
  },
  {
    contentType: "game",
    schemaVersion: 1,
    id: "game_hollow_knight_2017",
    slug: "hollow-knight",
    aliases: [],
    title: "Hollow Knight",
    year: 2017,
    contributors: [
      { personId: "person_ari_gibson", roles: ["direção", "design", "arte", "animação", "roteiro"] },
      { personId: "person_william_pellen", roles: ["direção", "design", "programação", "roteiro"] },
      { personId: "person_christopher_larkin", roles: ["composição musical"] },
    ],
    organizationRelationships: [{ organizationId: "org_team_cherry", roles: ["development"] }],
    countries: ["Austrália"],
    brazilianConnection: [],
    genres: ["Ação", "Aventura"],
    subgenres: ["Metroidvania"],
    tags: ["exploração"],
    platforms: ["PC", "Nintendo Switch", "PlayStation 4", "Xbox One"],
    modes: ["Um jogador"],
    perspective: ["2D lateral"],
    description: "Exploração de um reino em ruínas com combate, plataforma e narrativa ambiental.",
    editorialSummary: "Registro legado preservado em preparação para futura pesquisa editorial.",
    whyItMatters:
      "Obra central para discussões contemporâneas sobre exploração não linear independente.",
    gameplay: "Exploração, combate e habilidades reorganizam progressivamente o acesso ao mapa.",
    developmentContext: "Desenvolvido pelo estúdio australiano Team Cherry.",
    officialWebsite: "https://www.hollowknight.com/",
    relatedArticleSlugs: [],
    seo: {
      title: "Hollow Knight | Henrique Reis",
      description: "Registro editorial de Hollow Knight em preparação no acervo de jogos.",
    },
    sources: [{ title: "Hollow Knight — site oficial", url: "https://www.hollowknight.com/" }],
    status: "draft",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-26",
  },
  {
    contentType: "game",
    schemaVersion: 1,
    id: "game_hollow_knight_silksong_2025",
    slug: "hollow-knight-silksong",
    aliases: ["silksong"],
    title: "Hollow Knight: Silksong",
    year: 2025,
    contributors: [
      { personId: "person_ari_gibson", roles: ["direção", "design", "arte", "animação"] },
      { personId: "person_william_pellen", roles: ["direção", "design"] },
      { personId: "person_jasmine_vine", roles: ["programação"] },
      { personId: "person_christopher_larkin", roles: ["composição musical"] },
    ],
    organizationRelationships: [{ organizationId: "org_team_cherry", roles: ["development"] }],
    countries: ["Austrália"],
    brazilianConnection: [],
    genres: ["Ação", "Aventura"],
    subgenres: ["Metroidvania"],
    tags: ["exploração"],
    platforms: ["PC", "Nintendo Switch", "PlayStation", "Xbox"],
    modes: ["Um jogador"],
    perspective: ["2D lateral"],
    description:
      "A ascensão de Hornet por um novo reino construído em torno de mobilidade e combate próprios.",
    editorialSummary: "Registro legado preservado em preparação para futura pesquisa editorial.",
    whyItMatters:
      "Continuação relevante para estudar como uma protagonista diferente altera sistemas conhecidos.",
    gameplay: "Mobilidade, combate e ferramentas partem das capacidades específicas de Hornet.",
    developmentContext: "Desenvolvido pelo estúdio australiano Team Cherry.",
    officialWebsite: "https://hollowknightsilksong.com/",
    relatedArticleSlugs: [],
    seo: {
      title: "Hollow Knight: Silksong | Henrique Reis",
      description:
        "Registro editorial de Hollow Knight: Silksong em preparação no acervo de jogos.",
    },
    sources: [{ title: "Silksong — site oficial", url: "https://hollowknightsilksong.com/" }],
    status: "draft",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-26",
  },
];

const parsed = GameBatchSchema.parse(entries);
export const games: readonly Game[] = parsed;
export const gamesById = new Map(parsed.map((game) => [game.id, game]));
export const gamesBySlug = new Map(
  parsed.flatMap((game) => [
    [game.slug, game] as const,
    ...game.aliases.map((alias) => [alias, game] as const),
  ]),
);
