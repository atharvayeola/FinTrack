import './MetricCard.css';

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  variant?: 'default' | 'positive' | 'negative';
}

export function MetricCard({ label, value, delta, variant = 'default' }: MetricCardProps) {
  return (
    <div className={`metric-card metric-card--${variant}`}>
      <span className="metric-card__label">{label}</span>
      <span className="metric-card__value">{value}</span>
      {delta && <span className="metric-card__delta">{delta}</span>}
    </div>
  );
}
