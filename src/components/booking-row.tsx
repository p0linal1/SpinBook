import { formatCurrency, formatDate } from "@/lib/utils";
import type { Booking } from "@/types/booking";

interface BookingRowProps {
  booking: Booking;
}

const statusClasses: Record<Booking["status"], string> = {
  CONFIRMED: "bg-primary/15 text-primary",
  "PENDING CONTRACT": "bg-tertiary/15 text-tertiary",
  PAID: "bg-sky-500/15 text-sky-300",
  COMPLETED: "bg-white/10 text-muted",
  DISPUTED: "bg-danger/15 text-danger",
};

const actionLabel: Record<Booking["status"], string> = {
  CONFIRMED: "View Details",
  "PENDING CONTRACT": "Sign Contract",
  PAID: "View Receipt",
  COMPLETED: "Leave Review",
  DISPUTED: "Flag Issue",
};

export function BookingRow({ booking }: BookingRowProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-white/5 bg-surface-low px-5 py-4 md:grid-cols-[2fr_1fr_1fr_auto_auto] md:items-center">
      <div>
        <p className="font-display text-lg font-medium">{booking.eventName}</p>
        <p className="text-sm text-muted">
          {booking.venueName} · {booking.slotType}
        </p>
      </div>
      <p className="font-mono text-sm text-muted">{formatDate(booking.date)}</p>
      <p className="font-mono text-sm text-primary">{formatCurrency(booking.pay)}</p>
      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[booking.status]}`}>
        {booking.status}
      </span>
      <button className="rounded-xl border border-white/10 bg-surface-high px-4 py-2 text-sm text-foreground transition hover:bg-surface-ink">
        {actionLabel[booking.status]}
      </button>
    </div>
  );
}
