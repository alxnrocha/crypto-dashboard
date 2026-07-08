import { useQuery } from '@tanstack/react-query';
import { getMarketCoins } from '../services/api';
import { useStore } from '../store/useStore';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

export function Watchlist() {
  const { currency, toggleFavorite, favorites, searchQuery } = useStore();
  const { data: coins, isLoading, isError } = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => getMarketCoins(currency),
  });

  if (isLoading) {
    return <div className="text-crypto-muted animate-pulse">Loading watchlist...</div>;
  }

  if (isError) {
    return <div className="text-crypto-red">Failed to load watchlist.</div>;
  }

  const watchlistCoins = coins?.filter(coin => favorites.includes(coin.id)) || [];
  const filteredCoins = watchlistCoins.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: val < 1 ? 4 : 2,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Your Portfolio</h1>
        <p className="text-sm text-crypto-muted">Manage your favorite cryptocurrency assets.</p>
      </div>

      {filteredCoins.length === 0 ? (
        <div className="bg-crypto-card border border-crypto-border rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4">
          <Star className="text-crypto-muted/30" size={48} />
          <p className="text-crypto-muted">You haven't added any coins to your watchlist yet.</p>
        </div>
      ) : (
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
              {filteredCoins.map((coin) => {
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
      )}
    </div>
  );
}
