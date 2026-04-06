import Link from "next/link";
import { ArrowRightIcon } from "@/components/landing/arrow-right";

interface GigHostPanelProps {
  gigId: string;
  eventName: string;
  totalApplications: number;
  pendingApplications: number;
}

/** Shown on /gigs/[id] when the signed-in user posted this gig. */
export function GigHostPanel({ gigId, eventName, totalApplications, pendingApplications }: GigHostPanelProps) {
  const pendingLabel = pendingApplications === 1 ? "1 pending" : `${pendingApplications} pending`;

  return (
    <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
      <p className="eyebrow text-primary">Your gig</p>
      <h2 className="mt-2 font-display text-xl font-semibold text-white">Manage applications</h2>
      <p className="mt-2 text-sm text-muted">
        {totalApplications === 0
          ? `No applications yet for ${eventName}. Share the gig link with DJs.`
          : `${totalApplications} application${totalApplications === 1 ? "" : "s"} · ${pendingLabel}`}
      </p>
      <Link
        href={`/event/${gigId}`}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/95"
      >
        Review applications &amp; lineup
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </section>
  );
}
