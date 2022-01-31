import { Box, Heading, HStack, Spinner, Image, Center } from '@chakra-ui/react';
import React from 'react';
import { TList } from 'types/lists';
import { CoinCard } from './CoinCard';
import { Header } from './Header';
import { MainChart } from './MainChart';

type Props = {
  lists: TList[];
};

export const Main = ({ lists }: Props) => {
  return (
    <Box h={`100%`} w={`100%`} p={4} className={`main-content`}>
      <Header />
      <HStack w={`100%`} mb={4} spacing={4} overflowX={`scroll`}>
        {lists.length !== 0 ? (
          lists.map((list: TList) => (
            <Box h={`100%`} key={list.id}>
              <CoinCard list={list} />
            </Box>
          ))
        ) : (
          <Center h={`206px`} w={`100%`}>
            <Spinner />
          </Center>
        )}
      </HStack>
      <Box>
        <MainChart />
      </Box>
    </Box>
  );
};
