import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { OfferAction } from "@/components/offers/OfferAction";
import { ProductStore } from "@/components/products/ProductStore";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getCommercialStoreItems, productDiscoveryTopics } from "@/data/products/commercialDiscovery";
import { getProductCurations } from "@/data/products/productCurations";
import { getPublishedProducts } from "@/data/products";
import { baseURL } from "@/resources";

import styles from "./products.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getPublishedProducts();
  const title = "Curadorias de produtos, equipamentos e leituras";
  const description = "Guias editoriais e modelos selecionados de tecnologia, casa, cozinha e leitura, com fichas por produto e ofertas identificadas quando houver.";

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
  const readingItems = items.filter((item) => item.kind === "reading-edition");
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Curadorias de produtos, equipamentos e leituras",
    description: "Curadorias editoriais com modelos selecionados, fichas por produto e ofertas verificadas quando existirem.",
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
        <span className={styles.eyebrow}>Curadoria editorial</span>
        <h1>Produtos que valem a recomendação.</h1>
        <p className={styles.lead}>Guias para entender uma escolha antes de abrir uma oferta. Os modelos aparecem com ficha, contexto e link comercial identificado quando houver.</p>
      </header>

      <nav className={styles.categoryNav} aria-label="Explorar por assunto">
        {productDiscoveryTopics.map((topic) => <Link key={topic.id} href={`/produtos?tema=${topic.id}`}>{topic.label}</Link>)}
        <Link href="#edicoes">Livros</Link>
        <Link href="#edicoes">Mangás e quadrinhos</Link>
      </nav>

      {curations.length ? <section className={styles.curations} aria-labelledby="curations-title">
        <div className={styles.sectionHeader}><div><span className={styles.eyebrow}>Para começar</span><h2 id="curations-title">Guias que ajudam a escolher.</h2></div><p>As recomendações ficam ligadas aos artigos em que fazem sentido, em vez de aparecerem como uma prateleira solta.</p></div>
        <div className={styles.curationGrid}>
          {curations.map((curation) => <article key={curation.slug} className={styles.curationCard}>
            <Link href={`/blog/${curation.slug}`} className={styles.curationImage} aria-label={`Ler ${curation.title}`}>
              {curation.image ? <Image src={curation.image.src} alt={curation.image.alt} fill sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw" /> : <span aria-hidden="true">{curation.title.slice(0, 1)}</span>}
            </Link>
            <div className={styles.curationContent}>
              <span>{curation.category ?? "Guia"}</span>
              <h3><Link href={`/blog/${curation.slug}`}>{curation.title}</Link></h3>
              {curation.summary ? <p>{curation.summary}</p> : null}
              <Link href={`/blog/${curation.slug}`} className={styles.textLink}>Ler guia <span aria-hidden="true">→</span></Link>
            </div>
          </article>)}
        </div>
      </section> : null}

      <section className={styles.models} aria-labelledby="catalog-title">
        <div className={styles.sectionHeader}><div><span className={styles.eyebrow}>Seleção</span><h2 id="catalog-title">Modelos em destaque.</h2></div><p>Use os filtros para procurar no catálogo. Cada item leva à ficha específica e, quando houver, à oferta correspondente.</p></div>
        {productItems.length ? <Suspense fallback={<p>Carregando filtros de produtos...</p>}><ProductStore items={productItems} /></Suspense> : <p>O acervo está estruturado, mas ainda não possui modelos publicados com oferta verificada.</p>}
      </section>

      <section id="edicoes" className={styles.readingSection} aria-labelledby="reading-title">
        <div className={styles.sectionHeader}><div><span className={styles.eyebrow}>Acervo de leitura</span><h2 id="reading-title">Edições que continuam no acervo.</h2></div><p>Livros, mangás e quadrinhos permanecem vinculados a suas obras, autores e coleções — não entram como produtos genéricos.</p></div>
        {readingItems.length ? <div className={styles.readingGrid}>{readingItems.map((item) => <article key={item.id} className={styles.readingCard}>
          <Link href={item.href} className={styles.readingImage} aria-label={`Ver ${item.title}`}>
            {item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 680px) 38vw, (max-width: 980px) 25vw, 180px" /> : <span aria-hidden="true">{item.title.slice(0, 1)}</span>}
          </Link>
          <div><span>{item.category}</span><h3><Link href={item.href}>{item.title}</Link></h3>{item.subtitle ? <p>{item.subtitle}</p> : null}<OfferAction className={styles.readingAction} kind="reading" label="Ver edição na Amazon" offer={{ retailer: item.offer.retailer, url: item.offer.url, affiliateProgram: item.offer.affiliate ? "affiliate" : undefined, commissionDisclosure: item.offer.disclosure }} /></div>
        </article>)}</div> : <p>As edições com oferta aparecem aqui quando estiverem vinculadas ao acervo.</p>}
        <p className={styles.readingLinks}><Link href="/livros">Explorar livros</Link><span aria-hidden="true">·</span><Link href="/quadrinhos">Explorar quadrinhos e mangás</Link></p>
      </section>
    </main>
  );
}
