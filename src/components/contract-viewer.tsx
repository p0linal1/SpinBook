import { formatCurrency, formatDate } from "@/lib/utils";
import type { Booking } from "@/types/booking";

interface ContractViewerProps {
  booking: Booking;
}

export function ContractViewer({ booking }: ContractViewerProps) {
  return (
    <section className="panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="eyebrow">Spinbook Performance Contract</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{booking.contractId}</h3>
        </div>
        <div className="text-right">
          <p className="eyebrow">Compensation</p>
          <p className="font-mono text-2xl text-primary">{formatCurrency(booking.pay)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-black/20 p-5">
          <p className="eyebrow mb-3">Terms</p>
          <div className="space-y-3 font-mono text-sm leading-6 text-muted">
            <p>Event: {booking.eventName}</p>
            <p>Venue: {booking.venueName}</p>
            <p>Date: {formatDate(booking.date)}</p>
            <p>Slot: {booking.slotType}</p>
            <p>Payment terms: Funds held in escrow and released within 24 hours of completion.</p>
          </div>
        </div>

        <div className="rounded-2xl bg-black/20 p-5">
          <p className="eyebrow mb-3">Signature Status</p>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-sm font-medium">Promoter</p>
              <p className="mt-2 text-sm text-muted">Signed by {booking.promoterName}</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm font-medium">DJ</p>
              <p className="mt-2 text-sm text-muted">Awaiting signature</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
