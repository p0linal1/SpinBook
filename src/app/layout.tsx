import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
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
        <NavBar />
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </body>
    </html>
  );
}
