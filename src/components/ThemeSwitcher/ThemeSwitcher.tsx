import React, { useState, useEffect } from 'react';
import lightModeIcon from '../../assets/icons/light-theme.svg';
import darkModeIcon from '../../assets/icons/dark-theme.svg';

const ThemeSwitcher: React.FC = () => {
    // Определяем, какая тема установлена по умолчанию
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

    useEffect(() => {
        // Слушаем изменения в предпочтениях пользователя
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            setIsDarkMode(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        // Устанавливаем тему при первой загрузке
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Убираем слушателя при размонтировании компонента
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="flex items-center justify-center">
            <button onClick={toggleTheme}>
                <img
                    src={isDarkMode ? lightModeIcon : darkModeIcon}
                    alt={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    className="w-6 h-6"
                />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
