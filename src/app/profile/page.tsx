import { currentUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="panel p-8">
        <p className="eyebrow">Profile</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Edit your booking profile</h1>

        <form className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="eyebrow">Display name</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue={currentUser.displayName} />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">City</span>
            <input className="w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue={currentUser.city} />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Bio</span>
            <textarea className="min-h-40 w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3" defaultValue={currentUser.bio} />
          </label>
          <label className="block space-y-2">
            <span className="eyebrow">Equipment</span>
            <textarea
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
              defaultValue={currentUser.equipment.join("\n")}
            />
          </label>

          <div className="flex gap-3">
            <Button>Save Changes</Button>
            <Button type="button" variant="secondary">
              Preview Public Profile
            </Button>
          </div>
        </form>
      </section>

      <aside className="panel p-8">
        <p className="eyebrow">Account snapshot</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="eyebrow">Completed gigs</p>
            <p className="mt-2 font-mono text-3xl text-primary">{currentUser.gigsCompleted}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="eyebrow">Avg. rating</p>
            <p className="mt-2 font-mono text-3xl text-tertiary">{currentUser.rating.toFixed(1)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="eyebrow">Reliability</p>
            <p className="mt-2 font-mono text-3xl text-foreground">{currentUser.reliability}%</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="eyebrow">Member since</p>
            <p className="mt-2 font-mono text-3xl text-secondary">{currentUser.memberSince}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
