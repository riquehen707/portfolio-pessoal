import Link from "next/link";

import { IconButton, Row, Text } from "@once-ui-system/core";

import { about, blog, brandMessaging, contact, person, social, work } from "@/resources";

import { BrandSignature } from "./BrandSignature";
import styles from "./Footer.module.scss";

const footerLinks = [
  { href: work.path, label: "Projetos" },
  { href: about.path, label: "Sobre" },
  { href: blog.path, label: "Blog" },
  { href: contact.path, label: "Contato" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.identity}>
          <BrandSignature href="/" compact className={styles.brandSignature} />
          <Text className={styles.statement} variant="body-default-s" onBackground="neutral-weak">
            {brandMessaging.ogFooter}
          </Text>
        </div>

        <nav className={styles.nav} aria-label="Links do rodapé">
          {footerLinks.map((item) => (
            <Link className={styles.link} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Row className={styles.social} gap="8" vertical="center">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Row>

        <Text className={styles.copy} variant="body-default-s" onBackground="neutral-weak">
          © {currentYear} {person.name} / {brandMessaging.supportingStatement}
        </Text>
      </div>
    </footer>
  );
}
