import type { ReadingWork } from "@/content/reading/readingSchema";
import styles from "@/app/livros/reading.module.scss";

export function ReadingEditorialEvaluation({ evaluation }: { evaluation: NonNullable<ReadingWork["editorialEvaluation"]> }) {
  const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${evaluation.reviewedAt}T00:00:00Z`));
  return <section className={styles.review} aria-labelledby="avaliacao-editorial">
    <div className={styles.sectionHeading}><div><span className={styles.kicker}>Leitura editorial</span><h2 id="avaliacao-editorial">Avaliação</h2></div>{evaluation.score !== undefined ? <div className={styles.score} aria-label={`${evaluation.score} de 5`}>{evaluation.score.toLocaleString("pt-BR")}<small>/5</small></div> : null}</div>
    <p className={styles.verdict}>{evaluation.verdict}</p><p>{evaluation.text}</p>
    <dl className={styles.criteria}>{evaluation.criteria.map((criterion) => <div key={criterion.label}><dt>{criterion.label}</dt><dd>{criterion.comment}</dd></div>)}</dl>
    <p className={styles.byline}>Avaliação de {evaluation.author} · {date}{evaluation.containsSpoilers ? " · contém spoilers" : " · sem spoilers relevantes"}</p>
  </section>;
}
