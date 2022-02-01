import React, { useContext } from 'react';
import { CoinContext } from '@/contexts/CoinContext';
import { TList } from 'types/lists';
import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { MiniChart } from '@/components/MiniChart';

export const CoinCard = ({ list }: { list: TList }) => {
  const { setId, setName } = useContext(CoinContext);
  const isIncreased = list.rateOfChange! > 0;

  const handleClickCoinCard = (id: string, name: string) => {
    setId(id);
    setName(name);
  };

  return (
    <Box h={`auto`} w={`250px`} p={4} borderWidth={`1px`} borderRadius={10}>
      <VStack alignItems={`start`}>
        <HStack>
          <Image boxSize={`24px`} src={list.image} alt={list.id} />
          <Heading
            size={`sm`}
            cursor={`pointer`}
            onClick={() => handleClickCoinCard(list.id, list.name)}
          >{`${list.name}`}</Heading>
          <Text
            as={`span`}
            textColor={`gray.500`}
            fontSize={`13px`}
          >{`${list.symbol.toUpperCase()}`}</Text>
        </HStack>
        <HStack>
          <Text as={`span`}>{`$${list.current_price.toLocaleString()}`}</Text>
          <Text
            as={`span`}
            fontSize={`14px`}
            color={isIncreased ? `green.500` : `red.500`}
          >{`${Math.round(list.rateOfChange! * 100) / 100}%`}</Text>
        </HStack>
      </VStack>
      <Box p={2}>
        <MiniChart list={list} isIncreased={isIncreased} />
      </Box>
    </Box>
  );
};
