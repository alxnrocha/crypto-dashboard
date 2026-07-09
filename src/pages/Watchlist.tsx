import { useQuery } from '@tanstack/react-query';
import { getMarketCoins } from '../services/api';
import { useStore } from '../store/useStore';
import { Star } from 'lucide-react';

// user favorites page
export function Watchlist() {
  const { currency, toggleFavorite, favorites, searchQuery } = useStore();
  
  // reuse main query cache
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

  // filter favs only
  const watchlistCoins = coins?.filter(coin => favorites.includes(coin.id)) || [];
  
  // apply text search
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
        <h1 className="text-[13px] font-bold text-white mb-1">Your Portfolio</h1>
        <p className="text-[11px] font-semibold text-[#808A9D]">Manage your favorite cryptocurrency assets.</p>
      </div>

      {filteredCoins.length === 0 ? (
        <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4">
          <Star className="text-[#3A465B]" size={48} />
          <p className="text-[#5A657A] font-bold text-[13px]">You haven't added any coins to your watchlist yet.</p>
        </div>
      ) : (
        <div className="bg-[#151A27] border border-[#1E2532] rounded-xl overflow-hidden overflow-x-auto flex flex-col">
          <div className="min-w-[800px] flex-1">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-[#1E2532] grid grid-cols-12 gap-4 text-[11px] font-bold text-[#5A657A] uppercase tracking-wider items-center">
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-4"></div>
                <div className="w-4 text-center">#</div>
                <div className="pl-2">COIN</div>
              </div>
              <div className="col-span-2 text-right">PRICE</div>
              <div className="col-span-2 text-right">24H CHANGE</div>
              <div className="col-span-4 text-right pr-4">MARKET CAP</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#1E2532]">
              {filteredCoins.map((coin) => {
                const isFav = favorites.includes(coin.id);
                const isPositive = coin.price_change_percentage_24h >= 0;

                return (
                  <div key={coin.id} className="px-6 py-3 grid grid-cols-12 gap-4 items-center hover:bg-[#1C2333] transition-colors group cursor-pointer">
                    
                    {/* Coin Info Column */}
                    <div className="col-span-4 flex items-center gap-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.id); }}
                        className={`text-[#3A465B] hover:text-white transition-colors cursor-pointer ${isFav ? 'text-white' : ''}`}
                      >
                        <Star size={14} fill={isFav ? 'currentColor' : 'none'} strokeWidth={isFav ? 1 : 2} />
                      </button>
                      <span className="w-4 text-center text-[#5A657A] text-[13px] font-medium">{coin.market_cap_rank}</span>
                      <div className="flex items-center gap-3 pl-2">
                        <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
                        <div className="flex flex-col">
                          <span className="font-bold text-[13px] text-white">{coin.name}</span>
                          <span className="text-[11px] font-semibold text-[#5A657A] uppercase">{coin.symbol}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Column */}
                    <div className="col-span-2 text-right font-bold text-[13px] text-white">
                      {formatCurrency(coin.current_price)}
                    </div>

                    {/* 24h Change Column */}
                    <div className={`col-span-2 text-right font-bold text-[13px] ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                      {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </div>

                    {/* Market Cap Column */}
                    <div className="col-span-4 text-right font-bold text-[13px] text-white pr-4">
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
