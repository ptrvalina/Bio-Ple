import { getDeviations } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function GET() {
  return withServiceHandler(
    "planning-service",
    "GET /deviations",
    getDeviations
  );
}
