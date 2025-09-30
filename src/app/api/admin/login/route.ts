// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "ADMIN_PASSWORD ausente" }, { status: 500 });
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "Senha inválida" }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", "1", {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, path: "/",
  });
  return res;
}
