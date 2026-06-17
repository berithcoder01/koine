// src/features/theme/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';
export type FontSize = 'small' | 'medium' | 'large';

const FONT_SCALE: Record<FontSize, number> = {
  small:  0.875,
  medium: 1,
  large:  1.2,
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  fontSize: 'medium',
  setFontSize: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('koine-theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem('koine-font-size');
    return (saved === 'small' || saved === 'medium' || saved === 'large') ? saved : 'medium';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('koine-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--koine-font-scale',
      String(FONT_SCALE[fontSize]),
    );
    localStorage.setItem('koine-font-size', fontSize);
  }, [fontSize]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  const setFontSize = useCallback((s: FontSize) => setFontSizeState(s), []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};
