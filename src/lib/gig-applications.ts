import type { SupabaseClient } from "@supabase/supabase-js";
import type { Gig } from "@/types/gig";
import { isUuid } from "@/lib/utils";

export type GigApplicationCounts = { total: number; pending: number };

/** Aggregate application counts per gig id (for cards and host UI). */
export async function getApplicationCountsByGigIds(
  supabase: SupabaseClient,
  gigIds: string[],
): Promise<Map<string, GigApplicationCounts>> {
  const map = new Map<string, GigApplicationCounts>();
  for (const id of gigIds) {
    map.set(id, { total: 0, pending: 0 });
  }
  if (gigIds.length === 0) return map;

  const { data, error } = await supabase.from("applications").select("gig_id, status").in("gig_id", gigIds);

  if (error || !data) return map;

  for (const row of data) {
    const gid = row.gig_id as string;
    const cur = map.get(gid) ?? { total: 0, pending: 0 };
    cur.total += 1;
    if (row.status === "pending") cur.pending += 1;
    map.set(gid, cur);
  }
  return map;
}

/** Sets `applicantCount` from the database for real gig IDs (mock slugs unchanged). */
export async function enrichGigsWithApplicationCounts(
  supabase: SupabaseClient,
  gigs: Gig[],
): Promise<Gig[]> {
  const ids = gigs.map((g) => g.id).filter((gid) => isUuid(gid));
  if (ids.length === 0) return gigs;
  const map = await getApplicationCountsByGigIds(supabase, ids);
  return gigs.map((g) => {
    const c = map.get(g.id);
    if (!c) return g;
    return { ...g, applicantCount: c.total };
  });
}
