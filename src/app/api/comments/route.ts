import { createHmac } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getReadingWorkById } from "@/data/reading";
import { commentsConfigured, createPendingReadingComment, getPublishedReadingComments } from "@/lib/comments/supabaseComments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const workIdSchema = z.string().regex(/^read_work_[a-z0-9_]+$/);
const submissionSchema = z.object({
  workId: workIdSchema,
  displayName: z.string().trim().min(2).max(60),
  body: z.string().trim().min(20).max(1200),
  website: z.string().max(0),
  consent: z.literal(true),
});

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

function submitterHash(request: NextRequest) {
  const secret = process.env.COMMENTS_HASH_SECRET;
  if (!secret) throw new Error("COMMENTS_HASH_SECRET ausente");
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function GET(request: NextRequest) {
  if (!commentsConfigured) return NextResponse.json({ configured: false, comments: [] }, { status: 503 });
  const parsed = workIdSchema.safeParse(request.nextUrl.searchParams.get("workId"));
  if (!parsed.success) return NextResponse.json({ message: "Livro inválido." }, { status: 400 });
  try { return NextResponse.json({ configured: true, comments: await getPublishedReadingComments(parsed.data) }, { headers: { "Cache-Control": "private, no-store" } }); }
  catch { return NextResponse.json({ message: "Não foi possível carregar os comentários." }, { status: 502 }); }
}

export async function POST(request: NextRequest) {
  if (!commentsConfigured) return NextResponse.json({ message: "Comentários ainda não configurados." }, { status: 503 });
  if (!sameOrigin(request)) return NextResponse.json({ message: "Origem da solicitação não permitida." }, { status: 403 });
  const parsed = submissionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Revise o nome, o comentário e a autorização." }, { status: 400 });
  const work = await getReadingWorkById(parsed.data.workId);
  if (!work || work.status !== "published") return NextResponse.json({ message: "Livro não encontrado." }, { status: 404 });
  try {
    await createPendingReadingComment({ workId: parsed.data.workId, displayName: parsed.data.displayName, body: parsed.data.body, submitterHash: submitterHash(request) });
    return NextResponse.json({ message: "Comentário recebido e enviado para moderação." }, { status: 202 });
  } catch (error) {
    const rateLimited = error instanceof Error && (error.message.includes("Limite") || error.message.includes("Aguarde"));
    return NextResponse.json({ message: rateLimited ? "Limite de envios atingido. Tente novamente mais tarde." : "Não foi possível enviar o comentário." }, { status: rateLimited ? 429 : 502 });
  }
}
