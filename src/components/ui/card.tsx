import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "glass" | "muted" | "highlight";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default: "panel",
  glass: "glass-card rounded-xl",
  muted: "panel-muted",
  highlight: "panel border-l-2 border-l-primary",
};

export function Card({
  children,
  className,
  variant = "default",
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <div 
      className={cn(
        variantClasses[variant], 
        "group transition-all hover:border-primary/20", 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
