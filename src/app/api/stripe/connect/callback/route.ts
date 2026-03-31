import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("account_id");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!accountId) {
    return NextResponse.redirect(`${appUrl}/wallet`);
  }

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    // Mark the profile as onboarded
    await supabase
      .from("profiles")
      .update({ stripe_onboarded: true })
      .eq("stripe_account_id", accountId);
  }

  return NextResponse.redirect(`${appUrl}/wallet`);
}
