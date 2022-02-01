import axios from 'axios';
import { THistory, TList } from 'types/lists';

export const getAllCoinsList = async (): Promise<any> => {
  return await axios
    .get(`https://api.coingecko.com/api/v3/coins/markets`, {
      params: {
        vs_currency: `usd`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

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
        days: 7,
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
      coin.rateOfChange = await getRateOfChange(coin.id);
      return coin;
    }),
  );
};

export const getRateOfChange = async (id: string): Promise<number> => {
  const rateOfChange = await getCoinChartHistory(id).then(
    (res) => (res.prices[res.prices.length - 1][1] / res.prices[0][1]) * 100,
  );
  return Math.round(rateOfChange * 100) / 100 - 100;
};
