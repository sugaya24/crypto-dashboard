import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';
import CoinContextProvider from '@/contexts/CoinContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CoinContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CoinContextProvider>
    </ChakraProvider>
  );
}
