"use client";

import { useState } from "react";

import { Button, Heading, Tag, Text } from "@once-ui-system/core";

import styles from "./QuickDiagnostic.module.scss";

type Answer = "yes" | "no";

type DiagnosticQuestion = {
  id: string;
  title: string;
  detail: string;
  issueLabel: string;
  issueImpact: string;
  nextMove: string;
};

const questions: DiagnosticQuestion[] = [
  {
    id: "agenda",
    title: "Sua agenda de atendimentos está organizada e atualizada em um lugar só?",
    detail: "Quando isso está solto, horário, retorno e confirmação acabam dependendo de memória.",
    issueLabel: "Agenda improvisada",
    issueImpact: "A operação perde previsibilidade e o atendimento começa a falhar em pontos básicos.",
    nextMove: "Centralizar agenda, confirmação e rotina de retorno em um fluxo único.",
  },
  {
    id: "catalogo",
    title: "Seu catálogo ou lista de serviços ajuda o cliente a entender rápido o que comprar?",
    detail: "Se a oferta não fica clara, o cliente entra em contato sem entender valor, formato ou próximo passo.",
    issueLabel: "Catálogo fraco",
    issueImpact: "A conversa comercial fica lenta e a decisão tende a esfriar antes do fechamento.",
    nextMove: "Organizar serviços, pacotes e benefícios com leitura simples e decisão rápida.",
  },
  {
    id: "whatsapp",
    title: "Seu WhatsApp já tem mensagens, etiquetas ou alguma lógica de acompanhamento?",
    detail: "Sem padrão, cada conversa vira um caso isolado e as oportunidades se perdem no meio do volume.",
    issueLabel: "WhatsApp desorganizado",
    issueImpact: "Leads entram, mas o acompanhamento fica inconsistente e a conversão cai no detalhe.",
    nextMove: "Criar estrutura mínima de resposta, qualificação e acompanhamento comercial.",
  },
  {
    id: "clientes",
    title: "Seu negócio recebe clientes novos com alguma constância ao longo do mês?",
    detail: "Se a entrada depende só de indicação ou sorte, a agenda oscila e a operação fica reativa.",
    issueLabel: "Poucos clientes novos",
    issueImpact: "O negócio perde previsibilidade e começa a aceitar qualquer demanda para preencher espaço.",
    nextMove: "Abrir uma frente simples de captação com página, oferta clara e rota de contato.",
  },
  {
    id: "financeiro",
    title: "Você acompanha entrada, saída e margem com clareza suficiente para decidir?",
    detail: "Sem leitura mínima de números, desconto, investimento e prioridade viram achismo.",
    issueLabel: "Controle financeiro fraco",
    issueImpact: "Fica difícil saber o que sustenta o negócio e o que só ocupa tempo.",
    nextMove: "Definir um painel enxuto de faturamento, custos e margem por serviço.",
  },
  {
    id: "recorrencia",
    title: "Uma parte relevante dos clientes volta a comprar, reagendar ou renovar com você?",
    detail: "Quando ninguém volta, o negócio precisa recomeçar a venda do zero o tempo todo.",
    issueLabel: "Baixa recorrência",
    issueImpact: "O custo para manter receita sobe e a operação vive correndo atrás da próxima venda.",
    nextMove: "Criar ofertas de retorno, acompanhamento e reativação da base atual.",
  },
  {
    id: "vendas",
    title: "Existe uma estratégia simples para vender, fazer oferta e acompanhar oportunidades?",
    detail: "Sem um roteiro comercial mínimo, a venda depende do improviso e do humor do dia.",
    issueLabel: "Falta de estratégia de venda",
    issueImpact: "O negócio até gera interesse, mas não transforma atenção em fechamento com consistência.",
    nextMove: "Definir oferta, sequência comercial e critério de acompanhamento até a decisão.",
  },
];

function buildWhatsappLink(base: string, text: string) {
  const separator = base.includes("?") ? "&" : "?";

  return `${base}${separator}text=${encodeURIComponent(text)}`;
}

function getSummary(issueCount: number) {
  if (issueCount === 0) {
    return {
      tone: "Base saudável",
      title: "Sua base parece organizada. O próximo nível é acelerar sem perder clareza.",
      description:
        "Você não sinalizou gargalos operacionais centrais. O trabalho aqui tende a ser mais de otimização, posicionamento e escala do que de resgate estrutural.",
    };
  }

  if (issueCount <= 2) {
    return {
      tone: "Ajustes pontuais",
      title: "Há alguns vazamentos específicos, mas o cenário ainda é bem corrigível.",
      description:
        "Os gargalos apareceram em pontos claros. Se você arrumar essas frentes cedo, evita que a operação cresça em cima de improviso.",
    };
  }

  if (issueCount <= 4) {
    return {
      tone: "Atenção real",
      title: "A operação já está perdendo energia em mais frentes do que deveria.",
      description:
        "O problema provavelmente não é só tráfego ou estética. Já existe vazamento entre oferta, rotina comercial, atendimento e retenção.",
    };
  }

  return {
    tone: "Base crítica",
    title: "Seu negócio está rodando com estrutura comercial frágil.",
    description:
      "Quando muitos pontos básicos falham ao mesmo tempo, vender mais sem reorganizar a operação tende a aumentar o caos em vez do resultado.",
  };
}

type QuickDiagnosticProps = {
  whatsappHref: string;
  productsHref: string;
};

export function QuickDiagnostic({ whatsappHref, productsHref }: QuickDiagnosticProps) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const completion = Math.round((answeredCount / questions.length) * 100);
  const issues = questions.filter((question) => answers[question.id] === "no");
  const isComplete = answeredCount === questions.length;
  const summary = getSummary(issues.length);

  const whatsappMessage =
    issues.length > 0
      ? `Acabei de responder o diagnóstico rápido e identifiquei estes gargalos: ${issues
          .map((question) => question.issueLabel.toLowerCase())
          .join(", ")}. Quero organizar isso.`
      : "Acabei de responder o diagnóstico rápido e quero revisar meus próximos passos comerciais.";

  const diagnosticWhatsappHref = buildWhatsappLink(whatsappHref, whatsappMessage);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <Text className={styles.eyebrow} variant="body-default-s" onBackground="neutral-weak">
            7 perguntas | resposta instantânea
          </Text>
          <Heading as="h2" variant="heading-strong-l">
            Mapa rápido da operação
          </Heading>
        </div>

        <div className={styles.progressBlock}>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {answeredCount}/{questions.length} respondidas
          </Text>
          <div className={styles.progressTrack} aria-hidden="true">
            <span className={styles.progressFill} style={{ width: `${completion}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.questionList}>
          {questions.map((question, index) => {
            const answer = answers[question.id];
            const isYes = answer === "yes";
            const isNo = answer === "no";

            return (
              <article
                className={[
                  styles.card,
                  answer ? styles.cardAnswered : "",
                  isNo ? styles.cardIssue : "",
                ].join(" ")}
                key={question.id}
              >
                <div className={styles.questionTop}>
                  <span className={styles.questionIndex}>{String(index + 1).padStart(2, "0")}</span>
                  {answer && (
                    <span className={isYes ? styles.answerHealthy : styles.answerWarning}>
                      {isYes ? "Estruturado" : "Ponto crítico"}
                    </span>
                  )}
                </div>

                <Heading as="h3" className={styles.questionTitle} variant="heading-strong-m">
                  {question.title}
                </Heading>

                <Text onBackground="neutral-weak" variant="body-default-s">
                  {question.detail}
                </Text>

                <div className={styles.answerRow} role="group" aria-label={`Resposta para ${question.title}`}>
                  <button
                    type="button"
                    className={[styles.answerButton, isYes ? styles.answerButtonYes : ""].join(" ")}
                    aria-pressed={isYes}
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: "yes" }))}
                  >
                    <span className={styles.answerButtonTitle}>Sim</span>
                    <span className={styles.answerButtonHint}>Isso já existe com alguma consistência.</span>
                  </button>

                  <button
                    type="button"
                    className={[styles.answerButton, isNo ? styles.answerButtonNo : ""].join(" ")}
                    aria-pressed={isNo}
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: "no" }))}
                  >
                    <span className={styles.answerButtonTitle}>Não</span>
                    <span className={styles.answerButtonHint}>Aqui ainda existe improviso ou falta de rotina.</span>
                  </button>
                </div>

                {isNo && (
                  <div className={styles.issueHint}>
                    <Text variant="body-default-s">{question.issueImpact}</Text>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <aside className={styles.summaryPanel}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Resultado
          </Tag>

          <Heading as="h3" className={styles.summaryTitle} variant="display-strong-xs">
            {isComplete
              ? summary.title
              : "Responda todas as perguntas para fechar o diagnóstico."}
          </Heading>

          <Text onBackground="neutral-weak" variant="body-default-m">
            {isComplete
              ? summary.description
              : unansweredCount === questions.length
                ? "A ideia aqui é marcar o que já está organizado e deixar o resto aparecer sem rodeio."
                : `Faltam ${unansweredCount} ${unansweredCount === 1 ? "resposta" : "respostas"} para consolidar o cenário.`}
          </Text>

          <div className={styles.metricGrid}>
            <div className={styles.metricCard}>
              <Text className={styles.metricLabel} variant="body-default-s">
                Respondidas
              </Text>
              <Text className={styles.metricValue} variant="heading-strong-l">
                {answeredCount}/{questions.length}
              </Text>
            </div>

            <div className={styles.metricCard}>
              <Text className={styles.metricLabel} variant="body-default-s">
                Gargalos
              </Text>
              <Text className={styles.metricValue} variant="heading-strong-l">
                {issues.length.toString().padStart(2, "0")}
              </Text>
            </div>

            <div className={styles.metricCard}>
              <Text className={styles.metricLabel} variant="body-default-s">
                Leitura
              </Text>
              <Text className={styles.metricValue} variant="heading-strong-l">
                {isComplete ? summary.tone : "Em andamento"}
              </Text>
            </div>
          </div>

          {issues.length > 0 ? (
            <div className={styles.issueList}>
              {issues.map((issue) => (
                <div className={styles.issueItem} key={issue.id}>
                  <Text className={styles.issueLabel} variant="body-default-s">
                    {issue.issueLabel}
                  </Text>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    {issue.nextMove}
                  </Text>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Text className={styles.issueLabel} variant="body-default-s">
                {isComplete ? "Sem gargalo crítico marcado" : "As prioridades aparecem aqui"}
              </Text>
              <Text onBackground="neutral-weak" variant="body-default-s">
                {isComplete
                  ? "Se essa leitura bate com a realidade, o próximo passo é otimizar aquisição, posicionamento e conversão."
                  : "Assim que você responder, esta área lista os pontos fracos e a direção mais urgente para cada um."}
              </Text>
            </div>
          )}

          <div className={styles.summaryActions}>
            <Button
              href={isComplete ? diagnosticWhatsappHref : whatsappHref}
              variant="primary"
              size="m"
              arrowIcon
            >
              {isComplete ? "Quero organizar isso" : "Falar no WhatsApp"}
            </Button>

            <Button href={productsHref} variant="secondary" size="m" arrowIcon>
              Ver produtos e pacotes
            </Button>

            {answeredCount > 0 && (
              <Button type="button" variant="tertiary" size="s" onClick={() => setAnswers({})}>
                Recomeçar diagnóstico
              </Button>
            )}
          </div>

          <Text className={styles.helper} onBackground="neutral-weak" variant="body-default-s">
            Se aparecerem 3 ou mais gargalos, o problema normalmente já não é só tráfego. É estrutura comercial e operacional.
          </Text>
        </aside>
      </div>
    </div>
  );
}
