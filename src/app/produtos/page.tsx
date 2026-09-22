import type { Metadata } from "next";

import { ProductStore } from "@/components/products/ProductStore";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getCommercialStoreItems } from "@/data/products/commercialDiscovery";
import { getPublishedProducts } from "@/data/products";
import { baseURL } from "@/resources";

import styles from "./products.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getPublishedProducts();
  const title = "Loja curada de produtos";
  const description = "Produtos pesquisados por modelo e variante, com filtros, comparações e links comerciais identificados.";

  return {
    title,
    description,
    alternates: { canonical: `${baseURL}/produtos` },
    robots: products.length ? undefined : { index: false, follow: true },
  };
}

export default async function ProductsPage() {
  const items = await getCommercialStoreItems();

  return (
    <main className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Produtos", url: `${baseURL}/produtos` },
        ]}
      />

      <header className={styles.hero}>
        <span>Loja curada · produtos</span>
        <h1>Escolhas pesquisadas para comprar com contexto.</h1>
        <p>
          Filtre o acervo, compare a ficha antes de decidir e siga para a loja
          quando houver uma oferta verificada. Links afiliados são identificados
          e podem gerar comissão sem custo adicional.
        </p>
      </header>

      <section aria-labelledby="catalog-title">
        <h2 id="catalog-title">Todos os itens com oferta</h2>
        {items.length ? (
          <ProductStore items={items} />
        ) : (
          <p>
            O acervo está estruturado, mas ainda não possui fichas publicadas.
            Produtos só aparecem aqui depois da verificação de modelo, variante,
            especificações e imagens.
          </p>
        )}
      </section>
    </main>
  );
}
