/** Стандартный ответ микросервиса */
export interface ServiceResponse<T> {
  data: T;
  meta: ResponseMeta;
}

export interface ResponseMeta {
  service: ServiceName;
  operation: string;
  latencyMs: number;
  timestamp: string;
  version: string;
}

export type ServiceName =
  | "field-service"
  | "weather-service"
  | "operations-service"
  | "alerts-service"
  | "planning-service";

export type ServiceStatus = "online" | "degraded" | "offline";

export interface ServiceHealth {
  id: ServiceName;
  label: string;
  status: ServiceStatus;
  latencyMs: number;
  lastCheck: string;
  version: string;
  endpoint: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: "sync" | "alert" | "field" | "operation" | "weather" | "system";
  title: string;
  description: string;
}

export class ServiceError extends Error {
  constructor(
    public service: ServiceName,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = "ServiceError";
  }
}
