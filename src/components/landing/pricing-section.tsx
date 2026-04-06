"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

function CheckRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-white/90">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5">
        <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

function CtaPill({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "muted" | "orange";
}) {
  const base =
    "group inline-flex w-full items-center justify-between gap-3 rounded-full px-5 py-3.5 text-sm font-semibold transition";
  const styles =
    variant === "orange"
      ? "bg-gradient-to-r from-[#ff6b1a] to-[#e85d04] text-white shadow-[0_0_32px_rgba(234,88,12,0.45)] hover:brightness-105"
      : "bg-[#2a2a2a] text-white hover:bg-[#333]";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      <span className="pl-1">{label}</span>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          variant === "orange" ? "bg-black text-white" : "bg-black text-white"
        }`}
      >
        <svg className="h-3.5 w-3.5 -translate-x-px" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export function PricingSection() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");

  const core =
    cycle === "monthly"
      ? { price: "$49", sub: "Billed monthly" }
      : { price: "$39", sub: "Per month, billed annually ($470/yr)" };
  const allAccess =
    cycle === "monthly"
      ? { price: "$99", sub: "Billed monthly" }
      : { price: "$79", sub: "Per month, billed annually ($950/yr)" };

  return (
    <section
      id="pricing"
      className="landing-dot-grid scroll-mt-28 relative border-t border-white/[0.06] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-5xl px-0 text-center">
        <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">Pricing Options</h2>
        <p className="mt-3 text-lg text-white/55">Choose the subscription plan that suits your needs</p>

        <div
          className="mx-auto mt-10 inline-flex rounded-full border border-white/[0.08] bg-[#141414] p-1"
          role="tablist"
          aria-label="Billing cycle"
        >
          <button
            type="button"
            role="tab"
            aria-selected={cycle === "monthly"}
            className={`rounded-full px-8 py-2.5 text-sm font-semibold transition ${
              cycle === "monthly" ? "bg-white text-black" : "text-white/55 hover:text-white/80"
            }`}
            onClick={() => setCycle("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={cycle === "yearly"}
            className={`rounded-full px-8 py-2.5 text-sm font-semibold transition ${
              cycle === "yearly" ? "bg-white text-black" : "text-white/55 hover:text-white/80"
            }`}
            onClick={() => setCycle("yearly")}
          >
            Yearly
          </button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Core */}
          <div className="flex flex-col rounded-3xl border border-white/[0.1] bg-[#161616] p-8 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <h3 className="font-display text-xl font-semibold text-white">Core Plan</h3>
            <p className="mt-6 font-display text-5xl font-bold tracking-[-0.04em] text-white">{core.price}</p>
            <p className="mt-2 text-sm text-white/45">{core.sub}</p>
            <ul className="mt-8 flex flex-col gap-4">
              <CheckRow>Post up to 3 gigs per month</CheckRow>
              <CheckRow>Browse DJ profiles</CheckRow>
              <CheckRow>Send booking offers</CheckRow>
              <CheckRow>Auto-generated contracts &amp; e-signature</CheckRow>
            </ul>
            <div className="mt-auto pt-10">
              <CtaPill href="/auth/signup" label="Get Started" variant="muted" />
            </div>
          </div>

          {/* All Access */}
          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-[#ff6b1a]/50 bg-gradient-to-br from-[#3d1808] via-[#1a0a06] to-[#0d0504] p-8 text-left shadow-[0_0_60px_rgba(234,88,12,0.25)]">
            <span className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#c2410c]">
              Best value
            </span>
            <h3 className="font-display text-xl font-semibold text-white">All Access Plan</h3>
            <p className="mt-6 font-display text-5xl font-bold tracking-[-0.04em] text-white">{allAccess.price}</p>
            <p className="mt-2 text-sm text-white/50">{allAccess.sub}</p>
            <ul className="mt-8 flex flex-col gap-4">
              <CheckRow>Unlimited gig postings</CheckRow>
              <CheckRow>Priority placement in DJ searches</CheckRow>
              <CheckRow>Advanced talent filtering</CheckRow>
              <CheckRow>Contracts, e-signature &amp; rider management</CheckRow>
              <CheckRow>Stripe payouts &amp; invoicing dashboard</CheckRow>
            </ul>
            <div className="mt-auto pt-10">
              <CtaPill href="/auth/signup" label="Upgrade Now" variant="orange" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
