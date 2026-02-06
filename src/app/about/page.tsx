import {
  Avatar,
  Button,
  Column,
  Card,
  Grid,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import {
  baseURL,
  about,
  person,
  social,
  services,
  servicesPage,
  productsPage,
  blog,
  daily,
  work,
} from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { buildOgImage } from "@/utils/og";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  const focusCards = services.slice(0, 3).map((service) => ({
    title: service.title,
    description: service.summary,
    badge: service.badge,
    href: `${servicesPage.path}/${service.slug}`,
    cta: "Ver serviço",
  }));
  const contentCards = [
    {
      title: blog.title,
      description: blog.description,
      href: blog.path,
      cta: "Ir para o blog",
    },
    {
      title: daily.title,
      description: daily.description,
      href: daily.path,
      cta: "Ver diário",
    },
  ];
  const principles = [
    "Clareza estratégica",
    "Velocidade com qualidade",
    "Autonomia para o cliente",
    "Decisões guiadas por dados",
  ];
  const uxHighlights = [
    {
      title: "UX orientada a dados",
      description:
        "Mapeio jornadas, metas e métricas para reduzir atrito e aumentar conversão.",
      tag: "Pesquisa",
    },
    {
      title: "Interface visual com identidade",
      description:
        "Hierarquia clara, tipografia consistente e estética alinhada à marca.",
      tag: "UI",
    },
    {
      title: "Custom ou design system",
      description:
        "Posso criar do zero ou acelerar com sistemas como Once UI e outros, conforme prazo e orçamento.",
      tag: "Sistema",
    },
  ];
  const uxVisualTags = ["Pesquisa UX", "Wireframes", "Prototipagem", "Sistemas de design"];
  const uxVisual = buildOgImage("UX e UI sob medida", "Pesquisa • UI • Sistemas");
  const calendarLink = about.calendar?.display ? about.calendar.link : `mailto:${person.email}`;
  const calendarLabel = about.calendar?.display ? "Agendar conversa" : "Enviar e-mail";
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center" gap="xl">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            padding="xl"
            gap="m"
            flex={3}
            horizontal="center"
            background="surface"
            border="neutral-alpha-weak"
            radius="l"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40} gap="xl">
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">Agende uma conversa</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          <Column className={styles.section} fillWidth gap="m">
            <Heading as="h2" variant="display-strong-s" marginBottom="m">
              UX e experiência visual
            </Heading>
            <Text onBackground="neutral-weak">
              Alinho estratégia, conteúdo e interface para reduzir fricção e aumentar resultado.
              Posso criar uma UI 100% customizada ou acelerar com sistemas de design quando faz sentido
              para prazo e orçamento.
            </Text>
            <Grid columns="2" s={{ columns: 1 }} gap="16">
              <Column gap="16">
                {uxHighlights.map((item) => (
                  <Card
                    key={item.title}
                    direction="column"
                    gap="12"
                    paddingX="20"
                    paddingY="20"
                    radius="l"
                    background="surface"
                    style={{ background: "var(--surface-weak)" }}
                    border="neutral-alpha-weak"
                  >
                    <Row gap="8" wrap>
                      <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                        {item.tag}
                      </Tag>
                    </Row>
                    <Heading as="h3" variant="heading-strong-m">
                      {item.title}
                    </Heading>
                    <Text onBackground="neutral-weak">{item.description}</Text>
                  </Card>
                ))}
              </Column>
              <Card
                direction="column"
                gap="12"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                border="neutral-alpha-weak"
              >
                <Media
                  src={uxVisual}
                  alt="Visão geral de UX"
                  aspectRatio="16/9"
                  radius="m"
                  border="neutral-alpha-weak"
                  sizes="(min-width: 1024px) 480px, 100vw"
                />
                <Row gap="8" wrap>
                  {uxVisualTags.map((tag) => (
                    <Tag key={tag} size="s" background="neutral-alpha-weak">
                      {tag}
                    </Tag>
                  ))}
                </Row>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Protótipos, guidelines e variações visuais ajudam a validar a experiência antes
                  da implementação final.
                </Text>
              </Card>
            </Grid>
          </Column>

          <Column className={styles.section} fillWidth gap="m">
            <Heading as="h2" variant="display-strong-s" marginBottom="m">
              O que eu faço
            </Heading>
            <Text onBackground="neutral-weak">
              Projetos digitais com foco em resultado: sites que convertem, SEO técnico robusto e
              automações que economizam tempo e organizam dados.
            </Text>
            <Grid columns="3" s={{ columns: 1 }} gap="16">
              {focusCards.map((card) => (
                <Card
                  key={card.title}
                  direction="column"
                  gap="12"
                  paddingX="20"
                  paddingY="20"
                  radius="l"
                  background="surface"
                  style={{ background: "var(--surface-weak)" }}
                  border="neutral-alpha-weak"
                  fillHeight
                >
                  <Row gap="8" wrap>
                    <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                      {card.badge}
                    </Tag>
                  </Row>
                  <Heading as="h3" variant="heading-strong-m">
                    {card.title}
                  </Heading>
                  <Text onBackground="neutral-weak">{card.description}</Text>
                  <Button href={card.href} variant="secondary" size="s" arrowIcon>
                    {card.cta}
                  </Button>
                </Card>
              ))}
            </Grid>
          </Column>

          <Column className={styles.section} fillWidth gap="m">
            <Heading as="h2" variant="display-strong-s" marginBottom="m">
              Conteúdo e bastidores
            </Heading>
            <Text onBackground="neutral-weak">
              Além do portfólio, compartilho aprendizados no blog e no diário para mostrar processos,
              decisões e experimentos reais.
            </Text>
            <Grid columns="2" s={{ columns: 1 }} gap="16">
              {contentCards.map((card) => (
                <Card
                  key={card.title}
                  direction="column"
                  gap="12"
                  paddingX="20"
                  paddingY="20"
                  radius="l"
                  background="surface"
                  style={{ background: "var(--surface-weak)" }}
                  border="neutral-alpha-weak"
                  fillHeight
                >
                  <Heading as="h3" variant="heading-strong-m">
                    {card.title}
                  </Heading>
                  <Text onBackground="neutral-weak">{card.description}</Text>
                  <Button href={card.href} variant="secondary" size="s" arrowIcon>
                    {card.cta}
                  </Button>
                </Card>
              ))}
            </Grid>
            <Row gap="12" wrap>
              <Button href={work.path} variant="primary" size="m" arrowIcon>
                Ver projetos
              </Button>
              <Button href={productsPage.path} variant="tertiary" size="m" arrowIcon>
                Ver produtos digitais
              </Button>
            </Row>
          </Column>

          <Column className={styles.section} fillWidth gap="m">
            <Heading as="h2" variant="display-strong-s" marginBottom="m">
              Princípios que guiam o trabalho
            </Heading>
            <Row gap="8" wrap>
              {principles.map((item) => (
                <Tag key={item} size="m" background="neutral-alpha-weak">
                  {item}
                </Tag>
              ))}
            </Row>
          </Column>

          {about.work.display && (
            <Column className={styles.section} fillWidth gap="m">
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.work.experiences.map((experience, index) => {
                  const experienceImages =
                    experience.images && experience.images.length > 0
                      ? experience.images
                      : [
                          {
                            src: buildOgImage(experience.company, "Experiência • Projeto"),
                            alt: `Imagem de ${experience.company}`,
                            width: 16,
                            height: 9,
                          },
                        ];

                  return (
                    <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                      <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                        <Text id={experience.company} variant="heading-strong-l">
                          {experience.company}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Row>
                      <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                        {experience.role}
                      </Text>
                      <Column as="ul" gap="16">
                        {experience.achievements.map(
                          (achievement: React.ReactNode, index: number) => (
                            <Text
                              as="li"
                              variant="body-default-m"
                              key={`${experience.company}-${index}`}
                            >
                              {achievement}
                            </Text>
                          ),
                        )}
                      </Column>
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experienceImages.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    </Column>
                  );
                })}
              </Column>
            </Column>
          )}

          {about.studies.display && (
            <Column className={styles.section} fillWidth gap="m">
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </Column>
          )}

          {about.technical.display && (
            <Column className={styles.section} fillWidth gap="m">
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => {
                  const skillImages =
                    skill.images && skill.images.length > 0
                      ? skill.images
                      : [
                          {
                            src: buildOgImage(skill.title, "Habilidade • Stack"),
                            alt: `Imagem de ${skill.title}`,
                            width: 16,
                            height: 9,
                          },
                        ];

                  return (
                    <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                      <Text id={skill.title} variant="heading-strong-l">
                        {skill.title}
                      </Text>
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {skill.description}
                      </Text>
                      {skill.tags && skill.tags.length > 0 && (
                        <Row wrap gap="8" paddingTop="8">
                          {skill.tags.map((tag, tagIndex) => (
                            <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                              {tag.name}
                            </Tag>
                          ))}
                        </Row>
                      )}
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skillImages.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    </Column>
                  );
                })}
              </Column>
            </Column>
          )}

          <Column className={styles.section} fillWidth gap="m">
            <Heading as="h2" variant="display-strong-s">
              Quer conversar sobre seu projeto?
            </Heading>
            <Text onBackground="neutral-weak">
              Se você precisa de um site com performance, SEO técnico ou automações de dados, posso
              ajudar com diagnóstico e execução.
            </Text>
            <Row gap="12" s={{ direction: "column" }}>
              <Button href={calendarLink} variant="primary" size="m" arrowIcon>
                {calendarLabel}
              </Button>
              <Button href={`mailto:${person.email}`} variant="tertiary" size="m" arrowIcon>
                Enviar e-mail
              </Button>
            </Row>
          </Column>
        </Column>
      </Row>
    </Column>
  );
}
