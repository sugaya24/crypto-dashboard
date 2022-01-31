import React, { createContext, useState } from 'react';

export type TCoinsContext = {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

export const CoinContext = createContext<TCoinsContext>({} as TCoinsContext);

const CoinContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [id, setId] = useState<string>(`bitcoin`);
  const [name, setName] = useState<string>(`Bitcoin`);
  const value: TCoinsContext = {
    id,
    setId,
    name,
    setName,
  };

  return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
};

export default CoinContextProvider;
