import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const editorialBlocks = new Set([
  "Callout",
  "Quote",
  "Highlight",
  "Definition",
  "CommonMistake",
  "CommonMistakes",
  "DecisionPoints",
  "NumberedContextList",
  "PracticalExample",
  "EditorialChecklist",
  "EditorialComparison",
  "EditorialTable",
  "Diagnostic",
  "Insight",
  "EditorialFAQ",
  "RelatedArticles",
  "Reveal",
  "MindMap",
  "KeyTakeaway",
]);

const visualBlocks = new Set([
  ...editorialBlocks,
  "QuickSummary",
  "NextSteps",
  "ArticleCTA",
  "Figure",
  "Gallery",
  "BeforeAfter",
  "SimpleBarChart",
  "SimpleLineChart",
]);

const remarkEditorialLimits: Plugin = () => (tree: any, file: any) => {
  const usedTypes = new Set<string>();
  let ctaCount = 0;

  visit(tree, ["mdxJsxFlowElement", "mdxJsxTextElement"], (node: any) => {
    if (editorialBlocks.has(node.name)) usedTypes.add(node.name);
    if (node.name === "ArticleCTA") ctaCount += 1;
  });

  if (usedTypes.size > 4) {
    file.message(
      `O artigo usa ${usedTypes.size} tipos de bloco editorial (${[...usedTypes].join(", ")}). O limite é 4.`,
    );
  }

  if (ctaCount > 1) {
    file.message(`O artigo usa ${ctaCount} CTAs principais. O limite é 1.`);
  }

  const children = Array.isArray(tree.children) ? tree.children : [];
  let consecutiveVisuals = 0;
  for (const node of children) {
    const isVisual = node.type === "mdxJsxFlowElement" && visualBlocks.has(node.name);
    if (isVisual) {
      consecutiveVisuals += 1;
      if (consecutiveVisuals > 2) {
        file.message("Evite mais de dois blocos visuais consecutivos sem texto normal entre eles.");
        break;
      }
    } else if (node.type === "paragraph" && node.children?.some((child: any) => child.value?.trim())) {
      consecutiveVisuals = 0;
    }
  }
};

export default remarkEditorialLimits;
