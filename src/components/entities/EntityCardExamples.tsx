import { PersonCard } from "./PersonCard";
import { StudioCard } from "./StudioCard";
import styles from "./EntityCardExamples.module.scss";

export function EntityCardExamples() {
  return <div className={styles.examples}>
    <section><header><span>Pessoas</span><h2>Apresentação biográfica</h2></header><div><PersonCard personId="person_hayao_miyazaki"/><PersonCard personId="person_friedrich_nietzsche"/></div></section>
    <section><header><span>Estúdios</span><h2>Apresentação institucional</h2></header><div><StudioCard organizationId="org_studio_ghibli"/><StudioCard organizationId="org_laika"/></div></section>
  </div>;
}
