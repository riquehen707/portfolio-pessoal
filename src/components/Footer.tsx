import Link from "next/link";

import { Text } from "@once-ui-system/core";

import {
  about,
  audiencePages,
  blog,
  brandMessaging,
  contact,
  person,
  productsPage,
  services,
  servicesPage,
  simulationPage,
  social,
  technicalApproach,
  work,
} from "@/resources";

import styles from "./Footer.module.scss";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const primaryLinks: FooterLink[] = [
  { href: "/", label: "Início" },
  { href: work.path, label: "Projetos" },
  { href: about.path, label: "Sobre" },
  { href: blog.path, label: "Blog" },
  { href: servicesPage.path, label: "Serviços" },
  { href: productsPage.path, label: "Produtos" },
  { href: contact.path, label: "Contato" },
];

const contentLinks: FooterLink[] = [
  { href: "/blog/temas", label: "Temas do blog" },
  { href: "/blog/termos-de-marketing", label: "Termos de marketing" },
  { href: "/blog/termos-de-design", label: "Termos de design" },
  { href: "/blog/como-entender-receita-margem-custos-e-volume", label: "Receita, margem e custos" },
  { href: "/rss.xml", label: "RSS" },
];

const utilityLinks: FooterLink[] = [
  { href: simulationPage.path, label: simulationPage.label },
  { href: technicalApproach.path, label: technicalApproach.label },
  { href: "mailto:oi@henriquereis.dev", label: person.email, external: true },
  { href: "https://wa.me/5575983675164", label: "WhatsApp", external: true },
];

const footerGroups: FooterGroup[] = [
  {
    title: "Mapa",
    links: primaryLinks,
  },
  {
    title: "Serviços",
    links: [
      { href: servicesPage.path, label: "Todos os serviços" },
      ...services.slice(0, 5).map((service) => ({
        href: `${servicesPage.path}/${service.slug}`,
        label: service.title,
      })),
    ],
  },
  {
    title: "Públicos",
    links: audiencePages.map((audience) => ({
      href: audience.path,
      label: audience.label,
    })),
  },
  {
    title: "Conteúdo",
    links: contentLinks,
  },
];

function FooterLinkItem({ href, label, external }: FooterLink) {
  if (external) {
    return (
      <a className={styles.link} href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link className={styles.link} href={href}>
      {label}
    </Link>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <nav className={styles.nav} aria-label="Links do rodapé">
          {footerGroups.map((group) => (
            <section className={styles.group} key={group.title}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <div className={styles.linkList}>
                {group.links.map((item) => (
                  <FooterLinkItem key={`${group.title}-${item.href}`} {...item} />
                ))}
              </div>
            </section>
          ))}

          <section className={styles.group}>
            <h3 className={styles.groupTitle}>Contato</h3>
            <div className={styles.linkList}>
              {utilityLinks.map((item) => (
                <FooterLinkItem key={item.href} {...item} />
              ))}
              {social.map((item) =>
                item.link ? (
                  <FooterLinkItem key={item.name} href={item.link} label={item.name} external />
                ) : null,
              )}
            </div>
          </section>
        </nav>

        <div className={styles.bottom}>
          <Text className={styles.copy} variant="body-default-s" onBackground="neutral-weak">
            © {currentYear} {person.name}. {brandMessaging.supportingStatement}
          </Text>
          <div className={styles.metaLinks} aria-label="Links técnicos">
            <Link className={styles.metaLink} href="/sitemap.xml">
              Sitemap
            </Link>
            <Link className={styles.metaLink} href="/robots.txt">
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
