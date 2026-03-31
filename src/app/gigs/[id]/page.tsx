import { notFound } from "next/navigation";
import { ApplyModal } from "@/components/apply-modal";
import { GigSlot } from "@/components/gig-slot";
import { RatingStars } from "@/components/rating-stars";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { featuredGigs, promoterProfile } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { Gig } from "@/types/gig";

interface GigDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GigDetailPage({ params }: GigDetailPageProps) {
  const { id } = await params;

  let gig: Gig | null = null;
  let promoter: { displayName: string; bio: string; rating: number } | null = null;

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data: dbGig } = await supabase.from("gigs").select("*").eq("id", id).single();
    if (dbGig) {
      const { data: dbSlots } = await supabase.from("gig_slots").select("*").eq("gig_id", id);
      const { data: dbPromoter } = await supabase.from("profiles").select("display_name, bio, rating").eq("id", dbGig.promoter_id).single();

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

      if (dbPromoter) {
        promoter = { displayName: dbPromoter.display_name, bio: dbPromoter.bio ?? "", rating: Number(dbPromoter.rating) || 0 };
      }
    }
  }

  // Fallback to mock data
  if (!gig) {
    const mockGig = featuredGigs.find((item) => item.id === id);
    if (!mockGig) notFound();
    gig = mockGig!;
    promoter = { displayName: promoterProfile.displayName, bio: promoterProfile.bio, rating: promoterProfile.rating };
  }

  if (!promoter) {
    promoter = { displayName: gig.promoterName, bio: "", rating: 0 };
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-6">
        <div className="panel p-8">
          <p className="eyebrow">Gig Detail</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em]">
            {gig.eventName}
          </h1>
          <div className="mt-5 grid gap-4 text-sm text-muted md:grid-cols-3">
            <div>
              <p className="eyebrow">Venue</p>
              <p className="mt-2 text-foreground">{gig.venueName}</p>
            </div>
            <div>
              <p className="eyebrow">Date</p>
              <p className="mt-2 text-foreground">{formatDate(gig.date)}</p>
            </div>
            <div>
              <p className="eyebrow">Address</p>
              <p className="mt-2 text-foreground">{gig.address}</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <p className="eyebrow">Description</p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{gig.description}</p>
            </div>
            <div>
              <p className="eyebrow">Equipment</p>
              <p className="mt-3 text-base leading-7 text-muted">{gig.equipment}</p>
            </div>
            <div>
              <p className="eyebrow">Promotion expectations</p>
              <p className="mt-3 text-base leading-7 text-muted">{gig.promoExpectation}</p>
            </div>
          </div>
        </div>

        <div className="panel p-6">
          <p className="eyebrow mb-4">Slots</p>
          <div className="space-y-3">
            {gig.slots.map((slot) => (
              <GigSlot key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="panel p-6">
          <p className="eyebrow">Promoter</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{promoter.displayName}</h2>
          <p className="mt-2 text-sm text-muted">{promoter.bio}</p>
          <div className="mt-4">
            <RatingStars rating={promoter.rating} />
          </div>
        </div>

        <ApplyModal gig={gig} />
      </aside>
    </div>
  );
}
