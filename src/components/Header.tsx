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
import algoliasearch, { SearchClient } from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-hooks';
import { SearchBox } from './SearchBox';
import { Hits } from './Hits';
import { HitComponent } from './HitComponent';
import { BiSearch } from 'react-icons/bi';

export const Header = () => {
  const algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ``,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || ``,
  );
  const searchClient: SearchClient = {
    ...algoliaClient,
    search(requests: any) {
      if (requests.every(({ params }: any) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
          })),
        });
      }
      return algoliaClient.search(requests);
    },
  };
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
            <ModalContent maxW={`xl`} mx={`10`}>
              <SearchBox />
              <Hits hitComponent={HitComponent} onClose={onClose} />
            </ModalContent>
          </Modal>
        </InstantSearch>
      </HStack>
    </Box>
  );
};
