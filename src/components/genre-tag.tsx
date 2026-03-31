import { cn } from "@/lib/utils";

interface GenreTagProps {
  label: string;
  tone?: "secondary" | "neutral";
}

export function GenreTag({ label, tone = "secondary" }: GenreTagProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
        tone === "secondary"
          ? "border-secondary/30 bg-secondary/15 text-secondary"
          : "border-white/10 bg-white/5 text-muted",
      )}
    >
      {label}
    </span>
  );
}
