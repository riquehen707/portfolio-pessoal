import { CreatorSchema, type Creator } from "./creatorSchema";

const checked = "2026-08-24";

const creator = (id: string, name: string, _workIds: string[], sourceUrl: string, roles = "Mangaká japonês"):
  Creator => CreatorSchema.parse({
  id: `person_${id}`,
  slug: id.replaceAll("_", "-"),
  name,
  kind: "person",
  status: "published",
  countryOrRegion: "Japão",
  occupations: [roles],
  summary: `${roles} com trabalho registrado no acervo de mangás do site.`,
  workIds: [],
  sources: [{ title: `${name} — página oficial da obra`, url: sourceUrl, kind: "primary" }],
  createdAt: checked,
  updatedAt: checked,
});

export const haremMangaCreators: Creator[] = [
  creator("negi_haruba", "Negi Haruba", ["read_work_quintessential_quintuplets"], "https://kodansha.us/series/the-quintessential-quintuplets/"),
  creator("rikito_nakamura", "Rikito Nakamura", ["read_work_100_girlfriends"], "https://sevenseasentertainment.com/series/the-100-girlfriends-who-really-really-really-really-really-love-you/", "Roteirista de mangá"),
  creator("yukiko_nozawa", "Yukiko Nozawa", ["read_work_100_girlfriends"], "https://sevenseasentertainment.com/series/the-100-girlfriends-who-really-really-really-really-really-love-you/", "Artista de mangá"),
  creator("taishi_tsutsui", "Taishi Tsutsui", ["read_work_we_never_learn"], "https://www.viz.com/we-never-learn"),
  creator("naoshi_komi", "Naoshi Komi", ["read_work_nisekoi"], "https://www.viz.com/nisekoi-false-love"),
  creator("ken_akamatsu", "Ken Akamatsu", ["read_work_love_hina", "read_work_negima"], "https://kodansha.us/series/love-hina-omnibus/"),
  creator("saki_hasemi", "Saki Hasemi", ["read_work_to_love_ru"], "https://sevenseasentertainment.com/series/to-love-ru/", "Roteirista de mangá"),
  creator("kentaro_yabuki", "Kentaro Yabuki", ["read_work_to_love_ru"], "https://sevenseasentertainment.com/series/to-love-ru/", "Artista de mangá"),
  creator("tadahiro_miura", "Tadahiro Miura", ["read_work_yuuna"], "https://sevenseasentertainment.com/series/yuuna-and-the-haunted-hot-springs/"),
  creator("hiroyuki_mangaka", "Hiroyuki", ["read_work_girlfriend_girlfriend"], "https://kodansha.us/series/girlfriend-girlfriend/"),
  creator("kouji_seo", "Kouji Seo", ["read_work_cafe_terrace"], "https://kodansha.us/book/the-cafe-terrace-and-its-goddesses/"),
  creator("okayado", "OKAYADO", ["read_work_monster_musume"], "https://sevenseasentertainment.com/series/monster-musume/"),
];
