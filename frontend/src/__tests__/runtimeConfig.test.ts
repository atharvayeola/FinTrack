import { resolveRealtimeUrl } from '../utils/runtimeConfig';

describe('resolveRealtimeUrl', () => {
  const originalConfig = window.__FINTRACK_CONFIG__;
  const originalEnv = process.env.VITE_REALTIME_URL;

  afterEach(() => {
    if (originalConfig) {
      window.__FINTRACK_CONFIG__ = originalConfig;
    } else {
      delete window.__FINTRACK_CONFIG__;
    }
    if (originalEnv) {
      process.env.VITE_REALTIME_URL = originalEnv;
    } else {
      delete process.env.VITE_REALTIME_URL;
    }
  });

  it('prefers window configuration when available', () => {
    window.__FINTRACK_CONFIG__ = { realtimeUrl: 'ws://window-config' };
    process.env.VITE_REALTIME_URL = 'ws://env-config';
    expect(resolveRealtimeUrl()).toBe('ws://window-config');
  });

  it('falls back to process env when window config is missing', () => {
    delete window.__FINTRACK_CONFIG__;
    process.env.VITE_REALTIME_URL = 'ws://env-config';
    expect(resolveRealtimeUrl()).toBe('ws://env-config');
  });

  it('uses default when no configuration is provided', () => {
    delete window.__FINTRACK_CONFIG__;
    delete process.env.VITE_REALTIME_URL;
    expect(resolveRealtimeUrl()).toBe('ws://localhost:4000/realtime');
  });
});
