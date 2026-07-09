import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

// wrapper layout
export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#0B0E14] text-white font-sans selection:bg-blue-600/30 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        {/* router injects pages here */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
