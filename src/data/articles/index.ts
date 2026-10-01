import { cache } from "react";
import { type BlogFile, getPosts } from "@/utils/utils";
import { normalizeContentLocale, type ContentLocale } from "@/lib/contentLocale";

const BLOG_POSTS_PATH = ["src", "app", "blog", "posts"] as const;

// MDX continua local. Esta fachada remove conhecimento de caminho dos consumidores
// sem antecipar armazenamento remoto ou compilação de MDX vindo do banco.
export const getAllContentArticles = cache((): BlogFile[] => getPosts([...BLOG_POSTS_PATH]));

export const getArticlesByLocale = cache((locale: ContentLocale): BlogFile[] =>
  getAllContentArticles().filter((article) => article.metadata.locale === locale),
);

// Mantém a experiência e as listagens legadas em português sem exigir migração dos MDX existentes.
export const getAllArticles = cache(() => getArticlesByLocale("pt-BR"));

export const getArticleBySlug = cache((slug: string, locale: ContentLocale = "pt-BR") =>
  getArticlesByLocale(normalizeContentLocale(locale)).find((article) => article.slug === slug),
);

export const getArticlesByTranslationKey = cache((translationKey: string) =>
  getAllContentArticles().filter((article) => article.metadata.translationKey === translationKey),
);

export type { BlogFile };
