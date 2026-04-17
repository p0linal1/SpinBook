import { GigCard } from "@/components/gig-card";
import { cities, genres } from "@/lib/constants";
import { enrichGigsWithApplicationCounts } from "@/lib/gig-applications";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { featuredGigs } from "@/lib/mock-data";
import type { Gig } from "@/types/gig";

export default async function GigsPage() {
  let gigs: Gig[] = [];

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data: dbGigs } = await supabase.from("gigs").select("*").order("created_at", { ascending: false });
    if (dbGigs && dbGigs.length > 0) {
      const gigIds = dbGigs.map((g) => g.id);
      const { data: allSlots } = await supabase.from("gig_slots").select("*").in("gig_id", gigIds);
      const promoterIds = [...new Set(dbGigs.map((g) => g.promoter_id))];
      const { data: promoters } = await supabase.from("profiles").select("id, display_name").in("id", promoterIds);
      const promoterMap = new Map((promoters ?? []).map((p) => [p.id, p.display_name]));

      gigs = dbGigs.map((gig) => {
        const slots = (allSlots ?? []).filter((s) => s.gig_id === gig.id).map((s) => ({
          id: s.id, name: s.name, start: s.start_time, end: s.end_time,
          pay: Number(s.pay), status: s.status as "open" | "filled",
          djName: s.assigned_user_name ?? undefined, dj_id: s.assigned_user_id ?? undefined,
        }));
        return {
          id: gig.id, eventName: gig.event_name, venueName: gig.venue_name,
          city: gig.city, promoterName: promoterMap.get(gig.promoter_id) ?? "Unknown",
          promoter_id: gig.promoter_id, date: gig.date, timeLabel: gig.time_label,
          address: gig.address, status: gig.status as Gig["status"],
          genres: gig.genres ?? [], tags: gig.tags ?? [],
          description: gig.description, equipment: gig.equipment,
          promoExpectation: gig.promo_expectation, applicantCount: 0,
          remainingSlots: slots.filter((s) => s.status === "open").length, slots,
        };
      });
    }
  }

  // Fall back to mock data if no DB gigs
  if (gigs.length === 0) gigs = featuredGigs;

  let viewerId: string | null = null;
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    viewerId = user?.id ?? null;
    gigs = await enrichGigsWithApplicationCounts(supabase, gigs);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="panel h-fit p-6">
        <p className="eyebrow">Browse</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">Find the right room</h1>

        <div className="mt-6 space-y-5">
          <label className="block space-y-2">
            <span className="eyebrow">City</span>
            <select className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3">
              <option value="">All cities</option>
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>

          <div className="space-y-2">
            <span className="eyebrow">Genres</span>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <label className="block space-y-2">
            <span className="eyebrow">Date Range</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" type="date" />
          </label>

          <label className="block space-y-2">
            <span className="eyebrow">Pay Range</span>
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-2xl border border-white/10 bg-surface-low px-4 py-3 font-mono" placeholder="$200" />
              <input className="rounded-2xl border border-white/10 bg-surface-low px-4 py-3 font-mono" placeholder="$1000+" />
            </div>
          </label>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Search Results</p>
            <h2 className="section-heading mt-2">Browse gigs by date, city, and pay</h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {gigs.length} results
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {gigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              viewerIsOwner={Boolean(viewerId && viewerId === gig.promoter_id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
