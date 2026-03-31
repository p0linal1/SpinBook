import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    user: null,
    message: "Hook this route up to Supabase auth or your preferred provider.",
  });
}
