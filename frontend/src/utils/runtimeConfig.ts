export function resolveRealtimeUrl(): string {
  if (typeof window !== 'undefined' && window.__FINTRACK_CONFIG__?.realtimeUrl) {
    return window.__FINTRACK_CONFIG__.realtimeUrl;
  }

  if (typeof process !== 'undefined' && process.env?.VITE_REALTIME_URL) {
    return process.env.VITE_REALTIME_URL;
  }

  return 'ws://localhost:4000/realtime';
}
