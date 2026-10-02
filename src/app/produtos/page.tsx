import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { OfferAction } from "@/components/offers/OfferAction";
import { ProductBrowseControls, ProductStore } from "@/components/products/ProductStore";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getCommercialStoreItems } from "@/data/products/commercialDiscovery";
import { getProductCurations } from "@/data/products/productCurations";
import { getPublishedProducts } from "@/data/products";
import { baseURL } from "@/resources";

import styles from "./catalog.module.scss";

const curationEntries = [
  { slug: "pc-gamer-ate-3000", title: "PC gamer até R$ 3 mil", description: "Peças e limites de uma configuração de entrada para jogos." },
  { slug: "melhores-notebooks-custo-beneficio", title: "Notebooks para o dia a dia", description: "Modelos comparados para estudar, trabalhar e usar em casa." },
  { slug: "melhores-cameras-para-iniciantes-2026", title: "Primeira câmera", description: "Corpos e kits para começar a fotografar com mais controle." },
  { slug: "kit-de-ferramentas-para-casa", title: "Ferramentas para casa", description: "O que entra num kit para pequenos reparos domésticos." },
] as const;

const featuredProductIds = ["prod_amd_ryzen_5_7600", "prod_tcl_c6k"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const products = await getPublishedProducts();
  const title = "Produtos recomendados e curadorias";
  const description = "Explore produtos com ficha editorial, compare modelos por categoria e encontre curadorias de tecnologia, PC e casa. Ofertas são identificadas quando disponíveis.";

  return {
    title,
    description,
    alternates: { canonical: `${baseURL}/produtos` },
    robots: products.length ? undefined : { index: false, follow: true },
    openGraph: { title, description, url: `${baseURL}/produtos`, type: "website" },
  };
}

export default async function ProductsPage() {
  const [items, curations, products] = await Promise.all([getCommercialStoreItems(), getProductCurations(), getPublishedProducts()]);
  const productItems = items.filter((item) => item.kind === "product");
  const curationBySlug = new Map(curations.map((curation) => [curation.slug, curation]));
  const featuredProducts = featuredProductIds.flatMap((id) => {
    const product = products.find((entry) => entry.id === id);
    const item = productItems.find((entry) => entry.id === id);
    return product && item ? [{ product, item }] : [];
  });
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Produtos recomendados e curadorias",
    description: "Produtos com ficha editorial e curadorias para comparar modelos por necessidade.",
    url: `${baseURL}/produtos`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, position) => ({ "@type": "ListItem", position: position + 1, url: `${baseURL}/produtos/${product.slug}`, name: product.name })),
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c") }} />
      <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Produtos", url: `${baseURL}/produtos` }]} />

      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="Navegação estrutural"><Link href="/">Início</Link><span aria-hidden="true">/</span><span aria-current="page">Produtos</span></nav>
        <span className={styles.eyebrow}>Produtos</span>
        <h1>Produtos que valem a recomendação.</h1>
        <p>Modelos para comparar com calma: o que oferecem, seus limites e onde encontrar uma oferta identificada.</p>
      </header>

      <Suspense fallback={<div className={styles.controlsFallback}>Carregando busca de produtos…</div>}>
        <ProductBrowseControls items={productItems} />
      </Suspense>

      <section className={styles.curations} aria-labelledby="curations-title">
        <div className={styles.sectionHeading}>
          <div><span className={styles.eyebrow}>Por onde começar</span><h2 id="curations-title">Curadorias em destaque</h2></div>
        </div>
        <div className={styles.curationGrid}>
          {curationEntries.map((entry, index) => {
            const curation = curationBySlug.get(entry.slug);
            if (!curation) return null;
            return <Link key={entry.slug} href={`/blog/${curation.slug}`} className={styles.curationCard}>
              <span className={styles.curationIndex} aria-hidden="true">0{index + 1}</span>
              <span className={styles.curationTitle}>{entry.title}</span>
              <span className={styles.curationDescription}>{entry.description}</span>
              <span className={styles.curationArrow} aria-hidden="true">↗</span>
            </Link>;
          })}
        </div>
      </section>

      <section className={styles.catalog} aria-labelledby="catalog-title" id="catalogo">
        <div className={styles.sectionHeading}>
          <div><span className={styles.eyebrow}>Acervo</span><h2 id="catalog-title">Produtos recomendados</h2></div>
          <p>Encontre o modelo e abra a ficha para conferir variantes, pontos fortes e limitações.</p>
        </div>
        {productItems.length ? <Suspense fallback={<p>Carregando produtos…</p>}><ProductStore items={productItems} excludedIds={featuredProductIds} /></Suspense> : <p>Ainda não há produtos publicados no catálogo.</p>}
      </section>

      {featuredProducts.length ? <section className={styles.featured} aria-labelledby="featured-title">
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Em foco</span><h2 id="featured-title">Escolhas em destaque</h2></div></div>
        <div className={styles.featuredGrid}>{featuredProducts.map(({ product, item }) => <article key={product.id} className={styles.featuredCard}>
          <Link href={item.href} className={styles.featuredImage} aria-label={`Ver ficha de ${item.title}`}>
            {item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 700px) 42vw, (max-width: 1100px) 24vw, 210px" /> : <span aria-hidden="true">{item.title.slice(0, 1)}</span>}
          </Link>
          <div className={styles.featuredContent}>
            <span className={styles.featuredCategory}>{item.category}</span>
            <h3><Link href={item.href}>{item.title}</Link></h3>
            <p>{product.strengths[0]}</p>
            {item.offer?.retailer === "Amazon Brasil" && item.offer.affiliate ? <OfferAction className={styles.featuredAction} label="Ver preço na Amazon" offer={{ retailer: item.offer.retailer, url: item.offer.url, affiliateProgram: "affiliate", commissionDisclosure: item.offer.disclosure }} /> : <Link href={item.href} className={styles.featuredDetails}>Ver detalhes <span aria-hidden="true">→</span></Link>}
          </div>
        </article>)}</div>
      </section> : null}

      <nav className={styles.explore} aria-label="Continuar explorando">
        <span className={styles.eyebrow}>Continue explorando</span>
        <div><Link href="/livros">Livros <span aria-hidden="true">↗</span></Link><Link href="/quadrinhos">Quadrinhos <span aria-hidden="true">↗</span></Link><Link href="/produtos?tema=tecnologia#catalogo">Tecnologia <span aria-hidden="true">↗</span></Link><Link href="/produtos?tema=pc-hardware#catalogo">PC e hardware <span aria-hidden="true">↗</span></Link><Link href="/produtos?tema=casa#catalogo">Casa <span aria-hidden="true">↗</span></Link></div>
      </nav>
    </main>
  );
}
