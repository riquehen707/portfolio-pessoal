import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import clsx from "clsx";

type MetaBarProps = {
  publishedAt: string | Date;
  updatedAt?: string | Date;
  readTimeMin?: number; // ✅ novo
  className?: string;
};

export default function MetaBar({ publishedAt, updatedAt, readTimeMin, className }: MetaBarProps) {
  const fmt = (d: string | Date) =>
    format(typeof d === "string" ? new Date(d) : d, "d 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <div
      className={clsx(
        "mt-2 mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm",
        "text-gray-600 dark:text-gray-300",
        className
      )}
    >
      <span>Publicado em {fmt(publishedAt)}</span>
      {updatedAt ? <span className="opacity-80">• Atualizado em {fmt(updatedAt)}</span> : null}
      {typeof readTimeMin === "number" ? (
        <span className="opacity-80">• {readTimeMin} min de leitura</span>
      ) : null}
    </div>
  );
}
