import Link from "next/link";

import { person } from "@/resources";

import styles from "./Footer.module.scss";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <span>
          © {currentYear} {person.name}
        </span>
        <nav className={styles.links} aria-label="Links do rodapé">
          <Link href="/#linha-do-tempo">Linha</Link>
          <Link href="/blog">Textos</Link>
          <Link href="/blog/temas">Temas</Link>
          <Link href="/#repertorio">Repertório</Link>
          <Link href="/rss.xml">RSS</Link>
        </nav>
      </div>
    </footer>
  );
}
