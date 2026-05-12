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
  cycleLabel: string;
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
    cycleLabel: "ciclo curto com recorrencia moderada",
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
    cycleLabel: "ciclo comercial consultivo e mais lento",
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
    cycleLabel: "ciclo longo com ticket alto por fechamento",
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
    cycleLabel: "ciclo rapido com recompra e retorno",
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
    cycleLabel: "ciclo medio com decisao apoiada por confianca",
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
    cycleLabel: "ciclo consultivo com fechamento por autoridade",
    valueLabel: "ticket medio em 90 dias por contrato",
    readinessBias: 0.93,
  },
] as const;

const scenarios: ScenarioConfig[] = [
  {
    id: "conservative",
    label: "Conservador",
    tone: "Menos eficiencia, mais cautela na previsao.",
    cpl: "high",
    closeRate: "low",
    efficiencyOffset: -0.06,
  },
  {
    id: "expected",
    label: "Esperado",
    tone: "Leitura central para um mes operacional bem executado.",
    cpl: "mid",
    closeRate: "mid",
    efficiencyOffset: 0,
  },
  {
    id: "accelerated",
    label: "Acelerado",
    tone: "Midia, oferta e atendimento funcionando acima da media.",
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
      label: "Verba curta para ganhar tracao",
      description: `Para ${profile.title.toLowerCase()}, a leitura costuma ficar mais consistente a partir de ${formatCurrency(profile.minimumAdBudget)} por mes em anuncios.`,
    };
  }

  if (totalBudget <= adBudget * 1.15) {
    return {
      label: "Midia quase sem apoio estrutural",
      description:
        "Voce esta comprando cliques com pouco espaco para landing page, criativo, CRM e follow-up. A projecao fica mais sensivel a falhas na conversao.",
    };
  }

  if (totalBudget >= adBudget * 1.7) {
    return {
      label: "Base mais forte para crescer",
      description:
        "Existe margem para combinar anuncios com estrutura comercial, pagina e acompanhamento. Isso tende a reduzir vazamento entre lead e fechamento.",
    };
  }

  return {
    label: "Base equilibrada",
    description:
      "Ha verba para midia e algum suporte operacional. O ganho real agora depende da clareza da oferta e do atendimento.",
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
    const netGain = gain90d - investment90d;

    return {
      ...scenario,
      costPerLead,
      conversionRate,
      leads,
      wins,
      gain90d,
      monthlyLift,
      projectedRevenue,
      roas,
      netGain,
    };
  });

  const expectedProjection = projections[1];
  const budgetSignal = getBudgetSignal(profile, adsBudgetValue, totalMarketingBudget);

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
        <div className={styles.headerCopy}>
          <Text className={styles.eyebrow} variant="body-default-s" onBackground="neutral-weak">
            Categoria + caixa + verba mensal
          </Text>
          <Heading as="h2" variant="heading-strong-l">
            Simulador de crescimento em 90 dias
          </Heading>
        </div>

        <div className={styles.headerRail}>
          <span className={styles.headerPill}>{profile.title}</span>
          <span className={styles.headerPill}>{profile.cycleLabel}</span>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.formColumn}>
          <section className={styles.formPanel}>
            <div className={styles.sectionTop}>
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Entradas
              </Tag>
              <Text onBackground="neutral-weak" variant="body-default-s">
                Ajuste os numeros abaixo para ver quanto a operacao pode ganhar com uma base minima de marketing.
              </Text>
            </div>

            <div className={styles.formGrid}>
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

            <div className={styles.signalBox}>
              <Text className={styles.signalLabel} variant="body-default-s">
                Leitura do orcamento
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {budgetSignal.label}
              </Heading>
              <Text onBackground="neutral-weak" variant="body-default-s">
                {budgetSignal.description}
              </Text>
              {rawMarketingBudgetValue < adsBudgetValue && (
                <Text onBackground="neutral-weak" variant="body-default-s">
                  Como a verba total nao pode ser menor que a verba de anuncios, a simulacao considerou o total de marketing igual a {formatCurrency(totalMarketingBudget)}.
                </Text>
              )}
            </div>
          </section>

          <section className={styles.assumptionPanel}>
            <div className={styles.sectionTop}>
              <Tag size="s" background="neutral-alpha-weak">
                Premissas da categoria
              </Tag>
            </div>

            <div className={styles.assumptionGrid}>
              <div className={styles.assumptionCard}>
                <Text className={styles.metricLabel} variant="body-default-s">
                  Valor capturado
                </Text>
                <Text className={styles.metricValue} variant="heading-strong-l">
                  {formatCurrency(profile.value90d)}
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {profile.valueLabel}
                </Text>
              </div>

              <div className={styles.assumptionCard}>
                <Text className={styles.metricLabel} variant="body-default-s">
                  Faixa de CPL
                </Text>
                <Text className={styles.metricValue} variant="heading-strong-l">
                  {formatCurrency(profile.cpl.low)} - {formatCurrency(profile.cpl.high)}
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  custo por lead usado na simulacao
                </Text>
              </div>

              <div className={styles.assumptionCard}>
                <Text className={styles.metricLabel} variant="body-default-s">
                  Fechamento
                </Text>
                <Text className={styles.metricValue} variant="heading-strong-l">
                  {Math.round(profile.closeRate.low * 100)}% - {Math.round(profile.closeRate.high * 100)}%
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  lead para {profile.audienceLabel}
                </Text>
              </div>

              <div className={styles.assumptionCard}>
                <Text className={styles.metricLabel} variant="body-default-s">
                  Piso recomendado
                </Text>
                <Text className={styles.metricValue} variant="heading-strong-l">
                  {formatCurrency(profile.minimumAdBudget)}
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  verba mensal minima para anuncios
                </Text>
              </div>
            </div>
          </section>
        </div>

        <aside className={styles.summaryPanel} aria-live="polite">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Projecao esperada
          </Tag>

          <Heading as="h3" className={styles.summaryTitle} variant="display-strong-xs">
            {formatCurrency(expectedProjection.projectedRevenue)} por mes se a operacao sustentar o ritmo esperado.
          </Heading>

          <Text onBackground="neutral-weak" variant="body-default-m">
            A leitura parte do seu faturamento atual, da categoria escolhida e da combinacao entre verba de midia e verba total de marketing.
          </Text>

          <div className={styles.metricGrid}>
            <div className={styles.metricCard}>
              <Text className={styles.metricLabel} variant="body-default-s">
                Faturamento atual
              </Text>
              <Text className={styles.metricValue} variant="heading-strong-l">
                {formatCurrency(currentRevenueValue)}
              </Text>
            </div>

            <div className={styles.metricCard}>
              <Text className={styles.metricLabel} variant="body-default-s">
                Ganho mensal estimado
              </Text>
              <Text className={styles.metricValue} variant="heading-strong-l">
                {formatCurrency(expectedProjection.monthlyLift)}
              </Text>
            </div>

            <div className={styles.metricCard}>
              <Text className={styles.metricLabel} variant="body-default-s">
                Ganho bruto em 90 dias
              </Text>
              <Text className={styles.metricValue} variant="heading-strong-l">
                {formatCurrency(expectedProjection.gain90d)}
              </Text>
            </div>

            <div className={styles.metricCard}>
              <Text className={styles.metricLabel} variant="body-default-s">
                ROAS bruto em 90 dias
              </Text>
              <Text className={styles.metricValue} variant="heading-strong-l">
                {expectedProjection.roas.toFixed(1)}x
              </Text>
            </div>
          </div>

          <div className={styles.scenarioList}>
            {projections.map((scenario) => (
              <article className={styles.scenarioCard} key={scenario.id}>
                <div className={styles.scenarioTop}>
                  <div>
                    <Text className={styles.scenarioLabel} variant="body-default-s">
                      {scenario.label}
                    </Text>
                    <Heading as="h4" variant="heading-strong-m">
                      {formatCurrency(scenario.gain90d)} em 90 dias
                    </Heading>
                  </div>
                  <span className={styles.scenarioChip}>{scenario.id === "expected" ? "base" : scenario.id === "conservative" ? "cautela" : "tracao"}</span>
                </div>

                <Text onBackground="neutral-weak" variant="body-default-s">
                  {scenario.tone}
                </Text>

                <div className={styles.scenarioMeta}>
                  <div>
                    <Text className={styles.metricLabel} variant="body-default-s">
                      Leads/mes
                    </Text>
                    <Text variant="body-default-s">{formatCount(scenario.leads)}</Text>
                  </div>
                  <div>
                    <Text className={styles.metricLabel} variant="body-default-s">
                      {profile.audienceLabel}
                    </Text>
                    <Text variant="body-default-s">{formatCount(scenario.wins)}</Text>
                  </div>
                  <div>
                    <Text className={styles.metricLabel} variant="body-default-s">
                      CPL efetivo
                    </Text>
                    <Text variant="body-default-s">{formatCurrency(scenario.costPerLead)}</Text>
                  </div>
                  <div>
                    <Text className={styles.metricLabel} variant="body-default-s">
                      Resultado liquido 90d
                    </Text>
                    <Text variant="body-default-s">{formatCurrency(scenario.netGain)}</Text>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.summaryActions}>
            <Button href={whatsappMessage} variant="primary" size="m" arrowIcon>
              Quero transformar essa projecao em plano
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
            Isso e uma estimativa, nao uma promessa. O numero final depende de oferta, pagina, criativo, velocidade de resposta e capacidade de atendimento.
          </Text>
        </aside>
      </div>
    </div>
  );
}
