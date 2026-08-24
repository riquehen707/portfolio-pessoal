"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { blog, person } from "@/resources";

import { GlobalSearch } from "./GlobalSearch";
import styles from "./Header.module.scss";

const primaryContentLinks = [
  { href: "/blog", label: "Artigos" },
  { href: "/ideias", label: "Ideias" },
] as const;

const collectionLinks = [
  { href: "/filmes", label: "Filmes", collection: true },
  { href: "/series", label: "Séries", collection: true },
  { href: "/livros", label: "Livros", collection: true },
  { href: "/quadrinhos", label: "Quadrinhos e mangás", collection: true },
  { href: "/personalidades", label: "Personalidades", collection: true },
  { href: "/estudios", label: "Estúdios", collection: true },
] as const;

const toolsLink = { href: "/servicos/produtos", label: "Ferramentas" } as const;

const henriqueLinks = [
  { href: "/work", label: "Portfólio" },
  { href: "/servicos", label: "Serviços", exact: true },
  { href: "/about", label: "Sobre mim" },
] as const;

type MenuLink = (typeof primaryContentLinks)[number] | (typeof collectionLinks)[number] | typeof toolsLink | (typeof henriqueLinks)[number];

function isCurrentPath(pathname: string, item: MenuLink) {
  if ("exact" in item && item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "";
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        headerRef.current?.querySelector<HTMLButtonElement>("[aria-controls='main-navigation']")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const renderLink = (item: MenuLink) => (
    <Link
      aria-current={isCurrentPath(pathname, item) ? "page" : undefined}
      className={styles.menuLink}
      data-active={isCurrentPath(pathname, item)}
      href={item.href}
      key={item.href}
      onClick={() => setMenuOpen(false)}
    >
      {item.label}
    </Link>
  );

  return (
    <header className={styles.position} ref={headerRef}>
      <Link className={styles.brand} href={blog.path} onClick={() => setMenuOpen(false)}>
        <span className={styles.brandMark} aria-hidden="true" />
        <span className={styles.brandText}>{person.name}</span>
      </Link>

      <div className={styles.actions}>
        <GlobalSearch />
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? "Fechar" : "Menu"}
        </button>
      </div>

      <nav
        className={styles.navShell}
        data-open={menuOpen}
        id="main-navigation"
        aria-label="Menu principal"
      >
        <section className={styles.menuGroup} aria-labelledby="menu-content-title">
          <h2 id="menu-content-title">Conteúdo</h2>
          <div className={styles.primaryLinks}>{primaryContentLinks.map(renderLink)}</div>
          <p className={styles.subgroupLabel}>Acervos</p>
          <div className={styles.collectionLinks}>{collectionLinks.map(renderLink)}</div>
          <div className={styles.primaryLinks}>{renderLink(toolsLink)}</div>
        </section>
        <section className={styles.menuGroup} aria-labelledby="menu-henrique-title">
          <h2 id="menu-henrique-title">Henrique</h2>
          <div className={styles.primaryLinks}>{henriqueLinks.map(renderLink)}</div>
        </section>
      </nav>
    </header>
  );
}
