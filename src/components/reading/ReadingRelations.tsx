import Link from "next/link";
import { getReadingWorkPath } from "@/content/reading/readingDomain";
import type { ReadingWork } from "@/content/reading/readingSchema";
import styles from "./ReadingLibrary.module.scss";

const relationshipLabels:Record<string,string>={continuation:"continuação",retelling:"releitura","inspired-by":"inspirada por","spin-off":"derivada",companion:"obra complementar",other:"relacionada",adaptation:"adaptação"};
export function ReadingRelations({work,works}:{work:ReadingWork;works:readonly ReadingWork[]}){const byId=new Map(works.map((item)=>[item.id,item]));if(!work.relatedWorks.length&&!work.adaptations.length)return null;return <section className={styles.relations} aria-label="Obras e adaptações relacionadas"><h2>Obras e adaptações relacionadas</h2>{work.relatedWorks.map((relation)=>{const related=byId.get(relation.workId);const title=related?.titleBr??related?.originalTitle??relation.workId;return <span key={relation.workId}>{related?.status==="published"?<Link href={getReadingWorkPath(related)}>{title}</Link>:title} ({relationshipLabels[relation.relationship]??relation.relationship})</span>;})}{work.adaptations.map((item)=><span key={`${item.kind}-${item.title}`}>{item.title} ({relationshipLabels[item.relationship]??item.relationship} · {item.kind})</span>)}</section>}
