import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-button-glow text-black shadow-glow hover:brightness-105",
  secondary:
    "border border-white/10 bg-surface-high text-foreground hover:bg-surface-ink",
  ghost:
    "bg-transparent text-muted hover:bg-white/5 hover:text-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs uppercase tracking-[0.2em]",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-sm uppercase tracking-[0.18em]",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {children}
    </button>
  );
}
