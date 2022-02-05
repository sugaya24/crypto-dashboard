import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks';
import {
  Box,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { SearchInputContext } from '@/contexts/SearchInputContext';

export const SearchBox = (props: UseSearchBoxProps) => {
  const { query, refine, isSearchStalled } = useSearchBox(props);
  const { inputValue, setInputValue } = useContext(SearchInputContext);
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

  const upAndDownHandler = (e: any) => {
    const { key } = e;
    if (key === `ArrowDown` || key === `ArrowUp`) {
      e.preventDefault();
    }
    return;
  };

  React.useEffect(() => {
    window.addEventListener(`keydown`, (e) => upAndDownHandler(e));

    return () => {
      window.removeEventListener(`keydown`, upAndDownHandler);
    };
  });

  return (
    <Box className={`ais-InstantSearch`}>
      <InputGroup h={`68px`}>
        <Input
          h={`68px`}
          pl={`68px`}
          className={`ais-SearchBox-input`}
          _focus={{ boxShadow: `none` }}
          borderWidth={0}
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
        <InputLeftElement h={`68px`} w={`68px`}>
          <BiSearch size={`24px`} />
        </InputLeftElement>
      </InputGroup>
      <Divider w={`95%`} margin={`auto`} />
    </Box>
  );
};
