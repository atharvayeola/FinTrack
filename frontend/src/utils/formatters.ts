export function formatCurrency(value: number | undefined): string {
  if (value === undefined) return '--';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPnL(value: number | undefined): string {
  if (value === undefined) return '--';
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${formatCurrency(Math.abs(value))}`;
}
