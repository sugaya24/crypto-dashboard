import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <Box h={`100vh`} w={`100%`} className={`layout`}>
      {children}
    </Box>
  );
};
