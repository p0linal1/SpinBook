import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface RouteContext {
  params: Promise<{ id: string }>;
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
  const { action } = body; // "accept" or "reject"

  if (action === "accept") {
    // Call the accept_application RPC function (not in generated types)
    const { data, error } = await supabase.rpc(
      "accept_application" as never,
      { p_application_id: id, p_promoter_id: user.id } as never
    );

    if (error) {
      return NextResponse.json({ error: (error as { message: string }).message }, { status: 400 });
    }

    return NextResponse.json({ data });
  }

  if (action === "reject") {
    // Use a fresh client to avoid type narrowing issues from rpc call above
    const sb = await createSupabaseServerClient();
    if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 500 });

    const { error } = await sb.from("applications").update({ status: "rejected" }).eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
