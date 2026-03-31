"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Gig } from "@/types/gig";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

interface ApplyModalProps {
  gig: Gig;
}

export function ApplyModal({ gig }: ApplyModalProps) {
  const { user, profile } = useAuth();
  const router = useRouter();
  const openSlots = gig.slots.filter((slot) => slot.status === "open");
  const [slotId, setSlotId] = useState(openSlots[0]?.id ?? "");
  const [mixLink, setMixLink] = useState("");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isMedia = profile?.role === "media";
  const canApply = profile?.role === "dj" || profile?.role === "media";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setError("");
    setLoading(true);

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gig_id: gig.id,
        slot_id: slotId,
        mix_link: mixLink || undefined,
        note: note || undefined,
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      setError(json.error ?? "Failed to submit application");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (openSlots.length === 0) {
    return (
      <section className="panel p-6">
        <p className="eyebrow mb-2">Application</p>
        <p className="text-muted">All slots are filled for this gig.</p>
      </section>
    );
  }

  if (success) {
    return (
      <section className="panel p-6">
        <p className="eyebrow mb-2">Application</p>
        <h3 className="font-display text-2xl font-semibold">Application submitted!</h3>
        <p className="mt-3 text-muted">The promoter will review your application.</p>
      </section>
    );
  }

  return (
    <section className="panel p-6">
      <p className="eyebrow mb-2">Application</p>
      <h3 className="font-display text-2xl font-semibold">Submit for {gig.eventName}</h3>

      {error && (
        <p className="mt-3 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
      )}

      {!user && (
        <p className="mt-3 text-sm text-muted">
          <a href="/auth/login" className="text-primary">Log in</a> or{" "}
          <a href="/auth/signup" className="text-primary">sign up</a> to apply.
        </p>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="eyebrow">Choose slot</span>
          <select
            className="w-full rounded-xl border border-white/10 bg-surface-low px-4 py-3 text-sm"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
          >
            {openSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.name} · {slot.start} - {slot.end}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="eyebrow">{isMedia ? "Portfolio link" : "Mix link"}</span>
          <input
            className="w-full rounded-xl border border-white/10 bg-surface-low px-4 py-3 text-sm"
            value={mixLink}
            onChange={(e) => setMixLink(e.target.value)}
            placeholder={isMedia ? "https://your-portfolio.com" : "https://soundcloud.com/your-mix"}
          />
        </label>

        <label className="block space-y-2">
          <span className="eyebrow">Note to promoter</span>
          <textarea
            className="min-h-28 w-full rounded-xl border border-white/10 bg-surface-low px-4 py-3 text-sm"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-muted">
          <input className="mt-1" type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
          <span>I confirm I can meet the equipment and arrival requirements for this booking.</span>
        </label>

        <Button className="w-full" size="lg" type="submit" disabled={loading || !confirmed || !canApply}>
          {loading ? "Submitting…" : "Submit Application"}
        </Button>
      </form>
    </section>
  );
}
