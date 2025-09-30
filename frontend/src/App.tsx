import { useMemo } from 'react';
import { ConnectionStatus } from './components/ConnectionStatus';
import { MetricCard } from './components/MetricCard';
import { PerformanceChart } from './components/PerformanceChart';
import { PortfolioTable } from './components/PortfolioTable';
import { useRealtimePortfolio } from './hooks/useRealtimePortfolio';
import { resolveRealtimeUrl } from './utils/runtimeConfig';
import { formatCurrency, formatPnL } from './utils/formatters';
import './App.css';

const realtimeUrl = resolveRealtimeUrl();

function App() {
  const { snapshot, positions, latencyMs, connectionStatus } = useRealtimePortfolio(realtimeUrl);

  const summary = useMemo(
    () => ({
      totalValue: snapshot?.totalValue ?? 0,
      dailyPnL: snapshot?.dailyPnL ?? 0,
      cash: snapshot?.cash ?? 0,
    }),
    [snapshot]
  );

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>FinTrack Live Portfolio</h1>
          <p>Monitor portfolio performance and intraday risk in real time.</p>
        </div>
        <ConnectionStatus status={connectionStatus} latencyMs={latencyMs} />
      </header>

      <section className="app__metrics">
        <MetricCard label="Total Equity" value={formatCurrency(summary.totalValue)} />
        <MetricCard
          label="Daily P&L"
          value={formatPnL(summary.dailyPnL)}
          variant={summary.dailyPnL >= 0 ? 'positive' : 'negative'}
        />
        <MetricCard label="Cash" value={formatCurrency(summary.cash)} />
      </section>

      <section className="app__grid">
        <PerformanceChart positions={positions} />
        <PortfolioTable positions={positions} />
      </section>
    </div>
  );
}

export default App;
