"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { GlobalSearchItem } from "@/lib/globalSearch";
import { blog, person } from "@/resources";

import { GlobalSearch } from "./GlobalSearch";
import styles from "./Header.module.scss";

const navItems = [
  { href: "/blog/categorias/criar", label: "Criar", key: "criar" as const },
  { href: "/blog/categorias/vender", label: "Vender", key: "vender" as const },
  { href: "/blog/categorias/estudar", label: "Estudar", key: "estudar" as const },
  { href: "/blog/categorias/ferramentas", label: "Ferramentas", key: "ferramentas" as const },
  { href: "/about", label: "Sobre", key: "about" as const },
] as const;

type HeaderProps = {
  searchItems: GlobalSearchItem[];
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function Header({ searchItems }: HeaderProps) {
  const pathname = usePathname() ?? "";
  const [menuOpen, setMenuOpen] = useState(false);
  const currentSearchItem = searchItems.find((item) => item.href === pathname);
  const currentKeywords = normalize(currentSearchItem?.keywords.join(" ") ?? "");
  const currentTitle = normalize(currentSearchItem?.title ?? "");

  const getArticleCategory = (): (typeof navItems)[number]["key"] | undefined => {
    if (!pathname.startsWith(`${blog.path}/`) || pathname.startsWith(`${blog.path}/categorias`)) {
      return undefined;
    }

    if (
      currentKeywords.includes("fundamentos") ||
      currentKeywords.includes("guia") ||
      currentTitle.includes("termos")
    ) {
      return "estudar";
    }

    if (currentKeywords.includes("design") || currentKeywords.includes("conteudo")) {
      return "criar";
    }

    if (
      currentKeywords.includes("tecnologia") ||
      currentKeywords.includes("operacao") ||
      currentKeywords.includes("google") ||
      currentKeywords.includes("instagram") ||
      currentKeywords.includes("whatsapp")
    ) {
      return "ferramentas";
    }

    if (
      currentKeywords.includes("marketing") ||
      currentKeywords.includes("growth") ||
      currentKeywords.includes("conversao") ||
      currentKeywords.includes("negocios locais") ||
      currentKeywords.includes("clientes")
    ) {
      return "vender";
    }

    return undefined;
  };
  const articleCategory = getArticleCategory();

  const getIsActive = (item: (typeof navItems)[number]) => {
    if (item.key === "about") return pathname.startsWith(item.href);
    return pathname.startsWith(item.href) || articleCategory === item.key;
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
        {navItems.map((item) => (
          <Link
            className={styles.navButton}
            data-active={getIsActive(item)}
            href={item.href}
            key={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
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
