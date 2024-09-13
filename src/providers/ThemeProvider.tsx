import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Типы для контекста темы
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

// Создание контекста с начальными значениями
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Провайдер контекста
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Инициализация состояния темы в зависимости от предпочтений пользователя
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

    // Эффект для обновления темы при изменении предпочтений пользователя
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            setIsDarkMode(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        // Установка начальной темы
        document.documentElement.classList.toggle('dark', isDarkMode);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [isDarkMode]);

    // Функция для переключения темы
    const toggleTheme = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            document.documentElement.classList.toggle('dark', newMode);
            return newMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Хук для удобного доступа к контексту
const useTheme = (): ThemeContextType => {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export { ThemeProvider, useTheme };
