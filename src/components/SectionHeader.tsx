import { Column, Heading, SmartLink, Text } from "@once-ui-system/core";

import styles from "./SectionHeader.module.scss";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: SectionHeaderProps) {
  const hasAction = Boolean(actionLabel && actionHref);

  return (
    <div className={styles.root} data-has-action={hasAction ? "true" : "false"}>
      <Column className={styles.copy} gap="8">
        <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
          {eyebrow}
        </Text>
        <Heading as="h2" variant="display-strong-s" wrap="balance">
          {title}
        </Heading>
        <Text className={styles.description} onBackground="neutral-weak" variant="heading-default-m">
          {description}
        </Text>
      </Column>

      {hasAction && (
        <div className={styles.action}>
          <SmartLink href={actionHref!} suffixIcon="arrowRight">
            {actionLabel}
          </SmartLink>
        </div>
      )}
    </div>
  );
}
