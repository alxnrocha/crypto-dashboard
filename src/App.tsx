import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Home } from './pages/Home';
import { Watchlist } from './pages/Watchlist';

// Main app entry point
function App() {
  return (
    <BrowserRouter>
      {/* v6 routes setup */}
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
