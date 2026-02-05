// /src/app/gallery/page.tsx

import { Column, Flex, Meta, Schema, Heading, Text, Row, Tag, Button, Line } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person, work } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  const galleryTags = ["Bastidores", "Referências visuais", "Processo criativo", "Estudos"];
  return (
    <Column maxWidth="l" gap="24" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="12">
        <Heading as="h1" variant="heading-strong-xl">
          {gallery.title}
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          {gallery.description}
        </Text>
        <Row gap="8" wrap>
          {galleryTags.map((tag) => (
            <Tag key={tag} size="s" background="neutral-alpha-weak">
              {tag}
            </Tag>
          ))}
        </Row>
        <Row gap="12" wrap>
          <Button href={work.path} variant="secondary" size="m" arrowIcon>
            Ver projetos
          </Button>
          <Button href={`mailto:${person.email}`} variant="tertiary" size="m" arrowIcon>
            Falar comigo
          </Button>
        </Row>
      </Column>

      <Line maxWidth="40" />

      <Flex maxWidth="l">
        <GalleryView />
      </Flex>
    </Column>
  );
}
