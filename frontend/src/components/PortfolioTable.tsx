import { AssetMetric } from '../types/financial';
import './PortfolioTable.css';

interface PortfolioTableProps {
  positions: AssetMetric[];
}

export function PortfolioTable({ positions }: PortfolioTableProps) {
  return (
    <div className="portfolio-table">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>% Change</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.symbol}>
              <td>{position.symbol}</td>
              <td>${position.price.toFixed(2)}</td>
              <td className={position.change >= 0 ? 'positive' : 'negative'}>
                {position.change >= 0 ? '+' : ''}
                {position.change.toFixed(2)}
              </td>
              <td className={position.changePct >= 0 ? 'positive' : 'negative'}>
                {position.changePct >= 0 ? '+' : ''}
                {position.changePct.toFixed(2)}%
              </td>
              <td>{position.volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
