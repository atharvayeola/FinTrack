export interface AssetMetric {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  volume: number;
  timestamp: number;
}

export interface PortfolioSnapshot {
  totalValue: number;
  dailyPnL: number;
  cash: number;
  positions: AssetMetric[];
}

export interface RealtimePayload {
  snapshot: PortfolioSnapshot;
  updatedAt: number;
}
