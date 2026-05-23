import classNames from "classnames";
import Image from "next/image";

import styles from "./AvatarSticker.module.scss";

const expressionSrc = {
  attentive: "/images/avatar-expressions/attentive.svg",
  confident: "/images/avatar-expressions/confident.svg",
  focused: "/images/avatar-expressions/focused.svg",
  curious: "/images/avatar-expressions/curious.svg",
  neutral: "/images/avatar-expressions/neutral.svg",
  thinking: "/images/avatar-expressions/thinking.svg",
};

export type AvatarExpression = keyof typeof expressionSrc;

type AvatarStickerProps = {
  expression: AvatarExpression;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  decorative?: boolean;
};

const expressionAlt: Record<AvatarExpression, string> = {
  attentive: "Expressão atenta",
  confident: "Expressão confiante",
  focused: "Expressão focada",
  curious: "Expressão curiosa",
  neutral: "Expressão neutra",
  thinking: "Expressão pensativa",
};

export function AvatarSticker({
  expression,
  size = "md",
  className,
  decorative = true,
}: AvatarStickerProps) {
  return (
    <Image
      src={expressionSrc[expression]}
      alt={decorative ? "" : expressionAlt[expression]}
      aria-hidden={decorative}
      className={classNames(styles.root, styles[size], className)}
      width={128}
      height={128}
      sizes="(max-width: 768px) 28vw, 8rem"
      loading="lazy"
      draggable={false}
    />
  );
}
