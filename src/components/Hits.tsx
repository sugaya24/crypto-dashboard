import { useContext, useEffect, useState } from 'react';
import { CoinContext } from '@/contexts/CoinContext';
import { Hit as AlgoliaHit } from '@algolia/client-search';
import { Box, Center, Divider, List, ListItem } from '@chakra-ui/react';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks';
import { PoweredBy } from './PoweredBy';
import { useKeyPress } from '../lib/useKeyPress';
import { SearchInputContext } from '@/contexts/SearchInputContext';

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
  hitComponent: Hit,
  onClose,
}: HitsProps<THit> | any) {
  const { hits, results } = useHits();
  const query = results?._rawResults[0].query;
  const { setId, setName } = useContext(CoinContext);
  const { inputValue, setInputValue } = useContext(SearchInputContext);
  const downPress = useKeyPress(`ArrowDown`);
  const upPress = useKeyPress(`ArrowUp`);
  const enterPress = useKeyPress(`Enter`);
  const [cursor, setCursor] = useState<number>(0);
  const [hovered, setHovered] = useState<any>(undefined);

  useEffect(() => {
    if (hits.length && downPress) {
      setCursor((prevState) =>
        prevState < hits.length - 1 ? prevState + 1 : prevState,
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (hits.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (hits.length && enterPress) {
      handleClick(hits[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (hits.length && hovered) {
      setCursor(hits.indexOf(hovered));
    }
  }, [hovered]);
  useEffect(() => {
    setCursor(0);
  }, [inputValue]);

  const handleClick = (hit: any) => {
    setId(hit.id);
    setName(hit.name);
    setInputValue(``);
    onClose();
  };

  return (
    <Box>
      <List className={`ais-Hits-list`} role={`listbox`}>
        {hits.length ? (
          hits.map((hit, i) => (
            <ListItem
              key={hit.objectID}
              cursor={`pointer`}
              className={`ais-Hits-item`}
              role={`option`}
              aria-selected={i === cursor}
              _selected={{ bgColor: `gray.200` }}
              onMouseEnter={() => setHovered(hit)}
              onMouseLeave={() => setHovered(undefined)}
              onClick={() => handleClick(hit)}
            >
              <Hit hit={hit as unknown as THit} isActive={i === cursor} />
              <Divider />
            </ListItem>
          ))
        ) : (
          <Center p={4} color={`GrayText`}>
            No results{query ? ` for "${query}"` : ``}
          </Center>
        )}
      </List>
      <PoweredBy />
    </Box>
  );
}
