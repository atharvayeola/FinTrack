export interface EnvironmentConfig {
  port: number;
  broadcastIntervalMs: number;
  allowedOrigins: string[];
}

export function loadConfig(): EnvironmentConfig {
  const port = Number(process.env.PORT ?? 4000);
  const broadcastIntervalMs = Number(process.env.BROADCAST_INTERVAL_MS ?? 2000);
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()) ?? ['*'];

  return {
    port,
    broadcastIntervalMs,
    allowedOrigins,
  };
}
