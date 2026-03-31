import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="panel p-8">
        <p className="eyebrow">Auth</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Create your Spinbook account</h1>

        <form className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="block space-y-2 md:col-span-2">
            <span className="eyebrow">Display name</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue="Nova Vale" />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Email</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue="nova@spinbook.fm" />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Role</span>
            <select className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3">
              <option>DJ</option>
              <option>Promoter</option>
              <option>Venue</option>
            </select>
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Password</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" type="password" value="password" readOnly />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">City</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue="Los Angeles, CA" />
          </label>
          <div className="md:col-span-2">
            <Button className="w-full" size="lg">
              Create account
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
