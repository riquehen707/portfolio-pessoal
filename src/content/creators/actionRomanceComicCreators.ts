import { CreatorSchema, type Creator } from "./creatorSchema";

const checked = "2026-08-24";
const person = (id: string, name: string, sourceUrl: string, occupation: string): Creator => CreatorSchema.parse({
  id: `person_${id}`, slug: id.replaceAll("_", "-"), name, kind: "person", status: "published",
  countryOrRegion: ["mad_snail", "tang_jia_san_shao", "fa_shu_de_woniu"].includes(id) ? "China" : "Coreia do Sul",
  occupations: [occupation], summary: `${occupation} creditado em quadrinhos de ação e fantasia do acervo.`,
  workIds: [], sources: [{ title: `${name} — créditos oficiais da obra`, url: sourceUrl, kind: "primary" }],
  createdAt: checked, updatedAt: checked,
});

export const actionRomanceComicCreators: Creator[] = [
  person("blue_deep", "Blue-Deep", "https://www.webtoons.com/en/action/doom-breaker/list?title_no=3197", "Autor e artista de webtoon"),
  person("chwiryong", "Chwiryong", "https://tapas.io/series/ending-maker/info", "Autor de web novel"),
  person("does", "DOES", "https://tapas.io/series/ending-maker/info", "Artista e adaptador de webtoon"),
  person("kim_chi_woo", "Kim Chiwoo", "https://tapas.io/series/the-infinite-mage/info", "Autor de web novel"),
  person("themis", "Themis", "https://tapas.io/series/the-infinite-mage/info", "Adaptador de webtoon"),
  person("kiraz", "Kiraz", "https://tapas.io/series/the-infinite-mage/info", "Artista de webtoon"),
  person("second_star", "Second Star", "https://www.tappytoon.com/en/book/367", "Autor de web novel"),
  person("dodomoon", "Dodomoon", "https://www.tappytoon.com/en/book/367", "Adaptador de webtoon"),
  person("doip", "Doip", "https://www.tappytoon.com/en/book/367", "Artista de webtoon"),
  person("bill_k", "Bill K", "https://tapas.io/series/sss-class-revival-hunter/info", "Autor de web novel"),
  person("sinnoa", "Sinnoa", "https://tapas.io/series/sss-class-revival-hunter/info", "Adaptador de webtoon"),
  person("neida", "Neida", "https://tapas.io/series/sss-class-revival-hunter/info", "Artista de webtoon"),
  person("hyeong_eun", "Hyeong Eun", "https://www.webtoons.com/en/action/jungle-juice/list?title_no=2480", "Roteirista de webtoon"),
  person("juder", "JUDER", "https://www.webtoons.com/en/action/jungle-juice/list?title_no=2480", "Equipe de arte de webtoon"),
  person("yk_sinier", "YK / Sinier", "https://tapas.io/series/legend-of-an-asura-the-poison-dragon/info", "Autor original"),
  person("antstudio", "Antstudio", "https://tapas.io/series/legend-of-an-asura-the-poison-dragon/info", "Estúdio de webtoon"),
  person("mad_snail", "Mad Snail", "https://comics.inkr.com/title/480-tales-of-demons-and-gods", "Autor de web novel"),
  person("tang_jia_san_shao", "Tang Jia San Shao", "https://comics.inkr.com/title/766-soul-land-ii-the-unrivaled-tang-sect", "Autor de web novel"),
  person("fa_shu_de_woniu", "Fa Shu De Wo Niu", "https://comics.inkr.com/title/239-star-martial-god-technique", "Autor de web novel"),
];
