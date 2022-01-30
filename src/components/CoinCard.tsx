import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { TList } from 'types/lists';
import { MiniChart } from './MiniChart';

export const CoinCard = ({ list }: { list: TList }) => {
  return (
    <Box h={`auto`} w={`250px`} p={4} borderWidth={`1px`} borderRadius={10}>
      <VStack alignItems={`start`}>
        <HStack>
          <Image boxSize={`24px`} src={list.image} alt={list.id} />
          <Heading size={`sm`}>{`${list.name}`}</Heading>
          <Text
            as={`span`}
            textColor={`gray.500`}
            fontSize={`13px`}
          >{`${list.symbol.toUpperCase()}`}</Text>
        </HStack>
        <HStack>
          <Text as={`span`}>{`$${list.current_price.toLocaleString()}`}</Text>
          <Text as={`span`} fontSize={`14px`} color={`gray.500`}>{`${
            Math.round(list.rateOfChange! * 100) / 100
          }%`}</Text>
        </HStack>
      </VStack>
      <Box p={2}>
        <MiniChart list={list} />
      </Box>
    </Box>
  );
};
