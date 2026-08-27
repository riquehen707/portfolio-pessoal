import Image from "next/image";
import Link from "next/link";
import { creators } from "@/content/creators/creators";
import styles from "./PersonCard.module.scss";

const year = (date?: string) => date?.slice(0, 4);
const displayYear = (value?: number | string) => value === undefined ? undefined : Number(value) < 0 ? `${Math.abs(Number(value))} a.C.` : String(Number(value));

export function PersonCard({ personId }: { personId: string }) {
  const person = creators.find((item) => item.id === personId);
  if (!person) throw new Error(`PersonCard recebeu um ID inexistente: ${personId}`);
  const birth = displayYear(year(person.birthDate) ?? person.birthYear);
  const death = displayYear(year(person.deathDate) ?? person.deathYear);
  const life = birth ? `${birth}–${death ?? "presente"}` : undefined;
  const title = person.status === "published" && person.profilePath
    ? <Link href={person.profilePath}>{person.name}</Link>
    : person.name;
  const initials = person.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("");

  return <article className={styles.card}>
    <div className={styles.portrait} data-placeholder={!person.image || undefined}>
      {person.image
        ? <Image src={person.image.src} alt={person.image.alt} fill sizes="(max-width: 520px) 104px, 144px" />
        : <span aria-label={`Retrato não cadastrado para ${person.name}`}>{initials}</span>}
    </div>
    <div className={styles.content}>
      <span className={styles.eyebrow}>Personalidade</span>
      <h3>{title}</h3>
      {person.occupations.length ? <p className={styles.occupations}>{person.occupations.slice(0, 3).join(" · ")}</p> : null}
      <div className={styles.meta}>{person.countryOrRegion ? <span>{person.countryOrRegion}</span> : null}{life ? <span>{life}</span> : null}</div>
      <p className={styles.summary}>{person.summary}</p>
    </div>
  </article>;
}
