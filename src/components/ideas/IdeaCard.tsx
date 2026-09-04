import Link from "next/link";
import type { CSSProperties } from "react";
import type { Idea } from "@/data/ideas";
import { formatIdeaDate, ideaStatusLabels } from "./ideaLabels";
import styles from "./Ideas.module.scss";

export function IdeaCard({ idea, compact = false }: { idea: Idea; compact?: boolean }) {
  return <article className={styles.card} data-compact={compact}>
    <div className={styles.cardMeta}>
      <span className={styles.status} data-status={idea.status}>{ideaStatusLabels[idea.status]}</span>
      <span>Atualizada em <time dateTime={idea.updatedAt}>{formatIdeaDate(idea.updatedAt)}</time></span>
    </div>
    <h3><Link href={`/ideias/${idea.slug}`}>{idea.title}</Link></h3>
    <p>{idea.description}</p>
    <div className={styles.tagRow} aria-label="Categorias e tags">
      {[...idea.categories, ...idea.tags].slice(0, compact ? 3 : 5).map((tag) => <span key={tag}>{tag}</span>)}
    </div>
    {typeof idea.progress === "number" ? <div className={styles.progress} aria-label={`Progresso registrado: ${idea.progress}%`}><span>Progresso registrado</span><strong>{idea.progress}%</strong><i style={{ "--idea-progress": `${idea.progress}%` } as CSSProperties} /></div> : null}
    <Link className={styles.cardLink} href={`/ideias/${idea.slug}`}>Abrir registro <span aria-hidden="true">→</span></Link>
  </article>;
}
