import Head from 'next/head';

import { Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Crypto Dashboard</title>
        <meta name="description" content="Crypto Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Crypto Dashboard</Heading>
      </main>
    </div>
  );
}
