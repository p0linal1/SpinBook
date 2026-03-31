import { DjProfileCard } from "@/components/dj-profile-card";
import { MixPlayer } from "@/components/mix-player";
import { RatingStars } from "@/components/rating-stars";
import { currentUser } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PublicProfilePage() {
  const user = currentUser;

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel overflow-hidden bg-hero-grid p-8">
          <p className="eyebrow">Public DJ Profile</p>
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

      <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-8">
          <MixPlayer mix={user.featuredMix} />

          <div className="panel p-6">
            <p className="eyebrow mb-4">Past gigs</p>
            <div className="space-y-3">
              {user.pastGigs.map((gig) => (
                <div key={`${gig.eventName}-${gig.date}`} className="grid gap-3 rounded-2xl border border-white/5 bg-surface-low px-5 py-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center">
                  <div>
                    <p className="font-display text-lg font-medium">{gig.eventName}</p>
                    <p className="text-sm text-muted">{gig.venue}</p>
                  </div>
                  <p className="font-mono text-sm text-muted">{formatDate(gig.date)}</p>
                  <p className="text-sm text-muted">{gig.slotType}</p>
                  <p className="font-mono text-sm text-primary">{formatCurrency(gig.fee)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel p-6">
          <p className="eyebrow mb-4">Reviews</p>
          <div className="space-y-5">
            {user.reviews.map((review) => (
              <div key={`${review.author}-${review.eventName}`} className="rounded-2xl border border-white/5 bg-surface-low p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-xl font-medium">{review.author}</p>
                    <p className="mt-1 text-sm text-muted">{review.eventName}</p>
                  </div>
                  <RatingStars rating={review.rating} />
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">{review.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
