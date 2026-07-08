import { useQuery } from '@tanstack/react-query';
import { getMarketCoins } from '../../services/api';
import { useStore } from '../../store/useStore';
import { TrendingUp, TrendingDown, Flame } from 'lucide-react';

export function MarketHighlights() {
  const { currency } = useStore();
  const { data: coins, isLoading } = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => getMarketCoins(currency),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-crypto-card border border-crypto-border rounded-xl p-6">
            <div className="h-5 w-32 bg-crypto-border rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-crypto-border rounded-full animate-pulse"></div>
                    <div className="h-4 w-16 bg-crypto-border rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 w-12 bg-crypto-border rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!coins) return null;

  const sortedByChange = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  const topGainers = sortedByChange.slice(0, 3);
  const topLosers = sortedByChange.slice(-3).reverse();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: val < 1 ? 4 : 2,
    }).format(val);
  };

  const HighlightList = ({ title, items, isGainer }: { title: string, items: typeof coins, isGainer: boolean }) => (
    <div className="bg-crypto-card border border-crypto-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className={isGainer ? 'text-crypto-green' : 'text-crypto-red'} size={18} />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map((coin) => (
          <div key={coin.id} className="flex justify-between items-center group cursor-pointer hover:bg-crypto-hover p-2 -mx-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm group-hover:text-crypto-accent transition-colors">{coin.name}</span>
                <span className="text-xs text-crypto-muted uppercase">{coin.symbol}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-white">{formatCurrency(coin.current_price)}</span>
              <div className={`flex items-center gap-1 text-xs font-medium ${isGainer ? 'text-crypto-green' : 'text-crypto-red'}`}>
                {isGainer ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <HighlightList title="Top Gainers" items={topGainers} isGainer={true} />
      <HighlightList title="Top Losers" items={topLosers} isGainer={false} />
    </div>
  );
}
