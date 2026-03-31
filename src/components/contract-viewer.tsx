"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import type { Contract } from "@/types/contract";

interface ContractViewerProps {
  contractId: string;
}

export function ContractViewer({ contractId }: ContractViewerProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [contract, setContract] = useState<Contract | null>(null);
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    if (!contractId) return;
    fetch(`/api/contracts/${contractId}`)
      .then((res) => res.json())
      .then((json) => setContract(json.data ?? null))
      .catch(() => {});
  }, [contractId]);

  async function handleSign() {
    if (!contract) return;
    setSigning(true);
    const res = await fetch(`/api/contracts/${contract.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "sign" }),
    });

    if (res.ok) {
      router.refresh();
      // Refresh contract data
      const updated = await fetch(`/api/contracts/${contract.id}`).then((r) => r.json());
      setContract(updated.data ?? null);
    }
    setSigning(false);
  }

  if (!contract) {
    return null;
  }

  const isDj = user?.id === contract.dj_id;
  const isPromoter = user?.id === contract.promoter_id;
  const canSign = (isDj && !contract.dj_signed) || (isPromoter && !contract.promoter_signed);

  return (
    <section className="panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="eyebrow">Spinbook Performance Contract</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{contract.contract_number}</h3>
        </div>
        <div className="text-right">
          <p className="eyebrow">Compensation</p>
          <p className="font-mono text-2xl text-primary">{formatCurrency(contract.pay)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-black/20 p-5">
          <p className="eyebrow mb-3">Terms</p>
          <div className="space-y-3 font-mono text-sm leading-6 text-muted">
            <p>Event: {contract.event_name}</p>
            <p>Venue: {contract.venue_name}</p>
            <p>Date: {formatDate(contract.date)}</p>
            <p>Slot: {contract.slot_name}</p>
            <p>Payment terms: {contract.payment_terms}</p>
            <p>Status: <span className="capitalize text-primary">{contract.status}</span></p>
          </div>
        </div>

        <div className="rounded-2xl bg-black/20 p-5">
          <p className="eyebrow mb-3">Signature Status</p>
          <div className="space-y-4">
            <div className={`rounded-xl border p-4 ${contract.promoter_signed ? "border-primary/20 bg-primary/5" : "border-white/10"}`}>
              <p className="text-sm font-medium">Promoter</p>
              <p className="mt-2 text-sm text-muted">
                {contract.promoter_signed ? "Signed" : "Awaiting signature"}
              </p>
            </div>
            <div className={`rounded-xl border p-4 ${contract.dj_signed ? "border-primary/20 bg-primary/5" : "border-white/10"}`}>
              <p className="text-sm font-medium">DJ / Media</p>
              <p className="mt-2 text-sm text-muted">
                {contract.dj_signed ? "Signed" : "Awaiting signature"}
              </p>
            </div>

            {canSign && (
              <Button className="w-full" onClick={handleSign} disabled={signing}>
                {signing ? "Signing…" : "Sign Contract"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
