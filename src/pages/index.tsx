import Head from 'next/head';

import { Box, Heading, HStack, Image, Spinner } from '@chakra-ui/react';
import { getCoinsListWithHistory } from '../builder/lists';
import { useEffect, useState } from 'react';
import { TList } from 'types/lists';
import { Sidebar } from '@/components/Sidebar';

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
    <Box h={`100%`}>
      <Head>
        <title>Crypto Dashboard</title>
        <meta name="description" content="Crypto Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        h={`calc(100% - 32px)`}
        as={`main`}
        display={`grid`}
        gridTemplateColumns={{ base: `0 1fr`, md: `340px 1fr` }}
      >
        <Sidebar />
        <Box className={`main-content`}>
          <Heading>Crypto Dashboard</Heading>
          {lists.length !== 0 ? (
            lists.map((list: TList, i: number) => (
              <HStack key={list.id}>
                <Heading size={`sm`}>
                  {`#${i + 1}, ${list.name}, $${list.current_price}`}
                </Heading>
                <Image boxSize={`24px`} src={list.image} alt={list.id} />
              </HStack>
            ))
          ) : (
            <>
              <Spinner />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
