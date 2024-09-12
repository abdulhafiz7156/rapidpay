import React, {useState} from 'react';
import './Header.css';
import lightLogo from "../../assets/logo-light.svg";
import darkLogo from "../../assets/logo.svg";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";

const Header: React.FC = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = useState(prefersDarkMode)
    console.log(prefersDarkMode)
    return (
        <header className="header flex bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText">
            <div className="logo">
                <img src={isDarkMode ? darkLogo : lightLogo} alt="Logo" />
            </div>
            <div className="header__payment__status flex items-center">
                <div className="circle"></div>
                <div className="line"></div>
                <div className="circle-with-hole"></div>
                <div className="line"></div>
                <div className="circle-grey"></div>
            </div>
            <div className="language-theme__switcher flex">
                <ThemeSwitcher />
                <div>Ru</div>
            </div>
        </header>
    );
};

export default Header;
