import { createContext, useContext, useState } from "react";


interface ThemeContextInterface {
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const getInitContext: () => ThemeContextInterface = () => ({
    darkMode: false,
    setDarkMode: () => null
});

const initialThemeContext: ThemeContextInterface = getInitContext()

export const ThemeContext = createContext<ThemeContextInterface>(initialThemeContext)

export default function ThemeProvider({ children, defaultThemeContext = initialThemeContext }: {
    children: React.ReactNode;
    defaultThemeContext?: ThemeContextInterface;
}) {
    const [darkMode, setDarkMode] = useState<boolean>(defaultThemeContext.darkMode)

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);