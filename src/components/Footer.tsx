import Link from "next/link";

import { person } from "@/resources";

import styles from "./Footer.module.scss";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.identity}>
          <span>
            © {currentYear} {person.name}
          </span>
          <small>
            Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas.
          </small>
        </div>
        <nav className={styles.links} aria-label="Links do rodapé">
          <Link href="/">Início</Link>
          <Link href="/blog">Textos</Link>
          <Link href="/#repertorio">Repertório</Link>
          <Link href="/rss.xml">RSS</Link>
        </nav>
      </div>
    </footer>
  );
}
