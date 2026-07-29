import { Meta, Schema } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import { SiAdobephotoshop, SiFigma, SiNextdotjs, SiSupabase } from "react-icons/si";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { about, baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

const pageTitle = "Quem sou";
const pageDescription =
  "Um pouco sobre Henrique Reis, seus interesses, estudos, trabalho e os motivos para manter este blog.";

const tools = [
  {
    name: "Figma",
    description: "Interfaces e protótipos",
    icon: SiFigma,
  },
  {
    name: "Next.js",
    description: "Sites e aplicações",
    icon: SiNextdotjs,
  },
  {
    name: "Supabase",
    description: "Dados e autenticação",
    icon: SiSupabase,
  },
  {
    name: "Photoshop",
    description: "Edição de imagens",
    icon: SiAdobephotoshop,
  },
] as const;

export async function generateMetadata() {
  const image = buildOgImage(pageTitle, "Henrique Reis");
  const generatedMeta = Meta.generate({
    title: `${pageTitle} | ${person.name}`,
    description: pageDescription,
    baseURL,
    image,
    path: about.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, `${pageTitle} — ${person.name}`),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function About() {
  return (
    <main className={styles.page}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`${pageTitle} | ${person.name}`}
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
          { name: pageTitle, url: `${baseURL}${about.path}` },
        ]}
      />

      <header className={styles.hero}>
        <div className={styles.intro}>
          <span className={styles.kicker}>Quem escreve por aqui</span>
          <h1>Oi, meu nome é Henrique.</h1>
          <p className={styles.lead}>
            Tenho 23 anos, estudo Física, trabalho como freelancer e mantenho este blog para
            registrar as coisas que estou aprendendo, desenvolvendo e descobrindo.
          </p>
        </div>

        <div className={styles.portrait}>
          <Image
            src={person.avatar}
            alt="Henrique Reis"
            fill
            priority
            sizes="(max-width: 720px) 78vw, 340px"
          />
        </div>
      </header>

      <article className={styles.story}>
        <p>
          Atualmente moro perto da universidade onde estudo. Gosto bastante de mangás, manhuas e
          graphic novels. Também sou apaixonado por cinema e animações.
        </p>
        <p>
          Ler livros nunca foi exatamente meu forte, mas estou começando a gostar. Então
          provavelmente vou acabar escrevendo sobre algumas dessas descobertas por aqui.
        </p>
        <p>
          Estou cursando BCT, o Bacharelado em Ciências Exatas e Tecnológicas, com terminalidade em
          Física.
        </p>
        <p>
          Para me sustentar — ou pelo menos tentar — trabalho como freelancer. Faço criação de
          sites, gestão de tráfego e outros serviços relacionados a marketing, mas atualmente minha
          principal ênfase está no desenvolvimento de sites.
        </p>

        <section className={styles.toolsSection} aria-labelledby="ferramentas">
          <div className={styles.toolsHeading}>
            <span>Parte da rotina</span>
            <h2 id="ferramentas">Ferramentas que uso</h2>
          </div>
          <div className={styles.toolsGrid}>
            {tools.map((tool) => {
              const ToolIcon = tool.icon;

              return (
                <div className={styles.toolItem} key={tool.name}>
                  <span className={styles.toolIcon} aria-hidden="true">
                    <ToolIcon />
                  </span>
                  <span className={styles.toolText}>
                    <strong>{tool.name}</strong>
                    <small>{tool.description}</small>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="porque-blog">
          <h2 id="porque-blog">Por que comecei este blog?</h2>
          <p>No início, criei o blog pensando principalmente em ganhar dinheiro.</p>
          <p>Só que, sendo bem sincero, não estava funcionando muito bem.</p>
          <p>
            Produzir conteúdo com esse objetivo começou a se tornar cansativo e consumia bastante
            tempo. No fim, eu escrevia, estudava, cuidava do blog e não sobrava energia para
            prospectar clientes, que é justamente o que poderia me ajudar financeiramente de maneira
            mais imediata.
          </p>
          <p>Por isso, estou tentando encarar este espaço de outra forma.</p>
          <p>
            Quero transformar o blog em um hobby e também em uma ferramenta de estudo. Vou escrever
            sobre o que estou aprendendo, sobre os projetos que estou desenvolvendo e,
            principalmente, sobre as coisas das quais realmente gosto.
          </p>
          <p>
            Acredito que assim será mais fácil criar uma rotina natural, sem precisar transformar
            cada publicação em uma obrigação ou em uma estratégia perfeita.
          </p>
          <p>
            Não sei exatamente no que este blog vai se transformar. Por enquanto, quero apenas
            continuar escrevendo, aprendendo e encontrando pessoas que se interessem pelas mesmas
            coisas.
          </p>
        </section>

        <details className={styles.personalStory}>
          <summary>
            <span>
              <small>Uma camada mais pessoal</small>
              Minha história
            </span>
            <span className={styles.detailsAction} aria-hidden="true">
              Abrir
            </span>
          </summary>
          <div className={styles.personalStoryContent}>
            <p>
              Tenho 23 anos e não considero que exista algo especialmente grandioso para contar
              sobre mim.
            </p>
            <p>
              Fui criado pela minha mãe. Meu pai faleceu quando eu ainda era criança e,
              recentemente, também perdi minha mãe.
            </p>
            <p>
              Não tenho uma grande história de superação. Sou apenas um rapaz comum tentando viver
              de maneira tranquila. Tenho meus defeitos, meus períodos de desmotivação e algumas
              questões pessoais com as quais ainda estou aprendendo a lidar.
            </p>
            <p>
              Em 2019, aos 17 anos, terminei o ensino médio e também um curso técnico no SENAI.
              Naquela época, pretendia entrar na faculdade e cursar alguma engenharia, mas a
              pandemia acabou mudando meus planos.
            </p>
            <p>
              Durante esse período, tentei criar uma loja de dropshipping. Foi assim que comecei a
              aprender sobre marketing, SEO, criação de sites e vendas pela internet.
            </p>
            <p>
              Durante algum tempo, o projeto funcionou. Inclusive, consegui morar sozinho. Depois, a
              vida tomou outros rumos e o tempo foi passando. Essa parte da história é mais pessoal
              e prefiro não entrar em muitos detalhes.
            </p>
            <p>
              Meu aniversário é no dia 15 de agosto. Em 2024, completei 22 anos e, no dia seguinte,
              minha mãe faleceu ao meu lado no hospital.
            </p>
            <p>
              Depois disso, voltei para minha casa em Alagoinhas. Consegui continuar me mantendo,
              embora também tenha acumulado algumas dívidas. Aos poucos, estou organizando minha
              vida e lidando com elas.
            </p>
            <p>
              Em algum momento surgiu a oportunidade de entrar na universidade, e acabei me mudando
              novamente.
            </p>
            <p>
              Hoje moro em um quarto alugado próximo à faculdade. Estou estudando, trabalhando como
              freelancer, pagando minhas dívidas e tentando construir uma carreira que permita
              manter meus interesses, continuar estudando e ter uma vida tranquila.
            </p>
            <p>
              Também estou lidando com a distimia e pretendo voltar a fazer acompanhamento com uma
              psicóloga. Ainda existem dias difíceis, mas, de maneira geral, estou bem e tentando
              resolver cada questão no seu tempo.
            </p>
          </div>
        </details>

        <footer className={styles.closing}>
          <p>Se quiser continuar por aqui, a melhor porta de entrada é o que tenho escrito.</p>
          <Link href={blog.path}>Conhecer o blog</Link>
        </footer>
      </article>
    </main>
  );
}
