import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/nav-bar";
import { AuthProvider } from "@/lib/auth-context";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-spin-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SpinBook",
  description: "From first offer to final payout — contracts, payments, and gig management for DJs and venues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <AuthProvider>
          <NavBar />
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
