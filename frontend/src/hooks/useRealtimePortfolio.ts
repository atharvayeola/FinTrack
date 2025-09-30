import { useEffect, useMemo, useRef, useState } from 'react';
import { PortfolioSnapshot, RealtimePayload } from '../types/financial';

interface RealtimeState {
  snapshot: PortfolioSnapshot | null;
  latencyMs: number | null;
  connectionStatus: 'connecting' | 'open' | 'closed' | 'error';
}

const DEFAULT_STATE: RealtimeState = {
  snapshot: null,
  latencyMs: null,
  connectionStatus: 'connecting',
};

export function useRealtimePortfolio(url: string) {
  const [state, setState] = useState<RealtimeState>(DEFAULT_STATE);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.addEventListener('open', () => {
      setState((prev) => ({ ...prev, connectionStatus: 'open' }));
    });

    socket.addEventListener('message', (event) => {
      const receivedAt = Date.now();
      const payload: RealtimePayload = JSON.parse(event.data);
      const latency = receivedAt - payload.updatedAt;
      setState({
        snapshot: payload.snapshot,
        latencyMs: Math.max(latency, 0),
        connectionStatus: 'open',
      });
    });

    socket.addEventListener('close', () => {
      setState((prev) => ({ ...prev, connectionStatus: 'closed' }));
    });

    socket.addEventListener('error', () => {
      setState((prev) => ({ ...prev, connectionStatus: 'error' }));
    });

    return () => {
      socket.close();
    };
  }, [url]);

  const latestPositions = useMemo(() => state.snapshot?.positions ?? [], [state.snapshot]);

  return {
    snapshot: state.snapshot,
    positions: latestPositions,
    latencyMs: state.latencyMs,
    connectionStatus: state.connectionStatus,
  };
}
