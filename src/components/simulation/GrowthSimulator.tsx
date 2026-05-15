"use client";

import { Button, Heading, Row, Tag, Text } from "@once-ui-system/core";
import { useState } from "react";

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
  recurrenceWeight: number;
  baseCAC: number;
  saturationClients: number;
  cacSlope: number;
};

const segments: SegmentProfile[] = [
  {
    id: "psicologas",
    label: "Psicologas e terapeutas",
    note: "Modelo com recorrencia relevante quando agenda e posicionamento estao organizados.",
    saturationNote: "Costuma segurar bem ate cerca de 18 novos clientes por mes antes de perder eficiencia.",
    defaults: { price: 220, cost: 35, sales: 38, fixed: 4500 },
    recurrenceWeight: 0.95,
    baseCAC: 85,
    saturationClients: 18,
    cacSlope: 0.44,
  },
  {
    id: "advogados",
    label: "Advogados e escritorios",
    note: "Captacao mais cara, com fechamento menos imediato e maior peso de filtro comercial.",
    saturationNote: "O ponto de saturacao costuma aparecer mais cedo, perto de 7 novos clientes por mes.",
    defaults: { price: 900, cost: 120, sales: 12, fixed: 8500 },
    recurrenceWeight: 0.28,
    baseCAC: 280,
    saturationClients: 7,
    cacSlope: 0.7,
  },
  {
    id: "corretores",
    label: "Corretores de imoveis",
    note: "Ticket alto, mas com oscilacao maior de fechamento e menos previsibilidade mensal.",
    saturationNote: "Normalmente o modelo satura cedo, por volta de 4 novos clientes por mes.",
    defaults: { price: 3500, cost: 450, sales: 4, fixed: 12000 },
    recurrenceWeight: 0.18,
    baseCAC: 420,
    saturationClients: 4,
    cacSlope: 0.84,
  },
  {
    id: "clinicas",
    label: "Clinicas de saude",
    note: "Quando agenda e atendimento melhoram, recorrencia e indicacao costumam subir junto.",
    saturationNote: "O modelo tende a manter eficiencia por mais tempo, ate perto de 26 novos clientes por mes.",
    defaults: { price: 260, cost: 70, sales: 70, fixed: 9000 },
    recurrenceWeight: 0.78,
    baseCAC: 95,
    saturationClients: 26,
    cacSlope: 0.5,
  },
  {
    id: "estetica",
    label: "Saloes, beleza e estetica",
    note: "Modelo em que pequenos ajustes costumam impactar agenda e retorno relativamente rapido.",
    saturationNote: "Em geral aguenta bem ate 34 novos clientes por mes antes do CAC acelerar mais.",
    defaults: { price: 180, cost: 45, sales: 90, fixed: 7000 },
    recurrenceWeight: 0.68,
    baseCAC: 60,
    saturationClients: 34,
    cacSlope: 0.46,
  },
  {
    id: "lojas",
    label: "Lojas locais e e-commerce",
    note: "A margem pode apertar mais rapido, por isso marketing exige mais cuidado com custo e repeticao de compra.",
    saturationNote: "O ponto de saturacao costuma chegar depois, mas a margem por cliente e mais sensivel.",
    defaults: { price: 140, cost: 85, sales: 160, fixed: 10000 },
    recurrenceWeight: 0.36,
    baseCAC: 32,
    saturationClients: 120,
    cacSlope: 0.58,
  },
] as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function percentLabel(value: number, prefix = "+") {
  return `${prefix}${value}%`;
}

function getAdjustedCAC(clientTarget: number, segment: SegmentProfile) {
  if (clientTarget <= segment.saturationClients) {
    return segment.baseCAC;
  }

  const over = clientTarget / segment.saturationClients - 1;
  const multiplier = 1 + over * segment.cacSlope + over * over * 0.42;
  return segment.baseCAC * multiplier;
}

function estimateMarketingNeed(
  targetNetGain: number,
  pricePerClient: number,
  contributionPerSale: number,
  recurrenceFactor: number,
  segment: SegmentProfile,
) {
  if (targetNetGain <= 0 || contributionPerSale <= 0 || pricePerClient <= 0) {
    return null;
  }

  const effectiveRevenuePerClient = pricePerClient * recurrenceFactor;
  const effectiveContributionPerClient = contributionPerSale * recurrenceFactor;
  const maxClients = Math.max(segment.saturationClients * 10, 60);

  for (let clients = 0.1; clients <= maxClients; clients += 0.1) {
    const adjustedCAC = getAdjustedCAC(clients, segment);
    const investment = clients * adjustedCAC;
    const contributionGenerated = clients * effectiveContributionPerClient;
    const netGenerated = contributionGenerated - investment;

    if (netGenerated >= targetNetGain) {
      return {
        clients,
        adjustedCAC,
        investment,
        contributionGenerated,
        netGenerated,
        grossRevenueGenerated: clients * effectiveRevenuePerClient,
        saturationRatio: clients / segment.saturationClients,
      };
    }
  }

  return null;
}

type GrowthSimulatorProps = {
  servicesHref: string;
  contactHref: string;
};

export function GrowthSimulator({ servicesHref, contactHref }: GrowthSimulatorProps) {
  const firstSegment = segments[0];

  const [segmentId, setSegmentId] = useState(firstSegment.id);
  const [priceInput, setPriceInput] = useState(String(firstSegment.defaults.price));
  const [costInput, setCostInput] = useState(String(firstSegment.defaults.cost));
  const [salesInput, setSalesInput] = useState(String(firstSegment.defaults.sales));
  const [fixedInput, setFixedInput] = useState(String(firstSegment.defaults.fixed));

  const [salesLift, setSalesLift] = useState(12);
  const [priceLift, setPriceLift] = useState(6);
  const [costDrop, setCostDrop] = useState(5);
  const [recurrenceLift, setRecurrenceLift] = useState(8);

  const segment = segments.find((item) => item.id === segmentId) ?? firstSegment;

  const currentPrice = Math.max(0, Number(priceInput) || 0);
  const currentCost = Math.max(0, Number(costInput) || 0);
  const currentSales = Math.max(0, Number(salesInput) || 0);
  const currentFixed = Math.max(0, Number(fixedInput) || 0);

  const currentContribution = currentPrice - currentCost;
  const currentRevenue = currentPrice * currentSales;
  const currentGross = currentContribution * currentSales;
  const currentNet = currentGross - currentFixed;
  const currentBreakEvenSales =
    currentContribution > 0 ? currentFixed / currentContribution : Number.POSITIVE_INFINITY;

  const salesBoostFactor = salesLift / 100;
  const priceBoostFactor = priceLift / 100;
  const costDropFactor = costDrop / 100;
  const recurrenceBoostFactor = recurrenceLift / 100;
  const recurrenceSalesGain = currentSales * recurrenceBoostFactor * segment.recurrenceWeight;

  const improvedSales = currentSales * (1 + salesBoostFactor) + recurrenceSalesGain;
  const improvedPrice = currentPrice * (1 + priceBoostFactor);
  const improvedCost = currentCost * (1 - costDropFactor);
  const improvedContribution = improvedPrice - improvedCost;
  const improvedRevenue = improvedPrice * improvedSales;
  const improvedGross = improvedContribution * improvedSales;
  const improvedNet = improvedGross - currentFixed;
  const deltaRevenue = improvedRevenue - currentRevenue;
  const deltaNet = improvedNet - currentNet;
  const improvedBreakEvenSales =
    improvedContribution > 0 ? currentFixed / improvedContribution : Number.POSITIVE_INFINITY;

  const recurrenceFactorForMarketing = 1 + recurrenceBoostFactor * segment.recurrenceWeight;
  const marketingNeed = estimateMarketingNeed(
    Math.max(0, deltaNet),
    improvedPrice,
    improvedContribution,
    recurrenceFactorForMarketing,
    segment,
  );

  const blockedByMargin = improvedContribution <= 0;
  const grossReturnPerReal =
    marketingNeed && marketingNeed.investment > 0
      ? marketingNeed.grossRevenueGenerated / marketingNeed.investment
      : 0;
  const marginReturnPerReal =
    marketingNeed && marketingNeed.investment > 0
      ? marketingNeed.contributionGenerated / marketingNeed.investment
      : 0;

  function applySegmentDefaults(nextId: string) {
    const nextSegment = segments.find((item) => item.id === nextId) ?? firstSegment;
    setSegmentId(nextSegment.id);
    setPriceInput(String(nextSegment.defaults.price));
    setCostInput(String(nextSegment.defaults.cost));
    setSalesInput(String(nextSegment.defaults.sales));
    setFixedInput(String(nextSegment.defaults.fixed));
  }

  return (
    <section className={styles.root}>
      <div className={styles.layout}>
        <div className={styles.steps}>
          <article className={styles.stepPanel}>
            <div className={styles.stepHeader}>
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Etapa 1
              </Tag>
              <Heading as="h2" variant="heading-strong-l">
                Base atual do negocio
              </Heading>
              <Text onBackground="neutral-weak">
                Preco, custo, vendas e custos fixos para entender o ponto atual antes de falar em marketing.
              </Text>
            </div>

            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Modelo de negocio</span>
                <select
                  className={styles.select}
                  value={segmentId}
                  onChange={(event) => applySegmentDefaults(event.target.value)}
                >
                  {segments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Preco medio atual</span>
                <input
                  className={styles.input}
                  inputMode="numeric"
                  min="0"
                  step="10"
                  type="number"
                  value={priceInput}
                  onChange={(event) => setPriceInput(event.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Custo por venda atual</span>
                <input
                  className={styles.input}
                  inputMode="numeric"
                  min="0"
                  step="10"
                  type="number"
                  value={costInput}
                  onChange={(event) => setCostInput(event.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Vendas por mes</span>
                <input
                  className={styles.input}
                  inputMode="numeric"
                  min="0"
                  step="1"
                  type="number"
                  value={salesInput}
                  onChange={(event) => setSalesInput(event.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Custos fixos mensais</span>
                <input
                  className={styles.input}
                  inputMode="numeric"
                  min="0"
                  step="100"
                  type="number"
                  value={fixedInput}
                  onChange={(event) => setFixedInput(event.target.value)}
                />
              </label>
            </div>

            <div className={styles.metricGrid}>
              <div className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Receita atual
                </Text>
                <Text variant="heading-strong-s">{formatCurrency(currentRevenue)}</Text>
              </div>
              <div className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Margem por venda
                </Text>
                <Text variant="heading-strong-s">{formatCurrency(currentContribution)}</Text>
              </div>
              <div className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Resultado mensal
                </Text>
                <Text variant="heading-strong-s">{formatCurrency(currentNet)}</Text>
              </div>
              <div className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Ponto de equilibrio
                </Text>
                <Text variant="heading-strong-s">
                  {Number.isFinite(currentBreakEvenSales) ? `${formatNumber(currentBreakEvenSales)} vendas` : "Margem negativa"}
                </Text>
              </div>
            </div>
          </article>

          <article className={styles.stepPanel}>
            <div className={styles.stepHeader}>
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Etapa 2
              </Tag>
              <Heading as="h2" variant="heading-strong-l">
                O que pequenos ajustes mudam
              </Heading>
              <Text onBackground="neutral-weak">
                A ideia aqui e testar o efeito combinado de vender um pouco mais, precificar melhor, comprar melhor e aumentar recorrencia.
              </Text>
            </div>

            <div className={styles.sliderList}>
              <label className={styles.sliderField}>
                <div className={styles.sliderHead}>
                  <span className={styles.fieldLabel}>+ vendas</span>
                  <span className={styles.sliderValue}>{percentLabel(salesLift)}</span>
                </div>
                <input
                  className={styles.range}
                  max="40"
                  min="0"
                  step="1"
                  type="range"
                  value={salesLift}
                  onChange={(event) => setSalesLift(Number(event.target.value))}
                />
              </label>

              <label className={styles.sliderField}>
                <div className={styles.sliderHead}>
                  <span className={styles.fieldLabel}>+ preco</span>
                  <span className={styles.sliderValue}>{percentLabel(priceLift)}</span>
                </div>
                <input
                  className={styles.range}
                  max="25"
                  min="0"
                  step="1"
                  type="range"
                  value={priceLift}
                  onChange={(event) => setPriceLift(Number(event.target.value))}
                />
              </label>

              <label className={styles.sliderField}>
                <div className={styles.sliderHead}>
                  <span className={styles.fieldLabel}>- custo</span>
                  <span className={styles.sliderValue}>{percentLabel(costDrop, "-")}</span>
                </div>
                <input
                  className={styles.range}
                  max="20"
                  min="0"
                  step="1"
                  type="range"
                  value={costDrop}
                  onChange={(event) => setCostDrop(Number(event.target.value))}
                />
              </label>

              <label className={styles.sliderField}>
                <div className={styles.sliderHead}>
                  <span className={styles.fieldLabel}>+ recorrencia</span>
                  <span className={styles.sliderValue}>{percentLabel(recurrenceLift)}</span>
                </div>
                <input
                  className={styles.range}
                  max="30"
                  min="0"
                  step="1"
                  type="range"
                  value={recurrenceLift}
                  onChange={(event) => setRecurrenceLift(Number(event.target.value))}
                />
              </label>
            </div>

            <div className={styles.metricGrid}>
              <div className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Receita com ajustes
                </Text>
                <Text variant="heading-strong-s">{formatCurrency(improvedRevenue)}</Text>
              </div>
              <div className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Resultado com ajustes
                </Text>
                <Text variant="heading-strong-s">{formatCurrency(improvedNet)}</Text>
              </div>
              <div className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Ganho mensal
                </Text>
                <Text variant="heading-strong-s">{formatCurrency(deltaNet)}</Text>
              </div>
              <div className={styles.metricCard}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Vendas extras totais
                </Text>
                <Text variant="heading-strong-s">{formatNumber(improvedSales - currentSales)}</Text>
              </div>
            </div>

            <div className={styles.noteBlock}>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Novo preco medio: {formatCurrency(improvedPrice)} | novo custo por venda: {formatCurrency(improvedCost)}.
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Novo ponto de equilibrio: {Number.isFinite(improvedBreakEvenSales) ? `${formatNumber(improvedBreakEvenSales)} vendas` : "margem ainda negativa"}.
              </Text>
            </div>
          </article>
        </div>

        <aside className={styles.resultPanel}>
          <div className={styles.stepHeader}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Etapa 3
            </Tag>
            <Heading as="h2" variant="heading-strong-l">
              Quanto o marketing precisaria retornar
            </Heading>
            <Text onBackground="neutral-weak">
              Aqui a conta considera aumento proporcional de CAC e perda de eficiencia depois do ponto de saturacao do modelo.
            </Text>
          </div>

          {blockedByMargin ? (
            <div className={styles.warningCard}>
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Antes do marketing
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                A margem por venda ainda esta negativa.
              </Heading>
              <Text onBackground="neutral-weak">
                Se o preco medio nao cobre o custo variavel, investir em marketing acelera a perda. Primeiro precisa ajustar oferta, preco ou custo.
              </Text>
            </div>
          ) : !marketingNeed ? (
            <div className={styles.warningCard}>
              <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                Limite do modelo
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                O marketing nao fecha a conta nesse cenario.
              </Heading>
              <Text onBackground="neutral-weak">
                Com a margem atual e o ganho desejado, o CAC sobe antes de o investimento se pagar. Vale fortalecer mais o passo 2 antes de empurrar midia.
              </Text>
            </div>
          ) : (
            <>
              <div className={styles.resultHero}>
                <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                  Retorno bruto mensal necessario
                </Text>
                <div className={styles.resultPill}>{formatCurrency(marketingNeed.grossRevenueGenerated)}</div>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Para bater o ganho mensal de {formatCurrency(deltaNet)} gerado pelos ajustes do passo 2.
                </Text>
              </div>

              <div className={styles.resultMetricGrid}>
                <div className={styles.resultMetric}>
                  <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                    Investimento estimado
                  </Text>
                  <Text variant="heading-strong-s">{formatCurrency(marketingNeed.investment)}</Text>
                </div>
                <div className={styles.resultMetric}>
                  <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                    Novos clientes necessarios
                  </Text>
                  <Text variant="heading-strong-s">{formatNumber(marketingNeed.clients)}/mes</Text>
                </div>
                <div className={styles.resultMetric}>
                  <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                    CAC ajustado
                  </Text>
                  <Text variant="heading-strong-s">{formatCurrency(marketingNeed.adjustedCAC)}</Text>
                </div>
                <div className={styles.resultMetric}>
                  <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                    Retorno bruto por R$1
                  </Text>
                  <Text variant="heading-strong-s">{formatNumber(grossReturnPerReal)}x</Text>
                </div>
                <div className={styles.resultMetric}>
                  <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                    Margem por R$1
                  </Text>
                  <Text variant="heading-strong-s">{formatNumber(marginReturnPerReal)}x</Text>
                </div>
                <div className={styles.resultMetric}>
                  <Text className={styles.metricLabel} variant="label-default-s" onBackground="neutral-weak">
                    Ponto de saturacao
                  </Text>
                  <Text variant="heading-strong-s">{formatNumber(segment.saturationClients)} clientes/mes</Text>
                </div>
              </div>
            </>
          )}

          <div className={styles.noteBlock}>
            <Tag size="s" background="neutral-alpha-weak">
              Leitura direcional
            </Tag>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {segment.note}
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {segment.saturationNote}
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              O marketing aqui precisa competir com o ganho de caixa do passo 2, nao apenas gerar faturamento bruto.
            </Text>
          </div>

          <div className={styles.actions}>
            <Button href={contactHref} variant="primary" size="m" prefixIcon="whatsapp">
              Levar essa leitura para uma conversa
            </Button>
            <Button href={servicesHref} variant="secondary" size="m" arrowIcon>
              Ver servicos
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
