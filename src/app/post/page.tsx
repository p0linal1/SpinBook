import { genres } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function PostGigPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="panel p-8">
        <p className="eyebrow">Promoter View</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Post a new gig</h1>

        <form className="mt-8 space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="eyebrow">Event name</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue="No Signal Fridays" />
            </label>
            <label className="block space-y-2">
              <span className="eyebrow">Venue</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue="Club Meridian" />
            </label>
            <label className="block space-y-2">
              <span className="eyebrow">City</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue="Los Angeles, CA" />
            </label>
            <label className="block space-y-2">
              <span className="eyebrow">Date</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" type="date" />
            </label>
          </div>

          <div className="space-y-3">
            <span className="eyebrow">Genres</span>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className="rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary"
                  type="button"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow">DJ Slots</span>
              <button className="text-sm text-primary" type="button">
                + Add another slot
              </button>
            </div>

            {[
              { name: "Opener", time: "9:00 PM - 10:00 PM", pay: "$250" },
              { name: "Main Room", time: "10:00 PM - 12:00 AM", pay: "$700" },
            ].map((slot) => (
              <div key={slot.name} className="grid gap-4 rounded-2xl border border-white/10 bg-surface-low p-4 md:grid-cols-3">
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3" defaultValue={slot.name} />
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3" defaultValue={slot.time} />
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-mono" defaultValue={slot.pay} />
              </div>
            ))}
          </div>

          <label className="block space-y-2">
            <span className="eyebrow">Additional notes</span>
            <textarea
              className="min-h-32 w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              defaultValue="Dress code is elevated nightlife. Load-in is through the rear alley after 8:30 PM."
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <Button size="lg">Post Gig</Button>
            <Button size="lg" variant="secondary" type="button">
              Save Draft
            </Button>
          </div>
        </form>
      </section>

      <aside className="panel p-8">
        <p className="eyebrow">Preview</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">How DJs will see it</h2>
        <div className="mt-6 rounded-3xl border border-primary/20 bg-black/25 p-6">
          <div className="h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary" />
          <h3 className="mt-5 font-display text-2xl font-semibold">No Signal Fridays</h3>
          <p className="mt-2 text-sm text-muted">Club Meridian · Los Angeles, CA</p>
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium">Main Room</p>
              <p className="mt-2 font-mono text-primary">$700</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium">Opener</p>
              <p className="mt-2 font-mono text-primary">$250</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
