export type TList = {
  name: string;
  current_price: number;
  id: string;
  image: string;
  symbol: string;
  prices?: number[][];
  rateOfChange?: number;
};

export type THistory = {
  prices: number[][];
};
