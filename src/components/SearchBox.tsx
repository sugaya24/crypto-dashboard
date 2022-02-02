import React, { useEffect, useRef, useState } from 'react';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

export const SearchBox = (props: UseSearchBoxProps) => {
  const { query, refine, isSearchStalled } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track when the value coming from the React state changes to synchronize
  // it with InstantSearch.
  useEffect(() => {
    if (query !== inputValue) {
      refine(inputValue);
    }
  }, [inputValue, refine]);

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  useEffect(() => {
    // Bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (document.activeElement !== inputRef.current && query !== inputValue) {
      setInputValue(query);
    }
  }, [query]);

  return (
    <Box className={`ais-InstantSearch`}>
      <InputGroup size={`lg`}>
        <Input
          className={`ais-SearchBox-input`}
          placeholder={`Search`}
          ref={inputRef}
          value={inputValue}
          autoComplete={`off`}
          autoCorrect={`off`}
          autoCapitalize={`off`}
          spellCheck={`false`}
          type={`search`}
          onChange={(event) => setInputValue(event.currentTarget.value)}
        />
        <InputLeftElement>
          <BiSearch />
        </InputLeftElement>
      </InputGroup>
    </Box>
  );
};
