import { cache } from "react";
import { type BlogFile, getPosts } from "@/utils/utils";

const BLOG_POSTS_PATH = ["src", "app", "blog", "posts"] as const;

// MDX continua local. Esta fachada remove conhecimento de caminho dos consumidores
// sem antecipar armazenamento remoto ou compilação de MDX vindo do banco.
export const getAllArticles = cache((): BlogFile[] => getPosts([...BLOG_POSTS_PATH]));
export const getArticleBySlug = cache((slug: string) => getAllArticles().find((article) => article.slug === slug));

export type { BlogFile };
