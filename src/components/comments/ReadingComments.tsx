"use client";

import { useEffect, useState, type FormEvent } from "react";
import styles from "./ReadingComments.module.scss";

type Comment = { id: string; displayName: string; body: string; createdAt: string };

export function ReadingComments({ workId, enabled }: { workId: string; enabled: boolean }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    fetch(`/api/comments?workId=${encodeURIComponent(workId)}`, { signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error(); return response.json(); })
      .then((data: { comments?: Comment[] }) => setComments(data.comments ?? []))
      .catch(() => { if (!controller.signal.aborted) setMessage("Não foi possível carregar os comentários agora."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [enabled, workId]);

  if (!enabled) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setMessage("");
    const form = event.currentTarget; const data = new FormData(form);
    const response = await fetch("/api/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ workId, displayName: data.get("displayName"), body: data.get("body"), website: data.get("website"), consent: data.get("consent") === "on" }) }).catch(() => null);
    const result = response ? await response.json().catch(() => ({})) as { message?: string } : {};
    setMessage(result.message ?? "Não foi possível enviar o comentário.");
    if (response?.ok) form.reset();
    setSubmitting(false);
  }

  return <section className={styles.comments} aria-labelledby="comentarios-leitores">
    <header><span>Conversa com leitores</span><h2 id="comentarios-leitores">Comentários</h2><p>Comentários são publicados após moderação. Discordâncias são bem-vindas; ataques pessoais, spam e spoilers sem aviso não são.</p></header>
    <div className={styles.layout}>
      <div aria-live="polite">
        {loading ? <p>Carregando comentários…</p> : comments.length ? <ol className={styles.list}>{comments.map((comment) => <li key={comment.id}><div><strong>{comment.displayName}</strong><time dateTime={comment.createdAt}>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(comment.createdAt))}</time></div><p>{comment.body}</p></li>)}</ol> : <p>Ainda não há comentários publicados. Você pode iniciar a conversa.</p>}
      </div>
      <form onSubmit={submit} className={styles.form}>
        <label>Como você quer aparecer?<input name="displayName" required minLength={2} maxLength={60} autoComplete="name" /></label>
        <label>Seu comentário<textarea name="body" required minLength={20} maxLength={1200} rows={6} /></label>
        <label className={styles.honeypot} aria-hidden="true">Seu site<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className={styles.consent}><input type="checkbox" name="consent" required /> <span>Autorizo a publicação deste nome e comentário conforme a política de moderação.</span></label>
        <div className={styles.formFooter}><small>20–1.200 caracteres. Não informe e-mail, telefone ou outros dados pessoais.</small><button type="submit" disabled={submitting}>{submitting ? "Enviando…" : "Enviar para moderação"}</button></div>
        {message ? <p className={styles.message} role="status">{message}</p> : null}
      </form>
    </div>
  </section>;
}
