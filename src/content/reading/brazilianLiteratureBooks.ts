import { amazonBrazilReadingOffer } from "./amazonBrazil";
import type { ReadingEdition, ReadingOffer, ReadingWork } from "./readingSchema";

const checked = "2026-09-22";
const source = (title: string, url: string) => [{ title, url }];

export const brazilianLiteratureWorks: ReadingWork[] = [
  {
    id: "read_work_a_hora_da_estrela", contentType: "reading-work", schemaVersion: 1,
    slug: "a-hora-da-estrela", aliases: [], originalTitle: "A Hora da Estrela", titleBr: "A Hora da Estrela", workType: "book", format: "book",
    originCountries: ["Brasil"], originalLanguages: ["Português"], credits: [{ personId: "person_clarice_lispector", roles: ["author"] }], organizationRelationships: [{ organizationId: "org_rocco", roles: ["publisher"] }],
    publicationStart: "1977", publicationEnd: "1977", publicationStatus: "completed", categories: ["fiction"], genres: ["Romance", "Literatura brasileira"], themes: ["Desamparo", "Migração", "Classe social", "Linguagem", "Identidade"], concepts: ["Narrador", "Desigualdade", "Interioridade"], readingDifficulty: "intermediate", featuredEditionId: "read_edition_a_hora_da_estrela_rocco_2025", demographics: ["adult"],
    audienceProfile: "Leitores que procuram um romance breve, formalmente consciente e atento à precariedade social sem prometer uma leitura leve.",
    shortDescription: "Um narrador hesitante acompanha Macabéa, jovem alagoana que vive no Rio de Janeiro, enquanto a própria narrativa interroga quem pode contar sua história.",
    seriesMemberships: [], relatedWorks: [], adaptations: [], sources: source("A hora da estrela — Editora Rocco", "https://rocco.com.br/produto/a-hora-da-estrela-2/"), status: "published", publishedAt: checked, createdAt: checked, updatedAt: checked,
  },
  {
    id: "read_work_vidas_secas", contentType: "reading-work", schemaVersion: 1,
    slug: "vidas-secas", aliases: [], originalTitle: "Vidas Secas", titleBr: "Vidas Secas", workType: "book", format: "book",
    originCountries: ["Brasil"], originalLanguages: ["Português"], credits: [{ personId: "person_graciliano_ramos", roles: ["author"] }], organizationRelationships: [{ organizationId: "org_companhia_das_letras", roles: ["publisher"] }],
    publicationStart: "1938", publicationEnd: "1938", publicationStatus: "completed", categories: ["fiction"], genres: ["Romance", "Literatura brasileira", "Modernismo"], themes: ["Seca", "Migração", "Pobreza", "Trabalho", "Violência institucional"], concepts: ["Regionalismo", "Sobrevivência", "Desigualdade"], readingDifficulty: "introductory", featuredEditionId: "read_edition_vidas_secas_zahar_2025", demographics: ["young-adult", "adult"],
    audienceProfile: "Leitores que buscam um clássico brasileiro conciso, de linguagem econômica, para discutir desigualdade, deslocamento e sobrevivência.",
    shortDescription: "Uma família de retirantes atravessa o sertão em busca de sobrevivência, enfrentando fome, seca e instituições que reduzem sua margem de escolha.",
    seriesMemberships: [], relatedWorks: [], adaptations: [], sources: source("Vidas secas: edição bolso de luxo — Grupo Companhia das Letras", "https://www.companhiadasletras.com.br/livro/9786584952256/"), status: "published", publishedAt: checked, createdAt: checked, updatedAt: checked,
  },
];

export const brazilianLiteratureEditions: ReadingEdition[] = [
  {
    id: "read_edition_a_hora_da_estrela_rocco_2025", workId: "read_work_a_hora_da_estrela", title: "A hora da estrela", publisherId: "org_rocco", country: "Brasil", language: "Português", medium: "paperback", publicationDate: "2025-01-01", isbn10: "6555326743", isbn13: "9786555326741", availabilityStatus: "available", availabilityCheckedAt: checked, status: "published", sources: source("A hora da estrela — Editora Rocco", "https://rocco.com.br/produto/a-hora-da-estrela-2/"), translationCredits: [], createdAt: checked, updatedAt: checked,
  },
  {
    id: "read_edition_vidas_secas_zahar_2025", workId: "read_work_vidas_secas", title: "Vidas secas: edição bolso de luxo", publisherId: "org_companhia_das_letras", country: "Brasil", language: "Português", medium: "hardcover", publicationDate: "2025-02-18", isbn13: "9786584952256", pageCount: 152, availabilityStatus: "available", availabilityCheckedAt: checked, status: "published", sources: source("Vidas secas: edição bolso de luxo — Grupo Companhia das Letras", "https://www.companhiadasletras.com.br/livro/9786584952256/"), translationCredits: [], createdAt: checked, updatedAt: checked,
  },
];

export const brazilianLiteratureOffers: ReadingOffer[] = [
  amazonBrazilReadingOffer({ id: "read_offer_amazon_a_hora_da_estrela_rocco_2025", editionId: "read_edition_a_hora_da_estrela_rocco_2025", asin: "6555326743", availability: "available", checkedAt: checked }),
];
