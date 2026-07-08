import { Search, Moon, Bell, ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-20 border-b border-crypto-border bg-crypto-bg flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-crypto-muted group-focus-within:text-crypto-accent transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search coins, markets..."
            className="w-full bg-crypto-card border border-crypto-border rounded-lg pl-10 pr-12 py-2.5 text-sm text-crypto-text focus:outline-none focus:border-crypto-accent transition-colors placeholder:text-crypto-muted"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-crypto-muted bg-crypto-hover border border-crypto-border rounded shadow-sm">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <div className="flex items-center gap-1 cursor-pointer bg-crypto-card border border-crypto-border px-3 py-1.5 rounded-lg hover:border-crypto-accent transition-colors">
          <span className="text-sm font-medium">USD</span>
          <ChevronDown size={14} className="text-crypto-muted" />
        </div>

        <button className="p-2 text-crypto-muted hover:text-white hover:bg-crypto-hover rounded-lg transition-colors">
          <Moon size={20} />
        </button>

        <button className="p-2 text-crypto-muted hover:text-white hover:bg-crypto-hover rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-crypto-accent rounded-full border-2 border-crypto-bg"></span>
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 cursor-pointer border-2 border-crypto-bg ring-1 ring-crypto-border ml-2"></div>
      </div>
    </header>
  );
}
