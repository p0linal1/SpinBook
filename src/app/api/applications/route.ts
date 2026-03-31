import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = user.user_metadata?.role;
  if (role !== "dj" && role !== "media") {
    return NextResponse.json({ error: "Only DJs and media can apply" }, { status: 403 });
  }

  const body = await request.json();
  const { gig_id, slot_id, mix_link, note } = body;

  // Get display name from profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();

  const { data, error } = await supabase
    .from("applications")
    .insert({
      gig_id,
      slot_id,
      applicant_id: user.id,
      applicant_name: profile?.display_name ?? "Unknown",
      applicant_role: role as "dj" | "media",
      mix_link: mix_link || null,
      note: note || null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "You already applied to this slot" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

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

  if (role === "promoter") {
    // Get applications to promoter's gigs
    const { data: gigs } = await supabase.from("gigs").select("id").eq("promoter_id", user.id);
    const gigIds = (gigs ?? []).map((g) => g.id);
    if (gigIds.length === 0) return NextResponse.json({ data: [] });

    const { data } = await supabase
      .from("applications")
      .select("*")
      .in("gig_id", gigIds)
      .order("created_at", { ascending: false });

    return NextResponse.json({ data: data ?? [] });
  }

  // DJ/media: get own applications
  const { data } = await supabase
    .from("applications")
    .select("*")
    .eq("applicant_id", user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ data: data ?? [] });
}
