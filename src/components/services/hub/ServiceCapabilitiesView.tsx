"use client";

import Link from "next/link";
import { KeyboardEvent, useState } from "react";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import { CapabilityWorkbench } from "@/components/services/capabilities/CapabilityWorkbench";
import type { ServiceFeature, ServiceFeatureStatus } from "@/data/service-hub";
import { ServiceFeaturePreview } from "./ServiceFeaturePreview";
import styles from "./ServiceHubExperience.module.scss";

type Props = { features: ServiceFeature[] };

const statusLabels: Record<ServiceFeatureStatus, string> = { included: "Incluído", available: "Disponível", additional: "Projeto personalizado" };
const groupLabels = { contact: "Contato", presentation: "Apresentação", "local-business": "Negócio local", content: "Conteúdo" } as const;

function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number, select: (index: number) => void) {
  if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : (index + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) + count) % count;
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role='tab']")[next]?.focus();
  select(next);
}

export function ServiceCapabilitiesView({ features }: Props) {
  const primaryFeatures = features.filter((feature) => feature.previewKind);
  const secondaryFeatures = features.filter((feature) => !feature.previewKind);
  const [featureId, setFeatureId] = useState(primaryFeatures[0].id);
  const selectedFeature = primaryFeatures.find((feature) => feature.id === featureId) ?? primaryFeatures[0];

  return <main className={styles.capabilityPage}>
    <ServicesAreaNav active="capabilities" />
    <header className={styles.capabilityHero}>
      <p>Capacidades técnicas</p>
      <h1>Interfaces além da página estática.</h1>
      <div><p>Recursos, módulos e fluxos construídos como partes leves de um produto digital. As demonstrações funcionam localmente e não enviam dados.</p><nav aria-label="Nesta página"><a href="#recursos">Recursos</a><a href="#modulos">Módulos</a><a href="#wireframes">Wireframes</a></nav></div>
    </header>

    <section className={styles.featuresSection} id="recursos" aria-labelledby="features-title">
      <div className={styles.featureHeading}>
        <div className={styles.sectionIntro}><p className={styles.kicker}>Recursos interativos</p><h2 id="features-title">Teste uma parte da interface.</h2></div>
        <p>Cada estado é independente. Nenhuma mensagem, reserva ou informação é enviada.</p>
      </div>
      <div className={styles.featureExplorer}>
        <div className={styles.featureTabs} role="tablist" aria-label="Demonstrações de recursos" aria-orientation="vertical">
          {primaryFeatures.map((feature, index) => <button id={`feature-tab-${feature.id}`} role="tab" aria-selected={selectedFeature.id === feature.id} aria-controls="feature-preview" tabIndex={selectedFeature.id === feature.id ? 0 : -1} type="button" onClick={() => setFeatureId(feature.id)} onKeyDown={(event) => moveTab(event, index, primaryFeatures.length, (next) => setFeatureId(primaryFeatures[next].id))} key={feature.id}><span>{String(index + 1).padStart(2, "0")}</span>{feature.title}</button>)}
        </div>
        <div className={styles.featurePanel} id="feature-preview" role="tabpanel" aria-labelledby={`feature-tab-${selectedFeature.id}`}>
          <div className={styles.featureMeta}>
            <span className={styles.status} data-status={selectedFeature.status}>{statusLabels[selectedFeature.status]}</span>
            <h3>{selectedFeature.title}</h3><p>{selectedFeature.description}</p><small><strong>Bom para:</strong> {selectedFeature.useCase}</small>
          </div>
          <div className={styles.livePreview} data-preview={selectedFeature.previewKind}><ServiceFeaturePreview kind={selectedFeature.previewKind!} key={selectedFeature.id} /></div>
        </div>
      </div>
      <div className={styles.secondaryFeatures}><p>Outros recursos</p><div>{secondaryFeatures.map((feature) => <details key={feature.id}><summary><em>{groupLabels[feature.group]}</em><span>{feature.title}</span><small>{statusLabels[feature.status]}</small><b aria-hidden="true">+</b></summary><p>{feature.description}</p></details>)}</div></div>
    </section>

    <CapabilityWorkbench />

    <footer className={styles.capabilityNext}><div><p>Quer explorar direções visuais?</p><h2>Veja como seu site pode ficar.</h2></div><Link href="/servicos#inspiracoes">Ver inspirações <span aria-hidden="true">→</span></Link><Link href="/servicos">Voltar para a oferta</Link></footer>
  </main>;
}
