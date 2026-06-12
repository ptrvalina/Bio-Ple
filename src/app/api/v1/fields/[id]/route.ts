import { getFieldById } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return withServiceHandler("field-service", `GET /fields/${params.id}`, () =>
    getFieldById(params.id)
  );
}
