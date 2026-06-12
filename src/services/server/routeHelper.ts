import { NextResponse } from "next/server";
import type { ServiceName } from "@/services/core/types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Обёртка route handler с имитацией latency и стандартным JSON-ответом */
export async function withServiceHandler<T>(
  service: ServiceName,
  operation: string,
  handler: () => T | Promise<T>
): Promise<NextResponse> {
  const start = Date.now();
  await delay(40 + Math.floor(Math.random() * 120));

  try {
    const data = await handler();
    const latencyMs = Date.now() - start;
    return NextResponse.json({
      data,
      meta: {
        service,
        operation,
        latencyMs,
        timestamp: new Date().toISOString(),
        version: "v1",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal service error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
