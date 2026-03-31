"use client";

import { useState } from "react";
import { roleOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function RoleSwitcher() {
  const [activeRole, setActiveRole] = useState<(typeof roleOptions)[number]>("DJ");

  return (
    <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
      {roleOptions.map((role) => (
        <button
          key={role}
          className={cn(
            "rounded-full px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] transition",
            activeRole === role
              ? "bg-primary text-black"
              : "text-muted hover:text-foreground",
          )}
          onClick={() => setActiveRole(role)}
          type="button"
        >
          {role}
        </button>
      ))}
    </div>
  );
}
