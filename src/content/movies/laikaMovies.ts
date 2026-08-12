import type { MovieSeed } from "./movies";

const officialFilms = "https://www.laika.com/our-films/";
const source = (title: string, url = officialFilms) => [{ title, url }];
const laikaRelationship: NonNullable<MovieSeed["organizationRelationships"]> = [{
  organizationId: "org_laika",
  roles: ["production", "animation"],
  status: "published",
}];

export const laikaMovieSeeds: MovieSeed[] = [
  {
    id: "mov_lai_2009_coraline", slug: "coraline-e-o-mundo-secreto", aliases: ["coraline"],
    titleBr: "Coraline e o Mundo Secreto", originalTitle: "Coraline", year: 2009, releaseDate: "2009-02-06", durationMinutes: 100,
    countries: ["Estados Unidos"], directors: ["Henry Selick"], screenwriters: ["Henry Selick"], organizationRelationships: laikaRelationship,
    genres: ["Animação", "Fantasia", "Terror"], subgenres: ["Stop-motion", "Fantasia sombria"], themes: ["Curiosidade", "Família", "Autonomia"],
    shortDescription: "Uma menina atravessa uma passagem doméstica sedutora e descobre que atenção perfeita também pode ser uma forma de controle.",
    audienceProfile: "A melhor porta de entrada para quem aceita fantasia infantil com imagens genuinamente inquietantes.", experience: "Tátil, sombria e precisa",
    contentWarnings: ["Criança em perigo", "Imagens assustadoras"], sources: source("Coraline — filmografia oficial da LAIKA"),
  },
  {
    id: "mov_lai_2012_paranorman", slug: "paranorman", titleBr: "ParaNorman", originalTitle: "ParaNorman", year: 2012, releaseDate: "2012-08-17", durationMinutes: 92,
    countries: ["Estados Unidos"], directors: ["Sam Fell", "Chris Butler"], screenwriters: ["Chris Butler"], organizationRelationships: laikaRelationship,
    genres: ["Animação", "Comédia", "Fantasia"], subgenres: ["Stop-motion", "Terror familiar"], themes: ["Preconceito", "Luto", "Empatia"],
    shortDescription: "Um garoto que conversa com mortos precisa enfrentar uma maldição e a hostilidade de uma cidade mais assustada do que deseja admitir.",
    audienceProfile: "Para quem gosta de humor macabro, aventura e um conflito moral mais complexo do que a aparência sugere.", experience: "Ágil, macabra e afetuosa",
    contentWarnings: ["Bullying", "Mortos-vivos", "Perseguição"], sources: source("ParaNorman — filmografia oficial da LAIKA"),
  },
  {
    id: "mov_lai_2014_boxtrolls", slug: "os-boxtrolls", aliases: ["boxtrolls"], titleBr: "Os Boxtrolls", originalTitle: "The Boxtrolls", year: 2014, releaseDate: "2014-09-26", durationMinutes: 96,
    countries: ["Estados Unidos"], directors: ["Graham Annable", "Anthony Stacchi"], screenwriters: ["Irena Brignull", "Adam Pava"], organizationRelationships: laikaRelationship,
    genres: ["Animação", "Comédia", "Fantasia"], subgenres: ["Stop-motion"], themes: ["Classe", "Família", "Reputação"],
    shortDescription: "Criaturas subterrâneas transformadas em ameaça pública revelam uma cidade organizada por medo, status e embalagens enganosas.",
    audienceProfile: "Funciona para quem prefere comédia grotesca, invenção visual e sátira social mais barulhenta.", experience: "Excêntrica, mecânica e movimentada",
    contentWarnings: ["Perseguição", "Humor grotesco"], sources: source("The Boxtrolls — filmografia oficial da LAIKA"),
  },
  {
    id: "mov_lai_2016_kubo", slug: "kubo-e-as-cordas-magicas", titleBr: "Kubo e as Cordas Mágicas", originalTitle: "Kubo and the Two Strings", year: 2016, releaseDate: "2016-08-19", durationMinutes: 101,
    countries: ["Estados Unidos"], directors: ["Travis Knight"], screenwriters: ["Marc Haimes", "Chris Butler"], organizationRelationships: laikaRelationship,
    genres: ["Animação", "Fantasia", "Aventura"], subgenres: ["Stop-motion"], themes: ["Memória", "Família", "Narrativa"],
    shortDescription: "Um contador de histórias parte em busca de uma armadura familiar enquanto aprende a diferença entre herança, memória e destino.",
    audienceProfile: "Para quem procura a produção mais épica e emocional do estúdio antes de Wildwood.", experience: "Épica, melancólica e artesanal",
    contentWarnings: ["Luto", "Violência fantástica", "Criança em perigo"], sources: source("Kubo and the Two Strings — filmografia oficial da LAIKA"),
  },
  {
    id: "mov_lai_2019_missinglink", slug: "link-perdido", titleBr: "Link Perdido", originalTitle: "Missing Link", year: 2019, releaseDate: "2019-04-12", durationMinutes: 94,
    countries: ["Estados Unidos"], directors: ["Chris Butler"], screenwriters: ["Chris Butler"], organizationRelationships: laikaRelationship,
    genres: ["Animação", "Comédia", "Aventura"], subgenres: ["Stop-motion"], themes: ["Pertencimento", "Exploração", "Vaidade"],
    shortDescription: "Um explorador e uma criatura solitária atravessam continentes numa aventura que questiona quem decide o que conta como descoberta.",
    audienceProfile: "A opção mais leve para famílias e para quem prefere viagem, comédia e cores abertas ao terror gótico.", experience: "Luminosa, viajante e cômica",
    contentWarnings: ["Perseguição", "Violência cartunesca"], sources: source("Missing Link — filmografia oficial da LAIKA"),
  },
  {
    id: "mov_lai_2026_wildwood", slug: "wildwood", titleBr: "Wildwood", originalTitle: "Wildwood", year: 2026, releaseDate: "2026-10-23", productionStatus: "upcoming",
    countries: ["Estados Unidos"], directors: ["Travis Knight"], screenwriters: ["Chris Butler"], organizationRelationships: laikaRelationship,
    genres: ["Animação", "Fantasia", "Aventura"], subgenres: ["Stop-motion"], themes: ["Floresta", "Família", "Resgate"],
    shortDescription: "A primeira produção da LAIKA desde 2019 amplia a escala física do estúdio numa fantasia ambientada no entorno mítico de Portland.",
    audienceProfile: "Projeto futuro para acompanhar; a avaliação editorial deve esperar o lançamento e a versão final.", experience: "Ainda não avaliada",
    contentWarnings: [], sources: source("Wildwood — site oficial", "https://wildwoodmovie.com/"),
  },
];
