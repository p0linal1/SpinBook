import { Button } from "@/components/ui/button";
import { featuredGigs } from "@/lib/mock-data";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const gig = featuredGigs.find((item) => item.id === id) ?? featuredGigs[0];

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
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Local time 9:42 PM</span>
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface-low p-4">
              <p className="eyebrow">Total clicks</p>
              <p className="mt-2 font-mono text-3xl text-foreground">2,842</p>
            </div>
            <div className="rounded-2xl bg-surface-low p-4">
              <p className="eyebrow">RSVPs</p>
              <p className="mt-2 font-mono text-3xl text-primary">156</p>
            </div>
          </div>
        </div>

        <div className="panel p-6 xl:col-span-7">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold">Applications</h2>
            <button className="text-sm text-primary">View all 42</button>
          </div>

          <div className="mt-6 space-y-3">
            {[
              { name: "Luna Tek", genres: "Hard Techno · Industrial", rating: "4.9" },
              { name: "Mina Flux", genres: "House · Disco", rating: "4.8" },
              { name: "Core Memory", genres: "Open Format · R&B", rating: "4.7" },
            ].map((applicant) => (
              <div key={applicant.name} className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/5 bg-surface-low p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 font-display text-lg text-secondary">
                  {applicant.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="font-display text-lg font-medium">{applicant.name}</p>
                  <p className="text-sm text-muted">{applicant.genres}</p>
                </div>
                <span className="rounded-full bg-tertiary/15 px-3 py-1 text-sm text-tertiary">
                  ★ {applicant.rating}
                </span>
                <div className="flex gap-2">
                  <button className="rounded-full bg-danger/15 px-3 py-2 text-sm text-danger">Reject</button>
                  <button className="rounded-full bg-primary px-3 py-2 text-sm text-black">Accept</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6 xl:col-span-5">
          <h2 className="font-display text-2xl font-semibold">Run of show</h2>
          <div className="mt-6 space-y-3">
            {[
              "Doors open at 9:00 PM · Door staff Marcus",
              "Opener starts at 10:00 PM · Mina Flux",
              "Main room handoff at 11:00 PM · Nova Vale",
              "Photographer arrives at 11:30 PM",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/5 bg-surface-low px-4 py-4 text-sm text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
