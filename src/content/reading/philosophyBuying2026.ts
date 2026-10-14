import type { ReadingEdition, ReadingWork } from "./readingSchema";

// As capas reproduzem a edição explicitamente identificada pelo ISBN.
// URLs são de imagens promocionais de catálogo; registrar a procedência não transfere direitos de imagem.
// A disponibilização da edição NÃO equivale a disponibilidade de uma oferta na Amazon.
const checkedAt = "2026-10-14";
const source = (title: string, url: string) => ({ title, url });
const cover = (src: string, title: string, sourceUrl: string, credit: string, rights: NonNullable<ReadingEdition["cover"]>["rights"] = "permission-pending"): ReadingEdition["cover"] =>
  ({ src, alt: `Capa da edição brasileira de ${title}`, sourceUrl, credit, rights, width: 600, height: 900 });

export const philosophyBuyingWorks: ReadingWork[] = [
  {
    id: "read_work_meditations_marcus_aurelius",
    contentType: "reading-work", schemaVersion: 1, slug: "meditacoes-marco-aurelio",
    aliases: [], originalTitle: "Τὰ εἰς ἑαυτόν", titleBr: "Meditações",
    workType: "book", format: "book", originCountries: ["Império Romano"],
    originalLanguages: ["Grego antigo"], credits: [{ personId: "person_marcus_aurelius", roles: ["author"] }],
    organizationRelationships: [], publicationDisplay: "século II d.C.",
    publicationStatus: "completed", categories: ["philosophy"], genres: ["Filosofia", "Estoicismo"],
    themes: ["Autodomínio", "Ética", "Mortalidade", "Dever", "Impermanência"],
    demographics: ["adult"],
    shortDescription: "Reflexões pessoais de Marco Aurélio sobre julgamento, dever, morte, disciplina e relações humanas, organizadas em livros e passagens breves.",
    seriesMemberships: [], relatedWorks: [], adaptations: [],
    sources: [source("Stanford Encyclopedia — Marcus Aurelius", "https://plato.stanford.edu/entries/marcus-aurelius/")],
    status: "published", publishedAt: checkedAt, createdAt: checkedAt, updatedAt: checkedAt,
  },
  {
    id: "read_work_critique_pure_reason",
    contentType: "reading-work", schemaVersion: 1, slug: "critica-da-razao-pura",
    aliases: [], originalTitle: "Kritik der reinen Vernunft", titleBr: "Crítica da razão pura",
    workType: "treatise", format: "book", originCountries: ["Alemanha"],
    originalLanguages: ["Alemão"], credits: [{ personId: "person_immanuel_kant", roles: ["author"] }],
    organizationRelationships: [], publicationStart: "1781", publicationEnd: "1787",
    publicationStatus: "completed", categories: ["philosophy"], genres: ["Filosofia", "Epistemologia"],
    themes: ["Conhecimento", "Experiência", "Razão", "Juízos sintéticos a priori", "Metafísica"],
    demographics: ["adult"], readingDifficulty: "advanced",
    shortDescription: "Kant investiga as condições de possibilidade do conhecimento e os limites da razão, distinguindo sensibilidade, entendimento e razão.",
    seriesMemberships: [], relatedWorks: [], adaptations: [],
    sources: [source("Stanford Encyclopedia — Immanuel Kant", "https://plato.stanford.edu/entries/kant/")],
    status: "published", publishedAt: checkedAt, createdAt: checkedAt, updatedAt: checkedAt,
  },
];

type EditionSeed = {
  id: string; workId: string; title: string; publisherId: string; publisherUrl: string;
  isbn13: string; pages?: number; published?: string; imageUrl: string;
  imageCredit: string; imageRights?: NonNullable<ReadingEdition["cover"]>["rights"];
  medium?: ReadingEdition["medium"];
};

const editions: EditionSeed[] = [
  {
    id: "read_edition_apologia_socrates_lpm_malta", workId: "read_work_apology_socrates_plato",
    title: "Apologia de Sócrates — L&PM Pocket, tradução de André Malta", publisherId: "org_lpm",
    publisherUrl: "https://www.lpm.com.br/site/imprimir.asp?CategoriaID=526091&ID=522542&Template=../livros/layout_produto.asp",
    isbn13: "9788525417671", pages: 144, published: "2008-05-01",
    imageUrl: "https://martinsfontespaulista.vteximg.com.br/arquivos/ids/1458788-1000-1000/517758.jpg?v=637896196981600000",
    imageCredit: "L&PM / catálogo da Martins Fontes Paulista",
  },
  {
    id: "read_edition_o_banquete_editora34_bilingue", workId: "read_work_symposium_plato",
    title: "O Banquete — Editora 34, edição bilíngue", publisherId: "org_editora_34",
    publisherUrl: "https://www.editora34.com.br/livro/926",
    isbn13: "9788573266474", pages: 256, published: "2016-01-01",
    imageUrl: "https://livrarialoyola.fbitsstatic.net/img/p/o-banquete-216479/411223.jpg?h=800&qs=ignore&v=no-change&w=800",
    imageCredit: "Editora 34 / catálogo Livraria Loyola",
  },
  {
    id: "read_edition_a_republica_edipro_bini", workId: "read_work_republic_plato",
    title: "A República — Edipro, tradução de Edson Bini", publisherId: "org_edipro",
    publisherUrl: "https://edipro.com.br/livro/a-republica/",
    isbn13: "9788552100744", pages: 496, published: "2019-01-01",
    imageUrl: "https://livrarialoyola.fbitsstatic.net/img/p/a-republica-216484/411228.jpg?h=800&qs=ignore&v=no-change&w=800",
    imageCredit: "Edipro / catálogo Livraria Loyola",
  },
  {
    id: "read_edition_etica_nicomaco_edipro_bini", workId: "read_work_nicomachean_ethics",
    title: "Ética a Nicômaco — Edipro, tradução de Edson Bini", publisherId: "org_edipro",
    publisherUrl: "https://edipro.com.br/livro/etica-a-nicomaco/",
    isbn13: "9788572838818", pages: 392, published: "2014-02-01",
    imageUrl: "https://images.tcdn.com.br/img/img_prod/850317/etica_a_nicomaco_4201_1_fa89320a60d236b47d77e139defca5fc.jpg",
    imageCredit: "Edipro / catálogo Hiperlivros",
  },
  {
    id: "read_edition_meditacoes_penguin_dinucci", workId: "read_work_meditations_marcus_aurelius",
    title: "Meditações — Penguin-Companhia, tradução de Aldo Dinucci", publisherId: "org_penguin_companhia",
    publisherUrl: "https://www.companhiadasletras.com.br/livro/9788582851777/meditacoes",
    isbn13: "9788582851777", pages: 208, published: "2024-01-10",
    imageUrl: "https://http2.mlstatic.com/D_Q_NP_778591-MLU77444138565_072024-O.webp",
    imageCredit: "Penguin-Companhia / catálogo Mercado Livre",
  },
  {
    id: "read_edition_confissoes_penguin_mammi", workId: "read_work_confessions_augustine",
    title: "Confissões — Penguin-Companhia, tradução de Lorenzo Mammì", publisherId: "org_penguin_companhia",
    publisherUrl: "https://www.companhiadasletras.com.br/9788582850473-confissoes-de-santo-agostinho-3481/p",
    isbn13: "9788582850473", pages: 416, published: "2017-01-01",
    imageUrl: "https://plenitudedistribuidora.com.br/cdn/shop/files/285737-1.jpg?v=1772132854",
    imageCredit: "Penguin-Companhia / catálogo Plenitude Distribuidora",
  },
  {
    id: "read_edition_discurso_metodo_wmf", workId: "read_work_discourse_method",
    title: "Discurso do método — WMF Martins Fontes", publisherId: "org_martins_fontes",
    publisherUrl: "https://www.martinsfontespaulista.com.br/discurso-do-metodo-590552/p",
    isbn13: "9788578271459", pages: 184, published: "2009-01-01",
    imageUrl: "https://martinsfontespaulista.vteximg.com.br/arquivos/ids/1412848-1000-1000/590552.jpg?v=638405807194900000",
    imageCredit: "WMF Martins Fontes / catálogo Martins Fontes Paulista",
  },
  {
    id: "read_edition_hume_investigacoes_unesp", workId: "read_work_enquiry_human_understanding",
    title: "Investigações sobre o entendimento humano e sobre os princípios da moral — Unesp", publisherId: "org_editora_unesp",
    publisherUrl: "https://editoraunesp.com.br/catalogo/9788571395268,investigacoes-sobre-o-entendimento-humano-e-sobre-os-principios-da-moral",
    isbn13: "9788571395268", pages: 440, published: "2004-01-01",
    imageUrl: "https://livrarialoyola.fbitsstatic.net/img/p/investigacoes-sobre-o-entendimento-humano-e-sobre-os-principios-da-moral-309307/504072.jpg?h=800&qs=ignore&v=no-change&w=800",
    imageCredit: "Editora Unesp / catálogo Livraria Loyola",
  },
  {
    id: "read_edition_critica_razao_pura_vozes_mattos", workId: "read_work_critique_pure_reason",
    title: "Crítica da razão pura — Vozes, tradução de Fernando Costa Mattos", publisherId: "org_vozes",
    publisherUrl: "https://sociedadekant.org.br/2012/05/02/critica-da-razao-pura-fernando-mattos/",
    isbn13: "9788532643247", pages: 624, published: "2012-01-01",
    imageUrl: "https://martinsfontespaulista.vteximg.com.br/arquivos/ids/1432447-1000-1000/684684.jpg?v=638398151397700000",
    imageCredit: "Editora Vozes / catálogo Martins Fontes Paulista",
  },
];

export const philosophyBuyingEditions: ReadingEdition[] = editions.map((item) => ({
  id: item.id,
  workId: item.workId, title: item.title, publisherId: item.publisherId,
  country: "Brasil", language: "Português", medium: item.medium ?? "paperback",
  publicationDate: item.published, isbn13: item.isbn13, pageCount: item.pages,
  cover: cover(item.imageUrl, item.title, item.publisherUrl, item.imageCredit, item.imageRights),
  translationCredits: [], availabilityStatus: "unknown",
  status: "published", sources: [source(`${item.title} — catálogo`, item.publisherUrl)],
  createdAt: checkedAt, updatedAt: checkedAt,
}));
