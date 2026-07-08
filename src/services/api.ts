import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
});

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export const getMarketCoins = async (currency: 'USD' | 'BRL'): Promise<CoinMarketData[]> => {
  const response = await api.get('/coins/markets', {
    params: {
      vs_currency: currency.toLowerCase(),
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: true,
      price_change_percentage: '24h',
    },
  });
  return response.data;
};

export const getCoinDetail = async (id: string) => {
  const response = await api.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
  return response.data;
};
