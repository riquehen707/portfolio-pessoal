import type { Idea } from "@/content/ideas/ideaSchema";

export interface IdeaRepository {
  getAll(): Promise<Idea[]>;
  getPublished(): Promise<Idea[]>;
  getBySlug(slug: string): Promise<Idea | undefined>;
  getById(id: string): Promise<Idea | undefined>;
}

