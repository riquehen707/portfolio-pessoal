import { Icon } from "@once-ui-system/core";
import Image from "next/image";

import { CTAButton } from "@/components/CTAButton";
import { about, baseURL, home } from "@/resources";
import type { IconName } from "@/resources/icons";

import styles from "./page.module.scss";

const calHref = "https://cal.com/henriquereis";

const marketSignals = [
  "Sites gerados em minutos",
  "Posts parecidos no feed",
  "Promessas copiadas",
  "Identidades sem critério",
] as const;

const comparison = [
  {
    title: "Comum",
    items: ["Visual bonito sem direção", "Texto genérico", "CTA solto", "Nenhum dado útil"],
  },
  {
    title: "Bem posicionado",
    items: ["Clareza de oferta", "Estética memorável", "Jornada objetiva", "Medição para decidir"],
  },
] as const;

const pillars: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Clareza",
    text: "A pessoa entende rápido o que você oferece, para quem serve e por que vale escolher.",
    icon: "eye",
  },
  {
    title: "Estética",
    text: "O visual comunica valor antes da explicação. Aparência também é percepção de preço.",
    icon: "figma",
  },
  {
    title: "Conteúdo",
    text: "A mensagem deixa de parecer postagem solta e passa a conduzir decisão.",
    icon: "document",
  },
  {
    title: "Tecnologia",
    text: "Página rápida, rastreamento simples e estrutura pronta para evoluir.",
    icon: "performance",
  },
] as const;

const process = ["Diagnóstico", "Posicionamento", "Interface", "Conteúdo", "Medição"] as const;

export async function generateMetadata() {
  const title = "Saiba mais sobre destaque digital";
  const description =
    "Entenda como clareza, estética, posicionamento, conteúdo e tecnologia ajudam negócios locais a saírem do comum.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseURL}/saiba-mais`,
    },
    openGraph: {
      title,
      description,
      url: `${baseURL}/saiba-mais`,
      siteName: home.title,
      images: home.image ? [home.image] : undefined,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default function SaibaMaisPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Destaque / Posicionamento local</p>
          <h1>Hoje, criar ficou fácil. Parecer diferente ficou raro.</h1>
          <p>
            IA acelera sites, peças e conteúdos. O problema é que muita coisa começa a soar igual. O
            diferencial está em direção, repertório e execução.
          </p>
          <div className={styles.actions}>
            <CTAButton href={calHref} prefixIcon="calendar">
              Agendar uma ligação
            </CTAButton>
            <CTAButton href={about.path} variant="secondary" suffixIcon="arrowRight">
              Ver trajetória
            </CTAButton>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <Image
            className={styles.heroSticker}
            src="/images/cat-stickers/ufo-cats.png"
            alt=""
            width={328}
            height={362}
            priority
            sizes="(max-width: 768px) 92vw, 46vw"
          />
        </div>
      </section>

      <section className={styles.signalBand} aria-label="Sinais de saturação digital">
        {marketSignals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </section>

      <section className={styles.problemGrid}>
        <div className={styles.statement}>
          <p className={styles.eyebrow}>O problema</p>
          <h2>Quando tudo parece rápido demais, o comum vira padrão.</h2>
        </div>
        <div className={styles.problemStack}>
          <div className={styles.problemStickers} aria-hidden="true">
            <Image src="/images/cat-stickers/cat-camera.png" alt="" width={265} height={305} />
            <Image src="/images/cat-stickers/cat-bag.png" alt="" width={277} height={303} />
          </div>
          <div className={styles.problemCards}>
            <article>
              <span>01</span>
              <h3>Mais produção não significa mais percepção.</h3>
              <p>
                Volume sem critério aumenta ruído. O cliente vê, mas não entende por que escolher.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Negócios locais competem por confiança.</h3>
              <p>
                Antes da conversa, sua presença digital já está formando expectativa sobre preço e
                cuidado.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.compareSection}>
        <div className={styles.compareHeader}>
          <p className={styles.eyebrow}>Percepção de valor</p>
          <h2>O que muda não é só a aparência. É a leitura do negócio.</h2>
        </div>
        <div className={styles.compareGrid}>
          {comparison.map((column) => (
            <article className={styles.compareCard} key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.pillars}>
        <div className={styles.pillarsIntro}>
          <p className={styles.eyebrow}>Sistema</p>
          <h2>Design, conteúdo e tecnologia trabalhando juntos.</h2>
        </div>
        <div className={styles.pillarGrid}>
          {pillars.map((pillar) => (
            <article className={styles.pillarCard} key={pillar.title}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon name={pillar.icon} size="l" />
              </span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.processCopy}>
          <p className={styles.eyebrow}>Processo</p>
          <h2>Antes de produzir, entender o que precisa ficar evidente.</h2>
          <p>
            A conversa inicial serve para separar vontade, urgência e oportunidade real. Depois
            disso, o escopo fica mais claro e o investimento faz mais sentido.
          </p>
        </div>
        <ol className={styles.timeline}>
          {process.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
        <Image
          className={styles.processSticker}
          src="/images/cat-stickers/laptop-cat.png"
          alt=""
          width={355}
          height={305}
          aria-hidden="true"
        />
      </section>

      <section className={styles.localSection}>
        <div className={styles.localVisual} aria-hidden="true">
          <span />
          <span />
          <span />
          <Image src="/images/cat-stickers/box-cat.png" alt="" width={323} height={238} />
        </div>
        <div className={styles.localCopy}>
          <p className={styles.eyebrow}>Negócios locais</p>
          <h2>Presença digital boa reduz atrito antes do primeiro contato.</h2>
          <p>
            A pessoa precisa encontrar, entender, confiar e chamar. Cada etapa pode ser mais simples
            quando a mensagem, a interface e os canais estão alinhados.
          </p>
        </div>
      </section>

      <section className={styles.finalCta}>
        <Image
          className={styles.finalSticker}
          src="/images/cat-stickers/cat-fuel.png"
          alt=""
          width={243}
          height={300}
          aria-hidden="true"
        />
        <p className={styles.eyebrow}>Próximo passo</p>
        <h2>Vale conversar antes de investir.</h2>
        <p>
          Uma ligação curta já ajuda a identificar se o gargalo está no site, na mensagem, no
          conteúdo, na oferta ou na estrutura de atendimento.
        </p>
        <CTAButton href={calHref} prefixIcon="calendar">
          Agendar uma ligação
        </CTAButton>
      </section>
    </div>
  );
}
