"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { initials } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/landing/arrow-right";

const marketingLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function NavBar() {
  const { user, profile, loading, signOut } = useAuth();
  const canPostGig = profile?.role === "promoter" || profile?.role === "venue";

  const appLinks = user
    ? ([
        { href: "/gigs", label: "Gigs" },
        { href: "/bookings", label: "Bookings" },
        { href: "/messages", label: "Messages" },
        { href: "/profile", label: "Profile" },
        ...(canPostGig ? [{ href: "/post", label: "Post" }] as const : []),
      ] as const)
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-8 gap-y-3">
          <Link className="shrink-0 font-display text-xl font-bold tracking-[-0.04em] text-white" href="/">
            SpinBook
          </Link>
          <nav className="hidden flex-wrap items-center gap-x-6 gap-y-2 md:flex">
            {marketingLinks.map((item) => (
              <Link
                key={item.href}
                className="text-sm text-white/80 transition hover:text-white"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            {appLinks.map((item) => (
              <Link
                key={item.href}
                className="text-sm text-white/80 transition hover:text-white"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {loading ? null : user && profile ? (
            <>
              <button
                onClick={() => signOut()}
                className="rounded-full border border-white/15 bg-transparent px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted transition hover:border-white/25 hover:text-foreground"
                type="button"
              >
                Sign out
              </button>
              <Link
                href="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] font-display text-sm font-semibold text-white"
              >
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-surface-container-high font-display font-semibold text-secondary">
                    {initials(profile.display_name)}
                  </div>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full px-3 py-2 text-sm text-white/75 transition hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/95"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
