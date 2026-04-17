import {
  Button,
  Column,
  Grid,
  Heading,
  Meta,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import { ServiceComparisonTable } from "@/components";
import { about, baseURL, person, social, technicalApproach, work } from "@/resources";

import styles from "./page.module.scss";

const pillars = [
  {
    label: "Front-end",
    title: "Next.js e Vue quando a interface precisa ser clara, leve e fácil de manter.",
    description:
      "Uso a stack como ferramenta de organização. Priorizo arquitetura simples, componentes reaproveitáveis e telas que não cansam a leitura.",
    items: [
      "Next.js para sites e conteúdo",
      "Vue para painéis e fluxos internos",
      "SCSS modular e estrutura escalável",
    ],
  },
  {
    label: "SEO técnico",
    title: "Estrutura para ser encontrado, entendido e indexado do jeito certo.",
    description:
      "Cuido de arquitetura, metadados, performance e semântica para que lojas, blogs e páginas de serviço tenham base técnica consistente e cresçam com mais fôlego.",
    items: [
      "Metadata e schema",
      "Arquitetura para blog e e-commerce",
      "Leitura clara para usuário e buscador",
    ],
  },
  {
    label: "Performance",
    title: "Velocidade pensada desde o layout, não só no final do projeto.",
    description:
      "Evito efeitos pesados, hidrato só o necessário e organizo mídia, espaçamento e componentes para manter a navegação fluida.",
    items: [
      "Menos JS desnecessário",
      "Layout responsivo com baixo custo visual",
      "Microinterações leves e previsíveis",
    ],
  },
  {
    label: "Automação",
    title: "Integrações e rotinas simples para o atendimento não depender de improviso.",
    description:
      "A técnica também entra no pós-clique: formulários, disparos, analytics e pequenas automações para acompanhar a conversa comercial sem atrito.",
    items: [
      "WhatsApp, formulários e captura",
      "Analytics e leitura de comportamento",
      "Fluxos simples de organização",
    ],
  },
];

const process = [
  {
    title: "Diagnóstico",
    description: "Entendo a oferta, o público e o que está travando o contato ou a conversão.",
  },
  {
    title: "Estrutura",
    description:
      "Defino hierarquia, CTA, páginas, blocos e pontos de SEO antes de sair construindo.",
  },
  {
    title: "Construção",
    description: "Monto componentes, estilos modulares e integrações sem inflar a interface.",
  },
  {
    title: "Ajuste fino",
    description: "Reviso performance, leitura, indexação e os caminhos reais que levam ao contato.",
  },
];

const systemBlocks = [
  {
    title: "Componentes reutilizáveis",
    description:
      "Prefiro uma base consistente de blocos, variações e seções reaproveitáveis para o site crescer sem virar remendo.",
  },
  {
    title: "SCSS modular",
    description:
      "Organizo estilos por contexto para manter layout, responsividade e manutenção sob controle.",
  },
  {
    title: "Técnica a serviço da clareza",
    description:
      "O usuário precisa entender rápido o que você faz. A stack aparece como suporte, não como barulho.",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: technicalApproach.title,
    description: technicalApproach.description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(technicalApproach.title)}`,
    path: technicalApproach.path,
  });
}

export default function TechnicalApproachPage() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? `mailto:${person.email}`;
  const crmComparisonColumns = [
    {
      id: "crm-saas",
      name: "CRM SaaS padrão",
      eyebrow: "Assinatura em dólar",
      price: "US$ 29 a US$ 99/mês",
      billing: "Plataforma + add-ons",
      note: "Geralmente resolve acesso à ferramenta, mas não inclui operação local nem leitura estratégica.",
      badge: "Mercado",
    },
    {
      id: "crm-whitelabel",
      name: "Ferramenta white-label",
      eyebrow: "Licença em real",
      price: "R$ 297 a R$ 997/mês",
      billing: "Licença + setup à parte",
      note: "Melhora idioma e acesso, mas ainda costuma separar ferramenta, tráfego e acompanhamento.",
      badge: "Mercado",
    },
    {
      id: "henrique",
      name: "Operação acompanhada comigo",
      eyebrow: "Estratégia + execução",
      price: "Sob proposta mensal",
      billing: "Serviço com acompanhamento contínuo",
      note: "Contato direto, leitura de negócio local e ajustes em cima da rotina real da operação.",
      badge: "Seu serviço",
      highlight: true,
      ctaLabel: "Conversar sobre CRM",
      ctaHref: whatsappLink,
    },
  ] as const;

  const crmComparisonRows = [
    {
      label: "Modelo de contratação",
      description: "O que a pessoa está pagando de fato ao fechar.",
      cells: {
        "crm-saas": {
          value: "Só plataforma",
          note: "A lógica principal é licença, usuário e upgrade.",
          tone: "negative",
        },
        "crm-whitelabel": {
          value: "Licença + implantação separada",
          note: "A ferramenta existe, mas o acompanhamento costuma ser parcial.",
          tone: "neutral",
        },
        henrique: {
          value: "Operação acompanhada",
          note: "Ferramenta, gestão, leitura comercial e ajustes entram no mesmo raciocínio.",
          tone: "highlight",
        },
      },
    },
    {
      label: "Moeda e previsibilidade",
      description: "Como a cobrança afeta percepção de custo e controle mensal.",
      cells: {
        "crm-saas": {
          value: "Dólar + add-ons",
          note: "Câmbio e módulos extras podem empurrar o custo para cima.",
          tone: "negative",
        },
        "crm-whitelabel": {
          value: "Real, mas com camadas extras",
          note: "Setup, suporte e operação podem virar contratos separados.",
          tone: "neutral",
        },
        henrique: {
          value: "Escopo em real",
          note: "A proposta nasce da necessidade do negócio e não só da licença da ferramenta.",
          tone: "positive",
        },
      },
    },
    {
      label: "Gerente de CRM",
      description: "Quem acompanha a configuração, rotina e leitura do funil.",
      cells: {
        "crm-saas": { value: "Não incluído", tone: "negative" },
        "crm-whitelabel": { value: "Pontual ou opcional", tone: "neutral" },
        henrique: {
          value: "Incluído",
          note: "Acompanhamento direto da operação.",
          tone: "highlight",
        },
      },
    },
    {
      label: "Gestor de tráfego",
      description: "Quem conecta entrada de leads com aquisição e mídia.",
      cells: {
        "crm-saas": { value: "Não incluído", tone: "negative" },
        "crm-whitelabel": { value: "Não incluído", tone: "negative" },
        henrique: {
          value: "Incluído no raciocínio da operação",
          note: "A mídia entra conectada ao atendimento e ao funil.",
          tone: "highlight",
        },
      },
    },
    {
      label: "Relatórios personalizados",
      description: "Qualidade da leitura gerada para tomada de decisão.",
      cells: {
        "crm-saas": {
          value: "Painéis padrão",
          note: "Normalmente dependem de você interpretar e adaptar.",
          tone: "neutral",
        },
        "crm-whitelabel": {
          value: "Modelos limitados",
          note: "Relatórios existem, mas nem sempre conversam com a operação real.",
          tone: "neutral",
        },
        henrique: {
          value: "Relatórios personalizados",
          note: "Leitura moldada ao seu serviço, rotina e gargalos comerciais.",
          tone: "positive",
        },
      },
    },
    {
      label: "Contato com especialista",
      description: "Quem escuta o contexto e ajusta o caminho.",
      cells: {
        "crm-saas": {
          value: "Suporte de plataforma",
          note: "Ajuda técnica, mas sem contato próximo com o negócio.",
          tone: "negative",
        },
        "crm-whitelabel": {
          value: "Onboarding e suporte",
          note: "Resolve ferramenta, mas nem sempre aprofunda estratégia.",
          tone: "neutral",
        },
        henrique: {
          value: "Contato direto comigo",
          note: "Sem atravessador e com leitura voltada a negócios e serviços locais.",
          tone: "highlight",
        },
      },
    },
    {
      label: "Automação e integrações",
      description: "Capacidade de encaixar canais, formulários e rotinas.",
      cells: {
        "crm-saas": {
          value: "Depende de módulo extra",
          note: "Muita coisa boa existe, mas costuma subir custo e complexidade.",
          tone: "neutral",
        },
        "crm-whitelabel": {
          value: "Depende do pacote",
          note: "Nem sempre entra com leitura estratégica ou operação assistida.",
          tone: "neutral",
        },
        henrique: {
          value: "Configurado conforme o fluxo",
          note: "Automação entra para reduzir atrito e não só para inflar painel.",
          tone: "positive",
        },
      },
    },
    {
      label: "Gestão de redes sociais",
      description: "Integração entre aquisição, relacionamento e presença social.",
      cells: {
        "crm-saas": { value: "Não incluída", tone: "negative" },
        "crm-whitelabel": { value: "Não incluída", tone: "negative" },
        henrique: {
          value: "Pode entrar no acompanhamento",
          note: "A operação pode ligar CRM, tráfego, conteúdo e social sem virar contratos soltos.",
          tone: "positive",
        },
      },
    },
    {
      label: "Ajuste para negócios locais",
      description: "Capacidade de adaptar o serviço ao contexto comercial real.",
      cells: {
        "crm-saas": { value: "Genérico", tone: "negative" },
        "crm-whitelabel": { value: "Parcial", tone: "neutral" },
        henrique: {
          value: "Focado em serviços locais",
          note: "A leitura parte de agenda, atendimento, faturamento e relacionamento local.",
          tone: "highlight",
        },
      },
    },
  ] as const;

  return (
    <Column className={styles.page} maxWidth="m" gap="24" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={technicalApproach.title}
        description={technicalApproach.description}
        path={technicalApproach.path}
        image={`/api/og/generate?title=${encodeURIComponent(technicalApproach.title)}`}
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
              Abordagem técnica
            </Tag>
            <Heading variant="display-strong-l" wrap="balance">
              A técnica entra para sustentar clareza, confiança e uma navegação que faz sentido.
            </Heading>
            <div className={styles.accentLine} />
            <Text
              className={styles.lead}
              variant="heading-default-m"
              onBackground="neutral-weak"
              wrap="balance"
            >
              Não uso stack como vitrine. Organizo front-end, SEO técnico, performance e automação
              para o site ser simples de usar, rápido de navegar e fácil de evoluir com o tempo.
            </Text>
            <Row className={styles.actions} gap="12" wrap>
              <Button href={whatsappLink} prefixIcon="whatsapp" size="m" variant="primary">
                Conversar sobre um projeto
              </Button>
              <Button href={work.path} size="m" variant="secondary" arrowIcon>
                Ver projetos
              </Button>
            </Row>
            <SmartLink href={about.path} suffixIcon="arrowRight">
              Voltar para Sobre
            </SmartLink>
          </Column>

          <Column className={styles.heroAside} gap="12">
            <Text
              className={styles.codeLabel}
              variant="label-default-s"
              onBackground="neutral-weak"
            >
              Camadas que costumo combinar
            </Text>
            <Column className={styles.signalList} gap="12">
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Front-end modular</Text>
                <Text
                  className={styles.signalValue}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Next.js / Vue
                </Text>
              </Row>
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Conteúdo encontrável</Text>
                <Text
                  className={styles.signalValue}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  SEO técnico
                </Text>
              </Row>
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Renderização leve</Text>
                <Text
                  className={styles.signalValue}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Performance
                </Text>
              </Row>
              <Row className={styles.signalRow} horizontal="between" gap="16">
                <Text variant="body-default-m">Pós-clique organizado</Text>
                <Text
                  className={styles.signalValue}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Automação
                </Text>
              </Row>
            </Column>
          </Column>
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Blocos principais
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Onde a profundidade técnica aparece
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Cada camada tem um papel claro: melhorar leitura, encontrabilidade, velocidade e
              manutenção.
            </Text>
          </Column>
        </Row>

        <Grid className={styles.pillarsGrid} columns="2" s={{ columns: 1 }} gap="16">
          {pillars.map((pillar) => (
            <Column key={pillar.title} className={styles.pillarCard} gap="12">
              <Text
                className={styles.codeLabel}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                {pillar.label}
              </Text>
              <Heading as="h3" variant="heading-strong-l">
                {pillar.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {pillar.description}
              </Text>
              <Column as="ul" className={styles.stackList} gap="8">
                {pillar.items.map((item) => (
                  <Text as="li" key={item} variant="body-default-s" onBackground="neutral-weak">
                    {item}
                  </Text>
                ))}
              </Column>
            </Column>
          ))}
        </Grid>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="neutral-alpha-weak">
              Como eu estruturo
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Processo técnico sem excesso de camada
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              O projeto fica mais previsível quando arquitetura, conteúdo e conversão entram na
              ordem certa.
            </Text>
          </Column>
        </Row>

        <Grid className={styles.processGrid} columns="2" s={{ columns: 1 }} gap="16">
          {process.map((step, index) => (
            <Column key={step.title} className={styles.processCard} gap="12">
              <Text className={styles.processIndex} variant="label-strong-s">
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
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Sistema visual
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Componentes, SCSS modular e organização visual
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              A técnica também aparece na forma como o layout cresce: seções reaproveitáveis, grids
              limpos e pouca fricção.
            </Text>
          </Column>
        </Row>

        <div className={styles.systemGrid}>
          <div className={`${styles.systemCard} ${styles.systemCardLarge}`}>
            <Text
              className={styles.codeLabel}
              variant="label-default-s"
              onBackground="neutral-weak"
            >
              Base reutilizável
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Prefiro uma biblioteca pequena de blocos bem resolvidos a uma interface cheia de
              exceção.
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Isso ajuda o site a continuar rápido, consistente e mais fácil de ajustar quando a
              oferta ou o conteúdo mudam.
            </Text>
          </div>

          <div className={styles.systemSubgrid}>
            {systemBlocks.map((block) => (
              <div key={block.title} className={styles.systemCard}>
                <Text
                  className={styles.codeLabel}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Camada
                </Text>
                <Text variant="heading-strong-m">{block.title}</Text>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {block.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Column>

      <Column className={styles.sectionPanel} fillWidth gap="16" padding="24">
        <Row
          className={styles.sectionHeader}
          fillWidth
          horizontal="between"
          vertical="end"
          s={{ direction: "column" }}
        >
          <Column className={styles.sectionIntro} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Componente reutilizável
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Comparador de serviços para vender contexto, não só ferramenta
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              Esse bloco foi pensado para mostrar, lado a lado, a diferença entre uma assinatura de
              plataforma e um serviço acompanhado.
            </Text>
          </Column>
        </Row>

        <ServiceComparisonTable
          eyebrow="CRM e operação"
          title="Meu acompanhamento ao lado de plataformas e licenças comuns de mercado"
          description="A ideia aqui não é demonizar CRM nenhum. É deixar claro que, em muitos casos, a pessoa está comparando licença de software com acompanhamento estratégico, leitura comercial e execução contínua."
          columns={crmComparisonColumns}
          rows={crmComparisonRows}
          footnote="As faixas usadas nos serviços de mercado são referências comuns para comparar modelo de contratação. Elas podem variar por câmbio, usuários, módulos extras, setup e nível de suporte."
        />
      </Column>
    </Column>
  );
}
