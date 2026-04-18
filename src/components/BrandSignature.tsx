import Link from "next/link";

import classNames from "classnames";

import styles from "./BrandSignature.module.scss";

type BrandSignatureProps = {
  href?: string;
  compact?: boolean;
  descriptor?: string;
  className?: string;
};

function BrandSignatureInner({
  compact = false,
  descriptor = "Estratégia, design e sistemas",
}: Omit<BrandSignatureProps, "href" | "className">) {
  return (
    <>
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.copy}>
        <span className={styles.name}>Henrique Reis</span>
        <span className={styles.descriptor}>{descriptor}</span>
      </span>
    </>
  );
}

export function BrandSignature({
  href,
  compact = false,
  descriptor,
  className,
}: BrandSignatureProps) {
  const classes = classNames(compact ? styles.compact : undefined, className);

  if (href) {
    return (
      <Link href={href} className={classNames(styles.link, classes)} aria-label="Henrique Reis">
        <BrandSignatureInner compact={compact} descriptor={descriptor} />
      </Link>
    );
  }

  return (
    <div className={classNames(styles.root, classes)}>
      <BrandSignatureInner compact={compact} descriptor={descriptor} />
    </div>
  );
}
