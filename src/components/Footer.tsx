import Link from "next/link";

import { Text } from "@once-ui-system/core";

import { about, blog, brandMessaging, person, productsPage, social, work } from "@/resources";

import { BrandSignature } from "./BrandSignature";
import styles from "./Footer.module.scss";

const footerLinks = [
  { href: work.path, label: "Projetos" },
  { href: about.path, label: "Sobre" },
  { href: blog.path, label: "Blog" },
  { href: productsPage.path, label: "Produtos" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.identity}>
          <BrandSignature href="/" compact className={styles.brandSignature} />
          <Text className={styles.statement} variant="body-default-s" onBackground="neutral-weak">
            {brandMessaging.footerStatement}
          </Text>
        </div>

        <nav className={styles.nav} aria-label="Links do rodapé">
          <div className={styles.linkGroup}>
            {footerLinks.map((item) => (
              <Link className={styles.link} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.linkGroup}>
            {social.map((item) =>
              item.link ? (
                <a
                  className={styles.link}
                  href={item.link}
                  key={item.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.name}
                </a>
              ) : null,
            )}
          </div>
        </nav>

        <Text className={styles.copy} variant="body-default-s" onBackground="neutral-weak">
          © {currentYear} {person.name} / {brandMessaging.supportingStatement}
        </Text>
      </div>
    </footer>
  );
}
