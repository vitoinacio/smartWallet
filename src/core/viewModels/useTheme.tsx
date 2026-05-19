import { useEffect, useState } from "react";

interface UseThemeReturn {
  handleTheme: () => void;
  theme: 'light' | 'dark';
}

const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const html = document.documentElement;

  const handleTheme = () => {
    if (theme === 'light') {
      html.classList.add('dark');
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const themeInitial = localStorage.getItem('theme');
    if (themeInitial === 'dark') {
      html.classList.add('dark');
      setTheme('dark');
    } else {
      html.classList.remove('dark');
      setTheme('light');
    }
  }, [html]);

  return { handleTheme, theme };
};

export default useTheme;