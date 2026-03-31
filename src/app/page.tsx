import { DjProfileCard } from "@/components/dj-profile-card";
import { GigCard } from "@/components/gig-card";
import { StatCard } from "@/components/stat-card";
import { cities, genres } from "@/lib/constants";
import { currentUser, featuredGigs, gigFeedStats } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="panel overflow-hidden bg-hero-grid p-8">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="eyebrow">DJ View · Gigs Feed</p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-[-0.05em] text-foreground md:text-6xl">
              Get Booked. Get Paid. Build Your Name.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Open gigs, dependable promoters, auto-generated contracts, and escrow-backed payouts
              in one nightlife-native workflow.
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

          <DjProfileCard user={currentUser} />
        </div>
      </section>

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
            <h2 className="section-heading mt-2">Tonight’s strongest fits for your profile</h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {featuredGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </section>
    </div>
  );
}
