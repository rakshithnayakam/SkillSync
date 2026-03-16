import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always dark — no toggle
  return (
    <ThemeContext.Provider value={{ darkMode: true, toggleDarkMode: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
