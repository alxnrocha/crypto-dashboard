import { useQuery } from '@tanstack/react-query';
import { getMarketCoins } from '../../services/api';
import { useStore } from '../../store/useStore';
import { Star, ChevronRight, ArrowRight } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

// mini sparkline chart
const Sparkline = ({ color }: { color: string }) => {
  // random sine wave to make it look legit
  const data = Array.from({ length: 20 }).map((_, i) => ({
    value: 50 + Math.random() * 20 + Math.sin(i) * 10
  }));
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={1.5} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export function CoinTable() {
  const { currency, toggleFavorite, favorites, searchQuery } = useStore();
  
  const { data: coins, isLoading, isError } = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => getMarketCoins(currency),
    // 60s poll to prevent 429 from coingecko
    refetchInterval: 60000, 
  });

  if (isLoading && !coins) {
    return (
      <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-8 text-center text-[#5A657A] animate-pulse">
        Loading market data...
      </div>
    );
  }

  // fallback to avoid breaking layout
  if (isError && !coins) {
    return (
      <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-8 text-center text-[#EF4444]">
        Failed to load market data. Please try again later.
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: val < 1 ? 4 : 2,
    }).format(val);
  };

  // search filter
  const filteredCoins = coins?.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#151A27] border border-[#1E2532] rounded-xl overflow-hidden overflow-x-auto flex flex-col">
      <div className="min-w-[800px] flex-1">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-[#1E2532] grid grid-cols-12 gap-4 text-[11px] font-bold text-[#5A657A] uppercase tracking-wider items-center">
          <div className="col-span-4 flex items-center gap-4">
            <div className="w-4"></div> {/* Star placeholder */}
            <div className="w-4 text-center">#</div>
            <div className="pl-2">COIN</div>
          </div>
          <div className="col-span-2 text-right">PRICE</div>
          <div className="col-span-2 text-right">24H CHANGE</div>
          <div className="col-span-2 text-right">MARKET CAP</div>
          <div className="col-span-2 text-right pr-4">LAST 7 DAYS</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#1E2532]">
          {filteredCoins?.slice(0, 10).map((coin) => {
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
                <div className="col-span-2 text-right font-bold text-[13px] text-white">
                  {formatCurrency(coin.market_cap)}
                </div>

                {/* Last 7 Days Sparkline & Chevron */}
                <div className="col-span-2 flex items-center justify-end gap-6 pr-1">
                  <Sparkline color={isPositive ? '#10B981' : '#EF4444'} />
                  <ChevronRight size={14} className="text-[#3A465B] group-hover:text-white transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Button */}
      <button className="w-full py-4 border-t border-[#1E2532] text-[13px] font-bold text-[#808A9D] hover:text-white hover:bg-[#1C2333] transition-colors flex items-center justify-center gap-2">
        View all coins <ArrowRight size={14} />
      </button>
    </div>
  );
}
