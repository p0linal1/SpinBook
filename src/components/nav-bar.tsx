"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { initials } from "@/lib/utils";

export function NavBar() {
  const { user, profile, loading, signOut } = useAuth();
  const isPromoter = profile?.role === "promoter";

  const navItems = [
    { href: "/gigs", label: "Gigs" },
    ...(user ? [
      { href: "/bookings", label: "Bookings" },
      { href: "/messages", label: "Messages" },
      { href: "/profile", label: "Profile" },
      ...(isPromoter ? [{ href: "/post", label: "Post" }] : []),
    ] : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-8">
          <Link className="font-mono text-xl font-bold tracking-[-0.08em] text-primary" href="/">
            SPINBOOK
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="text-sm text-muted transition hover:text-foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {loading ? null : user && profile ? (
            <>
              <button
                onClick={() => signOut()}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-muted hover:text-foreground transition"
                type="button"
              >
                Sign out
              </button>
              <Link
                href="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-secondary/20 font-display font-semibold text-secondary"
              >
                {initials(profile.display_name)}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted hover:text-foreground transition"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
