import React from "react";
import { Card, Column, Grid, Heading, List, ListItem, Row, Text, Icon } from "@once-ui-system/core";

type Item = string | React.ReactNode;

export default function ProsCons({
  pros = [],
  cons = [],
  title = "Prós e contras",
  prosTitle = "Prós",
  consTitle = "Contras",
}: {
  pros: Item[];
  cons: Item[];
  title?: string;
  prosTitle?: string;
  consTitle?: string;
}) {
  return (
    <Card
      padding="16"
      radius="l"
      border="neutral-alpha-weak"
      background="layer-1"
      marginTop="16"
      marginBottom="16"
    >
      <Column gap="12">
        <Heading as="div" variant="heading-strong-m">
          {title}
        </Heading>

        <Grid columns="2" gap="12">
          {/* PROS */}
          <Card padding="12" radius="m" background="brand-alpha-weak" border="brand-alpha-medium">
            <Column gap="8">
              <Row gap="6" vertical="center">
                <Icon name="check" size="xs" />
                <Text variant="label-strong-s">{prosTitle}</Text>
              </Row>
              {pros.length ? (
                <List>
                  {pros.map((p, i) => (
                    <ListItem key={i} marginTop="4" marginBottom="6">
                      <Text variant="body-default-s" onBackground="brand-strong">
                        {p}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text variant="body-default-s" onBackground="brand-strong">
                  —
                </Text>
              )}
            </Column>
          </Card>

          {/* CONS */}
          <Card padding="12" radius="m" background="neutral-alpha-weak" border="neutral-alpha-medium">
            <Column gap="8">
              <Row gap="6" vertical="center">
                <Icon name="close" size="xs" />
                <Text variant="label-strong-s">{consTitle}</Text>
              </Row>
              {cons.length ? (
                <List>
                  {cons.map((c, i) => (
                    <ListItem key={i} marginTop="4" marginBottom="6">
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        {c}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text variant="body-default-s" onBackground="neutral-strong">
                  —
                </Text>
              )}
            </Column>
          </Card>
        </Grid>
      </Column>
    </Card>
  );
}