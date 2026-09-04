import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ProductListCard } from "@/components/products/ProductListCard";
import { getProductOffers, getProductVariants, getPublishedProducts } from "@/data/products";
import { baseURL } from "@/resources";
import styles from "./products.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getPublishedProducts();
  const title = "Acervo editorial de produtos";
  const description = "Produtos pesquisados por modelo e variante, com especificações verificadas, limites editoriais e ofertas comerciais separadas.";
  return { title, description, alternates: { canonical: `${baseURL}/produtos` }, robots: products.length ? undefined : { index: false, follow: true } };
}

export default async function ProductsPage() {
  const products = await getPublishedProducts();
  const cards = await Promise.all(products.map(async (product) => ({ product, variants: await getProductVariants(product.id), offers: await getProductOffers(product.id) })));
  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Produtos", url: `${baseURL}/produtos` }]} />
    <header className={styles.hero}><span>Acervo editorial · produtos</span><h1>Produtos pesquisados para comparar sem esconder os limites.</h1><p>Modelos, variantes e especificações permanentes ficam separados de preços, estoque e links comerciais. Uma comissão nunca determina o que entra no acervo.</p></header>
    <section aria-labelledby="catalog-title"><h2 id="catalog-title">Produtos publicados</h2>{cards.length ? cards.map(({ product, variants, offers }) => <ProductListCard key={product.id} product={product} variants={variants} offers={offers} />) : <p>O acervo está estruturado, mas ainda não possui fichas publicadas. Produtos só aparecem aqui depois da verificação de modelo, variante, especificações e imagens.</p>}</section>
  </main>;
}
