import Image from "next/image";
import Link from "next/link";
import { architectureDemoProjects, type ArchitectureDemoProject } from "./architectureDemoData";
import styles from "./ArchitectureDemo.module.scss";

export function ArchitectureProjectPage({ project }: { project: ArchitectureDemoProject }) {
  const projectIndex = architectureDemoProjects.findIndex((item) => item.slug === project.slug);
  const previous = architectureDemoProjects[(projectIndex - 1 + architectureDemoProjects.length) % architectureDemoProjects.length];
  const next = architectureDemoProjects[(projectIndex + 1) % architectureDemoProjects.length];
  return <div className={`${styles.site} ${styles.projectPage}`}>
    <header className={styles.projectHeader}><Link href="/servicos/exemplos/arquitetura">PB—17</Link><Link href="/servicos/exemplos/arquitetura#projetos">← Todos os projetos</Link></header>
    <main>
      <section className={styles.projectHero}><div><p>{project.category} / estudo fictício</p><h1>{project.title}</h1></div><dl><div><dt>Local</dt><dd>{project.location}</dd></div><div><dt>Ano</dt><dd>{project.year}</dd></div><div><dt>Estado</dt><dd>Conteúdo demonstrativo</dd></div></dl></section>
      <figure className={styles.projectLead}><Image src={project.gallery[0].src} alt={project.gallery[0].alt} fill priority sizes="100vw" /></figure>
      <section className={styles.projectDescription}><span>Sobre o projeto</span><p>{project.summary}</p><p>Estudo fictício apresentado com fotografias de banco licenciadas. Em um projeto real, esta área reuniria conceito, programa, decisões e ficha técnica da obra.</p></section>
      <section className={styles.projectGallery}>{project.gallery.slice(1).map((media) => <figure key={media.src}><Image src={media.src} alt={media.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>Foto de banco: <a href={media.source} target="_blank" rel="noreferrer">{media.credit} ↗</a></figcaption></figure>)}</section>
      <nav className={styles.projectEnd} aria-label="Navegação entre projetos"><Link href={`/servicos/exemplos/arquitetura/projetos/${previous.slug}`}>← {previous.title}</Link><Link href="/servicos/exemplos/arquitetura#projetos">Todos os projetos</Link><Link href={`/servicos/exemplos/arquitetura/projetos/${next.slug}`}>{next.title} →</Link></nav>
    </main>
  </div>;
}
