"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { roleOptions, cities } from "@/lib/constants";

export default function SignupPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("dj");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState(cities[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName, role: role.toLowerCase(), city },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="panel p-8">
        <p className="eyebrow">Auth</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Create your Spinbook account</h1>

        {error && (
          <p className="mt-4 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
        )}

        <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block space-y-2 md:col-span-2">
            <span className="eyebrow">Display name</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Email</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Role</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roleOptions.map((r) => (
                <option key={r} value={r.toLowerCase()}>{r}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Password</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">City</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className="md:col-span-2">
            <Button className="w-full" size="lg" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </div>
        </form>

        <p className="mt-5 text-sm text-muted">
          Already have an account?{" "}
          <Link className="text-primary" href="/auth/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
