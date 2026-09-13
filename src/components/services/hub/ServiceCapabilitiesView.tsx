import Link from "next/link";

import { CapabilityWorkbench } from "@/components/services/capabilities/CapabilityWorkbench";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import type { ServiceFeature } from "@/data/service-hub";

import { ServiceFeaturePreview } from "./ServiceFeaturePreview";
import styles from "./ServiceHubExperience.module.scss";

type Props = { features: ServiceFeature[] };

const capabilitySummary = [
  "Formulários",
  "Agendamento",
  "Galerias",
  "Filtros",
  "Integrações",
] as const;

export function ServiceCapabilitiesView({ features }: Props) {
  const whatsapp = features.find((feature) => feature.id === "whatsapp");

  return (
    <main className={styles.capabilityPage}>
      <ServicesAreaNav active="capabilities" />

      <header className={styles.capabilityHero}>
        <p className={styles.eyebrow}>Capacidades técnicas</p>

        <div className={styles.heroContent}>
          <h1>Interfaces além da página estática.</h1>
          <div className={styles.heroIntroduction}>
            <p>
              Além de páginas bem apresentadas, desenvolvo recursos e fluxos
              que ajudam seu site a informar, organizar e receber ações.
            </p>
            <ul aria-label="Exemplos de capacidades">
              {capabilitySummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <section
        className={styles.resourcesSection}
        id="recursos"
        aria-labelledby="resources-title"
      >
        <header className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Recursos possíveis</p>
            <h2 id="resources-title">
              Recursos que podem fazer parte do seu site.
            </h2>
          </div>
          <p>
            A combinação depende do objetivo do projeto. Nem todo site precisa
            de tudo — a escolha começa pelo que facilita a vida de quem visita.
          </p>
        </header>

        <ol className={styles.resourceList}>
          {features.map((feature, index) => (
            <li key={feature.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {whatsapp ? (
        <section
          className={styles.demoSection}
          id="demonstracao"
          aria-labelledby="demo-title"
        >
          <div className={styles.demoCopy}>
            <p className={styles.darkEyebrow}>Uma interação, sem distrações</p>
            <h2 id="demo-title">Do interesse à conversa.</h2>
            <p>
              Um botão de contato pode abrir uma mensagem já contextualizada e
              encurtar o caminho até o atendimento. Teste o estado abaixo: esta
              demonstração é local e não envia nenhuma mensagem.
            </p>
          </div>

          <div className={styles.demoPreview}>
            <ServiceFeaturePreview />
          </div>
        </section>
      ) : null}

      <CapabilityWorkbench />

      <footer className={styles.capabilityNext}>
        <div>
          <p>Quer explorar direções visuais?</p>
          <h2>Veja como seu site pode ficar.</h2>
        </div>
        <Link className={styles.primaryNext} href="/servicos/inspiracoes">
          Ver inspirações <span aria-hidden="true">→</span>
        </Link>
        <Link className={styles.secondaryNext} href="/servicos">
          Voltar para serviços
        </Link>
      </footer>
    </main>
  );
}
