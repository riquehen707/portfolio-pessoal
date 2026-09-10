import Image from "next/image";
import Link from "next/link";
import type { ReturnTypeOfServiceHubContent } from "@/data/service-hub/types";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { getServiceExamplePath } from "@/data/service-examples";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import { ServiceExamplesPreview } from "@/components/services/examples/ServiceExamplesPreview";
import styles from "./ServiceHubView.module.scss";

type ServiceHubViewProps = ReturnTypeOfServiceHubContent & { examples: ServiceExample[]; contactHref: string; questionHref: string };

const process = [
  ["01", "Você envia as informações."],
  ["02", "Eu defino estrutura e visual."],
  ["03", "O site é criado e revisado."],
  ["04", "Eu publico e mantenho."],
] as const;

const faq = [
  ["Preciso saber mexer no site?", "Não. Você envia as informações e participa da revisão; eu cuido da criação, publicação e manutenção técnica."],
  ["Posso usar meu domínio?", "Sim, desde que você tenha acesso à conta ou às configurações necessárias para conectá-lo. A compra e a renovação do domínio ainda precisam ser definidas na proposta."],
  ["Posso pedir alterações?", "A mensalidade cobre pequenas atualizações. O limite será confirmado na proposta; novas páginas e mudanças maiores recebem outro escopo."],
  ["Quanto tempo demora?", "O prazo depende do formato, dos recursos e do envio dos materiais. Ele é combinado antes do início."],
] as const;

export function ServiceHubView({ formats, features, examples, contactHref, questionHref }: ServiceHubViewProps) {
  const highlightedFeatures = features.filter((feature) => ["whatsapp", "form", "portfolio-gallery", "services-prices", "location-map", "seo"].includes(feature.id));
  return <div className={styles.shell}>
    <ServicesAreaNav active="services" />
    <section className={styles.hero} aria-labelledby="service-hub-title">
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>Criação de sites</p>
        <h1 id="service-hub-title">Eu crio, publico e mantenho seu site.</h1>
        <p className={styles.lead}>Para profissionais, autônomos, MEIs e pequenas empresas que querem um site pronto sem precisar aprender a montar ou manter um.</p>
        <dl className={styles.heroPricing}>
          <div><dt>Criação</dt><dd>R$ 397</dd><small>preço padrão</small></div>
          <div data-current="true"><dt>Durante setembro</dt><dd>R$ 200</dd><small>trabalho inicial</small></div>
          <div><dt>Depois</dt><dd>R$ 89,90<em>/mês</em></dd><small>hospedagem e manutenção</small></div>
        </dl>
        <div className={styles.heroActions}><a className={styles.primaryAction} href={contactHref} data-analytics-event="services_help_click" data-analytics-location="services_hub_hero">Quero meu site</a><a className={styles.secondaryAction} href="#exemplos">Ver exemplos <span aria-hidden="true">↓</span></a></div>
      </div>
      {examples.length ? <div className={styles.heroShowcase} aria-label="Exemplos de sites demonstrativos">{examples.slice(0,3).map((example) => example.preview ? <Link href={getServiceExamplePath(example.slug)} data-example={example.slug} key={example.id}><Image src={example.preview.src} alt={example.preview.alt} fill priority={example.slug === "arquitetura"} sizes="(max-width: 760px) 86vw, 36rem" /><span>{example.name}<small>{example.category}</small></span></Link> : null)}</div> : null}
    </section>

    <section className={styles.offerSection} aria-labelledby="offer-title">
      <div className={styles.offerIntro}><p className={styles.kicker}>Uma oferta</p><h2 id="offer-title">Um site pronto para apresentar e atender.</h2><p>A condição é a mesma para qualquer profissão. O formato muda conforme o conteúdo e a ação que o site precisa oferecer.</p></div>
      <div className={styles.offerDetails}>
        <div><span>Incluído na mensalidade</span><ul><li>Hospedagem</li><li>Manutenção técnica</li><li>Suporte</li><li>Pequenas atualizações</li></ul></div>
        <div><span>Formatos possíveis</span><ul>{formats.map((format) => <li key={format.id}>{format.title}</li>)}</ul><small>Novas páginas, sistemas, integrações e catálogos complexos são projetos personalizados.</small></div>
      </div>
    </section>

    <ServiceExamplesPreview examples={examples} />

    <section className={styles.featuresSection} id="recursos-principais" aria-labelledby="main-features-title">
      <div className={styles.sectionHeading}><p className={styles.kicker}>Recursos principais</p><h2 id="main-features-title">O necessário para explicar e receber contatos.</h2><Link href="/servicos/capacidades">Explorar capacidades técnicas <span aria-hidden="true">→</span></Link></div>
      <div className={styles.featureList}>{highlightedFeatures.map((feature, index) => <article key={feature.id}><span>{String(index + 1).padStart(2,"0")}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
    </section>

    <section className={styles.processSection} aria-labelledby="process-title">
      <div className={styles.sectionHeading}><p className={styles.kicker}>Como funciona</p><h2 id="process-title">Quatro passos.</h2></div>
      <ol className={styles.processList}>{process.map(([number,title]) => <li key={number}><span>{number}</span><h3>{title}</h3></li>)}</ol>
    </section>

    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={styles.sectionHeading}><p className={styles.kicker}>Dúvidas comerciais</p><h2 id="faq-title">Antes de começar.</h2></div>
      <div className={styles.faqList}>{faq.map(([question,answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>

    <section className={styles.contact} id="iniciar-projeto" aria-labelledby="contact-title">
      <div><p className={styles.kicker}>Próximo passo</p><h2 id="contact-title">Conte o que você precisa.</h2><p>Explique seu trabalho e o que gostaria de colocar no site.</p></div>
      <div className={styles.contactActions}><a className={styles.primaryAction} href={contactHref} data-analytics-event="services_help_click" data-analytics-location="services_hub_contact">Quero meu site</a><a className={styles.secondaryAction} href={questionHref}>Tirar uma dúvida</a></div>
    </section>
  </div>;
}
