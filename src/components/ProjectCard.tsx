import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  imageAlt?: string;
  title: string;
  objective?: string;
  description: string;
  link: string;
  kind?: string;
  kindValue?: "personal" | "study" | "client";
  stack?: string[];
  category?: string;
  audience?: string;
  state?: string;
  service?: { href: string; label: string };
  variant?: "default" | "feature" | "compact";
}

export function ProjectCard({
  href, images, imageAlt, title, objective, description, kind, category,
  audience, state, service, variant = "default", priority = false,
}: ProjectCardProps) {
  return (
    <article className={styles.card} data-variant={variant}>
      {images[0] && (
        <div className={styles.preview}>
          <Image src={images[0]} alt={imageAlt ?? title} fill priority={priority}
            sizes={variant === "feature" ? "(max-width: 800px) 100vw, 640px" : "(max-width: 800px) 100vw, 560px"} />
        </div>
      )}
      <div className={styles.content}>
        <p className={styles.type}>{category ?? kind}</p>
        <h3>{title}</h3>
        {audience && <p className={styles.audience}>{audience}</p>}
        {objective && <p>{objective}</p>}
        {description && <p>{description}</p>}
        {state && <p className={styles.state}>{state}</p>}
        <div className={styles.actions}>
          <Link href={href} aria-label={`Ver case: ${title}`} data-analytics-event="project_click" data-analytics-label={title}>
            Ver case <span aria-hidden="true">→</span>
          </Link>
          {service && <Link className={styles.service} href={service.href}>Serviço: {service.label}</Link>}
        </div>
      </div>
    </article>
  );
}
