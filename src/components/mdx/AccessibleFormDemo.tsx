import { useId } from "react";

import styles from "./AccessibleFormDemo.module.scss";

export function AccessibleFormDemo() {
  const nameId = useId();
  const emailId = useId();
  const emailHintId = useId();

  return (
    <figure className={styles.root}>
      <div className={styles.header}>
        <span className={styles.kicker}>Exemplo semântico</span>
        <div className={styles.title}>Um formulário precisa explicar, orientar e responder</div>
      </div>

      <form className={styles.form} aria-label="Exemplo de formulário acessível">
        <fieldset className={styles.fieldset}>
          <legend>Receba a confirmação por e-mail</legend>

          <div className={styles.field}>
            <label htmlFor={nameId}>Nome</label>
            <input id={nameId} name="demo-name" autoComplete="name" type="text" />
          </div>

          <div className={styles.field}>
            <label htmlFor={emailId}>E-mail</label>
            <input
              id={emailId}
              name="demo-email"
              type="email"
              autoComplete="email"
              aria-describedby={emailHintId}
            />
            <span id={emailHintId} className={styles.hint}>
              Usaremos este endereço somente para enviar a confirmação.
            </span>
          </div>

          <button type="button">Enviar confirmação</button>
        </fieldset>
      </form>

      <figcaption className={styles.caption}>
        Rótulos persistentes, instrução associada ao campo, ordem de foco nativa e ação específica
        ajudam pessoas e tecnologias assistivas. O exemplo não simula envio nem prova conformidade
        da página inteira.
      </figcaption>
    </figure>
  );
}
