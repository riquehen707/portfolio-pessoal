import { Avatar, Button, Column, Grid, Heading, Meta, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import styles from "@/components/about/about.module.scss";
import { about, baseURL, person, social, technicalApproach, work } from "@/resources";
import { getPosts } from "@/utils/utils";

const kindLabels = {
  personal: "Projeto pessoal",
  study: "Estudo de caso",
  client: "Case de cliente",
} as const;

const problemPoints = [
  "Transformo presença digital solta em uma apresentação que faz sentido para quem chega.",
  "Organizo a jornada para reduzir dúvida, reforçar confiança e facilitar o próximo passo.",
  "Conecto página, SEO e atendimento para que o digital trabalhe com mais constância a seu favor.",
];

const audiencePoints = [
  "Psicólogas, terapeutas e profissionais que dependem de confiança antes do primeiro contato.",
  "Consultores e especialistas cujo serviço precisa ser percebido como claro, sério e bem posicionado.",
  "Autônomos e prestadores de serviço que querem mais previsibilidade sem perder a própria voz.",
];

const processSteps = [
  {
    title: "Oferta clara",
    description: "Defino mensagem, hierarquia e CTA para a pessoa certa entender rápido o que você faz.",
  },
  {
    title: "SEO e estrutura",
    description: "Organizo conteúdo, arquitetura e sinais técnicos para o site ser encontrado e bem lido.",
  },
  {
    title: "Contato sem ruído",
    description: "Conecto página, WhatsApp ou formulário para o interesse virar conversa com mais facilidade.",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const whatsappLink = social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;
  const technicalTags = Array.from(
    new Set(
      about.technical.skills.flatMap((skill) => skill.tags?.map((tag) => tag.name) ?? []),
    ),
  ).slice(0, 6);

  const proofProjects = getPosts(["src", "app", "work", "projects"])
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt ?? 0).getTime() - new Date(a.metadata.publishedAt ?? 0).getTime(),
    )
    .slice(0, 3);

  return (
    <Column className={styles.page} maxWidth="m" gap="32" paddingTop="24">
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

      <Column className={styles.hero} fillWidth gap="24" padding="32">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Sobre o trabalho
            </Tag>
            <Heading variant="display-strong-l" wrap="balance">
              Ajudo prestadores de serviço a construir uma presença digital que passa confiança antes do contato.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.lead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Não é sobre parecer grande. É sobre fazer a pessoa certa entender, em poucos segundos,
              quem você é, o que resolve e por que vale a pena conversar com você.
            </Text>
            <Row className={styles.actions} gap="12" wrap>
              <Button href={whatsappLink} prefixIcon="whatsapp" size="m" variant="primary">
                Falar no WhatsApp
              </Button>
              <Button href={work.path} size="m" variant="secondary" arrowIcon>
                Ver projetos
              </Button>
            </Row>
            <SmartLink href={technicalApproach.path} suffixIcon="arrowRight">
              Ver abordagem técnica
            </SmartLink>
          </Column>

          <Column className={styles.heroAside} gap="16">
            <Row className={styles.profileCard} gap="16" vertical="start">
              <div className={styles.avatarWrap}>
                <Avatar src={person.avatar} size="l" />
              </div>
              <Column className={styles.profileMeta} gap="8">
                <Text variant="label-strong-m">{person.name}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Bahia, Brasil / páginas, SEO técnico e automação
                </Text>
              </Column>
            </Row>

            <div className={styles.collage}>
              <div className={`${styles.collageCard} ${styles.collageWide}`}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  O que eu resolvo
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-m" wrap="balance">
                  Presença digital sem direção comercial.
                </Heading>
                <Text className={styles.collageBody} variant="body-default-m" onBackground="neutral-weak">
                  Quando a página não acolhe nem explica, a conversa esfria antes mesmo de começar.
                </Text>
              </div>
              <div className={styles.collageCard}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Para quem
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-s" wrap="balance">
                  Profissionais que precisam transmitir segurança antes do contato.
                </Heading>
                <Text className={styles.collageBody} variant="body-default-s" onBackground="neutral-weak">
                  Principalmente quem vive de reputação, indicação e relacionamento.
                </Text>
              </div>
              <div className={styles.collageCard}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Como entra a técnica
                </Text>
                <Heading className={styles.collageTitle} as="h2" variant="heading-strong-s" wrap="balance">
                  Técnica como suporte, não como enfeite.
                </Heading>
                <Text className={styles.collageBody} variant="body-default-s" onBackground="neutral-weak">
                  SEO, velocidade e manutenção entram para sustentar a experiência, não para roubar a cena.
                </Text>
              </div>
            </div>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Direção
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              O que eu resolvo e para quem
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Quando a página acerta o tom, a pessoa entende mais rápido por que vale a pena seguir a conversa.
            </Text>
          </Column>
        </Row>

        <Grid className={styles.splitGrid} columns="2" s={{ columns: 1 }} gap="16">
          <Column className={styles.infoCard} gap="12">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              O que eu resolvo
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Mais geração de clientes com mensagem, estrutura e fluxo claros.
            </Heading>
            <Column as="ul" className={styles.infoList} gap="12">
              {problemPoints.map((point) => (
                <Text as="li" key={point} variant="body-default-m" onBackground="neutral-weak">
                  {point}
                </Text>
              ))}
            </Column>
          </Column>

          <Column className={styles.infoCard} gap="12">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Para quem
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Prestadores de serviço que vivem de reputação, indicação e relacionamento.
            </Heading>
            <Column as="ul" className={styles.infoList} gap="12">
              {audiencePoints.map((point) => (
                <Text as="li" key={point} variant="body-default-m" onBackground="neutral-weak">
                  {point}
                </Text>
              ))}
            </Column>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Como funciona
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Um processo simples para sair do improviso
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              O objetivo não é empilhar recurso. É criar uma base clara, encontrável e boa de usar.
            </Text>
          </Column>
        </Row>

        <Grid className={styles.stepGrid} columns="3" s={{ columns: 1 }} gap="16">
          {processSteps.map((step, index) => (
            <Column key={step.title} className={styles.stepCard} gap="12">
              <Text className={styles.stepIndex} variant="label-strong-s">
                0{index + 1}
              </Text>
              <Text variant="heading-strong-m">{step.title}</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {step.description}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Prova
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Alguns projetos para ver como isso aparece na prática
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              O portfólio mistura projetos pessoais e estudos de caso para mostrar como essas decisões aparecem no trabalho real.
            </Text>
          </Column>
          <SmartLink href={work.path} suffixIcon="arrowRight">
            Ver todos os projetos
          </SmartLink>
        </Row>

        <Grid className={styles.proofGrid} columns="3" s={{ columns: 1 }} gap="16">
          {proofProjects.map((project) => {
            const tag = project.metadata.tag ?? project.metadata.tags?.[0];
            const kind =
              project.metadata.kind &&
              kindLabels[project.metadata.kind as keyof typeof kindLabels];

            return (
              <Column key={project.slug} className={styles.proofCard} gap="12">
                <Row gap="8" wrap>
                  {kind && (
                    <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                      {kind}
                    </Tag>
                  )}
                  {tag && (
                    <Tag size="s" background="neutral-alpha-weak">
                      {tag}
                    </Tag>
                  )}
                </Row>
                <Text variant="heading-strong-m" wrap="balance">
                  {project.metadata.title}
                </Text>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {project.metadata.summary ?? project.metadata.title}
                </Text>
                <SmartLink href={`/work/${project.slug}`} suffixIcon="arrowRight">
                  Abrir case
                </SmartLink>
              </Column>
            );
          })}
        </Grid>
      </Column>

      <Column className={`${styles.sectionPanel} ${styles.depthPanel}`} fillWidth gap="16" padding="24">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="center" s={{ direction: "column" }}>
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Profundidade técnica
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              A parte técnica existe para sustentar a leitura principal, não para competir com ela.
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Se quiser entrar mais a fundo em stack, componentização, SCSS modular, SEO técnico e performance, essa camada fica em uma página separada.
            </Text>
          </Column>

          <Column className={styles.depthAside} gap="12">
            <Row className={styles.depthTags} gap="8" wrap>
              {technicalTags.map((item) => (
                <Tag key={item} size="s" background="neutral-alpha-weak">
                  {item}
                </Tag>
              ))}
            </Row>
            <SmartLink href={technicalApproach.path} suffixIcon="arrowRight">
              Explorar abordagem técnica
            </SmartLink>
          </Column>
        </Row>
      </Column>
    </Column>
  );
}
