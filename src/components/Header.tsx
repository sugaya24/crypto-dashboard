import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Kbd,
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

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const handleKeyDownEnter = (event: KeyboardEvent) => {
    if (event.code === `KeyK` && event.metaKey && !isOpen) {
      onToggle();
    }
  };

  useEffect(() => {
    document.addEventListener(`keydown`, handleKeyDownEnter);
    return () => {
      document.removeEventListener(`keydown`, handleKeyDownEnter);
    };
  }, [isOpen]);

  const handleClick = () => {
    onOpen();
  };

  return (
    <Box my={2}>
      <HStack>
        <Heading size={`lg`}>Overview</Heading>
        <Spacer />
        <InstantSearch indexName={indexName} searchClient={searchClient}>
          <Button
            w={`100%`}
            maxW={`300px`}
            bgColor={`white`}
            shadow={`base`}
            color={`gray.400`}
            fontWeight={`normal`}
            leftIcon={<BiSearch />}
            rightIcon={
              <Box display={{ base: `none`, md: `block` }}>
                <Kbd>⌘</Kbd> <Kbd>K</Kbd>
              </Box>
            }
            _hover={{ backgroundColor: `white` }}
            onClick={handleClick}
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
