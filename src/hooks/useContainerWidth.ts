"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function measureNodeWidth(node: HTMLElement): number {
  const rect = Math.floor(node.getBoundingClientRect().width);
  if (rect > 0) return rect;

  const client = node.clientWidth;
  if (client > 0) return client;

  const parent = node.parentElement?.clientWidth;
  if (parent && parent > 0) return parent;

  return 0;
}

/** Измеряет ширину контейнера через ResizeObserver + callback ref */
export function useContainerWidth() {
  const [width, setWidth] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    nodeRef.current = node;

    if (!node) {
      setWidth(0);
      return;
    }

    const updateWidth = () => {
      const next = measureNodeWidth(node);
      if (next > 0) {
        setWidth(next);
        return true;
      }
      return false;
    };

    if (!updateWidth()) {
      requestAnimationFrame(updateWidth);
      requestAnimationFrame(() => requestAnimationFrame(updateWidth));
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  // Fallback: некоторые браузеры отдают 0 до первого layout pass
  useEffect(() => {
    if (width > 0) return;

    let attempts = 0;
    const retry = () => {
      const node = nodeRef.current;
      if (!node) return;

      const measured = measureNodeWidth(node);
      if (measured > 0) {
        setWidth(measured);
        return;
      }

      attempts += 1;
      if (attempts < 20) {
        window.setTimeout(retry, 50);
        return;
      }

      const fallback = Math.floor(
        node.parentElement?.clientWidth || window.innerWidth
      );
      if (fallback > 0) {
        setWidth(fallback);
      }
    };

    retry();
    window.addEventListener("resize", retry);
    return () => window.removeEventListener("resize", retry);
  }, [width]);

  return { containerRef, width };
}
