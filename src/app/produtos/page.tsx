import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ProductStore } from "@/components/products/ProductStore";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getCommercialStoreItems, productDiscoveryTopics } from "@/data/products/commercialDiscovery";
import { getPublishedProducts } from "@/data/products";
import { baseURL } from "@/resources";

import styles from "./products.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getPublishedProducts();
  const title = "Produtos recomendados com contexto e ofertas verificadas";
  const description = "Curadorias de tecnologia, casa e cozinha com fichas por modelo, compara\u00e7\u00f5es editoriais e links comerciais identificados. N\u00e3o \u00e9 uma loja pr\u00f3pria.";

  return {
    title,
    description,
    alternates: { canonical: `${baseURL}/produtos` },
    robots: products.length ? undefined : { index: false, follow: true },
    openGraph: { title, description, url: `${baseURL}/produtos`, type: "website" },
  };
}

export default async function ProductsPage() {
  const items = await getCommercialStoreItems();
  const productItems = items.filter((item) => item.kind === "product");
  const readingOfferCount = items.length - productItems.length;
  const products = await getPublishedProducts();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Produtos recomendados",
    description: "Curadorias editoriais de produtos com fichas por modelo e ofertas verificadas.",
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
      <BreadcrumbJsonLd items={[{ name: "In\u00edcio", url: baseURL }, { name: "Produtos", url: `${baseURL}/produtos` }]} />

      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="Navega\u00e7\u00e3o estrutural"><Link href="/">In\u00edcio</Link><span aria-hidden="true">/</span><span aria-current="page">Produtos</span></nav>
        <span>Curadorias de produtos</span>
        <h1>Produtos para escolher com contexto.</h1>
        <p>Esta n\u00e3o \u00e9 uma loja pr\u00f3pria. Aqui voc\u00ea encontra modelos pesquisados, compara\u00e7\u00f5es editoriais e ofertas verificadas quando existirem. Links afiliados s\u00e3o identificados e podem gerar comiss\u00e3o sem custo adicional.</p>
      </header>

      <nav className={styles.discovery} aria-label="Explorar curadorias de produtos">
        {productDiscoveryTopics.map((topic) => <Link key={topic.id} href={`/produtos?tema=${topic.id}`}><strong>{topic.label}</strong><span>{topic.description}</span></Link>)}
      </nav>

      <section aria-labelledby="catalog-title">
        <h2 id="catalog-title">Modelos com oferta verificada</h2>
        {productItems.length ? <Suspense fallback={<p>Carregando filtros de produtos...</p>}><ProductStore items={productItems} /></Suspense> : <p>O acervo est\u00e1 estruturado, mas ainda n\u00e3o possui modelos publicados com oferta verificada.</p>}
      </section>

      <section className={styles.readingBridge} aria-labelledby="reading-title">
        <h2 id="reading-title">Livros e quadrinhos continuam no acervo de leitura.</h2>
        <p>Edi\u00e7\u00f5es com oferta comercial permanecem vinculadas \u00e0s obras, autores e cole\u00e7\u00f5es em suas bibliotecas editoriais — n\u00e3o s\u00e3o tratadas como produtos gen\u00e9ricos.</p>
        <p><Link href="/livros">Explorar livros</Link> · <Link href="/quadrinhos">Explorar quadrinhos e mang\u00e1s</Link>{readingOfferCount ? ` · ${readingOfferCount} edi\u00e7\u00e3o com oferta verificada` : ""}</p>
      </section>
    </main>
  );
}
