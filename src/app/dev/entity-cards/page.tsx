import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityCardExamples } from "@/components/entities";

export const metadata: Metadata = {
  title: "Prévia de cards de entidades",
  robots: { index: false, follow: false },
};

export default function EntityCardsPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <main><EntityCardExamples /></main>;
}
