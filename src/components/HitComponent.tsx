import React from 'react';
import { Heading, HStack, Image, Spacer, Text } from '@chakra-ui/react';
import { BsArrowReturnLeft } from 'react-icons/bs';

export const HitComponent = ({ hit, isActive }: any) => {
  return (
    <HStack p={4}>
      <Image h={`24px`} w={`24px`} src={hit.image} alt={hit.name} />
      <Heading size={`md`}>{hit.name}</Heading>
      <Text color={`GrayText`}>{hit.symbol.toUpperCase()}</Text>
      {isActive && (
        <>
          <Spacer />
          <BsArrowReturnLeft />
        </>
      )}
    </HStack>
  );
};
