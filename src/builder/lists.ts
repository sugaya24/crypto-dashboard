import axios from 'axios';
import { THistory, TList } from 'types/lists';

export const getCoinsListData = async (): Promise<TList[]> => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets`,
    {
      params: {
        vs_currency: `usd`,
        order: `market_cap_desc`,
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    },
  );
  return Promise.all(
    res.data.map((coin: TList) => {
      return {
        name: coin.name,
        current_price: coin.current_price,
        id: coin.id,
        image: coin.image,
        symbol: coin.symbol,
      };
    }),
  );
};

export const getCoinChartHistory = async (id: string): Promise<THistory> => {
  const history = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: `usd`,
        days: 1,
      },
    },
  );
  return history.data;
};

export const getCoinsListWithHistory = async (): Promise<TList[]> => {
  const coinsList: TList[] = await getCoinsListData();
  return Promise.all(
    coinsList.map(async (coin) => {
      const coinChartHistory: THistory = await getCoinChartHistory(coin.id);
      coin.prices = coinChartHistory.prices;
      return coin;
    }),
  );
};
