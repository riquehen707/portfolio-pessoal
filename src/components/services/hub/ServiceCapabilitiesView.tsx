import { CapabilityWorkbench } from "@/components/services/capabilities/CapabilityWorkbench";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import { ServicesNextStep } from "@/components/services/ServicesNextStep";
import type { ServiceFeature, ServiceFeatureGroup } from "@/data/service-hub";

import { ServiceFeaturePreview } from "./ServiceFeaturePreview";
import styles from "./ServiceHubExperience.module.scss";

type Props = { features: ServiceFeature[] };

const groups: { id: ServiceFeatureGroup; title: string; description: string }[] = [
  { id: "contact", title: "Receber contatos", description: "Caminhos para dúvidas, pedidos e agendamentos." },
  { id: "presentation", title: "Apresentar o trabalho", description: "Projetos, serviços, preços e respostas antes da conversa." },
  { id: "local-business", title: "Orientar a visita", description: "Endereço e horários acessíveis para quem vai ao local." },
  { id: "content", title: "Organizar conteúdo", description: "Páginas encontráveis e espaço para publicar quando fizer sentido." },
];

export function ServiceCapabilitiesView({ features }: Props) {
  const whatsapp = features.find((feature) => feature.id === "whatsapp");

  return (
    <main className={styles.capabilityPage}>
      <ServicesAreaNav active="capabilities" />

      <header className={styles.capabilityHero}>
        <p className={styles.eyebrow}>Capacidades</p>
        <div className={styles.heroContent}>
          <h1>O que seu site pode fazer.</h1>
          <p>Além de apresentar seu trabalho, o site pode organizar conteúdo, responder dúvidas e criar caminhos para contato. A escolha dos recursos depende do projeto.</p>
        </div>
      </header>

      <section className={styles.resourcesSection} id="recursos" aria-labelledby="resources-title">
        <header className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>Por função</p><h2 id="resources-title">Recursos para cada tarefa.</h2></div>
          <p>Agendamento, blog e catálogo exigem escopo adicional. Os outros recursos são definidos conforme a estrutura do site.</p>
        </header>

        <div className={styles.capabilityGroups}>
          {groups.map((group) => {
            const groupFeatures = features.filter((feature) => feature.group === group.id);
            if (!groupFeatures.length) return null;
            return <section className={styles.capabilityGroup} key={group.id} aria-labelledby={`group-${group.id}`}>
              <h3 id={`group-${group.id}`}>{group.title}</h3>
              <p>{group.description}</p>
              <ul>{groupFeatures.map((feature) => <li key={feature.id}>
                <strong>{feature.title}</strong>
                {feature.status === "additional" ? <small>Escopo adicional</small> : null}
                <span>{feature.description}</span>
              </li>)}</ul>
            </section>;
          })}
        </div>
      </section>

      {whatsapp ? <section className={styles.demoSection} id="demonstracao" aria-labelledby="demo-title">
        <div className={styles.demoCopy}>
          <p className={styles.darkEyebrow}>Demonstração</p>
          <h2 id="demo-title">Do interesse à conversa.</h2>
          <p>Teste uma ação de contato com mensagem contextualizada. A demonstração funciona nesta página e não envia mensagens.</p>
        </div>
        <div className={styles.demoPreview}><ServiceFeaturePreview /></div>
      </section> : null}

      <CapabilityWorkbench />

      <ServicesNextStep
        eyebrow="Aplicação"
        title="Veja as decisões em um projeto."
        description="O portfólio mostra o site publicado e os estudos de interface, com contexto e estado de cada trabalho."
        href="/work"
        label="Ver trabalhos"
      />
    </main>
  );
}
