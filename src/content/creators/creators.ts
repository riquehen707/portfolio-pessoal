import { CreatorSchema, type Creator } from "./creatorSchema";

export const shingoTamagawa: Creator = CreatorSchema.parse({
  id: "person_shingo_tamagawa",
  slug: "shingo-tamagawa",
  name: "Shingo Tamagawa",
  kind: "person",
  status: "published",
  birthYear: 1987,
  birthPlace: "Nara, Japão",
  summary: "Animador e realizador japonês, autor do curta independente Puparia.",
  workIds: ["work_puparia_2020", "work_archipel_making_puparia_2021"],
  sources: [
    { title: "PUPARIA", url: "https://www.youtube.com/watch?v=CWnqX41JHuM", kind: "primary" },
    { title: "Three Minutes, Three Years: Making Puparia", url: "https://www.youtube.com/watch?v=VKsG3E7TLl4", kind: "primary" },
    { title: "PUPARIA — FilmFreeway", url: "https://filmfreeway.com/PUPARIA831", kind: "primary" },
  ],
  createdAt: "2026-08-12",
  updatedAt: "2026-08-12",
});

export const upamanyuBhattacharyya: Creator = CreatorSchema.parse({
  id: "person_upamanyu_bhattacharyya", slug: "upamanyu-bhattacharyya", name: "Upamanyu Bhattacharyya", kind: "person", status: "draft",
  summary: "Animador e codiretor indiano de Wade.", workIds: ["work_wade_2019"],
  sources: [{ title: "Wade — Annecy 2020", url: "https://www.annecyfestival.com/about/archives/2020/award-winners/film-index%3Afilm-20200770", kind: "primary" }],
  createdAt: "2026-08-12", updatedAt: "2026-08-12",
});

export const kalpSanghvi: Creator = CreatorSchema.parse({
  id: "person_kalp_sanghvi", slug: "kalp-sanghvi", name: "Kalp Sanghvi", kind: "person", status: "draft",
  summary: "Animador e codiretor indiano de Wade.", workIds: ["work_wade_2019"],
  sources: [{ title: "Wade — Annecy 2020", url: "https://www.annecyfestival.com/about/archives/2020/award-winners/film-index%3Afilm-20200770", kind: "primary" }],
  createdAt: "2026-08-12", updatedAt: "2026-08-12",
});

export const creators = [shingoTamagawa, upamanyuBhattacharyya, kalpSanghvi];
