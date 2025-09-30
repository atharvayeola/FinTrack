import { loadConfig } from '../config/environment';

describe('environment configuration', () => {
  afterEach(() => {
    delete process.env.PORT;
    delete process.env.BROADCAST_INTERVAL_MS;
    delete process.env.ALLOWED_ORIGINS;
  });

  it('loads defaults when env vars are missing', () => {
    const config = loadConfig();
    expect(config.port).toBe(4000);
    expect(config.broadcastIntervalMs).toBe(2000);
    expect(config.allowedOrigins).toEqual(['*']);
  });

  it('parses environment overrides', () => {
    process.env.PORT = '5050';
    process.env.BROADCAST_INTERVAL_MS = '2500';
    process.env.ALLOWED_ORIGINS = 'http://localhost:5173,https://example.com';

    const config = loadConfig();
    expect(config.port).toBe(5050);
    expect(config.broadcastIntervalMs).toBe(2500);
    expect(config.allowedOrigins).toEqual(['http://localhost:5173', 'https://example.com']);
  });
});
