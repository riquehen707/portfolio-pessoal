import { z } from "zod";

export const MovieOfferSchema = z.object({
  id: z.string().regex(/^offer_[a-z0-9_]+$/),
  movieId: z.string().min(1),
  provider: z.string().min(1),
  offerType: z.enum(["stream", "free-with-ads", "rent", "buy", "physical"]),
  url: z.string().url(),
  region: z.string().min(2),
  affiliateId: z.string().optional(),
  commissionDisclosure: z.string().min(1).optional(),
  checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type MovieOffer = z.infer<typeof MovieOfferSchema>;

// Ofertas são temporais e opcionais. Nenhuma disponibilidade foi confirmada nesta revisão.
const netflixBrazil = (movieId: string, titleId: string): MovieOffer => ({
  id: `offer_netflix_br_${movieId.replace(/^mov_/, "")}`,
  movieId, provider: "Netflix", offerType: "stream",
  url: `https://www.netflix.com/br/title/${titleId}`,
  region: "BR", checkedAt: "2026-08-13",
});

export const movieOffers: MovieOffer[] = [
  ["mov_netflix_roma", "80240715"], ["mov_netflix_irishman", "80175798"],
  ["mov_netflix_marriage_story", "80223779"], ["mov_netflix_power_dog", "81127997"],
  ["mov_netflix_pinocchio", "80218455"], ["mov_netflix_beasts_no_nation", "80044545"],
  ["mov_netflix_lost_daughter", "81478910"], ["mov_netflix_all_quiet", "81260280"],
  ["mov_netflix_society_snow", "81268316"], ["mov_netflix_mitchells", "81399614"],
  ["mov_netflix_klaus", "80183187"], ["mov_netflix_nimona", "81444554"],
  ["mov_netflix_glass_onion", "81458416"], ["mov_netflix_rebel_ridge", "81157729"],
  ["mov_62d0a9", "81231197"], ["mov_46ed93", "80117824"],
  ["mov_netflix_apocalypse_tropics", "81989009"], ["mov_netflix_two_popes", "80174451"],
  ["mov_netflix_okja", "80091936"], ["mov_netflix_thinking_ending", "80211559"],
  ["mov_netflix_platform", "81128579"], ["mov_netflix_edge_democracy", "80190535"],
  ["mov_netflix_edificio_master", "82051067"],
  ["mov_na_lost_body", "81120982"], ["mov_na_kpop_demon_hunters", "81498621"],
  ["mov_na_wallace_gromit_vengeance", "81351936"], ["mov_na_my_fathers_dragon", "80178603"],
  ["mov_na_sea_beast", "81018682"], ["mov_na_apollo_10_half", "81161042"],
  ["mov_na_wendell_wild", "80231433"], ["mov_na_chicken_run_nugget", "81223025"],
  ["mov_na_ultraman_rising", "81007144"], ["mov_na_orion_dark", "81476885"],
  ["mov_na_the_house", "81178338"], ["mov_na_over_moon", "80214236"],
  ["mov_na_vivo", "81199052"], ["mov_na_willoughbys", "80239482"],
  ["mov_na_magicians_elephant", "80234520"], ["mov_na_leo", "81218917"],
  ["mov_ghb_2001_chihiro", "60023642"], ["mov_ghb_1997_mononoke", "28630857"],
  ["mov_ghb_2013_kaguya", "80013552"],
  ["mov_nh_geralds_game", "80128722"], ["mov_nh_apostle", "80158148"],
  ["mov_nh_1922", "80135164"], ["mov_nh_perfection", "80211638"],
  ["mov_nh_incantation", "81599888"], ["mov_nh_call", "81342505"],
  ["mov_nh_no_one_gets_out_alive", "80991313"], ["mov_nh_blood_red_sky", "80198645"],
  ["mov_nh_fear_street_1994", "81325689"], ["mov_nh_fear_street_1978", "81334749"],
  ["mov_nh_fear_street_1666", "81334750"], ["mov_nh_trip", "81342665"],
  ["mov_nh_outside", "81739319"], ["mov_nh_ziam", "81739744"],
  ["mov_nh_sister_death", "81478662"], ["mov_nh_el_conde", "81590652"],
  ["mov_nh_cargo", "80161216"], ["mov_nh_alive", "81240831"],
  ["mov_2025_frankenstein", "81507921"], ["mov_shark_under_paris", "81210788"],
].map(([movieId, titleId]) => netflixBrazil(movieId, titleId)).concat([
  ["mov_prime_manchester","0Q9AXD5XXKTFYLGE5ET1QXN4EJ"],["mov_prime_argentina_1985","0HM2CPRAN241K811SGWRRH09BF"],
  ["mov_prime_one_night_miami","0SXMGGZD0PR7O1GHO7V7TVX0EN"],["mov_prime_a_hero","0PTXHN9HZ6QFQ5CWCOTXHOB3MX"],
  ["mov_prime_time","0OWOW468YQMMQLBB255RSKJPBO"],["mov_prime_paterson","0R5P5HNRMEZ5ZARW30NVW5050G"],
  ["mov_prime_cold_war","0TEMN82PWTHTLAH1TW14L2JVUP"],["mov_prime_my_old_ass","0I1NQNGUFGJHUETGXCD3TC2S6Q"],
  ["mov_prime_nickel_boys","0FULGWLF9DWJSZBK8ZP52KZHF2"],["mov_prime_burial","0HX9WCDSYBBK2O22RXPHKWVO74"],
  ["mov_prime_blow_man_down","0FWQ7DV1U2GHVFXL1EAS73AJQH"],["mov_prime_brittany","0Q7JWTW0K5RGQKER8PIPE53CXK"],
  ["mov_prime_honey_boy","0NQ1I7VHBDQT7QB34SQ3FOKIOR"],["mov_prime_report","0O2TSKQMQO8KX64OZRVAR23PAY"],
  ["mov_prime_uncle_frank","0HOOCF19ND60DFXZHNI6EB872K"],["mov_prime_catherine_birdy","0II5SPJMQ4CJYM0E90O032YL02"],
  ["mov_prime_air","0IKIGIXFRNQP5ZT74X0037B4X5"],["mov_prime_saltburn","0RUKC4SBCMVYTLG6SFGLEXLQTV"],
  ["mov_prime_thirteen_lives","0N4FTQ4SLZT4K8KO6HFP7XSI1D"],["mov_prime_big_sick","0R5LE5VTXOT5UZWWN0YG633CZ4"],
  ["mov_prime_handmaiden","0SO2P3CLOF93POGQRY7UHHRSQU"],["mov_hor_2018_suspiria","0NY2IZ5KPAWYSWVKUQYWVB6XUN"],
  ["mov_prime_tangerine","0PHV0TFIE4RJGREJ7O3756FOJA"],
].map(([movieId, detailId]) => ({ id:`offer_prime_br_${movieId.replace(/^mov_/,"")}`,movieId,provider:"Prime Video",offerType:"stream",url:`https://www.primevideo.com/-/pt/detail/${detailId}`,region:"BR",checkedAt:"2026-08-13" }))).concat([
  { id:"offer_mubi_br_vamp_nosferatu_1922",movieId:"mov_vamp_nosferatu_1922",provider:"MUBI",offerType:"stream",url:"https://www.justwatch.com/br/filme/nosferatu",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_pluto_br_vamp_nosferatu_1922",movieId:"mov_vamp_nosferatu_1922",provider:"Pluto TV",offerType:"free-with-ads",url:"https://www.justwatch.com/br/filme/nosferatu",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_looke_br_vamp_dracula_1931",movieId:"mov_vamp_dracula_1931",provider:"Looke",offerType:"stream",url:"https://www.justwatch.com/br/filme/dracula-1931",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_filmicca_br_vamp_vampyr_1932",movieId:"mov_vamp_vampyr_1932",provider:"Filmicca",offerType:"stream",url:"https://www.justwatch.com/br/filme/vampiro",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_bloodstream_br_vamp_vampyr_1932",movieId:"mov_vamp_vampyr_1932",provider:"Bloodstream",offerType:"free-with-ads",url:"https://www.justwatch.com/br/filme/vampiro",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_netflix_br_vamp_dracula_1992",movieId:"mov_vamp_dracula_1992",provider:"Netflix",offerType:"stream",url:"https://www.justwatch.com/br/filme/dracula-de-bram-stoker",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_store_br_vamp_dracula_1992",movieId:"mov_vamp_dracula_1992",provider:"Apple TV Store / Amazon Video",offerType:"rent",url:"https://www.justwatch.com/br/filme/dracula-de-bram-stoker",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_store_br_vamp_interview",movieId:"mov_vamp_interview",provider:"Apple TV Store / Amazon Video",offerType:"rent",url:"https://www.justwatch.com/br/filme/entrevista-com-o-vampiro",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_store_br_vamp_what_we_do",movieId:"mov_vamp_what_we_do",provider:"Apple TV Store",offerType:"rent",url:"https://www.justwatch.com/br/filme/o-que-fazemos-nas-sombras",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_reserva_br_ca273d",movieId:"mov_ca273d",provider:"Reserva Imovision Amazon Channel",offerType:"stream",url:"https://www.justwatch.com/br/filme/as-boas-maneiras",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_prime_br_hor_2024_nosferatu",movieId:"mov_hor_2024_nosferatu",provider:"Prime Video",offerType:"stream",url:"https://www.justwatch.com/br/filme/nosferatu-2023",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_max_br_30cf85",movieId:"mov_30cf85",provider:"HBO Max",offerType:"stream",url:"https://www.justwatch.com/br/filme/pecadores",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_store_br_30cf85",movieId:"mov_30cf85",provider:"Apple TV Store / Amazon Video",offerType:"rent",url:"https://www.justwatch.com/br/filme/pecadores",region:"BR",checkedAt:"2026-08-13" },
  { id:"offer_netflix_br_2025_secret_agent",movieId:"mov_2025_secret_agent",provider:"Netflix",offerType:"stream",url:"https://www.justwatch.com/br/filme/o-agente-secreto",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_max_br_2025_one_battle",movieId:"mov_2025_one_battle_after_another",provider:"HBO Max",offerType:"stream",url:"https://www.justwatch.com/br/filme/one-battle-after-another",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_mubi_br_2025_sentimental_value",movieId:"mov_2025_sentimental_value",provider:"MUBI",offerType:"stream",url:"https://www.justwatch.com/br/filme/sentimental-value",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_mubi_br_2025_accident",movieId:"mov_2025_it_was_just_an_accident",provider:"MUBI",offerType:"stream",url:"https://www.justwatch.com/br/filme/it-was-just-an-accident",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_prime_br_2025_marty_supreme",movieId:"mov_2025_marty_supreme",provider:"Prime Video",offerType:"stream",url:"https://www.justwatch.com/br/filme/marty-supreme",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_mubi_br_2025_no_other_choice",movieId:"mov_2025_no_other_choice",provider:"MUBI",offerType:"stream",url:"https://www.justwatch.com/br/filme/no-other-choice",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_globoplay_br_2025_sirat",movieId:"mov_2025_sirat",provider:"Globoplay",offerType:"stream",url:"https://www.justwatch.com/br/filme/sirat",region:"BR",checkedAt:"2026-08-11" },
  { id:"offer_netflix_br_2025_blue_trail",movieId:"mov_2025_blue_trail",provider:"Netflix",offerType:"stream",url:"https://www.justwatch.com/br/filme/o-ultimo-azul",region:"BR",checkedAt:"2026-07-29" },
  { id:"offer_prime_br_2025_hamnet",movieId:"mov_2025_hamnet",provider:"Prime Video",offerType:"stream",url:"https://www.justwatch.com/br/filme/hamnet",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_mubi_br_2025_mastermind",movieId:"mov_2025_mastermind",provider:"MUBI",offerType:"stream",url:"https://www.justwatch.com/br/filme/the-mastermind",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_mubi_br_2025_sound_falling",movieId:"mov_2025_sound_of_falling",provider:"MUBI",offerType:"stream",url:"https://www.justwatch.com/br/filme/sound-of-falling",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_netflix_br_2025_hind_rajab",movieId:"mov_2025_voice_hind_rajab",provider:"Netflix",offerType:"stream",url:"https://www.justwatch.com/br/filme/the-voice-of-hind-rajab",region:"BR",checkedAt:"2026-07-28" },
  { id:"offer_mubi_br_2025_sorry_baby",movieId:"mov_2025_sorry_baby",provider:"MUBI",offerType:"stream",url:"https://www.justwatch.com/br/filme/sorry-baby",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_netflix_br_2025_best_mother",movieId:"mov_2025_best_mother",provider:"Netflix",offerType:"stream",url:"https://www.justwatch.com/br/filme/a-melhor-mae-do-mundo",region:"BR",checkedAt:"2026-07-27" },
  { id:"offer_prime_br_2025_black_bag",movieId:"mov_2025_black_bag",provider:"Prime Video",offerType:"stream",url:"https://www.justwatch.com/br/filme/black-bag",region:"BR",checkedAt:"2026-07-27" },
  { id:"offer_max_br_2025_28_years",movieId:"mov_2025_28_years_later",provider:"HBO Max",offerType:"stream",url:"https://www.justwatch.com/br/filme/28-years-later",region:"BR",checkedAt:"2026-07-29" },
  { id:"offer_max_br_2025_superman",movieId:"mov_2025_superman",provider:"HBO Max",offerType:"stream",url:"https://www.justwatch.com/br/filme/superman-legacy",region:"BR",checkedAt:"2026-07-29" },
  { id:"offer_max_br_2025_weapons",movieId:"mov_hor_2025_weapons",provider:"HBO Max",offerType:"stream",url:"https://www.justwatch.com/br/filme/weapons-2025",region:"BR",checkedAt:"2026-08-14" },
  { id:"offer_netflix_br_2025_homem_h",movieId:"mov_2025_homem_com_h",provider:"Netflix",offerType:"stream",url:"https://www.justwatch.com/br/filme/homem-com-h",region:"BR",checkedAt:"2026-07-29" },
]);

export function getMovieOffers(movieId: string, region = "BR") {
  return movieOffers.filter((offer) => offer.movieId === movieId && offer.region === region);
}

export const MOVIE_OFFER_STALE_AFTER_DAYS = 45;

export function isMovieOfferStale(checkedAt: string, now = new Date()) {
  const age = now.getTime() - new Date(`${checkedAt}T12:00:00Z`).getTime();
  return age > MOVIE_OFFER_STALE_AFTER_DAYS * 86_400_000;
}
