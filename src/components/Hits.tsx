import { Hit as AlgoliaHit } from '@algolia/client-search';
import { Box, Divider } from '@chakra-ui/react';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks';
import { PoweredBy } from './PoweredBy';

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
  hitComponent: Hit,
}: HitsProps<THit>) {
  const { hits } = useHits();

  return (
    <Box border={`1px`}>
      <ol className="ais-Hits-list" style={{ listStyle: `none` }}>
        {hits.map((hit) => (
          <li
            key={hit.objectID}
            className="ais-Hits-item"
            onClick={() => console.log(hit.name)}
          >
            <Hit hit={hit as unknown as THit} />
            <Divider />
          </li>
        ))}
      </ol>
      <PoweredBy />
    </Box>
  );
}
