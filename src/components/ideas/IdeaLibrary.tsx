"use client";

import { useMemo, useState } from "react";
import type { Idea } from "@/data/ideas";
import { IdeaCard } from "./IdeaCard";
import { ideaStatusLabels } from "./ideaLabels";
import styles from "./Ideas.module.scss";

export function IdeaLibrary({ ideas }: { ideas: Idea[] }) {
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("recent");
  const categories = useMemo(() => [...new Set(ideas.flatMap((idea) => idea.categories))].sort((a,b)=>a.localeCompare(b,"pt-BR")), [ideas]);
  const visible = useMemo(() => ideas
    .filter((idea) => (status === "all" || idea.status === status) && (category === "all" || idea.categories.includes(category)) && (type === "all" || idea.type === type))
    .sort((a,b) => sort === "oldest" ? a.createdAt.localeCompare(b.createdAt) : sort === "newest" ? b.createdAt.localeCompare(a.createdAt) : b.updatedAt.localeCompare(a.updatedAt)), [category, ideas, sort, status, type]);
  const hasFilters = status !== "all" || category !== "all" || type !== "all" || sort !== "recent";
  const groups = [
    { key: "development", title: "Em desenvolvimento", description: "Projetos com implementação ou atividade concreta.", statuses: ["em-desenvolvimento"] },
    { key: "exploring", title: "Explorando", description: "Ideias em pesquisa de formato, mercado ou modelo.", statuses: ["explorando"] },
    { key: "paper", title: "No papel", description: "Direções preservadas para talvez desenvolver depois.", statuses: ["rascunho"] },
    { key: "other", title: "Outros caminhos", description: "Registros pausados, concluídos ou abandonados, sem apagar o percurso.", statuses: ["pausada", "concluida", "abandonada"] },
  ].map((group) => ({ ...group, ideas: visible.filter((idea) => group.statuses.includes(idea.status)) })).filter((group) => group.ideas.length);

  return <>
    <div className={styles.filters} aria-label="Filtros das ideias">
      <label><span>Status</span><select value={status} onChange={(event)=>setStatus(event.target.value)}><option value="all">Todos</option>{Object.entries(ideaStatusLabels).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
      <label><span>Categoria</span><select value={category} onChange={(event)=>setCategory(event.target.value)}><option value="all">Todas</option>{categories.map((value)=><option key={value} value={value}>{value}</option>)}</select></label>
      <label><span>Tipo</span><select value={type} onChange={(event)=>setType(event.target.value)}><option value="all">Todos</option><option value="idea">Ideia</option><option value="project">Projeto</option><option value="experiment">Experimento</option><option value="business">Negócio</option><option value="research">Pesquisa</option></select></label>
      <label><span>Ordem</span><select value={sort} onChange={(event)=>setSort(event.target.value)}><option value="recent">Atualizadas recentemente</option><option value="newest">Ideias mais recentes</option><option value="oldest">Ideias mais antigas</option></select></label>
      {hasFilters ? <button type="button" onClick={()=>{setStatus("all");setCategory("all");setType("all");setSort("recent");}}>Limpar</button> : null}
    </div>
    <p className={styles.resultCount} aria-live="polite">{visible.length} {visible.length === 1 ? "ideia" : "ideias"}</p>
    {visible.length ? <div className={styles.archiveGroups}>{groups.map((group)=><section className={styles.archiveGroup} key={group.key}><header><h3>{group.title}</h3><p>{group.description}</p></header><div className={styles.grid}>{group.ideas.map((idea)=><IdeaCard idea={idea} key={idea.id}/>)}</div></section>)}</div> : <div className={styles.empty}><strong>Nenhuma ideia corresponde aos filtros.</strong><p>Este arquivo pode ter poucos registros no início. Remova um filtro para voltar ao conjunto completo.</p></div>}
  </>;
}
