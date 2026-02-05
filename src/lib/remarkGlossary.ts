// src/lib/remarkGlossary.ts
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

// Escapa chars especiais para regex
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Cria um nó JSX do MDX: <GlossTerm term="x">children</GlossTerm>
function makeGlossTermNode(term: string, value: string) {
  return {
    type: "mdxJsxTextElement",
    name: "GlossTerm",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "term",
        value: term,
      },
    ],
    children: [{ type: "text", value }],
  };
}

type GlossaryMap = Record<string, string>;

type Options = {
  glossary?: GlossaryMap;
  /** se true, tenta casar só palavras inteiras */
  wordBoundary?: boolean;
};

const remarkGlossary: Plugin<[Options?]> = (options = {}) => {
  const glossary = options.glossary ?? {};
  const terms = Object.keys(glossary).filter(Boolean);

  if (terms.length === 0) {
    return (tree: any) => tree;
  }

  // Ordem: termos maiores primeiro evita matches parciais (ex. "moral" antes de "moralidade")
  const sortedTerms = terms.sort((a, b) => b.length - a.length);

  // marca se já apareceu no documento
  const seen = new Set<string>();

  // pré-compila regex para cada termo
  const termRegexes = sortedTerms.map((t) => {
    const escaped = escapeRegExp(t);
    const boundary = options.wordBoundary ?? true;

    // Ex.: /\bmodernidade líquida\b/i
    // boundary true tenta não pegar dentro de outras palavras
    const pattern = boundary ? `\\b${escaped}\\b` : escaped;
    return { term: t, regex: new RegExp(pattern, "i") };
  });

  return (tree: any) => {
    visit(tree, "text", (node: any, index: number | undefined, parent: any) => {
      if (!parent || typeof index !== "number") return;
      if (!node.value || typeof node.value !== "string") return;

      let text = node.value;
      let newChildren: any[] | null = null;

      // tenta aplicar vários termos na MESMA text node
      for (const { term, regex } of termRegexes) {
        if (seen.has(term)) continue;

        const match = text.match(regex);
        if (!match || match.index == null) continue;

        const start = match.index;
        const matchedText = match[0];
        const end = start + matchedText.length;

        const before = text.slice(0, start);
        const after = text.slice(end);

        const replacement: any[] = [];
        if (before) replacement.push({ type: "text", value: before });

        replacement.push(makeGlossTermNode(term, matchedText));
        seen.add(term);

        if (after) replacement.push({ type: "text", value: after });

        // atualiza text para permitir outro termo no "after"
        text = after;
        newChildren = (newChildren ? newChildren.concat(replacement) : replacement);

        // se não houver after, acabou
        if (!after) break;
      }

      if (newChildren) {
        parent.children.splice(index, 1, ...newChildren);
        // não precisa retornar índice, unist-util-visit lida bem
      }
    });

    return tree;
  };
};

export default remarkGlossary;
