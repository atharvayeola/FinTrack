import Plot from 'react-plotly.js';
import type { Data, Layout } from 'plotly.js';
import { useMemo } from 'react';
import { AssetMetric } from '../types/financial';
import './PerformanceChart.css';

interface PerformanceChartProps {
  positions: AssetMetric[];
}

export function PerformanceChart({ positions }: PerformanceChartProps) {
  const data = useMemo<Data[]>(() => {
    const labels = positions.map((position) => position.symbol);
    const prices = positions.map((position) => position.price);
    const changes = positions.map((position) => position.changePct);

    return [
      {
        type: 'bar',
        x: labels,
        y: prices,
        name: 'Price',
        marker: { color: '#38bdf8' },
      },
      {
        type: 'scatter',
        mode: 'lines+markers',
        x: labels,
        y: changes,
        name: '% Change',
        yaxis: 'y2',
        line: { color: '#facc15' },
      },
    ];
  }, [positions]);

  const layout = useMemo<Partial<Layout>>(
    () => ({
      paper_bgcolor: 'rgba(15,23,42,0.6)',
      plot_bgcolor: 'rgba(15,23,42,0.6)',
      font: { color: '#f1f5f9' },
      margin: { l: 48, r: 48, t: 32, b: 32 },
      legend: { orientation: 'h', x: 0, y: 1.2 },
      yaxis: {
        title: 'Price (USD)',
        tickprefix: '$',
        gridcolor: 'rgba(148, 163, 184, 0.2)',
      },
      yaxis2: {
        title: 'Change %',
        overlaying: 'y',
        side: 'right',
        gridcolor: 'rgba(248, 250, 252, 0.1)',
      },
      responsive: true,
    }),
    []
  );

  return (
    <div className="performance-chart">
      <Plot data={data} layout={layout} config={{ displayModeBar: false, responsive: true }} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
