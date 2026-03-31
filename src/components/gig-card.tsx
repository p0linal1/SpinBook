import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonClasses } from "@/components/ui/button";
import { GenreTag } from "@/components/genre-tag";
import { GigSlot } from "@/components/gig-slot";
import { formatDate } from "@/lib/utils";
import type { Gig } from "@/types/gig";

interface GigCardProps {
  gig: Gig;
}

const statusClasses = {
  OPEN: "bg-primary/20 text-primary",
  FILLED: "bg-white/10 text-muted",
  URGENT: "bg-danger/15 text-danger",
};

export function GigCard({ gig }: GigCardProps) {
  return (
    <article className="panel group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:border-primary/40">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-tertiary opacity-70" />
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${statusClasses[gig.status]}`}>
              {gig.status}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em]">
              {gig.eventName}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {gig.venueName} · {gig.city}
            </p>
          </div>
          <div className="text-right">
            <p className="eyebrow">Date</p>
            <p className="font-mono text-sm text-primary">{formatDate(gig.date)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {gig.genres.map((genre) => (
            <GenreTag key={genre} label={genre} />
          ))}
          {gig.tags.map((tag) => (
            <GenreTag key={tag} label={tag} tone="neutral" />
          ))}
        </div>

        <div className="space-y-3">
          {gig.slots.map((slot) => (
            <GigSlot key={slot.id} slot={slot} />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {gig.applicantCount} applied · {gig.remainingSlots} slot remaining
          </p>
          <Link className={buttonClasses("primary", "md", "min-w-28")} href={`/gigs/${gig.id}`}>
            Apply
          </Link>
        </div>
      </div>
    </article>
  );
}
