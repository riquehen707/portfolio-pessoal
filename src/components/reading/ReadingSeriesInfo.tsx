import { readingInstallments, readingSeries, readingVolumes } from "@/content/reading/reading";
import styles from "./ReadingLibrary.module.scss";

export function ReadingSeriesInfo({ workId, readingOrder }: { workId:string; readingOrder?:string }) {
  const volumes=readingVolumes.filter((item)=>item.workId===workId); const installments=readingInstallments.filter((item)=>item.workId===workId); const seriesIds=new Set([...volumes.map((item)=>item.seriesId),...installments.map((item)=>item.seriesId)].filter(Boolean)); const series=readingSeries.filter((item)=>seriesIds.has(item.id));
  if(!volumes.length&&!installments.length&&!series.length&&!readingOrder)return null;
  return <section className={styles.relations} aria-label="Série, volumes e ordem de leitura">{series.map((item)=><div key={item.id}><strong>{item.title}</strong><span>{item.publicationStatus??item.kind}{item.confirmedVolumeCount?` · ${item.confirmedVolumeCount} volumes confirmados`:""}</span></div>)}{volumes.map((item)=><div key={item.id}><strong>{item.label}</strong>{item.summary&&<span>{item.summary}</span>}</div>)}{installments.map((item)=><div key={item.id}><strong>{item.label}</strong>{item.summary&&<span>{item.summary}</span>}</div>)}{readingOrder&&<div><strong>Ordem de leitura</strong><span>{readingOrder}</span></div>}</section>;
}
