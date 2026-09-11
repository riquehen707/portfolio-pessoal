import Image from "next/image";

import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import { ServiceExamplesPreview } from "@/components/services/examples/ServiceExamplesPreview";

import styles from "./ServiceHubView.module.scss";

type ServiceHubViewProps = {
  examples: ServiceExample[];
  contactHref: string;
};

const included = [
  {
    title: "Design e desenvolvimento",
    description: "Estrutura, visual e implementação do site.",
  },
  {
    title: "Domínio",
    description: "Configuração do endereço usado pelo seu site.",
  },
  {
    title: "Hospedagem",
    description: "Infraestrutura necessária para manter o site publicado.",
  },
  {
    title: "Manutenção",
    description: "Cuidados técnicos para o site continuar funcionando.",
  },
  {
    title: "Suporte",
    description: "Um canal direto para dúvidas e pequenos problemas.",
  },
  {
    title: "Pequenas atualizações",
    description: "Ajustes recorrentes em textos, imagens e informações.",
  },
] as const;

const capabilities = [
  {
    number: "01",
    title: "Receber contatos",
    description:
      "WhatsApp, formulário ou outra rota simples para transformar uma visita em conversa.",
    emphasis: true,
  },
  {
    number: "02",
    title: "Aparecer nas buscas",
    description:
      "Uma base técnica preparada para indexação, conteúdo e evolução de SEO.",
    emphasis: true,
  },
  {
    number: "03",
    title: "Apresentar seus serviços",
    description:
      "Organize o que você faz de forma clara para quem chega pela primeira vez.",
    emphasis: false,
  },
  {
    number: "04",
    title: "Exibir seus projetos",
    description:
      "Portfólio, galeria, cases ou trabalhos selecionados em uma estrutura visual.",
    emphasis: false,
  },
  {
    number: "05",
    title: "Mostrar serviços e preços",
    description:
      "Explique opções, formatos de contratação e valores quando fizer sentido.",
    emphasis: false,
  },
  {
    number: "06",
    title: "Funcionar bem no celular",
    description:
      "Layout adaptado para navegação, leitura e contato em telas menores.",
    emphasis: false,
  },
] as const;

const process = [
  {
    number: "01",
    title: "Você me explica o projeto",
    description:
      "Entendo seu negócio, o que precisa entrar no site e qual é o objetivo principal.",
  },
  {
    number: "02",
    title: "Eu organizo e crio",
    description:
      "Defino a estrutura, trabalho o visual e desenvolvo as páginas necessárias.",
  },
  {
    number: "03",
    title: "Revisamos juntos",
    description:
      "Você acompanha o resultado e fazemos os ajustes necessários antes da publicação.",
  },
  {
    number: "04",
    title: "Eu publico e continuo cuidando",
    description:
      "O site entra no ar e a manutenção continua incluída no plano.",
  },
] as const;

const faq = [
  [
    "Preciso saber mexer no site?",
    "Não. A proposta é justamente evitar que você precise aprender ferramentas, hospedagem ou manutenção para manter o site funcionando.",
  ],
  [
    "O domínio está incluído?",
    "Sim. O plano inclui o domínio usado pelo site. A disponibilidade do endereço escolhido é confirmada antes do início.",
  ],
  [
    "Existe taxa inicial?",
    "Não. A contratação começa pela mensalidade de R$147, sem cobrança de implementação.",
  ],
  [
    "Posso solicitar alterações?",
    "Sim. Pequenos ajustes recorrentes estão incluídos. Novas páginas, novas funções ou mudanças maiores podem receber um escopo separado.",
  ],
  [
    "Quanto tempo leva para ficar pronto?",
    "O prazo depende da quantidade de páginas e do material disponível. Antes do início, combinamos o escopo e uma previsão de entrega.",
  ],
  [
    "Posso cancelar?",
    "As condições de cancelamento e eventual aviso prévio são apresentadas antes da contratação. Nenhuma condição fica escondida depois do início do projeto.",
  ],
  [
    "O site pertence a mim?",
    "Seu conteúdo, sua identidade e os materiais fornecidos para o projeto continuam sendo seus. As condições sobre domínio e entrega técnica em caso de cancelamento são registradas na contratação.",
  ],
] as const;

export function ServiceHubView({
  examples,
  contactHref,
}: ServiceHubViewProps) {
  return (
    <main className={styles.shell}>
      <ServicesAreaNav active="services" />

      <section
        className={styles.hero}
        aria-labelledby="service-hub-title"
      >
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Criação de sites</p>

          <h1 id="service-hub-title">
            Eu crio, publico e mantenho o seu site.
          </h1>

          <p className={styles.heroStatement}>
            Para profissionais e pequenos negócios que precisam apresentar
            melhor seus serviços e facilitar o contato.
          </p>

          <div className={styles.heroOfferRow}>
            <div className={styles.heroOffer}>
              <div className={styles.heroPrice}>
                <span className={styles.priceCurrency}>R$</span>
                <strong>147</strong>
                <span className={styles.pricePeriod}>/mês</span>
              </div>

              <p>Sem taxa inicial.</p>
            </div>

            <div className={styles.heroActions}>
              <a
                className={styles.primaryAction}
                href={contactHref}
                data-analytics-event="services_help_click"
                data-analytics-location="services_hub_hero"
              >
                Quero meu site
              </a>

              <a
                className={styles.secondaryAction}
                href="#projetos"
              >
                Ver projetos
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <p className={styles.heroSupport}>
            Design, desenvolvimento, domínio, hospedagem e manutenção no mesmo
            plano.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImage}>
            <Image
              src="/images/work/henrique-dog-interface.webp"
              alt="Interface do site henrique.dog, desenvolvido por Henrique Reis."
              fill
              priority
              sizes="(max-width: 760px) 100vw, 58vw"
            />
          </div>

          <div className={styles.heroVisualFooter}>
            <span>Projeto real</span>
            <p>henrique.dog</p>
          </div>
        </div>
      </section>

      <section
        className={styles.planSection}
        aria-labelledby="plan-title"
      >
        <div className={styles.planHeader}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>Um único plano</p>

            <h2 id="plan-title">
              O necessário para colocar seu site no ar e mantê-lo funcionando.
            </h2>

            <p className={styles.sectionDescription}>
              Você não precisa contratar desenvolvimento, hospedagem e
              manutenção separadamente.
            </p>
          </div>

          <div className={styles.planSummary}>
            <p className={styles.planLabel}>Plano mensal</p>

            <div className={styles.planPrice}>
              <span>R$</span>
              <strong>147</strong>
              <small>/mês</small>
            </div>

            <p>Sem taxa inicial.</p>
          </div>
        </div>

        <ul className={styles.includedGrid}>
          {included.map((item) => (
            <li key={item.title}>
              <span className={styles.includedMark} aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div id="projetos" className={styles.examplesAnchor}>
        <ServiceExamplesPreview examples={examples} />
      </div>

      <section
        className={styles.capabilitiesSection}
        aria-labelledby="capabilities-title"
      >
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>Possibilidades</p>

          <h2 id="capabilities-title">
            Seu site pode trabalhar de formas diferentes.
          </h2>

          <p className={styles.sectionDescription}>
            A estrutura muda de acordo com o que seu negócio precisa comunicar,
            mostrar ou receber.
          </p>
        </div>

        <div className={styles.capabilitiesGrid}>
          {capabilities.map((item) => (
            <article
              className={`${styles.capabilityCard} ${
                item.emphasis ? styles.capabilityCardFeatured : ""
              }`}
              key={item.number}
            >
              <span className={styles.capabilityNumber}>
                {item.number}
              </span>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.processSection}
        aria-labelledby="process-title"
      >
        <div className={styles.processHeader}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>Como funciona</p>

            <h2 id="process-title">
              Do primeiro contato ao site publicado.
            </h2>
          </div>

          <p className={styles.processLead}>
            Um processo curto, com poucas etapas e sem exigir que você aprenda
            ferramentas para acompanhar o projeto.
          </p>
        </div>

        <ol className={styles.processGrid}>
          {process.map((item) => (
            <li key={item.number}>
              <span className={styles.processNumber}>
                {item.number}
              </span>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={styles.faqSection}
        aria-labelledby="faq-title"
      >
        <div className={styles.faqIntro}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>Antes de contratar</p>

            <h2 id="faq-title">
              O que você provavelmente quer saber.
            </h2>

            <p className={styles.sectionDescription}>
              Algumas respostas importantes antes de começarmos.
            </p>
          </div>
        </div>

        <div className={styles.faqPanel}>
          {faq.map(([question, answer], index) => (
            <details key={question}>
              <summary>
                <span className={styles.faqNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.faqQuestion}>
                  {question}
                </span>

                <span
                  className={styles.faqIcon}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>

              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        className={styles.finalCta}
        aria-labelledby="contact-title"
      >
        <div className={styles.finalCtaCopy}>
          <p className={styles.kicker}>Projeto demonstrativo</p>

          <h2 id="contact-title">
            Quer um site com esse nível de apresentação?
          </h2>

          <p className={styles.finalCtaDescription}>
            Seu site será criado a partir do seu conteúdo, do seu posicionamento
            e do que faz sentido para o seu negócio — não a partir de um modelo
            genérico.
          </p>

          <ul className={styles.finalCtaMeta}>
            <li>Estrutura pensada para conversão</li>
            <li>Visual alinhado ao seu segmento</li>
            <li>Suporte e manutenção no mesmo plano</li>
          </ul>
        </div>

        <div className={styles.finalOfferCard}>
          <p className={styles.finalOfferLabel}>Plano mensal</p>

          <div className={styles.finalOfferPrice}>
            <span>R$</span>
            <strong>147</strong>
            <small>/mês</small>
          </div>

          <p className={styles.finalOfferNote}>
            Domínio, hospedagem e manutenção incluídos.
          </p>

          <a
            className={styles.finalOfferAction}
            href={contactHref}
            data-analytics-event="services_help_click"
            data-analytics-location="services_hub_contact"
          >
            Quero meu site
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}