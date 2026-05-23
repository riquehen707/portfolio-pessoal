import classNames from "classnames";

import styles from "./AvatarSticker.module.scss";

export type AvatarExpression =
  | "confident"
  | "thinking"
  | "focused"
  | "curious"
  | "happy"
  | "surprised";

type AvatarStickerProps = {
  expression: AvatarExpression;
  size?: "sm" | "md" | "lg";
  className?: string;
  decorative?: boolean;
};

const expressionSrc: Record<AvatarExpression, string> = {
  confident: "/images/avatar-expressions/confident.svg",
  thinking: "/images/avatar-expressions/thinking.svg",
  focused: "/images/avatar-expressions/focused.svg",
  curious: "/images/avatar-expressions/curious.svg",
  happy: "/images/avatar-expressions/happy.svg",
  surprised: "/images/avatar-expressions/surprised.svg",
};

const expressionAlt: Record<AvatarExpression, string> = {
  confident: "Expressão confiante",
  thinking: "Expressão pensativa",
  focused: "Expressão focada",
  curious: "Expressão curiosa",
  happy: "Expressão positiva",
  surprised: "Expressão surpresa",
};

export function AvatarSticker({
  expression,
  size = "md",
  className,
  decorative = true,
}: AvatarStickerProps) {
  return (
    <img
      src={expressionSrc[expression]}
      alt={decorative ? "" : expressionAlt[expression]}
      aria-hidden={decorative}
      className={classNames(styles.root, styles[size], className)}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}