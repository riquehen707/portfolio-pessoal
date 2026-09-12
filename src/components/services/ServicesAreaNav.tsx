import Link from "next/link";

import styles from "./ServicesAreaNav.module.scss";

type ServicesArea =
  | "services"
  | "examples"
  | "inspirations"
  | "capabilities"
  | "portfolio";

const links: Array<{
  id: ServicesArea;
  label: string;
  href: string;
}> = [
  {
    id: "services",
    label: "Serviço",
    href: "/servicos",
  },
  {
    id: "inspirations",
    label: "Inspirações",
    href: "/servicos#inspiracoes",
  },
  {
    id: "capabilities",
    label: "Capacidades",
    href: "/servicos/capacidades",
  },
  {
    id: "portfolio",
    label: "Portfólio",
    href: "/work",
  },
];

export function ServicesAreaNav({
  active,
}: {
  active: ServicesArea;
}) {
  return (
    <nav
      className={styles.nav}
      aria-label="Navegação da área de serviços"
    >
      <div className={styles.links}>
        {links.map((link) => {
          const isActive = active === link.id;

          return (
            <Link
              className={styles.link}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              key={link.id}
            >
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
