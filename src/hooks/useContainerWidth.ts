"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** Измеряет ширину контейнера через ResizeObserver (замена WidthProvider) */
export function useContainerWidth(enabled = true): {
  containerRef: RefObject<HTMLDivElement>;
  width: number;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => {
      const next = element.getBoundingClientRect().width;
      setWidth((prev) => (prev !== next ? next : prev));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled]);

  return { containerRef, width };
}
