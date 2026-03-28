"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button, Column, Heading, Row, Tag, Text } from "@once-ui-system/core";

import styles from "./ProjectsTimeline.module.scss";

type TimelineProject = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  kindLabel: string;
  stack: string[];
};

type ProjectsTimelineProps = {
  projects: TimelineProject[];
};

export function ProjectsTimeline({ projects }: ProjectsTimelineProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "prev" | "next") => {
    const element = viewportRef.current;
    if (!element) return;

    const delta = Math.max(280, element.clientWidth * 0.72);
    element.scrollBy({
      left: direction === "next" ? delta : -delta,
      behavior: "smooth",
    });
  };

  return (
    <Column className={styles.root} gap="16">
      <Row className={styles.header} fillWidth horizontal="between" s={{ direction: "column" }}>
        <Column className={styles.copy} gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Linha do tempo
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Todos os projetos em uma navegacao horizontal
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            O portfolio mistura projetos pessoais e estudos de caso para mostrar processo,
            especialidade e direcao enquanto os primeiros cases de clientes entram.
          </Text>
        </Column>

        <Row className={styles.controls} gap="8" s={{ fillWidth: true }}>
          <Button className={styles.control} variant="secondary" size="s" onClick={() => scrollByAmount("prev")}>
            Anterior
          </Button>
          <Button className={styles.control} variant="secondary" size="s" onClick={() => scrollByAmount("next")}>
            Proximo
          </Button>
        </Row>
      </Row>

      <div ref={viewportRef} className={styles.viewport}>
        <div className={styles.track}>
          {projects.map((project) => (
            <div className={styles.item} key={project.slug}>
              <Link className={styles.card} href={`/work/${project.slug}`}>
                <Column gap="12">
                  <Text className={styles.year} variant="label-default-s" onBackground="neutral-weak">
                    {project.year}
                  </Text>
                  <Tag size="s" background="neutral-alpha-weak">
                    {project.kindLabel}
                  </Tag>
                  <Heading className={styles.title} as="h3" variant="heading-strong-m">
                    {project.title}
                  </Heading>
                  <Text onBackground="neutral-weak">{project.summary}</Text>
                  <Row className={styles.tags} wrap gap="8">
                    {project.stack.slice(0, 3).map((item) => (
                      <Tag key={`${project.slug}-${item}`} size="s" background="neutral-alpha-weak">
                        {item}
                      </Tag>
                    ))}
                  </Row>
                </Column>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Column>
  );
}
