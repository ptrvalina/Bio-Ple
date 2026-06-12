"use client";

import type { ComponentType } from "react";
import * as ReactGridLayout from "react-grid-layout";

type ResponsiveComponent = ComponentType<Record<string, unknown>>;

type RGLModule = {
  Responsive?: ResponsiveComponent;
  default?: ResponsiveComponent & { Responsive?: ResponsiveComponent };
};

/**
 * react-grid-layout is CJS: Responsive is on module.exports, not always on the default ESM import.
 */
function resolveResponsive(): ResponsiveComponent {
  const mod = ReactGridLayout as unknown as RGLModule;
  const fromNamespace = mod.Responsive;
  if (fromNamespace) return fromNamespace;

  const fromDefault = mod.default?.Responsive;
  if (fromDefault) return fromDefault;

  throw new Error(
    "[AgroPulse] react-grid-layout Responsive export is missing — check bundler CJS interop"
  );
}

export const Responsive = resolveResponsive();
