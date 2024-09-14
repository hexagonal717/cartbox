import { createContext, useContext, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from './themeSlice'; // Import the action from your themeSlice

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.themeSlice.darkMode);

  // Sync dark mode preference to localStorage and update the document's class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      darkMode,
      toggleDarkMode,
    }),
    [darkMode],
  );

  return (
    <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
