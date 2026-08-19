import "server-only";

export type PublicReadingComment = { id: string; displayName: string; body: string; createdAt: string };

const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const secretKey = process.env.SUPABASE_SECRET_KEY;

export const commentsConfigured = Boolean(url && secretKey && process.env.COMMENTS_HASH_SECRET);

function headers(prefer?: string) {
  if (!secretKey) throw new Error("Comentários não configurados");
  return { apikey: secretKey, "Content-Type": "application/json", ...(prefer ? { Prefer: prefer } : {}) };
}

export async function getPublishedReadingComments(workId: string): Promise<PublicReadingComment[]> {
  if (!url || !secretKey) return [];
  const query = new URLSearchParams({ select: "id,display_name,body,created_at", work_id: `eq.${workId}`, status: "eq.published", order: "created_at.desc", limit: "100" });
  const response = await fetch(`${url}/rest/v1/reading_comments?${query}`, { headers: headers(), cache: "no-store" });
  if (!response.ok) throw new Error(`Falha ao consultar comentários (${response.status})`);
  const rows = await response.json() as Array<{ id: string; display_name: string; body: string; created_at: string }>;
  return rows.map((row) => ({ id: row.id, displayName: row.display_name, body: row.body, createdAt: row.created_at }));
}

export async function createPendingReadingComment(input: { workId: string; displayName: string; body: string; submitterHash: string }) {
  if (!url || !secretKey) throw new Error("Comentários não configurados");
  const response = await fetch(`${url}/rest/v1/reading_comments`, { method: "POST", headers: headers("return=minimal"), body: JSON.stringify({ work_id: input.workId, display_name: input.displayName, body: input.body, submitter_hash: input.submitterHash, status: "pending" }), cache: "no-store" });
  if (!response.ok) { const detail = await response.text(); throw new Error(detail || `Falha ao enviar comentário (${response.status})`); }
}
