import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ data: [] });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = user.user_metadata?.role;

  let query;
  if (role === "promoter") {
    query = supabase.from("bookings").select("*").eq("promoter_id", user.id);
  } else {
    query = supabase.from("bookings").select("*").eq("user_id", user.id);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  }

  // Map to frontend format
  const formatted = (data ?? []).map((b) => ({
    id: b.id,
    gigId: b.gig_id,
    eventName: b.event_name,
    venueName: b.venue_name,
    slotType: b.slot_name,
    date: b.date,
    pay: Number(b.pay),
    status: b.status,
    promoterName: "", // Could fetch separately if needed
    contractId: b.contract_id ?? "",
    timeline: [],
  }));

  return NextResponse.json({ data: formatted });
}
