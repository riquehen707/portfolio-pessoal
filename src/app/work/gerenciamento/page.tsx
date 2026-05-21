import { Metadata } from "next";

import {
  Button,
  Column,
  Heading,
  Input,
  Meta,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import { baseURL, work } from "@/resources";
import { getWorkAdminSession } from "@/lib/workAdminAuth";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import { loginWorkManagement, logoutWorkManagement } from "./actions";
import { getWorkGanttDataset, getWorkGanttFieldGroupSummary } from "./ganttData";
import { getWorkManagementItems, getWorkManagementStages } from "./managementData";
import styles from "./page.module.scss";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const workManagementPath = `${work.path}/gerenciamento`;

export const dynamic = "force-dynamic";

function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
}

function countUpcoming(items: ReturnType<typeof getWorkManagementItems>) {
  const limit = Date.now() + 7 * 24 * 60 * 60 * 1_000;

  return items.filter((item) => {
    if (item.stage === "entregue") {
      return false;
    }

    const dueAt = new Date(item.dueDate).getTime();
    return Number.isFinite(dueAt) && dueAt <= limit;
  }).length;
}

function getAverageProgress(items: ReturnType<typeof getWorkManagementItems>) {
  if (items.length === 0) {
    return 0;
  }

  const total = items.reduce((sum, item) => sum + item.progress, 0);
  return Math.round(total / items.length);
}

function getGroupedStages(items: ReturnType<typeof getWorkManagementItems>) {
  return getWorkManagementStages().map((stage) => ({
    ...stage,
    items: items.filter((item) => item.stage === stage.id),
  }));
}

function getStageLabel(stageId: ReturnType<typeof getWorkManagementItems>[number]["stage"]) {
  return getWorkManagementStages().find((stage) => stage.id === stageId)?.label ?? stageId;
}

function getHealthClass(health: string) {
  if (health === "Risco") {
    return `${styles.healthDot} ${styles.healthRisk}`;
  }

  if (health === "Atenção") {
    return `${styles.healthDot} ${styles.healthAttention}`;
  }

  return styles.healthDot;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Painel de gestão | Work";
  const description = "Área interna para acompanhar pipeline, prioridades e andamento dos projetos.";
  const image = buildOgImage("Painel de gestão");
  const generatedMeta = Meta.generate({
    title,
    description,
    baseURL,
    image,
    path: workManagementPath,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

function LoginView({ hasAuthError }: { hasAuthError: boolean }) {
  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
      <div className={styles.loginShell}>
        <section className={styles.loginIntro}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Work admin
          </Tag>
          <Heading as="h1" variant="display-strong-s">
            Painel interno para leitura rápida da operação de projetos.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Essa área separa o portfólio público da sua gestão interna. A ideia aqui é enxergar
            pipeline, próximos passos, bloqueios e prioridade sem depender de planilha espalhada.
          </Text>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <Text variant="body-default-m">Visão por estágio para saber o que está parado ou avançando.</Text>
            </li>
            <li className={styles.bulletItem}>
              <Text variant="body-default-m">Agenda das entregas mais próximas e leitura de risco por projeto.</Text>
            </li>
            <li className={styles.bulletItem}>
              <Text variant="body-default-m">Gestão interna, placeholders e futuras publicações do portfólio.</Text>
            </li>
          </ul>

          <SmartLink href={work.path}>Voltar para projetos</SmartLink>
        </section>

        <section className={styles.loginCard}>
          <Tag size="s" background="neutral-alpha-weak">
            Acesso restrito
          </Tag>
          <Heading as="h2" variant="heading-strong-l">
            Entrar no painel
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Use as credenciais administrativas temporárias para liberar a visualização da área.
          </Text>

          {hasAuthError && (
            <div className={styles.errorBanner} role="alert">
              <Text variant="body-default-s">Login inválido. Revise usuário e senha.</Text>
            </div>
          )}

          <form action={loginWorkManagement} className={styles.loginForm}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="work-admin-username">
                Usuário
              </label>
              <Input
                autoComplete="username"
                id="work-admin-username"
                name="username"
                placeholder="Seu usuário"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="work-admin-password">
                Senha
              </label>
              <Input
                id="work-admin-password"
                name="password"
                placeholder="Sua senha"
                required
                type="password"
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" variant="primary" size="m" prefixIcon="person">
              Entrar
            </Button>
          </form>
        </section>
      </div>
    </Column>
  );
}

function DashboardView({ username }: { username: string }) {
  const items = getWorkManagementItems();
  const ganttDataset = getWorkGanttDataset({ ano: 2026 });
  const ganttFieldGroups = getWorkGanttFieldGroupSummary();
  const stages = getGroupedStages(items);
  const activeCount = items.filter((item) => item.stage !== "entregue").length;
  const blockerEntries = items.flatMap((item) =>
    item.blockers.map((blocker) => ({
      projectId: item.id,
      projectTitle: item.client,
      blocker,
    })),
  );
  const publishedItems = items.filter((item) => item.visibility === "público" && item.publicHref);
  const agendaItems = [...items]
    .filter((item) => item.stage !== "entregue")
    .sort((left, right) => +new Date(left.dueDate) - +new Date(right.dueDate))
    .slice(0, 4);
  const ganttHighlightedProjects = ganttDataset.projects.slice(0, 4);

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <section className={styles.heroPanel}>
        <div className={styles.heroMain}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Gestão interna
          </Tag>
          <Heading as="h1" variant="display-strong-s">
            Painel de gerenciamento dos projetos em andamento.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Uma leitura executiva para saber o que está em briefing, o que já está em execução,
            onde existe risco e qual é o próximo passo concreto de cada frente.
          </Text>

          <Row className={styles.heroActions} gap="12" wrap>
            <Button href={work.path} variant="secondary" size="m" arrowIcon>
              Ver área pública de projetos
            </Button>
            <Button href={publishedItems[0]?.publicHref ?? work.path} variant="secondary" size="m" arrowIcon>
              Abrir feed público
            </Button>
          </Row>
        </div>

        <aside className={styles.heroAside}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Sessão atual
          </Text>

          <div className={styles.asideGrid}>
            <div className={styles.asideCard}>
              <Text onBackground="neutral-weak" variant="body-default-s">
                Usuário
              </Text>
              <Text variant="heading-strong-s">{username}</Text>
            </div>
            <div className={styles.asideCard}>
              <Text onBackground="neutral-weak" variant="body-default-s">
                Cobertura
              </Text>
              <Text variant="heading-strong-s">{items.length} projetos</Text>
            </div>
          </div>

          <form action={logoutWorkManagement}>
            <Button type="submit" variant="secondary" size="m">
              Sair do painel
            </Button>
          </form>
        </aside>
      </section>

      <section className={styles.metricSection}>
        <div className={styles.sectionIntro}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Leitura rápida
          </Text>
          <Heading as="h2" variant="display-strong-s">
            O que precisa de atenção agora
          </Heading>
        </div>

        <div className={styles.metricGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>{items.length}</span>
            <Text onBackground="neutral-weak" variant="body-default-s">
              Projetos monitorados
            </Text>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>{activeCount}</span>
            <Text onBackground="neutral-weak" variant="body-default-s">
              Frentes ativas
            </Text>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>{blockerEntries.length}</span>
            <Text onBackground="neutral-weak" variant="body-default-s">
              Bloqueios abertos
            </Text>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>{countUpcoming(items)}</span>
            <Text onBackground="neutral-weak" variant="body-default-s">
              Entregas em 7 dias
            </Text>
          </div>
        </div>
      </section>

      <section className={styles.ganttSection}>
        <div className={styles.sectionIntro}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Fundacao Gantt
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Base de dados inserivel e traduzida para linha do tempo
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Antes do grafico e do PDF, a estrutura já está pronta para trabalhar tarefas, dependencias,
            semanas ISO, meses, filtros por periodo e projetos reais ligados ao admin.
          </Text>
        </div>

        <div className={styles.ganttGrid}>
          <section className={styles.panel}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Cobertura
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Calendário 2026 pronto para filtro por semana e mês
            </Heading>
            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                <Text variant="body-default-m">
                  {ganttDataset.tasks.length} tarefas normalizadas para o Gantt.
                </Text>
              </li>
              <li className={styles.bulletItem}>
                <Text variant="body-default-m">
                  {ganttDataset.projects.length} projetos com janela própria de execução.
                </Text>
              </li>
              <li className={styles.bulletItem}>
                <Text variant="body-default-m">
                  Semanas visiveis: S{String(ganttDataset.visibleStartWeek).padStart(2, "0")} até S
                  {String(ganttDataset.visibleEndWeek).padStart(2, "0")} em 2026.
                </Text>
              </li>
              <li className={styles.bulletItem}>
                <Text variant="body-default-m">
                  Meses atravessados pela linha do tempo: {ganttDataset.timeline.months.map((month) => month.label).join(", ")}.
                </Text>
              </li>
            </ul>
          </section>

          <section className={styles.panel}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Projetos reais
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Periodos já mapeados por projeto
            </Heading>
            <ul className={styles.periodList}>
              {ganttHighlightedProjects.map((project) => (
                <li className={styles.periodItem} key={project.projectId}>
                  <Text variant="body-default-m">{project.projectName}</Text>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    {project.periodLabel} · {project.taskCount} tarefas · {project.contractLabel}
                  </Text>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    Capacidade {project.weeklyCapacityHours}h/semana · {project.monthlyValue}
                  </Text>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.panel}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Campos inseriveis
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Estrutura pronta para formulário, JSON e PDF
            </Heading>
            <div className={styles.fieldGrid}>
              {ganttFieldGroups.map((group) => (
                <div className={styles.fieldGroupCard} key={group.id}>
                  <Text variant="body-default-m">{group.label}</Text>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    {group.count} campos · {group.requiredCount} obrigatorios
                  </Text>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    {group.fields.slice(0, 4).join(", ")}
                    {group.fields.length > 4 ? "..." : ""}
                  </Text>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className={styles.boardSection}>
        <div className={styles.sectionIntro}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Pipeline
          </Text>
          <Heading as="h2" variant="display-strong-s">
            Quadro por estágio
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Cada card mostra prioridade, saúde, prazo, progresso, entregáveis e o próximo movimento
            necessário para o projeto andar.
          </Text>
        </div>

        <div className={styles.boardGrid}>
          {stages.map((stage) => (
            <section className={styles.stageColumn} key={stage.id}>
              <div className={styles.stageHeader}>
                <Row horizontal="between" vertical="center" gap="8">
                  <Heading as="h3" variant="heading-strong-m">
                    {stage.label}
                  </Heading>
                  <span className={styles.stageCount}>{stage.items.length}</span>
                </Row>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {stage.description}
                </Text>
              </div>

              <div className={styles.stageItems}>
                {stage.items.map((item) => (
                  <article className={styles.projectCard} key={item.id}>
                    <div className={styles.projectTop}>
                      <div className={styles.projectHeader}>
                        <div className={styles.projectMeta}>
                          <p className={styles.projectTitle}>{item.client}</p>
                          <Text onBackground="neutral-weak" variant="body-default-s">
                            {item.title}
                          </Text>
                        </div>
                        <div className={styles.pillRow}>
                          <span className={`${styles.pill} ${styles.pillStrong}`}>{item.priority}</span>
                        </div>
                      </div>

                      <p className={styles.projectSummary}>{item.publicSummary ?? item.summary}</p>
                    </div>

                    <div className={styles.pillRow}>
                      <span className={styles.pill}>
                        <span className={getHealthClass(item.health)} />
                        {item.health}
                      </span>
                      <span className={styles.pill}>{item.visibility === "público" ? "Público" : "Privado"}</span>
                      <span className={styles.pill}>Prazo {formatDate(item.dueDate)}</span>
                    </div>

                    <div className={styles.progressRow}>
                      <Row horizontal="between" vertical="center" gap="8">
                        <Text onBackground="neutral-weak" variant="body-default-s">
                          Progresso
                        </Text>
                        <Text variant="body-default-s">{item.progress}%</Text>
                      </Row>
                      <div className={styles.progressTrack}>
                        <div className={styles.progressBar} style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.detailList}>
                        <div className={styles.detailItem}>
                          <Text onBackground="neutral-weak" variant="body-default-s">
                            Próxima ação
                          </Text>
                          <Text variant="body-default-m">{item.nextAction}</Text>
                        </div>
                        <div className={styles.detailItem}>
                          <Text onBackground="neutral-weak" variant="body-default-s">
                            Entregáveis
                          </Text>
                          <Text variant="body-default-m">{item.deliverables.join(" · ")}</Text>
                        </div>
                      </div>

                      <div className={styles.cardActions}>
                        {item.publicHref ? (
                          <SmartLink href={item.publicHref}>Abrir case público</SmartLink>
                        ) : (
                          <Text className={styles.muted} variant="body-default-s">
                            Projeto interno sem página pública
                          </Text>
                        )}
                        <Text className={styles.muted} variant="body-default-s">
                          Atualizado em {formatDate(item.updatedAt)}
                        </Text>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <div className={styles.insightGrid}>
        <section className={styles.panel}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Agenda
          </Text>
          <Heading as="h2" variant="heading-strong-l">
            Próximos vencimentos
          </Heading>
          <ul className={styles.agendaList}>
            {agendaItems.map((item) => (
              <li className={styles.agendaItem} key={`${item.id}-agenda`}>
                <Text variant="body-default-m">{item.client}</Text>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {item.nextAction}
                </Text>
                <div className={styles.agendaMeta}>
                  <span className={styles.pill}>{formatDate(item.dueDate)}</span>
                  <span className={styles.pill}>{getStageLabel(item.stage)}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Gargalos
          </Text>
          <Heading as="h2" variant="heading-strong-l">
            Bloqueios abertos
          </Heading>
          {blockerEntries.length > 0 ? (
            <ul className={styles.blockerList}>
              {blockerEntries.map((entry) => (
                <li className={styles.blockerItem} key={`${entry.projectId}-${entry.blocker}`}>
                  <Text variant="body-default-m">{entry.projectTitle}</Text>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    {entry.blocker}
                  </Text>
                </li>
              ))}
            </ul>
          ) : (
            <Text onBackground="neutral-weak" variant="body-default-m">
              Nenhum bloqueio aberto no momento.
            </Text>
          )}
        </section>

        <section className={styles.panel}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Saúde geral
          </Text>
          <Heading as="h2" variant="heading-strong-l">
            Resumo operacional
          </Heading>
          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <Text variant="body-default-m">Progresso médio atual: {getAverageProgress(items)}%.</Text>
            </li>
            <li className={styles.bulletItem}>
              <Text variant="body-default-m">Projetos públicos ligados ao portfólio: {publishedItems.length}.</Text>
            </li>
            <li className={styles.bulletItem}>
              <Text variant="body-default-m">
                Frentes em atenção ou risco: {items.filter((item) => item.health !== "Saudável").length}.
              </Text>
            </li>
          </ul>
        </section>
      </div>
    </Column>
  );
}

export default async function WorkManagementPage({ searchParams }: PageProps) {
  const [session, params] = await Promise.all([getWorkAdminSession(), searchParams]);
  const hasAuthError = readSearchParam(params.auth) === "invalid";

  if (!session) {
    return <LoginView hasAuthError={hasAuthError} />;
  }

  return <DashboardView username={session.username} />;
}
