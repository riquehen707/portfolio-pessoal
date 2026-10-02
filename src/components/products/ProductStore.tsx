"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { OfferAction } from "@/components/offers/OfferAction";
import { productDiscoveryTopics, type CommercialStoreItem } from "@/data/products/commercialDiscovery";
import styles from "./ProductStore.module.scss";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
const recommendedIds = [
  "prod_amd_ryzen_5_5500",
  "prod_kingston_nv3_1tb",
  "prod_samsung_galaxy_a26_5g",
  "prod_tcl_p7k",
  "prod_lg_24ms500",
  "prod_asrock_radeon_rx_6600_challenger",
  "prod_canon_eos_r50",
  "prod_oster_bowl_inox_iii",
];

const isAmazonOffer = (item: CommercialStoreItem) => item.offer?.retailer === "Amazon Brasil" && item.offer.affiliate;

function useProductParams() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    value ? next.set(key, value) : next.delete(key);
    if (key === "tema") next.delete("categoria");
    if (key === "categoria") next.delete("tema");
    router.replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false });
  };
  return { params, update };
}

export function ProductBrowseControls({ items }: { items: readonly CommercialStoreItem[] }) {
  const { params, update } = useProductParams();
  const query = params.get("q") ?? "";
  const category = params.get("categoria") ?? "";
  const topic = params.get("tema") ?? "";
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, "pt-BR")), [items]);
  const topics = productDiscoveryTopics.filter((entry) => items.some((item) => entry.categories.some((topicCategory) => item.searchTerms.includes(topicCategory))));

  return <div className={styles.browseControls}>
    <label className={styles.search}>
      <span>Buscar no catálogo</span>
      <input type="search" value={query} onChange={(event) => update("q", event.target.value)} placeholder="Buscar produtos, marcas ou categorias" />
      <span className={styles.searchIcon} aria-hidden="true">⌕</span>
    </label>
    <div className={styles.categoryRow}>
      <nav className={styles.topicLinks} aria-label="Explorar produtos por área">
        <button type="button" aria-pressed={!topic && !category} aria-controls="product-results" onClick={() => update("tema", "")}>Todos</button>
        {topics.map((entry) => <button key={entry.id} type="button" aria-pressed={topic === entry.id} aria-controls="product-results" onClick={() => update("tema", entry.id)}>{entry.label}</button>)}
        <Link href="/livros">Livros</Link>
        <Link href="/quadrinhos">Quadrinhos</Link>
      </nav>
      <details className={styles.moreFilters}>
        <summary>Filtros</summary>
        <label><span>Categoria específica</span><select value={category} onChange={(event) => update("categoria", event.target.value)}><option value="">Todas as categorias</option>{categories.map((entry) => <option key={entry} value={entry}>{entry}</option>)}</select></label>
      </details>
    </div>
  </div>;
}

export function ProductStore({ items, excludedIds = [] }: { items: readonly CommercialStoreItem[]; excludedIds?: readonly string[] }) {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const category = params.get("categoria") ?? "";
  const topic = params.get("tema") ?? "";
  const [visibleCount, setVisibleCount] = useState(8);
  const isFiltering = Boolean(query.trim() || category || topic);
  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    const topicCategories: readonly string[] | undefined = productDiscoveryTopics.find((entry) => entry.id === topic)?.categories;
    const matches = items.filter((item) =>
      (!term || normalize([item.title, item.subtitle, item.description, ...item.searchTerms].filter(Boolean).join(" ")).includes(term)) &&
      (!category || item.category === category) &&
      (!topicCategories || item.searchTerms.some((searchTerm) => topicCategories.includes(searchTerm))) &&
      (isFiltering || !excludedIds.includes(item.id))
    );
    if (isFiltering) return matches;
    const order = new Map(recommendedIds.map((id, index) => [id, index]));
    return matches.sort((left, right) => (order.get(left.id) ?? Infinity) - (order.get(right.id) ?? Infinity));
  }, [category, excludedIds, isFiltering, items, query, topic]);
  const visible = filtered.slice(0, visibleCount);

  return <div className={styles.store} id="product-results">
    <p className={styles.resultCount} aria-live="polite">{isFiltering ? `${filtered.length} ${filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}` : "Uma seleção para começar. Use a busca e os filtros para explorar o catálogo completo."}</p>
    <div className={styles.grid}>{visible.map((item) => <article key={item.id} className={styles.card}>
      <Link href={item.href} className={styles.imageLink} aria-label={`Ver ficha de ${item.title}`}>
        {item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 480px) 42vw, (max-width: 760px) 29vw, (max-width: 1100px) 22vw, 240px" /> : <span className={styles.imageFallback} aria-hidden="true">{item.title.slice(0, 1)}</span>}
      </Link>
      <div className={styles.content}>
        <span className={styles.category}>{item.category}</span>
        <h3><Link href={item.href}>{item.title}</Link></h3>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.actions}>
          {isAmazonOffer(item) && item.offer ? <OfferAction className={styles.buyAction} label="Ver na Amazon" offer={{ retailer: item.offer.retailer, url: item.offer.url, affiliateProgram: "affiliate", commissionDisclosure: item.offer.disclosure }} /> : null}
          <Link className={styles.detailsLink} href={item.href}>Ver detalhes <span aria-hidden="true">→</span></Link>
        </div>
        {isAmazonOffer(item) && item.offer?.observedPrice ? <small className={styles.price}>Preço observado em {item.offer.checkedAt.split("-").reverse().join("/")}: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: item.offer.observedPrice.currency }).format(item.offer.observedPrice.amount)}</small> : null}
      </div>
    </article>)}</div>
    {!filtered.length ? <p className={styles.empty}>Nenhum produto corresponde à busca. Tente outro termo ou remova os filtros.</p> : null}
    {visibleCount < filtered.length ? <button type="button" className={styles.showMore} onClick={() => setVisibleCount((count) => count + 8)}>Mostrar mais produtos <span aria-hidden="true">↓</span></button> : null}
  </div>;
}
