import request from 'supertest';
import WebSocket from 'ws';
import type { Server } from 'http';

let app: import('express').Express;
let server: Server;
let shutdownServer: () => Promise<void>;
let startServer: (port?: number) => Server;

beforeAll(async () => {
  process.env.BROADCAST_INTERVAL_MS = '10';
  const module = await import('../index');
  app = module.app;
  shutdownServer = module.shutdownServer;
  startServer = module.startServer;
  server = startServer(4100);
});

afterAll(async () => {
  await shutdownServer();
});

describe('API routes', () => {
  it('returns ok for health endpoint', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('returns a generated portfolio snapshot', async () => {
    const response = await request(app).get('/api/portfolio');
    expect(response.status).toBe(200);
    expect(response.body.snapshot.positions.length).toBeGreaterThan(0);
  });
});

describe('WebSocket broadcasting', () => {
  let ws: WebSocket | undefined;

  afterEach(() => {
    ws?.close();
  });

  it('sends messages over the realtime websocket', () => {
    return new Promise<void>((resolve, reject) => {
      ws = new WebSocket('ws://localhost:4100/realtime');
      ws.on('message', (data) => {
        const payload = JSON.parse(data.toString());
        expect(payload.snapshot.positions.length).toBeGreaterThan(0);
        resolve();
      });
      ws.on('error', reject);
    });
  });

  it('broadcasts periodic updates to connected clients', () => {
    return new Promise<void>((resolve, reject) => {
      let messages = 0;
      const timeout = setTimeout(() => {
        reject(new Error('No broadcast received'));
      }, 1500);

      ws = new WebSocket('ws://localhost:4100/realtime');
      ws.on('message', () => {
        messages += 1;
        if (messages >= 2) {
          clearTimeout(timeout);
          resolve();
        }
      });
      ws.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  });
});

describe('server lifecycle', () => {
  it('does not start a new listener when already running', () => {
    const result = startServer(4100);
    expect(result).toBe(server);
  });
});
