import { NextResponse } from "next/server";
import { canPostGigs, getProfileRole } from "@/lib/supabase/profile-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ data: [] });
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const genre = searchParams.get("genre");
  const status = searchParams.get("status");

  let query = supabase.from("gigs").select("*").order("created_at", { ascending: false });

  if (city) query = query.eq("city", city);
  if (genre) query = query.contains("genres", [genre]);
  if (status) query = query.eq("status", status);

  const { data: gigs, error } = await query;

  if (error) {
    return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  }

  // Fetch slots for all gigs
  const gigIds = (gigs ?? []).map((g) => g.id);
  const { data: allSlots } = gigIds.length
    ? await supabase.from("gig_slots").select("*").in("gig_id", gigIds)
    : { data: [] };

  // Fetch promoter profiles
  const promoterIds = [...new Set((gigs ?? []).map((g) => g.promoter_id))];
  const { data: promoters } = promoterIds.length
    ? await supabase.from("profiles").select("id, display_name").in("id", promoterIds)
    : { data: [] };

  const promoterMap = new Map((promoters ?? []).map((p) => [p.id, p.display_name]));

  const formatted = (gigs ?? []).map((gig) => {
    const slots = (allSlots ?? [])
      .filter((s) => s.gig_id === gig.id)
      .map((s) => ({
        id: s.id,
        name: s.name,
        start: s.start_time,
        end: s.end_time,
        pay: Number(s.pay),
        status: s.status as "open" | "filled",
        djName: s.assigned_user_name ?? undefined,
        dj_id: s.assigned_user_id ?? undefined,
      }));

    const openSlots = slots.filter((s) => s.status === "open");

    return {
      id: gig.id,
      eventName: gig.event_name,
      venueName: gig.venue_name,
      city: gig.city,
      promoterName: promoterMap.get(gig.promoter_id) ?? "Unknown",
      promoter_id: gig.promoter_id,
      date: gig.date,
      timeLabel: gig.time_label,
      address: gig.address,
      status: gig.status,
      genres: gig.genres ?? [],
      tags: gig.tags ?? [],
      description: gig.description,
      equipment: gig.equipment,
      promoExpectation: gig.promo_expectation,
      applicantCount: 0,
      remainingSlots: openSlots.length,
      slots,
      created_at: gig.created_at,
    };
  });

  return NextResponse.json({ data: formatted });
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = await getProfileRole(supabase, user.id, user.user_metadata?.role as string | undefined);
  if (!canPostGigs(role)) {
    return NextResponse.json({ error: "Only promoters and venues can post gigs" }, { status: 403 });
  }

  const body = await request.json();
  const { eventName, venueName, city, date, timeLabel, address, genres, tags, description, equipment, promoExpectation, slots } = body;

  const { data: gig, error: gigError } = await supabase
    .from("gigs")
    .insert({
      event_name: eventName,
      venue_name: venueName,
      city,
      promoter_id: user.id,
      date,
      time_label: timeLabel ?? "",
      address: address ?? "",
      genres: genres ?? [],
      tags: tags ?? [],
      description: description ?? "",
      equipment: equipment ?? "",
      promo_expectation: promoExpectation ?? "",
    })
    .select()
    .single();

  if (gigError || !gig) {
    return NextResponse.json({ error: gigError?.message ?? "Failed to create gig" }, { status: 500 });
  }

  // Insert slots
  if (slots && Array.isArray(slots) && slots.length > 0) {
    const slotRows = slots.map((s: { name: string; start: string; end: string; pay: number }) => ({
      gig_id: gig.id,
      name: s.name,
      start_time: s.start,
      end_time: s.end,
      pay: s.pay,
    }));

    await supabase.from("gig_slots").insert(slotRows);
  }

  return NextResponse.json({ data: { id: gig.id } }, { status: 201 });
}
