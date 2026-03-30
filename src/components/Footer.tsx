import { IconButton, Row, Text } from "@once-ui-system/core";

import { person, social } from "@/resources";

import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" className={styles.footer} fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={`${styles.shell} ${styles.mobile}`}
        maxWidth="m"
        paddingY="12"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text className={styles.copy} variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">Copyright {currentYear}</Text>
          <Text paddingX="4">{person.name}</Text>
          <Text onBackground="neutral-weak">/ front-end, SEO técnico e automação</Text>
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
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
