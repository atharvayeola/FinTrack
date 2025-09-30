import './ConnectionStatus.css';

type Status = 'connecting' | 'open' | 'closed' | 'error';

interface ConnectionStatusProps {
  status: Status;
  latencyMs: number | null;
}

const STATUS_COPY: Record<Status, string> = {
  connecting: 'Connecting to live data…',
  open: 'Live connection established',
  closed: 'Connection closed',
  error: 'Connection error',
};

export function ConnectionStatus({ status, latencyMs }: ConnectionStatusProps) {
  return (
    <div className={`connection connection--${status}`}>
      <span className="connection__indicator" aria-hidden />
      <div>
        <p className="connection__label">{STATUS_COPY[status]}</p>
        {latencyMs !== null && status === 'open' && (
          <p className="connection__latency">Latency: {Math.round(latencyMs)} ms</p>
        )}
      </div>
    </div>
  );
}
