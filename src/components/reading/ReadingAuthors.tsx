import Link from "next/link";
import type { z } from "zod";
import { creators } from "@/content/creators/creators";
import type { ReadingCreditSchema } from "@/content/reading/readingSchema";
import styles from "./ReadingLibrary.module.scss";

type Credit=z.infer<typeof ReadingCreditSchema>;
export function ReadingAuthors({credits}:{credits:readonly Credit[]}){const people=new Map(creators.map((person)=>[person.id,person]));return <div className={styles.credits}>{credits.map((credit)=>{const person=people.get(credit.personId);const name=person?.name??credit.personId;return <span key={`${credit.personId}-${credit.roles.join("-")}`}>{person?.status==="published"&&person.profilePath?<Link href={person.profilePath}>{name}</Link>:name} — {credit.roles.join(", ")}</span>;})}</div>}
