import React from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-hooks';
import { SearchBox } from './SearchBox';
import { Hits } from './Hits';
import { HitComponent } from './HitComponent';
import { BiSearch } from 'react-icons/bi';

export const Header = () => {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ``,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || ``,
  );
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ``;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box my={2}>
      <HStack>
        <Heading size={`lg`}>Overview</Heading>
        <Spacer />
        <InstantSearch indexName={indexName} searchClient={searchClient}>
          <Button
            minW={`200px`}
            maxW={`300px`}
            onClick={onOpen}
            bgColor={`white`}
            shadow={`base`}
            color={`gray.400`}
            fontWeight={`normal`}
            leftIcon={<BiSearch />}
            _hover={{ backgroundColor: `white` }}
          >
            Search
            <Spacer />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <SearchBox />
              <Hits hitComponent={HitComponent} />
            </ModalContent>
          </Modal>
        </InstantSearch>
      </HStack>
    </Box>
  );
};
