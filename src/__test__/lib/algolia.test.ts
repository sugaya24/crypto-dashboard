import { generateIndex } from '../../lib/algolia';

describe(`lib`, () => {
  test(`generateIndex`, async () => {
    await expect(generateIndex()).resolves.not.toThrow();
  });
});
