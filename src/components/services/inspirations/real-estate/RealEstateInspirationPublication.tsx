"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

import type { ServiceInspiration } from "@/data/service-inspirations";
import {
  realEstateDemoProperties,
  realEstateDetailGallery,
  type RealEstateDemoProperty,
} from "./realEstateInspirationData";
import styles from "./RealEstateInspirationPublication.module.scss";

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

const componentHighlights = [
  ["01", "Hero", "Apresenta a oferta e abre a busca."],
  ["02", "Cards de imóveis", "Comparam foto, valor e características."],
  ["03", "Busca e filtros", "Reduzem opções sem perder contexto."],
  ["04", "Página do imóvel", "Reúne galeria, preço e detalhes."],
  ["05", "Formulário", "Registra a intenção com poucos campos."],
  ["06", "CTA", "Leva ao agendamento ou ao contato."],
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
        <i aria-hidden="true" /> Horizonte imóveis
      </span>
      <nav aria-label="Navegação da demonstração imobiliária">
        <a href="#imoveis-inicio">Início</a>
        <a href="#imoveis-listagem">Imóveis</a>
        <a href="#imovel-detalhe">Detalhes</a>
        <a href="#imoveis-contato">Contato</a>
      </nav>
      <a className={styles.demoNavAction} href="#imoveis-contato">
        Falar no WhatsApp
      </a>
    </header>
  );
}

function PropertyFacts({ property }: { property: RealEstateDemoProperty }) {
  return (
    <ul className={styles.propertyFacts} aria-label={`Características de ${property.title}`}>
      <li>{property.bedrooms} quartos</li>
      <li>{property.bathrooms} banheiros</li>
      <li>{property.area} m²</li>
    </ul>
  );
}

function PropertyCard({
  property,
  favorite,
  onFavorite,
}: {
  property: RealEstateDemoProperty;
  favorite: boolean;
  onFavorite: (id: string) => void;
}) {
  return (
    <article className={styles.propertyCard}>
      <div className={styles.propertyCardMedia}>
        <Image
          src={property.image}
          alt={property.alt}
          width={property.width}
          height={property.height}
          sizes="(max-width: 760px) 82vw, 19rem"
        />
        <button
          type="button"
          aria-label={`${favorite ? "Remover" : "Adicionar"} ${property.title} dos favoritos`}
          aria-pressed={favorite}
          onClick={() => onFavorite(property.id)}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <div className={styles.propertyCardBody}>
        <span>{property.type}</span>
        <h4>{property.title}</h4>
        <p>{property.location}</p>
        <strong>{property.price}</strong>
        <PropertyFacts property={property} />
      </div>
    </article>
  );
}

function HomeMockup({
  favorites,
  onFavorite,
}: {
  favorites: string[];
  onFavorite: (id: string) => void;
}) {
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("imoveis-listagem")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={`${styles.browserMockup} ${styles.homeMockup}`} id="imoveis-inicio">
      <DemoBrandBar />
      <div className={styles.homeHero}>
        <Image
          src={realEstateDemoProperties[0].image}
          alt={realEstateDemoProperties[0].alt}
          width={realEstateDemoProperties[0].width}
          height={realEstateDemoProperties[0].height}
          priority
          sizes="(max-width: 760px) 94vw, 62rem"
        />
        <div className={styles.homeHeroCopy}>
          <span>Encontre seu lugar</span>
          <h3>Imóveis escolhidos para uma vida melhor.</h3>
          <p>Casas e apartamentos ilustrativos, organizados para facilitar a comparação.</p>
          <form onSubmit={handleSearch}>
            <label htmlFor="home-property-search">Busque por cidade ou tipo de imóvel</label>
            <input id="home-property-search" placeholder="Ex.: casa no litoral" />
            <button type="submit" aria-label="Ir para a listagem de imóveis">
              Buscar
            </button>
          </form>
        </div>
      </div>
      <div className={styles.featuredBlock}>
        <div className={styles.demoSectionTitle}>
          <h3>Destaques da semana</h3>
          <a href="#imoveis-listagem">Ver todos →</a>
        </div>
        <div className={styles.featuredGrid}>
          {realEstateDemoProperties.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              favorite={favorites.includes(property.id)}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type Filters = {
  type: string;
  region: string;
  priceBand: string;
  bedrooms: string;
};

const emptyFilters: Filters = { type: "", region: "", priceBand: "", bedrooms: "" };

function ListingMockup({
  favorites,
  onFavorite,
}: {
  favorites: string[];
  onFavorite: (id: string) => void;
}) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(emptyFilters);

  const visibleProperties = useMemo(
    () =>
      realEstateDemoProperties.filter((property) => {
        if (appliedFilters.type && property.type !== appliedFilters.type) return false;
        if (appliedFilters.region && property.region !== appliedFilters.region) return false;
        if (appliedFilters.priceBand && property.priceBand !== appliedFilters.priceBand) return false;
        if (appliedFilters.bedrooms && property.bedrooms < Number(appliedFilters.bedrooms)) return false;
        return true;
      }),
    [appliedFilters],
  );

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedFilters(filters);
  }

  return (
    <div className={`${styles.browserMockup} ${styles.listingMockup}`} id="imoveis-listagem">
      <DemoBrandBar />
      <div className={styles.listingHeader}>
        <div>
          <h3>Imóveis à venda</h3>
          <p>Encontre uma opção compatível com o que você procura.</p>
        </div>
        <span>{visibleProperties.length} imóveis ilustrativos</span>
      </div>
      <form className={styles.filters} onSubmit={applyFilters}>
        <label>
          <span>Tipo de imóvel</span>
          <select value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}>
            <option value="">Todos</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
          </select>
        </label>
        <label>
          <span>Região</span>
          <select value={filters.region} onChange={(event) => setFilters({ ...filters, region: event.target.value })}>
            <option value="">Todas</option>
            <option value="Litoral">Litoral</option>
            <option value="São Paulo">São Paulo</option>
          </select>
        </label>
        <label>
          <span>Faixa de preço</span>
          <select value={filters.priceBand} onChange={(event) => setFilters({ ...filters, priceBand: event.target.value })}>
            <option value="">Qualquer valor</option>
            <option value="2-5">R$ 2 a 5 milhões</option>
            <option value="acima-5">Acima de R$ 5 milhões</option>
          </select>
        </label>
        <label>
          <span>Quartos</span>
          <select value={filters.bedrooms} onChange={(event) => setFilters({ ...filters, bedrooms: event.target.value })}>
            <option value="">Todos</option>
            <option value="3">3 ou mais</option>
            <option value="4">4 ou mais</option>
          </select>
        </label>
        <button type="submit">Buscar</button>
      </form>
      {visibleProperties.length ? (
        <div className={styles.listingGrid} aria-live="polite">
          {visibleProperties.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              favorite={favorites.includes(property.id)}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyState} aria-live="polite">
          Nenhum imóvel desta demonstração corresponde aos filtros. Tente ampliar a busca.
        </p>
      )}
    </div>
  );
}

function PropertyDetailMockup() {
  const property = realEstateDemoProperties[0];
  const [selectedImage, setSelectedImage] = useState(realEstateDetailGallery[0]);

  return (
    <div className={`${styles.browserMockup} ${styles.detailMockup}`} id="imovel-detalhe">
      <DemoBrandBar />
      <div className={styles.breadcrumb}>Início / Imóveis / {property.title}</div>
      <div className={styles.detailLayout}>
        <div className={styles.detailGallery}>
          <div className={styles.detailMainImage}>
            <Image
              src={selectedImage.image}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              sizes="(max-width: 760px) 90vw, 38rem"
            />
          </div>
          <div className={styles.thumbnails} aria-label="Galeria do imóvel ilustrativo">
            {realEstateDetailGallery.map((image) => (
              <button
                key={image.id}
                type="button"
                aria-label={`Mostrar ${image.title}`}
                aria-pressed={selectedImage.id === image.id}
                onClick={() => setSelectedImage(image)}
              >
                <Image src={image.image} alt="" width={image.width} height={image.height} sizes="7rem" />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.detailCopy}>
          <span>{property.type} · oportunidade ilustrativa</span>
          <h3>{property.title}</h3>
          <p>{property.location}</p>
          <strong>{property.price}</strong>
          <PropertyFacts property={property} />
          <p className={styles.detailDescription}>
            Uma casa contemporânea apresentada com fotografia ampla, informações essenciais e um caminho direto para solicitar uma visita.
          </p>
          <ul className={styles.featureList}>
            {property.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <div className={styles.detailActions}>
            <a href="#imoveis-contato">Agendar visita</a>
            <a href="#imoveis-contato">Falar no WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactMockup() {
  const [notice, setNotice] = useState(false);

  function showDemoNotice() {
    setNotice(true);
  }

  return (
    <div className={`${styles.contactMockup} ${styles.browserMockup}`} id="imoveis-contato">
      <div className={styles.contactImage}>
        <Image
          src={realEstateDemoProperties[3].image}
          alt={realEstateDemoProperties[3].alt}
          width={realEstateDemoProperties[3].width}
          height={realEstateDemoProperties[3].height}
          sizes="(max-width: 760px) 94vw, 24rem"
        />
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <span>Entre em contato</span>
        <h3>Conte qual imóvel despertou seu interesse.</h3>
        <label>
          Nome
          <input autoComplete="name" placeholder="Seu nome" />
        </label>
        <label>
          E-mail
          <input type="email" autoComplete="email" placeholder="voce@exemplo.com" />
        </label>
        <label>
          Interesse
          <textarea defaultValue="Gostaria de receber mais informações sobre a Casa Horizonte." />
        </label>
        <button type="button" onClick={showDemoNotice}>Enviar mensagem</button>
        <button className={styles.whatsappDemoButton} type="button" onClick={showDemoNotice}>
          Falar no WhatsApp
        </button>
        <p className={styles.formNotice} aria-live="polite">
          {notice
            ? "Esta é uma demonstração: nenhuma mensagem foi enviada."
            : "Demonstração segura: estes campos não enviam nem armazenam dados."}
        </p>
      </form>
      <aside>
        <ul>
          <li>Atendimento personalizado</li>
          <li>Resposta pelos canais escolhidos</li>
          <li>Informações organizadas antes da visita</li>
          <li>Sem compromisso nesta demonstração</li>
        </ul>
      </aside>
    </div>
  );
}

export function RealEstateInspirationPublication({ inspiration, contactHref, relatedInspirations }: Props) {
  const [favorites, setFavorites] = useState<string[]>([]);

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id],
    );
  }

  return (
    <main className={styles.publication}>
      <Link className={styles.backLink} href="/servicos/inspiracoes">
        <span aria-hidden="true">←</span> Voltar para inspirações
      </Link>

      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{inspiration.category}</p>
          <h1>Veja como o seu site pode funcionar na prática</h1>
          <p className={styles.introDescription}>
            Uma direção para um site imobiliário, mostrando como atrair a atenção, organizar imóveis e facilitar o primeiro contato.
          </p>
        </div>
        <aside className={styles.introNote}>
          <strong>Projeto demonstrativo</strong>
          <p>Imóveis, preços, contatos e imagens são ilustrativos.</p>
        </aside>
      </header>

      <section className={styles.stage} aria-labelledby="primeira-impressao-title">
        <StageCopy
          number="01"
          id="primeira-impressao-title"
          title="Primeira impressão"
          lead="O visitante entende imediatamente a oferta."
          description="Uma página inicial que valoriza as imagens, apresenta a busca e convida a explorar sem excesso de informação."
        />
        <HomeMockup favorites={favorites} onFavorite={toggleFavorite} />
      </section>

      <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="exploracao-title">
        <StageCopy
          number="02"
          id="exploracao-title"
          title="Exploração"
          lead="O visitante compara opções com facilidade."
          description="Filtros funcionais, fotografias amplas e características essenciais reduzem o esforço para encontrar uma opção relevante."
        />
        <ListingMockup favorites={favorites} onFavorite={toggleFavorite} />
      </section>

      <section className={styles.stage} aria-labelledby="decisao-title">
        <StageCopy
          number="03"
          id="decisao-title"
          title="Decisão"
          lead="O interesse ganha informação e contexto."
          description="A página do imóvel reúne galeria, preço, características e os próximos passos necessários para avaliar a oportunidade."
        />
        <PropertyDetailMockup />
      </section>

      <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="contato-title">
        <StageCopy
          number="04"
          id="contato-title"
          title="Contato"
          lead="O caminho até a conversa é curto e claro."
          description="O formulário já chega contextualizado com o imóvel, enquanto o WhatsApp oferece uma alternativa direta."
        />
        <ContactMockup />
      </section>

      <section className={styles.componentsSection} aria-labelledby="components-title">
        <div className={styles.sectionHeading}>
          <h2 id="components-title">Componentes que constroem essa jornada</h2>
          <p>Uma seleção enxuta; cada peça tem uma função na decisão.</p>
        </div>
        <ul className={styles.componentGrid}>
          {componentHighlights.map(([number, title, description]) => (
            <li key={title}>
              <span aria-hidden="true">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.relatedSection} aria-labelledby="related-title">
        <div className={styles.sectionHeading}>
          <h2 id="related-title">Essa direção pode inspirar outros negócios</h2>
          <Link href="/servicos/inspiracoes">Ver mais direções →</Link>
        </div>
        <div className={styles.relatedGrid}>
          {relatedInspirations.map((related) => (
            <Link key={related.slug} href={`/servicos/inspiracoes/${related.slug}`}>
              <Image
                src={related.image}
                alt={related.alt}
                width={related.width}
                height={related.height}
                sizes="(max-width: 560px) 38vw, 10rem"
              />
              <span>
                <strong>{related.title}</strong>
                <small>{related.category}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="real-estate-contact-title">
        <div>
          <p className={styles.eyebrow}>Vamos conversar?</p>
          <h2 id="real-estate-contact-title">Quero um site nessa direção</h2>
          <p>Vamos adaptar a estrutura aos seus imóveis, regiões, identidade e forma de atendimento.</p>
        </div>
        <div className={styles.finalCtaAction}>
          <a
            href={contactHref}
            data-analytics-event="services_help_click"
            data-analytics-location="service_inspiration_imoveis-em-destaque"
          >
            Falar sobre meu projeto <span aria-hidden="true">→</span>
          </a>
          <small>Contato pelo WhatsApp</small>
        </div>
      </section>

      <p className={styles.mediaDisclosure}>
        Publicação demonstrativa criada por Henrique Reis. As imagens foram geradas para esta interface e não representam imóveis disponíveis.
      </p>
    </main>
  );
}
