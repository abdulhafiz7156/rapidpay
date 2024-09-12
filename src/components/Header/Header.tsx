import React, { useState, useEffect } from 'react';
import './Header.css';
import lightLogo from "../../assets/logo-light.svg";
import darkLogo from "../../assets/logo.svg";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.tsx";
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

    const { t } = useTranslation();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            setIsDarkMode(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <>
            <header className="hidden lg:flex bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText">
                <div className="container mx-auto flex items-center justify-between p-5">
                    <div className="logo">
                        <img src={isDarkMode ? lightLogo : darkLogo} alt="Logo" />
                    </div>
                    <div className="header__payment__status flex items-center">
                        <div className="circle"></div>
                        <p>{t('header.way')}</p>
                        <div className="line"></div>
                        <div className="circle-with-hole"></div>
                        <p>{t('header.payment')}</p>
                        <div className="line"></div>
                        <div className="circle-grey"></div>
                        <p>{t('header.success')}</p>
                    </div>
                    <div className="language-theme__switcher flex items-center">
                        <ThemeSwitcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                        <LanguageSwitcher />
                    </div>
                </div>
            </header>

            {/* Мобильный заголовок */}
            <header className="lg:hidden bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText">
                <div className="container mx-auto flex flex-col items-center p-5">
                    <div className="flex items-baseline justify-between w-full">
                        <ThemeSwitcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                        <div className="logo mt-4">
                            <img src={isDarkMode ? lightLogo : darkLogo} alt="Logo" />
                        </div>
                        <LanguageSwitcher />
                    </div>
                    <div className="header__payment__status flex items-center mt-4 w-full justify-between">
                        <div className="circle"></div>
                        <div className="line"></div>
                        <div className="circle-with-hole"></div>
                        <div className="line"></div>
                        <div className="circle-grey"></div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
