import { HashRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Home } from "./pages/Home";
import { Watchlist } from "./pages/Watchlist";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
