import type { Gig } from "@/types/gig";
import { Button } from "@/components/ui/button";

interface ApplyModalProps {
  gig: Gig;
}

export function ApplyModal({ gig }: ApplyModalProps) {
  const openSlots = gig.slots.filter((slot) => slot.status === "open");

  return (
    <section className="panel p-6">
      <p className="eyebrow mb-2">Application</p>
      <h3 className="font-display text-2xl font-semibold">Submit for {gig.eventName}</h3>

      <form className="mt-6 space-y-4">
        <label className="block space-y-2">
          <span className="eyebrow">Choose slot</span>
          <select className="w-full rounded-xl border border-white/10 bg-surface-low px-4 py-3 text-sm">
            {openSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.name} · {slot.start} - {slot.end}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="eyebrow">Mix link</span>
          <input
            className="w-full rounded-xl border border-white/10 bg-surface-low px-4 py-3 text-sm"
            defaultValue="https://soundcloud.com/nova-vale/floor-language-12"
          />
        </label>

        <label className="block space-y-2">
          <span className="eyebrow">Note to promoter</span>
          <textarea
            className="min-h-28 w-full rounded-xl border border-white/10 bg-surface-low px-4 py-3 text-sm"
            defaultValue="Tight handoffs, deep crate, and very comfortable with high-turnover rooms."
          />
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-muted">
          <input className="mt-1" defaultChecked type="checkbox" />
          <span>I confirm I can meet the equipment and arrival requirements for this booking.</span>
        </label>

        <Button className="w-full" size="lg" type="submit">
          Submit Application
        </Button>
      </form>
    </section>
  );
}
