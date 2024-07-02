// context/searchContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Movie } from '../types/movie';

interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  results: Movie[];
  setResults: (results: Movie[]) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Movie[]>([]);

  return (
    <SearchContext.Provider value={{ query, setQuery, results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
