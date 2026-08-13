import Link from "next/link";
import { creators } from "@/content/creators/creators";
import type { ReadingCreditSchema } from "@/content/reading/readingSchema";
import type { z } from "zod";
import styles from "./ReadingLibrary.module.scss";

type Credit = z.infer<typeof ReadingCreditSchema>;
export function ReadingAuthors({ credits }: { credits: readonly Credit[] }) {
  const people = new Map(creators.map((person) => [person.id, person]));
  return <div className={styles.credits}>{credits.map((credit) => { const person=people.get(credit.personId); return <span key={`${credit.personId}-${credit.roles.join("-")}`}>{person?.status==="published"?<Link href={`/criadores/${person.slug}`}>{person.name}</Link>:person?.name??credit.personId} — {credit.roles.join(", ")}</span>; })}</div>;
}
