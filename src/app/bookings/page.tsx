import { BookingRow } from "@/components/booking-row";
import { ContractViewer } from "@/components/contract-viewer";
import { StatCard } from "@/components/stat-card";
import { bookingStats, bookings } from "@/lib/mock-data";

export default function BookingsPage() {
  return (
    <div className="space-y-10">
      <section>
        <p className="eyebrow">DJ View · Dashboard</p>
        <h1 className="section-heading mt-2">Track contracts, payouts, and reviews</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {bookingStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {["All", "Upcoming", "Pending", "Completed", "Disputed"].map((tab) => (
            <button
              key={tab}
              className={`rounded-full px-4 py-2 text-sm ${tab === "All" ? "bg-primary text-black" : "border border-white/10 bg-white/5 text-muted"}`}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </div>
      </section>

      <ContractViewer booking={bookings[0]} />
    </div>
  );
}
