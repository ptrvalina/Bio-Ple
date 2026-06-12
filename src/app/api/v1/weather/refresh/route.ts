import { refreshWeather } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function POST() {
  return withServiceHandler(
    "weather-service",
    "POST /refresh",
    refreshWeather
  );
}
