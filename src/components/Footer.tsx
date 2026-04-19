import Link from "next/link";

import { Column, Text } from "@once-ui-system/core";

import { about, blog, brandMessaging, person, work } from "@/resources";

import { BrandSignature } from "./BrandSignature";
import styles from "./Footer.module.scss";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: work.path, label: "Works" },
  { href: about.path, label: "About" },
  { href: blog.path, label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <Column className={styles.identity} gap="12">
          <BrandSignature href="/" />
          <Text className={styles.statement} onBackground="neutral-weak" variant="body-default-s">
            Clareza gera resultado.
          </Text>
        </Column>

        <Column className={styles.group} gap="12">
          <Text className={styles.groupLabel} variant="label-default-s" onBackground="neutral-weak">
            Links uteis
          </Text>
          <div className={styles.linkList}>
            {footerLinks.map((item) => (
              <Link className={styles.link} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </Column>

        <Column className={styles.group} gap="12">
          <Text className={styles.groupLabel} variant="label-default-s" onBackground="neutral-weak">
            Contato
          </Text>
          <div className={styles.linkList}>
            <a className={styles.link} href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <a className={styles.link} href="https://wa.me/5575983675164">
              WhatsApp
            </a>
            <Text className={styles.copy} onBackground="neutral-weak" variant="body-default-s">
              © {currentYear} {person.name}. {brandMessaging.signatureDescriptor}.
            </Text>
          </div>
        </Column>
      </div>
    </footer>
  );
}
