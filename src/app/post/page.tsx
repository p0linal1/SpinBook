"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { genres } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

interface SlotInput {
  name: string;
  start: string;
  end: string;
  pay: string;
}

export default function PostGigPage() {
  const router = useRouter();
  const { profile } = useAuth();
  const [eventName, setEventName] = useState("");
  const [venueName, setVenueName] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [equipment, setEquipment] = useState("");
  const [promoExpectation, setPromoExpectation] = useState("");
  const [slots, setSlots] = useState<SlotInput[]>([
    { name: "Opener", start: "9:00 PM", end: "10:00 PM", pay: "250" },
    { name: "Main Room", start: "10:00 PM", end: "12:00 AM", pay: "700" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  function updateSlot(index: number, field: keyof SlotInput, value: string) {
    setSlots((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addSlot() {
    setSlots((prev) => [...prev, { name: "", start: "", end: "", pay: "" }]);
  }

  function removeSlot(index: number) {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/gigs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        venueName,
        city,
        date: new Date(date).toISOString(),
        address,
        genres: selectedGenres,
        tags: [],
        description,
        equipment,
        promoExpectation,
        slots: slots.map((s) => ({
          name: s.name,
          start: s.start,
          end: s.end,
          pay: Number(s.pay.replace(/[^0-9.]/g, "")) || 0,
        })),
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      setError(json.error ?? "Failed to post gig");
      setLoading(false);
      return;
    }

    router.push(`/event/${json.data.id}`);
  }

  const isHost = profile?.role === "promoter" || profile?.role === "venue";
  if (!isHost) {
    return (
      <div className="panel p-8 text-center">
        <p className="text-muted">Only promoters and venues can post gigs.</p>
        <p className="mt-3 text-sm text-muted">
          Sign up as a venue or promoter, or switch your role in your profile settings if your account supports it.
        </p>
      </div>
    );
  }

  const hostLabel = profile?.role === "venue" ? "Venue" : "Promoter";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="panel p-8">
        <p className="eyebrow">{hostLabel}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Post a new gig</h1>

        {error && (
          <p className="mt-4 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="eyebrow">Event name</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
            </label>
            <label className="block space-y-2">
              <span className="eyebrow">Venue</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" value={venueName} onChange={(e) => setVenueName(e.target.value)} required />
            </label>
            <label className="block space-y-2">
              <span className="eyebrow">City</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" value={city} onChange={(e) => setCity(e.target.value)} required />
            </label>
            <label className="block space-y-2">
              <span className="eyebrow">Date</span>
              <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="eyebrow">Address</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>

          <div className="space-y-3">
            <span className="eyebrow">Genres</span>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                    selectedGenres.includes(genre)
                      ? "border-secondary bg-secondary/25 text-secondary"
                      : "border-secondary/25 bg-secondary/10 text-secondary/60"
                  }`}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Slots</span>
              <button className="text-sm text-primary" type="button" onClick={addSlot}>
                + Add another slot
              </button>
            </div>

            {slots.map((slot, index) => (
              <div key={index} className="grid gap-4 rounded-2xl border border-white/10 bg-surface-low p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3" placeholder="Slot name" value={slot.name} onChange={(e) => updateSlot(index, "name", e.target.value)} />
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3" placeholder="Start time" value={slot.start} onChange={(e) => updateSlot(index, "start", e.target.value)} />
                <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-mono" placeholder="Pay" value={slot.pay} onChange={(e) => updateSlot(index, "pay", e.target.value)} />
                {slots.length > 1 && (
                  <button className="text-sm text-danger" type="button" onClick={() => removeSlot(index)}>Remove</button>
                )}
              </div>
            ))}
          </div>

          <label className="block space-y-2">
            <span className="eyebrow">Description</span>
            <textarea className="min-h-28 w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <label className="block space-y-2">
            <span className="eyebrow">Equipment provided</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" value={equipment} onChange={(e) => setEquipment(e.target.value)} />
          </label>

          <label className="block space-y-2">
            <span className="eyebrow">Promo expectations</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" value={promoExpectation} onChange={(e) => setPromoExpectation(e.target.value)} />
          </label>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" type="submit" disabled={loading}>
              {loading ? "Posting…" : "Post Gig"}
            </Button>
          </div>
        </form>
      </section>

      <aside className="panel p-8">
        <p className="eyebrow">Preview</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">How DJs will see it</h2>
        <div className="mt-6 rounded-3xl border border-primary/20 bg-black/25 p-6">
          <div className="h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary" />
          <h3 className="mt-5 font-display text-2xl font-semibold">{eventName || "Event Name"}</h3>
          <p className="mt-2 text-sm text-muted">{venueName || "Venue"} · {city || "City"}</p>
          <div className="mt-5 space-y-3">
            {slots.filter((s) => s.name).map((slot, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium">{slot.name}</p>
                <p className="mt-2 font-mono text-primary">${slot.pay || "0"}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
