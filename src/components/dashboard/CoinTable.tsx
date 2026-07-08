import { useQuery } from '@tanstack/react-query';
import { getMarketCoins } from '../../services/api';
import { useStore } from '../../store/useStore';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

export function CoinTable() {
  const { currency, toggleFavorite, favorites } = useStore();
  const { data: coins, isLoading, isError } = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => getMarketCoins(currency),
  });

  if (isLoading) {
    return (
      <div className="bg-crypto-card border border-crypto-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-crypto-border grid grid-cols-12 gap-4 text-xs font-semibold text-crypto-muted uppercase">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Coin</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">24h Change</div>
          <div className="col-span-3 text-right">Market Cap</div>
        </div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="p-4 border-b border-crypto-border grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1"><div className="h-4 w-4 bg-crypto-border rounded animate-pulse"></div></div>
            <div className="col-span-4 flex gap-3">
              <div className="h-8 w-8 bg-crypto-border rounded-full animate-pulse"></div>
              <div className="flex flex-col gap-1 w-full max-w-[120px]">
                <div className="h-4 w-full bg-crypto-border rounded animate-pulse"></div>
                <div className="h-3 w-2/3 bg-crypto-border rounded animate-pulse"></div>
              </div>
            </div>
            <div className="col-span-2 flex justify-end"><div className="h-4 w-16 bg-crypto-border rounded animate-pulse"></div></div>
            <div className="col-span-2 flex justify-end"><div className="h-4 w-12 bg-crypto-border rounded animate-pulse"></div></div>
            <div className="col-span-3 flex justify-end"><div className="h-4 w-24 bg-crypto-border rounded animate-pulse"></div></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 bg-crypto-card rounded-xl text-crypto-red border border-crypto-red/30 text-center">Failed to load cryptocurrency data. Please try again later.</div>;
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: val < 1 ? 4 : 2,
    }).format(val);
  };

  return (
    <div className="bg-crypto-card border border-crypto-border rounded-xl overflow-hidden overflow-x-auto">
      <div className="min-w-[700px]">
        <div className="p-4 border-b border-crypto-border grid grid-cols-12 gap-4 text-xs font-semibold text-crypto-muted uppercase tracking-wider">
          <div className="col-span-1 pl-2">#</div>
          <div className="col-span-4">Coin</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">24h Change</div>
          <div className="col-span-3 text-right pr-4">Market Cap</div>
        </div>

        <div className="divide-y divide-crypto-border">
          {coins?.slice(0, 50).map((coin) => {
            const isFav = favorites.includes(coin.id);
            const isPositive = coin.price_change_percentage_24h >= 0;

            return (
              <div key={coin.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-crypto-hover transition-colors group cursor-pointer">
                <div className="col-span-1 flex items-center gap-2 pl-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.id); }}
                    className={`text-crypto-muted hover:text-yellow-400 transition-colors ${isFav ? 'text-yellow-400' : ''}`}
                  >
                    <Star size={16} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                  <span className="text-crypto-muted text-sm">{coin.market_cap_rank}</span>
                </div>
                
                <div className="col-span-4 flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-white group-hover:text-crypto-accent transition-colors">{coin.name}</span>
                    <span className="text-xs text-crypto-muted uppercase">{coin.symbol}</span>
                  </div>
                </div>

                <div className="col-span-2 text-right font-medium text-white">
                  {formatCurrency(coin.current_price)}
                </div>

                <div className={`col-span-2 flex items-center justify-end gap-1 font-medium ${isPositive ? 'text-crypto-green' : 'text-crypto-red'}`}>
                  {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>

                <div className="col-span-3 text-right font-medium text-white pr-4">
                  {formatCurrency(coin.market_cap)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
