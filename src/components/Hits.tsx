import { CoinContext } from '@/contexts/CoinContext';
import { Hit as AlgoliaHit } from '@algolia/client-search';
import { Box, Center, Divider, List, ListItem } from '@chakra-ui/react';
import { useContext } from 'react';
import { useHits, UseHitsProps, useSearchBox } from 'react-instantsearch-hooks';
import { PoweredBy } from './PoweredBy';

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
  const { refine } = useSearchBox();

  const handleClick = (hit: any) => {
    setId(hit.id);
    setName(hit.name);
    refine(hit.id);
    onClose();
  };

  return (
    <Box>
      <List className={`ais-Hits-list`}>
        {hits.length ? (
          hits.map((hit) => (
            <ListItem
              key={hit.objectID}
              cursor={`pointer`}
              className={`ais-Hits-item`}
              onClick={() => handleClick(hit)}
            >
              <Hit hit={hit as unknown as THit} />
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
