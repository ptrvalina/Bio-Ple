import {
  recordServiceError,
  recordServiceSuccess,
} from "./registry";
import { ServiceError, type ServiceName, type ServiceResponse } from "./types";

const API_BASE = "/api/v1";

async function parseResponse<T>(
  res: Response,
  service: ServiceName
): Promise<ServiceResponse<T>> {
  const body = (await res.json()) as ServiceResponse<T> | { error: string };
  if (!res.ok) {
    const message =
      "error" in body ? body.error : `HTTP ${res.status}`;
    throw new ServiceError(service, "HTTP_ERROR", message);
  }
  return body as ServiceResponse<T>;
}

/** HTTP-вызов микросервиса через Next.js API routes */
export async function callService<T>(
  service: ServiceName,
  operation: string,
  path: string,
  init?: RequestInit
): Promise<ServiceResponse<T>> {
  const start = Date.now();
  const url = path.startsWith("/api") ? path : `${API_BASE}${path}`;

  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...init?.headers,
      },
    });
    const body = await parseResponse<T>(res, service);
    const latencyMs = body.meta?.latencyMs ?? Date.now() - start;
    recordServiceSuccess(service, latencyMs);
    return body;
  } catch (error) {
    recordServiceError(service);
    if (error instanceof ServiceError) throw error;
    throw new ServiceError(
      service,
      "NETWORK_ERROR",
      error instanceof Error ? error.message : "Network error"
    );
  }
}
