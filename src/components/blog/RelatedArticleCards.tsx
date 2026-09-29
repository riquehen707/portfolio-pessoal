import Image from "next/image";
import Link from "next/link";

import styles from "./RelatedArticleCards.module.scss";

export type RelatedArticleCard = {
  title: string;
  href: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
};

export function RelatedArticleCards({ items }: { items: RelatedArticleCard[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Link className={styles.card} href={item.href} key={item.href}>
          {item.image ? (
            <span className={styles.media}>
              <Image src={item.image} alt={item.imageAlt ?? item.title} fill unoptimized sizes="(max-width: 768px) 100vw, 320px" />
            </span>
          ) : null}
          <span className={styles.content}>
            {item.category ? <span className={styles.category}>{item.category}</span> : null}
            <strong>{item.title}</strong>
            {item.summary ? <span className={styles.summary}>{item.summary}</span> : null}
          </span>
        </Link>
      ))}
    </div>
  );
}
