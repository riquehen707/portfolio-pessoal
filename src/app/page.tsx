import {
  Badge,
  Button,
  Column,
  Heading,
  Meta,
  RevealFx,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, blog, home, person, routes, servicesPage, work } from "@/resources";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const workProjects = getPosts(["src", "app", "work", "projects"]);
  const hasWorkProjects = workProjects.length > 0;
  const hasMoreWorkProjects = workProjects.length > 1;

  return (
    <Column maxWidth="m" horizontal="center" paddingY="20" gap="40">
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

      <RevealFx fillWidth translateY="8">
        <Column fillWidth gap="16">
          {home.featured.display && (
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
          )}

          <Column gap="8">
            <Heading wrap="balance" variant="display-strong-l">
              Sites, landing pages e automações para negócios locais.
            </Heading>

            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              Presença digital mais clara para vender, atender e crescer melhor.
            </Text>
          </Column>

          <Row gap="12" wrap>
            <Button href={work.path} variant="primary" size="m" arrowIcon>
              Ver projetos
            </Button>
            <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
              Ver serviços
            </Button>
          </Row>

        </Column>
      </RevealFx>

      {hasWorkProjects ? (
        <Column fillWidth gap="12">
          <Column gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Projetos
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Trabalhos recentes
            </Heading>
          </Column>

          <Projects range={[1, hasMoreWorkProjects ? 3 : 1]} marginBottom="0" paddingX="0" />
          
          {hasMoreWorkProjects && (
            <SmartLink href={work.path} suffixIcon="arrowRight">
              Ver portfólio completo
            </SmartLink>
          )}
        </Column>
      ) : (
        <Column fillWidth gap="12">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Portfólio em atualização
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Novos cases entram em breve
          </Heading>
          <Row gap="12" wrap>
            <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
              Ver serviços
            </Button>
            <Button href={about.path} variant="secondary" size="m" arrowIcon>
              Sobre mim
            </Button>
          </Row>
        </Column>
      )}

      {routes["/blog"] && (
        <Column fillWidth gap="12">
          <Column gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Blog
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Textos sobre internet, negócio e tecnologia
            </Heading>
          </Column>

          <Posts range={[1, 2]} featuredFirst marginBottom="0" />

          <SmartLink href={blog.path} suffixIcon="arrowRight">
            Ir para o blog
          </SmartLink>
        </Column>
      )}

      <Column fillWidth gap="12">
        <Heading as="h2" variant="display-strong-s">
          Tem algo em mente?
        </Heading>
        <Row gap="12" wrap>
          <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
            Ver serviços
          </Button>
          <Button href={`mailto:${person.email}`} variant="secondary" size="m" arrowIcon>
            Falar comigo
          </Button>
        </Row>
      </Column>

      <Mailchimp />
    </Column>
  );
}
