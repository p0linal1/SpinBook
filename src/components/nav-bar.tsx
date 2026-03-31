"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { initials } from "@/lib/utils";

export function NavBar() {
  const { user, profile, loading, signOut } = useAuth();
  const pathname = usePathname();
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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-8">
          <Link className="font-mono text-xl font-bold tracking-tighter text-primary" href="/">
            SPINBOOK
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  className={`font-display text-sm tracking-tight transition duration-200 ${
                    isActive 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {loading ? null : user && profile ? (
            <>
              <span className="hidden sm:block text-xs font-mono text-on-surface-variant uppercase tracking-widest bg-secondary-container/20 px-3 py-1 rounded-full">
                {profile.role === "dj" ? "DJ/Promoter" : profile.role}
              </span>
              <div className="relative scale-95 active:opacity-80 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-on-surface">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              </div>
              <Link
                href="/profile"
                className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden"
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
                className="rounded-lg border border-outline-variant bg-surface-container-highest px-4 py-2 text-sm text-on-surface hover:bg-surface-bright transition"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg kinetic-gradient px-4 py-2 text-sm font-semibold hover:shadow-neon-glow transition-all"
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
