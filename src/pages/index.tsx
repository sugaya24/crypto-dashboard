import Head from 'next/head';

import { Box } from '@chakra-ui/react';
import { getCoinsListWithHistory } from '../builder/lists';
import { useEffect, useState } from 'react';
import { TList } from 'types/lists';
import { Main } from '@/components/Main';
import { Sidebar } from '@/components/Sidebar';
import { generateIndex } from '@/lib/algolia';

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
    <Box h={`100%`} w={`100%`}>
      <Head>
        <title>Crypto Dashboard</title>
        <meta name="description" content="Crypto Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        h={`100%`}
        as={`main`}
        display={`grid`}
        gridTemplateColumns={{ base: `0 1fr`, md: `340px minmax(0, 1fr)` }}
      >
        <Sidebar />
        <Main lists={lists} />
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  await generateIndex();
  return { props: {} };
}
