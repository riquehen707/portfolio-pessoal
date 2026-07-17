import styles from "./NextSection.module.scss";

export function NextSection({ href, title }: { href: string; title: string }) {
  return (
    <nav className={styles.root} aria-label={`Próxima seção: ${title}`}>
      <a href={href}>Próxima: {title} →</a>
    </nav>
  );
}
