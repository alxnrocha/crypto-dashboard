import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

// Mock data for the chart since the real historical API from CoinGecko is complex without a specific coin selected
const generateMockData = () => {
  return Array.from({ length: 30 }).map((_, i) => ({
    time: `Day ${i + 1}`,
    price: 40000 + Math.random() * 5000 + (i * 200),
  }));
};

const data = generateMockData();

export function CoinChart() {
  const { currency } = useStore();
  const [range, setRange] = useState('30D');

  return (
    <div className="bg-crypto-card border border-crypto-border rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Market Trend (Bitcoin)</h2>
          <p className="text-sm text-crypto-muted">Price history in {currency}</p>
        </div>
        <div className="flex gap-2">
          {['7D', '30D', '1Y'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                range === r 
                  ? 'bg-crypto-accent text-white' 
                  : 'bg-crypto-bg text-crypto-muted hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-crypto-accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-crypto-accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--color-crypto-hover)', borderColor: 'var(--color-crypto-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--color-crypto-accent)' }}
              labelStyle={{ color: 'var(--color-crypto-muted)', marginBottom: '4px' }}
              formatter={(value: number) => [
                new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value), 
                'Price'
              ]}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="var(--color-crypto-accent)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
