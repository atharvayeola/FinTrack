import { AssetMetric, PortfolioSnapshot } from '../types/financial';

const SYMBOLS = ['AAPL', 'AMZN', 'GOOG', 'MSFT', 'TSLA', 'NFLX'];

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateAssetMetric(symbol: string, basePrice: number): AssetMetric {
  const priceFluctuation = randomBetween(-5, 5);
  const price = Math.max(1, basePrice + priceFluctuation);
  const previousClose = basePrice;
  const change = price - previousClose;
  const changePct = (change / previousClose) * 100;
  const volume = Math.floor(randomBetween(50_000, 1_500_000));

  return {
    symbol,
    price: parseFloat(price.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePct: parseFloat(changePct.toFixed(2)),
    volume,
    timestamp: Date.now(),
  };
}

export function buildSnapshot(): PortfolioSnapshot {
  const positions = SYMBOLS.map((symbol) => {
    const basePrice = randomBetween(50, 350);
    return generateAssetMetric(symbol, basePrice);
  });

  const totalValue = positions.reduce((sum, position) => sum + position.price * 100, 0);
  const dailyPnL = randomBetween(-5_000, 5_000);
  const cash = randomBetween(10_000, 50_000);

  return {
    totalValue: parseFloat(totalValue.toFixed(2)),
    dailyPnL: parseFloat(dailyPnL.toFixed(2)),
    cash: parseFloat(cash.toFixed(2)),
    positions,
  };
}
