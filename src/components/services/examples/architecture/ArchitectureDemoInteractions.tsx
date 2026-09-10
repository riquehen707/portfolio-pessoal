"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ArchitectureDemoProject } from "./architectureDemoData";
import styles from "./ArchitectureDemo.module.scss";

const categories = ["Todos", "Residencial", "Interiores", "Comercial"] as const;

export function ArchitectureProjects({ projects }: { projects: readonly ArchitectureDemoProject[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const visible = category === "Todos" ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      <div className={styles.categoryNav} role="group" aria-label="Filtrar estudos por categoria">
        {categories.map((item) => <button type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}
      </div>
      <div className={styles.projectGrid} aria-live="polite">
        {visible.map((project, index) => (
          <article className={styles.project} data-position={index % 3} key={project.slug}>
            <Link href={`/servicos/exemplos/arquitetura/projetos/${project.slug}`}>
              <div className={styles.projectImage}><Image src={project.cover.src} alt={project.cover.alt} fill sizes="(max-width: 760px) 100vw, 70vw" /></div>
              <div className={styles.projectMeta}><span>{project.category} / estudo fictício</span><span>{project.location}</span><span>{project.year}</span></div>
              <div className={styles.projectTitle}><h3>{project.title}</h3><span aria-hidden="true">↗</span></div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}

export function ArchitectureWhatsAppDemo() {
  const [message, setMessage] = useState("");
  return <div className={styles.whatsappDemo}><button type="button" onClick={() => setMessage("Demonstração: aqui seria aberto o WhatsApp do escritório.")}>Iniciar conversa</button><span aria-live="polite">{message}</span></div>;
}
