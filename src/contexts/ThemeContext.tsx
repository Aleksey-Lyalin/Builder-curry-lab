import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryText: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  updateColors: (newColors: Partial<ThemeColors>) => void;
  resetToDefault: () => void;
  presetColors: { name: string; colors: ThemeColors }[];
}

const defaultColors: ThemeColors = {
  primary: "rgb(92, 111, 92)", // sage-600
  primaryHover: "rgb(72, 88, 72)", // sage-700
  primaryText: "rgb(255, 255, 255)", // white
};

const presetColors = [
  {
    name: "Sage Green (Default)",
    colors: {
      primary: "rgb(92, 111, 92)",
      primaryHover: "rgb(72, 88, 72)",
      primaryText: "rgb(255, 255, 255)",
    },
  },
  {
    name: "Light Gray",
    colors: {
      primary: "rgb(142, 146, 155)", // 8E929B
      primaryHover: "rgb(107, 114, 128)",
      primaryText: "rgb(255, 255, 255)",
    },
  },
  {
    name: "Ocean Blue",
    colors: {
      primary: "rgb(59, 130, 246)",
      primaryHover: "rgb(37, 99, 235)",
      primaryText: "rgb(255, 255, 255)",
    },
  },
  {
    name: "Rose Pink",
    colors: {
      primary: "rgb(244, 63, 94)",
      primaryHover: "rgb(225, 29, 72)",
      primaryText: "rgb(255, 255, 255)",
    },
  },
  {
    name: "Purple",
    colors: {
      primary: "rgb(147, 51, 234)",
      primaryHover: "rgb(126, 34, 206)",
      primaryText: "rgb(255, 255, 255)",
    },
  },
  {
    name: "Orange",
    colors: {
      primary: "rgb(234, 88, 12)",
      primaryHover: "rgb(194, 65, 12)",
      primaryText: "rgb(255, 255, 255)",
    },
  },
  {
    name: "Dark Gray",
    colors: {
      primary: "rgb(55, 65, 81)",
      primaryHover: "rgb(31, 41, 55)",
      primaryText: "rgb(255, 255, 255)",
    },
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-colors");
    if (savedTheme) {
      try {
        const themeColors = JSON.parse(savedTheme);
        setColors(themeColors);
        applyColorsToCSS(themeColors);
      } catch (error) {
        console.error("Error loading theme from localStorage:", error);
      }
    } else {
      applyColorsToCSS(defaultColors);
    }
  }, []);

  const applyColorsToCSS = (newColors: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty("--primary-button-bg", newColors.primary);
    root.style.setProperty("--primary-button-hover", newColors.primaryHover);
    root.style.setProperty("--primary-button-text", newColors.primaryText);
  };

  const updateColors = (newColors: Partial<ThemeColors>) => {
    const updatedColors = { ...colors, ...newColors };
    setColors(updatedColors);
    localStorage.setItem("theme-colors", JSON.stringify(updatedColors));
    applyColorsToCSS(updatedColors);
  };

  const resetToDefault = () => {
    setColors(defaultColors);
    localStorage.setItem("theme-colors", JSON.stringify(defaultColors));
    applyColorsToCSS(defaultColors);
  };

  return (
    <ThemeContext.Provider
      value={{
        colors,
        updateColors,
        resetToDefault,
        presetColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
