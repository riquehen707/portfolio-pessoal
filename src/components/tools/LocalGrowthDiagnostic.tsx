"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button, Card, Column, Grid, Heading, Row, Tag, Text } from "@once-ui-system/core";

import styles from "./LocalGrowthDiagnostic.module.scss";

type SegmentKey =
  | "clinica-estetica"
  | "estetica"
  | "salao"
  | "podologia"
  | "harmonizacao"
  | "barbearia";

type FormState = {
  companyName: string;
  logoUrl: string;
  city: string;
  segment: SegmentKey;
  averageTicket: string;
  monthlyCapacity: string;
  currentClients: string;
  returnRate: string;
  noShowRate: string;
  clientBase: string;
  currentRevenue: string;
  servicesSummary: string;
  followers: string;
  monthlyReach: string;
  monthlyEngagement: string;
  profileVisits: string;
  linkClicks: string;
  messagesReceived: string;
  postsPerMonth: string;
  reelsViews: string;
  followerGrowthRate: string;
  googleReviews: string;
  googleRating: string;
  googleProfileViews: string;
  routeClicks: string;
  callClicks: string;
  siteClicks: string;
  photoCount: string;
  localRank: string;
  nearbyCompetitors: string;
  monthlyBudget: string;
  cpc: string;
  cpm: string;
  ctr: string;
  cpl: string;
  paidLeads: string;
  leadToClientRate: string;
  platformAudience: string;
  geoRadiusKm: string;
  population: string;
  averageIncome: string;
  dominantAge: string;
  urbanDensity: "baixa" | "media" | "alta";
  targetAudienceSize: string;
  relatedSearchVolume: string;
  seasonalityIndex: string;
  localCompetitionScore: string;
};

type SegmentBenchmark = {
  averageTicket: number;
  monthlyCapacity: number;
  currentClients: number;
  returnRatePct: number;
  noShowRatePct: number;
  clientBase: number;
  followers: number;
  reachFactor: number;
  engagementRate: number;
  profileVisitRate: number;
  linkClickRate: number;
  messageRate: number;
  postsPerMonth: number;
  reelsViews: number;
  followerGrowthRatePct: number;
  googleReviews: number;
  googleRating: number;
  googleProfileViews: number;
  routeClickRate: number;
  callClickRate: number;
  siteClickRate: number;
  photoCount: number;
  localRank: number;
  nearbyCompetitors: number;
  monthlyBudget: number;
  cpc: number;
  cpm: number;
  ctrPct: number;
  cpl: number;
  paidLeads: number;
  leadToClientRatePct: number;
  platformAudience: number;
  geoRadiusKm: number;
  population: number;
  averageIncome: number;
  targetAudienceShare: number;
  relatedSearchShare: number;
  seasonalityIndexPct: number;
  localCompetitionScore: number;
  monthlyNeedRate: number;
  peoplePerCompetitor: number;
  baseCaptureRate: number;
  reviewCollectionRate: number;
  recurringVisitsPerYear: number;
};

type FieldDefinition = {
  key: keyof FormState;
  label: string;
  type?: "text" | "number" | "select";
  description?: string;
  placeholder?: string;
  step?: number;
  min?: number;
  options?: Array<{ value: string; label: string }>;
};

const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const seasonalityWave = [0.94, 0.97, 1, 1.03, 1.08, 1.1, 1.06, 1.02, 0.99, 0.96, 0.94, 0.98];

const segmentOptions: Array<{ value: SegmentKey; label: string }> = [
  { value: "clinica-estetica", label: "Clínica de estética" },
  { value: "estetica", label: "Estética / esteticista" },
  { value: "salao", label: "Salão de beleza" },
  { value: "podologia", label: "Podologia" },
  { value: "harmonizacao", label: "Harmonização facial" },
  { value: "barbearia", label: "Barbearia" },
];

const segmentBenchmarks: Record<SegmentKey, SegmentBenchmark> = {
  "clinica-estetica": {
    averageTicket: 340,
    monthlyCapacity: 140,
    currentClients: 62,
    returnRatePct: 36,
    noShowRatePct: 9,
    clientBase: 420,
    followers: 3200,
    reachFactor: 3.2,
    engagementRate: 0.058,
    profileVisitRate: 0.036,
    linkClickRate: 0.22,
    messageRate: 0.28,
    postsPerMonth: 16,
    reelsViews: 1800,
    followerGrowthRatePct: 3.8,
    googleReviews: 64,
    googleRating: 4.7,
    googleProfileViews: 2100,
    routeClickRate: 0.055,
    callClickRate: 0.032,
    siteClickRate: 0.084,
    photoCount: 42,
    localRank: 5,
    nearbyCompetitors: 14,
    monthlyBudget: 1800,
    cpc: 2.35,
    cpm: 22,
    ctrPct: 1.8,
    cpl: 24,
    paidLeads: 76,
    leadToClientRatePct: 24,
    platformAudience: 52000,
    geoRadiusKm: 7,
    population: 180000,
    averageIncome: 2200,
    targetAudienceShare: 0.17,
    relatedSearchShare: 0.064,
    seasonalityIndexPct: 100,
    localCompetitionScore: 58,
    monthlyNeedRate: 0.024,
    peoplePerCompetitor: 950,
    baseCaptureRate: 0.082,
    reviewCollectionRate: 0.045,
    recurringVisitsPerYear: 4.2,
  },
  estetica: {
    averageTicket: 260,
    monthlyCapacity: 150,
    currentClients: 70,
    returnRatePct: 34,
    noShowRatePct: 10,
    clientBase: 380,
    followers: 2900,
    reachFactor: 3,
    engagementRate: 0.061,
    profileVisitRate: 0.037,
    linkClickRate: 0.23,
    messageRate: 0.3,
    postsPerMonth: 18,
    reelsViews: 1600,
    followerGrowthRatePct: 4.1,
    googleReviews: 46,
    googleRating: 4.6,
    googleProfileViews: 1750,
    routeClickRate: 0.05,
    callClickRate: 0.026,
    siteClickRate: 0.075,
    photoCount: 35,
    localRank: 6,
    nearbyCompetitors: 16,
    monthlyBudget: 1500,
    cpc: 2.1,
    cpm: 20,
    ctrPct: 1.7,
    cpl: 22,
    paidLeads: 68,
    leadToClientRatePct: 22,
    platformAudience: 48000,
    geoRadiusKm: 6,
    population: 160000,
    averageIncome: 2100,
    targetAudienceShare: 0.16,
    relatedSearchShare: 0.058,
    seasonalityIndexPct: 100,
    localCompetitionScore: 61,
    monthlyNeedRate: 0.022,
    peoplePerCompetitor: 880,
    baseCaptureRate: 0.078,
    reviewCollectionRate: 0.041,
    recurringVisitsPerYear: 3.8,
  },
  salao: {
    averageTicket: 170,
    monthlyCapacity: 220,
    currentClients: 118,
    returnRatePct: 44,
    noShowRatePct: 7,
    clientBase: 520,
    followers: 4100,
    reachFactor: 2.8,
    engagementRate: 0.049,
    profileVisitRate: 0.031,
    linkClickRate: 0.18,
    messageRate: 0.24,
    postsPerMonth: 20,
    reelsViews: 1450,
    followerGrowthRatePct: 3.2,
    googleReviews: 88,
    googleRating: 4.7,
    googleProfileViews: 2600,
    routeClickRate: 0.058,
    callClickRate: 0.03,
    siteClickRate: 0.071,
    photoCount: 54,
    localRank: 4,
    nearbyCompetitors: 19,
    monthlyBudget: 1300,
    cpc: 1.7,
    cpm: 18,
    ctrPct: 2.1,
    cpl: 18,
    paidLeads: 74,
    leadToClientRatePct: 28,
    platformAudience: 68000,
    geoRadiusKm: 5,
    population: 220000,
    averageIncome: 2300,
    targetAudienceShare: 0.2,
    relatedSearchShare: 0.072,
    seasonalityIndexPct: 100,
    localCompetitionScore: 66,
    monthlyNeedRate: 0.032,
    peoplePerCompetitor: 1200,
    baseCaptureRate: 0.074,
    reviewCollectionRate: 0.038,
    recurringVisitsPerYear: 6.4,
  },
  podologia: {
    averageTicket: 220,
    monthlyCapacity: 110,
    currentClients: 44,
    returnRatePct: 27,
    noShowRatePct: 8,
    clientBase: 260,
    followers: 1700,
    reachFactor: 2.6,
    engagementRate: 0.047,
    profileVisitRate: 0.029,
    linkClickRate: 0.19,
    messageRate: 0.25,
    postsPerMonth: 12,
    reelsViews: 900,
    followerGrowthRatePct: 2.6,
    googleReviews: 31,
    googleRating: 4.8,
    googleProfileViews: 1240,
    routeClickRate: 0.067,
    callClickRate: 0.041,
    siteClickRate: 0.081,
    photoCount: 24,
    localRank: 5,
    nearbyCompetitors: 8,
    monthlyBudget: 900,
    cpc: 1.95,
    cpm: 19,
    ctrPct: 1.6,
    cpl: 21,
    paidLeads: 36,
    leadToClientRatePct: 29,
    platformAudience: 21000,
    geoRadiusKm: 8,
    population: 100000,
    averageIncome: 2400,
    targetAudienceShare: 0.11,
    relatedSearchShare: 0.045,
    seasonalityIndexPct: 100,
    localCompetitionScore: 44,
    monthlyNeedRate: 0.014,
    peoplePerCompetitor: 1350,
    baseCaptureRate: 0.088,
    reviewCollectionRate: 0.052,
    recurringVisitsPerYear: 3.2,
  },
  harmonizacao: {
    averageTicket: 720,
    monthlyCapacity: 74,
    currentClients: 26,
    returnRatePct: 18,
    noShowRatePct: 6,
    clientBase: 150,
    followers: 3600,
    reachFactor: 3.4,
    engagementRate: 0.063,
    profileVisitRate: 0.041,
    linkClickRate: 0.26,
    messageRate: 0.33,
    postsPerMonth: 14,
    reelsViews: 2200,
    followerGrowthRatePct: 4.5,
    googleReviews: 39,
    googleRating: 4.8,
    googleProfileViews: 1560,
    routeClickRate: 0.048,
    callClickRate: 0.024,
    siteClickRate: 0.082,
    photoCount: 38,
    localRank: 5,
    nearbyCompetitors: 12,
    monthlyBudget: 2400,
    cpc: 3.1,
    cpm: 29,
    ctrPct: 1.5,
    cpl: 31,
    paidLeads: 54,
    leadToClientRatePct: 18,
    platformAudience: 44000,
    geoRadiusKm: 9,
    population: 170000,
    averageIncome: 2700,
    targetAudienceShare: 0.09,
    relatedSearchShare: 0.052,
    seasonalityIndexPct: 100,
    localCompetitionScore: 57,
    monthlyNeedRate: 0.011,
    peoplePerCompetitor: 1450,
    baseCaptureRate: 0.084,
    reviewCollectionRate: 0.049,
    recurringVisitsPerYear: 1.9,
  },
  barbearia: {
    averageTicket: 95,
    monthlyCapacity: 260,
    currentClients: 140,
    returnRatePct: 51,
    noShowRatePct: 5,
    clientBase: 610,
    followers: 2200,
    reachFactor: 2.4,
    engagementRate: 0.044,
    profileVisitRate: 0.024,
    linkClickRate: 0.14,
    messageRate: 0.19,
    postsPerMonth: 15,
    reelsViews: 1100,
    followerGrowthRatePct: 2.8,
    googleReviews: 74,
    googleRating: 4.7,
    googleProfileViews: 1980,
    routeClickRate: 0.054,
    callClickRate: 0.028,
    siteClickRate: 0.05,
    photoCount: 30,
    localRank: 4,
    nearbyCompetitors: 18,
    monthlyBudget: 1100,
    cpc: 1.4,
    cpm: 16,
    ctrPct: 2.3,
    cpl: 14,
    paidLeads: 70,
    leadToClientRatePct: 34,
    platformAudience: 56000,
    geoRadiusKm: 4,
    population: 180000,
    averageIncome: 2100,
    targetAudienceShare: 0.19,
    relatedSearchShare: 0.06,
    seasonalityIndexPct: 100,
    localCompetitionScore: 63,
    monthlyNeedRate: 0.038,
    peoplePerCompetitor: 1400,
    baseCaptureRate: 0.072,
    reviewCollectionRate: 0.035,
    recurringVisitsPerYear: 8.1,
  },
};

const initialState: FormState = {
  companyName: "",
  logoUrl: "",
  city: "",
  segment: "clinica-estetica",
  averageTicket: "",
  monthlyCapacity: "",
  currentClients: "",
  returnRate: "",
  noShowRate: "",
  clientBase: "",
  currentRevenue: "",
  servicesSummary: "",
  followers: "",
  monthlyReach: "",
  monthlyEngagement: "",
  profileVisits: "",
  linkClicks: "",
  messagesReceived: "",
  postsPerMonth: "",
  reelsViews: "",
  followerGrowthRate: "",
  googleReviews: "",
  googleRating: "",
  googleProfileViews: "",
  routeClicks: "",
  callClicks: "",
  siteClicks: "",
  photoCount: "",
  localRank: "",
  nearbyCompetitors: "",
  monthlyBudget: "",
  cpc: "",
  cpm: "",
  ctr: "",
  cpl: "",
  paidLeads: "",
  leadToClientRate: "",
  platformAudience: "",
  geoRadiusKm: "",
  population: "",
  averageIncome: "",
  dominantAge: "",
  urbanDensity: "media",
  targetAudienceSize: "",
  relatedSearchVolume: "",
  seasonalityIndex: "",
  localCompetitionScore: "",
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function parseNumber(value: string) {
  if (!value.trim()) return undefined;
  const normalized = Number(value.replace(",", "."));
  return Number.isFinite(normalized) ? normalized : undefined;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits }).format(value);
}

function formatPercent(value: number) {
  return `${formatNumber(value * 100, 1)}%`;
}

function compact(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

type ScenarioConfig = {
  acquisitionMultiplier: number;
  retentionLift: number;
  saturationPressure: number;
  organicLift: number;
  paidLift: number;
  googleLift: number;
  reviewLift: number;
  refreshRelief: number;
  closeLift: number;
};

const scenarioConfigs: Record<"current" | "conservative" | "realistic" | "aggressive", ScenarioConfig> = {
  current: {
    acquisitionMultiplier: 0.82,
    retentionLift: 0,
    saturationPressure: 1.05,
    organicLift: 0.35,
    paidLift: 1,
    googleLift: 0.45,
    reviewLift: 0.75,
    refreshRelief: 0.1,
    closeLift: 0,
  },
  conservative: {
    acquisitionMultiplier: 0.96,
    retentionLift: 0.03,
    saturationPressure: 0.95,
    organicLift: 0.72,
    paidLift: 1.04,
    googleLift: 0.8,
    reviewLift: 1,
    refreshRelief: 0.45,
    closeLift: 0.02,
  },
  realistic: {
    acquisitionMultiplier: 1.14,
    retentionLift: 0.06,
    saturationPressure: 0.84,
    organicLift: 1.04,
    paidLift: 1.12,
    googleLift: 1.08,
    reviewLift: 1.16,
    refreshRelief: 0.72,
    closeLift: 0.04,
  },
  aggressive: {
    acquisitionMultiplier: 1.34,
    retentionLift: 0.1,
    saturationPressure: 1.08,
    organicLift: 1.3,
    paidLift: 1.28,
    googleLift: 1.24,
    reviewLift: 1.3,
    refreshRelief: 1.02,
    closeLift: 0.06,
  },
};

function createFieldSections(benchmark: SegmentBenchmark) {
  const companyFields: FieldDefinition[] = [
    { key: "companyName", label: "Nome da empresa", placeholder: "Ex: Tereza Cristina" },
    { key: "logoUrl", label: "Logo (URL)", placeholder: "https://..." },
    { key: "city", label: "Cidade / região", placeholder: "Ex: Salvador / BA" },
    {
      key: "segment",
      label: "Segmento",
      type: "select",
      options: segmentOptions.map((item) => ({ value: item.value, label: item.label })),
    },
    {
      key: "averageTicket",
      label: "Ticket médio (R$)",
      type: "number",
      step: 1,
      placeholder: String(benchmark.averageTicket),
    },
    {
      key: "monthlyCapacity",
      label: "Capacidade mensal de atendimento",
      type: "number",
      step: 1,
      placeholder: String(benchmark.monthlyCapacity),
    },
    {
      key: "currentClients",
      label: "Clientes atuais por mês",
      type: "number",
      step: 1,
      placeholder: String(benchmark.currentClients),
    },
    {
      key: "returnRate",
      label: "Taxa média de retorno (%)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.returnRatePct),
    },
    {
      key: "noShowRate",
      label: "Taxa de faltas / no-show (%)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.noShowRatePct),
    },
    {
      key: "clientBase",
      label: "Base de clientes existente",
      type: "number",
      step: 1,
      placeholder: String(benchmark.clientBase),
    },
    {
      key: "currentRevenue",
      label: "Faturamento estimado atual (R$)",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.currentClients * benchmark.averageTicket),
    },
    {
      key: "servicesSummary",
      label: "Serviços principais",
      placeholder: "Ex: limpeza de pele, botox, micropigmentação",
    },
  ];

  const socialFields: FieldDefinition[] = [
    {
      key: "followers",
      label: "Seguidores atuais",
      type: "number",
      step: 1,
      placeholder: String(benchmark.followers),
    },
    {
      key: "monthlyReach",
      label: "Alcance mensal",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.followers * benchmark.reachFactor),
    },
    {
      key: "monthlyEngagement",
      label: "Engajamento mensal",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.followers * benchmark.reachFactor * benchmark.engagementRate),
    },
    {
      key: "profileVisits",
      label: "Visitas ao perfil",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.followers * benchmark.reachFactor * benchmark.profileVisitRate),
    },
    {
      key: "linkClicks",
      label: "Cliques no link",
      type: "number",
      step: 1,
      placeholder: formatNumber(
        benchmark.followers *
          benchmark.reachFactor *
          benchmark.profileVisitRate *
          benchmark.linkClickRate,
      ),
    },
    {
      key: "messagesReceived",
      label: "Mensagens recebidas",
      type: "number",
      step: 1,
      placeholder: formatNumber(
        benchmark.followers *
          benchmark.reachFactor *
          benchmark.profileVisitRate *
          benchmark.linkClickRate *
          benchmark.messageRate,
      ),
    },
    {
      key: "postsPerMonth",
      label: "Frequência de postagens / mês",
      type: "number",
      step: 1,
      placeholder: String(benchmark.postsPerMonth),
    },
    {
      key: "reelsViews",
      label: "Visualizações médias de reels",
      type: "number",
      step: 1,
      placeholder: String(benchmark.reelsViews),
    },
    {
      key: "followerGrowthRate",
      label: "Taxa de crescimento de seguidores (%)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.followerGrowthRatePct),
    },
  ];

  const googleFields: FieldDefinition[] = [
    {
      key: "googleReviews",
      label: "Avaliações Google",
      type: "number",
      step: 1,
      placeholder: String(benchmark.googleReviews),
    },
    {
      key: "googleRating",
      label: "Nota média",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.googleRating),
    },
    {
      key: "googleProfileViews",
      label: "Visualizações do perfil Google",
      type: "number",
      step: 1,
      placeholder: String(benchmark.googleProfileViews),
    },
    {
      key: "routeClicks",
      label: "Cliques em rota",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.googleProfileViews * benchmark.routeClickRate),
    },
    {
      key: "callClicks",
      label: "Cliques em ligação",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.googleProfileViews * benchmark.callClickRate),
    },
    {
      key: "siteClicks",
      label: "Cliques no site / WhatsApp",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.googleProfileViews * benchmark.siteClickRate),
    },
    {
      key: "photoCount",
      label: "Quantidade de fotos",
      type: "number",
      step: 1,
      placeholder: String(benchmark.photoCount),
    },
    {
      key: "localRank",
      label: "Ranking local estimado",
      type: "number",
      step: 1,
      placeholder: String(benchmark.localRank),
    },
    {
      key: "nearbyCompetitors",
      label: "Quantidade de concorrentes próximos",
      type: "number",
      step: 1,
      placeholder: String(benchmark.nearbyCompetitors),
    },
  ];

  const adsFields: FieldDefinition[] = [
    {
      key: "monthlyBudget",
      label: "Orçamento mensal (R$)",
      type: "number",
      step: 1,
      placeholder: String(benchmark.monthlyBudget),
    },
    {
      key: "cpc",
      label: "CPC médio (R$)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.cpc),
    },
    {
      key: "cpm",
      label: "CPM médio (R$)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.cpm),
    },
    {
      key: "ctr",
      label: "CTR (%)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.ctrPct),
    },
    {
      key: "cpl",
      label: "CPL (R$)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.cpl),
    },
    {
      key: "paidLeads",
      label: "Leads gerados",
      type: "number",
      step: 1,
      placeholder: String(benchmark.paidLeads),
    },
    {
      key: "leadToClientRate",
      label: "Taxa de conversão lead → cliente (%)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.leadToClientRatePct),
    },
    {
      key: "platformAudience",
      label: "Público estimado da plataforma",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.platformAudience),
    },
    {
      key: "geoRadiusKm",
      label: "Raio geográfico (km)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.geoRadiusKm),
    },
  ];

  const marketFields: FieldDefinition[] = [
    {
      key: "population",
      label: "População local",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.population),
    },
    {
      key: "averageIncome",
      label: "Renda média (R$)",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.averageIncome),
    },
    {
      key: "dominantAge",
      label: "Faixa etária predominante",
      placeholder: "Ex: 25 a 44 anos",
    },
    {
      key: "urbanDensity",
      label: "Densidade urbana",
      type: "select",
      options: [
        { value: "baixa", label: "Baixa" },
        { value: "media", label: "Média" },
        { value: "alta", label: "Alta" },
      ],
    },
    {
      key: "targetAudienceSize",
      label: "Tamanho estimado do público-alvo",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.population * benchmark.targetAudienceShare),
    },
    {
      key: "relatedSearchVolume",
      label: "Volume de buscas por serviços relacionados",
      type: "number",
      step: 1,
      placeholder: formatNumber(benchmark.population * benchmark.relatedSearchShare),
    },
    {
      key: "seasonalityIndex",
      label: "Sazonalidade de demanda (%)",
      type: "number",
      step: 0.1,
      placeholder: String(benchmark.seasonalityIndexPct),
    },
    {
      key: "localCompetitionScore",
      label: "Concorrência local (0 a 100)",
      type: "number",
      step: 1,
      min: 0,
      placeholder: String(benchmark.localCompetitionScore),
    },
  ];

  return [
    {
      id: "empresa",
      title: "Dados da empresa cliente",
      description: "Base operacional e comercial do negócio.",
      fields: companyFields,
    },
    {
      id: "instagram",
      title: "Instagram / redes sociais",
      description: "Alcance, engajamento e sinais de entrada orgânica.",
      fields: socialFields,
    },
    {
      id: "google",
      title: "Google / presença local",
      description: "Reputação, ranking local e ações de alta intenção.",
      fields: googleFields,
    },
    {
      id: "ads",
      title: "Tráfego pago / anúncios",
      description: "Aquisição paga, eficiência comercial e mídia.",
      fields: adsFields,
    },
    {
      id: "mercado",
      title: "Dados públicos de mercado",
      description: "Demanda, contexto local e concorrência.",
      fields: marketFields,
    },
  ];
}

export function LocalGrowthDiagnostic() {
  const [form, setForm] = useState<FormState>(initialState);

  const benchmark = segmentBenchmarks[form.segment];
  const sections = createFieldSections(benchmark);

  const model = useMemo(() => {
    const fallbackItems: Array<{ label: string; value: string }> = [];

    const resolveNumber = (value: string, fallback: number, label: string) => {
      const parsed = parseNumber(value);
      if (parsed !== undefined) return parsed;
      fallbackItems.push({ label, value: formatNumber(fallback, fallback % 1 === 0 ? 0 : 1) });
      return fallback;
    };

    const resolvePercent = (value: string, fallbackPct: number, label: string) => {
      const parsed = parseNumber(value);
      if (parsed !== undefined) return parsed / 100;
      fallbackItems.push({ label, value: `${formatNumber(fallbackPct, 1)}%` });
      return fallbackPct / 100;
    };

    const averageTicket = resolveNumber(form.averageTicket, benchmark.averageTicket, "Ticket médio");
    const monthlyCapacity = Math.max(
      1,
      resolveNumber(form.monthlyCapacity, benchmark.monthlyCapacity, "Capacidade mensal"),
    );
    const currentClients = resolveNumber(form.currentClients, benchmark.currentClients, "Clientes atuais por mês");
    const returnRate = clamp(
      resolvePercent(form.returnRate, benchmark.returnRatePct, "Taxa média de retorno"),
      0.05,
      0.95,
    );
    const noShowRate = clamp(
      resolvePercent(form.noShowRate, benchmark.noShowRatePct, "Taxa de no-show"),
      0,
      0.4,
    );
    const clientBase = resolveNumber(form.clientBase, benchmark.clientBase, "Base de clientes");
    const currentRevenue = resolveNumber(
      form.currentRevenue,
      currentClients * averageTicket,
      "Faturamento estimado atual",
    );
    const followers = resolveNumber(form.followers, benchmark.followers, "Seguidores atuais");
    const monthlyReach = resolveNumber(
      form.monthlyReach,
      followers * benchmark.reachFactor,
      "Alcance mensal",
    );
    const monthlyEngagement = resolveNumber(
      form.monthlyEngagement,
      monthlyReach * benchmark.engagementRate,
      "Engajamento mensal",
    );
    const profileVisits = resolveNumber(
      form.profileVisits,
      monthlyReach * benchmark.profileVisitRate,
      "Visitas ao perfil",
    );
    const linkClicks = resolveNumber(
      form.linkClicks,
      profileVisits * benchmark.linkClickRate,
      "Cliques no link",
    );
    const messagesReceived = resolveNumber(
      form.messagesReceived,
      linkClicks * benchmark.messageRate,
      "Mensagens recebidas",
    );
    const postsPerMonth = resolveNumber(
      form.postsPerMonth,
      benchmark.postsPerMonth,
      "Frequência de postagens",
    );
    const reelsViews = resolveNumber(
      form.reelsViews,
      benchmark.reelsViews,
      "Visualizações médias de reels",
    );
    const followerGrowthRate = clamp(
      resolvePercent(
        form.followerGrowthRate,
        benchmark.followerGrowthRatePct,
        "Crescimento de seguidores",
      ),
      0,
      0.3,
    );
    const googleReviews = resolveNumber(
      form.googleReviews,
      benchmark.googleReviews,
      "Avaliações Google",
    );
    const googleRating = clamp(
      resolveNumber(form.googleRating, benchmark.googleRating, "Nota média Google"),
      1,
      5,
    );
    const googleProfileViews = resolveNumber(
      form.googleProfileViews,
      benchmark.googleProfileViews,
      "Visualizações do perfil Google",
    );
    const routeClicks = resolveNumber(
      form.routeClicks,
      googleProfileViews * benchmark.routeClickRate,
      "Cliques em rota",
    );
    const callClicks = resolveNumber(
      form.callClicks,
      googleProfileViews * benchmark.callClickRate,
      "Cliques em ligação",
    );
    const siteClicks = resolveNumber(
      form.siteClicks,
      googleProfileViews * benchmark.siteClickRate,
      "Cliques no site/WhatsApp",
    );
    const photoCount = resolveNumber(form.photoCount, benchmark.photoCount, "Quantidade de fotos");
    const localRank = clamp(resolveNumber(form.localRank, benchmark.localRank, "Ranking local"), 1, 20);
    const nearbyCompetitors = Math.max(
      1,
      resolveNumber(
        form.nearbyCompetitors,
        benchmark.nearbyCompetitors,
        "Concorrentes próximos",
      ),
    );
    const monthlyBudget = Math.max(
      0,
      resolveNumber(form.monthlyBudget, benchmark.monthlyBudget, "Orçamento mensal"),
    );
    const cpc = Math.max(0.2, resolveNumber(form.cpc, benchmark.cpc, "CPC médio"));
    const cpm = Math.max(1, resolveNumber(form.cpm, benchmark.cpm, "CPM médio"));
    const ctr = clamp(resolvePercent(form.ctr, benchmark.ctrPct, "CTR"), 0.002, 0.25);
    const cpl = Math.max(1, resolveNumber(form.cpl, benchmark.cpl, "CPL"));
    const paidLeads = Math.max(
      0,
      resolveNumber(
        form.paidLeads,
        monthlyBudget > 0 ? monthlyBudget / cpl : benchmark.paidLeads,
        "Leads gerados",
      ),
    );
    const leadToClientRate = clamp(
      resolvePercent(
        form.leadToClientRate,
        benchmark.leadToClientRatePct,
        "Conversão lead → cliente",
      ),
      0.03,
      0.85,
    );
    const platformAudience = resolveNumber(
      form.platformAudience,
      benchmark.platformAudience,
      "Público estimado da plataforma",
    );
    const geoRadiusKm = Math.max(1, resolveNumber(form.geoRadiusKm, benchmark.geoRadiusKm, "Raio geográfico"));
    const population = resolveNumber(form.population, benchmark.population, "População local");
    const averageIncome = resolveNumber(form.averageIncome, benchmark.averageIncome, "Renda média");
    const targetAudienceSize = resolveNumber(
      form.targetAudienceSize,
      population * benchmark.targetAudienceShare,
      "Público-alvo estimado",
    );
    const relatedSearchVolume = resolveNumber(
      form.relatedSearchVolume,
      population * benchmark.relatedSearchShare,
      "Volume de buscas",
    );
    const seasonalityIndex = clamp(
      resolvePercent(form.seasonalityIndex, benchmark.seasonalityIndexPct, "Sazonalidade de demanda"),
      0.6,
      1.4,
    );
    const localCompetitionScore = clamp(
      resolveNumber(
        form.localCompetitionScore,
        benchmark.localCompetitionScore,
        "Concorrência local",
      ),
      0,
      100,
    );

    const urbanDensityMultiplier =
      form.urbanDensity === "alta" ? 1.08 : form.urbanDensity === "baixa" ? 0.93 : 1;

    const socialPresenceScore = clamp(
      (followers / benchmark.followers) * 18 +
        (monthlyReach / (benchmark.followers * benchmark.reachFactor)) * 28 +
        (monthlyEngagement / Math.max(monthlyReach, 1) / benchmark.engagementRate) * 22 +
        (messagesReceived / Math.max(benchmark.followers * 0.008, 1)) * 32,
      10,
      100,
    );

    const googlePresenceScore = clamp(
      (googleRating / 5) * 32 +
        (googleReviews / benchmark.googleReviews) * 24 +
        (googleProfileViews / benchmark.googleProfileViews) * 22 +
        ((11 - Math.min(localRank, 10)) / 10) * 22,
      8,
      100,
    );

    const adsPresenceScore = clamp(
      (monthlyBudget / Math.max(benchmark.monthlyBudget, 1)) * 26 +
        (benchmark.cpl / cpl) * 34 +
        ((leadToClientRate * 100) / benchmark.leadToClientRatePct) * 0.4,
      0,
      100,
    );

    const reputationScore = clamp(
      (googleRating / 5) * 56 +
        Math.min(googleReviews / Math.max(benchmark.googleReviews * 1.5, 1), 1.4) * 44,
      8,
      100,
    );

    const marketSaturation = clamp(
      (nearbyCompetitors / Math.max(targetAudienceSize / benchmark.peoplePerCompetitor, 1)) * 0.68 +
        (localCompetitionScore / 100) * 0.32 +
        (geoRadiusKm < benchmark.geoRadiusKm ? 0.05 : 0),
      0.08,
      0.95,
    );

    const searchDrivenDemand = relatedSearchVolume * 0.48;
    const populationDrivenDemand =
      targetAudienceSize * benchmark.monthlyNeedRate * seasonalityIndex * urbanDensityMultiplier;
    const estimatedLocalDemand =
      (searchDrivenDemand + populationDrivenDemand) * (1 - marketSaturation * 0.18);

    const digitalScore = clamp(
      socialPresenceScore * 0.28 +
        googlePresenceScore * 0.42 +
        adsPresenceScore * 0.15 +
        reputationScore * 0.15,
      0,
      100,
    );

    const captureRate = clamp(
      benchmark.baseCaptureRate + (digitalScore / 100) * 0.16 - marketSaturation * 0.08,
      0.03,
      0.32,
    );

    const instagramLeadPool =
      messagesReceived + linkClicks * 0.36 + profileVisits * 0.08 + monthlyEngagement * 0.02;
    const googleLeadPool = siteClicks * 0.55 + callClicks * 0.7 + routeClicks * 0.4;
    const totalLeadPool = instagramLeadPool + googleLeadPool + paidLeads;
    const currentRecurringClients = currentClients * returnRate;
    const acquisitionPotential = estimatedLocalDemand * captureRate;
    const newClientsFromChannels = totalLeadPool * leadToClientRate * (1 - noShowRate * 0.6);
    const baseProjectedClients = Math.min(
      monthlyCapacity,
      currentRecurringClients + Math.max(newClientsFromChannels, acquisitionPotential * 0.42),
    );

    const paidCustomers = Math.max(1, paidLeads * leadToClientRate * 0.92);
    const paidCAC = monthlyBudget > 0 ? monthlyBudget / paidCustomers : 0;
    const ltv = averageTicket * (1 + returnRate * benchmark.recurringVisitsPerYear);

    const buildScenario = (config: ScenarioConfig) => {
      let activeClients = currentClients;
      let followersCount = followers;
      let reviewsCount = googleReviews;
      let efficiency = clamp(1 - marketSaturation * 0.42, 0.38, 1);
      let cumulativeOrganicValue = 0;
      let rank = localRank;

      return monthLabels.map((month, index) => {
        const seasonalFactor = 1 + (seasonalityWave[index] - 1) * ((seasonalityIndex - 1) * 2);

        efficiency = clamp(
          efficiency - 0.016 * config.saturationPressure + 0.01 * config.refreshRelief,
          0.28,
          1.12,
        );

        followersCount =
          followersCount *
          (1 +
            ((followerGrowthRate + benchmark.followerGrowthRatePct / 100 / 2) *
              config.organicLift *
              efficiency) /
              12);

        const organicLeads =
          instagramLeadPool *
          (1 + index * 0.025 * config.organicLift) *
          seasonalFactor *
          clamp(1 - marketSaturation * 0.55, 0.45, 1.08) *
          efficiency;

        const paidLeadsProjected =
          paidLeads *
          config.paidLift *
          clamp(1 - index * 0.014 * config.saturationPressure * marketSaturation, 0.55, 1.08);

        const organicClients =
          organicLeads * clamp(leadToClientRate + config.closeLift, 0.05, 0.9) * (1 - noShowRate * 0.4);

        const paidClients =
          paidLeadsProjected *
          clamp(leadToClientRate + config.closeLift, 0.05, 0.9) *
          (1 - noShowRate * 0.55);

        const recurringClients = activeClients * clamp(returnRate + config.retentionLift, 0.08, 0.95);
        const marketOpportunity =
          acquisitionPotential *
          config.acquisitionMultiplier *
          seasonalFactor *
          clamp(1 - marketSaturation * 0.55, 0.45, 1.05);
        const availableSlots = Math.max(0, monthlyCapacity - recurringClients);
        const newClients = Math.min(
          availableSlots,
          organicClients + paidClients + marketOpportunity * 0.18,
        );

        activeClients = Math.min(monthlyCapacity, Math.max(currentClients * 0.7, recurringClients + newClients));
        const revenue = activeClients * averageTicket;
        const googleClicks =
          googleLeadPool *
          (1 + (reviewsCount / Math.max(benchmark.googleReviews * 10, 1)) * config.googleLift) *
          seasonalFactor *
          clamp(1 - marketSaturation * 0.25, 0.7, 1.08);
        reviewsCount += activeClients * benchmark.reviewCollectionRate * config.reviewLift;
        rank = clamp(
          rank - (0.22 * config.googleLift + reviewsCount / Math.max(benchmark.googleReviews * 220, 1)),
          1,
          20,
        );
        cumulativeOrganicValue += organicClients * averageTicket;

        const paidSpend = monthlyBudget * config.paidLift;
        const monthPaidCustomers = Math.max(1, paidClients);
        const cac = paidSpend > 0 ? paidSpend / monthPaidCustomers : 0;

        return {
          month,
          revenue,
          clients: activeClients,
          recurringClients,
          newClients,
          followers: followersCount,
          organicLeads,
          organicClients,
          organicValue: cumulativeOrganicValue,
          paidLeads: paidLeadsProjected,
          googleClicks,
          reviews: reviewsCount,
          rank,
          cac,
          efficiency: efficiency * 100,
          occupancy: (activeClients / monthlyCapacity) * 100,
          saturation: clamp((1 - efficiency) * 100 + marketSaturation * 40, 10, 100),
        };
      });
    };

    const currentScenario = buildScenario(scenarioConfigs.current);
    const conservativeScenario = buildScenario(scenarioConfigs.conservative);
    const realisticScenario = buildScenario(scenarioConfigs.realistic);
    const aggressiveScenario = buildScenario(scenarioConfigs.aggressive);

    const revenueProjectionData = monthLabels.map((month, index) => ({
      month,
      atual: currentScenario[index]?.revenue ?? currentRevenue,
      conservador: conservativeScenario[index]?.revenue ?? currentRevenue,
      realista: realisticScenario[index]?.revenue ?? currentRevenue,
      agressivo: aggressiveScenario[index]?.revenue ?? currentRevenue,
    }));

    const realisticMonthOne = realisticScenario[0];
    const realisticMonthTwelve = realisticScenario[11];

    const adImpressions = monthlyBudget > 0 ? (monthlyBudget / cpm) * 1000 : platformAudience * 0.14;
    const totalReach = monthlyReach + googleProfileViews + adImpressions;
    const totalClicks = linkClicks + siteClicks + callClicks + routeClicks + monthlyBudget / cpc;
    const funnelLeads = totalLeadPool;
    const funnelBookings = funnelLeads * clamp(leadToClientRate * 1.18, 0.05, 0.82);
    const funnelAttendance = funnelBookings * (1 - noShowRate);
    const funnelClosed = funnelAttendance * clamp(0.88 + scenarioConfigs.realistic.closeLift, 0.7, 0.99);
    const funnelRecurring = funnelClosed * clamp(returnRate + scenarioConfigs.realistic.retentionLift, 0.08, 0.95);

    const funnelData = [
      { stage: "Alcance", value: totalReach },
      { stage: "Cliques", value: totalClicks },
      { stage: "Leads", value: funnelLeads },
      { stage: "Agend.", value: funnelBookings },
      { stage: "Comparec.", value: funnelAttendance },
      { stage: "Fechados", value: funnelClosed },
      { stage: "Recorr.", value: funnelRecurring },
    ];

    const agendaData = [
      { name: "Capacidade total", value: monthlyCapacity },
      { name: "Ocupação atual", value: currentClients },
      { name: "Projeção realista", value: realisticMonthTwelve.clients },
    ];

    const organicGrowthData = realisticScenario.map((item) => ({
      month: item.month,
      seguidores: item.followers,
      leads: item.organicLeads,
      clientes: item.organicClients,
      valor: item.organicValue,
    }));

    const googleLocalData = realisticScenario.map((item) => ({
      month: item.month,
      avaliacoes: item.reviews,
      cliques: item.googleClicks,
      ranking: item.rank,
    }));

    const companyDemandShareScore = clamp((currentClients / Math.max(estimatedLocalDemand, 1)) * 220, 0, 100);
    const competitorReviewBaseline = clamp(
      52 + nearbyCompetitors * 1.4 + localCompetitionScore * 0.14,
      18,
      100,
    );
    const competitorPresenceBaseline = clamp(
      48 + localCompetitionScore * 0.3 + nearbyCompetitors * 1.1,
      20,
      95,
    );
    const competitorSocialBaseline = clamp(44 + nearbyCompetitors * 1.3, 18, 92);
    const competitorReputationBaseline = clamp(68 + localCompetitionScore * 0.18, 30, 96);
    const competitorDemandBaseline = clamp((1 - captureRate) * 90, 24, 96);

    const competitiveData = [
      {
        metric: "Avaliações",
        empresa: clamp((googleReviews / Math.max(benchmark.googleReviews * 1.4, 1)) * 100, 0, 100),
        concorrentes: competitorReviewBaseline,
      },
      {
        metric: "Presença digital",
        empresa: digitalScore,
        concorrentes: competitorPresenceBaseline,
      },
      {
        metric: "Redes sociais",
        empresa: socialPresenceScore,
        concorrentes: competitorSocialBaseline,
      },
      {
        metric: "Reputação",
        empresa: reputationScore,
        concorrentes: competitorReputationBaseline,
      },
      {
        metric: "Demanda capturada",
        empresa: companyDemandShareScore,
        concorrentes: competitorDemandBaseline,
      },
    ];

    const saturationData = realisticScenario.map((item) => ({
      month: item.month,
      eficiencia: item.efficiency,
      saturacao: item.saturation,
    }));

    const currentOccupancy = clamp(currentClients / monthlyCapacity, 0, 1);
    const projectedOccupancy = clamp(realisticMonthTwelve.clients / monthlyCapacity, 0, 1);
    const revenueGap = realisticMonthTwelve.revenue - currentRevenue;
    const retentionImpact =
      realisticScenario[11].recurringClients * averageTicket -
      currentScenario[11].recurringClients * averageTicket;

    const quickStats = [
      {
        label: "Faturamento atual",
        value: formatCurrency(currentRevenue),
        note: `${formatNumber(currentClients)} clientes/mês`,
      },
      {
        label: "Potencial local estimado",
        value: formatNumber(estimatedLocalDemand),
        note: "demanda/mês na região",
      },
      {
        label: "Cenário realista em 12 meses",
        value: formatCurrency(realisticMonthTwelve.revenue),
        note: `${formatPercent(projectedOccupancy)} da agenda ocupada`,
      },
      {
        label: "Aquisição potencial",
        value: formatNumber(baseProjectedClients),
        note: "clientes/mês com capacidade atual",
      },
    ];

    const insights: string[] = [];
    if (fallbackItems.length > 0) {
      insights.push(
        `${fallbackItems.length} campos estão usando benchmark do segmento porque não receberam dado real.`,
      );
    }
    if (noShowRate > 0.12) {
      insights.push("A taxa de no-show está alta e sozinha já reduz faturamento, previsibilidade e ocupação da agenda.");
    }
    if (returnRate < benchmark.returnRatePct / 100 - 0.05) {
      insights.push("A recorrência está abaixo do benchmark do nicho e pode estar segurando LTV, previsibilidade e caixa.");
    }
    if (googleRating < 4.6 || googleReviews < benchmark.googleReviews * 0.8) {
      insights.push("Google local ainda parece subaproveitado. Avaliações, fotos e ações do perfil podem melhorar demanda capturada.");
    }
    if (marketSaturation > 0.68) {
      insights.push("O mercado local está relativamente saturado. Sem renovação de oferta, criativo ou público, o CAC tende a subir.");
    }
    if (currentOccupancy < 0.7) {
      insights.push("Existe capacidade ociosa suficiente para crescer sem ampliar operação imediatamente.");
    }
    if (paidCAC > 0 && paidCAC > ltv * 0.35) {
      insights.push("O CAC pago está pressionado frente ao valor acumulado do cliente. Vale revisar criativo, oferta e retenção.");
    }

    const opportunities: string[] = [];
    if (projectedOccupancy > currentOccupancy + 0.12) {
      opportunities.push("Há espaço para aumentar ocupação de agenda com a estrutura atual antes de contratar mais capacidade.");
    }
    if (retentionImpact > 0) {
      opportunities.push(`Só a melhora de retenção adiciona cerca de ${formatCurrency(retentionImpact)} ao cenário de 12 meses.`);
    }
    if (googlePresenceScore < 72) {
      opportunities.push("Há oportunidade direta em Google local para capturar intenção alta com menor dependência de mídia.");
    }
    if (socialPresenceScore < 70) {
      opportunities.push("O orgânico ainda pode crescer com mais constância, prova social e chamadas mais orientadas a agendamento.");
    }
    if (baseProjectedClients < monthlyCapacity) {
      opportunities.push("A limitação principal não parece ser capacidade operacional neste momento, e sim captura e conversão.");
    }

    const suggestedPlan = [
      "Consolidar a base local: ficha Google, avaliações, fotos e roteiros de prova para aumentar cliques de alta intenção.",
      "Organizar o funil comercial: CTA, resposta, qualificação, agendamento e recuperação de no-show.",
      "Ligar mídia e operação: campanhas com segmentação local, criativos renováveis e leitura contínua de CAC, LTV e ocupação.",
    ];

    return {
      fallbackItems,
      averageTicket,
      monthlyCapacity,
      currentClients,
      returnRate,
      noShowRate,
      clientBase,
      currentRevenue,
      estimatedLocalDemand,
      marketSaturation,
      acquisitionPotential,
      baseProjectedClients,
      ltv,
      paidCAC,
      quickStats,
      revenueProjectionData,
      funnelData,
      agendaData,
      organicGrowthData,
      googleLocalData,
      competitiveData,
      saturationData,
      realisticMonthTwelve,
      projectedOccupancy,
      currentOccupancy,
      revenueGap,
      retentionImpact,
      insights,
      opportunities,
      suggestedPlan,
      socialPresenceScore,
      googlePresenceScore,
      reputationScore,
      digitalScore,
      companyDemandShareScore,
      segmentLabel: segmentOptions.find((item) => item.value === form.segment)?.label ?? form.segment,
      servicesSummary: form.servicesSummary.trim(),
      dominantAge: form.dominantAge.trim(),
      cityLabel: form.city.trim() || "Mercado local",
      companyName: form.companyName.trim() || "Empresa analisada",
      logoUrl: form.logoUrl.trim(),
      averageIncome,
      targetAudienceSize,
      relatedSearchVolume,
      localCompetitionScore,
      population,
    };
  }, [form, benchmark]);

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const reportDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Column className={styles.root} gap="24">
      <Grid className={styles.topGrid} columns="3" s={{ columns: 1 }} gap="16">
        {model.quickStats.map((item) => (
          <Card
            className={styles.statCard}
            key={item.label}
            direction="column"
            gap="8"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            fillHeight
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              {item.label}
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              {item.value}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {item.note}
            </Text>
          </Card>
        ))}
      </Grid>

      <Grid className={styles.layoutGrid} columns="3" s={{ columns: 1 }} gap="16">
        <Column className={styles.formColumn} gap="16" style={{ gridColumn: "span 2" }}>
          {sections.map((section) => (
            <Card
              className={styles.panel}
              key={section.id}
              direction="column"
              gap="16"
              paddingX="24"
              paddingY="24"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Column gap="8">
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  {section.title}
                </Text>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {section.description}
                </Text>
              </Column>

              <div className={styles.fieldGrid}>
                {section.fields.map((field) => (
                  <label className={styles.field} htmlFor={String(field.key)} key={String(field.key)}>
                    <span className={styles.fieldLabel}>{field.label}</span>
                    {field.description && (
                      <span className={styles.fieldDescription}>{field.description}</span>
                    )}
                    {field.type === "select" ? (
                      <select
                        className={styles.select}
                        id={String(field.key)}
                        value={String(form[field.key])}
                        onChange={(event) => handleChange(field.key, event.target.value)}
                      >
                        {(field.options ?? []).map((option) => (
                          <option key={`${field.key}-${option.value}`} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className={styles.input}
                        id={String(field.key)}
                        inputMode={field.type === "number" ? "decimal" : "text"}
                        min={field.min}
                        placeholder={field.placeholder}
                        step={field.step}
                        type={field.type === "number" ? "number" : "text"}
                        value={String(form[field.key])}
                        onChange={(event) => handleChange(field.key, event.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
            </Card>
          ))}
        </Column>

        <Column className={styles.sideColumn} gap="16">
          <Card
            className={styles.panel}
            direction="column"
            gap="16"
            paddingX="24"
            paddingY="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Saída principal
            </Tag>
            <Heading as="h3" variant="heading-strong-l">
              Relatório com cenários, funil e projeções
            </Heading>
            <Text onBackground="neutral-weak">
              Os cálculos usam dados inseridos quando existirem e benchmarks do segmento quando algum campo estiver vazio.
            </Text>

            <Column gap="12">
              <Row className={styles.kpiRow} horizontal="between" gap="16">
                <Text variant="body-default-s">Saturação de mercado</Text>
                <Text variant="label-default-s">{formatPercent(model.marketSaturation)}</Text>
              </Row>
              <Row className={styles.kpiRow} horizontal="between" gap="16">
                <Text variant="body-default-s">CAC pago estimado</Text>
                <Text variant="label-default-s">
                  {model.paidCAC > 0 ? formatCurrency(model.paidCAC) : "Sem mídia paga"}
                </Text>
              </Row>
              <Row className={styles.kpiRow} horizontal="between" gap="16">
                <Text variant="body-default-s">LTV projetado</Text>
                <Text variant="label-default-s">{formatCurrency(model.ltv)}</Text>
              </Row>
              <Row className={styles.kpiRow} horizontal="between" gap="16">
                <Text variant="body-default-s">Campo com benchmark</Text>
                <Text variant="label-default-s">{model.fallbackItems.length}</Text>
              </Row>
            </Column>

            <Row gap="12" wrap>
              <Button type="button" variant="primary" size="m" arrowIcon onClick={handlePrint}>
                Gerar PDF
              </Button>
              <Button type="button" variant="secondary" size="m" onClick={() => setForm(initialState)}>
                Limpar dados
              </Button>
            </Row>
          </Card>

          <Card
            className={styles.panel}
            direction="column"
            gap="16"
            paddingX="24"
            paddingY="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Benchmarks em uso
            </Text>
            {model.fallbackItems.length > 0 ? (
              <Column gap="12">
                {model.fallbackItems.slice(0, 8).map((item) => (
                  <Row className={styles.fallbackRow} gap="12" key={item.label} vertical="start">
                    <Text variant="body-default-s">{item.label}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {item.value}
                    </Text>
                  </Row>
                ))}
                {model.fallbackItems.length > 8 && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    +{model.fallbackItems.length - 8} campos usando valor padrão ajustável.
                  </Text>
                )}
              </Column>
            ) : (
              <Text variant="body-default-s" onBackground="neutral-weak">
                Nenhum benchmark foi necessário nesta simulação.
              </Text>
            )}
          </Card>

          <Card
            className={styles.panel}
            direction="column"
            gap="16"
            paddingX="24"
            paddingY="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Leitura rápida
            </Text>
            <Column gap="12">
              <Row className={styles.kpiRow} horizontal="between" gap="16">
                <Text variant="body-default-s">Score digital</Text>
                <Text variant="label-default-s">{formatNumber(model.digitalScore)}</Text>
              </Row>
              <Row className={styles.kpiRow} horizontal="between" gap="16">
                <Text variant="body-default-s">Google local</Text>
                <Text variant="label-default-s">{formatNumber(model.googlePresenceScore)}</Text>
              </Row>
              <Row className={styles.kpiRow} horizontal="between" gap="16">
                <Text variant="body-default-s">Redes sociais</Text>
                <Text variant="label-default-s">{formatNumber(model.socialPresenceScore)}</Text>
              </Row>
              <Row className={styles.kpiRow} horizontal="between" gap="16">
                <Text variant="body-default-s">Reputação</Text>
                <Text variant="label-default-s">{formatNumber(model.reputationScore)}</Text>
              </Row>
            </Column>
          </Card>
        </Column>
      </Grid>

      <Card
        className={`${styles.panel} ${styles.reportPanel}`}
        direction="column"
        gap="20"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
      >
        <Row className={styles.reportHeader} horizontal="between" vertical="start" gap="16" wrap>
          <Column gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Relatório profissional
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Diagnóstico comercial e de demanda local
            </Heading>
            <Text onBackground="neutral-weak">
              {model.companyName} • {model.cityLabel} • {model.segmentLabel}
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Gerado em {reportDate}
            </Text>
          </Column>

          {model.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={`Logo ${model.companyName}`} className={styles.logo} src={model.logoUrl} />
          ) : (
            <div className={styles.logoPlaceholder}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                {model.companyName}
              </Text>
            </div>
          )}
        </Row>

        <Grid columns="3" s={{ columns: 1 }} gap="16">
          <Card className={styles.reportStat} direction="column" gap="8" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Text variant="label-default-s" onBackground="neutral-weak">
              Demanda local estimada
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              {compact(model.estimatedLocalDemand)}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              buscas + intenção local com ajuste de concorrência
            </Text>
          </Card>
          <Card className={styles.reportStat} direction="column" gap="8" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Text variant="label-default-s" onBackground="neutral-weak">
              Gap de faturamento
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              {formatCurrency(model.revenueGap)}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              diferença entre o atual e o realista em 12 meses
            </Text>
          </Card>
          <Card className={styles.reportStat} direction="column" gap="8" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Text variant="label-default-s" onBackground="neutral-weak">
              Impacto da recorrência
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              {formatCurrency(model.retentionImpact)}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              ganho estimado da retenção no cenário realista
            </Text>
          </Card>
        </Grid>

        <Grid className={styles.chartGrid} columns="2" s={{ columns: 1 }} gap="16">
          <Card className={styles.chartCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-strong-m">
              Projeção de faturamento
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Cenário atual, conservador, realista e agressivo ao longo de 12 meses.
            </Text>
            <div className={styles.chartShell}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={model.revenueProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="atual" stroke="#8c96a7" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="conservador" stroke="#7ea8ff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="realista" stroke="#5ed492" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="agressivo" stroke="#f2c66d" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={styles.chartCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-strong-m">
              Funil comercial
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Alcance, cliques, leads, agendamentos, comparecimento, clientes fechados e recorrência.
            </Text>
            <div className={styles.chartShell}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={model.funnelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="stage" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Bar dataKey="value" fill="#7ea8ff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={styles.chartCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-strong-m">
              CAC x LTV
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Custo de aquisição pago contra primeira compra e valor acumulado do cliente.
            </Text>
            <div className={styles.chartShell}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      indicador: "CAC",
                      valor: model.paidCAC,
                    },
                    {
                      indicador: "Primeira compra",
                      valor: model.averageTicket,
                    },
                    {
                      indicador: "LTV",
                      valor: model.ltv,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="indicador" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="valor" fill="#5ed492" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={styles.chartCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-strong-m">
              Agenda ocupada
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Capacidade total, ocupação atual e ocupação projetada no cenário realista.
            </Text>
            <div className={styles.chartShell}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={model.agendaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Bar dataKey="value" fill="#f2c66d" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={styles.chartCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-strong-m">
              Crescimento orgânico
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Evolução de seguidores, leads orgânicos, clientes orgânicos e valor acumulado da base.
            </Text>
            <div className={styles.chartShell}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={model.organicGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Legend />
                  <Area type="monotone" dataKey="seguidores" stackId="1" stroke="#7ea8ff" fill="#7ea8ff33" />
                  <Area type="monotone" dataKey="leads" stackId="2" stroke="#5ed492" fill="#5ed49233" />
                  <Line type="monotone" dataKey="valor" stroke="#f2c66d" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={styles.chartCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-strong-m">
              Google local
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Avaliações, cliques projetados via Google e evolução do ranking local.
            </Text>
            <div className={styles.chartShell}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={model.googleLocalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
                  <YAxis yAxisId="left" stroke="rgba(255,255,255,0.45)" />
                  <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.45)" reversed />
                  <Tooltip formatter={(value: number) => formatNumber(value, 1)} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="avaliacoes" stroke="#5ed492" strokeWidth={2} dot={false} />
                  <Line yAxisId="left" type="monotone" dataKey="cliques" stroke="#7ea8ff" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="ranking" stroke="#f2c66d" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={styles.chartCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-strong-m">
              Comparativo concorrencial
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Empresa versus concorrência local em reputação, presença digital e demanda capturada.
            </Text>
            <div className={styles.chartShell}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={model.competitiveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="metric" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${formatNumber(value)} pts`} />
                  <Legend />
                  <Bar dataKey="empresa" fill="#5ed492" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="concorrentes" fill="#8c96a7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={styles.chartCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Heading as="h3" variant="heading-strong-m">
              Saturação de mercado
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Queda progressiva de eficiência sem renovação de público, criativo ou posicionamento.
            </Text>
            <div className={styles.chartShell}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={model.saturationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => `${formatNumber(value, 1)}%`} />
                  <Legend />
                  <Area type="monotone" dataKey="eficiencia" stroke="#5ed492" fill="#5ed49233" />
                  <Area type="monotone" dataKey="saturacao" stroke="#f2c66d" fill="#f2c66d26" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>

        <Grid columns="2" s={{ columns: 1 }} gap="16">
          <Card className={styles.reportCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Tag size="s" background="neutral-alpha-weak">
              Insights automáticos
            </Tag>
            <Column as="ul" className={styles.list} gap="8">
              {model.insights.map((item) => (
                <Text as="li" key={item} variant="body-default-s">
                  {item}
                </Text>
              ))}
            </Column>
          </Card>

          <Card className={styles.reportCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
            <Tag size="s" background="neutral-alpha-weak">
              Oportunidades detectadas
            </Tag>
            <Column as="ul" className={styles.list} gap="8">
              {model.opportunities.map((item) => (
                <Text as="li" key={item} variant="body-default-s">
                  {item}
                </Text>
              ))}
            </Column>
          </Card>
        </Grid>

        <Card className={styles.reportCard} direction="column" gap="12" padding="20" radius="l" background="surface" border="neutral-alpha-weak">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Plano sugerido de crescimento
          </Tag>
          <Column as="ol" className={styles.list} gap="8">
            {model.suggestedPlan.map((item) => (
              <Text as="li" key={item} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>

          <Grid columns="3" s={{ columns: 1 }} gap="12">
            <div className={styles.metaBlock}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Público local estimado
              </Text>
              <Text variant="body-default-m">{compact(model.targetAudienceSize)}</Text>
            </div>
            <div className={styles.metaBlock}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Buscas relacionadas
              </Text>
              <Text variant="body-default-m">{compact(model.relatedSearchVolume)}</Text>
            </div>
            <div className={styles.metaBlock}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Renda média local
              </Text>
              <Text variant="body-default-m">{formatCurrency(model.averageIncome)}</Text>
            </div>
          </Grid>

          {model.servicesSummary && (
            <Text variant="body-default-s" onBackground="neutral-weak">
              Serviços considerados: {model.servicesSummary}.
            </Text>
          )}
          {model.dominantAge && (
            <Text variant="body-default-s" onBackground="neutral-weak">
              Faixa etária predominante informada: {model.dominantAge}.
            </Text>
          )}
        </Card>
      </Card>
    </Column>
  );
}
