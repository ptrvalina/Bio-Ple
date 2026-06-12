import { acknowledgeAlert } from "@/services/server/handlers";
import { withServiceHandler } from "@/services/server/routeHelper";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return withServiceHandler(
    "alerts-service",
    `POST /alerts/${params.id}/ack`,
    () => acknowledgeAlert(params.id)
  );
}
