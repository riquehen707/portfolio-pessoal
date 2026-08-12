import type { Metadata } from "next";
import Link from "next/link";
import { ConsentVideo } from "@/components/media/ConsentVideo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { shingoTamagawa } from "@/content/creators/creators";
import { makingPuparia, puparia } from "@/content/works/works";
import { baseURL } from "@/resources";
import styles from "./puparia.module.scss";

const path = "/obras/puparia";
const title = "Puparia: criação, processo e linguagem do curta";
const description = "Um ensaio editorial sobre Puparia, curta independente de Shingo Tamagawa: processo de três anos, linguagem visual, ritmo e interpretações possíveis.";
export const metadata: Metadata = { title, description, alternates: { canonical: `${baseURL}${path}` }, openGraph: { title, description, url: `${baseURL}${path}`, type: "video.movie" }, twitter: { card: "summary", title, description } };

export default function PupariaPage() {
  const personUrl = `${baseURL}/criadores/${shingoTamagawa.slug}`;
  const jsonLd = { "@context": "https://schema.org", "@type": "Movie", "@id": `${baseURL}${path}#work`, name: puparia.title, description: puparia.summary, dateCreated: "2020", duration: "PT2M59S", countryOfOrigin: { "@type": "Country", name: "Japan" }, director: { "@type": "Person", "@id": `${personUrl}#person`, name: shingoTamagawa.name }, sameAs: puparia.officialUrl, url: `${baseURL}${path}` };
  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Obras", url: `${baseURL}/obras` }, { name: "Puparia", url: `${baseURL}${path}` }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className={styles.hero} data-hero-mode="abstract"><div className={styles.field} aria-hidden="true"><i /><i /><i /></div><div className={styles.heroCopy}><span>Curta de animação independente · 2020</span><h1>Puparia</h1><p>Três minutos que recusam a pressa de se explicar.</p><Link href={`/criadores/${shingoTamagawa.slug}`}>Uma obra de Shingo Tamagawa</Link></div><small>Composição abstrata original em CSS; nenhum frame do filme foi utilizado.</small></header>

    <section className={styles.opening}><p><em>Puparia</em> não pede que o espectador decifre uma trama. Corpos, olhares e ambientes surgem como partes de uma transformação cuja lógica permanece aberta — uma experiência curta, densa e melhor quando vista antes de qualquer explicação.</p></section>
    <section className={styles.facts}><span>Ficha essencial</span><dl><div><dt>Criação, direção e animação</dt><dd>Shingo Tamagawa</dd></div><div><dt>País e ano</dt><dd>Japão, 2020</dd></div><div><dt>Duração</dt><dd>2 min 59 s</dd></div><div><dt>Formato</dt><dd>Curta de animação independente</dd></div></dl></section>

    <section className={styles.watch}><header><span>Ver a obra</span><h2>O filme vem antes da leitura.</h2><p>Este é o upload publicado pelo próprio criador. A reprodução usa o domínio de privacidade aprimorada e só começa após interação.</p></header><ConsentVideo youtubeId={puparia.youtubeId} title="PUPARIA, por Shingo Tamagawa" sourceUrl={puparia.officialUrl} /></section>

    <section className={styles.chapter}><div><span>Contexto documentado</span><h2>Um ano para preparar. Dois para produzir.</h2></div><div><p>No documentário da Archipel, Tamagawa situa o curta num processo de três anos: cerca de um ano de preparação e outros dois de produção. A escala ajuda a compreender a concentração do filme, mas não deve virar mito de “gênio solitário”. O dado relevante é a escolha de sustentar pessoalmente uma obra pequena quando o trabalho comercial já não acomodava o que ele queria investigar.</p><p>A página do projeto submetida ao FilmFreeway registra a conclusão em fevereiro de 2020. O lançamento público no canal do autor tornou a obra acessível fora do circuito de festivais.</p></div></section>
    <section className={`${styles.chapter} ${styles.dark}`}><div><span>Processo e linguagem</span><h2>Desenhar também é decidir o que não será explicado.</h2></div><div><p>A animação organiza passagens entre figuras humanas, criaturas e espaços sem usar diálogo ou uma cadeia causal evidente. Em vez de preencher lacunas, a montagem preserva intervalos: cada plano parece conter uma situação maior do que o curta permite conhecer.</p><p>O acabamento minucioso não elimina a sensação do traço. Volume, cor, olhos e superfícies carregam peso, enquanto mudanças bruscas de escala impedem que a contemplação fique estática.</p></div></section>
    <section className={styles.interpretation}><span>Análise editorial</span><h2>Transformação é uma chave possível, não uma resposta.</h2><p>O próprio Tamagawa afirma que as cenas têm sentido, mas deixa a interpretação com quem assiste. Nossa leitura percebe uma tensão entre desejo de mudança e medo de perder forma: rostos observam, matérias se reorganizam, presenças aparecem sem se oferecer por inteiro. É uma interpretação do site, não uma explicação autorizada do filme.</p><blockquote>Uma obra pode ser precisa sem entregar uma mensagem única.</blockquote><p>Essa abertura não significa aleatoriedade. Repetições visuais e escolhas de ritmo criam relações; o filme apenas evita fechá-las numa tese.</p></section>

    <section className={styles.documentary}><div><span>Obra relacionada · {makingPuparia.year}</span><h2>Three Minutes, Three Years</h2><p>O retrato produzido pela Archipel acompanha o processo e registra Tamagawa falando de criação, trabalho e indústria. Aqui ele é tratado como documentário relacionado, não como parte da filmografia autoral do animador.</p></div><ConsentVideo youtubeId={makingPuparia.youtubeId} title={makingPuparia.title} sourceUrl={makingPuparia.officialUrl} /></section>
    <footer className={styles.sources}><span>Fontes e direitos</span><h2>O que é verificável — e o que continua pendente.</h2><ul><li><a href={puparia.officialUrl}>PUPARIA no canal de Shingo Tamagawa</a> — publicação e autoria.</li><li><a href={makingPuparia.officialUrl}>Documentário da Archipel</a> — processo e declarações do criador.</li><li><a href="https://filmfreeway.com/PUPARIA831">Página de Puparia no FilmFreeway</a> — ficha submetida pelo realizador, duração, país, conclusão e declaração.</li></ul><p>Nenhum frame, pôster ou thumbnail foi copiado. Os vídeos permanecem nos canais de origem; capas e imagens promocionais seguem pendentes de autorização explícita para reutilização.</p></footer>
  </main>;
}
