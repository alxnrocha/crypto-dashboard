import { Search, Moon, Bell, ChevronDown } from "lucide-react";
import { useStore } from "../../store/useStore";

// top nav bar
export function TopBar() {
  // bind search to global store
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <header className="h-20 bg-[#0B0E14] flex items-center justify-end px-8 sticky top-0 z-10 gap-6">
      
      {/* Search Bar */}
      <div className="relative group w-80">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A657A] group-focus-within:text-white transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search coins, markets..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#151A27] border border-[#1E2532] rounded-xl py-2.5 pl-11 pr-12 text-[13px] text-white placeholder-[#5A657A] focus:outline-none focus:border-[#2A3441] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          <kbd className="inline-block px-2 py-1 text-[10px] font-bold text-[#5A657A] bg-[#1E2532] rounded-md">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Currency Selector */}
      <button className="flex items-center gap-2 bg-[#151A27] border border-[#1E2532] hover:bg-[#1E2532] transition-colors rounded-xl px-4 py-2.5">
        <span className="text-[13px] font-semibold text-white">USD</span>
        <ChevronDown size={14} className="text-[#5A657A]" strokeWidth={3} />
      </button>

      {/* Action Icons */}
      <div className="flex items-center gap-1">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#5A657A] hover:bg-[#151A27] hover:text-white transition-colors">
          <Moon size={18} />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#5A657A] hover:bg-[#151A27] hover:text-white transition-colors relative">
          <Bell size={18} />
          {/* Notification Dot */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0B0E14]"></span>
        </button>
      </div>

      {/* Profile Avatar */}
      <button className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] cursor-pointer hover:opacity-90 transition-opacity ml-2">
        <img 
          src="https://i.pravatar.cc/100?img=33" 
          alt="Profile" 
          className="w-full h-full rounded-full object-cover border-2 border-[#0B0E14]"
        />
      </button>

    </header>
  );
}
