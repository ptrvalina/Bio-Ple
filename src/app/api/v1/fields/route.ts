import { getFields } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function GET() {
  return withServiceHandler("field-service", "GET /fields", getFields);
}
