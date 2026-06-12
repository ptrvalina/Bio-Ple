import { callService } from "@/services/core/transport";
import type { Operation } from "@/types/data";

export const operationsApi = {
  getAll: () =>
    callService<Operation[]>(
      "operations-service",
      "GET /operations",
      "/operations"
    ),

  getByField: (fieldName: string) =>
    callService<Operation[]>(
      "operations-service",
      `GET /operations?field=${fieldName}`,
      `/operations?field=${encodeURIComponent(fieldName)}`
    ),
};
