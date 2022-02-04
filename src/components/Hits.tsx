import { Hit as AlgoliaHit } from '@algolia/client-search';
import { Box, Center, Divider, List, ListItem } from '@chakra-ui/react';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks';
import { PoweredBy } from './PoweredBy';

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
  hitComponent: Hit,
}: HitsProps<THit>) {
  const { hits, results } = useHits();
  const query = results?._rawResults[0].query;

  return (
    <Box>
      <List className={`ais-Hits-list`}>
        {hits.length ? (
          hits.map((hit) => (
            <ListItem
              key={hit.objectID}
              cursor={`pointer`}
              className={`ais-Hits-item`}
              onClick={() => console.log(hit.name)}
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
