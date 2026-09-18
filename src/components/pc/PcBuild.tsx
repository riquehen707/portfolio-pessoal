import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

import { getProductById, getProductOffers } from "@/data/products";

import styles from "./PcBuild.module.scss";

const BuildItemSchema = z
  .object({
    role: z.string().min(1),
    productId: z.string().regex(/^prod_[a-z0-9_]+$/).optional(),
    name: z.string().min(1).optional(),
    note: z.string().min(1),
    price: z.number().nonnegative().optional(),
  })
  .refine((item) => item.productId || item.name, {
    message: "Cada item da build precisa de productId ou name.",
  });

const PcBuildSchema = z.object({
  eyebrow: z.string().min(1).default("Build recomendada"),
  title: z.string().min(1),
  description: z.string().min(1),
  profile: z.string().min(1),
  bestFor: z.array(z.string().min(1)).min(1).max(4),
  updatedAt: z.string().min(1),
  items: z.array(BuildItemSchema).min(2),
  capabilities: z
    .array(
      z.object({
        label: z.string().min(1),
        level: z.number().int().min(1).max(5),
        verdict: z.string().min(1),
        detail: z.string().min(1),
      }),
    )
    .min(2)
    .max(6),
  note: z.string().min(1),
});

type BuildItem = z.infer<typeof BuildItemSchema>;

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

function getRoleCode(role: string) {
  const normalized = role.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  const aliases: Record<string, string> = {
    "PROCESSADOR E VIDEO": "APU",
    PROCESSADOR: "CPU",
    "PLACA DE VIDEO": "GPU",
    "PLACA-MAE": "MB",
    MEMORIA: "RAM",
    ARMAZENAMENTO: "SSD",
    FONTE: "PSU",
    GABINETE: "CASE",
  };

  return aliases[normalized] ?? normalized.slice(0, 4);
}

async function resolveItem(item: BuildItem) {
  if (!item.productId) {
    return { ...item, product: undefined, price: item.price };
  }

  const [product, offers] = await Promise.all([
    getProductById(item.productId),
    getProductOffers(item.productId),
  ]);

  if (!product) {
    throw new Error(`PcBuild referencia produto inexistente: ${item.productId}`);
  }

  const availableOffers = offers
    .filter((offer) => offer.availability === "available" && offer.observedPrice)
    .sort(
      (left, right) =>
        (left.observedPrice?.amount ?? Number.POSITIVE_INFINITY) -
        (right.observedPrice?.amount ?? Number.POSITIVE_INFINITY),
    );

  return {
    ...item,
    product,
    price: item.price ?? availableOffers[0]?.observedPrice?.amount,
  };
}

export async function PcBuild({ data }: { data: string }) {
  const build = PcBuildSchema.parse(JSON.parse(data));
  const items = await Promise.all(build.items.map(resolveItem));
  const pricedItems = items.filter((item) => typeof item.price === "number");
  const total = pricedItems.reduce((sum, item) => sum + (item.price ?? 0), 0);
  const hasCompletePrice = pricedItems.length === items.length;

  return (
    <section className={styles.build} aria-labelledby="pc-build-title">
      <header className={styles.summary}>
        <div className={styles.summaryCopy}>
          <span className={styles.eyebrow}>{build.eyebrow}</span>
          <div className={styles.titleRow}>
            <span className={styles.trophy} aria-hidden="true">★</span>
            <div>
              <h2 id="pc-build-title">{build.title}</h2>
              <p>{build.description}</p>
            </div>
          </div>
          <div className={styles.chips} aria-label="Indicada para">
            {build.bestFor.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className={styles.total}>
          <span>Total observado</span>
          <strong>{hasCompletePrice ? formatPrice(total) : "Consulte os itens"}</strong>
          <small>{build.profile}</small>
          <a href="#pecas-da-build">Ver peças</a>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.parts} id="pecas-da-build">
          <div className={styles.sectionHeading}>
            <div><span>Configuração</span><h3>Peças da build</h3></div>
            <small>Preços observados em {build.updatedAt}</small>
          </div>
          <div className={styles.partList}>
            {items.map((item) => {
              const name = item.product?.name ?? item.name ?? item.role;
              const content = (
                <>
                  <span className={styles.roleCode}>{getRoleCode(item.role)}</span>
                  <span className={styles.productImage}>
                    {item.product?.mainImage ? (
                      <Image src={item.product.mainImage.src} alt="" fill sizes="56px" />
                    ) : <span aria-hidden="true">{getRoleCode(item.role).slice(0, 1)}</span>}
                  </span>
                  <span className={styles.partCopy}>
                    <small>{item.role}</small><strong>{name}</strong><span>{item.note}</span>
                  </span>
                  <strong className={styles.price}>
                    {typeof item.price === "number" ? formatPrice(item.price) : "Sem preço"}
                  </strong>
                </>
              );

              return item.product ? (
                <Link className={styles.part} href={`/produtos/${item.product.slug}`} key={item.role}>{content}</Link>
              ) : <div className={styles.part} key={item.role}>{content}</div>;
            })}
          </div>
          {hasCompletePrice ? (
            <div className={styles.totalRow}><span>Total estimado</span><strong>{formatPrice(total)}</strong></div>
          ) : null}
        </div>

        <aside className={styles.snapshot} aria-label="Resumo da build">
          <span className={styles.snapshotLabel}>Resumo da build</span>
          <strong>{hasCompletePrice ? formatPrice(total) : build.profile}</strong>
          <small>preço estimado da torre</small>
          <dl>
            <div><dt>Perfil</dt><dd>{build.profile}</dd></div>
            <div><dt>Indicada para</dt><dd>{build.bestFor.join(" · ")}</dd></div>
            <div><dt>Atualizada em</dt><dd>{build.updatedAt}</dd></div>
          </dl>
          <p>{build.note}</p>
        </aside>
      </div>

      <div className={styles.capabilities}>
        <div className={styles.sectionHeading}>
          <div><span>Uso real</span><h3>O que esta configuração prioriza</h3></div>
        </div>
        <div className={styles.capabilityList}>
          {build.capabilities.map((capability) => (
            <div className={styles.capability} key={capability.label}>
              <strong>{capability.label}</strong>
              <span className={styles.meter} aria-label={`${capability.label}: ${capability.level} de 5`}>
                <span style={{ width: `${capability.level * 20}%` }} />
              </span>
              <b>{capability.verdict}</b>
              <small>{capability.detail}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
