// src/components/mdx.tsx
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";
import remarkGfm from "remark-gfm";

import {
  Heading,
  HeadingLink,
  Text,
  InlineCode,
  CodeBlock,
  TextProps,
  MediaProps,
  Accordion,
  AccordionGroup,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  List,
  ListItem,
  Line,
  Meta as UIMeta,
  Badge,
} from "@once-ui-system/core";

// === seus componentes MDX (custom) ===
import Figure from "@/components/mdx/Figure";
import Gallery from "@/components/mdx/Gallery";
import { HoverNote } from "@/components/mdx/HoverNote";
import { Callout } from "@/components/mdx/Callout";
import { Quote } from "@/components/mdx/Quote";
import { Highlight } from "@/components/mdx/Highlight";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/mdx/Collapsible";
import MindMap from "@/components/mdx/MindMap";
import Reveal from "@/components/mdx/Reveal";

// Charts (Client Components)
import * as Charts from "@/components/mdx/ChartsClient";

import { baseURL } from "@/resources";

/* ========================== Helpers ========================== */

function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (React.isValidElement(node)) return getText((node.props as any)?.children);
  return "";
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and ");
  return transliterate(strWithAnd, { lowercase: true, separator: "-" }).replace(/\-+/g, "-");
}

function isSameOrigin(href: string): boolean {
  try {
    const u = new URL(href, baseURL);
    const site = new URL(baseURL);
    return u.origin === site.origin;
  } catch {
    return href.startsWith("/");
  }
}

function toLocalSrc(src: string): string {
  try {
    const u = new URL(src, baseURL);
    const site = new URL(baseURL);
    if (u.origin === site.origin || u.host === "demo.magic-portfolio.com") {
      return u.pathname + u.search;
    }
    return src;
  } catch {
    return src;
  }
}

/* ========================== Elementos base ========================== */

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  nofollow?: boolean;
};

function CustomLink({ href, children, nofollow, ...props }: CustomLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  if (isSameOrigin(href)) {
    const u = href.startsWith("http") ? new URL(href) : null;
    const localHref = u ? u.pathname + u.search : href;
    return (
      <SmartLink href={localHref} {...props}>
        {children}
      </SmartLink>
    );
  }

  const rel = ["noopener", "noreferrer", nofollow ? "nofollow" : undefined]
    .filter(Boolean)
    .join(" ");
  return (
    <a href={href} target="_blank" rel={rel} {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, loading, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }
  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={toLocalSrc(src)}
      loading={loading ?? "lazy"}
      {...props}
    />
  );
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({
    children,
    ...props
  }: Omit<React.ComponentProps<typeof HeadingLink>, "as" | "id">) => {
    const slug = slugify(getText(children));
    return (
      <HeadingLink marginTop="24" marginBottom="12" as={as} id={slug} {...props}>
        {children}
      </HeadingLink>
    );
  };
  CustomHeading.displayName = `${as}`;
  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

// Suporte a meta "title" no bloco de código: ```ts title=arquivo.ts
function parseCodeMeta(className?: string, metastring?: string) {
  const language = (className || "").replace("language-", "") || "text";
  let label = language.charAt(0).toUpperCase() + language.slice(1);
  if (metastring) {
    const match = metastring.match(/title=("[^"]+"|'[^']+'|[^ \t]+)/);
    if (match) label = match[1].replace(/^['"]|['"]$/g, "");
  }
  return { language, label };
}

function createCodeBlock(props: any) {
  const child = props?.children?.props;
  if (child && child.className) {
    const { className, children, metastring } = child;
    const { language, label } = parseCodeMeta(className, metastring);
    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[{ code: children, language, label }]}
        copyButton
      />
    );
  }
  return <pre {...props} />;
}

function createList({ children }: { children: ReactNode }) {
  return <List>{children}</List>;
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
      {children}
    </ListItem>
  );
}

function createHR() {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

// Blockquote estilizado
function BlockQuote({ children }: { children: ReactNode }) {
  return (
    <Row
      padding="16"
      radius="m"
      border="neutral-alpha-medium"
      background="layer-1"
      style={{ borderLeftWidth: 4, borderLeftStyle: "solid" }}
    >
      <Text variant="body-default-m" onBackground="neutral-medium">
        {children}
      </Text>
    </Row>
  );
}

// Tabela responsiva (HTML nativo com wrapper)
function TableWrapper({ children }: { children: ReactNode }) {
  return (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>
    </div>
  );
}
function Th(props: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid var(--border-color)" }}
      {...props}
    />
  );
}
function Td(props: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td style={{ padding: "8px", borderBottom: "1px solid var(--layer-2)" }} {...props} />;
}

/* ===== Shortcodes para usar dentro do MDX ===== */
function PillarBadge({ slug, label }: { slug: string; label?: string }) {
  return (
    <Badge
      href={`/blog?pillar=${encodeURIComponent(slug)}`}
      background="brand-alpha-weak"
      onBackground="brand-strong"
      textVariant="label-default-s"
      paddingX="12"
      paddingY="6"
      arrow={false}
    >
      {label ?? slug}
    </Badge>
  );
}
function CategoryBadge({ name }: { name: string }) {
  return (
    <Badge
      href={`/blog?tag=${encodeURIComponent(name)}`}
      background="neutral-alpha-weak"
      onBackground="neutral-strong"
      textVariant="label-default-s"
      paddingX="12"
      paddingY="6"
      arrow={false}
    >
      {name}
    </Badge>
  );
}

/* ========================== Wrapper seguro para <Meta /> ========================== */
const MetaMDX = (props: React.ComponentProps<typeof UIMeta>) => <UIMeta {...props} />;

/* ========================== Mapeamento MDX ========================== */

const components = {
  // Markdown/HTML básicos
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList as any,
  ul: createList as any,
  li: createListItem as any,
  hr: createHR as any,
  blockquote: BlockQuote as any,
  table: TableWrapper as any,
  th: Th as any,
  td: Td as any,

  // Once UI (seguros no MDX)
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  Meta: MetaMDX,

  // === componentes custom mapeados no MDX ===
  Figure,
  Gallery,
  HoverNote,
  Callout,
  Quote,
  Highlight,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  MindMap,
  Reveal,

  // charts (client components)
  ChartContainer: Charts.ChartContainer,
  ResponsiveContainer: Charts.ResponsiveContainer,
  BarChart: Charts.BarChart,
  Bar: Charts.Bar,
  XAxis: Charts.XAxis,
  YAxis: Charts.YAxis,
  Tooltip: Charts.Tooltip,
  CartesianGrid: Charts.CartesianGrid,
  Legend: Charts.Legend,
  LineChart: Charts.LineChart,
  Line: Charts.Line,
  AreaChart: Charts.AreaChart,
  Area: Charts.Area,
  PieChart: Charts.PieChart,
  Pie: Charts.Pie,
  Cell: Charts.Cell,

  // shortcodes
  PillarBadge,
  CategoryBadge,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      options={{
        ...(props as any)?.options,
        mdxOptions: {
          ...((props as any)?.options?.mdxOptions || {}),
          remarkPlugins: [
            ...(((props as any)?.options?.mdxOptions?.remarkPlugins) || []),
            remarkGfm, // suporte a footnotes GFM
          ],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
