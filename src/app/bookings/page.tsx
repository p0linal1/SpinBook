"use client";

import { useEffect, useState } from "react";
import { BookingRow } from "@/components/booking-row";
import { ContractViewer } from "@/components/contract-viewer";
import { StatCard } from "@/components/stat-card";
import { useAuth } from "@/lib/auth-context";
import type { Booking } from "@/types/booking";

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    if (!user) return;
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((json) => {
        setBookings(json.data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const total = bookings.reduce((s, b) => s + b.pay, 0);
  const completed = bookings.filter((b) => b.status === "COMPLETED" || b.status === "PAID").length;

  const stats = [
    { label: "Total Earned", value: `$${total.toLocaleString()}`, detail: "Lifetime booked through Spinbook", tone: "primary" },
    { label: "Bookings", value: `${bookings.length}`, detail: "Total bookings", tone: "neutral" },
    { label: "Completed", value: `${completed}`, detail: "Paid out", tone: "tertiary" },
    { label: "Pending", value: `${bookings.filter((b) => b.status === "PENDING CONTRACT").length}`, detail: "Awaiting contract", tone: "secondary" },
  ] as const;

  const tabs = ["All", "Upcoming", "Pending", "Completed", "Disputed"];
  const filtered = bookings.filter((b) => {
    if (activeTab === "All") return true;
    if (activeTab === "Upcoming") return b.status === "CONFIRMED";
    if (activeTab === "Pending") return b.status === "PENDING CONTRACT";
    if (activeTab === "Completed") return b.status === "COMPLETED" || b.status === "PAID";
    if (activeTab === "Disputed") return b.status === "DISPUTED";
    return true;
  });

  return (
    <div className="space-y-10">
      <section>
        <p className="eyebrow">Dashboard</p>
        <h1 className="section-heading mt-2">Track contracts, payouts, and reviews</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`rounded-full px-4 py-2 text-sm ${tab === activeTab ? "bg-primary text-black" : "border border-white/10 bg-white/5 text-muted"}`}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted">Loading bookings…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted">No bookings found.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </section>

      {filtered.length > 0 && filtered[0].contractId && (
        <ContractViewer contractId={filtered[0].contractId} />
      )}
    </div>
  );
}
