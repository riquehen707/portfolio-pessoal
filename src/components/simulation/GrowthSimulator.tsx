"use client";

import { Button, Heading, Text } from "@once-ui-system/core";
import { type ChangeEvent, useId, useState } from "react";

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

const glossaryLinks = {
  marketing: "/blog/termos-de-marketing",
  publicidade: "/blog/termos-de-publicidade",
} as const;

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
      setter(Number(event.target.value));
    };

  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <div className={styles.steps}>
          <section className={styles.stepPanel}>
            <div className={styles.stepHeader}>
              <span className={styles.stepBadge}>Etapa 1</span>
              <Heading as="h2" variant="heading-strong-m">
                Base atual do negocio
              </Heading>
              <Text className={styles.stepLead} variant="body-default-s" onBackground="neutral-weak">
                Comece pela operacao atual. O simulador parte de preco, custo, vendas e custos fixos
                para entender quanto sobra hoje e qual o porte estimado da estrutura.
              </Text>
            </div>

            <div className={styles.fieldGrid}>
              <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="simulation-segment">
                <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                  Categoria
                </Text>
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
                <Text className={styles.helper} variant="body-default-xs" onBackground="neutral-weak">
                  {segment.note}
                </Text>
              </label>

              <label className={styles.field} htmlFor="simulation-price">
                <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                  <TermHint
                    label="Preco medio por venda"
                    description="E o valor medio que entra a cada venda feita pelo negocio."
                    href={`${glossaryLinks.marketing}#ticket-medio`}
                  />
                </Text>
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
                <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                  Custo direto por venda
                </Text>
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
                <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                  Vendas por mes
                </Text>
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
                <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                  Custos fixos mensais
                </Text>
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

            <div className={styles.metricGrid}>
              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Faturamento atual
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(currentRevenue)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Equivalente mensal usando ticket e volume atuais.
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Caixa atual
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(currentNet)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Margem apos custos diretos e fixos: {formatPercent(currentMargin)}.
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Porte estimado
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {scale.label}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  {scale.note}
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  <TermHint
                    label="Margem por venda"
                    description="E quanto sobra por venda depois de tirar o custo direto daquele atendimento ou produto."
                    href={`${glossaryLinks.marketing}#margem`}
                  />
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(currentContribution)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Valor que cada venda deixa antes dos custos fixos.
                </Text>
              </article>
            </div>
          </section>

          <section className={styles.stepPanel}>
            <div className={styles.stepHeader}>
              <span className={styles.stepBadge}>Etapa 2</span>
              <Heading as="h2" variant="heading-strong-m">
                O que pequenos ajustes mudam
              </Heading>
              <Text className={styles.stepLead} variant="body-default-s" onBackground="neutral-weak">
                Aqui o ganho nao aparece de graca. Melhorar vendas, subir ticket, reduzir custo e
                aumentar recorrencia exigem implantacao, gestao e operacao. Esse custo entra na conta.
              </Text>
            </div>

            <div className={styles.sliderList}>
              <label className={styles.sliderField} htmlFor="sales-lift">
                <div className={styles.sliderHead}>
                  <div className={styles.sliderCopy}>
                    <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                      + vendas
                    </Text>
                    <Text className={styles.helper} variant="body-default-xs" onBackground="neutral-weak">
                      Mais agenda preenchida, mais resposta comercial e mais fechamento.
                    </Text>
                  </div>
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
                <div className={styles.rangeMeta}>
                  <span>0%</span>
                  <span>{formatNumber(salesFromProcess)} vendas extras</span>
                  <span>35%</span>
                </div>
              </label>

              <label className={styles.sliderField} htmlFor="price-lift">
                <div className={styles.sliderHead}>
                  <div className={styles.sliderCopy}>
                    <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                      + preco
                    </Text>
                    <Text className={styles.helper} variant="body-default-xs" onBackground="neutral-weak">
                      Reposicionamento de proposta, pacote e valor percebido.
                    </Text>
                  </div>
                  <span className={styles.sliderValue}>{formatPercent(priceLift)}</span>
                </div>
                <input
                  className={styles.range}
                  id="price-lift"
                  max="20"
                  min="0"
                  onChange={handleRangeChange(setPriceLift)}
                  step="1"
                  type="range"
                  value={priceLift}
                />
                <div className={styles.rangeMeta}>
                  <span>0%</span>
                  <span>Ticket alvo: {formatCurrency(projectedPrice)}</span>
                  <span>20%</span>
                </div>
              </label>

              <label className={styles.sliderField} htmlFor="cost-drop">
                <div className={styles.sliderHead}>
                  <div className={styles.sliderCopy}>
                    <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                      - custo
                    </Text>
                    <Text className={styles.helper} variant="body-default-xs" onBackground="neutral-weak">
                      Reorganizacao interna, renegociacao e menos desperdicio por venda.
                    </Text>
                  </div>
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
                <div className={styles.rangeMeta}>
                  <span>0%</span>
                  <span>Custo alvo: {formatCurrency(projectedCost)}</span>
                  <span>18%</span>
                </div>
              </label>

              <label className={styles.sliderField} htmlFor="recurrence-lift">
                <div className={styles.sliderHead}>
                  <div className={styles.sliderCopy}>
                    <Text className={styles.fieldLabel} variant="label-default-s" onBackground="neutral-weak">
                      <TermHint
                        label="+ recorrencia"
                        description="Mostra o efeito de fazer o mesmo cliente voltar mais vezes ou comprar de novo."
                        href={`${glossaryLinks.marketing}#recorrencia`}
                      />
                    </Text>
                    <Text className={styles.helper} variant="body-default-xs" onBackground="neutral-weak">
                      Mais retorno, recompra, remarcacao e continuidade no atendimento.
                    </Text>
                  </div>
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
                <div className={styles.rangeMeta}>
                  <span>0%</span>
                  <span>{formatNumber(salesFromRecurrence)} vendas equivalentes</span>
                  <span>25%</span>
                </div>
              </label>
            </div>

            <div className={styles.metricGrid}>
              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Faturamento projetado
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(projectedRevenue)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  {formatNumber(projectedSales)} vendas por mes com ticket alvo de{" "}
                  {formatCurrency(projectedPrice)}.
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Caixa antes da implantacao
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(projectedNetBeforeOps)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Ganho operacional bruto se a mudanca ja estivesse rodando.
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  <TermHint
                    label="Custo de implantacao"
                    description="E o custo interno de colocar os ajustes em pratica, incluindo gestao, treinamento e operacao."
                    href={`${glossaryLinks.marketing}#margem`}
                  />
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(adjustmentOpsCost)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Inclui comercial, reposicionamento, revisao de custos e gerencia interna.
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Ganho liquido apos implantacao
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(projectedNetAfterOps)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Diferenca sobre hoje: {formatCurrency(internalNetLift)} por mes.
                </Text>
              </article>
            </div>

            <div className={styles.breakdownList}>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">Base de implantacao e gestao</Text>
                <Text variant="body-default-s">{formatCurrency(implementationBase)}</Text>
              </div>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">Ajuste comercial para ganhar volume</Text>
                <Text variant="body-default-s">{formatCurrency(salesOpsCost)}</Text>
              </div>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">Reposicionamento para sustentar preco</Text>
                <Text variant="body-default-s">{formatCurrency(priceOpsCost)}</Text>
              </div>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">Revisao operacional para reduzir custo</Text>
                <Text variant="body-default-s">{formatCurrency(costOpsCost)}</Text>
              </div>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">Recorrencia, CRM e acompanhamento</Text>
                <Text variant="body-default-s">{formatCurrency(recurrenceOpsCost)}</Text>
              </div>
            </div>
          </section>

          <section className={styles.stepPanel}>
            <div className={styles.stepHeader}>
              <span className={styles.stepBadge}>Etapa 3</span>
              <Heading as="h2" variant="heading-strong-m">
                Quanto o marketing precisaria retornar
              </Heading>
              <Text className={styles.stepLead} variant="body-default-s" onBackground="neutral-weak">
                Agora a conta replica o ganho liquido da etapa 2 via marketing. O calculo usa o
                ticket alvo, a margem por venda, o CAC base do segmento e a perda de eficiencia
                depois do ponto de saturacao.
              </Text>
            </div>

            <div className={styles.metricGrid}>
              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Meta liquida a replicar
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(marketingEstimate.targetNetLift)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Ganho mensal equivalente ao resultado liquido dos ajustes internos.
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  <TermHint
                    label="Ticket usado na conta"
                    description="E o valor medio por venda que o simulador assume para projetar o retorno."
                    href={`${glossaryLinks.marketing}#ticket-medio`}
                  />
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(projectedPrice)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  A conta considera o valor que voce quer sustentar, nao apenas o ticket atual.
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  <TermHint
                    label="CAC base do segmento"
                    description="E o custo medio para conquistar um novo cliente antes de a verba comecar a perder eficiencia."
                    href={`${glossaryLinks.marketing}#cac`}
                  />
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(marketingEstimate.baseCAC)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Ponto de partida antes da verba passar de {formatNumber(marketingEstimate.saturationPoint, 0)}{" "}
                  novos clientes por mes.
                </Text>
              </article>

              <article className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  <TermHint
                    label="CAC ajustado"
                    description="E o CAC depois de considerar que subir a verba tende a encarecer a aquisicao."
                    href={`${glossaryLinks.publicidade}#ponto-de-saturacao`}
                  />
                </Text>
                <Text className={styles.metricValue} variant="body-default-l">
                  {formatCurrency(marketingEstimate.adjustedCAC)}
                </Text>
                <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                  Perda de eficiencia: {formatPercent(marketingEstimate.efficiencyLossPct)}.
                </Text>
              </article>
            </div>

            <div className={styles.breakdownList}>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">Novos clientes necessarios</Text>
                <Text variant="body-default-s">{formatNumber(marketingEstimate.newClients)}</Text>
              </div>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">
                  <TermHint
                    label="Midia estimada"
                    description="E a verba de anuncios que o simulador estima para buscar o volume de clientes desejado."
                    href={`${glossaryLinks.publicidade}#midia-paga`}
                  />
                </Text>
                <Text variant="body-default-s">{formatCurrency(marketingEstimate.mediaSpend)}</Text>
              </div>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">Gestao e operacao de marketing</Text>
                <Text variant="body-default-s">{formatCurrency(marketingEstimate.managementCost)}</Text>
              </div>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">Taxa operacional de marketing</Text>
                <Text variant="body-default-s">
                  {formatPercent(marketingEstimate.managementRate * 100)}
                </Text>
              </div>
              <div className={styles.breakdownItem}>
                <Text variant="body-default-s">
                  <TermHint
                    label="Investimento total estimado"
                    description="Soma da verba de midia com a camada operacional e de gestao necessaria para rodar o marketing."
                    href={`${glossaryLinks.publicidade}#roas`}
                  />
                </Text>
                <Text variant="body-default-s">{formatCurrency(marketingEstimate.totalInvestment)}</Text>
              </div>
            </div>
          </section>
        </div>

        <aside className={styles.resultPanel}>
          <div className={styles.stepHeader}>
            <span className={styles.stepBadge}>Leitura final</span>
            <Heading as="h2" variant="heading-strong-m">
              Quanto essa meta pede de marketing
            </Heading>
            <Text className={styles.stepLead} variant="body-default-s" onBackground="neutral-weak">
              O retorno cai porque o custo total nao e so CAC. Entram midia, operacao, gestao e a
              piora natural de eficiencia quando a verba sobe alem do ponto de saturacao.
            </Text>
          </div>

          <div className={styles.resultHero}>
            <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
              <TermHint
                label="Investimento total estimado"
                description="Soma da verba de anuncios com o custo de operacao do marketing para buscar essa meta."
                href={`${glossaryLinks.publicidade}#roas`}
              />
            </Text>
            <span className={styles.resultPill}>
              {formatCurrency(marketingEstimate.totalInvestment)}
            </span>
            <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
              {marketingEstimate.viable
                ? "Valor mensal aproximado para replicar o ganho da etapa 2 via marketing."
                : "Mesmo com mais verba, a conta nao fecha com folga sob estas premissas."}
            </Text>
          </div>

          <div className={styles.resultMetricGrid}>
            <article className={styles.resultMetric}>
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Receita gerada
              </Text>
              <Text className={styles.metricValue} variant="body-default-l">
                {formatCurrency(marketingEstimate.grossRevenue)}
              </Text>
              <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                Receita mensal puxada pelos novos clientes calculados.
              </Text>
            </article>

            <article className={styles.resultMetric}>
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Margem gerada
              </Text>
              <Text className={styles.metricValue} variant="body-default-l">
                {formatCurrency(marketingEstimate.contributionGenerated)}
              </Text>
              <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                Valor antes dos fixos, usando a margem por venda alvo.
              </Text>
            </article>

            <article className={styles.resultMetric}>
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                <TermHint
                  label="Retorno bruto por R$ 1"
                  description="Compara a receita gerada com o total investido em marketing, sem descontar os custos fixos."
                  href={`${glossaryLinks.publicidade}#roas`}
                />
              </Text>
              <Text className={styles.metricValue} variant="body-default-l">
                {formatNumber(marketingEstimate.grossReturnPerReal, 2)}x
              </Text>
              <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                Receita total dividida pelo investimento total em marketing.
              </Text>
            </article>

            <article className={styles.resultMetric}>
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Retorno de margem por R$ 1
              </Text>
              <Text className={styles.metricValue} variant="body-default-l">
                {formatNumber(marketingEstimate.contributionReturnPerReal, 2)}x
              </Text>
              <Text className={styles.metricHint} variant="body-default-xs" onBackground="neutral-weak">
                Ajuda a ver quando a verba sobe mas a margem nao acompanha no mesmo ritmo.
              </Text>
            </article>
          </div>

          <div className={styles.noteBlock}>
            <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
              O que esta puxando a conta
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              O calculo usa o ticket alvo de {formatCurrency(projectedPrice)}, a margem alvo de{" "}
              {formatCurrency(projectedContribution)} por venda e um ponto de saturacao de{" "}
              {formatNumber(marketingEstimate.saturationPoint, 0)} novos clientes por mes para{" "}
              {segment.label.toLowerCase()}.
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {segment.saturationNote}
            </Text>
            {!marketingEstimate.viable ? (
              <div className={styles.warningCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Meta agressiva para o modelo
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Com as premissas atuais, o marketing chega a cerca de{" "}
                  {formatCurrency(marketingEstimate.achievedNetLift)} de ganho liquido mensal antes
                  de ficar caro demais. Vale revisar ticket, margem ou a meta de volume antes de
                  acelerar verba.
                </Text>
              </div>
            ) : (
              <div className={styles.warningCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Ganho liquido replicado
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  A leitura encontra cerca de {formatCurrency(marketingEstimate.achievedNetLift)} de
                  ganho liquido mensal com {formatNumber(marketingEstimate.newClients)} novos
                  clientes.
                </Text>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <Button href={contactHref} variant="primary" size="m" arrowIcon>
              Conversar com contexto
            </Button>
            <Button href={servicesHref} variant="secondary" size="m" arrowIcon>
              Ver servicos
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
