"use client";

import type { ComponentType } from "react";
import GridLayout from "react-grid-layout";

type GridLayoutModule = typeof GridLayout & {
  Responsive: ComponentType<Record<string, unknown>>;
};

/** Responsive из CJS-пакета react-grid-layout */
export const Responsive = (GridLayout as GridLayoutModule).Responsive;
