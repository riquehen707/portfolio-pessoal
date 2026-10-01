import { Reveal } from "@/components/motion/Reveal";
import type { servicePlans } from "@/data/service-hub";

import styles from "./ServiceHubView.module.scss";

type ServicePlansSnapProps = {
  plans: typeof servicePlans;
  contactHref: string;
};

function formatPlanIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function formatPlanPrice(price: string) {
  const cadence = "/mês";

  return price.endsWith(cadence)
    ? {
        amount: price.slice(0, -cadence.length),
        cadence,
      }
    : {
        amount: price,
        cadence: null,
      };
}

export function ServicePlansSnap({
  plans,
  contactHref,
}: ServicePlansSnapProps) {
  return (
    <section
      className={styles.plansSection}
      id="planos"
      aria-labelledby="plans-title"
    >
      <div className={styles.plansLayout}>
        <Reveal
          className={styles.plansIntro}
          distance={14}
          trigger="mount"
        >
          <p className={styles.kicker}>Planos</p>

          <h2 id="plans-title">
            Escolha o nível de acompanhamento.
          </h2>

          <p>
            Todos os planos partem de uma base profissional.
            O que muda é a profundidade do acompanhamento,
            da análise e da evolução do site.
          </p>

          <div className={styles.plansAssurance}>
            <span aria-hidden="true">✓</span>

            <div>
              <strong>Sem taxa de criação</strong>
              <small>
                O investimento é mensal desde o início.
              </small>
            </div>
          </div>
        </Reveal>

        <div className={styles.plansGrid}>
          {plans.map((plan, index) => {
            const featured = plan.id === "growth";
            const price = formatPlanPrice(plan.price);

            return (
              <Reveal
                className={styles.planReveal}
                delay={index * 0.06}
                distance={16}
                trigger="mount"
                key={plan.id}
              >
                <article
                  className={styles.plan}
                  data-featured={featured}
                >
                  {plan.badge ? (
                    <span className={styles.planBadge}>
                      {plan.badge}
                    </span>
                  ) : null}

                  <header className={styles.planHeading}>
                    <div>
                      <span className={styles.planIndex}>
                        {formatPlanIndex(index)}
                      </span>

                      <p>{plan.name}</p>
                    </div>

                    {featured ? (
                      <span
                        className={styles.featuredMark}
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    ) : null}
                  </header>

                  <div className={styles.planPrice}>
                    <strong>{price.amount}</strong>
                    {price.cadence ? <span>{price.cadence}</span> : null}
                  </div>

                  <p className={styles.planDescription}>
                    {plan.description}
                  </p>

                  {plan.inherits ? (
                    <p className={styles.planInheritance}>
                      {plan.inherits}
                    </p>
                  ) : null}

                  <div className={styles.planDivider} />

                  <p className={styles.planIncludesLabel}>
                    Inclui
                  </p>

                  <ul>
                    {plan.includes.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    className={styles.planAction}
                    href={contactHref}
                    data-analytics-event="service_contact"
                    data-analytics-location={`services_plan_${plan.id}`}
                  >
                    <span>{plan.cta}</span>

                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

    </section>
  );
}
