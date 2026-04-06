import Link from "next/link";

/** Static marketing mockup matching the Framer landing design. */
export function BookingPreviewCard() {
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#161616] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">SpinBook</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Confirmed
        </span>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-lg font-semibold text-white">
          MR
        </div>
        <div>
          <p className="font-display text-lg font-semibold tracking-[-0.02em]">Marcus Rivera</p>
          <p className="mt-0.5 text-sm text-muted">House / Techno · Chicago, IL</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">Venue</dt>
          <dd className="mt-1 font-medium text-white">Spybar Chicago</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">Date</dt>
          <dd className="mt-1 font-medium text-white">Apr 19, 2024</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">Set length</dt>
          <dd className="mt-1 font-medium text-white">3 hours</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">Pay</dt>
          <dd className="mt-1 font-display text-lg font-semibold text-primary">$800</dd>
        </div>
      </dl>

      <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-5">
        {[
          { label: "DJ signed", state: "Signed" },
          { label: "Venue signed", state: "Signed" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <span className="text-sm text-white/90">{row.label}</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {row.state}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-4">
        <Link
          className="inline-flex items-center gap-1 text-sm font-medium text-tertiary transition hover:text-tertiary/90"
          href="/auth/signup"
        >
          Booking contract · View PDF
          <span aria-hidden className="text-tertiary">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
