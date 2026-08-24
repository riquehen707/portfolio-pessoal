import { NextResponse } from "next/server";

import { getGlobalSearchItems } from "@/lib/globalSearch";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const items = await getGlobalSearchItems();

  return NextResponse.json(
    { items },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
