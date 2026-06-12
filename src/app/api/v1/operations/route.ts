import { getOperations } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const field = searchParams.get("field");
  const op = field ? `GET /operations?field=${field}` : "GET /operations";
  return withServiceHandler("operations-service", op, () =>
    getOperations(field)
  );
}
