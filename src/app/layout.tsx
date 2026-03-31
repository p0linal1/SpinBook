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
    <html lang="en" className="dark">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <NavBar />
          <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
