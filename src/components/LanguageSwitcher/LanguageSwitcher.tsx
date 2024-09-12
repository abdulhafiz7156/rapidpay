import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false); // Close menu after selecting language
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center bg-transparent border-none text-lightText dark:text-darkText cursor-pointer gap-1">
                <span className="text-sm">{i18n.language.toUpperCase()}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 4.5L9 1" className="stroke-darkBackground dark:stroke-lightBackground"/>
                </svg>
            </button>
            {isOpen && (
                <ul className="absolute top-full left-0 mt-2 bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText shadow-lg border border-lightText dark:border-darkText rounded-md">
                    <li
                        onClick={() => changeLanguage('ru')}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                        Ru
                    </li>
                    <li
                        onClick={() => changeLanguage('uz')}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                        Uz
                    </li>
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
