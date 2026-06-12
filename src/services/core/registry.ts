import type { ServiceHealth, ServiceName, ServiceStatus } from "./types";

const SERVICE_META: Record<
  ServiceName,
  { label: string; endpoint: string; version: string }
> = {
  "field-service": {
    label: "Field GIS",
    endpoint: "/api/v1/fields",
    version: "1.2.0",
  },
  "weather-service": {
    label: "Weather Hub",
    endpoint: "/api/v1/weather",
    version: "2.0.1",
  },
  "operations-service": {
    label: "Operations Log",
    endpoint: "/api/v1/operations",
    version: "1.4.0",
  },
  "alerts-service": {
    label: "Alerts Engine",
    endpoint: "/api/v1/alerts",
    version: "1.1.0",
  },
  "planning-service": {
    label: "Planning & TechMap",
    endpoint: "/api/v1/planning",
    version: "1.3.0",
  },
};

interface ServiceMetrics {
  lastLatencyMs: number;
  lastCheck: string;
  errorCount: number;
  successCount: number;
}

const metrics = new Map<ServiceName, ServiceMetrics>();

function getMetrics(service: ServiceName): ServiceMetrics {
  if (!metrics.has(service)) {
    metrics.set(service, {
      lastLatencyMs: 0,
      lastCheck: new Date().toISOString(),
      errorCount: 0,
      successCount: 0,
    });
  }
  return metrics.get(service)!;
}

export function recordServiceSuccess(
  service: ServiceName,
  latencyMs: number
): void {
  const m = getMetrics(service);
  m.lastLatencyMs = latencyMs;
  m.lastCheck = new Date().toISOString();
  m.successCount += 1;
}

export function recordServiceError(service: ServiceName): void {
  const m = getMetrics(service);
  m.lastCheck = new Date().toISOString();
  m.errorCount += 1;
}

function resolveStatus(m: ServiceMetrics): ServiceStatus {
  if (m.errorCount > 2 && m.successCount === 0) return "offline";
  if (m.errorCount > 0 || m.lastLatencyMs > 400) return "degraded";
  return "online";
}

export function getServiceHealthList(): ServiceHealth[] {
  return (Object.keys(SERVICE_META) as ServiceName[]).map((id) => {
    const meta = SERVICE_META[id];
    const m = getMetrics(id);
    return {
      id,
      label: meta.label,
      endpoint: meta.endpoint,
      version: meta.version,
      latencyMs: m.lastLatencyMs,
      lastCheck: m.lastCheck,
      status: resolveStatus(m),
    };
  });
}
