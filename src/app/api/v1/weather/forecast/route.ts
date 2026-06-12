import { getWeatherForecast } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function GET() {
  return withServiceHandler(
    "weather-service",
    "GET /forecast",
    getWeatherForecast
  );
}
