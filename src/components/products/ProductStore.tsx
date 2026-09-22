"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import type { CommercialStoreItem } from "@/data/products/commercialDiscovery";
import styles from "./ProductStore.module.scss";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
const price = (item: CommercialStoreItem) => item.offer.observedPrice ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: item.offer.observedPrice.currency }).format(item.offer.observedPrice.amount) : undefined;

export function ProductStore({ items }: { items: readonly CommercialStoreItem[] }) {
  const pathname = usePathname(); const router = useRouter(); const params = useSearchParams();
  const query = params.get("q") ?? ""; const category = params.get("categoria") ?? "";
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, "pt-BR")), [items]);
  const update = (key: string, value: string) => { const next = new URLSearchParams(params.toString()); value ? next.set(key, value) : next.delete(key); router.replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false }); };
  const results = useMemo(() => { const term = normalize(query.trim()); return items.filter((item) => (!term || normalize([item.title, item.subtitle, item.description, ...item.searchTerms].filter(Boolean).join(" ")).includes(term)) && (!category || item.category === category)); }, [category, items, query]);
  return <div className={styles.store}>
    <div className={styles.filters}>
      <label className={styles.search}><span>Buscar na loja</span><input type="search" value={query} onChange={(event) => update("q", event.target.value)} placeholder="Produto, livro, autor ou característica" /></label>
      <label><span>Categoria</span><select value={category} onChange={(event) => update("categoria", event.target.value)}><option value="">Todas as categorias</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
    </div>
    <p className={styles.resultCount} aria-live="polite">{results.length} {results.length === 1 ? "item encontrado" : "itens encontrados"}</p>
    <div className={styles.grid}>{results.map((item) => <article key={item.id} className={styles.card}>
      <Link href={item.href} className={styles.imageLink} aria-label={`Ver ${item.title}`}>{item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 680px) 45vw, (max-width: 1024px) 30vw, 220px" /> : <span className={styles.imageFallback} aria-hidden="true">{item.title.slice(0, 1)}</span>}</Link>
      <div className={styles.content}><span className={styles.category}>{item.category}</span><h2><Link href={item.href}>{item.title}</Link></h2>{item.subtitle ? <p className={styles.subtitle}>{item.subtitle}</p> : null}<p>{item.description}</p>
        <div className={styles.actions}><a className={styles.buyButton} href={item.offer.url} rel={item.offer.affiliate ? "sponsored nofollow noreferrer" : "nofollow noreferrer"} target="_blank">Ver na {item.offer.retailer}<span aria-hidden="true">↗</span></a><Link className={styles.detailsLink} href={item.href}>Ver ficha e contexto editorial</Link></div>
        {price(item) ? <small className={styles.price}>Preço observado: {price(item)}</small> : null}{item.offer.disclosure ? <small className={styles.disclosure}>{item.offer.disclosure}</small> : null}
      </div>
    </article>)}</div>
    {!results.length ? <p className={styles.empty}>Nenhum item comercial corresponde aos filtros atuais.</p> : null}
  </div>;
}
