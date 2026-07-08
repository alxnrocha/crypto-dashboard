import { CoinTable } from "../components/dashboard/CoinTable";
import { CoinChart } from "../components/dashboard/CoinChart";
import { MarketHighlights } from "../components/dashboard/MarketHighlights";

export function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Market Overview</h1>
        <p className="text-sm text-crypto-muted">Track the top cryptocurrencies in real-time.</p>
      </div>

      {/* Top Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-crypto-card border border-crypto-border rounded-xl h-24 animate-pulse"></div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (Table & Chart) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
          <CoinChart />
          <CoinTable />
        </div>

        {/* Right Column (Gainers, Losers, Heatmap) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          <MarketHighlights />
        </div>
      </div>
    </div>
  );
}
