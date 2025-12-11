import { Column, Heading, Schema, Text, Line, Tag, Row } from "@once-ui-system/core";
import { admin, baseURL, person } from "@/resources";

export async function generateMetadata() {
  return {
    title: admin.title,
    description: admin.description,
    alternates: { canonical: `${baseURL}${admin.path}` },
    openGraph: {
      title: admin.title,
      description: admin.description,
      url: `${baseURL}${admin.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(admin.title)}` }],
    },
  };
}

export default function AdminPage() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={admin.title}
        description={admin.description}
        path={admin.path}
        image={`/api/og/generate?title=${encodeURIComponent(admin.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${admin.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Heading as="h1" variant="heading-strong-xl">
        {admin.title}
      </Heading>

      <Text variant="body-default-m" onBackground="neutral-weak">
        {admin.description}
      </Text>

      <Column
        gap="12"
        padding="24"
        radius="l"
        background="surface-weak"
        style={{ border: "1px solid var(--neutral-alpha-weak)" }}
      >
        <Heading as="h2" variant="heading-strong-s">
          Camadas da arquitetura
        </Heading>
        <Text onBackground="neutral-weak">
          A plataforma é organizada em quatro camadas: Fontes → Ingestão → Modelagem → Visualização e Automação.
        </Text>
        <Row wrap gap="8">
          {["Fontes de Dados", "Ingestão de Dados", "Modelagem e Organização", "Visualização/Automação"].map(
            (item) => (
              <Tag key={item} size="s">
                {item}
              </Tag>
            ),
          )}
        </Row>
      </Column>

      <Column gap="16">
        {admin.sections.map((section) => (
          <Column key={section.title} gap="8" padding="24" radius="l" background="surface-weak">
            <Heading as="h2" variant="heading-strong-s">
              {section.title}
            </Heading>
            <Text onBackground="neutral-weak">{section.description}</Text>
            {section.items && (
              <Column as="ul" gap="4">
                {section.items.map((item) => (
                  <Text key={item} as="li" variant="body-default-s">
                    {item}
                  </Text>
                ))}
              </Column>
            )}
            <Line maxWidth="40" />
          </Column>
        ))}
      </Column>

      <Column
        gap="12"
        padding="24"
        radius="l"
        background="surface-weak"
        style={{ border: "1px solid var(--neutral-alpha-weak)" }}
      >
        <Heading as="h2" variant="heading-strong-s">
          Tecnologias e operações
        </Heading>
        <Text onBackground="neutral-weak">
          A pilha combina front-end moderno, banco de dados centralizado, orchestration e visualização
          para garantir decisões guiadas por dados reais.
        </Text>
        <Row wrap gap="12">
          {admin.technologies.map((tech) => (
            <Tag key={tech} size="s">
              {tech}
            </Tag>
          ))}
        </Row>
      </Column>

      <Column gap="8" padding="24" radius="l" background="page">
        <Heading as="h2" variant="heading-strong-s">
          Objetivo final
        </Heading>
        <Text variant="body-default-s">
          Centralizar todos os dados relevantes, traduzir o GA4 em insights claros, oferecer dashboards
          úteis e otimizar o funil de vendas. Esta plataforma demonstra domínio em desenvolvimento,
          dados e processos de negócio e serve de base para estudos, portfólio e evolução técnica.
        </Text>
      </Column>
    </Column>
  );
}
