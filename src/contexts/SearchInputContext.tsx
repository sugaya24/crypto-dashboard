import React, { createContext, useState } from 'react';

export type TSearchInputContext = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInputContext = createContext<TSearchInputContext>(
  {} as TSearchInputContext,
);

const SearchInputContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inputValue, setInputValue] = useState<string>(``);
  const value: TSearchInputContext = {
    inputValue,
    setInputValue,
  };

  return (
    <SearchInputContext.Provider value={value}>
      {children}
    </SearchInputContext.Provider>
  );
};

export default SearchInputContextProvider;
