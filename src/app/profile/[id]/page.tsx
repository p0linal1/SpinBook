import { notFound } from "next/navigation";
import { DjProfileCard } from "@/components/dj-profile-card";
import { RatingStars } from "@/components/rating-stars";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface PublicProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    notFound();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!profile) {
    notFound();
  }

  const { data: completedBookings } = await supabase
    .from("bookings")
    .select("event_name, venue_name, slot_name, date, pay")
    .eq("user_id", id)
    .eq("status", "COMPLETED");

  const user = {
    id: profile.id,
    displayName: profile.display_name,
    role: profile.role as "dj" | "promoter" | "venue" | "media",
    city: profile.city,
    genres: profile.genres ?? [],
    rating: Number(profile.rating) || 0,
    gigsCompleted: profile.gigs_completed ?? 0,
    reliability: profile.reliability ?? 100,
    memberSince: profile.member_since ?? "2024",
    bio: profile.bio ?? "",
    badges: profile.badges ?? [],
    equipment: profile.equipment ?? [],
    featuredMix: (profile.featured_mix as { title: string; duration: string; description: string }) ?? { title: "", duration: "", description: "" },
    socialLinks: (profile.social_links as { label: string; url: string }[]) ?? [],
    pastGigs: (completedBookings ?? []).map((b) => ({
      eventName: b.event_name,
      venue: b.venue_name,
      date: b.date,
      slotType: b.slot_name,
      fee: Number(b.pay),
    })),
    reviews: [],
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel overflow-hidden bg-hero-grid p-8">
          <p className="eyebrow">Public {profile.role === "media" ? "Media" : profile.role === "promoter" ? "Promoter" : "DJ"} Profile</p>
          <h1 className="mt-3 font-display text-6xl font-semibold tracking-[-0.06em]">
            {user.displayName}
          </h1>
          <p className="mt-3 text-lg text-muted">{user.city}</p>
          <div className="mt-5">
            <RatingStars rating={user.rating} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {user.badges.map((badge) => (
              <span key={badge} className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
                {badge}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-base leading-8 text-muted">{user.bio}</p>
        </div>

        <DjProfileCard user={user} />
      </section>

      {user.pastGigs.length > 0 && (
        <section className="panel p-6">
          <p className="eyebrow mb-4">Completed bookings</p>
          <div className="space-y-3">
            {user.pastGigs.map((gig) => (
              <div key={`${gig.eventName}-${gig.date}`} className="grid gap-3 rounded-2xl border border-white/5 bg-surface-low px-5 py-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center">
                <div>
                  <p className="font-display text-lg font-medium">{gig.eventName}</p>
                  <p className="text-sm text-muted">{gig.venue}</p>
                </div>
                <p className="text-sm text-muted">{gig.slotType}</p>
                <p className="font-mono text-sm text-primary">${gig.fee}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
