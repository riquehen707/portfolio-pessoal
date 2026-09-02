import { z } from "zod";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const SourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  accessedAt: z.string().regex(isoDate).optional(),
});

export const ProductImageSchema = z.object({
  src: z.string().startsWith("/images/products/"),
  alt: z.string().min(1),
  sourceUrl: z.string().url(),
  credit: z.string().min(1),
  rights: z.enum(["official-promotional", "licensed", "permission-pending"]),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  variantId: z.string().regex(/^prod_variant_[a-z0-9_]+$/).optional(),
});

const SmartphoneSpecificationsSchema = z.object({
  type: z.literal("smartphone"),
  processor: z.string().min(1),
  ramGb: z.number().positive(),
  storageGb: z.number().positive(),
  display: z.object({
    technology: z.string().min(1),
    sizeInches: z.number().positive(),
    resolution: z.string().min(1),
    refreshRateHz: z.number().positive().optional(),
  }),
  batteryMah: z.number().int().positive(),
  chargingWatts: z.number().positive().optional(),
  rearCameras: z.object({
    main: z.string().min(1),
    ultrawide: z.string().min(1).optional(),
    additional: z.array(z.string().min(1)).default([]),
  }),
  frontCamera: z.string().min(1),
  video: z.string().min(1),
  connectivity: z.array(z.string().min(1)).min(1),
  nfc: z.boolean(),
  fiveG: z.boolean(),
  waterResistance: z.string().min(1).optional(),
  operatingSystemAtLaunch: z.string().min(1),
  updatePolicy: z.string().min(1).optional(),
  dimensionsMm: z.object({ height: z.number().positive(), width: z.number().positive(), depth: z.number().positive() }),
  weightGrams: z.number().positive(),
});

const TelevisionSpecificationsSchema = z.object({
  type: z.literal("television"),
  screenSizeInches: z.number().positive(),
  availableSizesInches: z.array(z.number().positive()).min(1),
  panelTechnology: z.string().min(1),
  resolution: z.string().min(1),
  nativeRefreshRateHz: z.number().positive(),
  hdrFormats: z.array(z.string().min(1)).min(1),
  operatingSystem: z.string().min(1),
  hdmiPorts: z.number().int().positive(),
  hdmi21Ports: z.number().int().nonnegative().optional(),
  earc: z.boolean(),
  vrr: z.boolean(),
  allm: z.boolean(),
  wifi: z.string().min(1),
  bluetooth: z.string().min(1),
  assistants: z.array(z.string().min(1)).default([]),
  gamingFeatures: z.array(z.string().min(1)).default([]),
  audio: z.string().min(1),
  dimensionsMm: z.object({ width: z.number().positive(), height: z.number().positive(), depth: z.number().positive(), includesStand: z.boolean() }).optional(),
  weightKg: z.number().positive().optional(),
  warranty: z.string().min(1).optional(),
});

const NotebookSpecificationsSchema = z.object({
  type: z.literal("notebook"), processor: z.string().min(1), processorGeneration: z.string().min(1).optional(), gpu: z.string().min(1),
  ramGb: z.number().positive(), ramType: z.string().min(1), ramUpgrade: z.string().min(1), storageGb: z.number().positive(), storageType: z.string().min(1), storageUpgrade: z.string().min(1),
  display: z.object({ sizeInches: z.number().positive(), resolution: z.string().min(1), panelType: z.string().min(1), brightnessNits: z.number().positive().optional(), refreshRateHz: z.number().positive().optional() }),
  batteryWh: z.number().positive().optional(), chargerWatts: z.number().positive().optional(), ports: z.array(z.string().min(1)).min(1), usbC: z.string().min(1), videoOutput: z.string().min(1),
  wifi: z.string().min(1), bluetooth: z.string().min(1), webcam: z.string().min(1), weightKg: z.number().positive(), operatingSystem: z.string().min(1), warranty: z.string().min(1).optional(), keyboard: z.string().min(1).optional(),
});

const WasherDryerSpecificationsSchema = z.object({
  type: z.literal("washer-dryer"), washCapacityKg: z.number().positive(), dryCapacityKg: z.number().positive(), loadingType: z.literal("front"),
  dimensionsMm: z.object({ width: z.number().positive(), height: z.number().positive(), depth: z.number().positive() }), doorOpenDepthMm: z.number().positive().optional(), weightKg: z.number().positive(),
  motor: z.string().min(1), inverter: z.boolean(), spinSpeedRpm: z.number().positive().optional(), programs: z.array(z.string().min(1)).min(1), steam: z.boolean(), hotWater: z.string().min(1),
  sensors: z.array(z.string().min(1)).default([]), connectivity: z.array(z.string().min(1)).default([]), energyEfficiency: z.string().min(1).optional(), energyConsumption: z.string().min(1).optional(), waterConsumption: z.string().min(1).optional(),
  voltage: z.string().min(1), warranty: z.string().min(1), motorWarranty: z.string().min(1).optional(),
});

const BlenderSpecificationsSchema = z.object({
  type: z.literal("blender"), powerNominalWatts: z.number().positive(), motorPower: z.string().min(1).optional(), totalCapacityLiters: z.number().positive(), usefulCapacity: z.string().min(1).optional(),
  jarMaterial: z.string().min(1), bladeMaterial: z.string().min(1), bladeDescription: z.string().min(1).optional(), speeds: z.string().min(1), pulse: z.boolean(), rotationRpm: z.number().positive().optional(),
  dimensionsMm: z.object({ width: z.number().positive(), height: z.number().positive(), depth: z.number().positive() }), weightKg: z.number().positive(), voltage: z.string().min(1),
  noiseLevel: z.string().min(1).optional(), warranty: z.string().min(1), intendedUse: z.string().min(1), recommendedPreparations: z.array(z.string().min(1)).min(1), restrictedPreparations: z.array(z.string().min(1)).default([]), safetyFeatures: z.array(z.string().min(1)).default([]),
});

const StandMixerSpecificationsSchema = z.object({
  type: z.literal("stand-mixer"), mixerType: z.string().min(1), powerWatts: z.number().positive(), bowlCapacityLiters: z.number().positive(), bowlMaterial: z.string().min(1),
  planetaryMovement: z.boolean(), speeds: z.string().min(1), softStart: z.boolean().optional(), includedBeaters: z.array(z.string().min(1)).min(1), practicalCapacity: z.string().min(1),
  recommendedPreparations: z.array(z.string().min(1)).min(1), heavyDoughSuitability: z.string().min(1), dimensionsMm: z.object({ width: z.number().positive(), height: z.number().positive(), depth: z.number().positive() }),
  weightKg: z.number().positive(), voltage: z.string().min(1), warranty: z.string().min(1), accessories: z.array(z.string().min(1)).default([]), additionalAccessories: z.string().min(1).optional(), intendedUse: z.string().min(1),
});

const GenericSpecificationsSchema = z.object({
  type: z.literal("generic"),
  groups: z.array(z.object({
    label: z.string().min(1),
    entries: z.array(z.object({ key: z.string().min(1), label: z.string().min(1), value: z.string().min(1) })).min(1),
  })).min(1),
});

export const ProductSpecificationsSchema = z.discriminatedUnion("type", [
  SmartphoneSpecificationsSchema,
  TelevisionSpecificationsSchema,
  NotebookSpecificationsSchema,
  WasherDryerSpecificationsSchema,
  BlenderSpecificationsSchema,
  StandMixerSpecificationsSchema,
  GenericSpecificationsSchema,
]);

export const ProductSchema = z.object({
  id: z.string().regex(/^prod_[a-z0-9_]+$/),
  contentType: z.literal("product"),
  schemaVersion: z.number().int().positive(),
  slug: z.string().regex(slug),
  aliases: z.array(z.string().regex(slug)).default([]),
  name: z.string().min(1),
  manufacturerId: z.string().regex(/^org_[a-z0-9_]+$/),
  line: z.string().min(1).optional(),
  category: z.string().min(1),
  releaseYear: z.number().int().min(1900).max(2100).optional(),
  mainImage: ProductImageSchema.optional(),
  gallery: z.array(ProductImageSchema).default([]),
  shortDescription: z.string().min(30).max(360),
  strengths: z.array(z.string().min(10)).min(1),
  limitations: z.array(z.string().min(10)).min(1),
  suitableFor: z.array(z.string().min(10)).min(1),
  categories: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).default([]),
  relatedProductIds: z.array(z.string().regex(/^prod_[a-z0-9_]+$/)).default([]),
  relatedArticleSlugs: z.array(z.string().regex(slug)).default([]),
  editorialSummary: z.string().min(80).max(1200),
  seo: z.object({ title: z.string().min(3).max(80), description: z.string().min(50).max(170) }),
  sources: z.array(SourceSchema).min(1),
  status: z.enum(["draft", "published"]),
  createdAt: z.string().regex(isoDate),
  publishedAt: z.string().regex(isoDate).optional(),
  updatedAt: z.string().regex(isoDate),
  reviewedAt: z.string().regex(isoDate),
}).superRefine((product, ctx) => {
  if (product.aliases.includes(product.slug)) ctx.addIssue({ code: "custom", path: ["aliases"], message: "slug não pode ser alias" });
  if (!product.categories.includes(product.category)) ctx.addIssue({ code: "custom", path: ["categories"], message: "categoria principal deve existir em categories" });
  if (product.relatedProductIds.includes(product.id)) ctx.addIssue({ code: "custom", path: ["relatedProductIds"], message: "produto não pode se relacionar consigo mesmo" });
  if (product.status === "published" && (!product.publishedAt || !product.mainImage)) ctx.addIssue({ code: "custom", path: ["status"], message: "produto publicado exige publishedAt e imagem oficial ou licenciada" });
});

export const ProductVariantSchema = z.object({
  id: z.string().regex(/^prod_variant_[a-z0-9_]+$/),
  productId: z.string().regex(/^prod_[a-z0-9_]+$/),
  name: z.string().min(1),
  market: z.string().min(2),
  manufacturerModelNumber: z.string().min(1).optional(),
  gtin: z.string().regex(/^\d{8,14}$/).optional(),
  distinguishingAttributes: z.record(z.string(), z.string().min(1)).default({}),
  specifications: ProductSpecificationsSchema,
  imageIds: z.array(z.string().min(1)).default([]),
  sources: z.array(SourceSchema).min(1),
  status: z.enum(["draft", "published"]),
  createdAt: z.string().regex(isoDate),
  updatedAt: z.string().regex(isoDate),
  reviewedAt: z.string().regex(isoDate),
});

export const ProductOfferSchema = z.object({
  id: z.string().regex(/^prod_offer_[a-z0-9_]+$/),
  variantId: z.string().regex(/^prod_variant_[a-z0-9_]+$/),
  retailer: z.string().min(1),
  url: z.string().url(),
  region: z.string().min(2),
  affiliateProgram: z.string().min(1).optional(),
  affiliateId: z.string().min(1).optional(),
  observedPrice: z.object({ amount: z.number().nonnegative(), currency: z.string().length(3) }).optional(),
  availability: z.enum(["available", "preorder", "temporarily-unavailable", "unavailable", "unknown"]),
  checkedAt: z.string().regex(isoDate),
  commissionDisclosure: z.string().min(1).optional(),
}).superRefine((offer, ctx) => {
  if (offer.affiliateId && !offer.affiliateProgram) ctx.addIssue({ code: "custom", path: ["affiliateProgram"], message: "identificador de afiliado exige programa" });
});

export const ProductCatalogSchema = z.object({
  products: z.array(ProductSchema),
  variants: z.array(ProductVariantSchema),
  offers: z.array(ProductOfferSchema),
}).superRefine((catalog, ctx) => {
  const unique = (values: string[], path: string) => {
    const seen = new Set<string>();
    values.forEach((value, index) => { if (seen.has(value)) ctx.addIssue({ code: "custom", path: [path, index], message: `identificador ou slug duplicado: ${value}` }); seen.add(value); });
  };
  unique(catalog.products.map((item) => item.id), "products");
  unique(catalog.products.flatMap((item) => [item.slug, ...item.aliases]), "products");
  unique(catalog.variants.map((item) => item.id), "variants");
  unique(catalog.variants.flatMap((item) => item.gtin ? [item.gtin] : []), "variants");
  unique(catalog.offers.map((item) => item.id), "offers");

  const productIds = new Set(catalog.products.map((item) => item.id));
  const variantIds = new Set(catalog.variants.map((item) => item.id));
  catalog.products.forEach((product, index) => product.relatedProductIds.forEach((id) => {
    if (!productIds.has(id)) ctx.addIssue({ code: "custom", path: ["products", index, "relatedProductIds"], message: `produto relacionado inexistente: ${id}` });
  }));
  catalog.variants.forEach((variant, index) => {
    if (!productIds.has(variant.productId)) ctx.addIssue({ code: "custom", path: ["variants", index, "productId"], message: `produto inexistente: ${variant.productId}` });
  });
  catalog.offers.forEach((offer, index) => {
    if (!variantIds.has(offer.variantId)) ctx.addIssue({ code: "custom", path: ["offers", index, "variantId"], message: `variante inexistente: ${offer.variantId}` });
  });
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type ProductOffer = z.infer<typeof ProductOfferSchema>;
export type ProductSpecifications = z.infer<typeof ProductSpecificationsSchema>;
