import type { ComponentProps } from "react";

import classNames from "classnames";

import { Button } from "@once-ui-system/core";

import styles from "./CTAButton.module.scss";

type CTAButtonProps = ComponentProps<typeof Button>;

export function CTAButton({
  className,
  variant = "primary",
  size = "m",
  children,
  ...props
}: CTAButtonProps) {
  return (
    <Button className={classNames(styles.button, className)} variant={variant} size={size} {...props}>
      {children}
    </Button>
  );
}
