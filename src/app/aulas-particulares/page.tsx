import type { Metadata } from "next";

import { baseURL } from "@/resources";

import { TrackingLink } from "./TrackingLink";
import styles from "./page.module.scss";

const pagePath = "/aulas-particulares";
const whatsAppHref =
  "https://wa.me/5575983675164?text=Oi%2C%20quero%20saber%20sobre%20as%20aulas%20particulares%20de%20matem%C3%A1tica%2C%20f%C3%ADsica%20ou%20c%C3%A1lculo.";

export const metadata: Metadata = {
  title: "Aulas particulares de matemática, física e cálculo",
  description:
    "Aulas particulares de matemática, geometria, física e cálculo. Aula avulsa por R$50/h ou plano mensal com 2h por semana por R$300.",
  alternates: {
    canonical: `${baseURL}${pagePath}`,
  },
  openGraph: {
    title: "Aulas particulares de matemática, física e cálculo",
    description:
      "Reforce a base, resolva listas e se prepare para provas com aulas objetivas e acompanhamento semanal.",
    url: `${baseURL}${pagePath}`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const subjects = [
  "Matemática",
  "Geometria",
  "Física",
  "Cálculo",
  "Listas de exercícios",
  "Revisão para prova",
] as const;

const steps = [
  {
    title: "Diagnóstico rápido",
    description: "Antes da aula, você envia o tema, lista ou prova. Eu vejo onde a dúvida começa.",
  },
  {
    title: "Aula objetiva",
    description: "A explicação vai direto ao ponto, com exemplos e resolução acompanhada.",
  },
  {
    title: "Prática guiada",
    description: "Você resolve junto, corrige o raciocínio e sai com próximos exercícios claros.",
  },
] as const;

const plans = [
  {
    name: "Aula avulsa",
    price: "R$50",
    unit: "/h",
    description: "Para tirar dúvidas pontuais, revisar uma prova ou resolver uma lista específica.",
    bullets: ["1 hora de aula", "Tema combinado antes", "Boa para urgências"],
    cta: "Agendar aula avulsa",
    plan: "aula_avulsa",
    value: 50,
    highlighted: false,
  },
  {
    name: "Plano mensal",
    price: "R$300",
    unit: "/mês",
    description: "Para acompanhar a evolução com 2 horas de aula por semana.",
    bullets: ["2h por semana", "Acompanhamento contínuo", "Melhor para base e rotina"],
    cta: "Quero o plano mensal",
    plan: "plano_mensal",
    value: 300,
    highlighted: true,
  },
] as const;

const faqs = [
  {
    question: "As aulas são para quais níveis?",
    answer:
      "Ensino fundamental, ensino médio, pré-vestibular e início de graduação, dependendo do tema.",
  },
  {
    question: "Posso enviar lista de exercícios antes?",
    answer:
      "Sim. É o ideal. Assim a aula já começa pelo ponto que está travando, sem perder tempo descobrindo o problema ao vivo.",
  },
  {
    question: "A aula é online ou presencial?",
    answer:
      "A página está preparada para captação inicial pelo WhatsApp. O formato pode ser alinhado na conversa conforme disponibilidade.",
  },
] as const;

export default function MathTutoringLandingPage() {
  return (
    <div className={`${styles.page} standaloneLandingRoot`}>
      <header className={styles.topbar}>
        <a className={styles.logo} href="#inicio" aria-label="Aulas particulares">
          <span>∑</span>
          Aula Particular
        </a>
        <nav aria-label="Navegação da landing page">
          <a href="#materias">Matérias</a>
          <a href="#planos">Planos</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
      </header>

      <main id="inicio">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Matemática sem enrolação</span>
            <h1>Aulas particulares para entender a conta, não só copiar a solução.</h1>
            <p>
              Matemática, geometria, física e cálculo com explicação direta, prática acompanhada e
              foco no ponto que realmente está travando.
            </p>

            <div className={styles.heroActions}>
              <TrackingLink
                className={styles.primaryButton}
                href={whatsAppHref}
                target="_blank"
                rel="noreferrer"
                payload={{
                  eventName: "tutoring_whatsapp_click",
                  label: "hero_primary",
                  plan: "whatsapp",
                }}
              >
                Chamar no WhatsApp
              </TrackingLink>
              <TrackingLink
                className={styles.secondaryButton}
                href="#planos"
                payload={{
                  eventName: "tutoring_view_plans_click",
                  label: "hero_secondary",
                }}
              >
                Ver valores
              </TrackingLink>
            </div>
          </div>

          <div className={styles.heroBoard} aria-hidden="true">
            <div className={styles.boardHeader}>
              <span>Função da aula</span>
              <strong>entender → praticar → revisar</strong>
            </div>
            <div className={styles.equation}>
              <span>f(x)</span>
              <strong>=</strong>
              <span>x² + 2x - 3</span>
            </div>
            <div className={styles.graph}>
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className={styles.note}>A dúvida vira passo a passo.</div>
          </div>
        </section>

        <section className={styles.subjectSection} id="materias">
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>O que dá para estudar</span>
            <h2>Reforço para prova, base e listas difíceis.</h2>
          </div>

          <div className={styles.subjectGrid}>
            {subjects.map((subject) => (
              <span key={subject}>{subject}</span>
            ))}
          </div>
        </section>

        <section className={styles.methodSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Como funciona</span>
            <h2>Uma aula boa começa antes da chamada.</h2>
          </div>

          <div className={styles.stepGrid}>
            {steps.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.pricingSection} id="planos">
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Valores</span>
            <h2>Escolha pelo tamanho da dúvida.</h2>
          </div>

          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <article
                className={styles.planCard}
                data-highlighted={plan.highlighted ? "true" : "false"}
                key={plan.name}
              >
                {plan.highlighted ? <span className={styles.recommended}>Melhor rotina</span> : null}
                <h3>{plan.name}</h3>
                <div className={styles.price}>
                  <strong>{plan.price}</strong>
                  <span>{plan.unit}</span>
                </div>
                <p>{plan.description}</p>
                <ul>
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <TrackingLink
                  className={plan.highlighted ? styles.primaryButton : styles.secondaryButton}
                  href={whatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  payload={{
                    eventName: "tutoring_plan_click",
                    label: plan.name,
                    plan: plan.plan,
                    value: plan.value,
                  }}
                >
                  {plan.cta}
                </TrackingLink>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.fitSection}>
          <div>
            <span className={styles.kicker}>Para quem faz sentido</span>
            <h2>Quando a dificuldade não é falta de esforço.</h2>
          </div>
          <ul>
            <li>Você estudou, mas trava quando o exercício muda um pouco.</li>
            <li>Precisa revisar para prova, recuperação, vestibular ou disciplina da faculdade.</li>
            <li>Quer recuperar base antes de avançar para física, cálculo ou geometria.</li>
          </ul>
        </section>

        <section className={styles.faqSection} id="duvidas">
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Dúvidas comuns</span>
            <h2>Antes de chamar.</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div>
            <span className={styles.kicker}>Próximo passo</span>
            <h2>Envie o tema da dúvida e combine o melhor formato.</h2>
          </div>
          <TrackingLink
            className={styles.primaryButton}
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            payload={{
              eventName: "tutoring_whatsapp_click",
              label: "final_cta",
              plan: "whatsapp",
            }}
          >
            Chamar no WhatsApp
          </TrackingLink>
        </section>
      </main>
    </div>
  );
}
