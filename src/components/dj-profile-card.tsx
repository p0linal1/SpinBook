import Link from "next/link";
import { GenreTag } from "@/components/genre-tag";
import { RatingStars } from "@/components/rating-stars";
import { Button } from "@/components/ui/button";
import { buttonClasses } from "@/components/ui/button";
import { initials } from "@/lib/utils";
import type { PlatformUser } from "@/types/user";

interface DjProfileCardProps {
  user: PlatformUser;
}

export function DjProfileCard({ user }: DjProfileCardProps) {
  return (
    <div className="panel flex flex-col gap-5 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/20 font-display text-2xl font-semibold text-secondary">
          {initials(user.displayName)}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-2xl font-semibold">{user.displayName}</h3>
          <p className="mt-1 text-sm text-muted">{user.city}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {user.genres.map((genre) => (
              <GenreTag key={genre} label={genre} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="panel-muted p-4">
          <p className="eyebrow">Completed</p>
          <p className="mt-2 font-mono text-2xl text-primary">{user.gigsCompleted}</p>
        </div>
        <div className="panel-muted p-4">
          <p className="eyebrow">Reliability</p>
          <p className="mt-2 font-mono text-2xl text-foreground">{user.reliability}%</p>
        </div>
      </div>

      <RatingStars rating={user.rating} />

      <div>
        <p className="eyebrow mb-2">Bio</p>
        <p className="text-sm leading-6 text-muted">{user.bio}</p>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1">Book This DJ</Button>
        <Link
          className={buttonClasses("secondary", "md", "flex-1")}
          href={`/profile/${user.id}`}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
