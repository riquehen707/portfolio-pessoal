import type { servicePlans } from "@/data/service-hub";
import { Reveal } from "@/components/motion/Reveal";

import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

type ServicePlan = (typeof servicePlans)[number];

export function ServicePlansSnap({
  plans,
  contactHref,
}: {
  plans: readonly ServicePlan[];
  contactHref: string;
}) {
  return (
    <section className={styles.plansSection} id="planos" aria-labelledby="plans-title">
      <div className={styles.plansLayout}>
      <header className={styles.plansIntro}>
        <p className={styles.kicker}>Planos</p>
        <h2 id="plans-title">Escolha o nível de acompanhamento que faz sentido para você.</h2>
        <p>Todos os planos incluem criação do site, hospedagem, domínio e manutenção técnica.</p>
      </header>

      <Reveal className={styles.plansGrid} distance={18}>
        {plans.map((plan) => (
          <article className={styles.plan} data-featured={plan.id === "growth" ? "true" : undefined} key={plan.id}>
            <div className={styles.planHeading}>
              <div>
                <p>{plan.name}</p>
                <strong>{plan.price}</strong>
              </div>
              {plan.badge ? <span className={styles.planBadge}>{plan.badge}</span> : null}
            </div>
            <p className={styles.planDescription}>{plan.description}</p>
            {plan.inherits ? <p className={styles.planInheritance}>{plan.inherits}</p> : null}
            <ul>
              {plan.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a
              className={styles.planAction}
              href={contactHref}
              data-analytics-event="services_help_click"
              data-analytics-location={`services_hub_plan_${plan.id}`}
            >
              {plan.cta} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </Reveal>
      </div>

      <StoryProgress chapter={5} label="Continue explorando" />
    </section>
  );
}
