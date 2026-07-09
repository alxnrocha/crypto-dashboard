import { useQuery } from '@tanstack/react-query';
import { getMarketCoins } from '../../services/api';
import { useStore } from '../../store/useStore';

// individual block for the heatmap grid
const HeatmapBlock = ({ 
  symbol, 
  change, 
  className 
}: { 
  symbol: string, 
  change: number, 
  className: string 
}) => {
  // pick bg color based on how hard it dumped or pumped
  const getBgColor = (val: number) => {
    const absVal = Math.abs(val);
    if (val >= 0) {
      if (absVal > 5) return 'bg-[#047857]'; // strong green
      if (absVal > 2) return 'bg-[#059669]'; // medium green
      return 'bg-[#10B981]'; // light green
    } else {
      if (absVal > 5) return 'bg-[#991B1B]'; // strong red
      if (absVal > 2) return 'bg-[#B91C1C]'; // medium red
      return 'bg-[#DC2626]'; // light red
    }
  };

  const bgColor = getBgColor(change);
  
  return (
    <div className={`${bgColor} ${className} flex flex-col items-center justify-center rounded-sm transition-transform hover:scale-[1.02] cursor-pointer shadow-sm`}>
      <span className="text-white font-bold text-lg sm:text-2xl">{symbol}</span>
      <span className="text-white/90 font-medium text-xs sm:text-sm">
        {change > 0 ? '+' : ''}{change.toFixed(2)}%
      </span>
    </div>
  );
};

// visual heatmap
export function MarketHeatmap() {
  const { currency } = useStore();
  const { data: coins } = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => getMarketCoins(currency),
    staleTime: Infinity,
  });

  // Default fallback values if API hasn't loaded
  const getCoinData = (sym: string, defaultChange: number) => {
    if (!coins) return defaultChange;
    const coin = coins.find(c => c.symbol.toLowerCase() === sym.toLowerCase());
    return coin ? coin.price_change_percentage_24h : defaultChange;
  };

  return (
    <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white text-[13px]">Market Heatmap</h3>
        <button className="px-3 py-1 bg-[#1E2532] hover:bg-[#2A3441] text-white text-[11px] font-bold rounded-lg transition-colors">
          View full map
        </button>
      </div>
      
      <div className="flex-1 grid grid-cols-4 grid-rows-3 gap-1 overflow-hidden rounded-md">
        {/* Row 1 & 2 Left - BTC */}
        <HeatmapBlock symbol="BTC" change={getCoinData('btc', 0)} className="col-span-2 row-span-2" />
        
        {/* Row 1 Right */}
        <HeatmapBlock symbol="ETH" change={getCoinData('eth', 0)} className="col-span-1 row-span-1" />
        <HeatmapBlock symbol="BNB" change={getCoinData('bnb', 0)} className="col-span-1 row-span-1" />
        
        {/* Row 2 Right */}
        <div className="col-span-2 grid grid-cols-3 gap-1">
          <HeatmapBlock symbol="SOL" change={getCoinData('sol', 0)} className="col-span-1" />
          <HeatmapBlock symbol="XRP" change={getCoinData('xrp', 0)} className="col-span-1" />
          <HeatmapBlock symbol="USDT" change={getCoinData('usdt', 0)} className="col-span-1" />
        </div>
        
        {/* Row 3 */}
        <HeatmapBlock symbol="USDC" change={getCoinData('usdc', 0)} className="col-span-1" />
        <HeatmapBlock symbol="TRX" change={getCoinData('trx', 0)} className="col-span-1" />
        <HeatmapBlock symbol="DOGE" change={getCoinData('doge', 0)} className="col-span-1" />
        <HeatmapBlock symbol="ADA" change={getCoinData('ada', 0)} className="col-span-1" />
      </div>
    </div>
  );
}
