"use client";

import { useDataStore } from "@/store/dataStore";
import type { Field } from "@/types/data";

/** Единый источник активного поля из dataStore.selectedFieldId */
export function useActiveField(): Field | undefined {
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);

  if (selectedFieldId) {
    return fields.find((f) => f.id === selectedFieldId);
  }

  return fields[0];
}
