import { callService } from "@/services/core/transport";
import type { PlanFactDeviation, TechMapData } from "@/types/data";

export const planningApi = {
  getTechMap: (fieldId: string) =>
    callService<TechMapData>(
      "planning-service",
      `GET /tech-map/${fieldId}`,
      `/planning/tech-map/${fieldId}`
    ),

  getDeviations: () =>
    callService<PlanFactDeviation[]>(
      "planning-service",
      "GET /deviations",
      "/planning/deviations"
    ),
};
