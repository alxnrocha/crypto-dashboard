import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getMarketCoins } from '../../services/api';
import { useStore } from '../../store/useStore';

// dummy data for the top cards sparklines
const mockSparklineRed = Array.from({ length: 15 }).map(() => ({ value: Math.random() * 100 }));
const mockSparklineGreen = Array.from({ length: 15 }).map(() => ({ value: Math.random() * 100 + 50 }));

// simple svg gauge
const Gauge = ({ value }: { value: number }) => {
  const cx = 50;
  const cy = 50;
  const r = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * r;
  // calc stroke offset for the arc
  const offset = circumference - (value / 100) * (circumference / 2);

  return (
    <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
      <svg className="w-full h-full transform -rotate-180" viewBox="0 0 100 100">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#1E2532"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference / 2}
          strokeLinecap="round"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center -mt-2">
        <span className="text-white font-bold text-sm leading-none">{value}</span>
      </div>
    </div>
  );
};

// top row stat cards
export function TopCards() {
  const { currency } = useStore();
  const { data: coins } = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => getMarketCoins(currency),
    staleTime: Infinity,
  });

  // compute global stats from the top 100 array so we don't need a separate api call
  const totalMarketCap = coins?.reduce((acc, coin) => acc + coin.market_cap, 0) || 2450000000000;
  const totalVolume = coins?.reduce((acc, coin) => acc + coin.total_volume, 0) || 89570000000;
  const btcCoin = coins?.find(c => c.symbol.toLowerCase() === 'btc');
  const btcDominance = btcCoin ? (btcCoin.market_cap / totalMarketCap) * 100 : 52.38;

  // Formatters
  const formatTrillion = (val: number) => `$${(val / 1e12).toFixed(2)}T`;
  const formatBillion = (val: number) => `$${(val / 1e9).toFixed(2)}B`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Total Market Cap */}
      <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-4 relative group">
        <h3 className="text-[11px] font-bold text-[#5A657A] uppercase tracking-wider mb-2">Total Market Cap</h3>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-white mb-1">{formatTrillion(totalMarketCap)}</div>
            <div className="text-[11px] font-bold text-[#EF4444]">-1.23%</div>
          </div>
          <div className="w-20 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSparklineRed}>
                <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 24h Volume */}
      <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-4 relative group">
        <h3 className="text-[11px] font-bold text-[#5A657A] uppercase tracking-wider mb-2">24h Volume</h3>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-white mb-1">{formatBillion(totalVolume)}</div>
            <div className="text-[11px] font-bold text-[#10B981]">+5.75%</div>
          </div>
          <div className="w-20 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSparklineGreen}>
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BTC Dominance */}
      <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-4 relative group">
        <h3 className="text-[11px] font-bold text-[#5A657A] uppercase tracking-wider mb-2">BTC Dominance</h3>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-white mb-1">{btcDominance.toFixed(2)}%</div>
            <div className="text-[11px] font-bold text-[#EF4444]">-0.68%</div>
          </div>
          <div className="w-20 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSparklineRed}>
                <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fear & Greed */}
      <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-4 relative group">
        <h3 className="text-[11px] font-bold text-[#5A657A] uppercase tracking-wider mb-2">Fear & Greed Index</h3>
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-xl font-bold text-white mb-1">72</div>
            <div className="text-[11px] font-bold text-[#10B981]">Greed</div>
          </div>
          <Gauge value={72} />
        </div>
      </div>

    </div>
  );
}
