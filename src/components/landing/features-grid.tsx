import type { ReactNode } from "react";

type FeatureItem = {
  title: string;
  body: string;
  icon: ReactNode;
  iconTone: "orange" | "grey";
  cardTone: "warm" | "neutral";
};

function IconWrap({
  tone,
  children,
}: {
  tone: "orange" | "grey";
  children: ReactNode;
}) {
  return (
    <div
      className={`mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
        tone === "orange"
          ? "bg-[#D44000] shadow-[0_0_20px_rgba(212,64,0,0.35)]"
          : "bg-[#444444]"
      }`}
    >
      {children}
    </div>
  );
}

const features: FeatureItem[] = [
  {
    title: "Your profile is your booking page",
    body: "Build once, share anywhere. Genres, rate, availability, and your mix — all in one link.",
    iconTone: "orange",
    cardTone: "warm",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 19V5M4 19h16M8 15l3-3 3 2 4-5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Contracts handled automatically",
    body: "Every confirmed gig generates a signed contract. No lawyers, no PDFs emailed back and forth.",
    iconTone: "orange",
    cardTone: "warm",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Get paid without the chase",
    body: "Deposit lands at signing. The rest releases after the gig. No invoices, no Venmo requests.",
    iconTone: "orange",
    cardTone: "warm",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 19h16V5H4v14Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M8 15V9h2M12 15V9h2M16 15v-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Find the right talent fast",
    body: "Browse DJs by genre, city, availability, and rate. Send a booking offer in one click.",
    iconTone: "grey",
    cardTone: "neutral",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="5" cy="5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="5" r="1.5" fill="currentColor" />
        <circle cx="19" cy="5" r="1.5" fill="currentColor" />
        <circle cx="5" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Let gigs come to you",
    body: "Drop your date and budget. Qualified DJs come to you — no cold DMs, no spreadsheets.",
    iconTone: "grey",
    cardTone: "neutral",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 4h10v16H7V4Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M9 8h6M9 12h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Bookings you can trust",
    body: "Cancellation policies enforced automatically. Deposits held securely. Disputes handled on-platform.",
    iconTone: "grey",
    cardTone: "neutral",
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="m12 4 8 4v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V8l8-4Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function FeaturesGrid() {
  return (
    <section
      id="features"
      className="landing-dot-grid scroll-mt-28 border-t border-white/[0.06] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
          Everything you need to close the deal.
        </h2>
        <p className="mt-3 text-lg text-white/70">For both sides of the booking.</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {features.map((f) => (
          <article
            key={f.title}
            className={`rounded-2xl border border-white/[0.08] p-6 text-left transition hover:border-white/[0.12] md:p-7 ${
              f.cardTone === "warm"
                ? "bg-gradient-to-b from-[#1f1410]/90 to-[#0d0d0d]"
                : "bg-gradient-to-b from-[#161616] to-[#0a0a0a]"
            }`}
          >
            <IconWrap tone={f.iconTone}>{f.icon}</IconWrap>
            <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-white">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#d1d1d1]">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
