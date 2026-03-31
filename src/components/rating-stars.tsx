interface RatingStarsProps {
  rating: number;
}

export function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-tertiary">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>{index + 1 <= Math.round(rating) ? "★" : "☆"}</span>
        ))}
      </div>
      <span className="font-mono text-sm text-tertiary">{rating.toFixed(1)}</span>
    </div>
  );
}
