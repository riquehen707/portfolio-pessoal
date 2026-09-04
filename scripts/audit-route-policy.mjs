import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const policySource = await readFile(path.join(root, "src/config/routePolicy.ts"), "utf8");
const middlewareSource = await readFile(path.join(root, "src/middleware.ts"), "utf8");

const policyPaths = [
  ...policySource.matchAll(/path: "([^\"]+)", redirectTo:/g),
].map((match) => match[1]);
const matcherPaths = [
  ...middlewareSource.matchAll(/^\s+"([^\"]+)\/:path\*",$/gm),
].map((match) => match[1]);

const missingMatchers = policyPaths.filter((route) => !matcherPaths.includes(route));
const orphanMatchers = matcherPaths.filter((route) => !policyPaths.includes(route));

if (missingMatchers.length || orphanMatchers.length) {
  console.error("A política de rotas pausadas e os matchers do middleware divergiram.");
  if (missingMatchers.length) console.error(`Matchers ausentes: ${missingMatchers.join(", ")}`);
  if (orphanMatchers.length) console.error(`Matchers órfãos: ${orphanMatchers.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Política de rotas válida: ${policyPaths.length} famílias pausadas.`);
}
