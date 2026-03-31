import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object;
      const contractId = pi.metadata?.contract_id;
      const bookingId = pi.metadata?.booking_id;

      if (contractId) {
        await supabase
          .from("contracts")
          .update({ status: "escrow_funded" })
          .eq("id", contractId);
      }

      if (bookingId) {
        await supabase
          .from("bookings")
          .update({ status: "PAID" })
          .eq("id", bookingId);
      }
      break;
    }

    case "account.updated": {
      const account = event.data.object;
      if (account.charges_enabled) {
        await supabase
          .from("profiles")
          .update({ stripe_onboarded: true })
          .eq("stripe_account_id", account.id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
