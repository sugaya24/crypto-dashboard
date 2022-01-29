import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

export const Header = () => {
  return (
    <Box mt={4} mb={8}>
      <HStack>
        <Heading size={`lg`}>Overview</Heading>
        <Spacer />
        <InputGroup w={`250px`}>
          <Input placeholder={`Search`} />
          <InputRightElement>
            <BiSearch />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </Box>
  );
};
