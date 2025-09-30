// src/app/api/check-auth/route.ts

import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const cookies = parse(cookieHeader);

    const isAuthenticated = cookies.authToken === "authenticated";

    return NextResponse.json(
      { authenticated: isAuthenticated },
      { status: isAuthenticated ? 200 : 401 },
    );
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return NextResponse.json(
      { authenticated: false, message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
