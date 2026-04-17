import type { SupabaseClient } from "@supabase/supabase-js";

/** Prefer `profiles.role` so it stays in sync if metadata is stale. */
export async function getProfileRole(
  supabase: SupabaseClient,
  userId: string,
  metadataFallback?: string,
): Promise<string | undefined> {
  const { data } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();
  return (data?.role as string | undefined) ?? metadataFallback;
}

export function canPostGigs(role: string | undefined): boolean {
  return role === "promoter" || role === "venue";
}

export function canViewHostBookings(role: string | undefined): boolean {
  return role === "promoter" || role === "venue";
}
