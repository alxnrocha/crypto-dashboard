import { 
  LayoutDashboard, 
  Heart, 
  Briefcase, 
  Bell, 
  Newspaper, 
  Coins, 
  LayoutGrid, 
  ListTree, 
  TrendingUp,
  Activity
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../store/useStore";

// sidebar nav
export function Sidebar() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useStore();

  // main routes
  const mainNav = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Heart, label: "Watchlist", href: "/watchlist" },
    { icon: Briefcase, label: "Portfolio", href: "#" },
    { icon: Bell, label: "Alerts", href: "#" },
    { icon: Newspaper, label: "News", href: "#" },
  ];

  // secondary filters (todo: wire these up later)
  const marketsNav = [
    { icon: Coins, label: "Coins", href: "#" },
    { icon: LayoutGrid, label: "Exchanges", href: "#" },
    { icon: ListTree, label: "Categories", href: "#" },
    { icon: TrendingUp, label: "Trending", href: "#" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[260px] flex-shrink-0 border-r border-[#1E2532] bg-[#0B0E14] flex flex-col h-screen
        transform transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Activity size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Cryptoflow</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 custom-scrollbar flex flex-col">
        {/* Main Menu */}
        <div>
          <ul className="space-y-1.5">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.href !== "#" ? (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                          : "text-[#808A9D] hover:text-white hover:bg-[#151A27]"
                      }`
                    }
                  >
                    <item.icon size={18} strokeWidth={2.5} />
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all text-[#808A9D] hover:text-white hover:bg-[#151A27]"
                  >
                    <item.icon size={18} strokeWidth={2.5} />
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Markets Menu */}
        <div>
          <h3 className="px-4 text-[11px] font-bold text-[#5A657A] uppercase tracking-wider mb-4">Markets</h3>
          <ul className="space-y-1.5">
            {marketsNav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all text-[#808A9D] hover:text-white hover:bg-[#151A27]"
                >
                  <item.icon size={18} strokeWidth={2.5} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>


        {/* Stay Updated Box */}
        <div className="mx-2 mt-4 relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#182235] to-[#0F1523] border border-[#1E293B] p-5">
          <div className="absolute top-0 right-0 p-3 opacity-20">
             <Bell size={48} className="text-blue-400 rotate-12" />
          </div>
          <h4 className="text-white font-bold text-sm mb-2 relative z-10">Stay updated!</h4>
          <p className="text-[#808A9D] text-[11px] leading-relaxed mb-4 relative z-10 font-medium">
            Enable notifications and never miss important market movements.
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-lg transition-colors relative z-10 cursor-pointer">
            Enable Alerts
          </button>
        </div>
      </div>


    </aside>
    </>
  );
}
