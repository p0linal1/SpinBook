"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const { profile, refreshProfile } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [equipment, setEquipment] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name);
      setCity(profile.city);
      setBio(profile.bio);
      setEquipment(profile.equipment.join("\n"));
    }
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase || !profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        city,
        bio,
        equipment: equipment.split("\n").filter(Boolean),
      })
      .eq("id", profile.id);

    if (error) {
      setMessage("Error saving: " + error.message);
    } else {
      setMessage("Profile saved!");
      await refreshProfile();
    }
    setSaving(false);
  }

  if (!profile) {
    return <p className="text-muted">Loading profile…</p>;
  }

  const isMedia = profile.role === "media";

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="panel p-8">
        <p className="eyebrow">Profile</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Edit your booking profile</h1>

        {message && (
          <p className={`mt-4 rounded-xl px-4 py-3 text-sm ${message.startsWith("Error") ? "border border-danger/20 bg-danger/10 text-danger" : "border border-primary/20 bg-primary/10 text-primary"}`}>
            {message}
          </p>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="eyebrow">Display name</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">City</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Bio</span>
            <textarea
              className="min-h-40 w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">{isMedia ? "Camera equipment" : "Equipment"}</span>
            <textarea
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder={isMedia ? "e.g. Sony A7III, DJI RS3, etc." : "e.g. Pioneer XDJ-RX3"}
            />
          </label>

          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => window.open(`/profile/${profile.id}`, "_blank")}>
              Preview Public Profile
            </Button>
          </div>
        </form>
      </section>

      <aside className="panel p-8">
        <p className="eyebrow">Account snapshot</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="eyebrow">Role</p>
            <p className="mt-2 font-mono text-3xl text-primary capitalize">{profile.role}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="eyebrow">Email</p>
            <p className="mt-2 font-mono text-lg text-foreground truncate">{profile.email}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="eyebrow">Stripe onboarded</p>
            <p className="mt-2 font-mono text-3xl text-secondary">{profile.stripe_onboarded ? "Yes" : "No"}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="eyebrow">Member since signup</p>
            <p className="mt-2 font-mono text-3xl text-tertiary">Active</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
