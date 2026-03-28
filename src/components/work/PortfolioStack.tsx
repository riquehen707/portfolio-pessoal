import { Card, Column, Grid, Heading, Icon, Row, Tag, Text } from "@once-ui-system/core";

import { IconName } from "@/resources/icons";

import styles from "./PortfolioStack.module.scss";

type StackItem = {
  title: string;
  icon: IconName;
  note: string;
  focus: string;
};

type PortfolioStackProps = {
  items: StackItem[];
};

export function PortfolioStack({ items }: PortfolioStackProps) {
  return (
    <Column gap="16">
      <Column gap="8">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Stack principal
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Tecnologias que mais aparecem nos meus projetos
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          A base tecnica prioriza performance, SEO para e-commerce e blogs, manutencao simples e
          interfaces com boa leitura em mobile.
        </Text>
      </Column>

      <Grid className={styles.grid} columns="4" m={{ columns: 2 }} s={{ columns: 1 }} gap="16">
        {items.map((item) => (
          <Card
            className={styles.card}
            key={item.title}
            direction="column"
            gap="12"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            style={{ background: "var(--surface-weak)" }}
            fillHeight
          >
            <Row className={styles.iconWrap} horizontal="center" vertical="center">
              <Icon name={item.icon} size="m" />
            </Row>
            <Heading as="h3" variant="heading-strong-m">
              {item.title}
            </Heading>
            <Text onBackground="neutral-weak">{item.note}</Text>
            <Tag size="s" background="neutral-alpha-weak">
              {item.focus}
            </Tag>
          </Card>
        ))}
      </Grid>
    </Column>
  );
}
