"use client";

import {
  type ChangeEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import styles from "./GrowthSimulator.module.scss";

type SegmentProfile = {
  id: string;
  label: string;
  note: string;
  saturationNote: string;
  defaults: {
    price: number;
    cost: number;
    sales: number;
    fixed: number;
  };
  baseCAC: number;
  saturationPoint: number;
  marketingRate: number;
  marketingFloor: number;
  opsIntensity: number;
  recurrenceWeight: number;
  costOpsWeight: number;
};

type ScaleProfile = {
  id: string;
  label: string;
  note: string;
  opsMultiplier: number;
  marketingMultiplier: number;
  baseOps: number;
};

type MarketingEstimate = {
  viable: boolean;
  targetNetLift: number;
  achievedNetLift: number;
  newClients: number;
  baseCAC: number;
  adjustedCAC: number;
  efficiencyLossPct: number;
  mediaSpend: number;
  managementCost: number;
  totalInvestment: number;
  grossRevenue: number;
  contributionGenerated: number;
  grossReturnPerReal: number;
  contributionReturnPerReal: number;
  netReturnPerReal: number;
  saturationPoint: number;
  managementRate: number;
};

type GrowthSimulatorProps = {
  servicesHref: string;
  contactHref: string;
};

type MarketingEstimateInput = {
  targetNetLift: number;
  contributionPerClient: number;
  effectivePrice: number;
  segment: SegmentProfile;
  currentSales: number;
  scale: ScaleProfile;
};

type TermHintProps = {
  label: string;
  description: string;
  href: string;
};

type StepId = "start" | "base" | "adjustments" | "marketing" | "final";
type ScenarioId = "conservative" | "realistic" | "aggressive" | "custom";

type ScenarioPreset = {
  id: Exclude<ScenarioId, "custom">;
  label: string;
  salesLift: number;
  priceLift: number;
  costDrop: number;
  recurrenceLift: number;
};

const glossaryLinks = {
  marketing: "/blog/termos-de-marketing",
  publicidade: "/blog/termos-de-publicidade",
} as const;

const stageItems: Array<{ id: StepId; label: string }> = [
  { id: "start", label: "Inicio" },
  { id: "base", label: "Base" },
  { id: "adjustments", label: "Ajustes" },
  { id: "marketing", label: "Marketing" },
  { id: "final", label: "Leitura" },
];

const scenarioPresets: ScenarioPreset[] = [
  {
    id: "conservative",
    label: "Conservador",
    salesLift: 6,
    priceLift: 3,
    costDrop: 2,
    recurrenceLift: 4,
  },
  {
    id: "realistic",
    label: "Realista",
    salesLift: 12,
    priceLift: 6,
    costDrop: 5,
    recurrenceLift: 8,
  },
  {
    id: "aggressive",
    label: "Agressivo",
    salesLift: 20,
    priceLift: 10,
    costDrop: 8,
    recurrenceLift: 14,
  },
];

const segmentProfiles: SegmentProfile[] = [
  {
    id: "psicologas",
    label: "Psicologas e terapeutas",
    note: "Operacao com ticket medio menor, decisao mais sensivel a confianca e recorrencia.",
    saturationNote: "A saturacao costuma aparecer quando a agenda local exige volume constante de leads qualificados.",
    defaults: { price: 180, cost: 40, sales: 42, fixed: 3600 },
    baseCAC: 58,
    saturationPoint: 10,
    marketingRate: 0.18,
    marketingFloor: 420,
    opsIntensity: 0.95,
    recurrenceWeight: 0.85,
    costOpsWeight: 1.15,
  },
  {
    id: "advogados",
    label: "Advogados e consultoria juridica",
    note: "Ticket maior, ciclo comercial mais lento e dependencia maior de autoridade.",
    saturationNote: "Subir verba cedo costuma encarecer o CAC porque a demanda local e mais estreita.",
    defaults: { price: 420, cost: 92, sales: 18, fixed: 7200 },
    baseCAC: 148,
    saturationPoint: 6,
    marketingRate: 0.22,
    marketingFloor: 900,
    opsIntensity: 1.08,
    recurrenceWeight: 0.48,
    costOpsWeight: 1.18,
  },
  {
    id: "corretores",
    label: "Corretores de imoveis",
    note: "Poucos fechamentos, ticket alto e grande pressao de acompanhamento comercial.",
    saturationNote: "Passar do ponto de saturacao costuma elevar o CAC rapidamente por competicao local.",
    defaults: { price: 1800, cost: 420, sales: 4, fixed: 9000 },
    baseCAC: 680,
    saturationPoint: 3,
    marketingRate: 0.2,
    marketingFloor: 1200,
    opsIntensity: 1.24,
    recurrenceWeight: 0.3,
    costOpsWeight: 1.24,
  },
  {
    id: "clinicas",
    label: "Clinicas de saude e odontologia",
    note: "Agenda intensa, mais pontos de contato e operacao interna pesada para sustentar ganho.",
    saturationNote: "O limite aparece quando o time interno nao acompanha atendimento, retorno e remarcacao.",
    defaults: { price: 260, cost: 95, sales: 70, fixed: 14500 },
    baseCAC: 96,
    saturationPoint: 16,
    marketingRate: 0.19,
    marketingFloor: 1200,
    opsIntensity: 1.25,
    recurrenceWeight: 0.74,
    costOpsWeight: 1.32,
  },
  {
    id: "estetica",
    label: "Salao, beleza e estetica",
    note: "Ticket menor, retorno mais rapido e mais espaco para recorrencia bem organizada.",
    saturationNote: "A perda de eficiencia aparece quando a verba sobe mais rapido do que a recompra.",
    defaults: { price: 160, cost: 55, sales: 110, fixed: 8600 },
    baseCAC: 48,
    saturationPoint: 24,
    marketingRate: 0.18,
    marketingFloor: 820,
    opsIntensity: 1.02,
    recurrenceWeight: 0.92,
    costOpsWeight: 1.08,
  },
  {
    id: "loja-local",
    label: "Loja local e varejo de bairro",
    note: "Volume maior, margem apertada e necessidade forte de fluxo local.",
    saturationNote: "Depois do ponto de saturacao, mais verba tende a comprar cliques piores e visitas menos prontas.",
    defaults: { price: 220, cost: 118, sales: 95, fixed: 12000 },
    baseCAC: 62,
    saturationPoint: 28,
    marketingRate: 0.16,
    marketingFloor: 1200,
    opsIntensity: 1.05,
    recurrenceWeight: 0.58,
    costOpsWeight: 1.05,
  },
  {
    id: "ecommerce",
    label: "E-commerce com envios",
    note: "Escala mais facil, mas com CAC, frete e operacao comendo margem rapidamente.",
    saturationNote: "Escalar midia sem melhorar ticket, recompra e operacao derruba o retorno mais cedo.",
    defaults: { price: 290, cost: 165, sales: 130, fixed: 18000 },
    baseCAC: 74,
    saturationPoint: 36,
    marketingRate: 0.15,
    marketingFloor: 1500,
    opsIntensity: 1.1,
    recurrenceWeight: 0.55,
    costOpsWeight: 1.08,
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatNumber = (value: number, maximumFractionDigits = 1) =>
  new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);

const formatSignedCurrency = (value: number) =>
  `${value >= 0 ? "+" : "-"}${formatCurrency(Math.abs(value))}`;

const formatPercent = (value: number) =>
  `${value >= 0 ? "+" : ""}${formatNumber(value, 0)}%`;

function TermHint({ label, description, href }: TermHintProps) {
  const tooltipId = useId();

  return (
    <span className={styles.labelWithHint}>
      <span>{label}</span>
      <span className={styles.hintWrap}>
        <button
          aria-describedby={tooltipId}
          aria-label={`Explicar ${label}`}
          className={styles.hintButton}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          type="button"
        >
          ?
        </button>
        <span className={styles.hintTooltip} id={tooltipId} role="tooltip">
          <span>{description}</span>
          <a className={styles.hintLink} href={href}>
            Saiba mais
          </a>
        </span>
      </span>
    </span>
  );
}

function getBusinessScale(monthlyRevenue: number): ScaleProfile {
  if (monthlyRevenue < 12000) {
    return {
      id: "micro",
      label: "Micro operacao",
      note: "Mudancas ainda sao leves, mas dependem muito do dono e do tempo de execucao.",
      opsMultiplier: 0.82,
      marketingMultiplier: 0.92,
      baseOps: 240,
    };
  }

  if (monthlyRevenue < 40000) {
    return {
      id: "small",
      label: "Operacao pequena",
      note: "Ja existe algum processo, mas a implantacao ainda cabe sem uma equipe muito grande.",
      opsMultiplier: 1,
      marketingMultiplier: 1,
      baseOps: 480,
    };
  }

  if (monthlyRevenue < 100000) {
    return {
      id: "medium",
      label: "Operacao em consolidacao",
      note: "Qualquer ajuste comeca a exigir mais gestao, treinamento e acompanhamento.",
      opsMultiplier: 1.24,
      marketingMultiplier: 1.12,
      baseOps: 920,
    };
  }

  return {
    id: "structured",
    label: "Operacao estruturada",
    note: "A mudanca depende de alinhamento de time, controle e mais camada de gerencia.",
    opsMultiplier: 1.52,
    marketingMultiplier: 1.24,
    baseOps: 1650,
  };
}

function getAdjustedCAC(requestedClients: number, segment: SegmentProfile) {
  if (requestedClients <= segment.saturationPoint) {
    return {
      adjustedCAC: segment.baseCAC,
      efficiencyLossPct: 0,
    };
  }

  const overflowRatio =
    (requestedClients - segment.saturationPoint) / Math.max(segment.saturationPoint, 1);
  const multiplier = 1 + overflowRatio * 0.48 + overflowRatio * overflowRatio * 0.32;

  return {
    adjustedCAC: segment.baseCAC * multiplier,
    efficiencyLossPct: (multiplier - 1) * 100,
  };
}

function estimateMarketing({
  targetNetLift,
  contributionPerClient,
  effectivePrice,
  segment,
  currentSales,
  scale,
}: MarketingEstimateInput): MarketingEstimate {
  if (targetNetLift <= 0 || contributionPerClient <= 0 || effectivePrice <= 0) {
    return {
      viable: true,
      targetNetLift: Math.max(targetNetLift, 0),
      achievedNetLift: 0,
      newClients: 0,
      baseCAC: segment.baseCAC,
      adjustedCAC: segment.baseCAC,
      efficiencyLossPct: 0,
      mediaSpend: 0,
      managementCost: 0,
      totalInvestment: 0,
      grossRevenue: 0,
      contributionGenerated: 0,
      grossReturnPerReal: 0,
      contributionReturnPerReal: 0,
      netReturnPerReal: 0,
      saturationPoint: segment.saturationPoint,
      managementRate: segment.marketingRate,
    };
  }

  const upperBound = Math.max(
    40,
    Math.ceil(currentSales * 4),
    Math.ceil(segment.saturationPoint * 9),
  );

  let chosen: MarketingEstimate | null = null;
  let best: MarketingEstimate | null = null;

  for (let clients = 0.5; clients <= upperBound; clients += 0.5) {
    const { adjustedCAC, efficiencyLossPct } = getAdjustedCAC(clients, segment);
    const managementRate =
      segment.marketingRate * scale.marketingMultiplier +
      Math.min(0.12, (efficiencyLossPct / 100) * 0.12);
    const mediaSpend = clients * adjustedCAC;
    const managementCost = Math.max(
      segment.marketingFloor * scale.marketingMultiplier,
      mediaSpend * managementRate,
    );
    const totalInvestment = mediaSpend + managementCost;
    const grossRevenue = clients * effectivePrice;
    const contributionGenerated = clients * contributionPerClient;
    const achievedNetLift = contributionGenerated - totalInvestment;
    const grossReturnPerReal = totalInvestment > 0 ? grossRevenue / totalInvestment : 0;
    const contributionReturnPerReal =
      totalInvestment > 0 ? contributionGenerated / totalInvestment : 0;
    const netReturnPerReal = totalInvestment > 0 ? achievedNetLift / totalInvestment : 0;

    const snapshot: MarketingEstimate = {
      viable: achievedNetLift >= targetNetLift,
      targetNetLift,
      achievedNetLift,
      newClients: clients,
      baseCAC: segment.baseCAC,
      adjustedCAC,
      efficiencyLossPct,
      mediaSpend,
      managementCost,
      totalInvestment,
      grossRevenue,
      contributionGenerated,
      grossReturnPerReal,
      contributionReturnPerReal,
      netReturnPerReal,
      saturationPoint: segment.saturationPoint,
      managementRate,
    };

    if (!best || snapshot.achievedNetLift > best.achievedNetLift) {
      best = snapshot;
    }

    if (snapshot.viable) {
      chosen = snapshot;
      break;
    }
  }

  return chosen ?? (best as MarketingEstimate);
}

function renderMetricRow(label: string, value: string, muted?: string) {
  return (
    <div className={styles.metricRow} key={label}>
      <div className={styles.metricRowCopy}>
        <span className={styles.metricRowLabel}>{label}</span>
        {muted ? <span className={styles.metricRowMuted}>{muted}</span> : null}
      </div>
      <span className={styles.metricRowValue}>{value}</span>
    </div>
  );
}

export function GrowthSimulator({ servicesHref, contactHref }: GrowthSimulatorProps) {
  const [segmentId, setSegmentId] = useState(segmentProfiles[0].id);
  const [currentPrice, setCurrentPrice] = useState(segmentProfiles[0].defaults.price);
  const [currentCost, setCurrentCost] = useState(segmentProfiles[0].defaults.cost);
  const [currentSales, setCurrentSales] = useState(segmentProfiles[0].defaults.sales);
  const [currentFixed, setCurrentFixed] = useState(segmentProfiles[0].defaults.fixed);
  const [salesLift, setSalesLift] = useState(12);
  const [priceLift, setPriceLift] = useState(6);
  const [costDrop, setCostDrop] = useState(5);
  const [recurrenceLift, setRecurrenceLift] = useState(8);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>("realistic");
  const [manualOpen, setManualOpen] = useState(false);
  const [technicalMode, setTechnicalMode] = useState(false);
  const [activeStep, setActiveStep] = useState<StepId>("start");

  const startRef = useRef<HTMLElement | null>(null);
  const baseRef = useRef<HTMLElement | null>(null);
  const adjustmentsRef = useRef<HTMLElement | null>(null);
  const marketingRef = useRef<HTMLElement | null>(null);
  const finalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const refs = [startRef, baseRef, adjustmentsRef, marketingRef, finalRef];
    const observer = new IntersectionObserver(
      (entries) => {
        let nextStep: StepId | null = null;
        let nextRatio = 0;

        entries.forEach((entry) => {
          const stepId = entry.target.getAttribute("data-step-id") as StepId | null;
          if (!stepId || !entry.isIntersecting) {
            return;
          }

          if (entry.intersectionRatio >= nextRatio) {
            nextStep = stepId;
            nextRatio = entry.intersectionRatio;
          }
        });

        if (nextStep) {
          setActiveStep(nextStep);
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const sectionRefs = {
    start: startRef,
    base: baseRef,
    adjustments: adjustmentsRef,
    marketing: marketingRef,
    final: finalRef,
  };

  const segment =
    segmentProfiles.find((item) => item.id === segmentId) ?? segmentProfiles[0];

  const currentRevenue = currentPrice * currentSales;
  const currentContribution = Math.max(currentPrice - currentCost, 0);
  const currentNet = currentContribution * currentSales - currentFixed;
  const currentMargin = currentRevenue > 0 ? (currentNet / currentRevenue) * 100 : 0;
  const scale = getBusinessScale(currentRevenue);

  const salesFromProcess = currentSales * (salesLift / 100);
  const salesFromRecurrence =
    currentSales * (recurrenceLift / 100) * segment.recurrenceWeight;
  const projectedSales = currentSales + salesFromProcess + salesFromRecurrence;
  const projectedPrice = currentPrice * (1 + priceLift / 100);
  const projectedCost = currentCost * (1 - costDrop / 100);
  const projectedContribution = Math.max(projectedPrice - projectedCost, 0);
  const projectedRevenue = projectedPrice * projectedSales;
  const projectedNetBeforeOps = projectedContribution * projectedSales - currentFixed;

  const implementationBase = scale.baseOps + currentFixed * 0.04 * scale.opsMultiplier;
  const salesOpsCost =
    currentRevenue * (salesLift / 100) * 0.12 * scale.opsMultiplier * segment.opsIntensity;
  const priceOpsCost =
    currentRevenue * (priceLift / 100) * 0.08 * scale.opsMultiplier;
  const costOpsCost =
    currentRevenue *
    (costDrop / 100) *
    0.18 *
    scale.opsMultiplier *
    segment.costOpsWeight;
  const recurrenceOpsCost =
    currentRevenue *
    (recurrenceLift / 100) *
    0.14 *
    scale.opsMultiplier *
    segment.recurrenceWeight;
  const adjustmentOpsCost =
    implementationBase +
    salesOpsCost +
    priceOpsCost +
    costOpsCost +
    recurrenceOpsCost;
  const projectedNetAfterOps = projectedNetBeforeOps - adjustmentOpsCost;
  const internalNetLift = projectedNetAfterOps - currentNet;

  const marketingEstimate = estimateMarketing({
    targetNetLift: Math.max(internalNetLift, 0),
    contributionPerClient: projectedContribution,
    effectivePrice: projectedPrice,
    segment,
    currentSales,
    scale,
  });

  const summaryLine = [
    `Faturamento atual: ${formatCurrency(currentRevenue)}`,
    `Margem por venda: ${formatCurrency(currentContribution)}`,
    `Caixa estimado: ${formatCurrency(currentNet)}`,
    `Porte: ${scale.label.toLowerCase()}`,
  ];

  const revenueDifference = projectedRevenue - currentRevenue;
  const investmentShare =
    marketingEstimate.totalInvestment > 0
      ? (marketingEstimate.mediaSpend / marketingEstimate.totalInvestment) * 100
      : 0;

  let readingTitle = "Conta viavel.";
  let readingText = "A operacao sustenta a meta com investimento proporcional.";

  if (projectedContribution <= 0) {
    readingTitle = "Margem insuficiente.";
    readingText = "Revise preco ou custo antes de aumentar a verba.";
  } else if (marketingEstimate.adjustedCAC >= projectedContribution) {
    readingTitle = "Cenario apertado.";
    readingText = "O CAC estimado consome margem rapido.";
  } else if (!marketingEstimate.viable) {
    readingTitle = "Meta exigente.";
    readingText = "Revise ticket, margem e volume antes de subir a verba.";
  } else if (marketingEstimate.totalInvestment > Math.max(projectedNetAfterOps, currentNet, 0)) {
    readingTitle = "Investimento alto para a base atual.";
    readingText = "A conta fecha, mas o caixa pode travar a execucao.";
  } else if (marketingEstimate.newClients > currentSales * 1.4) {
    readingTitle = "Volume acima da base atual.";
    readingText = "A conta parece viavel se a operacao sustentar o novo ritmo.";
  }

  const statusChips = Array.from(
    new Set(
      [
        readingTitle.replace(".", ""),
        marketingEstimate.adjustedCAC >= projectedContribution ? "CAC alto" : null,
        marketingEstimate.totalInvestment > Math.max(currentNet, 0) ? "Investimento acima do caixa" : null,
        marketingEstimate.newClients > currentSales * 1.4 ? "Volume acima da base atual" : null,
      ].filter(Boolean) as string[],
    ),
  );

  const alerts = [
    marketingEstimate.adjustedCAC >= projectedContribution
      ? "CAC acima da margem por venda."
      : null,
    marketingEstimate.newClients > currentSales * 1.6
      ? "Meta de clientes muito acima da base atual."
      : null,
    marketingEstimate.totalInvestment > Math.max(currentNet, 0)
      ? "Investimento maior que o caixa estimado."
      : null,
    projectedContribution <= 0 ? "Margem insuficiente para sustentar esse cenario." : null,
  ].filter(Boolean) as string[];

  const contactIsExternal = contactHref.startsWith("http");

  const handleSegmentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSegment =
      segmentProfiles.find((item) => item.id === event.target.value) ?? segmentProfiles[0];

    setSegmentId(nextSegment.id);
    setCurrentPrice(nextSegment.defaults.price);
    setCurrentCost(nextSegment.defaults.cost);
    setCurrentSales(nextSegment.defaults.sales);
    setCurrentFixed(nextSegment.defaults.fixed);
  };

  const handleCurrencyChange =
    (setter: (value: number) => void) => (event: ChangeEvent<HTMLInputElement>) => {
      const parsed = Number(event.target.value.replace(",", "."));
      setter(Number.isFinite(parsed) ? Math.max(parsed, 0) : 0);
    };

  const handleRangeChange =
    (setter: (value: number) => void) => (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedScenario("custom");
      setter(Number(event.target.value));
    };

  const handleScenarioSelect = (preset: ScenarioPreset) => {
    setSelectedScenario(preset.id);
    setSalesLift(preset.salesLift);
    setPriceLift(preset.priceLift);
    setCostDrop(preset.costDrop);
    setRecurrenceLift(preset.recurrenceLift);
  };

  const scrollToStep = (stepId: StepId) => {
    sectionRefs[stepId].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <nav aria-label="Etapas da simulacao" className={styles.stageNav}>
          {stageItems.map((item) => (
            <button
              aria-current={activeStep === item.id ? "step" : undefined}
              className={activeStep === item.id ? styles.stageLinkActive : styles.stageLink}
              key={item.id}
              onClick={() => scrollToStep(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.topBarMeta}>
          <button
            aria-pressed={technicalMode}
            className={styles.technicalToggle}
            onClick={() => setTechnicalMode((current) => !current)}
            type="button"
          >
            {technicalMode ? "Ocultar detalhes" : "Ver detalhes"}
          </button>

          <div className={styles.desktopSummary}>
            <span>Base: {formatCurrency(currentRevenue)}</span>
            <span>Meta: {formatNumber(marketingEstimate.newClients)} clientes</span>
            <span>Investimento: {formatCurrency(marketingEstimate.totalInvestment)}</span>
          </div>
        </div>
      </div>

      <div className={styles.sections}>
        <section
          className={`${styles.stage} ${styles.startStage}`}
          data-step-id="start"
          ref={sectionRefs.start}
        >
          <div className={styles.stageInner}>
            <div className={styles.stageIntro}>
              <span className={styles.kicker}>Inicio</span>
              <h1 className={styles.displayTitle}>Simulacao de crescimento</h1>
              <p className={styles.displayLead}>
                Base atual, ajustes internos e meta de marketing.
              </p>
            </div>

            <button
              className={styles.primaryAction}
              onClick={() => scrollToStep("base")}
              type="button"
            >
              Comecar
            </button>
          </div>
        </section>

        <section className={styles.stage} data-step-id="base" ref={sectionRefs.base}>
          <div className={styles.stageInner}>
            <header className={styles.stageHeader}>
              <span className={styles.kicker}>Base atual</span>
              <h2 className={styles.stageTitle}>Onde o negocio esta?</h2>
            </header>

            <div className={styles.fieldGrid}>
              <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="simulation-segment">
                <span className={styles.fieldLabel}>Categoria</span>
                <select
                  className={styles.select}
                  id="simulation-segment"
                  onChange={handleSegmentChange}
                  value={segmentId}
                >
                  {segmentProfiles.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <span className={styles.helperText}>{segment.note}</span>
              </label>

              <label className={styles.field} htmlFor="simulation-price">
                <span className={styles.fieldLabel}>
                  <TermHint
                    label="Preco medio por venda"
                    description="E o valor medio que entra a cada venda feita pelo negocio."
                    href={`${glossaryLinks.marketing}#ticket-medio`}
                  />
                </span>
                <input
                  className={styles.input}
                  id="simulation-price"
                  inputMode="decimal"
                  min="0"
                  onChange={handleCurrencyChange(setCurrentPrice)}
                  step="10"
                  type="number"
                  value={currentPrice}
                />
              </label>

              <label className={styles.field} htmlFor="simulation-cost">
                <span className={styles.fieldLabel}>Custo direto por venda</span>
                <input
                  className={styles.input}
                  id="simulation-cost"
                  inputMode="decimal"
                  min="0"
                  onChange={handleCurrencyChange(setCurrentCost)}
                  step="10"
                  type="number"
                  value={currentCost}
                />
              </label>

              <label className={styles.field} htmlFor="simulation-sales">
                <span className={styles.fieldLabel}>Vendas por mes</span>
                <input
                  className={styles.input}
                  id="simulation-sales"
                  inputMode="decimal"
                  min="0"
                  onChange={handleCurrencyChange(setCurrentSales)}
                  step="1"
                  type="number"
                  value={currentSales}
                />
              </label>

              <label className={styles.field} htmlFor="simulation-fixed">
                <span className={styles.fieldLabel}>Custos fixos mensais</span>
                <input
                  className={styles.input}
                  id="simulation-fixed"
                  inputMode="decimal"
                  min="0"
                  onChange={handleCurrencyChange(setCurrentFixed)}
                  step="100"
                  type="number"
                  value={currentFixed}
                />
              </label>
            </div>

            <p className={styles.summaryLine}>{summaryLine.join(" | ")}</p>

            {technicalMode ? (
              <div className={styles.detailsBlock}>
                <div className={styles.detailsHeader}>
                  <span>Detalhes tecnicos</span>
                </div>
                <div className={styles.metricList}>
                  {renderMetricRow("Margem atual", formatPercent(currentMargin), "sobre o faturamento")}
                  {renderMetricRow("Escala lida", scale.label, scale.note)}
                  {renderMetricRow("Segmento", segment.label, segment.saturationNote)}
                </div>
              </div>
            ) : null}

            <div className={styles.stageFooter}>
              <button
                className={styles.primaryAction}
                onClick={() => scrollToStep("adjustments")}
                type="button"
              >
                Continuar
              </button>
            </div>
          </div>
        </section>

        <section className={styles.stage} data-step-id="adjustments" ref={sectionRefs.adjustments}>
          <div className={styles.stageInner}>
            <header className={styles.stageHeader}>
              <span className={styles.kicker}>Ajustes</span>
              <h2 className={styles.stageTitle}>O que melhora antes da verba?</h2>
            </header>

            <div className={styles.scenarioList}>
              {scenarioPresets.map((preset) => (
                <button
                  aria-pressed={selectedScenario === preset.id}
                  className={
                    selectedScenario === preset.id ? styles.scenarioButtonActive : styles.scenarioButton
                  }
                  key={preset.id}
                  onClick={() => handleScenarioSelect(preset)}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className={styles.primaryMetricCard}>
              <span className={styles.primaryMetricLabel}>Ganho liquido</span>
              <strong className={styles.primaryMetricValue}>
                {formatCurrency(projectedNetAfterOps)}
              </strong>
              <span className={styles.primaryMetricHint}>
                Depois do custo de implantacao.
              </span>
            </div>

            <div className={styles.compareGrid}>
              <div className={styles.compareItem}>
                <span className={styles.compareLabel}>Atual</span>
                <strong className={styles.compareValue}>{formatCurrency(currentRevenue)}</strong>
              </div>
              <div className={styles.compareItem}>
                <span className={styles.compareLabel}>Projetado</span>
                <strong className={styles.compareValue}>{formatCurrency(projectedRevenue)}</strong>
              </div>
              <div className={styles.compareItem}>
                <span className={styles.compareLabel}>Diferenca</span>
                <strong className={styles.compareValue}>{formatSignedCurrency(revenueDifference)}</strong>
              </div>
            </div>

            <div className={styles.metricList}>
              {renderMetricRow("Faturamento projetado", formatCurrency(projectedRevenue))}
              {renderMetricRow("Caixa antes da implantacao", formatCurrency(projectedNetBeforeOps))}
              {renderMetricRow(
                "Custo de implantacao",
                formatCurrency(adjustmentOpsCost),
                "interno e operacional",
              )}
              {renderMetricRow(
                "Ganho liquido",
                formatCurrency(internalNetLift),
                "diferenca sobre hoje",
              )}
            </div>

            <div className={styles.secondaryActions}>
              <button
                aria-expanded={manualOpen}
                className={styles.secondaryAction}
                onClick={() => setManualOpen((current) => !current)}
                type="button"
              >
                {manualOpen ? "Ocultar edicao" : "Editar manualmente"}
              </button>
            </div>

            {manualOpen ? (
              <div className={styles.manualPanel}>
                <label className={styles.sliderField} htmlFor="sales-lift">
                  <div className={styles.sliderHeader}>
                    <span className={styles.fieldLabel}>+ vendas</span>
                    <span className={styles.sliderValue}>{formatPercent(salesLift)}</span>
                  </div>
                  <input
                    className={styles.range}
                    id="sales-lift"
                    max="35"
                    min="0"
                    onChange={handleRangeChange(setSalesLift)}
                    step="1"
                    type="range"
                    value={salesLift}
                  />
                </label>

                <label className={styles.sliderField} htmlFor="price-lift">
                  <div className={styles.sliderHeader}>
                    <span className={styles.fieldLabel}>+ preco</span>
                    <span className={styles.sliderValue}>{formatPercent(priceLift)}</span>
                  </div>
                  <input
                    className={styles.range}
                    id="price-lift"
                    max="25"
                    min="0"
                    onChange={handleRangeChange(setPriceLift)}
                    step="1"
                    type="range"
                    value={priceLift}
                  />
                </label>

                <label className={styles.sliderField} htmlFor="cost-drop">
                  <div className={styles.sliderHeader}>
                    <span className={styles.fieldLabel}>- custo</span>
                    <span className={styles.sliderValue}>{formatPercent(-costDrop)}</span>
                  </div>
                  <input
                    className={styles.range}
                    id="cost-drop"
                    max="18"
                    min="0"
                    onChange={handleRangeChange(setCostDrop)}
                    step="1"
                    type="range"
                    value={costDrop}
                  />
                </label>

                <label className={styles.sliderField} htmlFor="recurrence-lift">
                  <div className={styles.sliderHeader}>
                    <span className={styles.fieldLabel}>
                      <TermHint
                        label="+ recorrencia"
                        description="Mostra o efeito de fazer o mesmo cliente voltar mais vezes ou comprar de novo."
                        href={`${glossaryLinks.marketing}#recorrencia`}
                      />
                    </span>
                    <span className={styles.sliderValue}>{formatPercent(recurrenceLift)}</span>
                  </div>
                  <input
                    className={styles.range}
                    id="recurrence-lift"
                    max="25"
                    min="0"
                    onChange={handleRangeChange(setRecurrenceLift)}
                    step="1"
                    type="range"
                    value={recurrenceLift}
                  />
                </label>
              </div>
            ) : null}

            {technicalMode ? (
              <div className={styles.detailsBlock}>
                <div className={styles.detailsHeader}>
                  <span>Detalhes tecnicos</span>
                </div>
                <div className={styles.metricList}>
                  {renderMetricRow("Base de implantacao", formatCurrency(implementationBase))}
                  {renderMetricRow("Ajuste comercial", formatCurrency(salesOpsCost))}
                  {renderMetricRow("Reposicionamento de preco", formatCurrency(priceOpsCost))}
                  {renderMetricRow("Reducao de custo", formatCurrency(costOpsCost))}
                  {renderMetricRow("Recorrencia e CRM", formatCurrency(recurrenceOpsCost))}
                </div>
              </div>
            ) : null}

            <div className={styles.stageFooter}>
              <button
                className={styles.primaryAction}
                onClick={() => scrollToStep("marketing")}
                type="button"
              >
                Aplicar cenario
              </button>
            </div>
          </div>
        </section>

        <section className={styles.stage} data-step-id="marketing" ref={sectionRefs.marketing}>
          <div className={styles.stageInner}>
            <header className={styles.stageHeader}>
              <span className={styles.kicker}>Marketing</span>
              <h2 className={styles.stageTitle}>Quanto precisa retornar?</h2>
            </header>

            <div className={styles.primaryMetricCard}>
              <span className={styles.primaryMetricLabel}>
                <TermHint
                  label="Investimento total estimado"
                  description="Soma da verba de anuncios com o custo de operacao do marketing para buscar essa meta."
                  href={`${glossaryLinks.publicidade}#roas`}
                />
              </span>
              <strong className={styles.primaryMetricValue}>
                {formatCurrency(marketingEstimate.totalInvestment)}
              </strong>
              <span className={styles.primaryMetricHint}>
                {formatCurrency(marketingEstimate.mediaSpend)} midia |{" "}
                {formatCurrency(marketingEstimate.managementCost)} gestao
              </span>
            </div>

            <div className={styles.segmentBar} aria-hidden="true">
              <span
                className={styles.segmentBarMedia}
                style={{ width: `${Math.max(investmentShare, 0)}%` }}
              />
              <span
                className={styles.segmentBarManagement}
                style={{ width: `${Math.max(100 - investmentShare, 0)}%` }}
              />
            </div>

            <div className={styles.metricList}>
              {renderMetricRow("Novos clientes necessarios", formatNumber(marketingEstimate.newClients))}
              {renderMetricRow(
                "CAC ajustado",
                formatCurrency(marketingEstimate.adjustedCAC),
                marketingEstimate.efficiencyLossPct > 0
                  ? `perda de eficiencia ${formatPercent(marketingEstimate.efficiencyLossPct)}`
                  : "sem perda relevante",
              )}
              {renderMetricRow("Midia estimada", formatCurrency(marketingEstimate.mediaSpend))}
              {renderMetricRow("Gestao e operacao", formatCurrency(marketingEstimate.managementCost))}
              {renderMetricRow(
                "Taxa operacional",
                `${formatNumber(marketingEstimate.managementRate * 100, 0)}%`,
              )}
            </div>

            {technicalMode ? (
              <div className={styles.detailsBlock}>
                <div className={styles.detailsHeader}>
                  <span>Detalhes tecnicos</span>
                </div>
                <div className={styles.metricList}>
                  {renderMetricRow("Meta liquida", formatCurrency(marketingEstimate.targetNetLift))}
                  {renderMetricRow("Ticket usado na conta", formatCurrency(projectedPrice))}
                  {renderMetricRow("CAC base do segmento", formatCurrency(marketingEstimate.baseCAC))}
                  {renderMetricRow(
                    "Ponto de saturacao",
                    `${formatNumber(marketingEstimate.saturationPoint, 0)} clientes`,
                  )}
                  {renderMetricRow(
                    "Retorno bruto por R$ 1",
                    `${formatNumber(marketingEstimate.grossReturnPerReal, 2)}x`,
                  )}
                  {renderMetricRow(
                    "Retorno de margem por R$ 1",
                    `${formatNumber(marketingEstimate.contributionReturnPerReal, 2)}x`,
                  )}
                </div>
              </div>
            ) : null}

            <div className={styles.stageFooter}>
              <button
                className={styles.primaryAction}
                onClick={() => scrollToStep("final")}
                type="button"
              >
                Ver leitura
              </button>
            </div>
          </div>
        </section>

        <section className={styles.stage} data-step-id="final" ref={sectionRefs.final}>
          <div className={styles.stageInner}>
            <header className={styles.stageHeader}>
              <span className={styles.kicker}>Leitura final</span>
              <h2 className={styles.stageTitle}>Faz sentido avancar?</h2>
            </header>

            <div className={styles.readingCard}>
              <span className={styles.readingState}>{readingTitle.replace(".", "")}</span>
              <strong className={styles.readingTitle}>{readingTitle}</strong>
              <p className={styles.readingText}>{readingText}</p>
            </div>

            <div className={styles.statusList}>
              {statusChips.map((chip) => (
                <span className={styles.statusChip} key={chip}>
                  {chip}
                </span>
              ))}
            </div>

            {alerts.length > 0 ? (
              <div className={styles.alertList}>
                {alerts.map((alert) => (
                  <p className={styles.alertItem} key={alert}>
                    {alert}
                  </p>
                ))}
              </div>
            ) : null}

            <div className={styles.metricList}>
              {renderMetricRow("Base", formatCurrency(currentRevenue))}
              {renderMetricRow("Meta", `${formatNumber(marketingEstimate.newClients)} clientes`)}
              {renderMetricRow("Investimento", formatCurrency(marketingEstimate.totalInvestment))}
            </div>

            {technicalMode ? (
              <div className={styles.detailsBlock}>
                <div className={styles.detailsHeader}>
                  <span>Detalhes tecnicos</span>
                </div>
                <div className={styles.metricList}>
                  {renderMetricRow("Margem alvo por venda", formatCurrency(projectedContribution))}
                  {renderMetricRow("Receita puxada pelo marketing", formatCurrency(marketingEstimate.grossRevenue))}
                  {renderMetricRow(
                    "Margem gerada",
                    formatCurrency(marketingEstimate.contributionGenerated),
                    "antes dos fixos",
                  )}
                  {renderMetricRow(
                    "Ganho liquido encontrado",
                    formatCurrency(marketingEstimate.achievedNetLift),
                  )}
                  {renderMetricRow(
                    "Retorno liquido por R$ 1",
                    `${formatNumber(marketingEstimate.netReturnPerReal, 2)}x`,
                  )}
                </div>
              </div>
            ) : null}

            <div className={styles.finalActions}>
              <a
                className={styles.primaryLink}
                href={contactHref}
                rel={contactIsExternal ? "noreferrer" : undefined}
                target={contactIsExternal ? "_blank" : undefined}
              >
                Conversar com contexto
              </a>
              <a className={styles.secondaryLink} href={servicesHref}>
                Ver servicos
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.mobileSummary}>
        <span>Base: {formatCurrency(currentRevenue)}</span>
        <span>Meta: {formatNumber(marketingEstimate.newClients)}</span>
        <span>Investimento: {formatCurrency(marketingEstimate.totalInvestment)}</span>
      </div>
    </div>
  );
}
