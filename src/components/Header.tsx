"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { GlobalSearchItem } from "@/lib/globalSearch";
import { blog, person } from "@/resources";

import { GlobalSearch } from "./GlobalSearch";
import styles from "./Header.module.scss";

const navItems = [
  { href: "/", label: "Início", key: "home" as const },
  { href: "/blog", label: "Blog", key: "blog" as const },
  { href: "/blog/cultura", label: "Estudos", key: "studies" as const },
  { href: "/filmes", label: "Filmes", key: "movies" as const },
  { label: "Loja", key: "store" as const, disabled: true },
  { href: "/about", label: "Sobre", key: "about" as const },
] as const;

type HeaderProps = {
  searchItems: GlobalSearchItem[];
};

export function Header({ searchItems }: HeaderProps) {
  const pathname = usePathname() ?? "";
  const [menuOpen, setMenuOpen] = useState(false);

  const getIsActive = (item: (typeof navItems)[number]) => {
    if (!("href" in item)) return false;
    if (item.key === "home") return pathname === "/";
    if (item.key === "blog") {
      return pathname.startsWith("/blog") && !pathname.startsWith("/blog/cultura");
    }
    return pathname.startsWith(item.href);
  };

  return (
    <header className={styles.position}>
      <Link className={styles.brand} href={blog.path}>
        <span className={styles.brandMark} aria-hidden="true" />
        <span className={styles.brandText}>{person.name}</span>
      </Link>

      <nav
        className={styles.navShell}
        data-open={menuOpen}
        id="main-navigation"
        aria-label="Menu principal"
      >
        {navItems.map((item) => "href" in item ? (
          <Link className={styles.navButton} data-active={getIsActive(item)} href={item.href} key={item.key} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ) : (
          <span className={styles.navButton} data-disabled="true" aria-disabled="true" title="Em breve" key={item.key}>
            {item.label}<small>Em breve</small>
          </span>
        ))}
      </nav>

      <div className={styles.actions}>
        <GlobalSearch items={searchItems} />
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          Menu
        </button>
      </div>
    </header>
  );
}
