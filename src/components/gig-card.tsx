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
  OPEN: "bg-primary text-on-primary",
  FILLED: "bg-white/10 text-on-surface-variant",
  URGENT: "bg-error text-on-error",
};

export function GigCard({ gig }: GigCardProps) {
  return (
    <article className="bg-surface-container group rounded-xl overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col">
      <div className="h-48 relative overflow-hidden">
        <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-tighter">
          {gig.status}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex flex-wrap gap-1">
            {gig.genres.slice(0, 2).map((genre) => (
              <span key={genre} className="bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">
              {gig.eventName.toUpperCase()}
            </h3>
            <p className="text-on-surface-variant text-sm flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {gig.venueName}, {gig.city}
            </p>
          </div>
          <div className="text-right">
            <p className="mono-data text-xs text-on-surface-variant">{new Date(gig.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</p>
            <p className="mono-data text-lg font-bold text-primary">{new Date(gig.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {gig.slots.map((slot) => (
            <div key={slot.id} className="flex justify-between items-center py-2 border-b border-outline-variant/5">
              <span className="text-xs text-on-surface-variant uppercase tracking-widest">{slot.name}</span>
              <span className="mono-data text-primary-container font-bold">${slot.pay.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/10">
          <span className="text-[10px] text-on-surface-variant mono-data uppercase">
            {gig.applicantCount} Applicants
          </span>
          <Link 
            href={`/gigs/${gig.id}`}
            className="kinetic-gradient text-on-primary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:shadow-[0_0_20px_rgba(0,255,135,0.3)] transition-all"
          >
            Apply
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
