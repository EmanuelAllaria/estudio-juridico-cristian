import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google-reviews";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getGoogleReviews();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
