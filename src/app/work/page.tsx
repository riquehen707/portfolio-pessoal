import { Column, Meta, Schema } from "@once-ui-system/core";

import { buildWorkFeedEntries } from "@/app/work/feedData";
import { getAllWorkProjects } from "@/app/work/projectData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WorkFeed } from "@/components/work/WorkFeed";
import {
  about,
  baseURL,
  blog,
  contentStrategy,
  person,
  productsPage,
  servicesPage,
  work,
} from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./work.module.scss";

const workStrategy = contentStrategy.pages.work;

export async function generateMetadata() {
  const image = buildOgImage(work.title);
  const generatedMeta = Meta.generate({
    title: work.title,
    description: work.description,
    baseURL,
    image,
    path: work.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, work.title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
    keywords: workStrategy.seo.keywords,
  };
}

export default function Work() {
  const projects = getAllWorkProjects();
  const feedEntries = buildWorkFeedEntries(projects);

  if (feedEntries.length === 0) {
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
          { name: work.label, url: `${baseURL}${work.path}` },
        ]}
      />

      <WorkFeed
        entries={feedEntries}
        blogHref={blog.path}
        productsHref={productsPage.path}
        servicesHref={servicesPage.path}
      />
    </Column>
  );
}
