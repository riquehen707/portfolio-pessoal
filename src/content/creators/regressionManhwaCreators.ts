import { CreatorSchema, type Creator } from "./creatorSchema";

const checked = "2026-08-24";
const person = (id: string, name: string, sourceUrl: string, occupation: string): Creator => CreatorSchema.parse({
  id: `person_${id}`, slug: id.replaceAll("_", "-"), name, kind: "person", status: "published",
  countryOrRegion: "Coreia do Sul", occupations: [occupation],
  summary: `${occupation} creditado em manhwas de fantasia e regressão do acervo.`, workIds: [],
  sources: [{ title: `${name} — créditos oficiais da obra`, url: sourceUrl, kind: "primary" }],
  createdAt: checked, updatedAt: checked,
});

export const regressionManhwaCreators: Creator[] = [
  person("gold_haeng", "Gold Haeng", "https://www.webtoons.com/en/action/the-regressed-mercenary-has-a-plan/list?title_no=7261", "Autor original"),
  person("jjjsss", "JJJSSS", "https://www.webtoons.com/en/action/the-regressed-mercenary-has-a-plan/list?title_no=7261", "Artista de webtoon"),
  person("usonan", "Usonan", "https://tapas.io/series/a-returners-magic-should-be-special/info", "Autor original"),
  person("wookjakga", "Wookjakga", "https://tapas.io/series/a-returners-magic-should-be-special/info", "Artista de webtoon"),
  person("index_return_player", "INDEX", "https://www.webtoons.com/en/action/return-to-player/list?title_no=2574", "Autor original"),
  person("umky", "UMKY", "https://www.webtoons.com/en/action/return-to-player/list?title_no=2574", "Adaptador de webtoon"),
  person("sehon", "SEHON", "https://www.webtoons.com/en/action/return-to-player/list?title_no=2574", "Artista de webtoon"),
  person("yh_jang", "Y.H.JANG", "https://www.webtoons.com/en/fantasy/absolute-regression/list?title_no=7004", "Autor original"),
  person("jp_absolute", "JP", "https://www.webtoons.com/en/fantasy/absolute-regression/list?title_no=7004", "Roteirista de webtoon"),
  person("park_jin_hwan", "PARK JIN HWAN", "https://www.webtoons.com/en/fantasy/absolute-regression/list?title_no=7004", "Artista de webtoon"),
  person("soulpung", "SOULPUNG", "https://www.webtoons.com/en/fantasy/the-knight-only-lives-today/list?title_no=6672", "Autor original"),
  person("ian_knight", "IAN", "https://www.webtoons.com/en/fantasy/the-knight-only-lives-today/list?title_no=6672", "Artista de webtoon"),
  person("lee_hyun_min", "Lee Hyun Min", "https://www.webtoons.com/en/fantasy/the-knight-only-lives-today/list?title_no=6672", "Adaptador de webtoon"),
  person("kanara", "Kanara", "https://www.webtoons.com/en/fantasy/the-knight-only-lives-today/list?title_no=6672", "Adaptador de webtoon"),
];
