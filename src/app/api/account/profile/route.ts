import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({
  name: z.string().min(2).max(80).optional().or(z.literal("")),
  image: z.string().max(2048).optional().or(z.literal("")),
  bio: z.string().max(280).optional().or(z.literal("")),
});

const normalize = (value?: string) => {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const data = {
    name: normalize(parsed.data.name),
    image: normalize(parsed.data.image),
    bio: normalize(parsed.data.bio),
  };

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: { id: true, name: true, image: true, bio: true },
  });

  return NextResponse.json({ user });
}
