// src/mocks/handlers.js
import {
  DefaultRequestBody,
  PathParams,
  ResponseComposition,
  rest,
  RestContext,
  RestRequest,
} from 'msw';
import {
  allCoinsList,
  coinChartHistory,
  mockedCoinsList,
} from './mockResponses';

export const handlers = [
  // Handles a GET /user request
  rest.get(
    `https://api.coingecko.com/api/v3/coins/markets`,
    (
      req: RestRequest<never, PathParams>,
      res: ResponseComposition<DefaultRequestBody>,
      ctx: RestContext,
    ) => {
      return res(ctx.status(200), ctx.json(mockedCoinsList));
    },
  ),

  rest.get(
    `https://api.coingecko.com/api/v3/coins/*/market_chart`,
    (
      req: RestRequest<never, PathParams>,
      res: ResponseComposition<DefaultRequestBody>,
      ctx: RestContext,
    ) => {
      return res(
        ctx.status(200),
        ctx.json({ prices: coinChartHistory.prices }),
      );
    },
  ),

  rest.get(
    `https://api.coingecko.com/api/v3/coins/markets`,
    (
      req: RestRequest<never, PathParams>,
      res: ResponseComposition<DefaultRequestBody>,
      ctx: RestContext,
    ) => {
      return res(ctx.status(200), ctx.json(allCoinsList));
    },
  ),
];
