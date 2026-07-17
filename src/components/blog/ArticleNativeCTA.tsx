import styles from "./ArticleNativeCTA.module.scss";

type ArticleNativeCTAProps = {
  theme?: string;
};

function getContext(theme?: string) {
  const normalized = theme?.toLowerCase() ?? "";

  if (normalized.includes("beleza") || normalized.includes("estética")) {
    return {
      label: "Recomendação",
      title: "Checklist de agenda para salão",
      description:
        "Use como roteiro para revisar Google, Instagram, WhatsApp e retorno de clientes antes de investir mais em anúncios.",
      items: ["Perfil local claro", "Conteúdo com prova", "Agenda sem atrito"],
      href: "/contact",
      action: "Pedir diagnóstico",
    };
  }

  if (normalized.includes("educação")) {
    return {
      label: "Recomendação",
      title: "Diagnóstico de captação",
      description:
        "Um roteiro curto para revisar matrícula, página, tráfego e atendimento comercial.",
      items: ["Oferta compreensível", "Público definido", "Próxima ação clara"],
      href: "/contact",
      action: "Avaliar captação",
    };
  }

  return {
    label: "Recomendação",
    title: "Diagnóstico digital rápido",
    description:
      "Um ponto de partida para encontrar gargalos de presença, conversão e operação.",
    items: ["Página clara", "CTA visível", "Métrica acompanhada"],
    href: "/contact",
    action: "Pedir diagnóstico",
  };
}

export function ArticleNativeCTA({ theme }: ArticleNativeCTAProps) {
  const content = getContext(theme);

  return (
    <aside
      className={styles.inline}
      aria-label="Recomendação contextual"
    >
      <span className={styles.label}>{content.label}</span>
      <h2 className={styles.title}>{content.title}</h2>
      <p className={styles.description}>{content.description}</p>
      <ul className={styles.list}>
        {content.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a className={styles.action} href={content.href}>
        {content.action}
      </a>
    </aside>
  );
}
