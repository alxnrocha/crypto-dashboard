import { LayoutDashboard, Star, Briefcase, Bell, Newspaper, Coins, ArrowRightLeft, LayoutGrid, TrendingUp } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-crypto-border bg-crypto-bg flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-crypto-accent rounded-lg flex items-center justify-center">
          <TrendingUp size={18} className="text-white" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-white">Cryptoflow</h1>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
        <div>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-crypto-accent/10 text-crypto-accent font-medium">
                <LayoutDashboard size={18} />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crypto-muted hover:bg-crypto-hover hover:text-crypto-text transition-colors">
                <Star size={18} />
                Watchlist
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crypto-muted hover:bg-crypto-hover hover:text-crypto-text transition-colors">
                <Briefcase size={18} />
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crypto-muted hover:bg-crypto-hover hover:text-crypto-text transition-colors">
                <Bell size={18} />
                Alerts
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crypto-muted hover:bg-crypto-hover hover:text-crypto-text transition-colors">
                <Newspaper size={18} />
                News
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="px-3 text-xs font-semibold text-crypto-muted tracking-wider uppercase mb-3">Markets</h2>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crypto-muted hover:bg-crypto-hover hover:text-crypto-text transition-colors">
                <Coins size={18} />
                Coins
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crypto-muted hover:bg-crypto-hover hover:text-crypto-text transition-colors">
                <ArrowRightLeft size={18} />
                Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crypto-muted hover:bg-crypto-hover hover:text-crypto-text transition-colors">
                <LayoutGrid size={18} />
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-crypto-muted hover:bg-crypto-hover hover:text-crypto-text transition-colors">
                <TrendingUp size={18} />
                Trending
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-crypto-card border border-crypto-border rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Bell size={14} className="text-crypto-accent opacity-50" />
          </div>
          <h3 className="font-medium text-white mb-1">Stay updated!</h3>
          <p className="text-xs text-crypto-muted mb-3 leading-relaxed">
            Enable notifications and never miss important market movements.
          </p>
          <button className="w-full bg-crypto-accent hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg transition-colors">
            Enable Alerts
          </button>
        </div>
      </div>
    </aside>
  );
}
