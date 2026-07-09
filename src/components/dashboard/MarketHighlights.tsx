import { useQuery } from '@tanstack/react-query';
import { getMarketCoins } from '../../services/api';
import { useStore } from '../../store/useStore';

// highlights panel (gainers/losers)
export function MarketHighlights() {
  const { currency } = useStore();
  const { data: coins, isLoading, isError } = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => getMarketCoins(currency),
    // 60s polling
    refetchInterval: 60000,
  });

  if (isLoading && !coins) {
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="bg-[#151A27] border border-[#1E2532] rounded-xl flex-1 animate-pulse"></div>
        <div className="bg-[#151A27] border border-[#1E2532] rounded-xl flex-1 animate-pulse"></div>
      </div>
    );
  }

  // fallback to avoid ui crash
  if (isError && !coins) {
    return (
      <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-8 text-center text-[#EF4444]">
        Failed to load highlights.
      </div>
    );
  }

  if (!coins) return null;

  // sort and get extremes
  const sortedByChange = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  const topGainers = sortedByChange.slice(0, 3);
  const topLosers = sortedByChange.slice(-3).reverse();

  const formatCurrency = (val: number) => {
    return val >= 1 
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(val)
      : `$${val.toFixed(6)}`;
  };

  const HighlightList = ({ title, items, isGainer }: { title: string, items: typeof coins, isGainer: boolean }) => (
    <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-5 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white text-[13px]">{title}</h3>
        <button className="px-3 py-1 bg-[#1E2532] hover:bg-[#2A3441] text-white text-[11px] font-bold rounded-lg transition-colors">
          View all
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((coin, index) => (
          <div key={coin.id} className="flex items-center group cursor-pointer hover:bg-[#1C2333] p-2 -mx-2 rounded-xl transition-colors">
            
            {/* Rank Number */}
            <span className="text-[#5A657A] text-[11px] font-bold w-4">{index + 1}</span>
            
            {/* Coin Info */}
            <div className="flex items-center gap-3 flex-1 ml-2">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <div className="flex flex-col">
                <span className="font-bold text-white text-[13px] group-hover:text-blue-400 transition-colors">{coin.name}</span>
                <span className="text-[11px] font-semibold text-[#5A657A] uppercase">{coin.symbol}</span>
              </div>
            </div>

            {/* Price & Change */}
            <div className="flex items-center gap-6">
              <span className="text-[13px] font-bold text-white w-20 text-right">{formatCurrency(coin.current_price)}</span>
              <div className={`text-[12px] font-bold w-16 text-right ${isGainer ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {isGainer ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      <HighlightList title="Top Gainers" items={topGainers} isGainer={true} />
      <HighlightList title="Top Losers" items={topLosers} isGainer={false} />
    </div>
  );
}
