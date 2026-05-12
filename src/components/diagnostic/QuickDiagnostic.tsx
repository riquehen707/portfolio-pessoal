"use client";

import { Button, Heading, Input, Tag, Text } from "@once-ui-system/core";
import { useState } from "react";

import styles from "./QuickDiagnostic.module.scss";

type ProjectionCategory = {
  id: string;
  title: string;
  audienceLabel: string;
  value90d: number;
  cpl: {
    low: number;
    mid: number;
    high: number;
  };
  closeRate: {
    low: number;
    mid: number;
    high: number;
  };
  referenceRevenue: number;
  minimumAdBudget: number;
  valueLabel: string;
  readinessBias: number;
};

type ScenarioConfig = {
  id: string;
  label: string;
  tone: string;
  cpl: keyof ProjectionCategory["cpl"];
  closeRate: keyof ProjectionCategory["closeRate"];
  efficiencyOffset: number;
};

const categories: ProjectionCategory[] = [
  {
    id: "psicologas",
    title: "Psicologas",
    audienceLabel: "novas pacientes",
    value90d: 1200,
    cpl: { low: 24, mid: 34, high: 48 },
    closeRate: { low: 0.07, mid: 0.1, high: 0.13 },
    referenceRevenue: 12000,
    minimumAdBudget: 1200,
    valueLabel: "ticket medio em 90 dias por paciente",
    readinessBias: 0.94,
  },
  {
    id: "advogados",
    title: "Advogados",
    audienceLabel: "novos casos",
    value90d: 4200,
    cpl: { low: 48, mid: 72, high: 108 },
    closeRate: { low: 0.035, mid: 0.055, high: 0.075 },
    referenceRevenue: 25000,
    minimumAdBudget: 1800,
    valueLabel: "ticket medio em 90 dias por caso fechado",
    readinessBias: 0.92,
  },
  {
    id: "corretores",
    title: "Corretores de imoveis",
    audienceLabel: "fechamentos",
    value90d: 9000,
    cpl: { low: 42, mid: 64, high: 96 },
    closeRate: { low: 0.015, mid: 0.025, high: 0.038 },
    referenceRevenue: 30000,
    minimumAdBudget: 2500,
    valueLabel: "receita media em 90 dias por fechamento",
    readinessBias: 0.9,
  },
  {
    id: "estetica",
    title: "Clinicas de estetica",
    audienceLabel: "novos procedimentos",
    value90d: 1800,
    cpl: { low: 18, mid: 28, high: 42 },
    closeRate: { low: 0.08, mid: 0.12, high: 0.16 },
    referenceRevenue: 18000,
    minimumAdBudget: 1500,
    valueLabel: "ticket medio em 90 dias por cliente",
    readinessBias: 0.98,
  },
  {
    id: "dentistas",
    title: "Dentistas",
    audienceLabel: "novos tratamentos",
    value90d: 2600,
    cpl: { low: 30, mid: 45, high: 68 },
    closeRate: { low: 0.06, mid: 0.09, high: 0.12 },
    referenceRevenue: 22000,
    minimumAdBudget: 1800,
    valueLabel: "ticket medio em 90 dias por paciente",
    readinessBias: 0.95,
  },
  {
    id: "consultores",
    title: "Consultores e especialistas",
    audienceLabel: "novos contratos",
    value90d: 5600,
    cpl: { low: 40, mid: 62, high: 94 },
    closeRate: { low: 0.03, mid: 0.05, high: 0.07 },
    referenceRevenue: 20000,
    minimumAdBudget: 1600,
    valueLabel: "ticket medio em 90 dias por contrato",
    readinessBias: 0.93,
  },
] as const;

const scenarios: ScenarioConfig[] = [
  {
    id: "conservative",
    label: "Conservador",
    tone: "Mais cautela no fechamento e no custo por lead.",
    cpl: "high",
    closeRate: "low",
    efficiencyOffset: -0.06,
  },
  {
    id: "expected",
    label: "Esperado",
    tone: "Cenario base para uma operacao bem executada.",
    cpl: "mid",
    closeRate: "mid",
    efficiencyOffset: 0,
  },
  {
    id: "accelerated",
    label: "Acelerado",
    tone: "Midia e atendimento acima da media.",
    cpl: "low",
    closeRate: "high",
    efficiencyOffset: 0.07,
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseCurrencyInput(value: string) {
  const normalized = value.replace(/[^\d.,]/g, "").replace(/\.(?=.*\.)/g, "").replace(",", ".");
  const numeric = Number(normalized);

  return Number.isFinite(numeric) ? numeric : 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCount(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: value < 10 ? 1 : 0,
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);
}

function buildWhatsappLink(base: string, text: string) {
  const separator = base.includes("?") ? "&" : "?";

  return `${base}${separator}text=${encodeURIComponent(text)}`;
}

function getBudgetSignal(profile: ProjectionCategory, adBudget: number, totalBudget: number) {
  if (adBudget < profile.minimumAdBudget) {
    return {
      label: "Verba curta",
      description: `Para ${profile.title.toLowerCase()}, a leitura costuma ficar mais estavel a partir de ${formatCurrency(profile.minimumAdBudget)} por mes em anuncios.`,
    };
  }

  if (totalBudget <= adBudget * 1.15) {
    return {
      label: "Estrutura apertada",
      description:
        "Voce esta comprando atencao com pouca margem para pagina, criativo, CRM e acompanhamento.",
    };
  }

  if (totalBudget >= adBudget * 1.7) {
    return {
      label: "Base equilibrada",
      description:
        "Existe espaco para combinar anuncios com estrutura comercial e marketing de suporte.",
    };
  }

  return {
    label: "Leitura neutra",
    description: "Ha verba para midia, mas o resultado ainda depende bastante da conversao da operacao.",
  };
}

type QuickDiagnosticProps = {
  whatsappHref: string;
  productsHref: string;
};

export function QuickDiagnostic({ whatsappHref, productsHref }: QuickDiagnosticProps) {
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [currentRevenue, setCurrentRevenue] = useState("12000");
  const [adsBudget, setAdsBudget] = useState("1800");
  const [marketingBudget, setMarketingBudget] = useState("3200");

  const profile = categories.find((item) => item.id === categoryId) ?? categories[0];
  const currentRevenueValue = parseCurrencyInput(currentRevenue);
  const adsBudgetValue = parseCurrencyInput(adsBudget);
  const rawMarketingBudgetValue = parseCurrencyInput(marketingBudget);
  const totalMarketingBudget = Math.max(rawMarketingBudgetValue, adsBudgetValue);
  const supportBudget = Math.max(totalMarketingBudget - adsBudgetValue, 0);
  const supportShare = totalMarketingBudget > 0 ? supportBudget / totalMarketingBudget : 0;
  const revenueReadiness = clamp(currentRevenueValue / profile.referenceRevenue, 0.55, 1.35);
  const adsScale = clamp(adsBudgetValue / profile.minimumAdBudget, 0.55, 1.3);
  const leadEfficiency = clamp(
    profile.readinessBias + (revenueReadiness - 1) * 0.16 + (adsScale - 1) * 0.12 + supportShare * 0.16,
    0.72,
    1.24,
  );
  const conversionEfficiency = clamp(
    0.88 + (revenueReadiness - 1) * 0.18 + supportShare * 0.22,
    0.76,
    1.18,
  );

  const projections = scenarios.map((scenario) => {
    const effectiveLeadFactor = clamp(leadEfficiency + scenario.efficiencyOffset, 0.68, 1.3);
    const effectiveConversionFactor = clamp(
      conversionEfficiency + scenario.efficiencyOffset * 0.9,
      0.72,
      1.24,
    );
    const costPerLead = profile.cpl[scenario.cpl] / effectiveLeadFactor;
    const conversionRate = clamp(
      profile.closeRate[scenario.closeRate] * effectiveConversionFactor,
      0.01,
      0.22,
    );
    const leads = adsBudgetValue > 0 ? adsBudgetValue / costPerLead : 0;
    const wins = leads * conversionRate;
    const gain90d = wins * profile.value90d;
    const monthlyLift = gain90d / 3;
    const projectedRevenue = currentRevenueValue + monthlyLift;
    const investment90d = totalMarketingBudget * 3;
    const roas = investment90d > 0 ? gain90d / investment90d : 0;

    return {
      ...scenario,
      costPerLead,
      leads,
      wins,
      gain90d,
      monthlyLift,
      projectedRevenue,
      roas,
    };
  });

  const expectedProjection = projections[1];
  const budgetSignal = getBudgetSignal(profile, adsBudgetValue, totalMarketingBudget);
  const closingRange = `${Math.round(profile.closeRate.low * 100)}% - ${Math.round(profile.closeRate.high * 100)}%`;
  const leadRange = `${formatCurrency(profile.cpl.low)} - ${formatCurrency(profile.cpl.high)}`;

  const whatsappMessage = buildWhatsappLink(
    whatsappHref,
    [
      "Ola, Henrique.",
      "Usei o simulador de crescimento.",
      `Categoria: ${profile.title}.`,
      `Faturamento atual: ${formatCurrency(currentRevenueValue)} por mes.`,
      `Anuncios: ${formatCurrency(adsBudgetValue)} por mes.`,
      `Marketing total: ${formatCurrency(totalMarketingBudget)} por mes.`,
      `Projecao esperada: ${formatCurrency(expectedProjection.projectedRevenue)} por mes e ${formatCurrency(expectedProjection.gain90d)} em 90 dias.`,
      "Quero transformar isso em um plano real.",
    ].join(" "),
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text className={styles.eyebrow} variant="body-default-s" onBackground="neutral-weak">
          Entrada simples
        </Text>
        <Heading as="h2" variant="heading-strong-l">
          Preencha quatro campos e veja a leitura de 90 dias.
        </Heading>
        <Text onBackground="neutral-weak" variant="body-default-m">
          O simulador parte do seu caixa atual e da verba mensal disponivel. O resto fica visivel
          no painel de resultado.
        </Text>
      </div>

      <div className={styles.layout}>
        <section className={styles.formPanel}>
          <div className={styles.fieldGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="projection-category">
                Categoria do servico
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="projection-category"
                  className={styles.select}
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                >
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="projection-revenue">
                Faturamento mensal atual
              </label>
              <Input
                id="projection-revenue"
                inputMode="decimal"
                min="0"
                name="currentRevenue"
                placeholder="12000"
                step="100"
                type="number"
                value={currentRevenue}
                onChange={(event) => setCurrentRevenue(event.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="projection-ads-budget">
                Orcamento mensal para anuncios
              </label>
              <Input
                id="projection-ads-budget"
                inputMode="decimal"
                min="0"
                name="adsBudget"
                placeholder="1800"
                step="100"
                type="number"
                value={adsBudget}
                onChange={(event) => setAdsBudget(event.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="projection-marketing-budget">
                Orcamento mensal total para marketing e anuncios
              </label>
              <Input
                id="projection-marketing-budget"
                inputMode="decimal"
                min="0"
                name="marketingBudget"
                placeholder="3200"
                step="100"
                type="number"
                value={marketingBudget}
                onChange={(event) => setMarketingBudget(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.noteBox}>
            <Text className={styles.noteTitle} variant="body-default-s">
              {budgetSignal.label}
            </Text>
            <Text onBackground="neutral-weak" variant="body-default-s">
              {budgetSignal.description}
            </Text>
            {rawMarketingBudgetValue < adsBudgetValue && (
              <Text onBackground="neutral-weak" variant="body-default-s">
                Como a verba total nao pode ser menor que a verba de anuncios, a simulacao usou {formatCurrency(totalMarketingBudget)} como total mensal.
              </Text>
            )}
          </div>
        </section>

        <aside className={styles.resultPanel} aria-live="polite">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Resultado esperado
          </Tag>

          <Heading as="h3" className={styles.summaryTitle} variant="display-strong-xs">
            {formatCurrency(expectedProjection.projectedRevenue)} por mes no cenario esperado.
          </Heading>

          <Text className={styles.summaryLead} onBackground="neutral-weak" variant="body-default-m">
            Isso representa um ganho bruto estimado de {formatCurrency(expectedProjection.gain90d)} em 90 dias, com base no segmento escolhido e na verba mensal informada.
          </Text>

          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <Text className={styles.fieldLabel} variant="body-default-s">
                Faturamento atual
              </Text>
              <Text className={styles.summaryValue} variant="heading-strong-l">
                {formatCurrency(currentRevenueValue)}
              </Text>
            </div>

            <div className={styles.summaryItem}>
              <Text className={styles.fieldLabel} variant="body-default-s">
                Ganho mensal estimado
              </Text>
              <Text className={styles.summaryValue} variant="heading-strong-l">
                {formatCurrency(expectedProjection.monthlyLift)}
              </Text>
            </div>

            <div className={styles.summaryItem}>
              <Text className={styles.fieldLabel} variant="body-default-s">
                Novos {profile.audienceLabel}
              </Text>
              <Text className={styles.summaryValue} variant="heading-strong-l">
                {formatCount(expectedProjection.wins)}/mes
              </Text>
            </div>

            <div className={styles.summaryItem}>
              <Text className={styles.fieldLabel} variant="body-default-s">
                ROAS bruto
              </Text>
              <Text className={styles.summaryValue} variant="heading-strong-l">
                {expectedProjection.roas.toFixed(1)}x
              </Text>
            </div>
          </div>

          <Text className={styles.inlineMeta} onBackground="neutral-weak" variant="body-default-s">
            Base usada para {profile.title.toLowerCase()}: {profile.valueLabel} de {formatCurrency(profile.value90d)}, CPL entre {leadRange} e fechamento entre {closingRange}.
          </Text>

          <div className={styles.scenarioList}>
            {projections.map((scenario) => (
              <div className={styles.scenarioRow} key={scenario.id}>
                <div className={styles.scenarioCopy}>
                  <Text className={styles.fieldLabel} variant="body-default-s">
                    {scenario.label}
                  </Text>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    {scenario.tone}
                  </Text>
                </div>

                <div className={styles.scenarioValue}>
                  <Text variant="body-default-m">{formatCurrency(scenario.gain90d)}</Text>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    90 dias
                  </Text>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <Button href={whatsappMessage} variant="primary" size="m" arrowIcon>
              Quero transformar isso em plano
            </Button>

            <Button href={productsHref} variant="secondary" size="m" arrowIcon>
              Ver produtos e pacotes
            </Button>

            <Button
              type="button"
              variant="tertiary"
              size="s"
              onClick={() => {
                setCategoryId(categories[0].id);
                setCurrentRevenue("12000");
                setAdsBudget("1800");
                setMarketingBudget("3200");
              }}
            >
              Voltar ao exemplo inicial
            </Button>
          </div>

          <Text className={styles.helper} onBackground="neutral-weak" variant="body-default-s">
            Isso e uma estimativa. O numero final depende de oferta, pagina, criativo, velocidade de resposta e capacidade de atendimento.
          </Text>
        </aside>
      </div>
    </div>
  );
}
