import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createConnectAccount, createAccountLink } from "@/lib/stripe";

export async function POST() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    // Check if user already has a connect account
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_account_id, email")
      .eq("id", user.id)
      .single();

    let accountId = profile?.stripe_account_id;

    if (!accountId) {
      // Create new Connect account
      const account = await createConnectAccount(profile?.email ?? user.email ?? "");
      accountId = account.id;

      // Save to profile
      await supabase
        .from("profiles")
        .update({ stripe_account_id: accountId })
        .eq("id", user.id);
    }

    // Create onboarding link
    const link = await createAccountLink(
      accountId,
      `${appUrl}/api/stripe/connect/callback?account_id=${accountId}`,
      `${appUrl}/wallet`
    );

    return NextResponse.json({ onboardingUrl: link.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create connect account";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
