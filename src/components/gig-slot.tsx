import type { GigSlot as GigSlotType } from "@/types/gig";
import { formatCurrency } from "@/lib/utils";

interface GigSlotProps {
  slot: GigSlotType;
}

export function GigSlot({ slot }: GigSlotProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/15 px-4 py-3">
      <div>
        <p className="font-display text-sm font-medium text-foreground">{slot.name}</p>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {slot.start} - {slot.end}
        </p>
      </div>
      <div className="text-right">
        {slot.status === "filled" ? (
          <>
            <p className="text-sm font-medium text-foreground">{slot.djName}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Filled</p>
          </>
        ) : (
          <>
            <p className="font-mono text-sm font-semibold text-primary">
              {formatCurrency(slot.pay)}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-primary/80">Open</p>
          </>
        )}
      </div>
    </div>
  );
}
