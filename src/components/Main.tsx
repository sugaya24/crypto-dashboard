import { Box, Heading, HStack, Spinner, Image } from '@chakra-ui/react';
import React from 'react';
import { TList } from 'types/lists';
import { CoinCard } from './CoinCard';
import { Header } from './Header';

type Props = {
  lists: TList[];
};

export const Main = ({ lists }: Props) => {
  return (
    <Box h={`100%`} w={`100%`} p={8} className={`main-content`}>
      <Header />
      <HStack w={`100%`} spacing={4} overflowX={`scroll`}>
        {lists.length !== 0 ? (
          lists.map((list: TList) => (
            <Box key={list.id}>
              <CoinCard list={list} />
            </Box>
          ))
        ) : (
          <>
            <Spinner />
          </>
        )}
      </HStack>
    </Box>
  );
};
