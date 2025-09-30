// src/utils/formatDate.ts
export function formatDate(date: string, includeRelative = false) {
  const now = new Date();
  if (!date.includes("T")) date = `${date}T00:00:00`;
  const target = new Date(date);

  const diffMs = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths =
    now.getMonth() - target.getMonth() + (now.getFullYear() - target.getFullYear()) * 12;
  const diffYears = Math.floor(diffMonths / 12);

  let relative = "Hoje";
  if (diffYears > 0)       relative = `${diffYears} ano${diffYears > 1 ? "s" : ""} atrás`;
  else if (diffMonths > 0) relative = `${diffMonths} mês${diffMonths > 1 ? "es" : ""} atrás`;
  else if (diffDays > 0)   relative = `${diffDays} dia${diffDays > 1 ? "s" : ""} atrás`;

  const fullDate = target.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return includeRelative ? `${fullDate} (${relative})` : fullDate;
}
