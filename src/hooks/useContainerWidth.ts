"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** Измеряет ширину контейнера через ResizeObserver (замена WidthProvider) */
export function useContainerWidth(): {
  containerRef: RefObject<HTMLDivElement>;
  width: number;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => {
      setWidth(element.getBoundingClientRect().width);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { containerRef, width };
}
