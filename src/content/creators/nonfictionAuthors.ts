import { CreatorSchema, type Creator } from "./creatorSchema";

const checked = "2026-09-02";

const authors: Array<[string, string]> = [
  ["jordan_ellenberg", "Jordan Ellenberg"], ["david_spiegelhalter", "David Spiegelhalter"],
  ["carl_sagan", "Carl Sagan"], ["john_lewis_gaddis", "John Lewis Gaddis"],
  ["terry_eagleton", "Terry Eagleton"], ["joseph_m_williams", "Joseph M. Williams"],
  ["joseph_bizup", "Joseph Bizup"], ["ha_joon_chang", "Ha-Joon Chang"],
  ["tim_harford", "Tim Harford"], ["samuel_bowles", "Samuel Bowles"],
  ["wendy_carlin", "Wendy Carlin"], ["margaret_stevens", "Margaret Stevens"],
  ["jacob_goldstein", "Jacob Goldstein"], ["paul_krugman", "Paul Krugman"],
  ["daron_acemoglu", "Daron Acemoglu"], ["james_a_robinson", "James A. Robinson"],
  ["karl_polanyi", "Karl Polanyi"], ["celso_furtado", "Celso Furtado"],
  ["abhijit_banerjee", "Abhijit V. Banerjee"], ["esther_duflo", "Esther Duflo"],
  ["thomas_piketty", "Thomas Piketty"], ["joseph_stiglitz", "Joseph E. Stiglitz"],
  ["charles_kindleberger", "Charles P. Kindleberger"], ["robert_aliber", "Robert Z. Aliber"],
  ["carmen_reinhart", "Carmen M. Reinhart"], ["kenneth_rogoff", "Kenneth S. Rogoff"],
  ["stephanie_kelton", "Stephanie Kelton"], ["rose_spielman", "Rose M. Spielman"],
  ["william_jenkins", "William J. Jenkins"], ["marilyn_lovett", "Marilyn D. Lovett"],
  ["e_bruce_goldstein", "E. Bruce Goldstein"], ["daniel_schacter", "Daniel L. Schacter"],
  ["oliver_sacks", "Oliver Sacks"], ["daniel_kahneman", "Daniel Kahneman"],
  ["robert_cialdini", "Robert B. Cialdini"], ["lee_ross", "Lee Ross"],
  ["richard_nisbett", "Richard E. Nisbett"], ["david_funder", "David C. Funder"],
  ["laura_berk", "Laura E. Berk"], ["joseph_ledoux", "Joseph LeDoux"],
  ["robert_sapolsky", "Robert M. Sapolsky"], ["jonathan_haidt", "Jonathan Haidt"],
  ["joseph_henrich", "Joseph Henrich"], ["carol_tavris", "Carol Tavris"],
  ["elliot_aronson", "Elliot Aronson"],
];

export const nonfictionAuthors: Creator[] = authors.map(([id, name]) => CreatorSchema.parse({
  id: `person_${id}`,
  slug: id.replaceAll("_", "-"),
  name,
  kind: "person",
  status: "draft",
  occupations: ["Autor"],
  summary: `Autor relacionado ao acervo introdutório de formação intelectual, economia ou psicologia.`,
  biography: [], themes: [], ideas: [], workIds: [], startingPoints: [], relatedPersonIds: [], relatedLinks: [],
  sources: [{ title: `${name} — busca bibliográfica`, url: `https://openlibrary.org/search/authors?q=${encodeURIComponent(name)}`, kind: "secondary" }],
  createdAt: checked,
  updatedAt: checked,
}));
