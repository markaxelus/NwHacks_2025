import React, { createContext, useContext, useEffect, useState } from "react";

type DarkModeContextProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize darkMode from localStorage or system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme === "dark";
    }
    // Fallback to system preference if nothing in localStorage
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 2. Keep <html> class in sync with darkMode changes and store in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // 3. Optionally, respond to user system preference changes
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateDarkMode = (e: MediaQueryListEvent) => {
      // Only update if the user hasn't chosen a manual override
      const storedTheme = localStorage.getItem("theme");
      if (!storedTheme) {
        setDarkMode(e.matches);
      }
    };

    darkModeQuery.addEventListener("change", updateDarkMode);
    return () => {
      darkModeQuery.removeEventListener("change", updateDarkMode);
    };
  }, []);

  // 4. Toggling between dark & light
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
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
