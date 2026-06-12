import { callService } from "@/services/core/transport";
import type { Field } from "@/types/data";

export const fieldsApi = {
  getAll: () =>
    callService<Field[]>("field-service", "GET /fields", "/fields"),

  getById: (id: string) =>
    callService<Field | null>(
      "field-service",
      `GET /fields/${id}`,
      `/fields/${id}`
    ),
};
