import styles from "./OfferAction.module.scss";

type OfferActionOffer = {
  retailer?: string;
  store?: string;
  url: string;
  affiliateProgram?: string;
  commissionDisclosure?: string;
};

type OfferActionProps = {
  offer: OfferActionOffer;
  kind?: "product" | "reading";
  className?: string;
  label?: string;
  locale?: "pt-BR" | "en";
};

export function OfferAction({ offer, kind = "product", className, label: customLabel, locale = "pt-BR" }: OfferActionProps) {
  const retailer = offer.retailer ?? offer.store ?? "loja";
  const isAmazon = retailer === "Amazon Brasil" || retailer === "Amazon.com";
  const defaultLabel = isAmazon
    ? locale === "en"
      ? kind === "reading" ? "View edition on Amazon" : "View price on Amazon"
      : kind === "reading" ? "Ver edição na Amazon" : "Ver na Amazon"
    : kind === "reading"
      ? `Ver edição em ${retailer}`
      : `Ver em ${retailer}`;
  const label = customLabel ?? defaultLabel;

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <a
        className={styles.action}
        href={offer.url}
        target="_blank"
        rel={offer.affiliateProgram ? "sponsored nofollow noreferrer" : "nofollow noreferrer"}
      >
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
      {offer.commissionDisclosure ? (
        <small className={styles.disclosure}>{offer.commissionDisclosure}</small>
      ) : null}
    </div>
  );
}
