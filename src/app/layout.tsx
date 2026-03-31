import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { AuthProvider } from "@/lib/auth-context";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Spinbook",
  description: "Trust layer for nightlife bookings, contracts, and escrow payouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar />
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
