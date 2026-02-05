// src/app/page.tsx

import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes, services, servicesPage, productsPage, daily, blog } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from "@/utils/utils";
// import { BlogPillars } from "@/components/blog/BlogPillars"; // fica pra depois

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const serviceHighlight = services[0];
  const blogPosts = getPosts(["src", "app", "blog", "posts"]);
  const blogData = blogPosts.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt || "",
      tag: post.metadata.tag,
      image: post.metadata.image,
    },
  }));
  const dailyPosts = getPosts(["src", "app", "diario", "posts"]);
  const dailyData = dailyPosts.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt || "",
      tag: post.metadata.tag,
      image: post.metadata.image,
    },
  }));
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* Projeto em destaque */}
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>

      {/* Conteúdo: Blog + Diário */}
      {(routes["/blog"] || routes["/diario"]) && (
        <Column fillWidth gap="16" marginBottom="xl">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={56} />
          </Row>

          <Row fillWidth gap="16" s={{ direction: "column" }}>
            {routes["/blog"] && (
              <Column
                fillWidth
                paddingX="24"
                paddingY="24"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                gap="16"
                s={{ paddingX: "16", paddingY: "20" }}
              >
                <Heading as="h2" variant="display-strong-s" wrap="balance">
                  {blog.title}
                </Heading>
                <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                  Ensaios, análises e reflexões mais profundas. Conteúdo pensado para durar.
                </Text>
                <Posts range={[1, 3]} columns="1" thumbnail direction="row" data={blogData} />
                <Button href={blog.path} variant="primary" size="m" arrowIcon>
                  Ver todos os artigos
                </Button>
              </Column>
            )}

            {routes["/diario"] && (
              <Column
                fillWidth
                paddingX="24"
                paddingY="24"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                gap="16"
                s={{ paddingX: "16", paddingY: "20" }}
              >
                <Heading as="h2" variant="display-strong-s" wrap="balance">
                  {daily.title}
                </Heading>
                <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                  Notas rápidas, bastidores e aprendizados do dia a dia.
                </Text>
                <Posts range={[1, 3]} columns="1" thumbnail direction="row" data={dailyData} />
                <Button href={daily.path} variant="secondary" size="m" arrowIcon>
                  Ver diário
                </Button>
              </Column>
            )}
          </Row>

          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={56} />
          </Row>
        </Column>
      )}

      {/* Mais projetos */}
      <Projects range={[2]} />

      {/* Serviços e produtos */}
      <RevealFx delay={0.4} paddingTop="8">
        <Column
          fillWidth
          gap="16"
          paddingX="24"
          paddingY="24"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          s={{ paddingX: "16", paddingY: "20" }}
        >
          <Heading as="h2" variant="display-strong-s">
            {servicesPage.title}
          </Heading>
          <Text onBackground="neutral-weak">{servicesPage.intro.lead}</Text>
          <Row gap="12" s={{ direction: "column" }}>
            <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
              Explorar serviços
            </Button>
            <Button href={productsPage.path} variant="secondary" size="m" arrowIcon>
              Ver produtos digitais
            </Button>
          </Row>
          <Text onBackground="neutral-weak" variant="body-default-s">
            {serviceHighlight.hero.budget} · {serviceHighlight.hero.price} · {serviceHighlight.hero.duration}
          </Text>
        </Column>
      </RevealFx>

      {/* Newsletter */}
      <Mailchimp />
    </Column>
  );
}
