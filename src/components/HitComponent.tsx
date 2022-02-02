import { Heading, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

export const HitComponent = ({ hit }: any) => {
  return (
    <HStack p={2}>
      <Image h={`24px`} w={`24px`} src={hit.image} alt={hit.name} />
      <Heading size={`md`}>{hit.name}</Heading>
      <Text color={`GrayText`}>{hit.symbol.toUpperCase()}</Text>
    </HStack>
  );
};
