import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "kinetic-gradient hover:shadow-neon-glow active:scale-95 transition-all",
  secondary:
    "bg-surface-container-highest border border-outline-variant text-on-surface hover:bg-surface-bright transition-colors",
  ghost:
    "bg-transparent text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors",
  outline:
    "border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-highest transition-colors",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs font-mono uppercase tracking-widest",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-sm font-bold uppercase tracking-widest",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition",
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
  icon,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
}
