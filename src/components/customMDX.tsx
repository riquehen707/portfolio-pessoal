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
  // ✅ usar a Table do Once-UI
  Table,
} from "@once-ui-system/core";

import Figure from "@/components/mdx/Figure";
import Gallery from "@/components/mdx/Gallery";
import { baseURL } from "@/resources";

// Charts (Client Components)
import * as Charts from "@/components/mdx/ChartsClient";

/* ========================== Helpers ========================== */

function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (React.isValidElement(node)) return getText((node.props as any)?.children);
  return "";
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and ");
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-",
  }).replace(/\-+/g, "-");
}

function toLocalSrc(src: string): string {
  try {
    const u = new URL(src, baseURL);
    const site = new URL(baseURL);
    if (u.host === site.host || u.host === "demo.magic-portfolio.com") {
      return u.pathname + u.search;
    }
    return src;
  } catch {
    return src;
  }
}

function toArray(children: ReactNode): React.ReactElement[] {
  const arr = React.Children.toArray(children) as React.ReactElement[];
  return arr.filter(Boolean) as React.ReactElement[];
}

function extractPlain(node: ReactNode): string {
  return getText(node).trim();
}

/* ========================== Links ========================== */

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} underline="hover" {...props}>
        {children}
      </SmartLink>
    );
  }
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

/* ========================== Imagens ========================== */

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Media requires a valid 'src' property.");
    }
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
      {...props}
    />
  );
}

/* ========================== Headings com âncora ========================== */

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({
    children,
    ...props
  }: Omit<React.ComponentProps<typeof HeadingLink>, "as" | "id">) => {
    const slug = slugify(getText(children));
    return (
      <HeadingLink
        marginTop="24"
        marginBottom="12"
        as={as}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };
  CustomHeading.displayName = `${as}`;
  return CustomHeading;
}

/* ========================== Texto, Código e afins ========================== */

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

function createCodeBlock(props: any) {
  if (props.children && props.children.props) {
    const { className, children } = props.children.props;
    const language = className?.replace("language-", "") || "text";
    const label =
      language === "text"
        ? "Code"
        : language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: typeof children === "string" ? children.trimEnd() : children,
            language,
            label,
          },
        ]}
        copyButton
        style={{ overflowX: "auto" }}
      />
    );
  }
  return (
    <pre style={{ overflowX: "auto" }} {...props}>
      {props.children}
    </pre>
  );
}

/* ========================== Listas, HR, Blockquote, Kbd ========================== */

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

const Blockquote = ({ children }: { children: ReactNode }) => (
  <blockquote
    style={{
      borderLeft: "3px solid color-mix(in srgb, currentColor 20%, transparent)",
      margin: "16px 0",
      padding: "8px 16px",
    }}
  >
    <Text variant="body-default-m" onBackground="neutral-medium">
      {children}
    </Text>
  </blockquote>
);

const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd
    style={{
      fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco)",
      fontSize: "0.85em",
      padding: "2px 6px",
      borderRadius: 6,
      border: "1px solid color-mix(in srgb, currentColor 20%, transparent)",
      background:
        "color-mix(in srgb, currentColor 6%, color(from white srgb r g b) / 0.6)",
    }}
  >
    {children}
  </kbd>
);

/* ========================== Table Adapter (MDX -> Once UI Table) ========================== */
/**
 * Aceita a estrutura HTML do MDX:
 *   table > thead > tr > th
 *   table > tbody > tr > td
 * E converte para o componente Table do Once-UI.
 *
 * Suporta dois modos de render:
 * 1) Data props: <Table columns={...} rows={...} ... />
 * 2) Composição: <Table><Table.Header>…</Table.Header>…</Table>
 *
 * Se a sua versão só aceitar um dos modos, o adaptador detecta e usa o suportado.
 */

type MDXTableAdapterProps = {
  children: ReactNode;
  stickyHeader?: boolean;
  striped?: boolean;
  dense?: boolean;
  fullWidth?: boolean;
};

function MDXTableAdapter({
  children,
  stickyHeader = true,
  striped = true,
  dense = false,
  fullWidth = true,
}: MDXTableAdapterProps) {
  // parse estrutura
  let columns: { key: string; header: string }[] = [];
  let rows: Record<string, ReactNode>[] = [];

  const tableChildren = toArray(children);

  const thead = tableChildren.find(
    (c) => React.isValidElement(c) && (c as any).type === "thead"
  ) as React.ReactElement | undefined;

  const tbody = tableChildren.find(
    (c) => React.isValidElement(c) && (c as any).type === "tbody"
  ) as React.ReactElement | undefined;

  // headers
  if (thead) {
    const tr = toArray((thead.props as any)?.children).find(
      (r) => React.isValidElement(r) && (r as any).type === "tr"
    ) as React.ReactElement | undefined;

    const ths = tr ? toArray(tr.props.children).filter(
      (el) => React.isValidElement(el) && ((el as any).type === "th" || (el as any).type === "td")
    ) : [];

    columns = ths.map((thEl, i) => {
      const header = extractPlain((thEl as any).props.children);
      const key = header
        ? header.toLowerCase().replace(/[^\w]+/g, "_")
        : `col_${i + 1}`;
      return { key, header: header || `Col ${i + 1}` };
    });
  }

  // body rows
  if (tbody) {
    const trs = toArray(tbody.props.children).filter(
      (r) => React.isValidElement(r) && (r as any).type === "tr"
    ) as React.ReactElement[];

    rows = trs.map((trEl) => {
      const tds = toArray(trEl.props.children).filter(
        (el) => React.isValidElement(el) && ((el as any).type === "td" || (el as any).type === "th")
      ) as React.ReactElement[];
      const row: Record<string, ReactNode> = {};
      tds.forEach((cellEl, i) => {
        const col = columns[i] || { key: `col_${i + 1}`, header: `Col ${i + 1}` };
        // preserva ReactNode (links, inline code, etc.)
        row[col.key] = (cellEl as any).props.children;
      });
      return row;
    });
  }

  // detecta API da Table do Once-UI
  const hasCompositionAPI =
    Table && typeof (Table as any) === "object" && ((Table as any).Header || (Table as any).Head);

  // wrapper responsivo
  const wrapperStyle: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    overflowX: "auto",
    marginTop: 8,
    marginBottom: 16,
    WebkitOverflowScrolling: "touch",
  };

  if (hasCompositionAPI) {
    const T: any = Table as any;
    const Header = T.Header || T.Head;
    const Body = T.Body || T.Content || T.Rows;
    const RowC = T.Row || T.Tr;
    const Cell = T.Cell || T.Td;
    const HeaderCell = T.HeaderCell || T.Th || Cell;

    return (
      <div style={wrapperStyle}>
        <T stickyHeader={stickyHeader} striped={striped} dense={dense}>
          {columns.length > 0 && (
            <Header>
              <RowC>
                {columns.map((c) => (
                  <HeaderCell key={c.key}>{c.header}</HeaderCell>
                ))}
              </RowC>
            </Header>
          )}
          <Body>
            {rows.map((r, ri) => (
              <RowC key={ri}>
                {columns.map((c) => (
                  <Cell key={c.key}>{r[c.key]}</Cell>
                ))}
              </RowC>
            ))}
          </Body>
        </T>
      </div>
    );
  }

  // fallback: API por dados (columns/rows)
  // convencionamos um shape comum: columns: [{key, header}], rows: [{[key]: ReactNode}]
  return (
    <div style={wrapperStyle}>
      <Table
        // @ts-expect-error: dependendo da sua versão, a tipagem pode diferir
        columns={columns}
        rows={rows}
        stickyHeader={stickyHeader}
        striped={striped}
        dense={dense}
      />
    </div>
  );
}

/* ========================== Wrapper seguro p/ <Meta /> ========================== */
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
  blockquote: Blockquote as any,
  kbd: Kbd as any,

  // ✅ Tabela do Once-UI via adaptador (sem HTML nativo no output final)
  table: MDXTableAdapter as any,
  // thead/tbody/tr/th/td continuam vindo do MDX, o adaptador os lê internamente
  thead: (props: any) => <thead {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr {...props} />,
  th: (props: any) => <th {...props} />,
  td: (props: any) => <td {...props} />,

  // Once-UI (seguros no MDX)
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

  // imagens avançadas
  Figure,
  Gallery,

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
            remarkGfm, // GFM: tabelas/checkbox/autolink
          ],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
