import { Reveal } from "@/components/motion/Reveal";
import type { ServicePlan } from "@/data/service-hub";

import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

type ServicePlansSnapProps = {
  plans: ServicePlan[];
  contactHref: string;
};

function formatPlanIndex(index: number) {
  return String(index + 1).padStart(2, "0");
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

            return (
              <Reveal
                className={styles.planReveal}
                delay={index * 0.06}
                distance={16}
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
                    <strong>{plan.price}</strong>
                    <span>/mês</span>
                  </div>

                  <p className={styles.planDescription}>
                    {plan.description}
                  </p>

                  {plan.inheritance ? (
                    <p className={styles.planInheritance}>
                      {plan.inheritance}
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
                    <span>
                      {featured
                        ? "Quero este plano"
                        : "Escolher plano"}
                    </span>

                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className={styles.plansProgress}>
        <StoryProgress
          chapter={5}
          label="Escolha seu plano"
        />
      </div>
    </section>
  );
}