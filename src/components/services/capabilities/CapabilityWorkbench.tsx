import styles from "./CapabilityWorkbench.module.scss";

const process = [
  {
    number: "01",
    title: "Estrutura",
    description: "Defino a hierarquia, o conteúdo e os caminhos principais.",
  },
  {
    number: "02",
    title: "Interface",
    description: "Transformo essa base em uma experiência clara e responsiva.",
  },
  {
    number: "03",
    title: "Resultado",
    description: "A pessoa encontra o que precisa e sabe qual ação tomar.",
  },
] as const;

export function CapabilityWorkbench() {
  return (
    <div className={styles.workbench}>
      <section
        className={styles.modules}
        id="modulos"
        aria-labelledby="modules-title"
      >
        <header className={styles.sectionHeading}>
          <p>Módulos de interface</p>
          <h2 id="modules-title">Peças de uma experiência maior.</h2>
          <span>
            Recursos diferentes podem compartilhar a mesma linguagem e manter a
            navegação simples conforme o site cresce.
          </span>
        </header>

        <div className={styles.moduleExamples}>
          <article>
            <div className={styles.moduleCopy}>
              <span>Organização</span>
              <h3>Filtros e listas</h3>
              <p>
                Organizam projetos, produtos ou conteúdos sem transformar a
                navegação em uma página confusa.
              </p>
            </div>
            <div
              className={styles.filterInterface}
              aria-label="Exemplo visual estático de filtros e lista de projetos"
            >
              <div className={styles.interfaceHeader}>
                <strong>Projetos</strong>
                <span>12 itens</span>
              </div>
              <div className={styles.filterLabels} aria-hidden="true">
                <b>Todos</b>
                <span>Publicados</span>
                <span>Em revisão</span>
              </div>
              <ul aria-hidden="true">
                <li><span>Site institucional</span><b>Publicado</b></li>
                <li><span>Catálogo visual</span><b>Publicado</b></li>
                <li><span>Área de conteúdo</span><b>Em revisão</b></li>
              </ul>
            </div>
          </article>

          <article>
            <div className={styles.moduleCopy}>
              <span>Navegação</span>
              <h3>Menus e caminhos</h3>
              <p>
                Estruturas que continuam compreensíveis no celular e no desktop,
                mesmo quando novas áreas passam a fazer parte do site.
              </p>
            </div>
            <div
              className={styles.navigationInterface}
              aria-label="Exemplo visual estático de navegação responsiva"
            >
              <div className={styles.browserHeader} aria-hidden="true">
                <i /><i /><i /><span>seusite.com.br</span>
              </div>
              <div className={styles.navigationCanvas} aria-hidden="true">
                <header><strong>MARCA</strong><span>Início&nbsp;&nbsp; Serviços&nbsp;&nbsp; Contato</span></header>
                <main><i /><b /><p /><p /><span /></main>
                <nav><span>Início</span><span>Serviços</span><span>Contato</span></nav>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        className={styles.structure}
        id="estrutura"
        aria-labelledby="structure-title"
      >
        <header className={styles.structureHeading}>
          <p>Estrutura antes do acabamento</p>
          <h2 id="structure-title">Antes da aparência, existe um caminho.</h2>
          <span>
            Hierarquia, conteúdo e ações são definidos antes da camada visual.
            Assim, o acabamento reforça uma experiência que já faz sentido.
          </span>
        </header>

        <ol className={styles.process}>
          {process.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
