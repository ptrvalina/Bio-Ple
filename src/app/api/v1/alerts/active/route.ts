import { getActiveAlerts } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function GET() {
  return withServiceHandler(
    "alerts-service",
    "GET /alerts/active",
    getActiveAlerts
  );
}
