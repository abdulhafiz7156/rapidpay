import React, { useEffect } from 'react';
import ligthIcon from "../../assets/icons/light-theme.svg";
import darkIcon from "../../assets/icons/dark-theme.svg";

const ThemeSwitcher: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({ isDarkMode, toggleTheme }) => {
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
                src={isDarkMode ? ligthIcon : darkIcon}
                alt={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            />
            <img src="../../assets/icons/light-theme.svg" alt=""/>
        </button>
    );
};

export default ThemeSwitcher;
