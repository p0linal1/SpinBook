import { notFound } from "next/navigation";
import { ApplyModal } from "@/components/apply-modal";
import { GigSlot } from "@/components/gig-slot";
import { RatingStars } from "@/components/rating-stars";
import { featuredGigs, promoterProfile } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

interface GigDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GigDetailPage({ params }: GigDetailPageProps) {
  const { id } = await params;
  const gig = featuredGigs.find((item) => item.id === id);

  if (!gig) {
    notFound();
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

        <div className="panel p-6">
          <p className="eyebrow">Other gigs by this promoter</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {featuredGigs
              .filter((item) => item.id !== gig.id)
              .map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/5 bg-surface-low p-4">
                  <p className="font-display text-lg font-medium">{item.eventName}</p>
                  <p className="mt-2 text-sm text-muted">
                    {item.venueName} · {formatDate(item.date)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="panel p-6">
          <p className="eyebrow">Promoter</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{promoterProfile.displayName}</h2>
          <p className="mt-2 text-sm text-muted">{promoterProfile.bio}</p>
          <div className="mt-4">
            <RatingStars rating={promoterProfile.rating} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="eyebrow">Past events</p>
              <p className="mt-2 font-mono text-2xl text-primary">64</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="eyebrow">Response time</p>
              <p className="mt-2 font-mono text-2xl text-foreground">2h</p>
            </div>
          </div>
        </div>

        <ApplyModal gig={gig} />
      </aside>
    </div>
  );
}
