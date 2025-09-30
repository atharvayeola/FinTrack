interface Window {
  __FINTRACK_CONFIG__?: {
    realtimeUrl: string;
  };
}

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_REALTIME_URL?: string;
  }
}
