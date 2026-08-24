import { existsSync } from "node:fs";
import { readFile, readdir, stat, writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const nextDirectory = path.join(root, ".next");
const outputDirectory = path.join(root, "exports", "performance");
const outputPath = path.join(outputDirectory, "baseline.v1.json");

if (!existsSync(nextDirectory)) {
  throw new Error("Diretorio .next ausente. Execute `npm run build` antes de `npm run audit:performance`.");
}

async function walk(directory) {
  if (!existsSync(directory)) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const absolutePath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
    }),
  );
  return nested.flat();
}

async function summarizeDirectory(relativePath) {
  const directory = path.join(root, relativePath);
  const files = await walk(directory);
  const sizes = await Promise.all(files.map(async (file) => (await stat(file)).size));
  return {
    path: relativePath.replaceAll("\\", "/"),
    files: files.length,
    bytes: sizes.reduce((total, size) => total + size, 0),
  };
}

async function largestFiles(relativePath, extension, limit = 15) {
  const directory = path.join(root, relativePath);
  const files = (await walk(directory)).filter((file) => !extension || file.endsWith(extension));
  const records = await Promise.all(
    files.map(async (file) => ({
      path: path.relative(root, file).replaceAll("\\", "/"),
      bytes: (await stat(file)).size,
    })),
  );
  return records.sort((left, right) => right.bytes - left.bytes).slice(0, limit);
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

function readGitHead() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

const buildManifest = await readJson(".next/app-build-manifest.json");
const prerenderManifest = await readJson(".next/prerender-manifest.json");
const packageManifest = await readJson("package.json");
const pageBundles = await Promise.all(
  Object.entries(buildManifest.pages).map(async ([route, files]) => {
    const uniqueFiles = [...new Set(files)];
    const sizes = await Promise.all(
      uniqueFiles.map(async (file) => {
        const absolutePath = path.join(nextDirectory, file);
        return existsSync(absolutePath) ? (await stat(absolutePath)).size : 0;
      }),
    );
    return {
      route,
      files: uniqueFiles.length,
      rawClientBytes: sizes.reduce((total, size) => total + size, 0),
    };
  }),
);

const sourceGroups = await Promise.all([
  summarizeDirectory("src/app/blog/posts"),
  summarizeDirectory("src/content"),
  summarizeDirectory("src/data"),
  summarizeDirectory("public/images"),
]);
const buildGroups = await Promise.all([
  summarizeDirectory(".next/static"),
  summarizeDirectory(".next/server"),
  summarizeDirectory(".next/cache"),
]);

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  environment: {
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? readGitHead(),
    node: process.version,
    next: packageManifest.dependencies?.next ?? null,
    platform: `${process.platform}-${process.arch}`,
  },
  methodology: {
    buildRequired: true,
    byteValues: "Tamanhos brutos no disco; nao equivalem a transferencia comprimida.",
    buildDuration: "Cronometrar externamente `npm run build`; o Next nao grava a duracao no manifesto.",
    lighthouse: "Nao coletado por este comando; requer servidor de producao e navegador separado.",
  },
  pages: {
    prerenderedRoutes: Object.keys(prerenderManifest.routes ?? {}).length,
    dynamicRouteDefinitions: Object.keys(prerenderManifest.dynamicRoutes ?? {}).length,
    manifestRoutes: pageBundles.length,
  },
  sourceGroups,
  buildGroups,
  clientBundlesByRoute: pageBundles.sort(
    (left, right) => right.rawClientBytes - left.rawClientBytes || left.route.localeCompare(right.route),
  ),
  largestClientChunks: await largestFiles(".next/static/chunks", ".js", 20),
  largestGeneratedHtml: await largestFiles(".next/server/app", ".html", 20),
};

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
console.log(`Baseline gravada em ${path.relative(root, outputPath).replaceAll("\\", "/")}`);
console.log(`Rotas pre-renderizadas no manifesto: ${report.pages.prerenderedRoutes}`);
console.log(`Maior HTML: ${report.largestGeneratedHtml[0]?.path ?? "n/a"} (${mb(report.largestGeneratedHtml[0]?.bytes ?? 0)} MB bruto)`);
console.log(`Maior chunk cliente: ${report.largestClientChunks[0]?.path ?? "n/a"} (${mb(report.largestClientChunks[0]?.bytes ?? 0)} MB bruto)`);
