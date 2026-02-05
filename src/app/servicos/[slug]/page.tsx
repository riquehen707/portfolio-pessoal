import { notFound } from "next/navigation";
import { Column, Heading, Text, Button, Row, Line, Schema, Tag, Grid, Card } from "@once-ui-system/core";

import { baseURL, person, servicesPage, services } from "@/resources";
import { WebsiteEstimator } from "@/components/services/WebsiteEstimator";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} | ${servicesPage.title}`,
    description: service.summary,
    alternates: { canonical: `${baseURL}${servicesPage.path}/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${servicesPage.title}`,
      description: service.summary,
      url: `${baseURL}${servicesPage.path}/${service.slug}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(service.title)}` }],
    },
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const isWebsitesService = service.slug === "websites-profissionais";

  const websiteVariants = [
    {
      title: "Landing pages de conversão",
      description:
        "Páginas rápidas para campanhas, lançamentos e captação de leads com foco em taxa de conversão.",
      includes: [
        "Estrutura de copy orientada a oferta",
        "Formulários e integrações básicas",
        "SEO técnico essencial",
      ],
      investment: "Faixa indicativa: a partir de R$ 1.500",
      budget: "Impacto no orçamento: baixo a médio",
      timeline: "Prazo típico: 2–4 semanas",
    },
    {
      title: "Sites institucionais para profissionais",
      description:
        "Sites completos para autoridade e presença digital de profissionais, consultorias e pequenos negócios.",
      includes: [
        "Arquitetura de páginas e navegação",
        "Design responsivo com foco em clareza",
        "SEO técnico e performance",
      ],
      investment: "Faixa indicativa: a partir de R$ 3.500",
      budget: "Impacto no orçamento: médio",
      timeline: "Prazo típico: 3–6 semanas",
    },
    {
      title: "E-commerce completo",
      description:
        "Estrutura de catálogo, checkout e logística com integrações de pagamento e automações.",
      includes: [
        "Catálogo e gestão de produtos",
        "Checkout com múltiplos meios de pagamento",
        "Fluxos de e-mail/WhatsApp e automações",
      ],
      investment: "Faixa indicativa: a partir de R$ 8.000",
      budget: "Impacto no orçamento: alto",
      timeline: "Prazo típico: 6–10 semanas",
    },
    {
      title: "E-commerce + aplicativo",
      description:
        "Experiência completa com app complementar (PWA ou nativo) para fidelização e recorrência.",
      includes: [
        "App com push e área do cliente",
        "Integração com catálogo e pagamentos",
        "Arquitetura escalável para crescimento",
      ],
      investment: "Faixa indicativa: a partir de R$ 18.000",
      budget: "Impacto no orçamento: alto +",
      timeline: "Prazo típico: 8–14 semanas",
    },
  ];

  const techMatrix = [
    {
      title: "Stack padrão (Next.js + Once UI)",
      impact: "Base",
      changes: "Máxima performance e SEO; reduz tempo e custo de manutenção.",
      timeline: "Entrega mais rápida",
    },
    {
      title: "CMS headless (ex.: Sanity, Strapi)",
      impact: "Médio",
      changes: "Adiciona painel editorial e modelagem de conteúdo.",
      timeline: "Prazo +1 a 2 semanas",
    },
    {
      title: "E-commerce (ex.: Shopify, Nuvemshop)",
      impact: "Alto",
      changes: "Checkout, catálogo, estoque e integrações financeiras.",
      timeline: "Prazo +2 a 4 semanas",
    },
    {
      title: "Pagamentos customizados (ex.: Stripe, Mercado Pago)",
      impact: "Médio a alto",
      changes: "Maior flexibilidade no checkout e recorrência.",
      timeline: "Prazo +1 a 3 semanas",
    },
    {
      title: "PWA / App complementar",
      impact: "Alto +",
      changes: "Offline, notificações e experiência mobile avançada.",
      timeline: "Prazo +4 a 8 semanas",
    },
    {
      title: "Automações e CRM",
      impact: "Médio",
      changes: "Follow-ups, cadência de vendas e visão de dados centralizada.",
      timeline: "Prazo +1 a 2 semanas",
    },
  ];

  const commerceModels = [
    {
      title: "Plataforma pronta",
      description:
        "Shopify, Nuvemshop ou similares. Rápido de lançar e com checkout já validado.",
      impact: "Impacto: médio",
    },
    {
      title: "Headless commerce",
      description:
        "Next.js no front com Shopify ou outra engine no back. Máxima flexibilidade visual.",
      impact: "Impacto: alto",
    },
    {
      title: "Custom commerce",
      description:
        "Stack sob medida para regras complexas, assinaturas ou operações específicas.",
      impact: "Impacto: alto +",
    },
  ];

  const paymentOptions = [
    "Cartão, PIX, boleto e parcelamento",
    "Assinaturas e recorrência",
    "Cupons, descontos e upsell",
    "Gateways como Mercado Pago, Stripe, Pagar.me, PagSeguro ou Asaas",
  ];

  const appOptions = [
    {
      title: "PWA (web app)",
      description: "Mais rápido de lançar, funciona como app no celular.",
      impact: "Impacto: médio",
    },
    {
      title: "App híbrido (React Native/Flutter)",
      description: "Boa performance e custo menor que apps nativos separados.",
      impact: "Impacto: alto",
    },
    {
      title: "App nativo (iOS + Android)",
      description: "Performance máxima e integrações profundas com dispositivo.",
      impact: "Impacto: alto +",
    },
  ];

  const budgetFactors = [
    {
      title: "Quantidade de páginas e conteúdo",
      description: "Mais páginas e conteúdo exigem mais design, revisão e QA.",
    },
    {
      title: "Catálogo e variações de produto",
      description: "E-commerce com variações, kits e combos aumenta o esforço.",
    },
    {
      title: "Integrações externas",
      description: "ERP, CRM, logística e automações elevam a complexidade.",
    },
    {
      title: "Multilíngue e multiunidade",
      description: "Sites com vários idiomas ou unidades exigem arquitetura extra.",
    },
  ];

  const clientInputs = [
    "Objetivo principal do site e público-alvo",
    "Oferta, serviços e diferenciais claros",
    "Referências visuais (2 a 4 exemplos)",
    "Conteúdo inicial (textos, imagens, fotos)",
    "Acesso a domínio e configurações necessárias",
  ];

  const pricingNotes = [
    "Valores indicativos podem variar para menos ou mais, conforme escopo e integrações.",
    "Faixas baseadas em entregas anteriores e benchmark internacional.",
    "Referência de hora técnica: cerca de US$ 56.",
  ];

  const commerceLayers = [
    {
      title: "Pagamentos e checkout",
      items: ["Cartão de crédito/débito", "PIX", "Boleto", "Assinaturas", "Cupons e descontos"],
    },
    {
      title: "Operação e logística",
      items: ["Catálogo", "Estoque", "Frete", "Gestão de pedidos", "Área do cliente"],
    },
    {
      title: "Integrações essenciais",
      items: ["Gateway de pagamento", "WhatsApp", "E-mail marketing", "Analytics"],
    },
  ];

  const supportServices = [
    {
      title: "Apoio para venda de produtos específicos",
      description:
        "Estruturação de oferta, páginas de produto, copy, diferenciais e suporte de lançamento.",
    },
    {
      title: "Conteúdo e SEO contínuo",
      description:
        "Calendário editorial, ajustes de SEO e otimizações de performance ao longo do tempo.",
    },
    {
      title: "Automação comercial",
      description:
        "Fluxos de WhatsApp, e-mail e CRM para manter leads aquecidos e reduzir trabalho manual.",
    },
    {
      title: "Manutenção e evolução contínua",
      description:
        "Ajustes mensais, melhorias de performance e SEO para manter o site gerando resultado.",
    },
  ];

  const webFaqs = [
    {
      question: "Preciso já ter domínio e hospedagem?",
      answer:
        "Não. Posso orientar a compra de domínio e configurar a hospedagem mais adequada para o projeto.",
    },
    {
      question: "Vocês produzem o conteúdo?",
      answer:
        "Posso ajudar com estrutura, revisão e ajustes de copy. A produção completa pode ser contratada à parte.",
    },
    {
      question: "O site já sai pronto para SEO?",
      answer:
        "Sim. Entregamos com SEO técnico, estrutura limpa e base preparada para conteúdo.",
    },
    {
      question: "Vocês trabalham com planos recorrentes?",
      answer:
        "Sim. A maior parte dos resultados vem do pós-lançamento, com SEO contínuo, manutenção e melhorias.",
    },
    {
      question: "E a manutenção depois do lançamento?",
      answer:
        "Posso oferecer planos de manutenção e melhorias contínuas conforme a necessidade.",
    },
  ];

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`${service.title} | ${servicesPage.title}`}
        description={service.summary}
        path={`${servicesPage.path}/${service.slug}`}
        image={`/api/og/generate?title=${encodeURIComponent(service.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${servicesPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="12">
        <Tag>{service.badge}</Tag>
        <Heading as="h1" variant="heading-strong-xl">
          {service.title}
        </Heading>
        <Text onBackground="neutral-weak">{service.summary}</Text>
        <Text variant="label-default-m">{service.positioning}</Text>
        <Row gap="20">
          <Text variant="heading-strong-m">{service.hero.price}</Text>
          <Text onBackground="neutral-weak">{service.hero.budget}</Text>
        </Row>
        <Text variant="label-default-m" onBackground="neutral-weak">
          {service.idealFor}
        </Text>
        <Row gap="12">
          <Text variant="label-default-m">{service.hero.duration}</Text>
          <Text variant="label-default-m" onBackground="neutral-weak">
            {service.hero.highlight}
          </Text>
        </Row>
        <Text variant="body-default-s">{service.hero.description}</Text>
        <Line maxWidth={56} />
        <Button href={service.hero.ctaHref} variant="primary" size="m" arrowIcon>
          {service.hero.ctaLabel}
        </Button>
      </Column>

      {isWebsitesService && (
        <Column gap="24">
          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              Tipos de projeto e escopo
            </Heading>
            <Text onBackground="neutral-weak">
              Cada formato muda o esforço técnico, o cronograma e o investimento. Abaixo estão as
              opções mais comuns para websites profissionais.
            </Text>
          </Column>

          <Grid columns="2" s={{ columns: 1 }} gap="16">
            {websiteVariants.map((variant) => (
              <Card
                key={variant.title}
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
                  {variant.title}
                </Heading>
                <Text onBackground="neutral-weak">{variant.description}</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {variant.investment}
                </Text>
                <Tag size="s" background="neutral-alpha-weak">
                  {variant.budget}
                </Tag>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {variant.timeline}
                </Text>
                <Column as="ul" gap="6">
                  {variant.includes.map((item) => (
                    <Text as="li" key={`${variant.title}-${item}`} variant="body-default-s">
                      {item}
                    </Text>
                  ))}
                </Column>
              </Card>
            ))}
          </Grid>

          <Column gap="8">
            {pricingNotes.map((note) => (
              <Text key={note} variant="body-default-s" onBackground="neutral-weak">
                {note}
              </Text>
            ))}
          </Column>

          <WebsiteEstimator
            ctaHref={service.hero.ctaHref}
            ctaLabel={service.hero.ctaLabel}
            contactEmail={person.email}
          />

          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              Tecnologias e impacto no orçamento
            </Heading>
            <Text onBackground="neutral-weak">
              A escolha da tecnologia define a complexidade do projeto. Algumas decisões aumentam o
              investimento, mas destravam operação e escala.
            </Text>
          </Column>

          <Grid columns="3" s={{ columns: 1 }} gap="16">
            {techMatrix.map((item) => (
              <Card
                key={item.title}
                direction="column"
                gap="10"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                border="neutral-alpha-weak"
                fillHeight
              >
                <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                  Impacto: {item.impact}
                </Tag>
                <Heading as="h3" variant="heading-strong-m">
                  {item.title}
                </Heading>
                <Text onBackground="neutral-weak">{item.changes}</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {item.timeline}
                </Text>
              </Card>
            ))}
          </Grid>

          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              E-commerce completo e app
            </Heading>
            <Text onBackground="neutral-weak">
              Quando o projeto envolve vendas recorrentes, o escopo inclui checkout, operação e
              integrações. Aplicativo pode ser PWA ou nativo, conforme o modelo de negócio.
            </Text>
          </Column>

          <Grid columns="3" s={{ columns: 1 }} gap="16">
            {commerceModels.map((model) => (
              <Card
                key={model.title}
                direction="column"
                gap="10"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                border="neutral-alpha-weak"
                fillHeight
              >
                <Heading as="h3" variant="heading-strong-m">
                  {model.title}
                </Heading>
                <Text onBackground="neutral-weak">{model.description}</Text>
                <Tag size="s" background="neutral-alpha-weak">
                  {model.impact}
                </Tag>
              </Card>
            ))}
          </Grid>

          <Grid columns="3" s={{ columns: 1 }} gap="16">
            {commerceLayers.map((layer) => (
              <Card
                key={layer.title}
                direction="column"
                gap="10"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                border="neutral-alpha-weak"
                fillHeight
              >
                <Heading as="h3" variant="heading-strong-m">
                  {layer.title}
                </Heading>
                <Column as="ul" gap="6">
                  {layer.items.map((item) => (
                    <Text as="li" key={`${layer.title}-${item}`} variant="body-default-s">
                      {item}
                    </Text>
                  ))}
                </Column>
              </Card>
            ))}
          </Grid>

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
            <Heading as="h3" variant="heading-strong-m">
              Formas de pagamento e checkout
            </Heading>
            <Column as="ul" gap="6">
              {paymentOptions.map((item) => (
                <Text as="li" key={item} variant="body-default-s">
                  {item}
                </Text>
              ))}
            </Column>
          </Card>

          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              Aplicativo e experiência mobile
            </Heading>
            <Text onBackground="neutral-weak">
              O app pode ser PWA (mais rápido de lançar) ou nativo, dependendo de recursos e orçamento.
            </Text>
          </Column>

          <Grid columns="3" s={{ columns: 1 }} gap="16">
            {appOptions.map((option) => (
              <Card
                key={option.title}
                direction="column"
                gap="10"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                border="neutral-alpha-weak"
                fillHeight
              >
                <Tag size="s" background="neutral-alpha-weak">
                  {option.impact}
                </Tag>
                <Heading as="h3" variant="heading-strong-m">
                  {option.title}
                </Heading>
                <Text onBackground="neutral-weak">{option.description}</Text>
              </Card>
            ))}
          </Grid>

          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              O que mais pesa no orçamento
            </Heading>
            <Text onBackground="neutral-weak">
              Estes fatores costumam ampliar esforço de design, desenvolvimento e integrações.
            </Text>
          </Column>

          <Grid columns="2" s={{ columns: 1 }} gap="16">
            {budgetFactors.map((factor) => (
              <Card
                key={factor.title}
                direction="column"
                gap="10"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                border="neutral-alpha-weak"
                fillHeight
              >
                <Heading as="h3" variant="heading-strong-m">
                  {factor.title}
                </Heading>
                <Text onBackground="neutral-weak">{factor.description}</Text>
              </Card>
            ))}
          </Grid>

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
            <Heading as="h3" variant="heading-strong-m">
              O que preciso de você para começar
            </Heading>
            <Column as="ul" gap="6">
              {clientInputs.map((item) => (
                <Text as="li" key={item} variant="body-default-s">
                  {item}
                </Text>
              ))}
            </Column>
          </Card>

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
            <Heading as="h3" variant="heading-strong-m">
              Alinhamento antes de iniciar
            </Heading>
            <Text onBackground="neutral-weak">
              Sempre faço uma reunião inicial para alinhar objetivos, orçamento e prioridades. Isso
              ajuda a evitar investimentos sem planejamento e garante uma proposta realista.
            </Text>
            <Text onBackground="neutral-weak">
              Resultados mais consistentes costumam vir do pós-lançamento, com SEO contínuo,
              manutenção e evolução planejada.
            </Text>
          </Card>

          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              Serviços complementares
            </Heading>
            <Text onBackground="neutral-weak">
              Além do site, posso apoiar vendas e operação com serviços adicionais que aceleram o
              resultado.
            </Text>
          </Column>

          <Grid columns="3" s={{ columns: 1 }} gap="16">
            {supportServices.map((item) => (
              <Card
                key={item.title}
                direction="column"
                gap="10"
                paddingX="20"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                border="neutral-alpha-weak"
                fillHeight
              >
                <Heading as="h3" variant="heading-strong-m">
                  {item.title}
                </Heading>
                <Text onBackground="neutral-weak">{item.description}</Text>
              </Card>
            ))}
          </Grid>

          <Column gap="12">
            <Heading as="h2" variant="heading-strong-s">
              Perguntas frequentes
            </Heading>
            <Column gap="12">
              {webFaqs.map((faq) => (
                <Card
                  key={faq.question}
                  direction="column"
                  gap="8"
                  paddingX="20"
                  paddingY="20"
                  radius="l"
                  background="surface"
                  style={{ background: "var(--surface-weak)" }}
                  border="neutral-alpha-weak"
                >
                  <Text variant="label-default-m">{faq.question}</Text>
                  <Text onBackground="neutral-weak">{faq.answer}</Text>
                </Card>
              ))}
            </Column>
          </Column>

          <Row gap="12" wrap>
            <Button href={service.hero.ctaHref} variant="primary" size="m" arrowIcon>
              Solicitar proposta
            </Button>
            <Button href={`mailto:${person.email}`} variant="tertiary" size="m" arrowIcon>
              Falar comigo
            </Button>
          </Row>
        </Column>
      )}

      {/* Seções */}
      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Solução em destaque
        </Heading>
        <Text variant="body-default-s">{service.solution}</Text>
        <Text variant="label-default-m">Faixa de investimento: {service.investmentRange}</Text>
        <Text variant="label-default-m" onBackground="neutral-weak">
          Principais entregas rápidas: {service.hero.price} · {service.hero.duration}
        </Text>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          O que entregamos
        </Heading>
        <Column as="ul" gap="4">
          {service.deliverables.map((item) => (
            <Text key={item} as="li" variant="body-default-s">
              {item}
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Diferenças que importam
        </Heading>
        <Column as="ul" gap="4">
          {service.differentiators.map((item) => (
            <Text key={item} as="li" variant="body-default-s">
              {item}
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Processo
        </Heading>
        <Column as="ol" gap="4">
          {service.process.map((step) => (
            <Text key={step} as="li" variant="body-default-s">
              {step}
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Resultados esperados
        </Heading>
        <Column as="ul" gap="4">
          {service.outcomes.map((outcome) => (
            <Text key={outcome} as="li" variant="body-default-s">
              {outcome}
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Pilares aplicados
        </Heading>
        <Grid columns="2" s={{ columns: 1 }} gap="12">
          {service.pillars.map((pillar) => (
            <Column
              key={pillar.title}
              padding="12"
              radius="m"
              background="surface"
              style={{
                border: "1px solid var(--neutral-alpha-weak)",
                background: "var(--surface-weak)",
              }}
            >
              <Text variant="label-default-s">{pillar.title}</Text>
              <Text variant="body-default-s">{pillar.detail}</Text>
            </Column>
          ))}
        </Grid>
        <Row gap="16" wrap>
          {service.highlights.map((highlight) => (
            <Column
              key={highlight.label}
              padding="12"
              background="page"
              radius="m"
              style={{ border: "1px solid var(--neutral-alpha-weak)" }}
            >
              <Text variant="label-default-s" onBackground="neutral-weak">
                {highlight.label}
              </Text>
              <Text variant="heading-strong-s">{highlight.value}</Text>
            </Column>
          ))}
        </Row>
      </Column>
    </Column>
  );
}
