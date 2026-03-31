import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="panel p-8">
        <p className="eyebrow">Auth</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Log in to Spinbook</h1>

        <form className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="eyebrow">Email</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue="nova@spinbook.fm" />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Password</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" type="password" value="password" readOnly />
          </label>
          <Button className="w-full" size="lg">
            Log in
          </Button>
        </form>

        <p className="mt-5 text-sm text-muted">
          Need an account?{" "}
          <Link className="text-primary" href="/auth/signup">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
