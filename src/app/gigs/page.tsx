import { GigCard } from "@/components/gig-card";
import { cities, genres } from "@/lib/constants";
import { featuredGigs } from "@/lib/mock-data";

export default function GigsPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="panel h-fit p-6">
        <p className="eyebrow">Browse</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">Find the right room</h1>

        <div className="mt-6 space-y-5">
          <label className="block space-y-2">
            <span className="eyebrow">City</span>
            <select className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3">
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
              <input className="rounded-2xl border border-white/10 bg-surface-low px-4 py-3 font-mono" defaultValue="$200" />
              <input className="rounded-2xl border border-white/10 bg-surface-low px-4 py-3 font-mono" defaultValue="$1000+" />
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
            {featuredGigs.length} results
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {featuredGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </section>
    </div>
  );
}
