import styles from "./VisualPrinciplesDemo.module.scss";

type VisualPrinciplesDemoProps = {
  kind: "hierarchy" | "alignment-proximity" | "contrast";
  title: string;
  caption: string;
};

function relativeLuminance(hex: string) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string) {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);

  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

function DemoLabel({ children }: { children: string }) {
  return <span className={styles.label}>{children}</span>;
}

function HierarchyDemo() {
  return (
    <div className={styles.pair}>
      <section className={styles.example} aria-label="Antes: textos com a mesma hierarquia">
        <DemoLabel>Antes</DemoLabel>
        <div className={styles.mockCard}>
          <p className={styles.flatText}>Oficina de cartazes</p>
          <p className={styles.flatText}>17 de setembro · 19h</p>
          <p className={styles.flatText}>Inscrições abertas</p>
        </div>
        <p className={styles.note}>Mesmo tamanho e peso: três mensagens disputam a primeira leitura.</p>
      </section>

      <section className={styles.example} aria-label="Depois: escala tipográfica cria ordem de leitura">
        <DemoLabel>Depois</DemoLabel>
        <div className={styles.mockCard}>
          <p className={styles.eyebrow}>Inscrições abertas</p>
          <p className={styles.demoTitle}>Oficina de cartazes</p>
          <p className={styles.demoMeta}>17 de setembro · 19h</p>
        </div>
        <p className={styles.note}>Só a escala e o peso mudam; conteúdo, cor e posição geral permanecem.</p>
      </section>
    </div>
  );
}

function AlignmentProximityDemo() {
  return (
    <div className={styles.experiments}>
      <section className={styles.experiment} aria-label="Demonstração de alinhamento">
        <div className={styles.experimentHeader}>
          <strong>Variável 1: alinhamento</strong>
          <span>Espaçamento constante</span>
        </div>
        <div className={styles.pair}>
          <div className={`${styles.mockCard} ${styles.misaligned}`} aria-label="Antes: elementos quase alinhados">
            <DemoLabel>Antes</DemoLabel>
            <span>Nome do projeto</span>
            <span>Status da revisão</span>
            <span>Próxima entrega</span>
          </div>
          <div className={`${styles.mockCard} ${styles.aligned}`} aria-label="Depois: elementos compartilham uma borda">
            <DemoLabel>Depois</DemoLabel>
            <span>Nome do projeto</span>
            <span>Status da revisão</span>
            <span>Próxima entrega</span>
          </div>
        </div>
      </section>

      <section className={styles.experiment} aria-label="Demonstração de proximidade">
        <div className={styles.experimentHeader}>
          <strong>Variável 2: proximidade</strong>
          <span>Alinhamento constante</span>
        </div>
        <div className={styles.pair}>
          <div className={`${styles.mockCard} ${styles.uniformGaps}`} aria-label="Antes: intervalos iguais não revelam grupos">
            <DemoLabel>Antes</DemoLabel>
            <strong>Ana</strong><span>Direção de arte</span><strong>Caio</strong><span>Redação</span>
          </div>
          <div className={`${styles.mockCard} ${styles.groupedGaps}`} aria-label="Depois: intervalos diferentes revelam dois grupos">
            <DemoLabel>Depois</DemoLabel>
            <strong>Ana</strong><span>Direção de arte</span><strong>Caio</strong><span>Redação</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContrastSample({ foreground, status }: { foreground: string; status: "Falha" | "Passa" }) {
  const background = "#ffffff";
  const ratio = contrastRatio(foreground, background);

  return (
    <section className={styles.example} aria-label={`${status}: contraste de ${ratio} para 1`}>
      <DemoLabel>{status}</DemoLabel>
      <div className={styles.contrastSample} style={{ color: foreground, backgroundColor: background }}>
        Texto de exemplo
      </div>
      <p className={styles.ratio}>
        <code>{foreground}</code> sobre <code>{background}</code>: <strong>{ratio}:1</strong>
      </p>
    </section>
  );
}

function ContrastDemo() {
  return (
    <div className={styles.pair}>
      <ContrastSample foreground="#9ca3af" status="Falha" />
      <ContrastSample foreground="#374151" status="Passa" />
    </div>
  );
}

export function VisualPrinciplesDemo({ kind, title, caption }: VisualPrinciplesDemoProps) {
  return (
    <figure className={styles.root}>
      <div className={styles.header}>
        <span className={styles.kicker}>Demonstração controlada</span>
        <div className={styles.title}>{title}</div>
      </div>

      {kind === "hierarchy" ? <HierarchyDemo /> : null}
      {kind === "alignment-proximity" ? <AlignmentProximityDemo /> : null}
      {kind === "contrast" ? <ContrastDemo /> : null}

      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
