"use client";

import { memo, useCallback } from "react";
import { WIDGET_COMPONENTS } from "@/components/widgets/widgetComponents";
import type { DashboardWidget } from "@/types/widget";

interface WidgetRendererProps {
  widget: DashboardWidget;
  onRemove: (id: string) => void;
}

/** Fallback при неизвестном или битом типе виджета */
function WidgetFallback({
  widget,
  onRemove,
}: WidgetRendererProps) {
  const handleRemove = useCallback(() => {
    onRemove(widget.id);
  }, [onRemove, widget.id]);

  return (
    <div className="flex h-full min-h-[140px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-red-500/40 bg-red-950/20 p-4 text-center">
      <p className="text-sm text-red-300">
        Виджет «{widget.type}» не найден
      </p>
      <p className="text-xs text-slate-500">ID: {widget.id}</p>
      <button
        type="button"
        onClick={handleRemove}
        className="rounded-lg bg-red-600/80 px-3 py-1.5 text-xs text-white hover:bg-red-600"
      >
        Удалить
      </button>
    </div>
  );
}

function WidgetRendererComponent({ widget, onRemove }: WidgetRendererProps) {
  const Component = WIDGET_COMPONENTS[widget.type];

  if (!Component) {
    return <WidgetFallback widget={widget} onRemove={onRemove} />;
  }

  return <Component />;
}

export const WidgetRenderer = memo(WidgetRendererComponent);
