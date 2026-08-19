import { localIdeaRepository } from "./localIdeaRepository";

const repository = localIdeaRepository;

export const getAllIdeas = () => repository.getAll();
export const getPublishedIdeas = () => repository.getPublished();
export const getIdeaBySlug = (slug: string) => repository.getBySlug(slug);
export const getIdeaById = (id: string) => repository.getById(id);

export async function getRelatedIdeas(id: string) {
  const [idea, published] = await Promise.all([getIdeaById(id), getPublishedIdeas()]);
  if (!idea) return [];
  const explicit = new Set(idea.relatedIdeaIds);
  return published
    .filter((candidate) => candidate.id !== id)
    .map((candidate) => ({ candidate, score: (explicit.has(candidate.id) ? 100 : 0) + candidate.tags.filter((tag) => idea.tags.includes(tag)).length * 2 + candidate.categories.filter((category) => idea.categories.includes(category)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.updatedAt.localeCompare(a.candidate.updatedAt))
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

export type { Idea, IdeaStatus } from "@/content/ideas/ideaSchema";

