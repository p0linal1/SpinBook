import Image from "next/image";
import Link from "next/link";
import { GigCard } from "@/components/gig-card";
import { ArrowRightIcon } from "@/components/landing/arrow-right";
import { BookingPreviewCard } from "@/components/landing/booking-preview-card";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { PricingSection } from "@/components/landing/pricing-section";
import { StatCard } from "@/components/stat-card";
import { cities, genres } from "@/lib/constants";
import { featuredGigs, gigFeedStats } from "@/lib/mock-data";
import { enrichGigsWithApplicationCounts } from "@/lib/gig-applications";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Gig } from "@/types/gig";

const avatarStack = ["A", "B", "C", "D"] as const;

export default async function HomePage() {
  let gigs: Gig[] = [];

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data: dbGigs } = await supabase.from("gigs").select("*").order("created_at", { ascending: false }).limit(6);
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

  if (gigs.length === 0) gigs = featuredGigs;

  let viewerId: string | null = null;
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    viewerId = user?.id ?? null;
    gigs = await enrichGigsWithApplicationCounts(supabase, gigs);
  }

  return (
    <div className="space-y-0">
      <section
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
        aria-label="Hero"
      >
        <div className="relative min-h-[min(88vh,880px)] w-full">
          <Image
            src="/images/hero-dj.png"
            alt="DJ on stage with arms outstretched, facing a large crowd at night"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black" />
          <div className="grain-overlay absolute inset-0" aria-hidden />

          <div className="relative z-10 mx-auto flex min-h-[min(88vh,880px)] max-w-5xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:px-10">
            <h1 className="font-display text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
              Your gig.
              <br />
              Your contract.
              <br />
              Your payout.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              From first offer to final payout — contracts, payments, and gig management built for DJs and the venues
              that book them.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/95"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-full border border-white/90 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <p className="text-sm text-white/70">Trusted already by 1.2k+</p>
              <div className="flex -space-x-2">
                {avatarStack.map((letter, i) => (
                  <span
                    key={letter}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br from-white/25 to-white/5 text-[10px] font-semibold text-white/90"
                    style={{ zIndex: avatarStack.length - i }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 border-t border-white/[0.06] bg-black py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="order-2 lg:order-1">
            <BookingPreviewCard />
          </div>
          <div className="order-1 space-y-6 lg:order-2">
            <h2 className="font-display text-4xl font-bold tracking-[-0.04em] text-white md:text-[2.75rem] md:leading-[1.1]">
              Built for the industry
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">
              No more lost gigs in your DMs. No more unsigned contracts. No more chasing payments. SpinBook gives you
              one professional home for every booking — from first offer to final payout.
            </p>
            <Link
              href="#features"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/95"
            >
              Learn More
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <FeaturesGrid />

      <PricingSection />

      <section id="faq" className="scroll-mt-28 border-t border-white/[0.06] py-16 md:py-20">
        <div className="max-w-3xl space-y-8">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-white">FAQ</h2>
          <dl className="space-y-6 text-white/80">
            <div>
              <dt className="font-medium text-white">Is SpinBook a replacement for my agent?</dt>
              <dd className="mt-2 leading-relaxed">
                It is a workflow layer for offers, contracts, and payouts — whether you book yourself or with a team.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-white">When do DJs get paid?</dt>
              <dd className="mt-2 leading-relaxed">
                Payout timing follows your contract and event completion — details are visible on each booking.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="my-16 border-t border-white/[0.06] pt-16" />

      <section className="space-y-10">
        <div className="panel overflow-hidden bg-hero-grid p-8">
          <div>
            <p className="eyebrow">Gigs Feed</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-[-0.05em] text-foreground md:text-5xl">
              Get Booked. Get Paid. Build Your Name.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Open gigs, dependable promoters, auto-generated contracts, and escrow-backed payouts in one
              nightlife-native workflow.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/20 py-3">
              <div className="flex min-w-max animate-ticker gap-8 px-4">
                {[
                  "LIVE OPPORTUNITIES: 142 OPEN GIGS",
                  "LOS ANGELES AVG: $640 / NIGHT",
                  "MIDNIGHT BUREAU BOOKING NOW",
                  "CHICAGO URGENT SLOT JUST POSTED",
                  "ESCROW RELEASES WITHIN 24 HOURS",
                  "LIVE OPPORTUNITIES: 142 OPEN GIGS",
                  "LOS ANGELES AVG: $640 / NIGHT",
                  "MIDNIGHT BUREAU BOOKING NOW",
                ].map((item, index) => (
                  <span key={`${item}-${index}`} className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {gigFeedStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="panel-muted rounded-3xl p-6">
          <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_220px_220px]">
            <label className="space-y-2">
              <span className="eyebrow">City</span>
              <select className="w-full rounded-2xl border border-white/10 bg-surface-high px-4 py-3">
                {cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="eyebrow">Genre</span>
              <div className="flex min-h-14 flex-wrap gap-2 rounded-2xl border border-white/10 bg-surface-high px-3 py-3">
                {genres.slice(0, 4).map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-secondary/30 bg-secondary/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </label>
            <label className="space-y-2">
              <span className="eyebrow">Date</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-high px-4 py-3" type="date" />
            </label>
            <label className="space-y-2">
              <span className="eyebrow">Pay Min</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-surface-high px-4 py-3 font-mono"
                defaultValue="$250"
              />
            </label>
            <label className="space-y-2">
              <span className="eyebrow">Sort</span>
              <select className="w-full rounded-2xl border border-white/10 bg-surface-high px-4 py-3">
                <option>Newest</option>
                <option>Highest Pay</option>
                <option>Soonest</option>
              </select>
            </label>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Open Gigs</p>
              <h2 className="section-heading mt-2">Latest opportunities</h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {gigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              viewerIsOwner={Boolean(viewerId && viewerId === gig.promoter_id)}
            />
          ))}
          </div>
        </section>
      </section>
    </div>
  );
}
