// src/app/api/authenticate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.PAGE_ACCESS_PASSWORD;

    if (!correctPassword) {
      console.error("PAGE_ACCESS_PASSWORD environment variable is not set");
      return NextResponse.json(
        { message: "Erro interno do servidor" },
        { status: 500 },
      );
    }

    if (password !== correctPassword) {
      return NextResponse.json(
        { message: "Senha incorreta" },
        { status: 401 },
      );
    }

    // Cria cookie de autenticação
    const cookieValue = serialize("authToken", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1h
      sameSite: "strict",
      path: "/",
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookieValue);

    return response;
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
