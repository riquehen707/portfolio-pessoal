import Link from "next/link";

import styles from "./ServicesNextStep.module.scss";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  label: string;
};

export function ServicesNextStep({ eyebrow, title, description, href, label }: Props) {
  return (
    <footer className={styles.nextStep}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <Link href={href}>{label} <span aria-hidden="true">→</span></Link>
    </footer>
  );
}
