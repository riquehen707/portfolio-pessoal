"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { OfferAction } from "@/components/offers/OfferAction";
import { productDiscoveryTopics, type CommercialStoreItem } from "@/data/products/commercialDiscovery";
import styles from "./ProductStore.module.scss";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
const price = (item: CommercialStoreItem) => item.offer.observedPrice ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: item.offer.observedPrice.currency }).format(item.offer.observedPrice.amount) : undefined;

export function ProductStore({ items, featuredLimit = 6 }: { items: readonly CommercialStoreItem[]; featuredLimit?: number }) {
  const pathname = usePathname(); const router = useRouter(); const params = useSearchParams();
  const query = params.get("q") ?? ""; const category = params.get("categoria") ?? ""; const topic = params.get("tema") ?? "";
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, "pt-BR")), [items]);
  const update = (key: string, value: string) => { const next = new URLSearchParams(params.toString()); value ? next.set(key, value) : next.delete(key); if (key === "tema") next.delete("categoria"); if (key === "categoria") next.delete("tema"); router.replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false }); };
  const filtered = useMemo(() => { const term = normalize(query.trim()); const topicCategories: readonly string[] | undefined = productDiscoveryTopics.find((item) => item.id === topic)?.categories; return items.filter((item) => (!term || normalize([item.title, item.subtitle, item.description, ...item.searchTerms].filter(Boolean).join(" ")).includes(term)) && (!category || item.category === category) && (!topicCategories || item.searchTerms.some((searchTerm) => topicCategories.includes(searchTerm)))); }, [category, items, query, topic]);
  const isExploring = Boolean(query.trim() || category || topic);
  const results = isExploring ? filtered : filtered.slice(0, featuredLimit);
  return <div className={styles.store}>
    <nav className={styles.topicLinks} aria-label="Filtrar produtos por área">
      <button type="button" aria-pressed={!topic && !category} onClick={() => update("tema", "")}>Todos</button>
      {productDiscoveryTopics.map((item) => <button key={item.id} type="button" aria-pressed={topic === item.id} onClick={() => update("tema", item.id)}>{item.label}</button>)}
    </nav>
    <div className={styles.filters}>
      <label className={styles.search}><span>Buscar produtos</span><input type="search" value={query} onChange={(event) => update("q", event.target.value)} placeholder="Produto, marca ou característica" /></label>
      <label><span>Categoria</span><select value={category} onChange={(event) => update("categoria", event.target.value)}><option value="">Todas as categorias</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
    </div>
    <p className={styles.resultCount} aria-live="polite">{isExploring ? `${results.length} ${results.length === 1 ? "item encontrado" : "itens encontrados"}` : `${results.length} produtos em destaque`}</p>
    <div className={styles.grid}>{results.map((item) => <article key={item.id} className={styles.card}>
      <Link href={item.href} className={styles.imageLink} aria-label={`Ver ${item.title}`}>{item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 680px) 45vw, (max-width: 1024px) 30vw, 220px" /> : <span className={styles.imageFallback} aria-hidden="true">{item.title.slice(0, 1)}</span>}</Link>
      <div className={styles.content}><span className={styles.category}>{item.category}</span><h2><Link href={item.href}>{item.title}</Link></h2>{item.subtitle ? <p className={styles.subtitle}>{item.subtitle}</p> : null}<p className={styles.description}>{item.description}</p>
        <div className={styles.actions}><OfferAction className={styles.buyAction} label={`Ver na ${item.offer.retailer}`} offer={{ retailer: item.offer.retailer, url: item.offer.url, affiliateProgram: item.offer.affiliate ? "affiliate" : undefined }} /><Link className={styles.detailsLink} href={item.href}>Ver ficha e contexto editorial</Link></div>
        {price(item) ? <small className={styles.price}>Preço observado: {price(item)}</small> : null}{item.offer.disclosure ? <small className={styles.disclosure}>{item.offer.disclosure}</small> : null}
      </div>
    </article>)}</div>
    {!results.length ? <p className={styles.empty}>Nenhum item comercial corresponde aos filtros atuais.</p> : null}
  </div>;
}
