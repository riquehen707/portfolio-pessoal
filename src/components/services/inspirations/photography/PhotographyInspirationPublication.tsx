"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

import type { ServiceInspiration } from "@/data/service-inspirations";
import {
  photographyFeaturedItems,
  photographyPortfolioItems,
  photographyStoryGallery,
  type PhotographyCategory,
  type PhotographyPortfolioItem,
} from "./photographyInspirationData";
import styles from "./PhotographyInspirationPublication.module.scss";

type RelatedInspiration = Pick<
  ServiceInspiration,
  "slug" | "title" | "category" | "image" | "alt" | "width" | "height"
>;

type Props = {
  inspiration: ServiceInspiration;
  contactHref: string;
  relatedInspirations: RelatedInspiration[];
};

type StageCopyProps = {
  number: string;
  title: string;
  lead: string;
  description: string;
  id: string;
};

const categories = ["Todos", "Casamentos", "Ensaios", "Produtos"] as const;

const componentHighlights = [
  ["01", "Abertura", "Apresenta linguagem, especialidade e ação principal."],
  ["02", "Portfólio", "Organiza uma seleção curta sem reduzir as imagens."],
  ["03", "Filtros", "Ajuda a explorar trabalhos por tipo de fotografia."],
  ["04", "Ensaio", "Reúne imagens, contexto e decisões em uma página."],
  ["05", "Sobre", "Explica abordagem e forma de trabalhar sem excessos."],
  ["06", "Contato", "Leva do interesse ao pedido de orçamento."],
] as const;

function StageCopy({ number, title, lead, description, id }: StageCopyProps) {
  return (
    <div className={styles.stageCopy}>
      <div className={styles.stageNumber} aria-hidden="true">
        <span>{number}</span>
        <i />
      </div>
      <h2 id={id}>{title}</h2>
      <p className={styles.stageLead}>{lead}</p>
      <p className={styles.stageDescription}>{description}</p>
    </div>
  );
}

function DemoBrandBar() {
  return (
    <header className={styles.demoBrandBar}>
      <span className={styles.demoBrand}>
        <i aria-hidden="true" /> Clara Norte
      </span>
      <nav aria-label="Navegação da demonstração de fotografia">
        <a href="#fotografia-inicio">Início</a>
        <a href="#fotografia-trabalhos">Trabalhos</a>
        <a href="#fotografia-ensaio">Ensaio</a>
        <a href="#fotografia-contato">Contato</a>
      </nav>
      <a className={styles.demoNavAction} href="#fotografia-contato">
        Pedir orçamento
      </a>
    </header>
  );
}

function PortfolioCard({ item }: { item: PhotographyPortfolioItem }) {
  return (
    <article className={styles.portfolioCard}>
      <Image
        src={item.image}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(max-width: 520px) 80vw, 19rem"
      />
      <span>{item.category}</span>
      <h4>{item.title}</h4>
    </article>
  );
}

function HomeMockup() {
  return (
    <div className={`${styles.browserMockup} ${styles.homeMockup}`} id="fotografia-inicio">
      <DemoBrandBar />
      <div className={styles.homeHero}>
        <Image
          src={photographyPortfolioItems[0].image}
          alt={photographyPortfolioItems[0].alt}
          width={photographyPortfolioItems[0].width}
          height={photographyPortfolioItems[0].height}
          priority
          sizes="(max-width: 760px) 94vw, 62rem"
        />
        <div className={styles.homeHeroCopy}>
          <span>Fotografia documental e editorial</span>
          <h3>Histórias que continuam depois do instante.</h3>
          <p>Casamentos, retratos e projetos comerciais apresentados com espaço, ritmo e intenção.</p>
          <a href="#fotografia-trabalhos">Conhecer trabalhos</a>
        </div>
      </div>
      <div className={styles.featuredBlock}>
        <div className={styles.demoSectionTitle}>
          <h3>Trabalhos selecionados</h3>
          <a href="#fotografia-trabalhos">Ver portfólio →</a>
        </div>
        <div className={styles.featuredGrid}>
          {photographyFeaturedItems.map((item) => <PortfolioCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}

function PortfolioMockup() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const visibleItems = useMemo(
    () => photographyPortfolioItems.filter((item) => category === "Todos" || item.category === category),
    [category],
  );

  return (
    <div className={`${styles.browserMockup} ${styles.portfolioMockup}`} id="fotografia-trabalhos">
      <DemoBrandBar />
      <div className={styles.portfolioHeader}>
        <div>
          <span>Portfólio</span>
          <h3>Uma seleção do meu olhar.</h3>
        </div>
        <p>{visibleItems.length} imagens ilustrativas</p>
      </div>
      <div className={styles.filters} role="group" aria-label="Filtrar trabalhos por categoria">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.portfolioGrid} aria-live="polite">
        {visibleItems.map((item) => <PortfolioCard key={item.id} item={item} />)}
      </div>
      <p className={styles.filterStatus}>{category} · {visibleItems.length} trabalhos</p>
    </div>
  );
}

function StoryMockup() {
  const [selectedImage, setSelectedImage] = useState(photographyStoryGallery[0]);

  return (
    <div className={`${styles.browserMockup} ${styles.storyMockup}`} id="fotografia-ensaio">
      <DemoBrandBar />
      <div className={styles.breadcrumb}>Início / Casamentos / Votos no jardim</div>
      <div className={styles.storyLayout}>
        <div className={styles.storyGallery}>
          <div className={styles.storyMainImage}>
            <Image
              src={selectedImage.image}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              sizes="(max-width: 760px) 90vw, 38rem"
            />
          </div>
          <div className={styles.thumbnails} aria-label="Seleção de imagens do ensaio ilustrativo">
            {photographyStoryGallery.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Mostrar ${item.title}`}
                aria-pressed={selectedImage.id === item.id}
                onClick={() => setSelectedImage(item)}
              >
                <Image src={item.image} alt="" width={item.width} height={item.height} sizes="8rem" />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.storyCopy}>
          <span>Casamento · narrativa ilustrativa</span>
          <h3>Votos no jardim</h3>
          <p>Uma tarde de setembro</p>
          <dl>
            <div><dt>Abordagem</dt><dd>Documental</dd></div>
            <div><dt>Luz</dt><dd>Natural</dd></div>
            <div><dt>Entrega</dt><dd>Galeria privada</dd></div>
          </dl>
          <p className={styles.storyDescription}>
            A página combina uma seleção ampla, contexto breve e informações suficientes para entender a linguagem do trabalho antes do contato.
          </p>
          <a href="#fotografia-contato">Conversar sobre uma data</a>
        </div>
      </div>
    </div>
  );
}

function ContactMockup() {
  const [notice, setNotice] = useState(false);

  function showDemoNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <div className={`${styles.browserMockup} ${styles.contactMockup}`} id="fotografia-contato">
      <div className={styles.contactImage}>
        <Image
          src={photographyPortfolioItems[1].image}
          alt={photographyPortfolioItems[1].alt}
          width={photographyPortfolioItems[1].width}
          height={photographyPortfolioItems[1].height}
          sizes="(max-width: 760px) 94vw, 24rem"
        />
      </div>
      <form onSubmit={showDemoNotice}>
        <span>Vamos conversar</span>
        <h3>Conte um pouco sobre o que você quer fotografar.</h3>
        <label>
          Nome
          <input autoComplete="name" placeholder="Seu nome" />
        </label>
        <label>
          Tipo de trabalho
          <select defaultValue="">
            <option value="" disabled>Selecione uma opção</option>
            <option>Casamento</option>
            <option>Ensaio</option>
            <option>Produto</option>
          </select>
        </label>
        <label>
          Contexto
          <textarea defaultValue="Gostaria de saber mais sobre disponibilidade e forma de trabalho." />
        </label>
        <button type="submit">Enviar pedido</button>
        <p className={styles.formNotice} aria-live="polite">
          {notice
            ? "Esta é uma demonstração: nenhum pedido foi enviado."
            : "Demonstração segura: estes campos não enviam nem armazenam dados."}
        </p>
      </form>
      <aside>
        <ul>
          <li>Resposta com disponibilidade</li>
          <li>Proposta adequada ao trabalho</li>
          <li>Orientações antes da sessão</li>
          <li>Nenhum envio nesta demonstração</li>
        </ul>
      </aside>
    </div>
  );
}

export function PhotographyInspirationPublication({ inspiration, contactHref, relatedInspirations }: Props) {
  return (
    <main className={styles.publication}>
      <Link className={styles.backLink} href="/servicos/inspiracoes">
        <span aria-hidden="true">←</span> Voltar para inspirações
      </Link>

      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{inspiration.category}</p>
          <h1>Veja como seu portfólio pode conduzir uma escolha</h1>
          <p className={styles.introDescription}>
            Uma direção para apresentar repertório, organizar especialidades e transformar interesse em pedido de orçamento.
          </p>
        </div>
        <aside className={styles.introNote}>
          <strong>Projeto demonstrativo</strong>
          <p>Nome, trabalhos, contatos e parte das imagens são ilustrativos.</p>
        </aside>
      </header>

      <section className={styles.stage} aria-labelledby="fotografia-apresentacao-title">
        <StageCopy
          number="01"
          id="fotografia-apresentacao-title"
          title="Apresentação"
          lead="O visitante reconhece o olhar antes de ler muito."
          description="A abertura combina uma imagem forte, uma frase clara e uma seleção curta para comunicar linguagem e especialidade."
        />
        <HomeMockup />
      </section>

      <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="fotografia-exploracao-title">
        <StageCopy
          number="02"
          id="fotografia-exploracao-title"
          title="Exploração"
          lead="Os trabalhos podem ser vistos por intenção."
          description="Filtros funcionais organizam o repertório sem transformar as fotografias em miniaturas ou exigir uma navegação complexa."
        />
        <PortfolioMockup />
      </section>

      <section className={styles.stage} aria-labelledby="fotografia-avaliacao-title">
        <StageCopy
          number="03"
          id="fotografia-avaliacao-title"
          title="Avaliação"
          lead="Um ensaio ganha contexto, sequência e método."
          description="A página individual ajuda a perceber consistência e abordagem antes de pedir disponibilidade ou orçamento."
        />
        <StoryMockup />
      </section>

      <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="fotografia-contato-title">
        <StageCopy
          number="04"
          id="fotografia-contato-title"
          title="Contato"
          lead="O pedido chega com contexto desde o início."
          description="Poucos campos registram o tipo de trabalho e a intenção da conversa sem prometer resposta, data ou orçamento automático."
        />
        <ContactMockup />
      </section>

      <section className={styles.componentsSection} aria-labelledby="photography-components-title">
        <div className={styles.sectionHeading}>
          <h2 id="photography-components-title">Componentes que constroem essa jornada</h2>
          <p>Uma seleção curta; cada peça ajuda a apresentar, comparar ou entrar em contato.</p>
        </div>
        <ul className={styles.componentGrid}>
          {componentHighlights.map(([number, title, description]) => (
            <li key={title}>
              <span aria-hidden="true">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.relatedSection} aria-labelledby="photography-related-title">
        <div className={styles.sectionHeading}>
          <h2 id="photography-related-title">Essa direção pode inspirar outros trabalhos autorais</h2>
          <Link href="/servicos/inspiracoes">Ver mais direções →</Link>
        </div>
        <div className={styles.relatedGrid}>
          {relatedInspirations.map((related) => (
            <Link key={related.slug} href={`/servicos/inspiracoes/${related.slug}`}>
              <Image src={related.image} alt={related.alt} width={related.width} height={related.height} sizes="(max-width: 560px) 38vw, 10rem" />
              <span><strong>{related.title}</strong><small>{related.category}</small></span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="photography-commercial-cta-title">
        <div>
          <p className={styles.eyebrow}>Vamos conversar?</p>
          <h2 id="photography-commercial-cta-title">Quero um site nessa direção</h2>
          <p>Vamos adaptar a estrutura às suas fotografias, especialidades, identidade e forma de atendimento.</p>
        </div>
        <div className={styles.finalCtaAction}>
          <a href={contactHref} data-analytics-event="services_help_click" data-analytics-location="service_inspiration_portfolio-fotografico">
            Falar sobre meu projeto <span aria-hidden="true">→</span>
          </a>
          <small>Contato pelo WhatsApp</small>
        </div>
      </section>

      <details className={styles.mediaDisclosure}>
        <summary>Sobre as imagens desta demonstração</summary>
        <p>Três imagens foram geradas para esta interface e três são fotografias de banco licenciadas pelo Unsplash. Nenhuma representa trabalho, cliente ou resultado de Henrique Reis.</p>
        <ul>
          {photographyPortfolioItems.map((item) => (
            <li key={item.id}>
              <strong>{item.title}:</strong>{" "}
              {item.rights === "unsplash" ? (
                <a href={item.source} target="_blank" rel="noreferrer">
                  fotografia de {item.credit}
                </a>
              ) : (
                item.credit
              )}
            </li>
          ))}
        </ul>
      </details>
    </main>
  );
}
