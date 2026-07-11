import { useMediaQuery } from '@chakra-ui/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ColorModePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'color-mode';

interface ColorModeContextType {
  preference: ColorModePreference;
  resolved: 'light' | 'dark';
  setPreference: (preference: ColorModePreference) => void;
  toggle: () => void;
}

const ColorModeContext = createContext<ColorModeContextType | null>(null);

const storedPreference = (): ColorModePreference => {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : 'system';
};

export const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [preference, setPreferenceState] = useState<ColorModePreference>(storedPreference);
  const [systemIsDark] = useMediaQuery(['(prefers-color-scheme: dark)']);

  const resolved = preference === 'system' ? (systemIsDark ? 'dark' : 'light') : preference;

  useEffect(() => {
    // Chakra v3's _dark condition is driven by the `dark` class on <html>
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  }, [resolved]);

  const setPreference = (next: ColorModePreference) => {
    setPreferenceState(next);
    if (next === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
  };

  const toggle = () => setPreference(resolved === 'dark' ? 'light' : 'dark');

  return (
    <ColorModeContext.Provider value={{ preference, resolved, setPreference, toggle }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};
