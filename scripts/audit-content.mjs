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
      path.join(root, "src/content/movies/movieOffers.ts"),
      path.join(root, "src/content/creators/creatorSchema.ts"),
      path.join(root, "src/content/creators/creators.ts"),
      path.join(root, "src/content/works/workSchema.ts"),
      path.join(root, "src/content/works/works.ts"),
      path.join(root, "src/content/organizations/organizations.ts"),
      path.join(root, "src/content/games/games.ts"),
      path.join(root, "src/content/animationWorks/animationWorks.ts"),
      path.join(root, "src/content/reading/readingSchema.ts"),
      path.join(root, "src/content/reading/reading.ts"),
      path.join(root, "src/content/reading/curations.ts"),
      path.join(root, "src/content/series/seriesSchema.ts"),
      path.join(root, "src/content/series/series.ts"),
      path.join(root, "src/content/series/seriesOffers.ts"),
      path.join(root, "src/content/series/curations.ts"),
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
  const { movieCurations, resolveMovieList } = require(path.join(compiledRoot, "curations.js"));
  const { movieOffers } = require(path.join(compiledRoot, "movieOffers.js"));
  const { MovieBatchSchema } = require(path.join(compiledRoot, "movieSchema.js"));
  const { creators } = require(path.join(temporaryDirectory, "src/content/creators/creators.js"));
  const { editorialWorks } = require(path.join(temporaryDirectory, "src/content/works/works.js"));
  const { organizations } = require(path.join(temporaryDirectory, "src/content/organizations/organizations.js"));
  const { games } = require(path.join(temporaryDirectory, "src/content/games/games.js"));
  const { animationWorks } = require(path.join(temporaryDirectory, "src/content/animationWorks/animationWorks.js"));
  const readingRoot = path.join(temporaryDirectory, "src/content/reading");
  const { readingCatalog } = require(path.join(readingRoot, "reading.js"));
  const { readingCurations } = require(path.join(readingRoot, "curations.js"));
  const { ReadingCatalogSchema, ReadingEditionSchema } = require(path.join(readingRoot, "readingSchema.js"));
  const seriesRoot = path.join(temporaryDirectory, "src/content/series");
  const { seriesCatalog } = require(path.join(seriesRoot, "series.js"));
  const { SeriesBatchSchema } = require(path.join(seriesRoot, "seriesSchema.js"));
  const { seriesOffers } = require(path.join(seriesRoot, "seriesOffers.js"));
  const { seriesCurations } = require(path.join(seriesRoot, "curations.js"));
  const articles = await getArticleRecords();
  const articleSlugs = articles.map((article) => article.slug);
  const movieIds = new Set(movies.map((movie) => movie.id));
  const articleSlugSet = new Set(articleSlugs);
  const invalidRelationships = movieCurations.flatMap((curation) => [
    ...curation.items.filter((item) => !movieIds.has(item.movieId)).map((item) => ({ type: "missing_movie", from: curation.slug, to: item.movieId })),
    ...(!articleSlugSet.has(curation.href.replace(/^\/blog\//, "")) ? [{ type: "missing_article", from: curation.slug, to: curation.href }] : []),
  ]);
  const creatorIds = new Set(creators.map((creator) => creator.id));
  const workIds = new Set(editorialWorks.map((work) => work.id));
  const organizationIds = new Set(organizations.map((organization) => organization.id));
  const readingWorkIds = new Set(readingCatalog.works.map((work) => work.id));
  const readingSeriesIds = new Set(readingCatalog.series.map((series) => series.id));
  const readingVolumeIds = new Set(readingCatalog.volumes.map((volume) => volume.id));
  const readingInstallmentIds = new Set(readingCatalog.installments.map((item) => item.id));
  const readingEditionIds = new Set(readingCatalog.editions.map((edition) => edition.id));
  const seriesIds = new Set(seriesCatalog.map((item) => item.id));
  const readingIsbn10 = readingCatalog.editions.flatMap((edition) => edition.isbn10 ? [edition.isbn10] : []);
  const readingIsbn13 = readingCatalog.editions.flatMap((edition) => edition.isbn13 ? [edition.isbn13] : []);
  invalidRelationships.push(
    ...creators.flatMap((creator) => creator.workIds.filter((id) => !workIds.has(id)).map((id) => ({ type: "missing_work", from: creator.id, to: id }))),
    ...editorialWorks.flatMap((work) => [
      ...work.contributors.filter((credit) => !creatorIds.has(credit.personId)).map((credit) => ({ type: "missing_creator", from: work.id, to: credit.personId })),
      ...work.relatedWorkIds.filter((id) => !workIds.has(id)).map((id) => ({ type: "missing_related_work", from: work.id, to: id })),
      ...work.organizationIds.filter((id) => !organizationIds.has(id)).map((id) => ({ type: "missing_organization", from: work.id, to: id })),
    ]),
    ...organizations.flatMap((organization) => organization.workIds.filter((id) => !workIds.has(id)).map((id) => ({ type: "missing_work", from: organization.id, to: id }))),
    ...games.flatMap((game) => [...game.organizationIds.filter((id)=>!organizationIds.has(id)).map((id)=>({type:"missing_organization",from:game.id,to:id})),...game.contributors.filter((credit)=>!creatorIds.has(credit.personId)).map((credit)=>({type:"missing_creator",from:game.id,to:credit.personId}))]),
    ...animationWorks.flatMap((work)=>work.relationships.filter((relation)=>!organizationIds.has(relation.organizationId)).map((relation)=>({type:"missing_organization",from:work.id,to:relation.organizationId}))),
    ...movies.flatMap((movie)=>movie.organizationRelationships.filter((relation)=>!organizationIds.has(relation.organizationId)).map((relation)=>({type:"missing_organization",from:movie.id,to:relation.organizationId}))),
    ...movieOffers.filter((offer)=>!movieIds.has(offer.movieId)).map((offer)=>({type:"missing_movie",from:offer.id,to:offer.movieId})),
    ...readingCatalog.works.flatMap((work) => [
      ...work.credits.filter((credit) => !creatorIds.has(credit.personId)).map((credit) => ({ type: "missing_creator", from: work.id, to: credit.personId })),
      ...work.organizationRelationships.filter((relation) => !organizationIds.has(relation.organizationId)).map((relation) => ({ type: "missing_organization", from: work.id, to: relation.organizationId })),
      ...work.seriesMemberships.filter((item) => !readingSeriesIds.has(item.seriesId)).map((item) => ({ type: "missing_reading_series", from: work.id, to: item.seriesId })),
      ...work.relatedWorks.filter((item) => !readingWorkIds.has(item.workId)).map((item) => ({ type: "missing_reading_work", from: work.id, to: item.workId })),
    ]),
    ...readingCatalog.volumes.flatMap((volume) => [
      ...(!readingWorkIds.has(volume.workId) ? [{ type: "missing_reading_work", from: volume.id, to: volume.workId }] : []),
      ...(volume.seriesId && !readingSeriesIds.has(volume.seriesId) ? [{ type: "missing_reading_series", from: volume.id, to: volume.seriesId }] : []),
      ...volume.installmentIds.filter((id) => !readingInstallmentIds.has(id)).map((id) => ({ type: "missing_reading_installment", from: volume.id, to: id })),
    ]),
    ...readingCatalog.installments.flatMap((item) => [
      ...(!readingWorkIds.has(item.workId) ? [{ type: "missing_reading_work", from: item.id, to: item.workId }] : []),
      ...(item.seriesId && !readingSeriesIds.has(item.seriesId) ? [{ type: "missing_reading_series", from: item.id, to: item.seriesId }] : []),
    ]),
    ...readingCatalog.editions.flatMap((edition) => [
      ...(edition.workId && !readingWorkIds.has(edition.workId) ? [{ type: "missing_reading_work", from: edition.id, to: edition.workId }] : []),
      ...(edition.volumeId && !readingVolumeIds.has(edition.volumeId) ? [{ type: "missing_reading_volume", from: edition.id, to: edition.volumeId }] : []),
      ...(!organizationIds.has(edition.publisherId) ? [{ type: "missing_organization", from: edition.id, to: edition.publisherId }] : []),
      ...(edition.imprintId && !organizationIds.has(edition.imprintId) ? [{ type: "missing_organization", from: edition.id, to: edition.imprintId }] : []),
      ...edition.translationCredits.filter((credit) => !creatorIds.has(credit.personId)).map((credit) => ({ type: "missing_creator", from: edition.id, to: credit.personId })),
    ]),
    ...readingCatalog.offers.filter((offer) => !readingEditionIds.has(offer.editionId)).map((offer) => ({ type: "missing_reading_edition", from: offer.id, to: offer.editionId })),
    ...readingCurations.flatMap((list) => list.items.flatMap((item) => [
      ...(!readingWorkIds.has(item.workId) ? [{ type: "missing_reading_work", from: list.id, to: item.workId }] : []),
      ...(item.startingPointEditionId && !readingEditionIds.has(item.startingPointEditionId) ? [{ type: "missing_reading_edition", from: list.id, to: item.startingPointEditionId }] : []),
    ])),
    ...seriesOffers.flatMap((offer) => [
      ...(!seriesIds.has(offer.seriesId) ? [{ type: "missing_series", from: offer.id, to: offer.seriesId }] : []),
      ...(offer.seasonFrom > offer.seasonTo ? [{ type: "invalid_season_range", from: offer.id, to: `${offer.seasonFrom}-${offer.seasonTo}` }] : []),
      ...(seriesCatalog.find((item) => item.id === offer.seriesId)?.seasons < offer.seasonTo ? [{ type: "season_out_of_range", from: offer.id, to: String(offer.seasonTo) }] : []),
    ]),
    ...seriesCurations.flatMap((list) => list.items.filter((item) => !seriesIds.has(item.seriesId)).map((item) => ({ type:"missing_series", from:list.id, to:item.seriesId }))),
  );
  const records = movies.map((movie) => ({
    ...movie,
    relationships: movieCurations
      .filter((curation) => curation.items.some((item) => item.movieId === movie.id))
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
      games: games.length,
      animationWorks:animationWorks.length,
      movieOffers: movieOffers.length,
      readingWorks: readingCatalog.works.length,
      readingSeries: readingCatalog.series.length,
      readingVolumes: readingCatalog.volumes.length,
      readingInstallments: readingCatalog.installments.length,
      readingEditions: readingCatalog.editions.length,
      readingOffers: readingCatalog.offers.length,
      readingCurations: readingCurations.length,
      series: seriesCatalog.length,
      seriesOffers: seriesOffers.length,
      seriesCurations: seriesCurations.length,
      publishedMovies: movies.filter((movie) => movie.status === "published").length,
      draftMovies: movies.filter((movie) => movie.status === "draft").length,
    },
    duplicates: { movieIds: duplicates(movies.map((movie) => movie.id)), movieSlugs: duplicates(movies.map((movie) => movie.slug)), articleSlugs: duplicates(articleSlugs), creatorIds: duplicates(creators.map((item) => item.id)), workIds: duplicates(editorialWorks.map((item) => item.id)), organizationIds: duplicates(organizations.map((item) => item.id)), gameIds:duplicates(games.map((item)=>item.id)),gameSlugs:duplicates(games.flatMap((item)=>[item.slug,...item.aliases])),animationWorkIds:duplicates(animationWorks.map((item)=>item.id)),animationWorkSlugs:duplicates(animationWorks.map((item)=>item.slug)),readingWorkIds:duplicates(readingCatalog.works.map((item)=>item.id)),readingWorkSlugsAndAliases:duplicates(readingCatalog.works.flatMap((item)=>[item.slug,...item.aliases])),readingSeriesIds:duplicates(readingCatalog.series.map((item)=>item.id)),readingInstallmentIds:duplicates(readingCatalog.installments.map((item)=>item.id)),readingVolumeIds:duplicates(readingCatalog.volumes.map((item)=>item.id)),readingEditionIds:duplicates(readingCatalog.editions.map((item)=>item.id)),readingOfferIds:duplicates(readingCatalog.offers.map((item)=>item.id)),readingIsbn10:duplicates(readingIsbn10),readingIsbn13:duplicates(readingIsbn13),seriesIds:duplicates(seriesCatalog.map((item)=>item.id)),seriesSlugsAndAliases:duplicates(seriesCatalog.flatMap((item)=>[item.slug,...item.aliases])),seriesOfferIds:duplicates(seriesOffers.map((item)=>item.id)) },
    invalidRelationships,
    needsReview: {
      movies: movies.filter((movie) => !movie.poster || !movie.sources.length || (movie.status === "published" && !movie.editorial)).map((movie) => movie.id),
      moviesWithoutOrganizations: movies.filter((movie) => !movie.organizationRelationships.length).map((movie) => movie.id),
      articlesWithoutPortableIdentity: articles.filter((article) => !article.migrationReady).map((article) => article.slug),
      readingWorksWithoutImages: readingCatalog.works.filter((work) => !work.image).map((work) => work.id),
    },
    selfTests: {
      validBatchAccepted: MovieBatchSchema.safeParse(movies).success,
      duplicateRejected: !MovieBatchSchema.safeParse([...movies, movies[0]]).success,
      invalidRecordRejected: !MovieBatchSchema.safeParse([{ ...movies[0], id: "", createdAt: "data-invalida" }]).success,
      automaticListResolved: resolveMovieList({ id:"test_auto",slug:"test-auto",title:"test",href:"/test",mode:"automatic",rules:{organizationId:"org_studio_ghibli"},items:[] }, movies).some((movie)=>movie.id==="mov_ghb_2023_kimitachi"),
      editorialListPreservedOrder: resolveMovieList({ id:"test_editorial",slug:"test-editorial",title:"test",href:"/test",mode:"editorial",items:[{movieId:"mov_c71a05"},{movieId:"mov_7c1f3a"}] }, movies).map((movie)=>movie.id).join(",")==="mov_c71a05,mov_7c1f3a",
      hybridListAppliedOverrides: resolveMovieList({ id:"test_hybrid",slug:"test-hybrid",title:"test",href:"/test",mode:"hybrid",rules:{organizationId:"org_studio_ghibli"},items:[{movieId:"mov_ghb_2023_kimitachi"}],excludeMovieIds:["mov_ghb_1986_laputa"] }, movies)[0]?.id==="mov_ghb_2023_kimitachi" && !resolveMovieList({ id:"test_hybrid",slug:"test-hybrid",title:"test",href:"/test",mode:"hybrid",rules:{organizationId:"org_studio_ghibli"},items:[{movieId:"mov_ghb_2023_kimitachi"}],excludeMovieIds:["mov_ghb_1986_laputa"] }, movies).some((movie)=>movie.id==="mov_ghb_1986_laputa"),
      zeroOrganizationAccepted: MovieBatchSchema.safeParse([{...movies[0],id:"test_no_org",slug:"test-no-org",aliases:[],organizationRelationships:[]}]).success,
      multipleOrganizationsAccepted: MovieBatchSchema.safeParse([{...movies[0],id:"test_multi_org",slug:"test-multi-org",aliases:[],organizationRelationships:[{organizationId:"org_studio_ghibli",roles:["production"],status:"published"},{organizationId:"org_laika",roles:["services"],status:"published"}]}]).success,
      emptyReadingCatalogAccepted: ReadingCatalogSchema.safeParse(readingCatalog).success,
      seriesBatchAccepted: SeriesBatchSchema.safeParse(seriesCatalog).success,
      readingEditionRequiresOneTarget: !ReadingEditionSchema.safeParse({ id:"read_edition_test", title:"Teste", publisherId:"org_test", country:"Brasil", language:"pt-BR", medium:"paperback", availabilityStatus:"unknown", status:"draft", sources:[{title:"Fonte",url:"https://example.com"}], createdAt:"2026-08-13", updatedAt:"2026-08-13" }).success,
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
    writeFile(path.join(outputDirectory, "reading.v1.json"), `${JSON.stringify({ schemaVersion: 1, contentType: "reading-catalog", ...readingCatalog, curations: readingCurations }, null, 2)}\n`),
    writeFile(path.join(outputDirectory, "series.v1.json"), `${JSON.stringify({ schemaVersion: 1, contentType: "series-catalog", records: seriesCatalog, offers: seriesOffers, curations: seriesCurations }, null, 2)}\n`),
  ]);
  console.log(`Exportados ${movies.length} filmes, ${seriesCatalog.length} séries e ${readingCatalog.works.length} obras de leitura; ${invalidRelationships.length} relações inválidas; testes de contrato aprovados.`);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
