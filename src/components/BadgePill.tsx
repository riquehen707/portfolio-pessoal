import { Icon, Text } from "@once-ui-system/core";

import { IconName } from "@/resources/icons";

import styles from "./BadgePill.module.scss";

type BadgePillProps = {
  label: string;
  icon?: IconName;
  tone?: "default" | "accent";
};

export function BadgePill({ label, icon, tone = "default" }: BadgePillProps) {
  return (
    <div className={styles.root} data-tone={tone}>
      {icon && (
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon name={icon} size="xs" />
        </span>
      )}
      <Text className={styles.label} variant="body-default-s">
        {label}
      </Text>
    </div>
  );
}
