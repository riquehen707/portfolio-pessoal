import { ReactNode } from "react";
import clsx from "clsx";

type HighlightProps = {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "neutral";
};

export function Highlight({ children, className, tone = "brand" }: HighlightProps) {
  const toneStyles =
    tone === "brand"
      ? "bg-gradient-to-r from-indigo-50 to-emerald-50 border-indigo-200"
      : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";

  return (
    <div
      className={clsx(
        "my-6 rounded-lg border px-5 py-4",
        "text-gray-900 dark:text-gray-100",
        toneStyles,
        className
      )}
    >
      <div className="text-base leading-relaxed [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
