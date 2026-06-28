"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { GlobalSearchItem } from "@/lib/globalSearch";
import { blog, person } from "@/resources";

import { GlobalSearch } from "./GlobalSearch";
import styles from "./Header.module.scss";

const navItems = [
  { href: blog.path, label: "Artigos", key: "blog" as const },
  { href: `${blog.path}/temas`, label: "Temas", key: "topics" as const },
] as const;

type HeaderProps = {
  searchItems: GlobalSearchItem[];
};

export function Header({ searchItems }: HeaderProps) {
  const pathname = usePathname() ?? "";
  const getIsActive = (item: (typeof navItems)[number]) => {
    if (item.key === "blog") {
      return (
        pathname === blog.path ||
        (pathname.startsWith(`${blog.path}/`) && !pathname.startsWith(`${blog.path}/temas`))
      );
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <header className={styles.position}>
      <Link className={styles.brand} href="/">
        {person.name}
      </Link>

      <nav className={styles.navShell} aria-label="Menu principal">
        {navItems.map((item) => (
          <Link
            className={styles.navButton}
            data-active={getIsActive(item)}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.searchSlot}>
        <GlobalSearch items={searchItems} />
      </div>
    </header>
  );
}
