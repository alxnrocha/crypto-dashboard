import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

const generateMockData = () => {
  const data = [];
  let price = 2.2;
  for (let i = 10; i <= 16; i++) {
    for (let j = 0; j < 4; j++) {
      price = price + (Math.random() - 0.45) * 0.05;
      data.push({
        time: `May ${i}`,
        price: price,
        formattedPrice: `$${price.toFixed(2)}T`,
      });
    }
  }
  return data;
};

const data = generateMockData();

export function CoinChart() {
  const { currency } = useStore();
  const [range, setRange] = useState('7D');
  const [metric, setMetric] = useState('Market Cap');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#151A27] border border-[#1E2532] p-3 rounded-lg shadow-xl shadow-blue-900/10">
          <p className="text-[#808A9D] text-[11px] mb-1 font-medium">{label}, 2024</p>
          <p className="text-[#3B82F6] font-bold text-sm">{payload[0].payload.formattedPrice}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-6 h-[400px] flex flex-col relative group">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-[13px] font-bold text-white">Market Chart</h2>
          <div className="flex items-center bg-[#0B0E14] rounded-lg p-1">
            <button
              onClick={() => setMetric('Market Cap')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors ${
                metric === 'Market Cap' 
                  ? 'bg-[#1E2532] text-white' 
                  : 'text-[#5A657A] hover:text-[#808A9D]'
              }`}
            >
              Market Cap
            </button>
            <button
              onClick={() => setMetric('Volume')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors ${
                metric === 'Volume' 
                  ? 'bg-[#1E2532] text-white' 
                  : 'text-[#5A657A] hover:text-[#808A9D]'
              }`}
            >
              Volume
            </button>
          </div>
        </div>

        <div className="flex gap-1">
          {['1D', '7D', '1M', '3M', '1Y', 'ALL'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                range === r 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20' 
                  : 'text-[#5A657A] hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 -mx-2 -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#5A657A', fontSize: 11, fontWeight: 500 }}
              dy={10}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#5A657A', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(val) => `$${val.toFixed(2)}T`}
              dx={-10}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1E2532', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#3B82F6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              activeDot={{ r: 6, fill: '#3B82F6', stroke: '#0B0E14', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
