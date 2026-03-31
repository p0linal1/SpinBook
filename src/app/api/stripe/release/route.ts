import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createTransfer } from "@/lib/stripe";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { contract_id } = body;

  // Get contract
  const { data: contract, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", contract_id)
    .single();

  if (error || !contract) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 });
  }

  if (user.id !== contract.promoter_id) {
    return NextResponse.json({ error: "Only the promoter can release funds" }, { status: 403 });
  }

  if (contract.status !== "escrow_funded") {
    return NextResponse.json({ error: "Escrow must be funded before release" }, { status: 400 });
  }

  // Get DJ's Stripe account
  const { data: djProfile } = await supabase
    .from("profiles")
    .select("stripe_account_id")
    .eq("id", contract.dj_id)
    .single();

  if (!djProfile?.stripe_account_id) {
    return NextResponse.json({ error: "DJ has not set up Stripe Connect" }, { status: 400 });
  }

  try {
    await createTransfer(Number(contract.pay), djProfile.stripe_account_id, {
      contract_id: contract.id,
      booking_id: contract.booking_id,
    });

    // Update contract and booking status
    await supabase
      .from("contracts")
      .update({ status: "completed" })
      .eq("id", contract.id);

    await supabase
      .from("bookings")
      .update({ status: "COMPLETED" })
      .eq("id", contract.booking_id);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transfer failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
