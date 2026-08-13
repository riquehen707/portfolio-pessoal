import { z } from "zod";

export const MovieOfferSchema = z.object({
  id: z.string().regex(/^offer_[a-z0-9_]+$/),
  movieId: z.string().min(1),
  provider: z.string().min(1),
  offerType: z.enum(["stream", "rent", "buy", "physical"]),
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
].map(([movieId, detailId]) => ({ id:`offer_prime_br_${movieId.replace(/^mov_/,"")}`,movieId,provider:"Prime Video",offerType:"stream",url:`https://www.primevideo.com/-/pt/detail/${detailId}`,region:"BR",checkedAt:"2026-08-13" })));
