import { ReactNode } from "react";
import clsx from "clsx";

type Variant = "info" | "warning" | "success" | "danger" | "neutral";

type CalloutProps = {
  title?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const variantStyles: Record<Variant, string> = {
  info: "border-blue-400 bg-blue-50 text-blue-900",
  warning: "border-amber-400 bg-amber-50 text-amber-900",
  success: "border-emerald-400 bg-emerald-50 text-emerald-900",
  danger: "border-rose-400 bg-rose-50 text-rose-900",
  neutral: "border-gray-300 bg-gray-50 text-gray-800",
};

const variantIcon: Record<Variant, string> = {
  info: "ℹ️",
  warning: "⚠️",
  success: "✅",
  danger: "⛔",
  neutral: "💬",
};

export function Callout({
  title,
  variant = "info",
  children,
  className,
}: CalloutProps) {
  return (
    <div
      className={clsx(
        "my-6 rounded-md border-l-4 p-4",
        "shadow-sm",
        "prose-a:underline",
        variantStyles[variant],
        className
      )}
      role="note"
      aria-label={title ?? "Callout"}
    >
      {title ? (
        <div className="mb-1 flex items-center gap-2 font-semibold">
          <span aria-hidden>{variantIcon[variant]}</span>
          <span>{title}</span>
        </div>
      ) : (
        <div className="mb-1 font-semibold">{variantIcon[variant]} Nota</div>
      )}
      <div className="[&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
