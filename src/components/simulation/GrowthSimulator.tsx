"use client";

import {
  type ChangeEvent,
  type ReactNode,
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

type ExpandableHelpProps = {
  label: string;
  children: ReactNode;
};

type StepId = "start" | "base" | "adjustments" | "marketing" | "final";
type ScenarioId = "conservative" | "realistic" | "aggressive" | "custom";
type ReturnWindowId = "up-to-30" | "thirty-to-sixty" | "sixty-to-ninety" | "over-ninety";

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
  baseGuide: "/blog/como-entender-receita-margem-custos-e-volume",
  adjustmentsGuide: "/blog/como-melhorar-o-retorno-com-pequenos-ajustes",
} as const;

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

const returnWindowOptions: Array<{ id: ReturnWindowId; label: string; days: number }> = [
  { id: "up-to-30", label: "Até 30 dias", days: 25 },
  { id: "thirty-to-sixty", label: "30 a 60 dias", days: 45 },
  { id: "sixty-to-ninety", label: "60 a 90 dias", days: 75 },
  { id: "over-ninety", label: "Mais de 90 dias", days: 120 },
];

const segmentProfiles: SegmentProfile[] = [
  {
    id: "psicologas",
    label: "Psicólogas e terapeutas",
    note: "Operação com ticket médio menor, decisão mais sensível a confiança e recorrência.",
    saturationNote: "A saturação costuma aparecer quando a agenda local exige volume constante de leads qualificados.",
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
    label: "Advogados e consultoria jurídica",
    note: "Ticket maior, ciclo comercial mais lento e dependência maior de autoridade.",
    saturationNote: "Subir verba cedo costuma encarecer o CAC porque a demanda local é mais estreita.",
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
    label: "Corretores de imóveis",
    note: "Poucos fechamentos, ticket alto e grande pressão de acompanhamento comercial.",
    saturationNote: "Passar do ponto de saturação costuma elevar o CAC rapidamente por competição local.",
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
    label: "Clínicas de saúde e odontologia",
    note: "Agenda intensa, mais pontos de contato e operação interna pesada para sustentar ganho.",
    saturationNote: "O limite aparece quando o time interno não acompanha atendimento, retorno e remarcação.",
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
    label: "Salão, beleza e estética",
    note: "Ticket menor, retorno mais rápido e mais espaço para recorrência bem organizada.",
    saturationNote: "A perda de eficiência aparece quando a verba sobe mais rápido do que a recompra.",
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
    saturationNote: "Depois do ponto de saturação, mais verba tende a comprar cliques piores e visitas menos prontas.",
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
    note: "Escala mais fácil, mas com CAC, frete e operação comendo margem rapidamente.",
    saturationNote: "Escalar mídia sem melhorar ticket, recompra e operação derruba o retorno mais cedo.",
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

function formatTimeEstimate(days: number) {
  if (!Number.isFinite(days) || days <= 0) {
    return "Sem retorno estimado";
  }

  if (days <= 120) {
    return `Cerca de ${formatNumber(Math.round(days), 0)} dias`;
  }

  return `Cerca de ${formatNumber(Math.max(days / 30, 1), 1)} meses`;
}

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

function ExpandableHelp({ label, children }: ExpandableHelpProps) {
  return (
    <details className={styles.expandableHelp}>
      <summary className={styles.expandableSummary}>{label}</summary>
      <div className={styles.expandableBody}>{children}</div>
    </details>
  );
}

function getBusinessScale(monthlyRevenue: number): ScaleProfile {
  if (monthlyRevenue < 12000) {
    return {
      id: "micro",
      label: "Micro operação",
      note: "Mudanças ainda são leves, mas dependem muito do dono e do tempo de execução.",
      opsMultiplier: 0.82,
      marketingMultiplier: 0.92,
      baseOps: 240,
    };
  }

  if (monthlyRevenue < 40000) {
    return {
      id: "small",
      label: "Operação pequena",
      note: "Já existe algum processo, mas a implantação ainda cabe sem uma equipe muito grande.",
      opsMultiplier: 1,
      marketingMultiplier: 1,
      baseOps: 480,
    };
  }

  if (monthlyRevenue < 100000) {
    return {
      id: "medium",
      label: "Operação em consolidação",
      note: "Qualquer ajuste começa a exigir mais gestão, treinamento e acompanhamento.",
      opsMultiplier: 1.24,
      marketingMultiplier: 1.12,
      baseOps: 920,
    };
  }

  return {
    id: "structured",
    label: "Operação estruturada",
    note: "A mudança depende de alinhamento de time, controle e mais camada de gerência.",
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
  const [returnWindowId, setReturnWindowId] = useState<ReturnWindowId>("thirty-to-sixty");
  const [manualOpen, setManualOpen] = useState(false);
  const [technicalMode, setTechnicalMode] = useState(false);

  const startRef = useRef<HTMLElement | null>(null);
  const baseRef = useRef<HTMLElement | null>(null);
  const adjustmentsRef = useRef<HTMLElement | null>(null);
  const marketingRef = useRef<HTMLElement | null>(null);
  const finalRef = useRef<HTMLElement | null>(null);

  const sectionRefs = {
    start: startRef,
    base: baseRef,
    adjustments: adjustmentsRef,
    marketing: marketingRef,
    final: finalRef,
  };

  const segment =
    segmentProfiles.find((item) => item.id === segmentId) ?? segmentProfiles[0];
  const selectedReturnWindow =
    returnWindowOptions.find((item) => item.id === returnWindowId) ?? returnWindowOptions[1];

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

  const estimatedReturnDays =
    marketingEstimate.totalInvestment > 0 && marketingEstimate.contributionGenerated > 0
      ? selectedReturnWindow.days +
        (marketingEstimate.totalInvestment / marketingEstimate.contributionGenerated) * 30
      : 0;
  const estimatedReturnLabel = formatTimeEstimate(estimatedReturnDays);

  const baseSummaryItems = [
    { label: "Receita atual", value: formatCurrency(currentRevenue) },
    { label: "Margem por cliente", value: formatCurrency(currentContribution) },
    { label: "Resultado apos fixos", value: formatCurrency(currentNet) },
  ];

  const compactSummaryItems = [
    { label: "Base", value: formatCurrency(currentRevenue) },
    { label: "Meta", value: `${formatNumber(marketingEstimate.newClients)} clientes` },
    { label: "Investimento", value: formatCurrency(marketingEstimate.totalInvestment) },
  ];

  const revenueDifference = projectedRevenue - currentRevenue;
  const investmentShare =
    marketingEstimate.totalInvestment > 0
      ? (marketingEstimate.mediaSpend / marketingEstimate.totalInvestment) * 100
      : 0;

  let readingTitle = "Conta viável.";
  let readingText =
    "O cenário sustenta o investimento se o volume projetado for alcançado dentro do prazo estimado.";
  let attentionPoint = "Sustentar o volume projetado com atendimento consistente.";
  let nextMoveLabel = "Pode testar investimento.";
  let nextMoveText = "Validar com verba controlada e acompanhar resposta real da operação.";

  if (projectedContribution <= 0) {
    readingTitle = "Cenário frágil.";
    readingText =
      "Antes de investir, ajuste valor médio, custo por cliente ou recorrência.";
    attentionPoint = "Margem por cliente insuficiente.";
    nextMoveLabel = "Ajuste a base primeiro.";
    nextMoveText = "Reveja valor médio, custo direto e formato de entrega antes da mídia.";
  } else if (!marketingEstimate.viable) {
    readingTitle = "Conta apertada.";
    readingText =
      "O investimento exige mais clientes do que a base atual indica. Revise margem, valor médio ou custo por cliente.";
    attentionPoint = "Meta de clientes acima da base atual.";
    nextMoveLabel = "Ganhe margem antes da mídia.";
    nextMoveText = "Melhore a base antes de exigir volume que a operação ainda não sustenta.";
  } else if (marketingEstimate.adjustedCAC >= projectedContribution) {
    readingTitle = "Conta apertada.";
    readingText =
      "O custo para trazer cliente novo encosta na margem por cliente. Revise valor médio ou custo direto.";
    attentionPoint = "Custo para trazer cliente novo perto da margem.";
    nextMoveLabel = "Revisar a conta por cliente.";
    nextMoveText = "Sem margem melhor, mais investimento tende a ficar caro rápido.";
  } else if (marketingEstimate.totalInvestment > Math.max(projectedNetAfterOps, currentNet, 0)) {
    readingTitle = "Conta apertada.";
    readingText =
      "A conta pode fechar, mas o investimento fica alto para o resultado atual da operação.";
    attentionPoint = "Investimento acima do resultado atual.";
    nextMoveLabel = "Teste com cautela.";
    nextMoveText = "Começar menor reduz risco e ajuda a validar resposta antes de subir verba.";
  } else if (estimatedReturnDays > 120) {
    readingTitle = "Conta apertada.";
    readingText =
      "O retorno demora mais do que o esperado para a maioria das operações de serviço.";
    attentionPoint = "Prazo de retorno longo.";
    nextMoveLabel = "Valide o prazo antes de escalar.";
    nextMoveText = "Se o recebimento demora muito, o caixa precisa aguentar o ciclo com folga.";
  } else if (marketingEstimate.newClients > currentSales * 1.4) {
    attentionPoint = "Sustentar o novo volume de atendimento.";
    nextMoveLabel = "Prepare a operação para subir.";
    nextMoveText = "Atendimento, agenda e follow-up precisam acompanhar o ritmo projetado.";
  }

  const alerts = [
    marketingEstimate.adjustedCAC >= projectedContribution
      ? "O custo para trazer cliente novo passa da margem por cliente."
      : null,
    marketingEstimate.newClients > currentSales * 1.6
      ? "A meta de novos clientes está muito acima da base atual."
      : null,
    marketingEstimate.totalInvestment > Math.max(currentNet, 0)
      ? "O investimento fica maior do que o resultado atual."
      : null,
    projectedContribution <= 0 ? "Margem insuficiente para sustentar esse cenário." : null,
  ].filter(Boolean) as string[];
  const visibleAlerts = alerts.slice(0, 2);

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
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    sectionRefs[stepId].current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
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
            {compactSummaryItems.map((item) => (
              <div className={styles.compactSummaryItem} key={item.label}>
                <span className={styles.compactSummaryLabel}>{item.label}</span>
                <span className={styles.compactSummaryValue}>{item.value}</span>
              </div>
            ))}
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
              <span className={styles.kicker}>Início</span>
              <h1 className={styles.displayTitle}>Simulação antes de investir</h1>
              <p className={styles.displayLead}>
                Base atual, ajustes internos e leitura de viabilidade.
              </p>
            </div>

            <button
              className={styles.primaryAction}
              onClick={() => scrollToStep("base")}
              type="button"
            >
              Começar
            </button>
          </div>
        </section>

        <section className={styles.stage} data-step-id="base" ref={sectionRefs.base}>
          <div className={styles.stageInner}>
            <header className={styles.stageHeader}>
              <span className={styles.kicker}>Base</span>
              <h2 className={styles.stageTitle}>Base atual</h2>
            </header>

            <p className={styles.stageNote}>
              Use números aproximados. A ideia é ler como a operação funciona hoje.
            </p>

            <div className={styles.fieldGrid}>
              <label className={`${styles.field} ${styles.fieldCompact}`} htmlFor="simulation-segment">
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
              </label>

              <label className={styles.field} htmlFor="simulation-price">
                <span className={styles.fieldLabel}>Valor médio recebido por cliente</span>
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
                <span className={styles.fieldLabel}>Custo direto por cliente</span>
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
                <ExpandableHelp label="O que entra aqui?">
                  Inclua custos que aparecem para atender, entregar ou vender: materiais, taxas,
                  repasses, deslocamento, comissões, ferramentas e tempo operacional.
                </ExpandableHelp>
              </label>

              <label className={styles.field} htmlFor="simulation-sales">
                    <span className={styles.fieldLabel}>Clientes atendidos por mês</span>
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

            <div className={styles.summaryStrip}>
              {baseSummaryItems.map((item) => (
                <div className={styles.summaryItem} key={item.label}>
                  <span className={styles.summaryItemLabel}>{item.label}</span>
                  <strong className={styles.summaryItemValue}>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className={styles.supportLinks}>
              <a className={styles.supportLink} href={glossaryLinks.baseGuide}>
                Preciso entender minha base
              </a>
            </div>

            {technicalMode ? (
              <div className={styles.detailsBlock}>
                <div className={styles.detailsHeader}>
                  <span>Detalhes técnicos</span>
                </div>
                <div className={styles.metricList}>
                  {renderMetricRow("Margem atual", formatPercent(currentMargin), "sobre o faturamento")}
                  {renderMetricRow("Porte estimado", scale.label, scale.note)}
                  {renderMetricRow("Categoria lida", segment.label, segment.saturationNote)}
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
              <h2 className={styles.stageTitle}>Pequenos ajustes antes de investir</h2>
            </header>

            <p className={styles.stageNote}>
              Escolha um cenário e veja o impacto antes de abrir ajustes manuais.
            </p>

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
              <span className={styles.primaryMetricLabel}>Resultado apos ajustes internos</span>
              <strong className={styles.primaryMetricValue}>
                {formatCurrency(projectedNetAfterOps)}
              </strong>
              <span className={styles.primaryMetricHint}>Já descontando o custo de implantação.</span>
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
                <span className={styles.compareLabel}>Diferença</span>
                <strong className={styles.compareValue}>{formatSignedCurrency(revenueDifference)}</strong>
              </div>
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

            <div className={styles.supportLinks}>
              <a className={styles.supportLink} href={glossaryLinks.adjustmentsGuide}>
                Entender esses ajustes
              </a>
            </div>

            {manualOpen ? (
              <div className={styles.manualPanel}>
                <label className={styles.sliderField} htmlFor="sales-lift">
                  <div className={styles.sliderHeader}>
                    <span className={styles.fieldLabel}>+ clientes atendidos</span>
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
                    <span className={styles.fieldLabel}>+ valor médio</span>
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
                    <span className={styles.fieldLabel}>- custo por cliente</span>
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
                        label="+ recorrência"
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
                  <span>Detalhes técnicos</span>
                </div>
                <div className={styles.metricList}>
                  {renderMetricRow("Receita projetada", formatCurrency(projectedRevenue))}
                  {renderMetricRow("Resultado antes da implantação", formatCurrency(projectedNetBeforeOps))}
                  {renderMetricRow(
                    "Custo de implantação",
                    formatCurrency(adjustmentOpsCost),
                    "interno e operacional",
                  )}
                  {renderMetricRow(
                    "Resultado extra",
                    formatCurrency(internalNetLift),
                    "diferença sobre hoje",
                  )}
                  {renderMetricRow("Base de implantação", formatCurrency(implementationBase))}
                  {renderMetricRow("Ajuste de atendimento", formatCurrency(salesOpsCost))}
                  {renderMetricRow("Reposicionamento de valor", formatCurrency(priceOpsCost))}
                  {renderMetricRow("Redução de custo", formatCurrency(costOpsCost))}
                  {renderMetricRow("Recorrência e CRM", formatCurrency(recurrenceOpsCost))}
                </div>
              </div>
            ) : null}

            <div className={styles.stageFooter}>
              <button
                className={styles.primaryAction}
                onClick={() => scrollToStep("marketing")}
                type="button"
              >
                Aplicar cenário
              </button>
            </div>
          </div>
        </section>

        <section className={styles.stage} data-step-id="marketing" ref={sectionRefs.marketing}>
          <div className={styles.stageInner}>
            <header className={styles.stageHeader}>
              <span className={styles.kicker}>Investimento</span>
              <h2 className={styles.stageTitle}>Quanto precisa investir?</h2>
            </header>

            <div className={styles.fieldGrid}>
              <label className={`${styles.field} ${styles.fieldCompact}`} htmlFor="simulation-return-window">
                <span className={styles.fieldLabel}>Tempo médio até retorno</span>
                <select
                  className={styles.select}
                  id="simulation-return-window"
                  onChange={(event) => setReturnWindowId(event.target.value as ReturnWindowId)}
                  value={returnWindowId}
                >
                  {returnWindowOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <ExpandableHelp label="Como ler esse prazo?">
                    Quanto tempo, em média, um novo contato leva para virar receita.
            </ExpandableHelp>

            <div className={styles.primaryMetricCard}>
              <span className={styles.primaryMetricLabel}>Investimento estimado</span>
              <strong className={styles.primaryMetricValue}>
                {formatCurrency(marketingEstimate.totalInvestment)}
              </strong>
              <span className={styles.primaryMetricHint}>Inclui mídia, gestão e operação.</span>
            </div>

            <ExpandableHelp label="Ver composição do investimento">
              <div className={styles.breakdownPanel}>
                <p className={styles.breakdownText}>
                  O investimento pode incluir anúncios, criação, gestão, ferramentas, atendimento
                  e perda natural de eficiência.
                </p>

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
                  {renderMetricRow("Mídia", formatCurrency(marketingEstimate.mediaSpend))}
                  {renderMetricRow(
                    "Gestão e operação",
                    formatCurrency(marketingEstimate.managementCost),
                  )}
                  {renderMetricRow("Total estimado", formatCurrency(marketingEstimate.totalInvestment))}
                </div>
              </div>
            </ExpandableHelp>

            <div className={styles.metricList}>
              {renderMetricRow("Retorno estimado", formatCurrency(marketingEstimate.grossRevenue))}
              {renderMetricRow("Tempo estimado de retorno", estimatedReturnLabel)}
              {renderMetricRow("Novos clientes necessarios", formatNumber(marketingEstimate.newClients))}
            </div>

            {technicalMode ? (
              <div className={styles.detailsBlock}>
                <div className={styles.detailsHeader}>
                  <span>Detalhes técnicos</span>
                </div>
                <div className={styles.metricList}>
                  {renderMetricRow("Meta líquida", formatCurrency(marketingEstimate.targetNetLift))}
                  {renderMetricRow("Valor médio usado na conta", formatCurrency(projectedPrice))}
                  {renderMetricRow("CAC base do segmento", formatCurrency(marketingEstimate.baseCAC))}
                  {renderMetricRow(
                    "CAC ajustado",
                    formatCurrency(marketingEstimate.adjustedCAC),
                    marketingEstimate.efficiencyLossPct > 0
                      ? `perda de eficiência ${formatPercent(marketingEstimate.efficiencyLossPct)}`
                      : "sem perda relevante",
                  )}
                  {renderMetricRow(
                    "Ponto de saturação",
                    `${formatNumber(marketingEstimate.saturationPoint, 0)} clientes`,
                  )}
                  {renderMetricRow(
                    "Taxa operacional",
                    `${formatNumber(marketingEstimate.managementRate * 100, 0)}%`,
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
              <span className={styles.kicker}>Leitura</span>
              <h2 className={styles.stageTitle}>Vale investir agora?</h2>
            </header>

            <div className={styles.readingCard}>
              <span className={styles.readingState}>{readingTitle.replace(".", "")}</span>
              <strong className={styles.readingTitle}>{readingTitle}</strong>
              <p className={styles.readingText}>{readingText}</p>
            </div>

            <div className={styles.directionPanel}>
              <span className={styles.directionLabel}>Próximo passo</span>
              <strong className={styles.directionTitle}>{nextMoveLabel}</strong>
              <p className={styles.directionText}>{nextMoveText}</p>
              <span className={styles.directionFootnote}>Ponto de atenção: {attentionPoint}</span>
            </div>

            {visibleAlerts.length > 0 ? (
              <div className={styles.alertList}>
                {visibleAlerts.map((alert) => (
                  <p className={styles.alertItem} key={alert}>
                    {alert}
                  </p>
                ))}
              </div>
            ) : null}

            <div className={styles.metricList}>
              {renderMetricRow("Investimento necessario", formatCurrency(marketingEstimate.totalInvestment))}
              {renderMetricRow("Retorno estimado", formatCurrency(marketingEstimate.grossRevenue))}
              {renderMetricRow("Tempo estimado", estimatedReturnLabel)}
            </div>

            <ExpandableHelp label="Retorno estimado não é lucro.">
              Receita estimada ainda precisa passar por custos, operação, impostos e tempo de
              recebimento.
            </ExpandableHelp>

            <div className={styles.advancedPanel}>
              <span className={styles.advancedLabel}>Leitura mais precisa</span>
              <p className={styles.advancedText}>
                Este modelo é simplificado. A leitura completa entra depois, cruzando canal,
                agenda, capacidade, prazo de recebimento, recorrência, equipe e caixa.
              </p>
            </div>

            {technicalMode ? (
              <div className={styles.detailsBlock}>
                <div className={styles.detailsHeader}>
                  <span>Detalhes técnicos</span>
                </div>
                <div className={styles.metricList}>
                  {renderMetricRow("Ponto de atenção", attentionPoint)}
                  {renderMetricRow("Direção sugerida", nextMoveLabel, nextMoveText)}
                  {renderMetricRow("Margem alvo por cliente", formatCurrency(projectedContribution))}
                  {renderMetricRow("Receita puxada pelo investimento", formatCurrency(marketingEstimate.grossRevenue))}
                  {renderMetricRow(
                    "Margem gerada",
                    formatCurrency(marketingEstimate.contributionGenerated),
                    "antes dos fixos",
                  )}
                  {renderMetricRow(
                    "Resultado liquido encontrado",
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
                Agendar uma reunião
              </a>
              <a className={styles.secondaryLink} href={servicesHref}>
                Ver serviços
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.mobileSummary}>
        {compactSummaryItems.map((item) => (
          <div className={styles.compactSummaryItem} key={item.label}>
            <span className={styles.compactSummaryLabel}>{item.label}</span>
            <span className={styles.compactSummaryValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
