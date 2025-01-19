import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const DarkModeContext = createContext<boolean | undefined>(undefined);

// Provider component
export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateDarkMode = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    // Listen for changes
    darkModeQuery.addEventListener("change", updateDarkMode);

    // Cleanup listener on component unmount
    return () => {
      darkModeQuery.removeEventListener("change", updateDarkMode);
    };
  }, []);

  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook for consuming the context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
