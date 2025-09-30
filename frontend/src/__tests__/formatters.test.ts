import { formatCurrency, formatPnL } from '../utils/formatters';

describe('formatters', () => {
  it('formats currency with USD style', () => {
    expect(formatCurrency(12345)).toBe('$12,345');
  });

  it('returns placeholder for undefined currency', () => {
    expect(formatCurrency(undefined)).toBe('--');
  });

  it('formats positive and negative PnL correctly', () => {
    expect(formatPnL(1500)).toBe('+$1,500');
    expect(formatPnL(-1500)).toBe('-$1,500');
    expect(formatPnL(undefined)).toBe('--');
  });
});
