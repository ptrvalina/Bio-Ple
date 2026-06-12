"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useToastStore } from "@/store/toastStore";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const STYLES = {
  success: "border-accent/30 bg-accent/10 text-accent-light",
  error: "border-danger/30 bg-danger/10 text-danger-muted",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-300",
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type];
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex animate-slide-up items-center gap-3 rounded-xl border px-4 py-3 shadow-card backdrop-blur-md ${STYLES[toast.type]}`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium text-white">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="ml-2 rounded p-0.5 opacity-60 hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
