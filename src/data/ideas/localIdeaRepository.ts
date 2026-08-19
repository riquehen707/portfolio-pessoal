import { ideas } from "@/content/ideas/ideas";
import type { IdeaRepository } from "./ideaRepository";

export const localIdeaRepository: IdeaRepository = {
  async getAll() { return [...ideas]; },
  async getPublished() { return ideas.filter((idea) => idea.publicationStatus === "published"); },
  async getBySlug(slug) { return ideas.find((idea) => idea.slug === slug || idea.aliases.includes(slug)); },
  async getById(id) { return ideas.find((idea) => idea.id === id); },
};

