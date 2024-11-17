// src/context/UrlContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UrlContextType = {
  lastUrl: string;
  setLastUrl: (url: string) => void;
};

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lastUrl, setLastUrl] = useState<string>('');

  return (
    <UrlContext.Provider value={{ lastUrl, setLastUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlContext = () => {
  const context = useContext(UrlContext);
  if (!context) throw new Error("useUrlContext must be used within a UrlProvider");
  return context;
};
