import Head from 'next/head';

import { Heading, HStack, Image } from '@chakra-ui/react';
import { getCoinsListWithHistory } from '../builder/lists';
import { useEffect, useState } from 'react';
import { TList } from 'types/lists';

export default function Home() {
  const [lists, setLists] = useState<TList[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res: TList[] = await getCoinsListWithHistory();
      setLists(res);
    };
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Crypto Dashboard</title>
        <meta name="description" content="Crypto Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Crypto Dashboard</Heading>
        {lists ? (
          lists.map((list: TList, i: number) => {
            console.log(list);
            return (
              <HStack key={list.id}>
                <Heading size={`sm`}>
                  {`#${i + 1}, ${list.name}, $${list.current_price}`}
                </Heading>
                <Image boxSize={`24px`} src={list.image} alt={list.id} />
              </HStack>
            );
          })
        ) : (
          <p>nothing...</p>
        )}
      </main>
    </div>
  );
}
