import { Card, Column, Grid, Heading, Text } from "@once-ui-system/core";
import type { ServiceLanding } from "@/types";

export function LegacyCommercialModel({ service }: { service: ServiceLanding }) {
  return (
    <Card
      as="section"
      direction="column"
      gap="16"
      paddingX="24"
      paddingY="24"
      radius="l"
      background="surface"
      border="neutral-alpha-weak"
      aria-labelledby="modelo-comercial-title"
    >
      <Heading as="h2" id="modelo-comercial-title" variant="heading-strong-l">
        Implantação e continuidade
      </Heading>
      <Grid columns="2" s={{ columns: 1 }} gap="16">
        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Implantação
          </Text>
          <Text variant="heading-strong-m">{service.commercialModel.setup.amount}</Text>
          <Text onBackground="neutral-weak">{service.commercialModel.setup.description}</Text>
        </Column>
        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Mensalidade
          </Text>
          <Text variant="heading-strong-m">{service.commercialModel.monthly.amount}</Text>
          <Text onBackground="neutral-weak">
            Inclui {service.commercialModel.monthly.includes.join(", ").toLocaleLowerCase("pt-BR")}.
          </Text>
        </Column>
      </Grid>
      <Text variant="body-default-s" onBackground="neutral-weak">
        {service.commercialModel.terms}
      </Text>
    </Card>
  );
}
