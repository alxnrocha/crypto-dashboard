import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  currency: 'USD' | 'BRL';
  favorites: string[];
  searchQuery: string;
  setCurrency: (currency: 'USD' | 'BRL') => void;
  toggleFavorite: (coinId: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      currency: 'USD',
      favorites: [],
      searchQuery: '',
      setCurrency: (currency) => set({ currency }),
      toggleFavorite: (coinId) =>
        set((state) => ({
          favorites: state.favorites.includes(coinId)
            ? state.favorites.filter((id) => id !== coinId)
            : [...state.favorites, coinId],
        })),
    }),
    {
      name: 'crypto-dashboard-storage',
    }
  )
);
