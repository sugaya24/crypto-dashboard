import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TList } from 'types/lists';

export const CoinCard = ({ list }: { list: TList }) => {
  return (
    <Box h={`180px`} w={`250px`} p={4} borderWidth={`1px`} borderRadius={10}>
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
        </HStack>
      </VStack>
    </Box>
  );
};
