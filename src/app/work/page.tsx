import { Column, Meta, Schema } from "@once-ui-system/core";

import { getAllWorkProjects } from "@/app/work/projectData";
import { buildWorkJourneyEntries } from "@/app/work/timelineData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { AscendingTimeline } from "@/components/work/AscendingTimeline";
import { about, baseURL, contentStrategy, person, work } from "@/resources";

import styles from "./work.module.scss";

const workStrategy = contentStrategy.pages.work;

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: work.title,
      description: work.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
      path: work.path,
    }),
    keywords: workStrategy.seo.keywords,
  };
}

export default function Work() {
  const projects = getAllWorkProjects();
  const journeyEntries = buildWorkJourneyEntries(projects);

  if (journeyEntries.length === 0) {
    return null;
  }

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Projetos", url: `${baseURL}${work.path}` },
        ]}
      />

      <AscendingTimeline entries={journeyEntries} />
    </Column>
  );
}
