import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';
import CoinContextProvider from '@/contexts/CoinContext';
import SearchInputContextProvider from '@/contexts/SearchInputContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CoinContextProvider>
        <SearchInputContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchInputContextProvider>
      </CoinContextProvider>
    </ChakraProvider>
  );
}
