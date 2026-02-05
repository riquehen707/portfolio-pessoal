import React from "react";
import {
  Card,
  Column,
  Grid,
  Heading,
  Row,
  Text,
  Badge,
  Line,
} from "@once-ui-system/core";

type CompareItem = {
  title: string;
  subtitle?: string;
  highlight?: string;      // linha curta de destaque
  points?: (string | React.ReactNode)[];
  tags?: string[];
};

export default function CompareCards({
  items,
  title = "Comparação",
  columns = 2,
  variant = "default",
}: {
  items: CompareItem[];
  title?: string;
  columns?: 2 | 3;
  variant?: "default" | "compact";
}) {
  if (!items?.length) return null;

  const colCount = Math.min(columns, items.length) as 2 | 3;

  return (
    <Card
      padding="16"
      radius="l"
      border="neutral-alpha-weak"
      background="surface"
      style={{ background: "var(--layer-1)" }}
      marginTop="16"
      marginBottom="16"
    >
      <Column gap="12">
        <Heading as="div" variant="heading-strong-m">
          {title}
        </Heading>

        <Grid columns={colCount} gap="12">
          {items.map((it, i) => (
            <Card
              key={i}
              padding="16"
              radius="m"
              border="neutral-alpha-medium"
              background="surface"
              style={{ background: "var(--layer-2)" }}
            >
              <Column gap="8">
                <Column gap="2">
                  <Heading as="div" variant="heading-strong-s">
                    {it.title}
                  </Heading>
                  {it.subtitle && (
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {it.subtitle}
                    </Text>
                  )}
                </Column>

                {it.highlight && (
                  <Text
                    variant="body-default-s"
                    onBackground="brand-strong"
                    style={{ fontWeight: 600 }}
                  >
                    {it.highlight}
                  </Text>
                )}

                {variant === "default" && it.points?.length ? (
                  <Column gap="8" marginTop="4">
                    {it.points.map((p, j) => (
                      <Row key={j}>
                        <Text variant="body-default-s" onBackground="neutral-medium">
                          • {p}
                        </Text>
                      </Row>
                    ))}
                  </Column>
                ) : null}

                {it.tags?.length ? (
                  <>
                    <Line />
                    <Row gap="8" wrap>
                      {it.tags.map((t) => (
                        <Badge
                          key={t}
                          background="neutral-alpha-weak"
                          onBackground="neutral-strong"
                          textVariant="label-default-xs"
                          paddingX="8"
                          paddingY="4"
                          arrow={false}
                        >
                          {t}
                        </Badge>
                      ))}
                    </Row>
                  </>
                ) : null}
              </Column>
            </Card>
          ))}
        </Grid>
      </Column>
    </Card>
  );
}
