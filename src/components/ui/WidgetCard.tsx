"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface WidgetCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  badge?: string;
  badgeVariant?: "default" | "danger" | "warning" | "success";
  action?: ReactNode;
  className?: string;
  noPadding?: boolean;
}

const BADGE_STYLES = {
  default: "bg-surface-hover text-slate-400",
  danger: "bg-red-500/15 text-red-400",
  warning: "bg-amber-500/15 text-amber-400",
  success: "bg-accent/15 text-accent-light",
};

/** Карточка виджета для главного дашборда */
export function WidgetCard({
  title,
  icon: Icon,
  children,
  badge,
  badgeVariant = "default",
  action,
  className = "",
  noPadding = false,
}: WidgetCardProps) {
  return (
    <div
      className={`glass-card flex h-full min-h-0 flex-col overflow-hidden animate-fade-in ${className}`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-surface-border/80 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="h-4 w-4 text-accent" />
          </div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${BADGE_STYLES[badgeVariant]}`}
            >
              {badge}
            </span>
          )}
        </div>
        {action}
      </div>
      <div className={noPadding ? "flex-1 overflow-hidden" : "widget-content"}>
        {children}
      </div>
    </div>
  );
}
