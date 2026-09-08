import { Meta, Schema } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { about, baseURL, person, servicesPage, social, work } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

const pageTitle = "Sobre Henrique Reis";
const pageDescription =
  "Henrique Reis desenvolve sites, landing pages, portfólios e pequenos sistemas para profissionais e negócios.";

const services = [
  {
    title: "Sites e landing pages",
    description: "Páginas para apresentar uma oferta, responder dúvidas e facilitar o contato.",
  },
  {
    title: "Portfólios",
    description: "Sites para organizar projetos, obras, imóveis ou trabalhos em um endereço próprio.",
  },
  {
    title: "Sistemas e automações",
    description: "Ferramentas pequenas para conectar dados e reduzir tarefas repetidas no atendimento.",
  },
  {
    title: "SEO técnico",
    description: "Auditoria de rastreamento, indexação e estrutura para encontrar problemas do site.",
  },
] as const;

const process = [
  ["Entender", "Defino o problema, o público e a ação que a página precisa facilitar."],
  ["Delimitar", "Registro entregáveis, prazo, custos, revisões e o material necessário."],
  ["Construir", "Organizo o conteúdo, desenho a interface e implemento o projeto."],
  ["Revisar", "Confiro texto, navegação, links, acessibilidade e comportamento no celular."],
  ["Publicar e manter", "Coloco a página no ar e combino suporte, hospedagem e alterações futuras."],
] as const;

export async function generateMetadata() {
  const image = buildOgImage(pageTitle, "Sites, portfólios e pequenos sistemas");
  const generatedMeta = Meta.generate({
    title: `${pageTitle} | henrique.dog`,
    description: pageDescription,
    baseURL,
    image,
    path: about.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, pageTitle),
    },
    twitter: { ...generatedMeta.twitter, images: [image] },
  };
}

export default function About() {
  const contactHref =
    social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;

  return (
    <main className={styles.page}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`${pageTitle} | henrique.dog`}
        description={pageDescription}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(pageTitle)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Sobre", url: `${baseURL}${about.path}` },
        ]}
      />

      <header className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Henrique Reis</p>
          <h1>Desenvolvo sites para profissionais e negócios.</h1>
          <p className={styles.lead}>
            Crio sites, landing pages, portfólios e pequenos sistemas. Trabalho do escopo à
            publicação, com conteúdo, interface e implementação no mesmo projeto.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href={servicesPage.path}>
              Ver serviços <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.textAction} href={work.path}>
              Ver portfólio
            </Link>
          </div>
        </div>

        <figure className={styles.portrait}>
          <Image
            src={person.avatar}
            alt="Ilustração do rosto de Henrique Reis."
            fill
            priority
            sizes="(max-width: 720px) 180px, 260px"
          />
          <figcaption>Ilustração de perfil</figcaption>
        </figure>
      </header>

      <section className={styles.section} aria-labelledby="what-title">
        <div className={styles.sectionHeading}>
          <p>O que faço</p>
          <h2 id="what-title">Projetos com uma função clara.</h2>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <Link className={styles.inlineLink} href={servicesPage.path}>
          Comparar formatos e preços <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.section} aria-labelledby="process-title">
        <div className={styles.sectionHeading}>
          <p>Como trabalho</p>
          <h2 id="process-title">Do problema à página publicada.</h2>
        </div>
        <ol className={styles.processList}>
          {process.map(([title, description], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="proof-title">
        <div className={styles.sectionHeading}>
          <p>Experiência e projetos</p>
          <h2 id="proof-title">O que pode ser verificado.</h2>
        </div>
        <div className={styles.proofGrid}>
          <article>
            <h3>henrique.dog</h3>
            <p>
              Projeto próprio com busca, acervo editorial, catálogos, artigos, páginas de serviço e
              cases publicados.
            </p>
            <Link href="/work/henrique-dog">Ver case</Link>
          </article>
          <article>
            <h3>Interfaces para diferentes áreas</h3>
            <p>
              Exemplos implementados para arquitetos, artistas, corretores, designers, fotógrafos e
              tatuadores, identificados como estudos quando não há cliente associado.
            </p>
            <Link href={work.path}>Ver portfólio</Link>
          </article>
          <article>
            <h3>Prática independente desde 2023</h3>
            <p>
              Trabalho com definição de escopo, escrita, design e desenvolvimento. Uso Next.js,
              TypeScript, Sass e Figma; Supabase entra quando o projeto precisa de dados ou acesso.
            </p>
            <Link href={servicesPage.path}>Ver entregas</Link>
          </article>
        </div>
      </section>

      <section className={styles.profile} aria-labelledby="profile-title">
        <div>
          <p className={styles.kicker}>Perfil</p>
          <h2 id="profile-title">Trabalho, estudo e repertório.</h2>
        </div>
        <p>
          Além do trabalho independente, estudo Física e mantenho o henrique.dog como um acervo de
          textos, livros, filmes, jogos e ideias. O projeto também serve para testar navegação,
          conteúdo e interfaces em uso real.
        </p>
      </section>

      <footer className={styles.finalCTA}>
        <div>
          <p className={styles.kicker}>Próximo passo</p>
          <h2>Quer conversar sobre um projeto?</h2>
          <p>Veja as opções prontas ou explique o que precisa criar.</p>
        </div>
        <div className={styles.finalActions}>
          <Link className={styles.primaryAction} href={servicesPage.path}>Ver serviços</Link>
          <Link className={styles.secondaryAction} href={work.path}>Ver portfólio</Link>
          <a className={styles.textAction} href={contactHref}>Falar comigo</a>
        </div>
      </footer>
    </main>
  );
}
