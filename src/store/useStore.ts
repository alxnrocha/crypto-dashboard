import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// global app state
interface AppState {
  currency: 'USD' | 'BRL';
  setCurrency: (currency: 'USD' | 'BRL') => void;
  favorites: string[];
  toggleFavorite: (coinId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// store with localstorage persistence
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
      favorites: [],
      toggleFavorite: (coinId) =>
        set((state) => ({
          // toggle logic
          favorites: state.favorites.includes(coinId)
            ? state.favorites.filter((id) => id !== coinId)
            : [...state.favorites, coinId],
        })),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'crypto-dashboard-storage',
    }
  )
);
