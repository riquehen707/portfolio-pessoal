import Link from "next/link";
import styles from "./ServicesAreaNav.module.scss";

type ServicesArea = "services" | "examples" | "capabilities" | "portfolio";

const links: Array<{ id: ServicesArea; label: string; href: string }> = [
  { id: "services", label: "Oferta", href: "/servicos" },
  { id: "examples", label: "Exemplos", href: "/servicos/exemplos" },
  { id: "capabilities", label: "Capacidades", href: "/servicos/capacidades" },
  { id: "portfolio", label: "Portfólio real", href: "/work" },
];

export function ServicesAreaNav({ active }: { active: ServicesArea }) {
  return (
    <nav className={styles.nav} aria-label="Área de serviços">
      {links.map((link) => (
        <Link href={link.href} aria-current={active === link.id ? "page" : undefined} key={link.id}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
