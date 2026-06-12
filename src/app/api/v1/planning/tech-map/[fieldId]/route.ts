import { getTechMap } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function GET(
  _request: Request,
  { params }: { params: { fieldId: string } }
) {
  return withServiceHandler(
    "planning-service",
    `GET /tech-map/${params.fieldId}`,
    () => getTechMap(params.fieldId)
  );
}
