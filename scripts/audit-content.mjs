import { createRequire } from "node:module";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const temporaryDirectory = await mkdtemp(path.join(root, ".tmp-content-audit-"));
const outputDirectory = path.join(root, "exports", "content");
const require = createRequire(import.meta.url);
const matter = require("gray-matter");

function compileLocalContent() {
  const program = ts.createProgram({
    rootNames: [
      path.join(root, "src/content/movies/movieSchema.ts"),
      path.join(root, "src/content/movies/movies.ts"),
      path.join(root, "src/content/movies/curations.ts"),
      path.join(root, "src/content/creators/creatorSchema.ts"),
      path.join(root, "src/content/creators/creators.ts"),
      path.join(root, "src/content/works/workSchema.ts"),
      path.join(root, "src/content/works/works.ts"),
      path.join(root, "src/content/organizations/organizations.ts"),
    ],
    options: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      outDir: temporaryDirectory,
      rootDir: root,
      skipLibCheck: true,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const result = program.emit();
  const diagnostics = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);
  if (diagnostics.length) {
    throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    }));
  }
}

function duplicates(values) {
  const seen = new Set();
  return [...new Set(values.filter((value) => seen.has(value) || !seen.add(value)))];
}

async function getArticleRecords() {
  const postsDirectory = path.join(root, "src/app/blog/posts");
  const files = await readdir(postsDirectory, { recursive: true });
  const articles = [];
  for (const file of files.filter((entry) => entry.endsWith(".mdx"))) {
    const absolutePath = path.join(postsDirectory, file);
    const contents = await readFile(absolutePath, "utf8");
    const { data } = matter(contents);
    if (data.slug) {
      articles.push({
        id: data.contentId ?? null,
        contentType: "article",
        schemaVersion: data.schemaVersion ?? null,
        slug: data.slug,
        aliases: data.aliases ?? [],
        status: data.status ?? "published",
        createdAt: data.createdAt ?? null,
        publishedAt: data.publishedAt ?? null,
        updatedAt: data.updatedAt ?? data.reviewedAt ?? null,
        seo: { title: data.title, description: data.description ?? data.summary, canonical: data.canonical ?? `/blog/${data.slug}` },
        relationships: { related: data.related ?? [] },
        sourceFile: path.relative(root, absolutePath).replaceAll("\\", "/"),
        migrationReady: Boolean(data.contentId && data.schemaVersion && data.createdAt),
      });
    }
  }
  return articles;
}

try {
  compileLocalContent();
  const compiledRoot = path.join(temporaryDirectory, "src/content/movies");
  const { movies } = require(path.join(compiledRoot, "movies.js"));
  const { movieCurations } = require(path.join(compiledRoot, "curations.js"));
  const { MovieBatchSchema } = require(path.join(compiledRoot, "movieSchema.js"));
  const { creators } = require(path.join(temporaryDirectory, "src/content/creators/creators.js"));
  const { editorialWorks } = require(path.join(temporaryDirectory, "src/content/works/works.js"));
  const { organizations } = require(path.join(temporaryDirectory, "src/content/organizations/organizations.js"));
  const articles = await getArticleRecords();
  const articleSlugs = articles.map((article) => article.slug);
  const movieSlugs = new Set(movies.flatMap((movie) => [movie.slug, ...movie.aliases]));
  const articleSlugSet = new Set(articleSlugs);
  const invalidRelationships = movieCurations.flatMap((curation) => [
    ...curation.items.filter((item) => !movieSlugs.has(item.movie)).map((item) => ({ type: "missing_movie", from: curation.slug, to: item.movie })),
    ...(!articleSlugSet.has(curation.href.replace(/^\/blog\//, "")) ? [{ type: "missing_article", from: curation.slug, to: curation.href }] : []),
  ]);
  const creatorIds = new Set(creators.map((creator) => creator.id));
  const workIds = new Set(editorialWorks.map((work) => work.id));
  const organizationIds = new Set(organizations.map((organization) => organization.id));
  invalidRelationships.push(
    ...creators.flatMap((creator) => creator.workIds.filter((id) => !workIds.has(id)).map((id) => ({ type: "missing_work", from: creator.id, to: id }))),
    ...editorialWorks.flatMap((work) => [
      ...work.contributors.filter((credit) => !creatorIds.has(credit.personId)).map((credit) => ({ type: "missing_creator", from: work.id, to: credit.personId })),
      ...work.relatedWorkIds.filter((id) => !workIds.has(id)).map((id) => ({ type: "missing_related_work", from: work.id, to: id })),
      ...work.organizationIds.filter((id) => !organizationIds.has(id)).map((id) => ({ type: "missing_organization", from: work.id, to: id })),
    ]),
    ...organizations.flatMap((organization) => organization.workIds.filter((id) => !workIds.has(id)).map((id) => ({ type: "missing_work", from: organization.id, to: id }))),
  );
  const records = movies.map((movie) => ({
    ...movie,
    relationships: movieCurations
      .filter((curation) => curation.items.some((item) => item.movie === movie.slug))
      .map((curation) => ({ type: "appears_in", contentType: "article", slug: curation.href.replace(/^\/blog\//, "") })),
  }));
  const exportPayload = { schemaVersion: 1, contentType: "movie", records };
  const seoContract = movies.map((movie) => ({
    id: movie.id,
    route: `/filmes/${movie.slug}`,
    canonical: `https://henrique.dog/filmes/${movie.slug}`,
    title: movie.seo.title,
    description: movie.seo.description,
    indexable: movie.status === "published",
    image: movie.poster?.src,
    structuredDataType: "Movie",
  }));
  const audit = {
    schemaVersion: 1,
    counts: {
      movies: movies.length,
      articles: articles.length,
      curations: movieCurations.length,
      creators: creators.length,
      editorialWorks: editorialWorks.length,
      organizations: organizations.length,
      publishedMovies: movies.filter((movie) => movie.status === "published").length,
      draftMovies: movies.filter((movie) => movie.status === "draft").length,
    },
    duplicates: { movieIds: duplicates(movies.map((movie) => movie.id)), movieSlugs: duplicates(movies.map((movie) => movie.slug)), articleSlugs: duplicates(articleSlugs), creatorIds: duplicates(creators.map((item) => item.id)), workIds: duplicates(editorialWorks.map((item) => item.id)), organizationIds: duplicates(organizations.map((item) => item.id)) },
    invalidRelationships,
    needsReview: {
      movies: movies.filter((movie) => !movie.poster || !movie.sources.length || (movie.status === "published" && !movie.editorial)).map((movie) => movie.id),
      articlesWithoutPortableIdentity: articles.filter((article) => !article.migrationReady).map((article) => article.slug),
    },
    selfTests: {
      validBatchAccepted: MovieBatchSchema.safeParse(movies).success,
      duplicateRejected: !MovieBatchSchema.safeParse([...movies, movies[0]]).success,
      invalidRecordRejected: !MovieBatchSchema.safeParse([{ ...movies[0], id: "", createdAt: "data-invalida" }]).success,
    },
  };

  if (invalidRelationships.length || Object.values(audit.duplicates).some((items) => items.length) || Object.values(audit.selfTests).some((passed) => !passed)) {
    throw new Error(`Auditoria falhou: ${JSON.stringify(audit, null, 2)}`);
  }

  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(path.join(outputDirectory, "movies.v1.json"), `${JSON.stringify(exportPayload, null, 2)}\n`),
    writeFile(path.join(outputDirectory, "articles-index.v1.json"), `${JSON.stringify({ schemaVersion: 1, contentType: "article", records: articles }, null, 2)}\n`),
    writeFile(path.join(outputDirectory, "audit.v1.json"), `${JSON.stringify(audit, null, 2)}\n`),
    writeFile(path.join(outputDirectory, "seo-contract.v1.json"), `${JSON.stringify(seoContract, null, 2)}\n`),
  ]);
  console.log(`Exportados ${movies.length} filmes; ${invalidRelationships.length} relações inválidas; testes de contrato aprovados.`);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
