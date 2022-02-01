import { getAllCoinsList } from '../builder/lists';
import algoliasearch from 'algoliasearch';

export const generateIndex = async (): Promise<void> => {
  const list = await getAllCoinsList();

  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID!,
    process.env.ALGOLIA_API_KEY!,
  );
  const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME!);

  try {
    await index.delete();
    await index.saveObjects(list, { autoGenerateObjectIDIfNotExist: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
