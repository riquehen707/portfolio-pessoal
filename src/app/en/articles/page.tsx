import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByLocale } from "@/data/articles";
import { getArticlePath } from "@/lib/contentLocale";

export default function EnglishArticlesPage() {
  const articles = getArticlesByLocale("en");
  // No empty international index is published before real English content exists.
  if (!articles.length) notFound();
  return <main lang="en" style={{ width: "min(100% - 2rem, 70rem)", margin: "5rem auto" }}><h1>Articles</h1><div>{articles.map((article) => <article key={article.slug}><h2><Link href={getArticlePath(article.slug, "en")}>{article.metadata.title}</Link></h2><p>{article.metadata.summary}</p></article>)}</div></main>;
}
