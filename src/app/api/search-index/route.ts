import { NextResponse } from "next/server";

import { getGlobalSearchItems } from "@/lib/globalSearch";
import { normalizeContentLocale } from "@/lib/contentLocale";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(request: Request) {
  const locale = normalizeContentLocale(new URL(request.url).searchParams.get("locale") ?? undefined);
  const items = await getGlobalSearchItems(locale);

  return NextResponse.json(
    { items },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
