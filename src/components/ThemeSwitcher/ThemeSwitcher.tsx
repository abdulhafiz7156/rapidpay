import React, { useContext, useEffect } from 'react';
import lightIcon from "../../assets/icons/light-theme.svg";
import darkIcon from "../../assets/icons/dark-theme.svg";
import { ThemeContext } from '../../providers/ThemeProvider';

const ThemeSwitcher: React.FC = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeSwitcher must be used within a ThemeProvider");
    }

    const { isDarkMode, toggleTheme } = themeContext;

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <button onClick={toggleTheme}>
            <img
                src={isDarkMode ? lightIcon : darkIcon}
                alt={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            />
        </button>
    );
};

export default ThemeSwitcher;
