import Image from "next/image";
import Link from "next/link";
import type { Idea } from "@/data/ideas";
import { formatIdeaDate } from "./ideaLabels";
import styles from "./Ideas.module.scss";

export function IdeaTimeline({ updates }: { updates: Idea["updates"] }) {
  return <ol className={styles.timeline}>
    {[...updates].sort((a,b)=>b.date.localeCompare(a.date)).map((update,index)=><li key={`${update.date}-${update.title ?? index}`}>
      <div className={styles.timelineDate}><time dateTime={update.date}>{formatIdeaDate(update.date)}</time></div>
      <div className={styles.timelineBody}>
        {update.title ? <h3>{update.title}</h3> : null}
        {update.content.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}
        {update.links.length ? <ul className={styles.updateLinks}>{update.links.map((link)=><li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul> : null}
        {update.image ? <figure><Image src={update.image.src} alt={update.image.alt} width={update.image.width} height={update.image.height}/>{update.image.caption ? <figcaption>{update.image.caption}</figcaption> : null}</figure> : null}
      </div>
    </li>)}
  </ol>;
}
