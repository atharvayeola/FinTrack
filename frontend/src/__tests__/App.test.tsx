import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('react-plotly.js', () => {
  return function MockPlotly() {
    return <div data-testid="plotly-chart" />;
  };
});

jest.mock('../hooks/useRealtimePortfolio', () => ({
  useRealtimePortfolio: () => ({
    snapshot: {
      totalValue: 1200000,
      dailyPnL: 8500,
      cash: 250000,
      positions: [
        { symbol: 'AAPL', price: 190.12, change: 1.23, changePct: 0.65, volume: 1200000, timestamp: Date.now() },
        { symbol: 'MSFT', price: 312.45, change: -2.01, changePct: -0.75, volume: 950000, timestamp: Date.now() },
      ],
    },
    positions: [
      { symbol: 'AAPL', price: 190.12, change: 1.23, changePct: 0.65, volume: 1200000, timestamp: Date.now() },
      { symbol: 'MSFT', price: 312.45, change: -2.01, changePct: -0.75, volume: 950000, timestamp: Date.now() },
    ],
    latencyMs: 42,
    connectionStatus: 'open',
  }),
}));

describe('App', () => {
  it('renders realtime metrics and connection status', () => {
    render(<App />);

    expect(screen.getByText(/Total Equity/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily P&L/i)).toBeInTheDocument();
    expect(screen.getByText(/Live connection established/i)).toBeInTheDocument();
    expect(screen.getByText(/Latency: 42 ms/i)).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByTestId('plotly-chart')).toBeInTheDocument();
  });
});
