import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { featuredGigs } from "@/lib/mock-data";
import type { Gig } from "@/types/gig";
import { EventApplications } from "@/components/event-applications";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  let gig: Gig | null = null;
  let applications: Array<{
    id: string;
    applicant_name: string;
    applicant_role: string;
    status: string;
    slot_id: string;
    mix_link: string | null;
    note: string | null;
  }> = [];

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data: dbGig } = await supabase.from("gigs").select("*").eq("id", id).single();
    if (dbGig) {
      const { data: dbSlots } = await supabase.from("gig_slots").select("*").eq("gig_id", id);
      const { data: dbPromoter } = await supabase.from("profiles").select("display_name").eq("id", dbGig.promoter_id).single();

      const slots = (dbSlots ?? []).map((s) => ({
        id: s.id, name: s.name, start: s.start_time, end: s.end_time,
        pay: Number(s.pay), status: s.status as "open" | "filled",
        djName: s.assigned_user_name ?? undefined, dj_id: s.assigned_user_id ?? undefined,
      }));

      gig = {
        id: dbGig.id, eventName: dbGig.event_name, venueName: dbGig.venue_name,
        city: dbGig.city, promoterName: dbPromoter?.display_name ?? "Unknown",
        promoter_id: dbGig.promoter_id, date: dbGig.date, timeLabel: dbGig.time_label,
        address: dbGig.address, status: dbGig.status as Gig["status"],
        genres: dbGig.genres ?? [], tags: dbGig.tags ?? [],
        description: dbGig.description, equipment: dbGig.equipment,
        promoExpectation: dbGig.promo_expectation, applicantCount: 0,
        remainingSlots: slots.filter((s) => s.status === "open").length, slots,
      };

      // Get applications for this gig
      const { data: dbApps } = await supabase
        .from("applications")
        .select("id, applicant_name, applicant_role, status, slot_id, mix_link, note")
        .eq("gig_id", id)
        .order("created_at", { ascending: false });

      applications = dbApps ?? [];
    }
  }

  // Fallback mock
  if (!gig) {
    const mockGig = featuredGigs.find((item) => item.id === id) ?? featuredGigs[0];
    gig = mockGig;
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Promoter Command Center</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">{gig.eventName}</h1>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-primary">
            {gig.venueName} · {gig.city}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Edit Event</Button>
          <Button>Publish Updates</Button>
        </div>
      </section>

      <section className="flex overflow-x-auto border-b border-white/10">
        {["Lineup", "Applications", "Guest List", "Promo Tracker", "Budget", "Run of Show"].map((tab, index) => (
          <button
            key={tab}
            className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm ${index === 0 ? "border-primary text-primary" : "border-transparent text-muted"}`}
            type="button"
          >
            {tab}
          </button>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-12">
        <div className="panel p-6 xl:col-span-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold">Lineup timeline</h2>
          </div>

          <div className="mt-8 space-y-4">
            {gig.slots.map((slot) => (
              <div key={slot.id} className="rounded-2xl border border-white/10 bg-surface-low p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-medium">
                      {slot.status === "filled" ? slot.djName : "Open slot"}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                      {slot.name} · {slot.start} - {slot.end}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-primary">${slot.pay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6 xl:col-span-4">
          <h2 className="font-display text-2xl font-semibold">Promo reach</h2>
          <div className="mt-6 flex h-40 items-end gap-3">
            {["45%", "85%", "60%", "30%", "70%"].map((height, index) => (
              <div key={`${height}-${index}`} className="flex-1 rounded-2xl bg-surface-low p-2">
                <div
                  className={`w-full rounded-xl ${index % 2 === 0 ? "bg-secondary" : "bg-primary"}`}
                  style={{ height }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6 xl:col-span-7">
          <EventApplications applications={applications} gigId={gig.id} />
        </div>

        <div className="panel p-6 xl:col-span-5">
          <h2 className="font-display text-2xl font-semibold">Run of show</h2>
          <div className="mt-6 space-y-3">
            {gig.slots.map((slot) => (
              <div key={slot.id} className="rounded-2xl border border-white/5 bg-surface-low px-4 py-4 text-sm text-muted">
                {slot.name} at {slot.start} · {slot.status === "filled" ? slot.djName : "TBD"}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
