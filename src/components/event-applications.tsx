"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ApplicationItem {
  id: string;
  applicant_name: string;
  applicant_role: string;
  status: string;
  slot_id: string;
  mix_link: string | null;
  note: string | null;
}

interface EventApplicationsProps {
  applications: ApplicationItem[];
  /** Maps slot id → label for display */
  slotNames?: Record<string, string>;
}

export function EventApplications({ applications, slotNames = {} }: EventApplicationsProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);

  async function handleAction(appId: string, action: "accept" | "reject") {
    setProcessing(appId);
    const res = await fetch(`/api/applications/${appId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      router.refresh();
    }
    setProcessing(null);
  }

  const pending = applications.filter((a) => a.status === "pending");
  const decided = applications.filter((a) => a.status !== "pending");

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold">Applications</h2>
        <span className="text-sm text-muted">{applications.length} total</span>
      </div>

      {applications.length === 0 && (
        <p className="mt-6 text-muted">No applications yet.</p>
      )}

      <div className="mt-6 space-y-3">
        {pending.map((app) => (
          <div key={app.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/5 bg-surface-low p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 font-display text-lg text-secondary">
              {app.applicant_name.split(" ").map((p) => p[0]).join("")}
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="font-display text-lg font-medium">{app.applicant_name}</p>
              <p className="text-sm text-muted capitalize">{app.applicant_role}</p>
              {slotNames[app.slot_id] && (
                <p className="mt-1 text-xs text-muted">Slot: {slotNames[app.slot_id]}</p>
              )}
              {app.mix_link && (
                <a
                  href={app.mix_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-primary hover:underline"
                >
                  {app.mix_link}
                </a>
              )}
              {app.note && <p className="mt-2 text-sm text-muted">{app.note}</p>}
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-full bg-danger/15 px-3 py-2 text-sm text-danger disabled:opacity-50"
                onClick={() => handleAction(app.id, "reject")}
                disabled={processing === app.id}
              >
                Reject
              </button>
              <button
                className="rounded-full bg-primary px-3 py-2 text-sm text-black disabled:opacity-50"
                onClick={() => handleAction(app.id, "accept")}
                disabled={processing === app.id}
              >
                Accept
              </button>
            </div>
          </div>
        ))}

        {decided.map((app) => (
          <div key={app.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/5 bg-surface-low p-4 opacity-60">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 font-display text-lg text-secondary">
              {app.applicant_name.split(" ").map((p) => p[0]).join("")}
            </div>
            <div className="flex-1">
              <p className="font-display text-lg font-medium">{app.applicant_name}</p>
              <p className="text-sm text-muted capitalize">{app.applicant_role}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              app.status === "accepted" ? "bg-primary/15 text-primary" : "bg-white/10 text-muted"
            }`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
