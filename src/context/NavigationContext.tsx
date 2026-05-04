import React, { createContext, useContext, useState, useCallback } from 'react';

type TabKey = 'Feed' | 'Social' | 'Add' | 'Alerts' | 'Me';

interface NavigationContextValue {
  activeTab: TabKey;
  previousTab: TabKey;
  navigate: (tab: TabKey) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextValue>({
  activeTab: 'Feed',
  previousTab: 'Feed',
  navigate: () => {},
  goBack: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab]     = useState<TabKey>('Feed');
  const [previousTab, setPreviousTab] = useState<TabKey>('Feed');

  const navigate = useCallback((tab: TabKey) => {
    setActiveTab((prev) => {
      setPreviousTab(prev);
      return tab;
    });
  }, []);

  const goBack = useCallback(() => {
    setActiveTab((curr) => {
      setActiveTab(previousTab);
      return previousTab;
    });
  }, [previousTab]);

  return (
    <NavigationContext.Provider value={{ activeTab, previousTab, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};
