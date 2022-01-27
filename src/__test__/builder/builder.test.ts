import {
  getCoinChartHistory,
  getCoinsListData,
  getCoinsListWithHistory,
} from '../../builder/lists';
import { server } from '../../mocks/server';
import { THistory, TList } from '../../../types/lists';

describe(`builder`, () => {
  // Establish API mocking before all tests.
  beforeAll(() => server.listen());
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
  // Clean up after the tests are finished.
  afterAll(() => server.close());

  test(`getCoinsList`, async () => {
    const result = await getCoinsListData();
    expect(result[0].name).toEqual(`Bitcoin`);
  });

  test(`getCoinChartHistory`, async () => {
    const history: THistory = await getCoinChartHistory(`bitcoin`);
    const expectedHistory = {
      prices: [[1643011816887, 35032.676110526365]],
    };
    history.prices[0].forEach((price, i) => {
      expect(price).toBe(expectedHistory.prices[0][i]);
    });
  });

  test(`getCoinsListWithHistory`, async () => {
    const coinsList: TList[] = await getCoinsListWithHistory();
    const expectedList: TList = {
      name: `Bitcoin`,
      current_price: 35642,
      id: `bitcoin`,
      image: `https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579`,
      symbol: `btc`,
      prices: [[1643011816887, 35032.676110526365]],
    };
    expect(coinsList[0].name).toBe(expectedList.name);
    expect(coinsList[0].current_price).toBe(expectedList.current_price);
    expect(coinsList[0].id).toBe(expectedList.id);
    expect(coinsList[0].symbol).toBe(expectedList.symbol);
    expect(coinsList[0].image).toBe(expectedList.image);
    expect(coinsList[0].prices[0][0]).toBe(expectedList.prices[0][0]);
  });
});
