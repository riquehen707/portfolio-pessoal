import Image from "next/image";
import type { ServiceExampleRendererProps } from "../ServiceExampleRenderers";
import { PsychologyCareGuide, PsychologyContactForm, PsychologyWhatsAppButton } from "./PsychologyDemoInteractions";
import styles from "./PsychologyDemo.module.scss";

const steps = [
  ["01", "Primeiro contato", "Você informa sua disponibilidade e a modalidade de preferência."],
  ["02", "Conversa inicial", "A primeira sessão ajuda a compreender a procura e as expectativas."],
  ["03", "Continuidade", "Formato e frequência são combinados entre profissional e paciente."],
] as const;

const faq = [
  ["Como funciona a primeira sessão?", "É uma conversa inicial para compreender o motivo da procura, tirar dúvidas e avaliar a continuidade do acompanhamento."],
  ["O atendimento pode ser online?", "Sim. Este exemplo apresenta atendimento online e presencial; disponibilidade e requisitos seriam confirmados pela profissional."],
  ["Como faço para agendar?", "O primeiro contato pode começar pelo formulário ou pelo botão de WhatsApp. Depois, os horários disponíveis são combinados diretamente."],
  ["Preciso saber exatamente o que quero trabalhar?", "Não. A pessoa pode chegar com uma questão, um incômodo ou apenas com a percepção de que precisa conversar."],
  ["Como funciona a frequência das sessões?", "A frequência não é definida previamente neste exemplo. Ela seria conversada de acordo com a avaliação e a disponibilidade das pessoas envolvidas."],
] as const;

export function PsychologyDemo({ example }: ServiceExampleRendererProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: example.title,
    description: example.shortDescription,
    about: "Projeto demonstrativo de site institucional para psicologia",
    isPartOf: { "@type": "WebSite", name: "Henrique Reis" },
  };

  return (
    <div className={styles.site} id="inicio">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio">
          <strong>Elisa Veral</strong>
          <span>Psicologia · identidade fictícia</span>
        </a>
        <nav className={styles.desktopNav} aria-label="Navegação principal">
          <a href="#sobre">Sobre</a><a href="#atuacao">Áreas</a><a href="#atendimento">Atendimento</a><a href="#duvidas">Dúvidas</a>
          <a className={styles.navAction} href="#contato">Entrar em contato</a>
        </nav>
        <details className={styles.mobileMenu}>
          <summary>Menu</summary>
          <nav aria-label="Navegação móvel"><a href="#sobre">Sobre</a><a href="#atuacao">Áreas</a><a href="#atendimento">Atendimento</a><a href="#duvidas">Dúvidas</a><a href="#contato">Contato</a></nav>
        </details>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="psychology-demo-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Psicóloga · atendimento de adultos</p>
            <h1 id="psychology-demo-title">Atendimento psicológico online e presencial.</h1>
            <p>Consultas individuais para adultos, com horários combinados após o primeiro contato.</p>
            <div className={styles.heroActions}><a className={styles.primaryButton} href="#contato">Solicitar primeiro contato</a><a href="#atendimento">Ver atendimento</a></div>
            <p className={styles.registration}>Elisa Veral é uma profissional fictícia · CRP 00/000000, registro demonstrativo</p>
          </div>
          <figure className={styles.heroMedia}>
            <Image src="/images/services/site-arquitetos/interiores.webp" alt="Interior sereno com paredes claras, madeira e iluminação indireta, usado como imagem ambiental demonstrativa." fill priority sizes="(max-width: 760px) 100vw, 48vw" />
            <figcaption>Imagem de banco para demonstração visual. Foto: <a href="https://unsplash.com/photos/modern-interior-with-clean-lines-and-natural-light-RZ0A_iNe_pQ" target="_blank" rel="noreferrer">Seongjin Park</a>, Unsplash.</figcaption>
          </figure>
        </section>

        <section className={styles.attendance} id="atendimento" aria-labelledby="attendance-title">
          <div className={styles.attendanceIntro}><p className={styles.eyebrow}>Atendimento</p><h2 id="attendance-title">O essencial antes de agendar.</h2><p>Modalidade, duração e sequência do primeiro contato reunidas em uma única área.</p></div>
          <div className={styles.serviceFacts}>
            <div><span>Modalidade</span><strong>Online ou presencial</strong><p>A disponibilidade seria confirmada no primeiro contato.</p></div>
            <div><span>Duração</span><strong>Cerca de 50 minutos</strong><p>Referência demonstrativa, ajustada às informações reais.</p></div>
          </div>
          <ol className={styles.steps}>{steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
        </section>

        <section className={styles.areas} id="atuacao" aria-labelledby="areas-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Motivos de procura</p><h2 id="areas-title">Temas que podem iniciar a conversa.</h2><p>Selecione um tema para ver como a informação pode ser apresentada sem diagnosticar o visitante.</p></div>
          <PsychologyCareGuide />
        </section>

        <section className={styles.approach} aria-labelledby="approach-title">
          <p className={styles.eyebrow}>Abordagem</p>
          <div><h2 id="approach-title">Orientação cognitivo-comportamental.</h2><p>A abordagem observa relações entre situações, pensamentos, emoções e respostas. Esta informação é ilustrativa e seria substituída pela formação e prática verificadas da profissional.</p></div>
        </section>

        <section className={styles.about} id="sobre" aria-labelledby="about-title">
          <div className={styles.sectionLabel}>Perfil profissional</div>
          <div className={styles.aboutCopy}><h2 id="about-title">Elisa Veral.</h2><p>Identidade fictícia usada para demonstrar onde um site real apresentaria formação, experiência, público atendido e registro profissional.</p></div>
          <dl className={styles.credentials}><div><dt>Formação</dt><dd>Psicologia e formação complementar — exemplo</dd></div><div><dt>Registro</dt><dd>CRP 00/000000 — demonstrativo</dd></div><div><dt>Modalidades</dt><dd>Online e presencial</dd></div></dl>
        </section>

        <section className={styles.faq} id="duvidas" aria-labelledby="faq-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Perguntas frequentes</p><h2 id="faq-title">O que costuma ser útil saber.</h2></div>
          <div>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>

        <section className={styles.contact} id="contato" aria-labelledby="contact-title">
          <div className={styles.contactIntro}>
            <p className={styles.eyebrow}>Contato</p><h2 id="contact-title">Comece com uma mensagem breve.</h2>
            <p>Informe somente nome, canal de retorno e preferência de modalidade. Horários são combinados depois.</p>
            <PsychologyWhatsAppButton />
            <div className={styles.socialLinks} aria-label="Redes sociais demonstrativas"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <span>(exemplo)</span></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <span>(exemplo)</span></a></div>
          </div>
          <PsychologyContactForm />
        </section>

      </main>

      <footer className={styles.footer}><div><strong>Elisa Veral</strong><span>Identidade e conteúdo fictícios para demonstração.</span></div><a href="#inicio">Voltar ao início ↑</a></footer>
    </div>
  );
}
