import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { shingoTamagawa } from "@/content/creators/creators";
import { makingPuparia, puparia } from "@/content/works/works";
import { baseURL } from "@/resources";
import styles from "./profile.module.scss";

const path = "/criadores/shingo-tamagawa";
const title = "Shingo Tamagawa: perfil, processo e Puparia";
const description = "Perfil editorial de Shingo Tamagawa: trajetória verificável, o processo independente de Puparia e suas ideias documentadas sobre criação e indústria.";
export const metadata: Metadata = { title, description, alternates:{ canonical:`${baseURL}${path}` }, openGraph:{ title,description,url:`${baseURL}${path}`,type:"profile" }, twitter:{card:"summary",title,description} };

export default function ShingoTamagawaPage(){
  const jsonLd={"@context":"https://schema.org","@type":"Person","@id":`${baseURL}${path}#person`,name:shingoTamagawa.name,description:shingoTamagawa.summary,birthPlace:{"@type":"Place",name:shingoTamagawa.birthPlace},url:`${baseURL}${path}`,sameAs:"https://www.youtube.com/@shingotamagawa4740"};
  return <main className={styles.page}><BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:"Criadores",url:`${baseURL}/criadores`},{name:shingoTamagawa.name,url:`${baseURL}${path}`}]} /><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
    <header className={styles.hero}><span>Perfil de criador</span><h1>Shingo<br/>Tamagawa</h1><p>Um perfil deliberadamente curto: o que é público e verificável importa mais do que completar lacunas.</p><dl><div><dt>Nascimento</dt><dd>1987, Nara</dd></div><div><dt>Atuação</dt><dd>Animação e direção</dd></div><div><dt>Obra autoral em foco</dt><dd>Puparia</dd></div></dl></header>
    <section><div><span>Trajetória confirmada</span><h2>Do trabalho profissional a uma obra independente.</h2></div><div><p>Tamagawa é um animador e realizador japonês. A biografia submetida por ele ao FilmFreeway registra seu nascimento em Nara, em 1987. O documentário da Archipel mostra sua experiência na indústria de animação como contexto para a decisão de dedicar três anos a <em>Puparia</em>.</p><p>Este perfil não converte créditos dispersos em uma filmografia extensa. Sem documentação primária suficiente para distinguir participação profissional, colaboração e autoria, eles permanecem fora do cadastro.</p></div></section>
    <section><div><span>Puparia</span><h2>Concentrar a autoria mudou a escala do trabalho.</h2></div><div><p>Segundo o relato documentado, a preparação tomou aproximadamente um ano e a produção, dois. Tamagawa fala do projeto a partir de inquietações com criação e trabalho comercial; isso ajuda a entender a escolha independente, mas não autoriza transformar o filme numa autobiografia literal.</p><p>Na declaração publicada com o projeto, ele evita fixar uma história inequívoca: considera que as cenas têm sentido, deixando a leitura para o público. Essa posição orienta nossa análise sem substituir a experiência de assistir.</p><Link className={styles.workLink} href={`/obras/${puparia.slug}`}><span>Obra em destaque · {puparia.year}</span><strong>Conhecer Puparia →</strong><small>Curta independente · 2 min 59 s</small></Link></div></section>
    <section><div><span>Trabalho relacionado</span><h2>Um documentário, não um crédito autoral.</h2></div><div><p><em>{makingPuparia.title}</em>, publicado pela Archipel em 2021, retrata o processo e as ideias do animador. Tamagawa é a pessoa retratada; a obra pertence à filmografia editorial da Archipel, não à direção dele.</p><a href={makingPuparia.officialUrl} target="_blank" rel="noreferrer">Assistir ao documentário na fonte original ↗</a></div></section>
    <footer><span>Fontes</span><ul>{shingoTamagawa.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a> <small>· fonte {source.kind === "primary" ? "primária" : "secundária"}</small></li>)}</ul><p>Não há retrato licenciado no perfil. A página usa composição tipográfica e continua completa sem imagem.</p></footer>
  </main>;
}
