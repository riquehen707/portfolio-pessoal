import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

const report = await readJson("exports/performance/baseline.v1.json");
const budget = await readJson("config/performance-budget.v1.json");
const limits = budget.limits;

const buildGroupBytes = (groupPath) =>
  report.buildGroups.find(({ path: candidate }) => candidate === groupPath)?.bytes ?? 0;

const metrics = [
  {
    name: "rotas pré-renderizadas",
    value: report.pages.prerenderedRoutes,
    limit: limits.prerenderedRoutes,
    unit: "rotas",
  },
  {
    name: "maior HTML gerado",
    value: report.largestGeneratedHtml[0]?.bytes ?? 0,
    limit: limits.largestGeneratedHtmlBytes,
    unit: "bytes",
  },
  {
    name: "maior chunk cliente",
    value: report.largestClientChunks[0]?.bytes ?? 0,
    limit: limits.largestClientChunkBytes,
    unit: "bytes",
  },
  {
    name: "artefatos do servidor",
    value: buildGroupBytes(".next/server"),
    limit: limits.serverBuildBytes,
    unit: "bytes",
  },
  {
    name: "artefatos estáticos",
    value: buildGroupBytes(".next/static"),
    limit: limits.staticBuildBytes,
    unit: "bytes",
  },
];

const failed = metrics.filter(({ value, limit }) => value > limit);
const warnings = metrics.filter(
  ({ value, limit }) => value <= limit && value >= limit * budget.warningRatio,
);

for (const metric of metrics) {
  const ratio = ((metric.value / metric.limit) * 100).toFixed(1);
  const status = metric.value > metric.limit ? "FALHOU" : metric.value >= metric.limit * budget.warningRatio ? "ATENÇÃO" : "OK";
  console.log(`${status.padEnd(7)} ${metric.name}: ${metric.value} / ${metric.limit} ${metric.unit} (${ratio}%)`);
}

if (warnings.length) {
  console.warn(`\n${warnings.length} indicador(es) consumiram ao menos ${budget.warningRatio * 100}% do limite.`);
}

if (failed.length) {
  console.error("\nOrçamento de regressão excedido. Revise a mudança ou ajuste o limite com evidência documentada.");
  process.exitCode = 1;
} else {
  console.log("\nOrçamento provisório de desempenho aprovado.");
}
