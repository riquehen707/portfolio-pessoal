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
  "Organizo a mensagem para a pessoa certa entender rapido o que voce faz.",
  "Estruturo paginas para gerar conversa, nao apenas visita.",
  "Conecto pagina, SEO e atendimento para reduzir ruido no caminho ate o contato.",
];

const audiencePoints = [
  "Psicologos, terapeutas e profissionais de atendimento.",
  "Consultores e especialistas que dependem de autoridade e clareza.",
  "Autonomos e prestadores de servico que querem sair da tentativa e erro no digital.",
];

const processSteps = [
  {
    title: "Pagina clara",
    description: "Defino oferta, hierarquia e CTA para facilitar a decisao de quem chega.",
  },
  {
    title: "SEO e estrutura",
    description: "Ajusto conteudo, arquitetura e sinais tecnicos para o site ser encontrado e entendido.",
  },
  {
    title: "Atendimento organizado",
    description: "Conecto contato, automacoes e rotinas simples para a conversa nao se perder.",
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
    <Column className={styles.page} maxWidth="m" gap="24" paddingTop="24">
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

      <Column className={styles.hero} fillWidth gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Sobre o trabalho
            </Tag>
            <Heading variant="display-strong-l" wrap="balance">
              Ajudo prestadores de servico a transformar presenca digital em clientes com mais clareza.
            </Heading>
            <div className={styles.accentLine} />
            <Text className={styles.lead} variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Crio paginas, estrutura de SEO e organizacao de atendimento para quem precisa vender servicos
              sem depender de tentativa e erro no digital.
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
              Ver abordagem tecnica
            </SmartLink>
          </Column>

          <Column className={styles.heroAside} gap="16">
            <Row className={styles.profileCard} gap="12" vertical="center">
              <Avatar src={person.avatar} size="l" />
              <Column className={styles.profileMeta} gap="2">
                <Text variant="label-strong-m">{person.name}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Bahia, Brasil / paginas, SEO tecnico e automacao
                </Text>
              </Column>
            </Row>

            <div className={styles.collage}>
              <div className={`${styles.collageCard} ${styles.collageWide}`}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  O que eu resolvo
                </Text>
                <Text variant="heading-strong-m" wrap="balance">
                  Presenca digital confusa, lenta ou sem direcao comercial.
                </Text>
              </div>
              <div className={styles.collageCard}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Para quem
                </Text>
                <Text variant="body-default-m">
                  Prestadores de servico que precisam converter melhor.
                </Text>
              </div>
              <div className={styles.collageCard}>
                <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                  Como entra a tecnica
                </Text>
                <Text variant="body-default-m">
                  Como suporte para clareza, SEO, velocidade e manutencao.
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
              Direcao
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              O que eu resolvo e para quem
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              A pagina precisa explicar com rapidez por que vale a pena falar com voce e qual o proximo passo.
            </Text>
          </Column>
        </Row>

        <Grid className={styles.splitGrid} columns="2" s={{ columns: 1 }} gap="16">
          <Column className={styles.infoCard} gap="12">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              O que eu resolvo
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Geracao de clientes com mensagem, estrutura e fluxo mais claros.
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
              Prestadores de servico que vivem de reputacao, indicacao e relacionamento.
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
              O objetivo nao e empilhar recursos. E deixar a base digital clara, encontravel e preparada para contato.
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
              Alguns projetos para ver como isso aparece na pratica
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              O portfolio mistura projetos pessoais e estudos de caso para mostrar metodo, execucao e criterio.
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
              Profundidade tecnica
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              A parte tecnica existe para sustentar a leitura principal, nao para competir com ela.
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Se quiser entender stack, componentizacao, SCSS modular, SEO tecnico e performance, essa camada fica em uma pagina separada.
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
              Explorar abordagem tecnica
            </SmartLink>
          </Column>
        </Row>
      </Column>
    </Column>
  );
}
