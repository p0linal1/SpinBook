import { StatCard } from "@/components/stat-card";
import { walletActivity } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function WalletPage() {
  return (
    <div className="space-y-10">
      <section>
        <p className="eyebrow">Wallet</p>
        <h1 className="section-heading mt-2">Payments, escrow, and payout history</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard detail="Available to withdraw" label="Available balance" tone="primary" value="$1,540" />
        <StatCard detail="Awaiting completion" label="Escrow held" tone="secondary" value="$650" />
        <StatCard detail="Past 30 days" label="Released" tone="tertiary" value="$2,150" />
        <StatCard detail="This month" label="Platform fees" tone="neutral" value="$84" />
      </section>

      <section className="panel p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">History</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Recent transactions</h2>
          </div>
          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted">
            Export CSV
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {walletActivity.map((entry) => (
            <div key={entry.id} className="grid gap-4 rounded-2xl border border-white/5 bg-surface-low px-5 py-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center">
              <div>
                <p className="font-display text-lg font-medium">{entry.label}</p>
                <p className="text-sm text-muted">{entry.eventName}</p>
              </div>
              <p className="font-mono text-sm text-muted">{formatDate(entry.date)}</p>
              <p className="font-mono text-sm text-primary">{formatCurrency(entry.amount)}</p>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
