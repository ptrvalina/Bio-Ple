import { callService } from "@/services/core/transport";
import type { ForecastDay, WeatherNow } from "@/types/data";

export const weatherApi = {
  getCurrent: () =>
    callService<WeatherNow>(
      "weather-service",
      "GET /current",
      "/weather/current"
    ),

  getForecast: () =>
    callService<ForecastDay[]>(
      "weather-service",
      "GET /forecast",
      "/weather/forecast"
    ),

  refresh: () =>
    callService<WeatherNow>("weather-service", "POST /refresh", "/weather/refresh", {
      method: "POST",
    }),
};
