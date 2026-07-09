import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useState, useMemo } from 'react';

// hack: mocking historical data since coingecko free tier doesn't give us timeseries
const generateMockData = (range: string, metric: string) => {
  const data = [];
  let length = 24;
  let volatility = 0.05;
  
  // adjust volatility based on time range
  if (range === '1D') { length = 24; volatility = 0.02; }
  else if (range === '7D') { length = 7; volatility = 0.04; }
  else if (range === '1M') { length = 30; volatility = 0.06; }
  else if (range === '3M') { length = 90; volatility = 0.08; }
  else if (range === '1Y') { length = 12; volatility = 0.2; }
  else if (range === 'ALL') { length = 48; volatility = 0.3; }

  let baseValue = metric === 'Market Cap' ? 2.2 : 80.5;
  const suffix = metric === 'Market Cap' ? 'T' : 'B';

  for (let i = 1; i <= length; i++) {
    // fake price action
    baseValue = baseValue + (Math.random() - 0.45) * volatility;
    
    let label = '';
    // format labels
    if (range === '1D') label = `${i}:00`;
    else if (range === '7D') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      label = days[(i - 1) % 7];
    } else if (range === '1Y') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      label = months[(i - 1) % 12];
    } else if (range === 'ALL') {
      label = `20${19 + Math.floor(i / 12)}`;
    } else {
      label = `Day ${i}`;
    }

    data.push({
      time: label,
      value: baseValue,
      formattedValue: `$${baseValue.toFixed(2)}${suffix}`,
    });
  }
  return data;
};

// main chart
export function CoinChart() {
  const [range, setRange] = useState('7D');
  const [metric, setMetric] = useState('Market Cap');

  // memoize to avoid lag when changing tabs
  const chartData = useMemo(() => generateMockData(range, metric), [range, metric]);
  const isVolume = metric === 'Volume';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#151A27] border border-[#1E2532] p-3 rounded-lg shadow-xl shadow-blue-900/10">
          <p className="text-[#808A9D] text-[11px] mb-1 font-medium">{label}</p>
          <p className="text-[#3B82F6] font-bold text-sm">{payload[0].payload.formattedValue}</p>
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
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isVolume ? "#10B981" : "#3B82F6"} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={isVolume ? "#10B981" : "#3B82F6"} stopOpacity={0}/>
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
              tickFormatter={(val) => `$${val.toFixed(2)}${isVolume ? 'B' : 'T'}`}
              dx={-10}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1E2532', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isVolume ? "#10B981" : "#3B82F6"} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              activeDot={{ r: 6, fill: isVolume ? "#10B981" : "#3B82F6", stroke: '#0B0E14', strokeWidth: 3 }}
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
