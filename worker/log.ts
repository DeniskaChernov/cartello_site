// Never log exception messages, payloads, response bodies or URLs: they may contain secrets/PII.
export function logFailure(integration: string, requestId: string, status?: number) {
  console.error(JSON.stringify({ event: "lead_integration_failed", integration, requestId, status }));
}
