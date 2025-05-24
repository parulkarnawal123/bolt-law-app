import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ColorPalette {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
}

interface UseColorSchemeResult {
  colors: ColorPalette;
}

export function useColorScheme(): UseColorSchemeResult {
  const { theme } = useTheme();
  const [colors, setColors] = useState<ColorPalette>({
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#757575',
    border: '#E5E5E5',
  });
  
  useEffect(() => {
    if (theme === 'dark') {
      setColors({
        background: '#121212',
        card: '#1E1E1E',
        text: '#FFFFFF',
        textSecondary: '#B0B0B0',
        border: '#2C2C2C',
      });
    } else {
      setColors({
        background: '#FFFFFF',
        card: '#FFFFFF',
        text: '#1A1A1A',
        textSecondary: '#757575',
        border: '#E5E5E5',
      });
    }
  }, [theme]);
  
  return { colors };
}