"use client";

import {
  createElement,
  Fragment,
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

function PlainDiv(props: HTMLAttributes<HTMLDivElement>) {
  return createElement("div", props);
}

function PlainPresence({ children }: { children: ReactNode }) {
  return createElement(Fragment, null, children);
}

/** Безопасная загрузка framer-motion через require (обход CJS/ESM в Next.js) */
function loadFramerMotion() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fm = require("framer-motion") as {
      motion?: Record<string, ComponentType<Record<string, unknown>>>;
      AnimatePresence?: ComponentType<{ children: ReactNode; mode?: string }>;
      default?: {
        motion?: Record<string, ComponentType<Record<string, unknown>>>;
        AnimatePresence?: ComponentType<{ children: ReactNode; mode?: string }>;
      };
    };

    const motion = fm.motion ?? fm.default?.motion;
    const AnimatePresence = fm.AnimatePresence ?? fm.default?.AnimatePresence;

    if (motion && AnimatePresence) {
      return { motion, AnimatePresence };
    }
  } catch {
    // fallback ниже
  }

  return {
    motion: { div: PlainDiv as ComponentType<Record<string, unknown>> },
    AnimatePresence: PlainPresence,
  };
}

export const { motion, AnimatePresence } = loadFramerMotion();
