import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles } from "@/data/articles";
import { organizationsById } from "@/content/organizations/organizations";
import { ProductOffers } from "@/components/products/ProductOffers";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getProductById, getProductBySlug, getProductOffers, getProductVariants, getPublishedProducts } from "@/data/products";
import { baseURL } from "@/resources";
import styles from "../products.module.scss";

export const dynamicParams = false;
export async function generateStaticParams() { return (await getPublishedProducts()).map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product || product.status !== "published") return { robots: { index: false, follow: false } };
  const url = `${baseURL}/produtos/${product.slug}`;
  return { title: product.seo.title, description: product.seo.description, alternates: { canonical: url }, openGraph: { title: product.seo.title, description: product.seo.description, url, type: "website", images: product.mainImage ? [{ url: `${baseURL}${product.mainImage.src}`, alt: product.mainImage.alt }] : undefined } };
}

function specificationEntries(specifications: Awaited<ReturnType<typeof getProductVariants>>[number]["specifications"]) {
  if (specifications.type === "generic") return specifications.groups;
  if (specifications.type === "television") return [{ label: "Imagem", entries: [
    { key: "screen", label: "Tela", value: `${specifications.screenSizeInches}″ · ${specifications.panelTechnology}` },
    { key: "resolution", label: "Resolução e frequência", value: `${specifications.resolution} · ${specifications.nativeRefreshRateHz} Hz nativos` },
    { key: "hdr", label: "HDR", value: specifications.hdrFormats.join(" · ") },
    { key: "sizes", label: "Tamanhos da linha", value: specifications.availableSizesInches.map((size) => `${size}″`).join(" · ") },
  ]}, { label: "Sistema e conexões", entries: [
    { key: "system", label: "Sistema", value: specifications.operatingSystem },
    { key: "hdmi", label: "HDMI", value: `${specifications.hdmiPorts} portas${specifications.hdmi21Ports !== undefined ? ` · ${specifications.hdmi21Ports} HDMI 2.1` : ""}` },
    { key: "gaming", label: "Jogos", value: [`VRR: ${specifications.vrr ? "sim" : "não"}`, `ALLM: ${specifications.allm ? "sim" : "não"}`, ...specifications.gamingFeatures].join(" · ") },
    { key: "network", label: "Rede", value: `${specifications.wifi} · ${specifications.bluetooth}` },
    { key: "assistants", label: "Assistentes", value: specifications.assistants.join(" · ") || "Não informados" },
  ]}, { label: "Áudio e construção", entries: [
    { key: "audio", label: "Áudio", value: specifications.audio },
    { key: "earc", label: "eARC", value: specifications.earc ? "Sim" : "Não" },
    ...(specifications.dimensionsMm ? [{ key: "dimensions", label: `Dimensões ${specifications.dimensionsMm.includesStand ? "com base" : "sem base"}`, value: `${specifications.dimensionsMm.width} × ${specifications.dimensionsMm.height} × ${specifications.dimensionsMm.depth} mm` }] : []),
    ...(specifications.weightKg ? [{ key: "weight", label: "Peso", value: `${specifications.weightKg} kg` }] : []),
    ...(specifications.warranty ? [{ key: "warranty", label: "Garantia", value: specifications.warranty }] : []),
  ]}];
  if (specifications.type === "notebook") return [{ label: "Desempenho", entries: [
    { key:"processor",label:"Processador",value:`${specifications.processor}${specifications.processorGeneration ? ` · ${specifications.processorGeneration}` : ""}` },
    { key:"gpu",label:"GPU",value:specifications.gpu },
    { key:"ram",label:"Memória",value:`${specifications.ramGb} GB ${specifications.ramType} · ${specifications.ramUpgrade}` },
    { key:"storage",label:"Armazenamento",value:`${specifications.storageGb} GB ${specifications.storageType} · ${specifications.storageUpgrade}` },
  ]},{label:"Tela e mobilidade",entries:[
    { key:"display",label:"Tela",value:`${specifications.display.sizeInches}″ · ${specifications.display.resolution} · ${specifications.display.panelType}${specifications.display.brightnessNits ? ` · ${specifications.display.brightnessNits} nits` : ""}${specifications.display.refreshRateHz ? ` · ${specifications.display.refreshRateHz} Hz` : ""}` },
    { key:"battery",label:"Bateria e fonte",value:`${specifications.batteryWh ? `${specifications.batteryWh} Wh` : "Capacidade não confirmada"}${specifications.chargerWatts ? ` · ${specifications.chargerWatts} W` : ""}` },
    { key:"weight",label:"Peso",value:`${specifications.weightKg} kg` },
    { key:"webcam",label:"Webcam",value:specifications.webcam },
    { key:"keyboard",label:"Teclado",value:specifications.keyboard ?? "Não detalhado" },
  ]},{label:"Conexões e sistema",entries:[
    { key:"ports",label:"Portas",value:specifications.ports.join(" · ") },
    { key:"usb-c",label:"USB-C",value:specifications.usbC },
    { key:"video",label:"Saída de vídeo",value:specifications.videoOutput },
    { key:"wireless",label:"Sem fio",value:`${specifications.wifi} · ${specifications.bluetooth}` },
    { key:"system",label:"Sistema",value:specifications.operatingSystem },
    ...(specifications.warranty ? [{key:"warranty",label:"Garantia",value:specifications.warranty}] : []),
  ]}];
  if (specifications.type === "washer-dryer") return [{ label: "Capacidade e instalação", entries: [
    { key:"capacity",label:"Capacidade",value:`Lava ${specifications.washCapacityKg} kg · seca ${specifications.dryCapacityKg} kg` },
    { key:"loading",label:"Abertura",value:"Frontal" },
    { key:"dimensions",label:"Dimensões",value:`${specifications.dimensionsMm.width} × ${specifications.dimensionsMm.height} × ${specifications.dimensionsMm.depth} mm${specifications.doorOpenDepthMm ? ` · ${specifications.doorOpenDepthMm} mm com a porta aberta` : ""}` },
    { key:"weight",label:"Peso",value:`${specifications.weightKg} kg` },
    { key:"voltage",label:"Tensão da variante",value:specifications.voltage },
  ]},{label:"Lavagem e secagem",entries:[
    { key:"motor",label:"Motor",value:`${specifications.motor} · inverter: ${specifications.inverter ? "sim" : "não"}` },
    { key:"spin",label:"Centrifugação",value:specifications.spinSpeedRpm ? `${specifications.spinSpeedRpm} rpm` : "Não informada" },
    { key:"programs",label:"Programas selecionados",value:specifications.programs.join(" · ") },
    { key:"steam",label:"Vapor e água quente",value:`Vapor: ${specifications.steam ? "sim" : "não"} · ${specifications.hotWater}` },
    { key:"sensors",label:"Sensores",value:specifications.sensors.join(" · ") || "Não informados" },
  ]},{label:"Eficiência e suporte",entries:[
    { key:"connectivity",label:"Conectividade",value:specifications.connectivity.join(" · ") || "Sem conectividade informada" },
    { key:"efficiency",label:"Eficiência",value:[specifications.energyEfficiency,specifications.energyConsumption,specifications.waterConsumption].filter(Boolean).join(" · ") || "Consumos não informados nas fontes consultadas" },
    { key:"warranty",label:"Garantia",value:`${specifications.warranty}${specifications.motorWarranty ? ` · motor: ${specifications.motorWarranty}` : ""}` },
  ]}];
  if (specifications.type === "blender") return [{ label: "Motor e processamento", entries: [
    { key:"power",label:"Potência",value:`${specifications.powerNominalWatts} W nominais${specifications.motorPower ? ` · motor: ${specifications.motorPower}` : ""}` },
    { key:"rotation",label:"Rotação e controle",value:`${specifications.rotationRpm ? `${specifications.rotationRpm.toLocaleString("pt-BR")} rpm · ` : ""}${specifications.speeds} · pulsar: ${specifications.pulse ? "sim" : "não"}` },
    { key:"jar",label:"Copo",value:`${specifications.totalCapacityLiters} L · ${specifications.jarMaterial}${specifications.usefulCapacity ? ` · ${specifications.usefulCapacity}` : ""}` },
    { key:"blade",label:"Lâminas",value:`${specifications.bladeMaterial}${specifications.bladeDescription ? ` · ${specifications.bladeDescription}` : ""}` },
  ]},{label:"Uso e limites",entries:[
    { key:"use",label:"Indicação",value:specifications.intendedUse },
    { key:"recommended",label:"Preparos indicados",value:specifications.recommendedPreparations.join(" · ") },
    { key:"restricted",label:"Preparos restritos",value:specifications.restrictedPreparations.join(" · ") || "Sem restrições adicionais informadas" },
    { key:"safety",label:"Segurança",value:specifications.safetyFeatures.join(" · ") || "Consulte o manual" },
  ]},{label:"Instalação e suporte",entries:[
    { key:"dimensions",label:"Dimensões",value:`${specifications.dimensionsMm.width} × ${specifications.dimensionsMm.height} × ${specifications.dimensionsMm.depth} mm · ${specifications.weightKg} kg` },
    { key:"voltage",label:"Tensão da variante",value:specifications.voltage },
    { key:"noise",label:"Ruído",value:specifications.noiseLevel ?? "Sem medição confiável em dB" },
    { key:"warranty",label:"Garantia",value:specifications.warranty },
  ]}];
  if (specifications.type === "stand-mixer") return [{ label: "Tigela e movimento", entries: [
    { key:"type",label:"Tipo",value:specifications.mixerType },
    { key:"bowl",label:"Tigela",value:`${specifications.bowlCapacityLiters} L · ${specifications.bowlMaterial}` },
    { key:"capacity",label:"Capacidade prática",value:specifications.practicalCapacity },
    { key:"movement",label:"Movimento e velocidades",value:`Planetário: ${specifications.planetaryMovement ? "sim" : "não"} · ${specifications.speeds}${specifications.softStart !== undefined ? ` · partida suave: ${specifications.softStart ? "sim" : "não"}` : ""}` },
  ]},{label:"Preparos e acessórios",entries:[
    { key:"beaters",label:"Batedores",value:specifications.includedBeaters.join(" · ") },
    { key:"recommended",label:"Preparos indicados",value:specifications.recommendedPreparations.join(" · ") },
    { key:"heavy",label:"Massas pesadas",value:specifications.heavyDoughSuitability },
    { key:"accessories",label:"Outros acessórios",value:[...specifications.accessories, specifications.additionalAccessories].filter(Boolean).join(" · ") || "Nenhum informado" },
  ]},{label:"Instalação e suporte",entries:[
    { key:"power",label:"Potência",value:`${specifications.powerWatts} W` },
    { key:"dimensions",label:"Dimensões e peso",value:`${specifications.dimensionsMm.width} × ${specifications.dimensionsMm.height} × ${specifications.dimensionsMm.depth} mm · ${specifications.weightKg} kg` },
    { key:"voltage",label:"Tensão da variante",value:specifications.voltage },
    { key:"use",label:"Uso previsto",value:specifications.intendedUse },
    { key:"warranty",label:"Garantia",value:specifications.warranty },
  ]}];
  return [{ label: "Hardware e tela", entries: [
    { key: "processor", label: "Processador", value: specifications.processor },
    { key: "memory", label: "Memória e armazenamento", value: `${specifications.ramGb} GB RAM · ${specifications.storageGb} GB` },
    { key: "display", label: "Tela", value: `${specifications.display.sizeInches}″ ${specifications.display.technology} · ${specifications.display.resolution}${specifications.display.refreshRateHz ? ` · ${specifications.display.refreshRateHz} Hz` : ""}` },
  ]}, { label: "Bateria e câmeras", entries: [
    { key: "battery", label: "Bateria", value: `${specifications.batteryMah} mAh${specifications.chargingWatts ? ` · carregamento de ${specifications.chargingWatts} W` : ""}` },
    { key: "rear-camera", label: "Câmera traseira", value: [specifications.rearCameras.main, specifications.rearCameras.ultrawide, ...specifications.rearCameras.additional].filter(Boolean).join(" · ") },
    { key: "front-camera", label: "Câmera frontal", value: specifications.frontCamera },
    { key: "video", label: "Vídeo", value: specifications.video },
  ]}, { label: "Conectividade e construção", entries: [
    { key: "connectivity", label: "Conectividade", value: specifications.connectivity.join(" · ") },
    { key: "nfc-5g", label: "NFC e 5G", value: `NFC: ${specifications.nfc ? "sim" : "não"} · 5G: ${specifications.fiveG ? "sim" : "não"}` },
    { key: "protection", label: "Proteção contra água", value: specifications.waterResistance ?? "Não informada pela fonte consultada" },
    { key: "system", label: "Sistema no lançamento", value: specifications.operatingSystemAtLaunch },
    { key: "updates", label: "Política de atualizações", value: specifications.updatePolicy ?? "Não confirmada" },
    { key: "dimensions", label: "Dimensões e peso", value: `${specifications.dimensionsMm.height} × ${specifications.dimensionsMm.width} × ${specifications.dimensionsMm.depth} mm · ${specifications.weightGrams} g` },
  ]}];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProductBySlug((await params).slug);
  if (!product || product.status !== "published" || !product.mainImage) notFound();
  const [variants, offers] = await Promise.all([getProductVariants(product.id), getProductOffers(product.id)]);
  const manufacturer = organizationsById.get(product.manufacturerId);
  const articles = getAllArticles().filter((article) => product.relatedArticleSlugs.includes(article.slug));
  const related = (await Promise.all(product.relatedProductIds.map(getProductById))).filter((item): item is NonNullable<typeof item> => Boolean(item?.status === "published"));
  return <main className={styles.page}>
    <ProductJsonLd product={product} variants={variants} offers={offers} />
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Produtos", url: `${baseURL}/produtos` }, { name: product.name, url: `${baseURL}/produtos/${product.slug}` }]} />
    <header className={styles.productHero}><div className={styles.productImage}><Image src={product.mainImage.src} alt={product.mainImage.alt} fill priority sizes="(max-width: 800px) 100vw, 420px" /></div><div><span>{product.category}{product.releaseYear ? ` · ${product.releaseYear}` : ""}</span><h1>{product.name}</h1><p>{product.shortDescription}</p>{manufacturer ? <p>Fabricante: {manufacturer.status === "published" && manufacturer.profilePath ? <Link href={manufacturer.profilePath}>{manufacturer.name}</Link> : manufacturer.name}</p> : null}</div></header>
    <div className={styles.layout}><article><section><h2>Análise resumida</h2><p>{product.editorialSummary}</p><h3>Pontos fortes</h3><ul>{product.strengths.map((item) => <li key={item}>{item}</li>)}</ul><h3>Limitações</h3><ul>{product.limitations.map((item) => <li key={item}>{item}</li>)}</ul><h3>Para quem é indicado</h3><ul>{product.suitableFor.map((item) => <li key={item}>{item}</li>)}</ul></section>
      {variants.map((variant) => <section key={variant.id}><h2>{variant.name}</h2>{specificationEntries(variant.specifications).map((group) => <div key={group.label}><h3>{group.label}</h3><dl className={styles.specs}>{group.entries.map((entry) => <div key={entry.key}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>)}</dl></div>)}</section>)}
      {articles.length ? <section><h2>Artigos em que aparece</h2><ul>{articles.map((article) => <li key={article.slug}><Link href={`/blog/${article.slug}`}>{article.metadata.title}</Link></li>)}</ul></section> : null}
      {related.length ? <section><h2>Produtos relacionados</h2><ul>{related.map((item) => <li key={item.id}><Link href={`/produtos/${item.slug}`}>{item.name}</Link></li>)}</ul></section> : null}
      <section><h2>Fontes e revisão</h2><p>Ficha revisada em {new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${product.reviewedAt}T12:00:00Z`))}.</p><ul>{product.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul></section></article>
      <aside><h2>Onde comprar</h2><ProductOffers offers={offers} /><p>Preço e estoque são observações datadas, não características permanentes. Links podem gerar comissão quando identificados.</p></aside></div>
  </main>;
}
