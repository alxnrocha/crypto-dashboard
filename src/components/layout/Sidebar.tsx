import { LayoutDashboard, Star, Briefcase, Bell, Newspaper, Coins, ArrowRightLeft, LayoutGrid, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const mainNav = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Star, label: "Watchlist", href: "/watchlist" },
    { icon: Briefcase, label: "Portfolio", href: "#" },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-crypto-border bg-crypto-bg flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-crypto-border">
        <div className="w-8 h-8 bg-crypto-accent rounded-lg flex items-center justify-center">
          <Coins size={18} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Lumina<span className="text-crypto-accent">.</span></h1>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
        <div>
          <h3 className="px-4 text-xs font-semibold text-crypto-muted uppercase tracking-wider mb-3">Menu</h3>
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.href !== "#" ? (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors ${
                        isActive
                          ? "bg-crypto-accent/10 text-crypto-accent"
                          : "text-crypto-muted hover:text-white hover:bg-crypto-hover"
                      }`
                    }
                  >
                    <item.icon size={18} />
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors text-crypto-muted hover:text-white hover:bg-crypto-hover"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
