import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  detail: string;
  tone?: "primary" | "secondary" | "tertiary" | "neutral";
}

const toneClasses = {
  primary: "border-primary/40 text-primary",
  secondary: "border-secondary/40 text-secondary",
  tertiary: "border-tertiary/40 text-tertiary",
  neutral: "border-white/10 text-foreground",
};

export function StatCard({
  label,
  value,
  detail,
  tone = "neutral",
}: StatCardProps) {
  return (
    <div className="panel-muted rounded-2xl border-l-2 p-5 transition hover:border-primary/40 hover:bg-surface-high">
      <p className="eyebrow mb-2">{label}</p>
      <div className={cn("font-mono text-3xl font-semibold", toneClasses[tone])}>
        {value}
      </div>
      <p className="mt-2 text-sm text-muted">{detail}</p>
    </div>
  );
}
