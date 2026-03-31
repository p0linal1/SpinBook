import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { action } = body; // "sign"

  if (action !== "sign") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  // Get current contract
  const { data: contract, error: fetchError } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !contract) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 });
  }

  // Determine which party is signing
  const updates: Record<string, unknown> = {};
  if (user.id === contract.dj_id) {
    updates.dj_signed = true;
  } else if (user.id === contract.promoter_id) {
    updates.promoter_signed = true;
  } else {
    return NextResponse.json({ error: "Not authorized to sign this contract" }, { status: 403 });
  }

  // If both will be signed, update status
  const willBothSign =
    (updates.dj_signed || contract.dj_signed) &&
    (updates.promoter_signed || contract.promoter_signed);

  if (willBothSign) {
    updates.status = "signed";
  }

  const { error: updateError } = await supabase
    .from("contracts")
    .update(updates)
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // If both signed, update booking status to CONFIRMED
  if (willBothSign) {
    await supabase
      .from("bookings")
      .update({ status: "CONFIRMED" })
      .eq("contract_id", id);
  }

  return NextResponse.json({ success: true, bothSigned: willBothSign });
}
