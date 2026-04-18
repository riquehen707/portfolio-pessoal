import { Column, IconButton, Row, Text } from "@once-ui-system/core";

import { person, social } from "@/resources";

import { BrandSignature } from "./BrandSignature";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" className={styles.footer} fillWidth padding="8" horizontal="center">
      <Row
        className={styles.shell}
        maxWidth="m"
        fillWidth
        paddingY="16"
        paddingX="20"
        gap="20"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Column className={styles.identity} gap="12">
          <BrandSignature href="/" descriptor="Transformar complexidade em clareza" />
          <Text className={styles.statement} variant="body-default-s" onBackground="neutral-weak">
            Presença digital que funciona. Visual que posiciona. Sistemas feitos para durar.
          </Text>
        </Column>

        <Column className={styles.meta} gap="12" horizontal="end" s={{ horizontal: "center" }}>
          <Text className={styles.copy} variant="body-default-s" onBackground="neutral-weak">
            <Text onBackground="neutral-weak">© {currentYear}</Text>
            <Text paddingX="4">{person.name}</Text>
            <Text onBackground="neutral-weak">/ estratégia, design e sistemas</Text>
          </Text>

          <Row className={styles.social} gap="12">
            {social.map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  />
                ),
            )}
          </Row>
        </Column>
      </Row>

      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
