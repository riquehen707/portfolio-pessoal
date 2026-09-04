import { WorkSchema, type EditorialWork } from "./workSchema";

export const puparia: EditorialWork = WorkSchema.parse({
  id: "work_puparia_2020", slug: "puparia", title: "Puparia", kind: "animated-short", status: "published",
  year: 2020, country: "Japão", durationSeconds: 179,
  summary: "Curta de animação independente construído por Shingo Tamagawa ao longo de três anos.",
  contributors: [{ personId: "person_shingo_tamagawa", roles: ["direção", "autoria", "animação"] }],
  relatedWorkIds: ["work_archipel_making_puparia_2021"],
  officialUrl: "https://www.youtube.com/watch?v=CWnqX41JHuM", youtubeId: "CWnqX41JHuM",
  rights: { embed: "official-youtube-privacy-enhanced", images: "not-cleared" }, createdAt: "2026-08-12", updatedAt: "2026-08-12",
});

export const makingPuparia: EditorialWork = WorkSchema.parse({
  id: "work_archipel_making_puparia_2021", slug: "three-minutes-three-years-making-puparia",
  title: "Shingo Tamagawa — Three Minutes, Three Years: Making Puparia", kind: "documentary", status: "published",
  year: 2021, summary: "Documentário da Archipel sobre a criação de Puparia e as ideias de Tamagawa sobre trabalho e criação.",
  contributors: [{ personId: "person_shingo_tamagawa", roles: ["pessoa retratada"] }], relatedWorkIds: ["work_puparia_2020"],
  publisher: "Archipel", officialUrl: "https://www.youtube.com/watch?v=VKsG3E7TLl4", youtubeId: "VKsG3E7TLl4",
  rights: { embed: "official-youtube-privacy-enhanced", images: "not-cleared" }, createdAt: "2026-08-12", updatedAt: "2026-08-12",
});

export const wade: EditorialWork = WorkSchema.parse({
  id: "work_wade_2019", slug: "wade", title: "Wade", kind: "animated-short", status: "published", year: 2019, country: "Índia", durationSeconds: 638,
  summary: "Curta de animação 2D sem diálogos sobre refugiados climáticos e tigres deslocados numa Kolkata inundada.",
  contributors: [
    { personId: "person_upamanyu_bhattacharyya", roles: ["direção", "roteiro", "animação"] },
    { personId: "person_kalp_sanghvi", roles: ["direção", "roteiro", "produção", "animação", "composição"] },
  ],
  organizationIds: ["org_ghost_animation"],
  additionalCredits: [
    { name: "Anwaar Alam", roles: ["animação"] }, { name: "Shaheen Sheriff", roles: ["animação"] },
    { name: "Gaurav Wakankar", roles: ["animação"] }, { name: "Nikunj Patel", roles: ["animação"] },
    { name: "Troy Vasanth", roles: ["música", "som"] },
  ],
  relatedWorkIds: [], publisher: "Ghost Animation / Short of the Week", officialUrl: "https://www.youtube.com/watch?v=KSKjxrL0MWo", youtubeId: "KSKjxrL0MWo",
  rights: { embed: "official-youtube-privacy-enhanced", images: "not-cleared" }, createdAt: "2026-08-12", updatedAt: "2026-08-12",
});

export const editorialWorks = [puparia, makingPuparia, wade];
