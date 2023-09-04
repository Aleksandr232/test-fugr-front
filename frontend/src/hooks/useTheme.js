import { useState, useEffect } from "react";

export const useTheme = () => {
  const initialTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}