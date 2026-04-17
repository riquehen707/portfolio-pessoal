import Image from "next/image";

import type { ProjectDashboardSnapshot, ProjectExecutiveSummary } from "@/domain";

import styles from "./ProjectExecutiveSummarySheet.module.scss";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPercent(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusLabel(status: "real" | "estimated" | "projected") {
  if (status === "real") return "Real";
  if (status === "projected") return "Projetado";
  return "Estimado";
}

type Props = {
  summary: ProjectExecutiveSummary;
  snapshot: ProjectDashboardSnapshot;
  generatedAtLabel: string;
  authorHandle: string;
  siteLabel: string;
  siteUrl: string;
  qrCodeDataUrl: string;
};

export function ProjectExecutiveSummarySheet({
  summary,
  snapshot,
  generatedAtLabel,
  authorHandle,
  siteLabel,
  siteUrl,
  qrCodeDataUrl,
}: Props) {
  const followersTrace = snapshot.traces.find((item) => item.key === "followers");
  const reviewsTrace = snapshot.traces.find((item) => item.key === "google-reviews");

  const basicFacts = [
    {
      label: "Cidade",
      value: snapshot.cityLabel,
      meta: snapshot.cityProfile,
    },
    {
      label: "Segmento",
      value: snapshot.segmentName,
      meta: snapshot.benchmarkLabel,
    },
    {
      label: "Seguidores",
      value: followersTrace ? formatCompact(followersTrace.value) : "n/d",
      meta: followersTrace ? statusLabel(followersTrace.classification) : "Sem base",
    },
    {
      label: "Reviews Google",
      value: reviewsTrace ? formatCompact(reviewsTrace.value) : "n/d",
      meta: reviewsTrace ? statusLabel(reviewsTrace.classification) : "Sem base",
    },
    {
      label: "Mercado elegivel",
      value: formatCompact(snapshot.report.derivedMetrics.eligibleMarket),
      meta: "Derivado",
    },
    {
      label: "Receita realista / mes",
      value: formatCurrency(snapshot.report.scenarios.realistic.revenue),
      meta: "Projetado",
    },
  ];

  const scoreItems = [
    {
      label: "Presenca Local",
      value: `${summary.scorecard.localPresence}/10`,
    },
    {
      label: "Autoridade Social",
      value: `${summary.scorecard.socialAuthority}/10`,
    },
    {
      label: "Humanizacao da Marca",
      value: `${summary.scorecard.brandHumanization}/10`,
    },
    {
      label: "Estrategia de Conteudo",
      value: `${summary.scorecard.contentStrategy}/10`,
    },
    {
      label: "Identidade Visual",
      value: `${summary.scorecard.visualIdentity}/10`,
    },
    {
      label: "Potencial de Crescimento",
      value: summary.scorecard.growthPotential,
    },
  ];

  const reportFacts = [
    {
      label: "Gerado em",
      value: generatedAtLabel,
    },
    {
      label: "Precisao geral",
      value: formatPercent(snapshot.precision.overall),
    },
    {
      label: "Cobertura observada",
      value: formatPercent(snapshot.precision.coverage),
    },
    {
      label: "Receita atual estimada",
      value: formatCurrency(snapshot.quickMetrics.currentRevenueEstimate),
    },
    {
      label: "Clientes no cenario realista",
      value: String(snapshot.report.scenarios.realistic.customers),
    },
    {
      label: "Base de dados",
      value: `${snapshot.classificationCounts.real} reais / ${snapshot.classificationCounts.estimated} estimados / ${snapshot.classificationCounts.projected} projetados`,
    },
  ];

  return (
    <article className={styles.sheet}>
      <header className={styles.hero}>
        <div className={styles.kickerRow}>
          <span className={styles.kickerPrimary}>Resumo executivo</span>
          <span className={styles.kickerNeutral}>PDF comercial</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroMain}>
            <p className={styles.eyebrow}>Diagnostico para apresentacao</p>
            <h1 className={styles.title}>{summary.title}</h1>
            <p className={styles.clientName}>{snapshot.clientName}</p>
            <p className={styles.summary}>{summary.summary}</p>
          </div>

          <aside className={styles.signatureCard}>
            <p className={styles.signatureEyebrow}>Assinatura do diagnostico</p>
            <p className={styles.signatureText}>
              Esse diagnostico foi feito por <strong>{authorHandle}</strong>
            </p>
            <a className={styles.signatureLink} href={siteUrl} target="_blank" rel="noreferrer">
              Site: {siteLabel}
            </a>
          </aside>
        </div>
      </header>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.panelEyebrow}>Dados-base</p>
          <h2 className={styles.panelTitle}>Leitura rapida do caso</h2>
        </div>

        <div className={styles.basicGrid}>
          {basicFacts.map((item) => (
            <div key={item.label} className={styles.infoCard}>
              <p className={styles.cardLabel}>{item.label}</p>
              <p className={styles.cardValue}>{item.value}</p>
              <p className={styles.cardMeta}>{item.meta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.panelEyebrow}>Resumo de negocio</p>
          <h2 className={styles.panelTitle}>Leitura executiva</h2>
        </div>

        <div className={styles.summaryBlock}>
          <ul className={styles.list}>
            {summary.businessSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.panelEyebrow}>Score rapido</p>
          <h2 className={styles.panelTitle}>Pontos que sustentam a proposta</h2>
        </div>

        <div className={styles.scoreGrid}>
          {scoreItems.map((item) => (
            <div key={item.label} className={styles.scoreCard}>
              <p className={styles.cardLabel}>{item.label}</p>
              <p className={styles.scoreValue}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sectionStack}>
        {summary.sections.map((section) => (
          <section key={section.id} className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Ponto critico</span>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <p className={styles.sectionProblem}>{section.problem}</p>
            </div>

            <div className={styles.twoColumnGrid}>
              <div className={styles.subBlock}>
                <p className={styles.subBlockLabel}>Impacto</p>
                <ul className={styles.list}>
                  {section.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.subBlock}>
                <p className={styles.subBlockLabel}>Melhoria</p>
                <ul className={styles.list}>
                  {section.improvement.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.diagnosisBar}>
              <p className={styles.subBlockLabel}>Diagnostico</p>
              <p className={styles.diagnosisText}>{section.diagnosis}</p>
            </div>
          </section>
        ))}
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.panelEyebrow}>Fechamento</p>
          <h2 className={styles.panelTitle}>Sintese final</h2>
        </div>

        <div className={styles.summaryBlock}>
          <p className={styles.closingNote}>{summary.closingNote}</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <div className={styles.panelHeader}>
            <p className={styles.panelEyebrow}>Ficha tecnica</p>
            <h2 className={styles.panelTitle}>Dados usados neste PDF</h2>
          </div>

          <div className={styles.reportFactsGrid}>
            {reportFacts.map((item) => (
              <div key={item.label} className={styles.reportFact}>
                <p className={styles.cardLabel}>{item.label}</p>
                <p className={styles.reportFactValue}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.qrCard}>
          <div className={styles.qrText}>
            <p className={styles.qrEyebrow}>Acesso e contato</p>
            <p className={styles.qrLead}>
              Esse diagnostico foi feito por <strong>{authorHandle}</strong>
            </p>
            <a className={styles.signatureLink} href={siteUrl} target="_blank" rel="noreferrer">
              Site: {siteLabel}
            </a>
          </div>

          <Image
            className={styles.qrImage}
            src={qrCodeDataUrl}
            alt={`QR code para ${siteLabel}`}
            width={180}
            height={180}
            unoptimized
          />
        </aside>
      </footer>
    </article>
  );
}
