import React, { createContext, useContext, useRef, useCallback } from 'react';
import { Animated } from 'react-native';

interface ScrollContextValue {
  onScroll: (event: any) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  onScroll: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

interface ScrollProviderProps {
  children: React.ReactNode;
  onScroll: (event: any) => void;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children, onScroll }) => (
  <ScrollContext.Provider value={{ onScroll }}>
    {children}
  </ScrollContext.Provider>
);
