import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Link as CuiLink,
} from '@chakra-ui/react';
import Link from 'next/link';

const LIST_MENU = [
  { name: `Dashboard`, href: `/dashboard` },
  { name: `Wallet`, href: `/wallet` },
  { name: `Transaction`, href: `/transaction` },
  { name: `History`, href: `/history` },
  { name: `Market`, href: `/market` },
  { name: `Setting`, href: `/setting` },
];

export const Sidebar = () => {
  return (
    <Box h={`100%`} p={4}>
      <Box h={`100%`} p={4} bgColor={`gray.100`} borderRadius={`20`}>
        <Heading my={8} mx={2} size={`md`}>
          Crypto Dashboard
        </Heading>
        <List>
          {LIST_MENU.map((list) => (
            <ListItem mx={2} mb={4} key={list.name}>
              <Link href={list.href} passHref>
                <CuiLink fontSize={`xl`} fontWeight={`semibold`}>
                  {list.name}
                </CuiLink>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
