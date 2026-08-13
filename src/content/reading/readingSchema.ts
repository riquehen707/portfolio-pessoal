import { z } from "zod";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const source = z.object({ title: z.string().min(1), url: z.string().url() });
const image = z.object({
  src: z.string().min(1), alt: z.string().min(1), sourceUrl: z.string().url(), credit: z.string().min(1),
  rights: z.enum(["original-editorial", "licensed", "permission-pending"]), width: z.number().int().positive(), height: z.number().int().positive(),
});

export const ReadingFormatSchema = z.enum(["book", "manga", "manhwa", "manhua", "webtoon", "graphic-novel", "comic", "light-novel", "serialized-series", "one-shot", "comic-strip", "anthology"]);
export const BookCategorySchema = z.enum(["fiction", "non-fiction", "philosophy", "science", "business", "marketing", "biography", "essay", "poetry", "short-stories", "light-novel", "comics"]);
export const ComicTraditionSchema = z.enum(["manga", "manhwa", "manhua", "western-comics", "brazilian-comics", "other"]);
export const ComicFormatSchema = z.enum(["serialized-series", "graphic-novel", "one-shot", "webtoon", "comic-strip", "anthology"]);
export const ReadingPublicationStatusSchema = z.enum(["announced", "ongoing", "completed", "hiatus", "cancelled", "out-of-print"]);
export const ReadingEditorialStatusSchema = z.enum(["draft", "review", "published"]);

export const ReadingCreditSchema = z.object({
  personId: z.string().regex(/^person_[a-z0-9_]+$/),
  roles: z.array(z.enum(["author", "original-creator", "writer", "artist", "penciller", "inker", "illustrator", "translator", "letterer", "editor", "colorist", "adapter", "other"])).min(1),
  note: z.string().optional(),
});

export const ReadingOrganizationRelationshipSchema = z.object({
  organizationId: z.string().regex(/^org_[a-z0-9_]+$/),
  roles: z.array(z.enum(["original-publisher", "publisher", "imprint", "magazine", "platform", "licensor", "distributor"])).min(1),
});

export const ReadingSeriesSchema = z.object({
  id: z.string().regex(/^read_series_[a-z0-9_]+$/), slug: z.string().regex(slug), aliases: z.array(z.string().regex(slug)).default([]),
  title: z.string().min(1), originalTitle: z.string().min(1).optional(), summary: z.string().min(20).max(320),
  kind: z.enum(["narrative", "editorial", "publication"]), publicationStatus: ReadingPublicationStatusSchema.optional(), confirmedVolumeCount: z.number().int().positive().optional(), volumeCountCheckedAt: z.string().regex(isoDate).optional(),
  status: ReadingEditorialStatusSchema, sources: z.array(source).min(1), createdAt: z.string().regex(isoDate), updatedAt: z.string().regex(isoDate),
}).superRefine((series,ctx)=>{if(series.confirmedVolumeCount&&!series.volumeCountCheckedAt)ctx.addIssue({code:"custom",path:["volumeCountCheckedAt"],message:"quantidade de volumes exige data de verificação"});});

export const ReadingWorkSchema = z.object({
  id: z.string().regex(/^read_work_[a-z0-9_]+$/), contentType: z.literal("reading-work"), schemaVersion: z.number().int().positive(),
  slug: z.string().regex(slug), aliases: z.array(z.string().regex(slug)).default([]), originalTitle: z.string().min(1), titleBr: z.string().min(1).optional(), subtitle: z.string().min(1).optional(),
  romanizedTitle: z.string().min(1).optional(), format: ReadingFormatSchema, originCountries: z.array(z.string().min(1)).min(1), originalLanguages: z.array(z.string().min(1)).min(1),
  comicTradition: ComicTraditionSchema.optional(), comicFormat: ComicFormatSchema.optional(), readingDirection: z.enum(["left-to-right", "right-to-left", "vertical", "mixed"]).optional(),
  credits: z.array(ReadingCreditSchema).min(1), organizationRelationships: z.array(ReadingOrganizationRelationshipSchema).default([]),
  publicationStart: z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/).optional(), publicationEnd: z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/).optional(),
  publicationStatus: ReadingPublicationStatusSchema, categories: z.array(BookCategorySchema).min(1), genres: z.array(z.string().min(1)).default([]), themes: z.array(z.string().min(1)).default([]),
  confirmedVolumeCount: z.number().int().positive().optional(), volumeCountCheckedAt: z.string().regex(isoDate).optional(), episodeCount: z.number().int().positive().optional(), seasonCount: z.number().int().positive().optional(),
  demographics: z.array(z.enum(["children", "middle-grade", "young-adult", "adult", "shonen", "shojo", "seinen", "josei", "general"])).default([]),
  audienceProfile: z.string().min(10).max(240).optional(), shortDescription: z.string().min(20).max(320), seriesMemberships: z.array(z.object({ seriesId: z.string().regex(/^read_series_[a-z0-9_]+$/), position: z.number().positive().optional(), label: z.string().min(1).optional() })).default([]),
  relatedWorks: z.array(z.object({ workId: z.string().regex(/^read_work_[a-z0-9_]+$/), relationship: z.enum(["continuation", "retelling", "inspired-by", "spin-off", "companion", "other"]) })).default([]),
  adaptations: z.array(z.object({ contentId: z.string().min(1).optional(), relationship: z.enum(["adaptation", "inspired-by", "retelling"]), kind: z.enum(["film", "series", "animation", "manga", "comic", "game", "stage", "audio", "other"]), title: z.string().min(1), status: z.enum(["confirmed", "released"]), sourceUrl: z.string().url() })).default([]),
  image: image.optional(), sources: z.array(source).min(1), status: ReadingEditorialStatusSchema,
  createdAt: z.string().regex(isoDate), publishedAt: z.string().regex(isoDate).optional(), updatedAt: z.string().regex(isoDate),
}).superRefine((work, ctx) => {
  if (work.aliases.includes(work.slug)) ctx.addIssue({ code: "custom", path: ["aliases"], message: "slug não pode ser alias" });
  if (work.publicationEnd && !work.publicationStart) ctx.addIssue({ code: "custom", path: ["publicationStart"], message: "fim exige início" });
  if (work.status === "published" && !work.publishedAt) ctx.addIssue({ code: "custom", path: ["publishedAt"], message: "obra publicada exige publishedAt" });
  if (work.format === "light-novel" && !work.categories.includes("light-novel")) ctx.addIssue({ code: "custom", path: ["categories"], message: "formato light-novel exige a categoria light-novel" });
  if (Boolean(work.comicTradition) !== Boolean(work.comicFormat)) ctx.addIssue({ code:"custom", path:["comicFormat"], message:"tradição e formato de quadrinhos devem ser informados juntos" });
  if (work.comicFormat && !work.readingDirection) ctx.addIssue({ code:"custom", path:["readingDirection"], message:"quadrinhos exigem sentido de leitura confirmado" });
  if (work.confirmedVolumeCount && !work.volumeCountCheckedAt) ctx.addIssue({ code:"custom", path:["volumeCountCheckedAt"], message:"quantidade de volumes exige data de verificação" });
});

export const ReadingInstallmentSchema = z.object({
  id:z.string().regex(/^read_installment_[a-z0-9_]+$/),workId:z.string().regex(/^read_work_[a-z0-9_]+$/),seriesId:z.string().regex(/^read_series_[a-z0-9_]+$/).optional(),kind:z.enum(["chapter","issue","episode","season","arc"]),number:z.number().positive().optional(),label:z.string().min(1),publicationDate:z.string().regex(isoDate).optional(),summary:z.string().min(20).max(320).optional(),status:ReadingEditorialStatusSchema,sources:z.array(source).min(1),createdAt:z.string().regex(isoDate),updatedAt:z.string().regex(isoDate),
});

export const ReadingVolumeSchema = z.object({
  id: z.string().regex(/^read_volume_[a-z0-9_]+$/), workId: z.string().regex(/^read_work_[a-z0-9_]+$/), seriesId: z.string().regex(/^read_series_[a-z0-9_]+$/).optional(),
  number: z.number().positive().optional(), label: z.string().min(1), originalTitle: z.string().min(1).optional(), publicationDate: z.string().regex(isoDate).optional(), installmentIds:z.array(z.string().regex(/^read_installment_[a-z0-9_]+$/)).default([]), summary:z.string().min(20).max(320).optional(), image:image.optional(),
  status: ReadingEditorialStatusSchema, sources: z.array(source).min(1), createdAt: z.string().regex(isoDate), updatedAt: z.string().regex(isoDate),
});

export const ReadingEditionSchema = z.object({
  id: z.string().regex(/^read_edition_[a-z0-9_]+$/), workId: z.string().regex(/^read_work_[a-z0-9_]+$/).optional(), volumeId: z.string().regex(/^read_volume_[a-z0-9_]+$/).optional(),
  title: z.string().min(1), publisherId: z.string().regex(/^org_[a-z0-9_]+$/), imprintId: z.string().regex(/^org_[a-z0-9_]+$/).optional(), country: z.string().min(1), language: z.string().min(1),
  medium: z.enum(["hardcover", "paperback", "mass-market", "digital", "web", "omnibus", "box-set", "other"]), publicationDate: z.string().regex(isoDate).optional(),
  isbn10: z.string().regex(/^\d{9}[\dX]$/).optional(), isbn13: z.string().regex(/^\d{13}$/).optional(), pageCount: z.number().int().positive().optional(),
  cover: image.optional(), translationCredits: z.array(ReadingCreditSchema).default([]), availabilityStatus: z.enum(["available", "preorder", "unavailable", "out-of-print", "unknown"]),
  availabilityCheckedAt: z.string().regex(isoDate).optional(), status: ReadingEditorialStatusSchema, sources: z.array(source).min(1), createdAt: z.string().regex(isoDate), updatedAt: z.string().regex(isoDate),
}).superRefine((edition, ctx) => {
  if (Boolean(edition.workId) === Boolean(edition.volumeId)) ctx.addIssue({ code: "custom", path: ["workId"], message: "edição deve apontar exatamente para obra ou volume" });
  if (edition.availabilityStatus !== "unknown" && !edition.availabilityCheckedAt) ctx.addIssue({ code: "custom", path: ["availabilityCheckedAt"], message: "disponibilidade exige data de verificação" });
});

export const ReadingOfferSchema = z.object({
  id: z.string().regex(/^read_offer_[a-z0-9_]+$/), editionId: z.string().regex(/^read_edition_[a-z0-9_]+$/), store: z.string().min(1), url: z.string().url(), region: z.string().min(2),
  affiliateId: z.string().optional(), availability: z.enum(["available", "preorder", "unavailable", "unknown"]), checkedAt: z.string().regex(isoDate), commissionDisclosure: z.string().min(1).optional(),
});

export type ReadingWork = z.infer<typeof ReadingWorkSchema>;
export type ReadingSeries = z.infer<typeof ReadingSeriesSchema>;
export type ReadingVolume = z.infer<typeof ReadingVolumeSchema>;
export type ReadingEdition = z.infer<typeof ReadingEditionSchema>;
export type ReadingOffer = z.infer<typeof ReadingOfferSchema>;
export type ReadingInstallment = z.infer<typeof ReadingInstallmentSchema>;
export type ComicTradition = z.infer<typeof ComicTraditionSchema>;
export type ComicFormat = z.infer<typeof ComicFormatSchema>;
export type BookCategory = z.infer<typeof BookCategorySchema>;

export const ReadingCatalogSchema = z.object({ works: z.array(ReadingWorkSchema), series: z.array(ReadingSeriesSchema), installments:z.array(ReadingInstallmentSchema).default([]), volumes: z.array(ReadingVolumeSchema), editions: z.array(ReadingEditionSchema), offers: z.array(ReadingOfferSchema) }).superRefine((catalog, ctx) => {
  const unique = (values: string[], path: string) => { const seen = new Set<string>(); values.forEach((value, index) => { if (seen.has(value)) ctx.addIssue({ code:"custom", path:[path,index], message:`identificador ou slug duplicado: ${value}` }); seen.add(value); }); };
  unique(catalog.works.map((item) => item.id), "works");
  unique(catalog.works.flatMap((item) => [item.slug, ...item.aliases]), "works");
  unique(catalog.series.map((item) => item.id), "series");
  unique(catalog.volumes.map((item) => item.id), "volumes");
  unique(catalog.installments.map((item) => item.id), "installments");
  unique(catalog.editions.map((item) => item.id), "editions");
  unique(catalog.offers.map((item) => item.id), "offers");
});
