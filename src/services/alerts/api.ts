import { callService } from "@/services/core/transport";
import type { Alert } from "@/types/data";

export const alertsApi = {
  getActive: () =>
    callService<Alert[]>(
      "alerts-service",
      "GET /alerts/active",
      "/alerts/active"
    ),

  acknowledge: (id: string) =>
    callService<Alert[]>(
      "alerts-service",
      `POST /alerts/${id}/ack`,
      `/alerts/${id}/ack`,
      { method: "POST" }
    ),
};
