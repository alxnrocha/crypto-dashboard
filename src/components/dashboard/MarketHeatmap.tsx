import React from 'react';

const HeatmapBlock = ({ 
  symbol, 
  change, 
  className 
}: { 
  symbol: string, 
  change: string, 
  className: string 
}) => {
  const isPositive = parseFloat(change) >= 0;
  const bgColor = isPositive ? 'bg-[#10B981]' : 'bg-[#EF4444]';
  
  return (
    <div className={`${bgColor} ${className} flex flex-col items-center justify-center rounded-sm transition-transform hover:scale-[1.02] cursor-pointer shadow-sm`}>
      <span className="text-white font-bold text-lg sm:text-2xl">{symbol}</span>
      <span className="text-white/90 font-medium text-xs sm:text-sm">{change}</span>
    </div>
  );
};

export function MarketHeatmap() {
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
        <HeatmapBlock symbol="BTC" change="-1.66%" className="col-span-2 row-span-2 bg-[#991B1B]" />
        
        {/* Row 1 Right */}
        <HeatmapBlock symbol="ETH" change="-2.06%" className="col-span-1 row-span-1 bg-[#B91C1C]" />
        <HeatmapBlock symbol="BNB" change="-2.60%" className="col-span-1 row-span-1 bg-[#B91C1C]" />
        
        {/* Row 2 Right */}
        <div className="col-span-2 grid grid-cols-3 gap-1">
          <HeatmapBlock symbol="SOL" change="-4.62%" className="col-span-1 bg-[#DC2626]" />
          <HeatmapBlock symbol="XRP" change="-3.56%" className="col-span-1 bg-[#DC2626]" />
          <HeatmapBlock symbol="USDT" change="+0.00%" className="col-span-1 bg-[#059669]" />
        </div>
        
        {/* Row 3 */}
        <HeatmapBlock symbol="USDC" change="-0.00%" className="col-span-1 bg-[#DC2626]" />
        <HeatmapBlock symbol="TRX" change="-1.04%" className="col-span-1 bg-[#B91C1C]" />
        <HeatmapBlock symbol="DOGE" change="-2.11%" className="col-span-1 bg-[#991B1B]" />
        <HeatmapBlock symbol="ADA" change="-3.21%" className="col-span-1 bg-[#B91C1C]" />
      </div>
    </div>
  );
}
