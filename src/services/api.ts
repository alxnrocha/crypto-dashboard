import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_COINGECKO_API_URL,
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

const MOCK_FALLBACK_COINS: CoinMarketData[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 94500,
    market_cap: 1860000000000,
    market_cap_rank: 1,
    total_volume: 38500000000,
    high_24h: 96000,
    low_24h: 93200,
    price_change_24h: 1300,
    price_change_percentage_24h: 2.84,
    sparkline_in_7d: { price: [91000, 92000, 91500, 93000, 94200, 93800, 94500] }
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2750,
    market_cap: 330000000000,
    market_cap_rank: 2,
    total_volume: 19400000000,
    high_24h: 2800,
    low_24h: 2680,
    price_change_24h: 70,
    price_change_percentage_24h: 3.12,
    sparkline_in_7d: { price: [2600, 2650, 2620, 2700, 2740, 2710, 2750] }
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 195,
    market_cap: 92000000000,
    market_cap_rank: 3,
    total_volume: 6800000000,
    high_24h: 202,
    low_24h: 189,
    price_change_24h: 6,
    price_change_percentage_24h: 4.25,
    sparkline_in_7d: { price: [180, 184, 188, 190, 192, 191, 195] }
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 660,
    market_cap: 96000000000,
    market_cap_rank: 4,
    total_volume: 1800000000,
    high_24h: 675,
    low_24h: 650,
    price_change_24h: 10,
    price_change_percentage_24h: 1.54,
    sparkline_in_7d: { price: [640, 645, 650, 655, 658, 655, 660] }
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 2.45,
    market_cap: 140000000000,
    market_cap_rank: 5,
    total_volume: 8500000000,
    high_24h: 2.60,
    low_24h: 2.30,
    price_change_24h: 0.15,
    price_change_percentage_24h: 6.52,
    sparkline_in_7d: { price: [2.1, 2.2, 2.25, 2.35, 2.4, 2.38, 2.45] }
  }
];

export const getMarketCoins = async (
  currency: "USD" | "BRL",
): Promise<CoinMarketData[]> => {
  try {
    const response = await api.get("/coins/markets", {
      params: {
        vs_currency: currency.toLowerCase(),
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: true,
        price_change_percentage: "24h",
      },
    });
    return response.data && response.data.length > 0 ? response.data : MOCK_FALLBACK_COINS;
  } catch (err) {
    console.warn("CoinGecko API rate limit or error, using high-fidelity fallback mock data:", err);
    return MOCK_FALLBACK_COINS;
  }
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
