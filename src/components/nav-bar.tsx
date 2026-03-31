import Link from "next/link";
import { RoleSwitcher } from "@/components/role-switcher";

const navItems = [
  { href: "/", label: "Gigs" },
  { href: "/bookings", label: "Bookings" },
  { href: "/messages", label: "Messages" },
  { href: "/profile", label: "Profile" },
];

export function NavBar() {
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
          <RoleSwitcher />
          <div className="hidden h-10 min-w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-foreground md:flex">
            3
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-secondary/20 font-display font-semibold text-secondary">
            NV
          </div>
        </div>
      </div>
    </header>
  );
}
