import type { FeaturedMix } from "@/types/user";

interface MixPlayerProps {
  mix: FeaturedMix;
}

export function MixPlayer({ mix }: MixPlayerProps) {
  return (
    <div className="panel overflow-hidden p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-2xl text-primary">
          ►
        </div>
        <div>
          <p className="eyebrow">Featured Mix</p>
          <h3 className="mt-1 font-display text-2xl font-semibold">{mix.title}</h3>
          <p className="mt-1 font-mono text-sm text-muted">{mix.duration}</p>
        </div>
      </div>

      <div className="mt-6 flex h-14 items-end gap-1">
        {[20, 32, 48, 76, 58, 84, 96, 70, 44, 62, 35, 18].map((height, index) => (
          <span
            key={`${height}-${index}`}
            className={`block flex-1 rounded-full ${index < 8 ? "bg-primary" : "bg-white/15"}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">{mix.description}</p>
    </div>
  );
}
