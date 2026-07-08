import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';

const mockSparklineRed = Array.from({ length: 15 }).map(() => ({ value: Math.random() * 100 }));
const mockSparklineGreen = Array.from({ length: 15 }).map(() => ({ value: Math.random() * 100 + 50 }));

const Gauge = ({ value, label }: { value: number, label: string }) => {
  // Simple custom SVG gauge
  const radius = 40;
  const cx = 50;
  const cy = 45;
  
  // Calculate needle angle
  // 0 to 100 mapped to -180 to 0 degrees (or 180 to 360)
  const angle = 180 + (value / 100) * 180;
  const angleRad = (angle * Math.PI) / 180;
  const needleLength = 30;
  const nx = cx + needleLength * Math.cos(angleRad);
  const ny = cy + needleLength * Math.sin(angleRad);

  return (
    <div className="w-24 h-16 relative mt-1">
      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
        {/* Track segments */}
        {/* Red (0-33) */}
        <path d="M 10 45 A 40 40 0 0 1 30 10" fill="none" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
        {/* Yellow (33-66) */}
        <path d="M 30 10 A 40 40 0 0 1 70 10" fill="none" stroke="#F59E0B" strokeWidth="8" />
        {/* Green (66-100) */}
        <path d="M 70 10 A 40 40 0 0 1 90 45" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />
        
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r="4" fill="#E2E8F0" />
      </svg>
    </div>
  );
};

const Sparkline = ({ data, color }: { data: any[], color: string }) => (
  <div className="h-10 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2} 
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export function TopCards() {
  const cards = [
    {
      id: 1,
      title: "TOTAL MARKET CAP",
      value: "$2.45T",
      change: "-1.23%",
      isPositive: false,
      sparkline: mockSparklineRed,
    },
    {
      id: 2,
      title: "24H VOLUME",
      value: "$89.57B",
      change: "+5.75%",
      isPositive: true,
      sparkline: mockSparklineGreen,
    },
    {
      id: 3,
      title: "BTC DOMINANCE",
      value: "52.38%",
      change: "-0.68%",
      isPositive: false,
      sparkline: mockSparklineRed,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.id} className="bg-[#151A27] border border-[#1E2532] rounded-xl p-4 relative group">
          <button className="absolute top-3 right-3 text-[#3A465B] hover:text-[#808A9D] transition-colors">
            <X size={14} />
          </button>
          <h3 className="text-[11px] font-bold text-[#5A657A] uppercase tracking-wider mb-2">{card.title}</h3>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xl font-bold text-white mb-1">{card.value}</div>
              <div className={`text-xs font-bold ${card.isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {card.change}
              </div>
            </div>
            <Sparkline data={card.sparkline} color={card.isPositive ? '#10B981' : '#EF4444'} />
          </div>
        </div>
      ))}

      {/* Fear & Greed Card */}
      <div className="bg-[#151A27] border border-[#1E2532] rounded-xl p-4 relative group">
        <button className="absolute top-3 right-3 text-[#3A465B] hover:text-[#808A9D] transition-colors">
          <X size={14} />
        </button>
        <h3 className="text-[11px] font-bold text-[#5A657A] uppercase tracking-wider mb-2">FEAR & GREED INDEX</h3>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xl font-bold text-white mb-1">72</div>
            <div className="text-xs font-bold text-[#10B981]">Greed</div>
          </div>
          <Gauge value={72} label="Greed" />
        </div>
      </div>
    </div>
  );
}
