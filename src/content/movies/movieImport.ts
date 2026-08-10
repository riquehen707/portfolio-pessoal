import { MovieBatchSchema, type Movie } from "./movieSchema";

export type MovieImportReport = {
  valid: boolean;
  imported: Movie[];
  errors: string[];
  review: string[];
};

export function prepareMovieImport(input: unknown): MovieImportReport {
  if (!Array.isArray(input)) {
    return { valid: false, imported: [], errors: ["O lote precisa ser uma lista."], review: [] };
  }

  const draftInput = input.map((item) =>
    item && typeof item === "object" ? { ...item, status: "draft" } : item,
  );
  const result = MovieBatchSchema.safeParse(draftInput);

  if (!result.success) {
    return {
      valid: false,
      imported: [],
      errors: result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
      review: [],
    };
  }

  const review = result.data.flatMap((movie) => {
    const items = [];
    if (!movie.poster) items.push(`${movie.slug}: pôster ausente; placeholder será usado.`);
    if (!movie.availabilityBr.length) {
      items.push(`${movie.slug}: disponibilidade no Brasil ainda não verificada.`);
    }
    if (!movie.editorial) items.push(`${movie.slug}: página individual sem conteúdo editorial.`);
    return items;
  });

  return { valid: true, imported: result.data, errors: [], review };
}
