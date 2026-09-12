import { Column, Schema } from "@once-ui-system/core";
import Link from "next/link";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import { ServiceExamplesSection } from "@/components/services/examples/ServiceExamplesSection";
import { getPublishedServiceExamples } from "@/data/service-examples";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";
import styles from "./page.module.scss";

const page = {
  path: "/servicos/exemplos",
  title: "Exemplos demonstrativos de sites",
  description: "Sites demonstrativos com identidades, estruturas e recursos diferentes. Os projetos são conceituais e não representam clientes reais.",
};

export function generateMetadata() {
  const image = buildOgImage(page.title);
  return { title: page.title, description: page.description, alternates: { canonical: `${baseURL}${page.path}` }, openGraph: { title: page.title, description: page.description, url: `${baseURL}${page.path}`, images: buildDiscoverImageMetadata(image, page.title) }, robots: { index: false, follow: true } };
}

export default function ServiceExamplesPage() {
  const examples = getPublishedServiceExamples();
  return <Column fillWidth>
    <Schema as="webPage" baseURL={baseURL} title={page.title} description={page.description} path={page.path} image={`/api/og/generate?title=${encodeURIComponent(page.title)}`} author={{ name: person.name, url: `${baseURL}/work`, image: `${baseURL}${person.avatar}` }} />
    <main className={styles.page}>
      <ServicesAreaNav active="examples" />
      <header className={styles.hero}><p>Galeria demonstrativa</p><h1>Sites criados para mostrar possibilidades.</h1><div><p>Cada projeto explora uma identidade e uma estrutura diferente. Todos estão identificados como demonstrativos e não representam clientes reais.</p><Link href="/work">Ver portfólio real <span aria-hidden="true">→</span></Link></div></header>
      <ServiceExamplesSection examples={examples} />
      <footer className={styles.next}><div><p>Quer avaliar recursos e fluxos?</p><h2>Veja as interfaces funcionando.</h2></div><Link href="/servicos/capacidades">Explorar capacidades <span aria-hidden="true">→</span></Link></footer>
    </main>
  </Column>;
}
