import http from 'http';
import express from 'express';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import healthRouter from './routes/health';
import portfolioRouter from './routes/portfolio';
import { buildSnapshot } from './services/marketDataService';
import { loadConfig } from './config/environment';
import { BroadcastPayload } from './types/financial';

const app = express();
const config = loadConfig();

app.use(cors({ origin: config.allowedOrigins }));
app.use(express.json());
app.use('/api', healthRouter);
app.use('/api', portfolioRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/realtime' });

const clients = new Set<WebSocket>();
let broadcastTimer: NodeJS.Timeout | null = null;

wss.on('connection', (socket) => {
  clients.add(socket);
  socket.send(JSON.stringify(buildPayload()));

  socket.on('close', () => {
    clients.delete(socket);
  });
});

function buildPayload(): BroadcastPayload {
  return {
    snapshot: buildSnapshot(),
    updatedAt: Date.now(),
  };
}

function broadcastUpdates(): void {
  const payload = JSON.stringify(buildPayload());
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

function startBroadcasting(): void {
  if (!broadcastTimer) {
    broadcastTimer = setInterval(broadcastUpdates, config.broadcastIntervalMs);
  }
}

function stopBroadcasting(): void {
  if (broadcastTimer) {
    clearInterval(broadcastTimer);
    broadcastTimer = null;
  }
}

function startServer(port = config.port): http.Server {
  if (!server.listening) {
    startBroadcasting();
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend listening on port ${port}`);
    });
  }
  return server;
}

function shutdownServer(): Promise<void> {
  stopBroadcasting();
  return new Promise((resolve) => {
    wss.clients.forEach((client) => {
      client.terminate();
    });
    wss.close(() => {
      server.close(() => resolve());
    });
  });
}

process.on('SIGINT', () => {
  shutdownServer().finally(() => process.exit(0));
});

if (require.main === module) {
  startServer();
}

export { app, server, wss, startServer, shutdownServer };
